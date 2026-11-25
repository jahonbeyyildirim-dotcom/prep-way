"""Mini App uchun HTTP API (aiohttp) va Mini App sahifasini tarqatish."""
import asyncio
import json
import logging
import tempfile
import hashlib
import hmac
import time
import re
from pathlib import Path

import aiohttp
from aiohttp import web

from . import dictsvc, ai, auth, books, config, korean, payments, storage, xlsx
from .ai import AIError

log = logging.getLogger("api")
LIMIT_MSG = "Bugungi AI limiti tugadi. Ertaga qayta urinib ko'ring yoki Premium oling."


def jerr(msg: str, status: int = 400):
    return web.json_response({"error": msg}, status=status)


PUBLIC_API = {"/api/auth/google", "/api/auth/guest", "/api/health"}


def _cors(req, resp):
    origin = req.headers.get("Origin", "")
    if origin in config.CORS_ORIGINS:
        resp.headers["Access-Control-Allow-Origin"] = origin
        resp.headers["Vary"] = "Origin"
        resp.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, X-Telegram-Init-Data, X-Lang"
        resp.headers["Access-Control-Allow-Methods"] = "GET, POST, DELETE, OPTIONS"
        resp.headers["Access-Control-Max-Age"] = "86400"
    return resp


@web.middleware
async def cors_middleware(req: web.Request, handler):
    """Mobil ilova (Android/iPhone) serverga boshqa manzildan murojaat qiladi: CORS ruxsati."""
    if req.method == "OPTIONS" and req.path.startswith("/api/"):
        return _cors(req, web.Response(status=204))
    resp = await handler(req)
    return _cors(req, resp)


@web.middleware
async def middleware(req: web.Request, handler):
    if req.path.startswith("/api/") and req.path not in PUBLIC_API:
        user = None
        bearer = req.headers.get("Authorization", "")
        if bearer.startswith("Bearer "):
            user = auth.validate_session(bearer[7:].strip())       # mobil ilova (Google)
        else:
            user = auth.validate(req.headers.get("X-Telegram-Init-Data", ""))  # Telegram Mini App
        if not user:
            if not config.DEV_MODE or bearer:
                return jerr("Sessiya tugagan yoki avtorizatsiya xatosi. Qayta kiring.", 401)
            user = {"id": 1, "first_name": "Dev"}
        req["uid"] = int(user["id"])
        ai.set_lang(req.headers.get("X-Lang", "uz"))
        req["user"] = user
    try:
        return await handler(req)
    except AIError as e:
        return jerr(str(e), 400)
    except web.HTTPException:
        raise
    except Exception:
        log.exception("Kutilmagan xato: %s", req.path)
        return jerr("Serverda kutilmagan xato. Birozdan keyin qayta urinib ko'ring.", 500)


async def _take_ai(uid: int):
    if not await storage.take(uid, "ai"):
        raise AIError(LIMIT_MSG)


async def _read_audio(form) -> tuple[bytes, str] | None:
    f = form.get("audio")
    if isinstance(f, web.FileField):
        return f.file.read(), (f.filename or "audio.webm")
    return None


# ---------------------------------------------------------------- endpoints
async def auth_google(req):
    """Mobil ilova: Google ID token → Hanguk Way sessiya tokeni."""
    body = await req.json()
    id_token = str(body.get("id_token") or "")
    if config.DEV_MODE and id_token.startswith("dev:"):   # faqat sinov rejimi uchun
        info = {"sub": id_token[4:] or "dev", "email": "dev@example.com", "name": "Sinov"}
    else:
        try:
            info = await auth.verify_google(id_token)
        except ValueError as e:
            return jerr(str(e), 401)
        except Exception:
            log.exception("Google tekshiruvi")
            return jerr("Google bilan bog'lanib bo'lmadi. Qayta urinib ko'ring.", 502)
    uid = auth.google_uid(info["sub"])
    return web.json_response({"token": auth.make_session(uid, info["name"], info["email"]),
                              "user": {"name": info["name"], "email": info["email"]}})


async def auth_guest(req):
    """Mobil ilova: ro'yxatdan o'tmasdan kirish (qurilma ID si bo'yicha)."""
    if not config.GUEST_LOGIN:
        return jerr("Mehmon rejimi o'chirilgan.", 403)
    body = await req.json()
    dev = str(body.get("device_id") or "").strip()
    if not (16 <= len(dev) <= 80) or not all(c.isalnum() or c in "-_" for c in dev):
        return jerr("Qurilma ID si noto'g'ri.")
    name = str(body.get("name") or "").strip()[:40]
    return web.json_response({"token": auth.make_session(auth.guest_uid(dev), name, ""), "user": {"name": name, "email": ""}})


async def delete_me(req):
    """Akkauntni o'chirish (App Store va Google Play talabi): kitoblar, limitlar, Premium yozuvi."""
    await storage.delete_user(req["uid"])
    return web.json_response({"ok": True})


async def me(req):
    uid = req["uid"]
    return web.json_response({
        "name": req.get("user", {}).get("first_name", ""),
        "email": req.get("user", {}).get("email", ""),
        "premium_until": storage.premium_until(uid),
        "premium": storage.is_premium(uid),
        "tier": storage.tier(uid),
        "limits": storage.limits(uid),
        "usage": storage.usage(uid),
        "bot_username": req.app.get("bot_username", ""),
        "premium_stars": config.PREMIUM_STARS,
    })


async def speech(req):
    """Talaffuz: foydalanuvchi maqsad gapni o'qiydi, server baholaydi."""
    uid = req["uid"]
    form = await req.post()
    target = str(form.get("target") or "").strip()[:200]
    audio = await _read_audio(form)
    if not audio:
        return jerr("Ovoz yozuvi topilmadi.")
    if not korean.only_hangul(target):
        return jerr("Maqsad gap koreyscha bo'lishi kerak.")
    await _take_ai(uid)
    try:
        wav = await ai.to_wav(*audio)
        transcript = await ai.transcribe(wav)
        cmp = korean.compare(target, transcript)
        ev = await ai.score_speech(wav, target, transcript)
    except Exception:
        await storage.give_back(uid, "ai")
        raise
    overall = round(0.45 * cmp["score"] + 0.35 * ev["pronunciation"] + 0.20 * ev["fluency"])
    return web.json_response({"transcript": transcript, "accuracy": cmp["score"], "marks": cmp["marks"],
                              "overall": overall, **ev})


async def stt(req):
    """Nutqni matnga aylantirish (kompyuter ilovasi: Windows/macOS'da qurilmaning nutq xizmati yo'q)."""
    uid = req["uid"]
    form = await req.post()
    audio = await _read_audio(form)
    if not audio:
        return jerr("Ovoz yozuvi topilmadi.")
    lang = re.sub(r"[^a-zA-Z-]", "", str(form.get("lang") or "ko-KR"))[:10].lower() or "ko"
    await _take_ai(uid)
    try:
        wav = await ai.to_wav(*audio)
        text = await ai.transcribe(wav, lang)
    except Exception:
        await storage.give_back(uid, "ai")
        raise
    return web.json_response({"transcript": text})


async def chat(req):
    """AI suhbatdosh: matn yoki ovoz."""
    uid = req["uid"]
    form = await req.post()
    try:
        history = json.loads(str(form.get("history") or "[]"))
        if not isinstance(history, list):
            history = []
    except json.JSONDecodeError:
        history = []
    level = str(form.get("level") or "boshlang'ich")[:40]
    topic = str(form.get("topic") or "free")[:20]
    text = str(form.get("text") or "").strip()[:500]
    audio = await _read_audio(form)
    if not text and not audio:
        return jerr("Xabar bo'sh.")
    await _take_ai(uid)
    try:
        wav = None
        if audio:
            wav = await ai.to_wav(*audio)
            text = await ai.transcribe(wav)
            if not text:
                raise AIError("Ovozda gap eshitilmadi. Qayta urinib ko'ring.")
        res = await ai.chat_turn(history, text, level, topic, wav)
    except Exception:
        await storage.give_back(uid, "ai")
        raise
    return web.json_response({"user_text": text, **res})


async def roleplay(req):
    """Rolli vaziyat: turn / hint / finish."""
    uid = req["uid"]
    form = await req.post()
    try:
        history = json.loads(str(form.get("history") or "[]"))
        done = [int(x) for x in json.loads(str(form.get("done") or "[]"))][:10]
        if not isinstance(history, list):
            history = []
    except (json.JSONDecodeError, TypeError, ValueError):
        history, done = [], []
    mode = str(form.get("mode") or "turn")
    if mode not in ("turn", "hint", "finish"):
        return jerr("Noto'g'ri so'rov.")
    rid = str(form.get("scene") or "")[:30]
    level = str(form.get("level") or "boshlang'ich")[:80]
    text = str(form.get("text") or "").strip()[:500]
    audio = await _read_audio(form) if mode == "turn" else None
    if mode == "turn" and not text and not audio:
        return jerr("Xabar bo'sh.")
    await _take_ai(uid)
    try:
        wav = None
        if audio:
            wav = await ai.to_wav(*audio)
            text = await ai.transcribe(wav)
            if not text:
                raise AIError("Ovozda gap eshitilmadi. Qayta urinib ko'ring.")
        res = await ai.roleplay_turn(rid, history, text, level, done, mode, wav)
    except Exception:
        await storage.give_back(uid, "ai")
        raise
    return web.json_response({"user_text": text, **res})


async def tts(req):
    uid = req["uid"]
    body = await req.json()
    text = str(body.get("text") or "").strip()[:400]
    gender = "male" if body.get("voice") == "male" else "female"
    if not korean.only_hangul(text):
        return jerr("Faqat koreyscha matn ovozga aylantiriladi.")
    path = ai.tts_cache_path(text, gender)
    if not path.exists():
        if not await storage.take(uid, "tts"):
            return jerr("Bugungi ovoz limiti tugadi.", 429)
        try:
            await ai.tts(text, gender)
        except Exception:
            await storage.give_back(uid, "tts")
            raise
    return web.FileResponse(path, headers={"Content-Type": "audio/wav", "Cache-Control": "private, max-age=86400"})


async def tts_uz(req):
    """O'zbekcha matn → ovoz (WAV). Oddiy TTS bilan bir xil kunlik limit."""
    uid = req["uid"]
    body = await req.json()
    text = str(body.get("text") or "").strip()[:400]
    gender = "male" if body.get("voice") == "male" else "female"
    if not text or not re.search(r"[A-Za-zЀ-ӿ]", text):
        return jerr("O'zbekcha matn kiriting.")
    if not await storage.take(uid, "tts"):
        return jerr("Bugungi ovoz limiti tugadi.", 429)
    try:
        data = await ai.tts_uz(text, gender)
    except Exception:
        await storage.give_back(uid, "tts")
        raise
    return web.Response(body=data, headers={"Content-Type": "audio/wav", "Cache-Control": "private, max-age=86400"})


async def homework(req):
    """Daftar tekshiruvi: rasm + topshiriq (JSON)."""
    uid = req["uid"]
    form = await req.post()
    f = form.get("image")
    if f is None or not hasattr(f, "file"):
        return jerr("Rasm topilmadi.")
    data = f.file.read()
    if len(data) > 8 * 1024 * 1024:
        return jerr("Rasm juda katta (8 MB dan oshmasin).")
    mime = f.content_type if f.content_type in ("image/jpeg", "image/png", "image/webp") else "image/jpeg"
    try:
        task = json.loads(str(form.get("task") or "{}"))
    except json.JSONDecodeError:
        task = {}
    if not isinstance(task, dict) or not task.get("items"):
        return jerr("Topshiriq topilmadi.")
    await _take_ai(uid)
    try:
        return web.json_response(await ai.check_homework(data, mime, task))
    except Exception:
        await storage.give_back(uid, "ai")
        raise


async def dict_photo(req):
    """Lug'at: rasmdagi koreyscha matn va so'zlar."""
    uid = req["uid"]
    form = await req.post()
    f = form.get("image")
    if f is None or not hasattr(f, "file"):
        return jerr("Rasm topilmadi.")
    data = f.file.read()
    if len(data) > 8 * 1024 * 1024:
        return jerr("Rasm juda katta (8 MB dan oshmasin).")
    mime = f.content_type if f.content_type in ("image/jpeg", "image/png", "image/webp") else "image/jpeg"
    await _take_ai(uid)
    try:
        return web.json_response(await ai.photo_words(data, mime, str(form.get("lang") or "uz"), str(form.get("hand") or "") == "1"))
    except Exception:
        await storage.give_back(uid, "ai")
        raise


async def xp_add(req):
    """Haftalik liga uchun XP qo'shadi."""
    try:
        b = await req.json()
        xp = int(b.get("xp") or 0)
    except Exception:
        return jerr("Noto'g'ri so'rov.")
    name = str(b.get("name") or req["user"].get("first_name") or "")
    total = await storage.league_add(req["uid"], xp, name, str(b.get("lv") or ""))
    return web.json_response({"xp": total})


async def league(req):
    return web.json_response(storage.league_get(req["uid"]))


async def groups_list(req):
    return web.json_response(storage.groups_of(req["uid"]))


async def group_create(req):
    b = await req.json()
    try:
        return web.json_response(await storage.group_create(req["uid"], b.get("name")))
    except ValueError as e:
        return jerr(str(e))


async def group_join(req):
    b = await req.json()
    try:
        return web.json_response(await storage.group_join(req["uid"], b.get("code"), b.get("name") or req["user"].get("first_name") or ""))
    except ValueError as e:
        return jerr(str(e))


async def group_leave(req):
    b = await req.json()
    await storage.group_leave(req["uid"], str(b.get("code") or ""))
    return web.json_response({"ok": True})


async def group_get(req):
    v = storage.group_view(req["uid"], req.match_info["code"])
    if v is None:
        return jerr("Guruh topilmadi yoki siz uning o'qituvchisi emassiz.", 404)
    return web.json_response(v)


async def group_del(req):
    ok = await storage.group_delete(req["uid"], req.match_info["code"])
    return web.json_response({"ok": ok}) if ok else jerr("Guruh topilmadi.", 404)


async def group_stats(req):
    try:
        b = await req.json()
    except Exception:
        return jerr("Noto'g'ri so'rov.")
    return web.json_response({"saved": await storage.group_stats_save(req["uid"], b if isinstance(b, dict) else {})})


def _export_sig(code: str, exp: int) -> str:
    return hmac.new(config.SECRET_KEY.encode(), f"group-export|{code}|{exp}".encode(), hashlib.sha256).hexdigest()[:32]


async def group_export_link(req):
    """O'qituvchi uchun 10 daqiqalik yuklab olish havolasi (brauzerda token yo'q, shuning uchun imzo bilan)."""
    code = req.match_info["code"].upper()
    if storage.group_view(req["uid"], code) is None:
        return jerr("Guruh topilmadi yoki siz uning o'qituvchisi emassiz.", 404)
    exp = int(time.time()) + 600
    base = (config.WEBAPP_URL or f"{req.scheme}://{req.host}").rstrip("/")
    return web.json_response({"url": f"{base}/export/group/{code}.xlsx?e={exp}&s={_export_sig(code, exp)}"})


async def group_export(req):
    code = req.match_info["code"].upper()
    try:
        exp = int(req.query.get("e", "0"))
    except ValueError:
        exp = 0
    if exp < time.time() or not hmac.compare_digest(req.query.get("s", ""), _export_sig(code, exp)):
        return web.Response(text="Havola eskirgan. Ilovada «Excel'ga yuklash» ni qayta bosing.", status=403)
    owner = storage.group_owner(code)
    v = storage.group_view(owner, code) if owner is not None else None
    if v is None:
        raise web.HTTPNotFound()
    def d(ts):
        return time.strftime("%d.%m.%Y", time.localtime(ts)) if ts else ""
    head = ["№", "Ism", "Daraja", "Haftalik XP", "Testlar (7 kun)", "O'rtacha natija, %", "Seriya, kun", "Daqiqalar (7 kun)",
            "Saqlangan so'zlar", "Rolli vaziyatlar", "Hikoyalar", "Eng zaif savol turi", "Oxirgi faollik", "Qo'shilgan", "Premium (litsenziya)"]
    rows = []
    for i, r in enumerate(v["rows"], 1):
        rows.append([i, r.get("name", ""), r.get("level", ""), r.get("wxp", 0), r.get("tests7", 0), r.get("avg7", 0) if r.get("tests7") else "",
                     r.get("streak", 0), r.get("mins7", 0), r.get("words", 0), r.get("role", 0), r.get("stories", 0), r.get("weak", ""),
                     r.get("last", ""), d(r.get("joined", 0)), "ha" if r.get("seat") else ""])
    data = xlsx.build(v["name"], head, rows, [5, 24, 8, 12, 14, 16, 11, 16, 15, 15, 11, 28, 14, 13, 18])
    fname = re.sub(r"[^A-Za-z0-9_-]+", "_", v["name"]).strip("_") or code
    return web.Response(body=data, headers={
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": f'attachment; filename="HangukWay_{fname}_{time.strftime("%Y-%m-%d")}.xlsx"',
        "Cache-Control": "no-store"})


async def explain(req):
    """Testdagi xato javobni AI tushuntiradi."""
    uid = req["uid"]
    try:
        b = await req.json()
        opts = [str(o)[:300] for o in (b.get("opts") or [])][:4]
        correct, your = int(b.get("correct")), int(b.get("your", -1))
    except Exception:
        return jerr("Noto'g'ri so'rov.")
    if len(opts) < 2 or not 0 <= correct < len(opts):
        return jerr("Noto'g'ri so'rov.")
    await _take_ai(uid)
    try:
        return web.json_response(await ai.explain_answer(str(b.get("exam") or "TOPIK")[:40], str(b.get("inst") or ""),
                                                         str(b.get("body") or ""), opts, correct, your, str(b.get("note") or "")))
    except Exception:
        await storage.give_back(uid, "ai")
        raise


async def write_grade(req):
    """TOPIK II yozish (51–54) javobini AI baholaydi."""
    uid = req["uid"]
    try:
        body = await req.json()
        no = int(body.get("no"))
    except Exception:
        return jerr("Noto'g'ri so'rov.")
    if no not in ai.WRITE_RUBRIC:
        return jerr("Savol raqami 51–54 bo'lishi kerak.")
    answer = body.get("answer")
    if isinstance(answer, list):
        answer = [str(a)[:300] for a in answer[:2]]
        if not any(a.strip() for a in answer):
            return jerr("Javob bo'sh.")
    else:
        answer = str(answer or "")[:3000]
        if len(answer.strip()) < 20:
            return jerr("Javob juda qisqa.")
    await _take_ai(uid)
    try:
        return web.json_response(await ai.grade_writing(no, str(body.get("task") or "")[:3000], str(body.get("model") or "")[:3000],
                                                        answer, int(body.get("chars") or 0)))
    except Exception:
        await storage.give_back(uid, "ai")
        raise


async def dict_lookup(req):
    uid = req["uid"]
    body = await req.json()
    q = str(body.get("q") or "").strip()
    if not q:
        return jerr("So'z kiritilmadi.")
    hit = await dictsvc.cache_get(q)
    if hit and hit.get("entries"):  # umumiy keshda bor — AI limiti sarflanmaydi
        return web.json_response({**hit, "cached": True})
    # Lug'at umumiy AI limitidan alohida: oddiy foydalanishda cheklovsiz, faqat suiiste'molga qarshi kunlik chegara
    if not dictsvc.take_quota(uid):
        return jerr("Bugun lug'at orqali juda ko'p so'z qidirildi. Ertaga davom eting.", 429)
    res = await dictsvc.lookup(q, str(body.get("lang") or "uz"))
    if not res.get("entries"):
        dictsvc.give_back(uid)
    return web.json_response(res)


async def dict_words(req):
    """Umumiy lug'atga qo'shilgan so'zlar (ilova oflayn lug'atini kengaytirish uchun)."""
    try:
        since = float(req.query.get("since", "0") or 0)
    except ValueError:
        since = 0.0
    return web.json_response(await dictsvc.community_words(since))


async def advice(req):
    uid = req["uid"]
    stats = await req.json()
    await _take_ai(uid)
    try:
        return web.json_response(await ai.advice(stats if isinstance(stats, dict) else {}))
    except Exception:
        await storage.give_back(uid, "ai")
        raise


async def words(req):
    uid = req["uid"]
    body = await req.json()
    level = str(body.get("level") or "adv")
    exclude = [str(x)[:30] for x in (body.get("exclude") or [])][:80]
    await _take_ai(uid)
    try:
        return web.json_response({"words": await ai.words(level, exclude)})
    except Exception:
        await storage.give_back(uid, "ai")
        raise


async def books_list(req):
    return web.json_response({"books": storage.list_books(req["uid"]), "limit": storage.limits(req["uid"])["books"]})


async def books_add(req):
    form = await req.post()
    f = form.get("file")
    if not isinstance(f, web.FileField):
        return jerr("Fayl tanlanmagan.")
    book = await books.add_book(req["uid"], f.file.read(), f.filename or "kitob")
    return web.json_response({"book": book})


async def book_get(req):
    try:
        meta = storage.read_meta(req["uid"], req.match_info["bid"])
    except ValueError:
        meta = None
    if not meta:
        return jerr("Kitob topilmadi.", 404)
    return web.json_response({"book": books.public(meta)})


async def book_delete(req):
    try:
        books.delete_book(req["uid"], req.match_info["bid"])
    except ValueError:
        return jerr("Kitob topilmadi.", 404)
    return web.json_response({"ok": True})


async def lesson(req):
    try:
        n = int(req.match_info["n"])
        data = await books.get_lesson(req["uid"], req.match_info["bid"], n)
    except ValueError:
        return jerr("Dars topilmadi.", 404)
    return web.json_response({"lesson": data})


# ---------------------------------------------------------------- sahifa
async def health(_req):
    """Kunlik tekshiruv (GitHub Actions): server va baza tirikmi."""
    from . import persist
    db = await persist.ping()
    return web.json_response({"ok": True, "db": db, "deepl": dictsvc.deepl_enabled(), "claude": ai.claude_enabled()})


async def oferta(_req):
    return web.FileResponse(config.MINIAPP_DIR / "oferta.html", headers={"Cache-Control": "no-cache"})


async def privacy(_req):
    return web.FileResponse(config.MINIAPP_DIR / "privacy.html", headers={"Cache-Control": "no-cache"})


async def install_page(_req):
    """Telefonga o'rnatish sahifasi: yuklab olish tugmasi va bosqichma-bosqich yo'riqnoma."""
    return web.FileResponse(config.MINIAPP_DIR / "yuklab.html", headers={"Cache-Control": "no-cache"})


_APK_BASE = "https://github.com/jahonbeyyildirim-dotcom/prep-way/releases/download/demo/"
APK_SRCS = (_APK_BASE + "HangukWay-demo.apk", _APK_BASE + "PrepWay-demo.apk")  # yangi nom, keyin eski nom
APK_SRC = APK_SRCS[0]
_APK_CACHE = Path(tempfile.gettempdir()) / "HangukWay.apk"
_apk_lock = asyncio.Lock()


async def _fresh_apk() -> Path | None:
    """GitHub'dagi eng so'nggi APK'ni nusxasini saqlab turadi (10 daqiqada bir yangilanadi)."""
    async with _apk_lock:
        if _APK_CACHE.is_file() and time.time() - _APK_CACHE.stat().st_mtime < 600:
            return _APK_CACHE
        tmp = _APK_CACHE.with_suffix(".part")
        try:
            async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=180)) as s:
                status = None
                for src in APK_SRCS:
                    async with s.get(src) as r:
                        status = r.status
                        if r.status != 200:
                            continue
                        with open(tmp, "wb") as f:
                            async for chunk in r.content.iter_chunked(1 << 16):
                                f.write(chunk)
                        break
                else:
                    raise RuntimeError(f"GitHub {status}")
            if tmp.stat().st_size < 1_000_000:
                raise RuntimeError("APK juda kichik")
            tmp.replace(_APK_CACHE)
        except Exception as e:  # GitHub ishlamasa eski nusxa (bo'lsa) beriladi
            log.warning("APK yangilanmadi: %s", e)
            tmp.unlink(missing_ok=True)
        return _APK_CACHE if _APK_CACHE.is_file() else None


async def apk_file(_req):
    path = await _fresh_apk()
    if path is None:
        raise web.HTTPFound(APK_SRCS[-1])
    return web.FileResponse(path, headers={
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Disposition": 'attachment; filename="HangukWay.apk"',
        "Cache-Control": "no-cache",
    })


DESKTOP_FILES = {"HangukWay-Windows.exe", "HangukWay-Mac.dmg"}


async def desktop_file(req):
    """Kompyuter ilovasi: GitHub «demo» Release'dagi eng so'nggi faylga yo'naltiradi."""
    name = req.path.lstrip("/")
    if name not in DESKTOP_FILES:
        raise web.HTTPNotFound()
    raise web.HTTPFound(_APK_BASE + name)


async def index(_req):
    return web.FileResponse(config.MINIAPP_DIR / "index.html", headers={"Cache-Control": "no-cache"})


async def static_file(req):
    name = req.match_info["name"]
    path = (config.MINIAPP_DIR / name).resolve()
    if path.parent != config.MINIAPP_DIR.resolve() or not path.is_file():
        raise web.HTTPNotFound()
    return web.FileResponse(path, headers={"Cache-Control": "no-cache"})


async def sub_static(req):
    """miniapp/pics va miniapp/pdf ichidagi fayllar (rasmli savollar, darsliklar)."""
    sub, name = req.match_info["sub"], req.match_info["name"]
    base = (config.MINIAPP_DIR / sub).resolve()
    path = (base / name).resolve()
    if path.parent != base or not path.is_file():
        raise web.HTTPNotFound()
    return web.FileResponse(path, headers={"Cache-Control": "public, max-age=86400"})


def make_app() -> web.Application:
    app = web.Application(middlewares=[cors_middleware, middleware], client_max_size=(config.MAX_UPLOAD_MB + 2) * 1024 * 1024)
    app.add_routes([
        web.post("/api/auth/google", auth_google),
        web.post("/api/auth/guest", auth_guest),
        *payments.routes(),
        web.get("/api/me", me),
        web.delete("/api/me", delete_me),
        web.get("/privacy", privacy),
        web.get("/oferta", oferta),
        web.get("/api/health", health),
        web.post("/api/speech", speech),
        web.post("/api/stt", stt),
        web.post("/api/chat", chat),
        web.post("/api/tts", tts),
        web.post("/api/tts-uz", tts_uz),
        web.post("/api/advice", advice),
        web.post("/api/homework", homework),
        web.post("/api/write", write_grade),
        web.post("/api/dict/photo", dict_photo),
        web.post("/api/explain", explain),
        web.post("/api/roleplay", roleplay),
        web.post("/api/xp", xp_add),
        web.get("/api/league", league),
        web.get("/api/groups", groups_list),
        web.post("/api/group/create", group_create),
        web.post("/api/group/join", group_join),
        web.post("/api/group/leave", group_leave),
        web.post("/api/group/stats", group_stats),
        web.get("/api/group/{code}/export-link", group_export_link),
        web.get("/api/group/{code}", group_get),
        web.get("/export/group/{code}.xlsx", group_export),
        web.delete("/api/group/{code}", group_del),
        web.post("/api/dict", dict_lookup),
        web.get("/api/dict/words", dict_words),
        web.post("/api/words", words),
        web.get("/api/books", books_list),
        web.post("/api/books", books_add),
        web.get("/api/books/{bid}", book_get),
        web.delete("/api/books/{bid}", book_delete),
        web.post("/api/books/{bid}/lessons/{n}", lesson),
        web.get("/yuklab", install_page),
        web.get("/download", install_page),
        web.get("/HangukWay.apk", apk_file),
        web.get("/PrepWay.apk", apk_file),  # eski havolalar uchun
        web.get("/HangukWay-Windows.exe", desktop_file),
        web.get("/HangukWay-Mac.dmg", desktop_file),
        web.get("/", index),
        web.get("/{sub:pics|pdf}/{name}", sub_static),
        web.get("/{name}", static_file),
    ])
    return app
