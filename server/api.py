"""Mini App uchun HTTP API (aiohttp) va Mini App sahifasini tarqatish."""
import json
import logging

from aiohttp import web

from . import ai, auth, books, config, korean, storage
from .ai import AIError

log = logging.getLogger("api")
LIMIT_MSG = "Bugungi AI limiti tugadi. Ertaga qayta urinib ko'ring yoki Premium oling."


def jerr(msg: str, status: int = 400):
    return web.json_response({"error": msg}, status=status)


PUBLIC_API = {"/api/auth/google"}


def _cors(req, resp):
    origin = req.headers.get("Origin", "")
    if origin in config.CORS_ORIGINS:
        resp.headers["Access-Control-Allow-Origin"] = origin
        resp.headers["Vary"] = "Origin"
        resp.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, X-Telegram-Init-Data"
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
    """Mobil ilova: Google ID token → Prep Way sessiya tokeni."""
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


async def dict_lookup(req):
    uid = req["uid"]
    body = await req.json()
    q = str(body.get("q") or "").strip()
    if not q:
        return jerr("So'z kiritilmadi.")
    await _take_ai(uid)
    try:
        return web.json_response(await ai.dict_lookup(q, str(body.get("lang") or "uz")))
    except Exception:
        await storage.give_back(uid, "ai")
        raise


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
async def privacy(_req):
    return web.FileResponse(config.MINIAPP_DIR / "privacy.html", headers={"Cache-Control": "no-cache"})


async def index(_req):
    return web.FileResponse(config.MINIAPP_DIR / "index.html", headers={"Cache-Control": "no-cache"})


async def static_file(req):
    name = req.match_info["name"]
    path = (config.MINIAPP_DIR / name).resolve()
    if path.parent != config.MINIAPP_DIR.resolve() or not path.is_file():
        raise web.HTTPNotFound()
    return web.FileResponse(path, headers={"Cache-Control": "no-cache"})


def make_app() -> web.Application:
    app = web.Application(middlewares=[cors_middleware, middleware], client_max_size=(config.MAX_UPLOAD_MB + 2) * 1024 * 1024)
    app.add_routes([
        web.post("/api/auth/google", auth_google),
        web.get("/api/me", me),
        web.delete("/api/me", delete_me),
        web.get("/privacy", privacy),
        web.post("/api/speech", speech),
        web.post("/api/chat", chat),
        web.post("/api/tts", tts),
        web.post("/api/advice", advice),
        web.post("/api/homework", homework),
        web.post("/api/dict", dict_lookup),
        web.post("/api/words", words),
        web.get("/api/books", books_list),
        web.post("/api/books", books_add),
        web.get("/api/books/{bid}", book_get),
        web.delete("/api/books/{bid}", book_delete),
        web.post("/api/books/{bid}/lessons/{n}", lesson),
        web.get("/", index),
        web.get("/{name}", static_file),
    ])
    return app
