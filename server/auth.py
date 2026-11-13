"""Telegram Mini App initData tekshiruvi.

Mini App har bir so'rovda "X-Telegram-Init-Data" sarlavhasida Telegram bergan initData ni yuboradi.
Server uni bot tokeni bilan HMAC-SHA256 orqali tekshiradi: shunday qilib so'rov haqiqatan
shu foydalanuvchidan kelganiga ishonch hosil qilinadi (boshqa birovning Premium'idan foydalanib bo'lmaydi).
"""
import hashlib
import hmac
import json
import time
from urllib.parse import parse_qsl

from . import config

MAX_AGE = 24 * 3600  # initData 24 soatdan eski bo'lsa rad etiladi


def validate(init_data: str) -> dict | None:
    """To'g'ri bo'lsa foydalanuvchi ma'lumotini (dict) qaytaradi, aks holda None."""
    if not init_data or not config.BOT_TOKEN:
        return None
    try:
        pairs = dict(parse_qsl(init_data, keep_blank_values=True, strict_parsing=True))
    except ValueError:
        return None
    received = pairs.pop("hash", None)
    if not received:
        return None
    check = "\n".join(f"{k}={pairs[k]}" for k in sorted(pairs))
    secret = hmac.new(b"WebAppData", config.BOT_TOKEN.encode(), hashlib.sha256).digest()
    calc = hmac.new(secret, check.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(calc, received):
        return None
    try:
        if time.time() - int(pairs.get("auth_date", "0")) > MAX_AGE:
            return None
        user = json.loads(pairs.get("user", "{}"))
    except (ValueError, json.JSONDecodeError):
        return None
    return user if user.get("id") else None


# ---------------------------------------------------------------- Mobil ilova: Google orqali kirish
# Ilova Google'dan ID token oladi va /api/auth/google ga yuboradi. Server tokenni Google orqali
# tekshiradi va o'zining sessiya tokenini beradi. Keyingi so'rovlar "Authorization: Bearer <token>" bilan keladi.
import base64

SESSION_DAYS = 60
GOOGLE_ISSUERS = {"accounts.google.com", "https://accounts.google.com"}


def google_uid(sub: str) -> int:
    """Google akkaunti uchun ichki ID. Manfiy son: Telegram ID'lari bilan hech qachon to'qnashmaydi."""
    return -int(hashlib.sha256(f"google:{sub}".encode()).hexdigest()[:13], 16)


def _b64(b: bytes) -> str:
    return base64.urlsafe_b64encode(b).decode().rstrip("=")


def _unb64(s: str) -> bytes:
    return base64.urlsafe_b64decode(s + "=" * (-len(s) % 4))


def make_session(uid: int, name: str = "", email: str = "") -> str:
    payload = _b64(json.dumps({"uid": uid, "name": name[:60], "email": email[:120],
                               "exp": int(time.time()) + SESSION_DAYS * 86400}).encode())
    sig = _b64(hmac.new(config.SECRET_KEY.encode(), payload.encode(), hashlib.sha256).digest())
    return f"{payload}.{sig}"


def validate_session(token: str) -> dict | None:
    try:
        payload, sig = token.split(".", 1)
        good = _b64(hmac.new(config.SECRET_KEY.encode(), payload.encode(), hashlib.sha256).digest())
        if not hmac.compare_digest(good, sig):
            return None
        data = json.loads(_unb64(payload))
        if int(data.get("exp", 0)) < time.time():
            return None
        return {"id": int(data["uid"]), "first_name": data.get("name", ""), "email": data.get("email", "")}
    except (ValueError, KeyError, json.JSONDecodeError):
        return None


async def verify_google(id_token: str) -> dict:
    """Google ID tokenni Google serveri orqali tekshiradi. To'g'ri bo'lsa {sub, email, name} qaytaradi."""
    import aiohttp
    if not config.GOOGLE_CLIENT_IDS:
        raise ValueError("Server sozlanmagan: GOOGLE_CLIENT_IDS kiritilmagan.")
    async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=15)) as s:
        async with s.get("https://oauth2.googleapis.com/tokeninfo", params={"id_token": id_token}) as r:
            if r.status != 200:
                raise ValueError("Google tokeni yaroqsiz. Qayta kiring.")
            info = await r.json()
    if info.get("aud") not in config.GOOGLE_CLIENT_IDS:
        raise ValueError("Bu token boshqa ilova uchun berilgan.")
    if info.get("iss") not in GOOGLE_ISSUERS or int(info.get("exp", 0)) < time.time():
        raise ValueError("Google tokeni eskirgan. Qayta kiring.")
    if str(info.get("email_verified", "")).lower() != "true":
        raise ValueError("Google akkauntingizdagi email tasdiqlanmagan.")
    return {"sub": info["sub"], "email": info.get("email", ""), "name": info.get("given_name") or info.get("name") or ""}
