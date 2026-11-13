"""Gemini API bilan ishlash: ovozni baholash, AI suhbatdosh, maslahatlar, so'zlar, kitob tahlili, darslar, TTS.

Barcha javoblar JSON ko'rinishida olinadi va tekshiriladi.
AI_FAKE=1 bo'lsa, Gemini'ga murojaat qilinmaydi: sinash uchun namunaviy javoblar qaytadi.
"""
import asyncio
import hashlib
import io
import json
import logging
import re
import tempfile
import time
import wave
from pathlib import Path

from . import config
from .storage import TTS_DIR

log = logging.getLogger("ai")

try:
    from google import genai
    from google.genai import errors as genai_errors
    from google.genai import types
except ImportError:  # AI_FAKE rejimida kutubxonasiz ham ishlaydi
    genai = None


class AIError(Exception):
    """Foydalanuvchiga ko'rsatiladigan xato (o'zbek tilida)."""


SYSTEM = """You are "Prep Way AI ustoz" — a patient, precise Korean-language teacher for Uzbek speakers
preparing for TOPIK and EPS-TOPIK.
Rules:
- Write every explanation, tip and translation in Uzbek using the Latin script (modern orthography: o', g', sh, ch).
- Write Korean in Hangul. Add romanization only in fields that ask for it.
- Be accurate. If you are unsure, say so briefly instead of inventing facts.
- Be encouraging but honest: never inflate scores. Scores are integers from 0 to 100.
- Reply ONLY with a single JSON object exactly in the requested shape, with no extra keys and no markdown."""

_client = None


def _cli():
    global _client
    if genai is None:
        raise AIError("Server sozlanmagan: google-genai kutubxonasi o'rnatilmagan.")
    if not config.GEMINI_API_KEY:
        raise AIError("Server sozlanmagan: GEMINI_API_KEY kiritilmagan.")
    if _client is None:
        _client = genai.Client(api_key=config.GEMINI_API_KEY)
    return _client


def _api_error_to_uz(e: Exception) -> AIError:
    code = getattr(e, "code", None)
    log.warning("Gemini xatosi: %s", e)
    if code == 429:
        return AIError("AI hozir juda band (so'rovlar limiti). 1–2 daqiqadan keyin qayta urinib ko'ring.")
    if code in (401, 403):
        return AIError("AI kaliti noto'g'ri yoki ruxsat yo'q. Administrator GEMINI_API_KEY ni tekshirsin.")
    if code == 404:
        return AIError("AI modeli topilmadi. Administrator GEMINI_MODEL nomini yangilasin.")
    return AIError("AI javob bera olmadi. Birozdan keyin qayta urinib ko'ring.")


def _parse_json(text: str) -> dict:
    text = (text or "").strip()
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text)
    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        m = re.search(r"\{.*\}", text, re.S)
        if not m:
            raise
        data = json.loads(m.group(0))
    if not isinstance(data, dict):
        raise json.JSONDecodeError("not an object", text, 0)
    return data


async def _json_call(parts: list, temperature: float = 0.4) -> dict:
    cfg = types.GenerateContentConfig(
        system_instruction=SYSTEM,
        response_mime_type="application/json",
        temperature=temperature,
    )
    last = None
    for _attempt in range(2):
        try:
            resp = await _cli().aio.models.generate_content(model=config.GEMINI_MODEL, contents=parts, config=cfg)
            return _parse_json(resp.text)
        except json.JSONDecodeError as e:
            last = e
            continue
        except genai_errors.APIError as e:
            raise _api_error_to_uz(e)
    log.warning("JSON o'qib bo'lmadi: %s", last)
    raise AIError("AI javobini o'qib bo'lmadi. Qayta urinib ko'ring.")


def _clamp(v, lo=0, hi=100):
    try:
        return max(lo, min(hi, int(round(float(v)))))
    except (TypeError, ValueError):
        return None


# ---------------------------------------------------------------- AUDIO
async def to_wav(data: bytes, filename: str = "audio") -> bytes:
    """Har qanday ovoz faylini (webm, mp4, ogg, m4a...) 16 kHz mono WAV ga aylantiradi (ffmpeg kerak)."""
    suffix = Path(filename).suffix or ".bin"
    with tempfile.TemporaryDirectory() as d:
        src, dst = Path(d) / f"in{suffix}", Path(d) / "out.wav"
        src.write_bytes(data)
        try:
            proc = await asyncio.create_subprocess_exec(
                "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(src),
                "-t", str(config.MAX_AUDIO_SECONDS), "-ac", "1", "-ar", "16000", str(dst),
                stdout=asyncio.subprocess.DEVNULL, stderr=asyncio.subprocess.PIPE,
            )
        except FileNotFoundError:
            raise AIError("Server sozlanmagan: ffmpeg o'rnatilmagan.")
        _, err = await proc.communicate()
        if proc.returncode != 0 or not dst.exists():
            log.warning("ffmpeg: %s", err.decode(errors="ignore")[:300])
            raise AIError("Ovoz faylini o'qib bo'lmadi. Qayta yozib ko'ring.")
        wav = dst.read_bytes()
    if len(wav) < 16000 * 2 * 0.5:  # 0.5 soniyadan qisqa
        raise AIError("Ovoz juda qisqa. Tugmani bosib, gapni to'liq ayting.")
    return wav


async def wav_to_ogg_opus(wav: bytes) -> bytes:
    """Telegram ovozli xabari (voice) uchun OGG/Opus."""
    proc = await asyncio.create_subprocess_exec(
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-i", "pipe:0", "-c:a", "libopus", "-b:a", "32k",
        "-f", "ogg", "pipe:1",
        stdin=asyncio.subprocess.PIPE, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE,
    )
    out, _ = await proc.communicate(wav)
    if proc.returncode != 0 or not out:
        raise AIError("Ovozni tayyorlab bo'lmadi.")
    return out


async def transcribe(wav: bytes) -> str:
    """Ovozni koreyscha matnga aylantiradi. Maqsad gap ko'rsatilmaydi — xatolar to'g'rilanib ketmasligi uchun."""
    if config.AI_FAKE:
        return "안녕하세요 저는 우즈베키스탄 사람이에요"
    data = await _json_call([
        types.Part.from_bytes(data=wav, mime_type="audio/wav"),
        "Transcribe this learner's speech exactly as spoken, in Hangul. Do NOT correct grammar or pronunciation "
        "errors: write what is actually heard, even if it is wrong. If a part is unintelligible, write what it "
        "sounds like. If the speech is not Korean, transcribe it in its own language. "
        'Shape: {"transcript": "...", "is_korean": true}',
    ], temperature=0.0)
    return str(data.get("transcript", "")).strip()


# ---------------------------------------------------------------- TALAFFUZ BAHOLASH
async def score_speech(wav: bytes, target: str, transcript: str) -> dict:
    """Maqsad gapni o'qishni baholaydi (talaffuz, ravonlik) va maslahat beradi."""
    if config.AI_FAKE:
        return {"pronunciation": 72, "fluency": 65,
                "problems": [{"part": target[:3], "issue_uz": "Batchim (oxirgi undosh) aniq eshitilmadi."}],
                "feedback_uz": "Yaxshi urinish! Bo'g'inlarni sekinroq va aniqroq ayting.",
                "tips_uz": ["Gapni avval sekin, keyin odatiy tezlikda ayting.", "Audio namunani 3 marta tinglab, keyin takrorlang."]}
    data = await _json_call([
        types.Part.from_bytes(data=wav, mime_type="audio/wav"),
        f"A learner (native Uzbek speaker) read this Korean target sentence aloud: «{target}».\n"
        f"An independent transcript of what they said: «{transcript}».\n"
        "Listen carefully and evaluate:\n"
        "- pronunciation (0-100): consonants (평음/경음/격음), vowels, 받침, 연음, 경음화, 비음화, intonation.\n"
        "- fluency (0-100): pace, pauses, hesitation, naturalness.\n"
        "- problems: up to 3 concrete problems, each pointing to a word/syllable from the target, explained in Uzbek "
        "with how to fix it (mouth/tongue position or the correct sound change rule).\n"
        "- feedback_uz: 1–2 sentences, specific and encouraging.\n"
        "- tips_uz: up to 3 short practical tips.\n"
        "If the audio is silent, not Korean, or unrelated to the target, give low scores and say so in feedback_uz.\n"
        'Shape: {"pronunciation": 0, "fluency": 0, "problems": [{"part": "", "issue_uz": ""}], '
        '"feedback_uz": "", "tips_uz": [""]}',
    ], temperature=0.2)
    return {
        "pronunciation": _clamp(data.get("pronunciation")) or 0,
        "fluency": _clamp(data.get("fluency")) or 0,
        "problems": [p for p in data.get("problems", []) if isinstance(p, dict)][:3],
        "feedback_uz": str(data.get("feedback_uz", "")),
        "tips_uz": [str(t) for t in data.get("tips_uz", [])][:3],
    }


# ---------------------------------------------------------------- AI SUHBATDOSH
TOPICS = {
    "intro": "o'zini tanishtirish (자기소개)",
    "work": "ish joyida: zavod, xavfsizlik, rahbar bilan gaplashish (EPS-TOPIK)",
    "shop": "do'konda va bozorda xarid qilish",
    "hospital": "kasalxona va dorixonada",
    "daily": "kundalik hayot: ob-havo, dam olish, oila",
    "free": "erkin mavzu",
}


async def chat_turn(history: list, user_text: str, level: str, topic: str, wav: bytes | None = None) -> dict:
    """Suhbatning bir qadami: foydalanuvchi gapini baholaydi va keyingi gapni aytadi."""
    if config.AI_FAKE:
        return {"corrected_ko": user_text, "correction_uz": "",
                "scores": {"grammar": 85, "vocabulary": 80, "pronunciation": 75 if wav else None},
                "reply_ko": "반가워요! 한국어를 얼마나 공부했어요?", "reply_uz": "Tanishganimdan xursandman! Koreys tilini qancha vaqt o'qidingiz?",
                "help_uz": ""}
    hist = "\n".join(f"{'AI' if h.get('role') == 'ai' else 'Learner'}: {str(h.get('ko', ''))[:300]}" for h in history[-10:])
    parts = []
    if wav:
        parts.append(types.Part.from_bytes(data=wav, mime_type="audio/wav"))
    parts.append(
        f"Roleplay conversation practice. Topic: {TOPICS.get(topic, TOPICS['free'])}. Learner level: {level}.\n"
        f"Conversation so far:\n{hist or '(start of conversation)'}\n\n"
        f"Learner's new message{' (spoken; audio attached, transcript below)' if wav else ''}: «{user_text}»\n\n"
        "Do the following:\n"
        "1. If the learner wrote in Korean: give corrected_ko (natural, correct Korean; same as input if already "
        "correct) and correction_uz (what was wrong and why, in Uzbek; empty string if correct). "
        "Score grammar and vocabulary 0-100" + (", and pronunciation 0-100 from the audio" if wav else "") + ".\n"
        "2. If the learner wrote in Uzbek/Russian/English or asked for help, put the help in help_uz "
        "(teach how to say it in Korean, with the Korean sentence) and set scores to null.\n"
        "3. reply_ko: your next line in the roleplay — 1–3 short sentences matching the learner's level, "
        "usually ending with a question to keep the conversation going. reply_uz: its Uzbek translation.\n"
        'Shape: {"corrected_ko": "", "correction_uz": "", "scores": {"grammar": 0, "vocabulary": 0, '
        '"pronunciation": null}, "help_uz": "", "reply_ko": "", "reply_uz": ""}'
    )
    data = await _json_call(parts, temperature=0.6)
    sc = data.get("scores") or {}
    return {
        "corrected_ko": str(data.get("corrected_ko", "")),
        "correction_uz": str(data.get("correction_uz", "")),
        "scores": {"grammar": _clamp(sc.get("grammar")), "vocabulary": _clamp(sc.get("vocabulary")),
                   "pronunciation": _clamp(sc.get("pronunciation")) if wav else None},
        "help_uz": str(data.get("help_uz", "")),
        "reply_ko": str(data.get("reply_ko", "")),
        "reply_uz": str(data.get("reply_uz", "")),
    }


# ---------------------------------------------------------------- MASLAHATLAR
async def advice(stats: dict) -> dict:
    if config.AI_FAKE:
        return {"summary_uz": "O'qish bo'limi yaxshi, tinglashni kuchaytirish kerak.",
                "strengths_uz": ["O'qishda yaxshi natija"], "weaknesses_uz": ["Tinglash"],
                "tips": [{"title_uz": "Har kuni 15 daqiqa tinglang", "text_uz": "Qisqa dialoglarni tinglab, matnini yozing."}],
                "week_plan": [{"day": "1-kun", "task_uz": "20 ta yangi so'z + 1 ta mock test"}]}
    data = await _json_call([
        "Here are a learner's study statistics from the app (JSON):\n"
        + json.dumps(stats, ensure_ascii=False)[:6000]
        + "\n\nGive personalised, concrete advice in Uzbek for passing their target exam. Base it ONLY on these "
        "numbers; if there is little data, say so and give a starter plan. Mention which app sections to use "
        "(mock test, Gapirish/talaffuz, AI suhbatdosh, So'zlar, Kitoblarim).\n"
        'Shape: {"summary_uz": "", "strengths_uz": [""], "weaknesses_uz": [""], '
        '"tips": [{"title_uz": "", "text_uz": ""}], "week_plan": [{"day": "1-kun", "task_uz": ""}]}\n'
        "Give 3–5 tips and a 7-day plan.",
    ], temperature=0.5)
    return data


# ---------------------------------------------------------------- SO'ZLAR
LEVELS = {
    "topik1": "TOPIK I (1–2 daraja, boshlang'ich)",
    "eps": "EPS-TOPIK (ish joyi, zavod, qurilish, qishloq xo'jaligi, xavfsizlik)",
    "mid": "TOPIK II 3–4 daraja (o'rta)",
    "adv": "TOPIK II 5–6 daraja (eng yuqori: akademik va rasmiy so'zlar, Xitoy-koreys so'zlari)",
    "idiom": "koreys maqollari (속담) va to'rt belgili iboralar (사자성어)",
}


async def words(level: str, exclude: list[str], n: int = 10) -> list[dict]:
    if config.AI_FAKE:
        return [{"ko": "모색하다", "rom": "mosaekhada", "uz": "(yechim) izlamoq",
                 "example_ko": "해결 방안을 모색해야 합니다.", "example_uz": "Yechim yo'lini izlash kerak."}]
    data = await _json_call([
        f"Give {n} Korean vocabulary items for level: {LEVELS.get(level, LEVELS['mid'])}.\n"
        f"Choose genuinely useful items that appear in real exams; for advanced levels choose the hardest common "
        f"exam words. Do not repeat any of these: {', '.join(exclude[:80]) or '(none)'}.\n"
        "For each: ko (dictionary form), rom (Revised Romanization), uz (precise Uzbek meaning), example_ko "
        "(one natural sentence), example_uz (its translation).\n"
        'Shape: {"words": [{"ko": "", "rom": "", "uz": "", "example_ko": "", "example_uz": ""}]}',
    ], temperature=0.7)
    out = []
    for w in data.get("words", []):
        if isinstance(w, dict) and w.get("ko") and w.get("uz"):
            out.append({k: str(w.get(k, "")) for k in ("ko", "rom", "uz", "example_ko", "example_uz")})
    return out[:n]


# ---------------------------------------------------------------- KITOBLAR
async def upload_file(path: Path, mime: str) -> dict:
    """Faylni Gemini Files API ga yuklaydi (48 soat saqlanadi)."""
    try:
        f = await _cli().aio.files.upload(file=str(path), config={"mime_type": mime, "display_name": path.name[:60]})
        for _ in range(60):
            state = str(getattr(f.state, "value", f.state) or "")
            if state == "ACTIVE":
                break
            if state == "FAILED":
                raise AIError("Faylni AI qayta ishlay olmadi. Boshqa formatda yuborib ko'ring.")
            await asyncio.sleep(2)
            f = await _cli().aio.files.get(name=f.name)
        return {"name": f.name, "uri": f.uri, "mime": f.mime_type or mime, "expires": time.time() + 46 * 3600}
    except genai_errors.APIError as e:
        raise _api_error_to_uz(e)


def _book_part(book: dict, text: str | None):
    if text is not None:
        return f"BOOK TEXT START\n{text[:300000]}\nBOOK TEXT END"
    g = book["gemini_file"]
    return types.Part.from_uri(file_uri=g["uri"], mime_type=g["mime"])


async def analyze_book(book: dict, text: str | None) -> dict:
    """Kitob koreys tiliga oidmi — tekshiradi va darslar ro'yxatini tuzadi."""
    if config.AI_FAKE:
        return {"is_korean_material": True, "korean_share_percent": 60, "reason_uz": "Koreys tili darsligi.",
                "title": "Namunaviy koreys tili darsligi", "level": "Boshlang'ich (TOPIK 1–2)",
                "lessons": [{"n": 1, "title": "제1과 인사", "summary_uz": "Salomlashish va tanishuv", "pages": "1–8"},
                            {"n": 2, "title": "제2과 가족", "summary_uz": "Oila a'zolari", "pages": "9–16"}]}
    return await _json_call([
        _book_part(book, text),
        "Decide whether this document is Korean-language learning material: a Korean language textbook, workbook, "
        "grammar or vocabulary guide, TOPIK/EPS-TOPIK preparation book, or a text written mainly in Korean "
        "(e.g. a Korean story or article for reading practice). Books about other subjects or in other languages "
        "without substantial Korean content are NOT acceptable, even if they mention Korea.\n"
        "If acceptable, list the book's lessons/units in order (use its own units such as 제1과 when present; "
        "otherwise split it into logical topics), maximum 30. For each: n, title (as in the book), summary_uz "
        "(one line), pages (page range if visible, else empty).\n"
        "level: the CEFR-like level in Uzbek, e.g. \"Boshlang'ich (TOPIK 1–2)\", \"O'rta (TOPIK 3–4)\", "
        "\"Yuqori (TOPIK 5–6)\".\n"
        'Shape: {"is_korean_material": true, "korean_share_percent": 0, "reason_uz": "", "title": "", '
        '"level": "", "lessons": [{"n": 1, "title": "", "summary_uz": "", "pages": ""}]}',
    ], temperature=0.1)


async def make_lesson(book: dict, text: str | None, lesson: dict) -> dict:
    """Kitobning bitta darsi asosida interaktiv dars tuzadi."""
    if config.AI_FAKE:
        return {
            "title": lesson.get("title", "Dars"), "intro_uz": "Bu darsda salomlashishni o'rganamiz.",
            "vocab": [{"ko": "안녕하세요", "rom": "annyeonghaseyo", "uz": "Assalomu alaykum"},
                      {"ko": "반갑습니다", "rom": "bangapseumnida", "uz": "Tanishganimdan xursandman"}],
            "grammar": [{"pattern": "N은/는 N입니다", "explain_uz": "\"... — ...dir\" degan tasdiq gap.",
                         "examples": [{"ko": "저는 학생입니다.", "uz": "Men talabaman."}]}],
            "reading": {"ko": "안녕하세요. 저는 아민입니다. 우즈베키스탄 사람입니다.", "uz": "Salom. Men Aminman. O'zbekistonlikman."},
            "exercises": [{"q": "\"Men talabaman\" koreyscha qanday?", "options": ["저는 학생입니다.", "저는 선생님입니다.", "학생이 없습니다.", "학교에 갑니다."],
                           "answer": 0, "explain_uz": "학생 — talaba, -입니다 — \"...dir\"."}],
            "speaking": [{"ko": "저는 우즈베키스탄 사람입니다.", "uz": "Men o'zbekistonlikman."}],
            "tips_uz": ["Yangi so'zlarni ovoz chiqarib takrorlang."]}
    data = await _json_call([
        _book_part(book, text),
        f"Teach lesson {lesson.get('n')} of this book: «{lesson.get('title', '')}» "
        f"(pages: {lesson.get('pages') or 'unknown'}). Use the book's own content for this lesson: its words, "
        "grammar points and topics. Explain everything in Uzbek for a self-learner.\n"
        "Do not copy long passages: quote at most two short sentences from the book; write your own reading text "
        "using the lesson's vocabulary and grammar.\n"
        "Return: title; intro_uz (2–3 sentences: what we learn); vocab (8–15 items: ko, rom, uz); grammar (1–4 "
        "points: pattern, explain_uz with rules and exceptions, examples: 2–3 {ko, uz}); reading {ko (5–8 "
        "sentences), uz}; exercises (6 multiple-choice questions mixing vocab, grammar and reading: q (may "
        "contain Korean), options (exactly 4), answer (0-based index), explain_uz); speaking (4 sentences to "
        "read aloud: ko, uz); tips_uz (2–3 study tips).\n"
        'Shape: {"title": "", "intro_uz": "", "vocab": [{"ko": "", "rom": "", "uz": ""}], '
        '"grammar": [{"pattern": "", "explain_uz": "", "examples": [{"ko": "", "uz": ""}]}], '
        '"reading": {"ko": "", "uz": ""}, "exercises": [{"q": "", "options": ["", "", "", ""], "answer": 0, '
        '"explain_uz": ""}], "speaking": [{"ko": "", "uz": ""}], "tips_uz": [""]}',
    ], temperature=0.4)
    # Mashqlarni tekshirib, buzuqlarini olib tashlaymiz
    ex = []
    for e in data.get("exercises", []):
        try:
            if isinstance(e, dict) and len(e.get("options", [])) == 4 and 0 <= int(e.get("answer", -1)) < 4:
                e["answer"] = int(e["answer"])
                ex.append(e)
        except (TypeError, ValueError):
            pass
    data["exercises"] = ex
    return data


# ---------------------------------------------------------------- TTS (matnni ovozga)
def _pcm_to_wav(pcm: bytes, rate: int = 24000) -> bytes:
    buf = io.BytesIO()
    with wave.open(buf, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(pcm)
    return buf.getvalue()


def tts_cache_path(text: str) -> Path:
    h = hashlib.sha1(f"{config.GEMINI_TTS_MODEL}|{config.TTS_VOICE}|{text}".encode()).hexdigest()
    return TTS_DIR / f"{h}.wav"


async def tts(text: str) -> bytes:
    """Koreyscha matnni ovozga aylantiradi (WAV). Natija keshlanadi: bir gap bir marta yaratiladi."""
    text = text.strip()[:400]
    path = tts_cache_path(text)
    if path.exists():
        return path.read_bytes()
    if config.AI_FAKE:
        raise AIError("Sinov rejimida server ovozi yo'q.")
    voice_variants = [
        types.VoiceConfig(voice=config.TTS_VOICE),
        types.VoiceConfig(prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=config.TTS_VOICE)),
    ]
    last = None
    for vc in voice_variants:
        try:
            resp = await _cli().aio.models.generate_content(
                model=config.GEMINI_TTS_MODEL,
                contents=text,
                config=types.GenerateContentConfig(
                    response_modalities=["AUDIO"],
                    speech_config=types.SpeechConfig(voice_config=vc, language_code="ko-KR"),
                ),
            )
            part = resp.candidates[0].content.parts[0].inline_data
            rate = 24000
            m = re.search(r"rate=(\d+)", part.mime_type or "")
            if m:
                rate = int(m.group(1))
            data = part.data if (part.mime_type or "").startswith("audio/wav") else _pcm_to_wav(part.data, rate)
            path.write_bytes(data)
            return data
        except genai_errors.ClientError as e:
            last = e  # boshqa ovoz sozlamasi bilan qayta urinamiz
            continue
        except genai_errors.APIError as e:
            raise _api_error_to_uz(e)
        except (AttributeError, IndexError, TypeError) as e:
            log.warning("TTS javobi kutilmagan: %s", e)
            raise AIError("Ovoz yaratib bo'lmadi.")
    raise _api_error_to_uz(last)
