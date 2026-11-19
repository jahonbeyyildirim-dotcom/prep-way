"""Gemini API bilan ishlash: ovozni baholash, AI suhbatdosh, maslahatlar, so'zlar, kitob tahlili, darslar, TTS.

Barcha javoblar JSON ko'rinishida olinadi va tekshiriladi.
AI_FAKE=1 bo'lsa, Gemini'ga murojaat qilinmaydi: sinash uchun namunaviy javoblar qaytadi.
"""
import asyncio
import base64
import contextvars
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


SYSTEM = """You are "Komiko", the Hanguk Way AI tutor — a patient, precise Korean-language teacher for Uzbek speakers
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
        # Har bir so'rov uchun vaqt chegarasi (ms): band model uzoq kuttirmasin, zaxira modelga o'tamiz
        _client = genai.Client(api_key=config.GEMINI_API_KEY,
                               http_options=types.HttpOptions(timeout=config.GEMINI_TIMEOUT_MS,
                                                              retry_options=types.HttpRetryOptions(attempts=1)))
    return _client


# Foydalanuvchi tanlagan til (uz/ru/en): izohlar shu tilda yoziladi (JSON kalitlari o'zgarmaydi)
_LANG = contextvars.ContextVar("pw_lang", default="uz")
_LANG_NAME = {"ru": "Russian", "en": "English"}


def set_lang(lang: str) -> None:
    _LANG.set(lang if lang in ("uz", "ru", "en") else "uz")


def _lang_note() -> str | None:
    name = _LANG_NAME.get(_LANG.get())
    if not name:
        return None
    return (f"IMPORTANT: the learner's interface language is {name}. Write every explanation/feedback/tip/translation "
            f"field (including JSON keys ending in _uz) in {name}, not Uzbek. Keep the JSON keys exactly as specified.")


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


_PROV = contextvars.ContextVar("pw_ai_provider", default="")


def last_provider() -> str:
    """Oxirgi matnli so'rovga qaysi AI javob berdi: "claude" yoki "ai" (Gemini)."""
    return _PROV.get()


def claude_enabled() -> bool:
    return bool(config.ANTHROPIC_API_KEY)


async def _claude_json(text: str, temperature: float, max_tokens: int = 2000) -> dict:
    """Claude (Anthropic Messages API) — faqat matnli so'rovlar uchun."""
    import aiohttp
    body = {"model": config.CLAUDE_MODEL, "max_tokens": max_tokens, "temperature": temperature,
            "system": SYSTEM, "messages": [{"role": "user", "content": text}]}
    async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=config.CLAUDE_TIMEOUT_S)) as s:
        async with s.post(config.CLAUDE_API_URL, json=body, headers={
                "x-api-key": config.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01",
                "content-type": "application/json"}) as r:
            data = await r.json(content_type=None)
            if r.status != 200:
                raise RuntimeError(f"Claude {r.status}: {str(data)[:160]}")
    txt = "".join(b.get("text", "") for b in data.get("content", []) if b.get("type") == "text")
    return _parse_json(txt)


async def _json_call(parts: list, temperature: float = 0.4, lang_note: bool = True, max_tokens: int = 2000) -> dict:
    note = _lang_note() if lang_note else None
    if note:
        parts = list(parts) + [note]
    # Matnli so'rov: avval Claude (kalit berilgan bo'lsa), ishlamasa — Gemini
    if claude_enabled() and all(isinstance(p, str) for p in parts):
        try:
            res = await _claude_json("\n\n".join(parts), temperature, max_tokens)
            _PROV.set("claude")
            return res
        except Exception as e:
            log.warning("Claude javob bermadi, Gemini'ga o'tilmoqda: %s", e)
    res = await _gemini_json(parts, temperature)
    _PROV.set("ai")
    return res


async def _gemini_json(parts: list, temperature: float = 0.4) -> dict:
    cfg = types.GenerateContentConfig(
        system_instruction=SYSTEM,
        response_mime_type="application/json",
        temperature=temperature,
    )
    last = None
    models = [config.GEMINI_MODEL] + [m for m in config.GEMINI_FALLBACK_MODELS if m != config.GEMINI_MODEL]
    for _attempt in range(2):
        for i, model in enumerate(models):
            try:
                resp = await _cli().aio.models.generate_content(model=model, contents=parts, config=cfg)
                return _parse_json(resp.text)
            except json.JSONDecodeError as e:
                last = e
                break
            except genai_errors.APIError as e:
                code = getattr(e, "code", 0) or 0
                # Model band (503), limit (429) yoki vaqtinchalik xato — keyingi modelga o'tamiz
                if code in (429, 500, 503, 504, 404) and i < len(models) - 1:
                    log.warning("Model %s javob bermadi (%s) — %s ga o'tilmoqda", model, code, models[i + 1])
                    continue
                raise _api_error_to_uz(e)
            except Exception as e:  # vaqt tugashi (timeout) — keyingi modelga o'tamiz
                if "timeout" in type(e).__name__.lower() and i < len(models) - 1:
                    log.warning("Model %s vaqtida javob bermadi — %s ga o'tilmoqda", model, models[i + 1])
                    continue
                if "timeout" in type(e).__name__.lower():
                    raise AIError("AI hozir band. Birozdan keyin qayta urinib ko'ring.")
                raise
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


# ---------------------------------------------------------------- ROLLI VAZIYATLAR
def _load_roles() -> dict:
    """miniapp/roleplay-data.js dan vaziyatlarni o'qiydi (mijoz bilan bitta manba)."""
    try:
        raw = (Path(__file__).resolve().parent.parent / "miniapp" / "roleplay-data.js").read_text(encoding="utf-8")
        raw = raw[raw.index("["):raw.rindex("]") + 1]
        return {r["id"]: r for r in json.loads(raw)}
    except Exception:
        log.exception("roleplay-data.js o'qilmadi")
        return {}


ROLES = _load_roles()


async def roleplay_turn(rid: str, history: list, user_text: str, level: str, done: list, mode: str,
                        wav: bytes | None = None) -> dict:
    """Rolli vaziyat: bir qadam (turn), maslahat (hint) yoki yakuniy hisobot (finish)."""
    r = ROLES.get(rid)
    if not r:
        raise AIError("Bunday vaziyat topilmadi.")
    goals = r["goals"]
    glist = "\n".join(f"{i}. {g['en']}" + (" (DONE)" if i in done else "") for i, g in enumerate(goals))
    hist = "\n".join(f"{'AI' if h.get('role') == 'ai' else 'Learner'}: {str(h.get('ko', ''))[:300]}" for h in history[-14:])
    head = (f"Korean roleplay practice for a learner from Uzbekistan. ROLE: {r['role']}\nLearner level: {level}.\n"
            f"The learner's goals in this scene:\n{glist}\nConversation so far:\n{hist or '(start)'}\n\n")
    if config.AI_FAKE:
        if mode == "hint":
            nxt = next((g for i, g in enumerate(goals) if i not in done), goals[-1])
            return {"hint_ko": nxt.get("ko", ""), "hint_uz": nxt.get("uz", "")}
        if mode == "finish":
            return {"summary_uz": "Sinov rejimi: suhbat yaxshi o'tdi.", "phrases": [{"ko": g["ko"], "uz": g["uz"]} for g in goals[:3]],
                    "score": 80}
        nd = next((i for i in range(len(goals)) if i not in done), None)
        return {"corrected_ko": user_text, "correction_uz": "", "scores": {"grammar": 85, "vocabulary": 80, "pronunciation": 75 if wav else None},
                "reply_ko": "네, 알겠어요. 또 궁금한 거 있어요?", "reply_uz": "Ha, tushundim. Yana savolingiz bormi?",
                "goals_done": [nd] if nd is not None else [], "help_uz": ""}
    if mode == "hint":
        data = await _json_call([head + "The learner is stuck. Suggest ONE natural Korean sentence they could say next that "
                                 "fits the conversation and moves toward an unfinished goal, at their level. Give its Uzbek meaning.\n"
                                 'Shape: {"hint_ko": "", "hint_uz": ""}'], temperature=0.5)
        return {"hint_ko": str(data.get("hint_ko", "")), "hint_uz": str(data.get("hint_uz", ""))}
    if mode == "finish":
        data = await _json_call([head + "The scene is over. Write summary_uz: 2–3 sentences in Uzbek on how the learner did "
                                 "(what was good, the main thing to improve). phrases: 4–6 useful Korean phrases from this scene "
                                 "the learner should remember (prefer ones they struggled with), each with Uzbek meaning. "
                                 "score: overall 0–100 for communication in this scene.\n"
                                 'Shape: {"summary_uz": "", "phrases": [{"ko": "", "uz": ""}], "score": 0}'], temperature=0.3)
        ph = [{"ko": str(p.get("ko", "")), "uz": str(p.get("uz", ""))} for p in data.get("phrases", [])[:6] if isinstance(p, dict) and p.get("ko")]
        return {"summary_uz": str(data.get("summary_uz", "")), "phrases": ph, "score": _clamp(data.get("score")) or 0}
    parts = []
    if wav:
        parts.append(types.Part.from_bytes(data=wav, mime_type="audio/wav"))
    parts.append(head + f"Learner's new message{' (spoken; audio attached, transcript below)' if wav else ''}: «{user_text}»\n\n"
                 "1. If the learner wrote Korean: corrected_ko (natural correct Korean, same if already correct), correction_uz "
                 "(what was wrong and why, in Uzbek; empty if correct). Score grammar and vocabulary 0-100"
                 + (", pronunciation 0-100 from the audio" if wav else "") + ".\n"
                 "2. If the learner wrote Uzbek/Russian/English or asked for help: help_uz teaches how to say it in Korean; scores null.\n"
                 "3. goals_done: indexes of goals (not already DONE) that the learner's message clearly accomplished "
                 "(meaning matters, small mistakes are fine).\n"
                 "4. reply_ko: stay in character, 1–3 short sentences at the learner's level, naturally steering toward the "
                 "unfinished goals; reply_uz: Uzbek translation. If all goals are done, close the scene naturally.\n"
                 'Shape: {"corrected_ko": "", "correction_uz": "", "scores": {"grammar": 0, "vocabulary": 0, "pronunciation": null}, '
                 '"goals_done": [0], "help_uz": "", "reply_ko": "", "reply_uz": ""}')
    data = await _json_call(parts, temperature=0.6)
    sc = data.get("scores") or {}
    gd = []
    for g in data.get("goals_done") or []:
        try:
            g = int(g)
        except (TypeError, ValueError):
            continue
        if 0 <= g < len(goals) and g not in done and g not in gd:
            gd.append(g)
    return {"corrected_ko": str(data.get("corrected_ko", "")), "correction_uz": str(data.get("correction_uz", "")),
            "scores": {"grammar": _clamp(sc.get("grammar")), "vocabulary": _clamp(sc.get("vocabulary")),
                       "pronunciation": _clamp(sc.get("pronunciation")) if wav else None},
            "goals_done": gd, "help_uz": str(data.get("help_uz", "")),
            "reply_ko": str(data.get("reply_ko", "")), "reply_uz": str(data.get("reply_uz", ""))}


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
        "(mock test — EPS-TOPIK, TOPIK I or TOPIK II, TOPIK II Yozish 51–54 with AI grading, TOPIK II Grammatika, "
        "Gapirish/talaffuz, AI suhbatdosh, So'zlar, Kitoblarim). TOPIK levels: TOPIK I 80→1, 140→2 (of 200); "
        "TOPIK II 120→3, 150→4, 190→5, 230→6 (of 300).\n"
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


def voice_name(gender: str | None) -> str:
    return config.TTS_VOICE_MALE if gender == "male" else config.TTS_VOICE


def tts_cache_path(text: str, gender: str | None = None) -> Path:
    h = hashlib.sha1(f"{config.GEMINI_TTS_MODEL}|{voice_name(gender)}|{text}".encode()).hexdigest()
    return TTS_DIR / f"{h}.wav"


async def tts(text: str, gender: str | None = None) -> bytes:
    """Koreyscha matnni Komiko ovozida (ayol/erkak) WAV ga aylantiradi. Natija keshlanadi."""
    text = text.strip()[:400]
    path = tts_cache_path(text, gender)
    vname = voice_name(gender)
    if path.exists():
        return path.read_bytes()
    if config.AI_FAKE:
        raise AIError("Sinov rejimida server ovozi yo'q.")
    # Gemini 3.8 TTS: Interactions API (javob odatda tayyor WAV, base64)
    it, err = None, None
    for model in dict.fromkeys([config.GEMINI_TTS_MODEL, "gemini-3.8-flash-tts"]):
        try:
            it = await _cli().aio.interactions.create(
                api_version="v1beta",
                model=model,
                input=[{"type": "user_input", "content": [{"type": "text", "text": text}]}],
                response_format={"type": "audio"},
                generation_config={"speech_config": [{"voice": vname}]},
            )
            break
        except genai_errors.APIError as e:
            err = _api_error_to_uz(e)
        except Exception as e:  # Interactions API o'z xato sinflaridan foydalanadi
            log.warning("TTS (%s) xatosi: %s", model, str(e)[:300])
            err = AIError("Ovoz yaratib bo'lmadi. Birozdan keyin qayta urinib ko'ring.")
    if it is None:
        raise err
    audio = _find_audio(it.model_dump() if hasattr(it, "model_dump") else it)
    if not audio:
        log.warning("TTS javobida audio topilmadi")
        raise AIError("Ovoz yaratib bo'lmadi.")
    raw, mime = audio
    data = base64.b64decode(raw) if isinstance(raw, str) else raw
    if not (mime or "").startswith("audio/wav") and data[:4] != b"RIFF":
        rate = 24000
        m = re.search(r"rate=(\d+)", mime or "")
        if m:
            rate = int(m.group(1))
        data = _pcm_to_wav(data, rate)
    path.write_bytes(data)
    return data


async def tts_uz(text: str, gender: str | None = None) -> bytes:
    """O'zbekcha matnni ovozga aylantiradi (diktor, namoyish videolari, o'zbekcha izohlar). Natija keshlanadi."""
    text = text.strip()[:400]
    vname = voice_name(gender)
    path = TTS_DIR / (hashlib.sha1(f"uz|{vname}|{text}".encode()).hexdigest() + ".wav")
    if path.exists():
        return path.read_bytes()
    if config.AI_FAKE:
        raise AIError("Sinov rejimida server ovozi yo'q.")
    it, err = None, None
    # 130 tilli flagman model birinchi (o'zbek tili uchun), keyin lite
    for model in dict.fromkeys(["gemini-3.8-flash-tts", config.GEMINI_TTS_MODEL]):
        try:
            it = await _cli().aio.interactions.create(
                api_version="v1beta", model=model,
                input=[{"type": "user_input", "content": [{"type": "text", "text": text}]}],
                response_format={"type": "audio"},
                generation_config={"speech_config": [{"voice": vname}]},
            )
            break
        except genai_errors.APIError as e:
            err = _api_error_to_uz(e)
        except Exception as e:
            log.warning("TTS-uz (%s) xatosi: %s", model, str(e)[:300])
            err = AIError("Ovoz yaratib bo'lmadi. Birozdan keyin qayta urinib ko'ring.")
    if it is None:
        raise err
    audio = _find_audio(it.model_dump() if hasattr(it, "model_dump") else it)
    if not audio:
        raise AIError("Ovoz yaratib bo'lmadi.")
    raw, mime = audio
    data = base64.b64decode(raw) if isinstance(raw, str) else raw
    if not (mime or "").startswith("audio/wav") and data[:4] != b"RIFF":
        m = re.search(r"rate=(\d+)", mime or "")
        data = _pcm_to_wav(data, int(m.group(1)) if m else 24000)
    TTS_DIR.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    return data


def _find_audio(obj):
    """Interactions javobidan oxirgi audio bo'lagini (data, mime_type) topadi."""
    found = None
    if isinstance(obj, dict):
        if obj.get("type") == "audio" and obj.get("data"):
            found = (obj["data"], obj.get("mime_type") or obj.get("mimeType") or "")
        for v in obj.values():
            r = _find_audio(v)
            if r:
                found = r
    elif isinstance(obj, (list, tuple)):
        for v in obj:
            r = _find_audio(v)
            if r:
                found = r
    return found


# ---------------------------------------------------------------- DAFTAR TEKSHIRUVI (rasm)
async def check_homework(image: bytes, mime: str, task: dict) -> dict:
    """O'quvchi daftarga qo'lda yozgan topshiriqni rasm orqali tekshiradi."""
    items = [i for i in (task.get("items") or []) if isinstance(i, dict)][:12]
    if config.AI_FAKE:
        return {"recognized_text": "\n".join(str(i.get("ko", "")) for i in items),
                "items": [{"n": k + 1, "written": i.get("ko", ""), "ok": True, "note_uz": ""} for k, i in enumerate(items)],
                "feedback_uz": "Sinov rejimi: hammasi to'g'ri deb belgilandi."}
    listing = "\n".join(f'{k + 1}. prompt (Uzbek): {i.get("uz", "")} | expected Korean: {i.get("ko", "")}' for k, i in enumerate(items))
    data = await _json_call([
        types.Part.from_bytes(data=image, mime_type=mime),
        "This is a photo of a learner's paper notebook. The learner was given this task:\n"
        f"«{task.get('title_uz', '')}»\n{listing}\n"
        "Read the HANDWRITTEN Korean in the photo. For every numbered item decide if the learner wrote the expected Korean "
        "correctly (minor spacing differences are OK; wrong/missing letters, wrong 받침 or vowels are NOT OK). "
        "If an item is missing in the photo, written=\"\" and ok=false. If the photo is not a notebook/handwriting, "
        "say so in feedback_uz and mark all items false.\n"
        "For wrong items explain the mistake in Uzbek in note_uz (which letter is wrong and why).\n"
        'Shape: {"recognized_text": "", "items": [{"n": 1, "written": "", "ok": true, "note_uz": ""}], "feedback_uz": ""}',
    ], temperature=0.1)
    out = []
    for k, i in enumerate(items):
        got = next((x for x in data.get("items", []) if isinstance(x, dict) and int(x.get("n") or 0) == k + 1), {})
        out.append({"n": k + 1, "written": str(got.get("written", "")), "ok": bool(got.get("ok")),
                    "note_uz": str(got.get("note_uz", ""))})
    return {"recognized_text": str(data.get("recognized_text", "")), "items": out,
            "feedback_uz": str(data.get("feedback_uz", ""))}


# ---------------------------------------------------------------- TOPIK II YOZISH (쓰기 51–54)
WRITE_RUBRIC = {
    51: (10, "Two blanks ㉠ and ㉡ in a practical text (notice, e-mail, message), 5 points each. For each blank judge: "
             "does the sentence fit the context and connect logically to the sentences before AND after it; is the "
             "grammar correct; does the style/politeness match the text (formal -ㅂ니다 in notices, -아요 in a casual "
             "message). Give 5 (fully right), 3 (meaning right but grammar/style flaws), 1 (partly related) or 0.",
         [("blank_a", "㉠", 5), ("blank_b", "㉡", 5)]),
    52: (10, "Two blanks ㉠ and ㉡ in an expository paragraph, 5 points each. Each answer must be ONE sentence that fits "
             "the logic (cause, contrast, conclusion…) of the surrounding sentences AND uses written style -다/-ㄴ다 "
             "(a -요/-ㅂ니다 ending loses points). Give 5, 3, 1 or 0 per blank.",
         [("blank_a", "㉠", 5), ("blank_b", "㉡", 5)]),
    53: (30, "A 200–300 character description of the given data/graph. Official criteria: 내용 및 과제 수행 (7): all "
             "key data included accurately, no personal opinion, no title, length 200–300; 글의 전개 구조 (7): logical "
             "order (overview → details/causes → outlook), proper connectives; 언어 사용 (16): accurate and varied "
             "grammar/vocabulary for describing data (증가하다, 차지하다, …에 이르다), written style -다 only. "
             "Deduct clearly for length outside 200–300, colloquial -요 endings, copying the data as a list.",
         [("content", "내용 및 과제 수행", 7), ("structure", "글의 전개 구조", 7), ("language", "언어 사용", 16)]),
    54: (50, "A 600–700 character argumentative essay answering the three given questions. Official criteria: 내용 및 "
             "과제 수행 (12): answers ALL three questions relevantly with rich, specific content, no copying of the prompt; "
             "글의 전개 구조 (12): clear introduction–body–conclusion, paragraphing that follows the questions, cohesive "
             "connectives; 언어 사용 (26): accuracy plus range of intermediate-advanced grammar and vocabulary, written "
             "style -다 only (no -요/-ㅂ니다), appropriate register. Deduct clearly for length outside 600–700.",
         [("content", "내용 및 과제 수행", 12), ("structure", "글의 전개 구조", 12), ("language", "언어 사용", 26)]),
}


async def explain_answer(exam: str, inst: str, body: str, opts: list, correct: int, your: int, note: str) -> dict:
    """Test savolidagi xatoni tushuntiradi ("Nega xato?")."""
    if config.AI_FAKE:
        return {"why_right": "To'g'ri javob matndagi kalit so'zga mos keladi.",
                "why_wrong": "Siz tanlagan variant matnda aytilmagan ma'noni beradi.",
                "words": [{"ko": "고장 나다", "uz": "buzilmoq"}], "tip": "Avval savolni o'qing, keyin matndan kalit so'zni qidiring."}
    letters = "①②③④"
    ol = "\n".join(f"{letters[i] if i < 4 else i + 1} {o}" for i, o in enumerate(opts[:4]))
    yours = f"{letters[your]} {opts[your]}" if 0 <= your < len(opts) else "(no answer)"
    data = await _json_call([
        f"You are a friendly, precise Korean teacher helping a learner prepare for {exam}. They got this exam question wrong.\n"
        f"INSTRUCTION: {inst[:400]}\nTEXT / AUDIO SCRIPT:\n{body[:2500]}\nOPTIONS:\n{ol}\n"
        f"CORRECT: {letters[correct]} {opts[correct]}\nLEARNER CHOSE: {yours}\n"
        f"(Existing short note, may help: {note[:600]})\n\n"
        "Explain in Uzbek (Latin script), simply, for this learner: why_right — why the correct option is right, quoting the exact "
        "Korean words in the text that prove it (2–3 sentences); why_wrong — why the learner's choice is wrong (what it actually "
        "means or which detail contradicts it; if no answer, say what to look for); words — up to 5 key Korean words/grammar "
        "patterns from the text with short meanings; tip — one practical strategy for this question type in the real exam.\n"
        'Shape: {"why_right": "", "why_wrong": "", "words": [{"ko": "", "uz": ""}], "tip": ""}',
    ], temperature=0.2, max_tokens=1200)
    words = [{"ko": str(w.get("ko", "")), "uz": str(w.get("uz", ""))} for w in data.get("words", [])[:5] if isinstance(w, dict) and w.get("ko")]
    return {"why_right": str(data.get("why_right", "")), "why_wrong": str(data.get("why_wrong", "")),
            "words": words, "tip": str(data.get("tip", ""))}


async def grade_writing(no: int, task: str, model: str, answer, chars: int) -> dict:
    """TOPIK II yozish javobini rasmiy mezonlar bo'yicha baholaydi."""
    mx, rubric, crit = WRITE_RUBRIC[no]
    if config.AI_FAKE:
        return {"score": round(mx * 0.6), "max": mx, "summary": "Sinov rejimi: taxminiy baho.",
                "criteria": [{"name": c[1], "score": round(c[2] * 0.6), "max": c[2], "comment": ""} for c in crit],
                "corrections": [], "tips": ["Yozma uslubdan (-다) foydalaning."], "improved": ""}
    if isinstance(answer, list):
        ans = "\n".join(f"{m}: {a}" for m, a in zip(("㉠", "㉡"), answer))
    else:
        ans = str(answer)
    shape_crit = ", ".join(f'{{"key": "{k}", "score": 0, "comment_uz": ""}}' for k, _n, _m in crit)
    data = await _json_call([
        f"You are an experienced official TOPIK II writing examiner. Grade question {no} (max {mx} points).\n"
        f"Rubric: {rubric}\n\n"
        f"TASK:\n{task[:2500]}\n\n"
        f"REFERENCE ANSWER (one good possibility, other correct answers are fine):\n{model[:2000]}\n\n"
        f"LEARNER'S ANSWER ({chars} characters incl. spaces):\n{ans[:3000]}\n\n"
        "Be strict and realistic like a real examiner — never inflate. Criteria scores must be integers within their max: "
        + ", ".join(f"{k}≤{m}" for k, _n, m in crit) + ".\n"
        "Then list concrete corrections of the learner's Korean (wrong → right, with a short reason in Uzbek), at most 10, "
        "most important first. Give 2–4 specific tips in Uzbek to score higher. In \"improved\" rewrite the learner's own "
        "answer in correct, natural Korean at a high level, keeping their ideas (for 51/52 give \"㉠: … / ㉡: …\").\n"
        'Shape: {"criteria": [' + shape_crit + '], "summary_uz": "", '
        '"corrections": [{"wrong": "", "right": "", "why_uz": ""}], "tips_uz": [""], "improved": ""}',
    ], temperature=0.2, max_tokens=3500)
    got = {str(c.get("key")): c for c in data.get("criteria", []) if isinstance(c, dict)}
    criteria, total = [], 0
    for k, name, m in crit:
        c = got.get(k, {})
        try:
            sc = int(round(float(c.get("score", 0))))
        except (TypeError, ValueError):
            sc = 0
        sc = max(0, min(m, sc))
        total += sc
        criteria.append({"name": name, "score": sc, "max": m, "comment": str(c.get("comment_uz", ""))})
    corr = [{"wrong": str(c.get("wrong", "")), "right": str(c.get("right", "")), "why": str(c.get("why_uz", ""))}
            for c in data.get("corrections", []) if isinstance(c, dict) and (c.get("wrong") or c.get("right"))][:10]
    tips = [str(t) for t in data.get("tips_uz", []) if t][:4]
    return {"score": total, "max": mx, "summary": str(data.get("summary_uz", "")), "criteria": criteria,
            "corrections": corr, "tips": tips, "improved": str(data.get("improved", ""))}


async def photo_words(image: bytes, mime: str, lang: str = "uz", hand: bool = False) -> dict:
    """Rasmdagi koreyscha matnni o'qiydi va asosiy so'zlarni tarjima qiladi (lug'atdagi 📷 va ✍️)."""
    if config.AI_FAKE and hand:
        return {"text": "학교", "translation": "maktab", "words": [{"ko": "학교", "rom": "hakgyo", "pos": "ot", "level": 1, "uz": "maktab", "ru": "школа", "en": "school"}]}
    if config.AI_FAKE:
        return {"text": "오늘의 메뉴: 김치찌개", "translation": "Bugungi menyu: kimchi sho'rva",
                "words": [{"ko": "메뉴", "rom": "menyu", "pos": "ot", "level": 1, "uz": "menyu", "ru": "меню", "en": "menu"},
                          {"ko": "김치찌개", "rom": "gimchijjigae", "pos": "ot", "level": 1, "uz": "kimchi sho'rva", "ru": "суп кимчи", "en": "kimchi stew"}]}
    tl = {"ru": "Russian", "en": "English"}.get(lang, "Uzbek (Latin script)")
    data = await _json_call([
        types.Part.from_bytes(data=image, mime_type=mime),
        ("This image is Korean handwriting drawn with a finger on a phone screen (usually one word or a short phrase; "
         "strokes may be shaky). Read it as exactly as possible; if a stroke is ambiguous choose the most likely real Korean word. "
         if hand else "Read all Korean text in this photo (menu, sign, label, book page, screen…). ") +
        f"Return it in text (keep line breaks, max 600 chars) and a natural translation into {tl} in translation. "
        "Then list up to 12 of the most useful Korean words from it in DICTIONARY form (verbs/adjectives with -다, no particles), "
        "most important first, each with rom (Revised Romanization), pos (in Uzbek: ot, fe'l, sifat, ravish, ibora…), "
        "level (TOPIK level 1–6), uz, ru, en meanings (short). If there is no Korean text, return empty text and words.\n"
        'Shape: {"text": "", "translation": "", "words": [{"ko": "", "rom": "", "pos": "", "level": 1, "uz": "", "ru": "", "en": ""}]}',
    ], temperature=0.1, lang_note=False)
    words = []
    for w in data.get("words", [])[:12]:
        if not isinstance(w, dict) or not str(w.get("ko", "")).strip():
            continue
        try:
            lv = max(0, min(6, int(w.get("level") or 0)))
        except (TypeError, ValueError):
            lv = 0
        words.append({k: str(w.get(k, "")) for k in ("ko", "rom", "pos", "uz", "ru", "en")} | {"level": lv})
    return {"text": str(data.get("text", ""))[:600], "translation": str(data.get("translation", ""))[:800], "words": words}


# ---------------------------------------------------------------- LUG'AT
async def dict_lookup(q: str, lang: str = "uz") -> dict:
    """To'liq lug'at maqolasi: koreys ↔ o'zbek/rus/ingliz (oflayn lug'atda topilmaganda).

    Natija hamma tillar uchun bir xil (umumiy keshga yoziladi), shuning uchun interfeys tili qo'shilmaydi."""
    q = q.strip()[:80]
    if config.AI_FAKE:
        return {"entries": [{"ko": q, "rom": "", "uz": "(sinov)", "ru": "(тест)", "en": "(test)"}]}
    data = await _json_call([
        "You are an expert Korean dictionary (like the National Institute of Korean Language dictionary) for Uzbek, "
        f"Russian and English speakers preparing for TOPIK and EPS-TOPIK. The user typed: «{q}».\n"
        "It may be a Korean word, a conjugated form with particles/endings, a phrase or short sentence, or an "
        "Uzbek/Russian/English word or phrase (then give the Korean equivalents).\n"
        "Return 1–3 entries, best match first. For a conjugated form use the dictionary form (먹어요 → 먹다, "
        "학교에서 → 학교). For a whole phrase or sentence, return it as one entry with its translation.\n"
        "Fields: ko (Hangul), hanja (if Sino-Korean, else empty), rom (Revised Romanization, real pronunciation), "
        "pos (part of speech in Uzbek: ot, fe'l, sifat, ravish, ibora, olmosh, son, undov…), level (TOPIK level 1–6 as a number, 0 if unknown), "
        "uz, ru, en (main meanings; separate different senses with «; »; Uzbek in Latin script with o‘ g‘ ‘), "
        "syn (up to 3 Korean synonyms), ant (up to 2 Korean antonyms), "
        "note_uz, note_ru, note_en (one short usage note: formality, typical context or a common mistake; may be empty), "
        "ex (1–2 natural example sentences for an EPS/TOPIK learner, each {ko, uz, ru, en}).\n"
        "Be accurate; never invent words. If the input is not a real word or phrase, return an empty list.\n"
        'Shape: {"entries": [{"ko": "", "hanja": "", "rom": "", "pos": "", "level": 0, "uz": "", "ru": "", "en": "", '
        '"syn": [], "ant": [], "note_uz": "", "note_ru": "", "note_en": "", "ex": [{"ko": "", "uz": "", "ru": "", "en": ""}]}]}',
    ], temperature=0.1, lang_note=False)
    out = []
    for e in data.get("entries") or []:
        if not isinstance(e, dict) or not e.get("ko"):
            continue
        o = {k: str(e.get(k, "") or "")[:300] for k in ("ko", "hanja", "rom", "pos", "uz", "ru", "en", "note_uz", "note_ru", "note_en")}
        try:
            o["level"] = max(0, min(6, int(e.get("level") or 0)))
        except (TypeError, ValueError):
            o["level"] = 0
        o["syn"] = [str(x)[:30] for x in (e.get("syn") or []) if x][:3]
        o["ant"] = [str(x)[:30] for x in (e.get("ant") or []) if x][:2]
        exs = [x for x in (e.get("ex") or []) if isinstance(x, dict) and x.get("ko")][:2]
        o["ex"] = [[str(x.get("ko", ""))[:200], str(x.get("uz", ""))[:200], str(x.get("ru", ""))[:200], str(x.get("en", ""))[:200]] for x in exs]
        out.append({k: v for k, v in o.items() if v not in ("", [], None)} | {"ko": o["ko"]})
    return {"entries": out[:3]}
