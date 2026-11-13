"""Barcha sozlamalar muhit o'zgaruvchilaridan (environment variables) olinadi.

Majburiy:
  BOT_TOKEN        — @BotFather bergan token
  GEMINI_API_KEY   — aistudio.google.com dan olingan kalit
  WEBAPP_URL       — serveringizning https manzili (masalan https://prep-way.onrender.com)

Ixtiyoriy (standart qiymatlari bor):
  GEMINI_MODEL, GEMINI_TTS_MODEL, TTS_VOICE, PREMIUM_STARS, FREE_DAILY_AI, PREMIUM_DAILY_AI,
  SUPPORT_CONTACT, DATA_DIR, PORT, DEV_MODE, AI_FAKE
"""
import os
from pathlib import Path


def _int(name: str, default: int) -> int:
    try:
        return int(os.getenv(name, str(default)))
    except ValueError:
        return default


BOT_TOKEN = os.getenv("BOT_TOKEN", "").strip()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
WEBAPP_URL = os.getenv("WEBAPP_URL", "").strip().rstrip("/")

# Model nomlari vaqt o'tishi bilan yangilanadi: aistudio.google.com dagi ro'yxatni tekshirib, kerak bo'lsa o'zgartiring.
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")
GEMINI_TTS_MODEL = os.getenv("GEMINI_TTS_MODEL", "gemini-3.8-flash-lite-tts")
TTS_VOICE = os.getenv("TTS_VOICE", "Kore")

PREMIUM_STARS = _int("PREMIUM_STARS", 200)
PREMIUM_DAYS = _int("PREMIUM_DAYS", 30)
FREE_DAILY_AI = _int("FREE_DAILY_AI", 15)        # bepul foydalanuvchi uchun kunlik AI so'rovlar
PREMIUM_DAILY_AI = _int("PREMIUM_DAILY_AI", 300)
FREE_DAILY_TTS = _int("FREE_DAILY_TTS", 60)      # serverda ovozga aylantirish (kesh ishlatilmaganda)
PREMIUM_DAILY_TTS = _int("PREMIUM_DAILY_TTS", 600)
FREE_MAX_BOOKS = _int("FREE_MAX_BOOKS", 1)
PREMIUM_MAX_BOOKS = _int("PREMIUM_MAX_BOOKS", 20)

MAX_UPLOAD_MB = _int("MAX_UPLOAD_MB", 20)
MAX_AUDIO_SECONDS = _int("MAX_AUDIO_SECONDS", 60)

SUPPORT_CONTACT = os.getenv("SUPPORT_CONTACT", "@sizning_username")
DATA_DIR = Path(os.getenv("DATA_DIR", Path(__file__).resolve().parent.parent / "data"))
MINIAPP_DIR = Path(__file__).resolve().parent.parent / "miniapp"
PORT = _int("PORT", 8080)

# ---- Mobil ilova (Android / iPhone) ----
# GOOGLE_CLIENT_IDS: Google Cloud Console'dagi Web va iOS client ID'lari, vergul bilan.
GOOGLE_CLIENT_IDS = [x.strip() for x in os.getenv("GOOGLE_CLIENT_IDS", "").split(",") if x.strip()]
# SECRET_KEY: sessiya tokenlarini imzolash uchun uzun tasodifiy satr. Kiritilmasa, bot tokenidan hosil qilinadi.
SECRET_KEY = os.getenv("SECRET_KEY", "").strip() or ("pw-" + __import__("hashlib").sha256(("prepway:" + BOT_TOKEN).encode()).hexdigest())
# Ilova WebView manzillari (CORS). Android: https://localhost, iPhone: capacitor://localhost
CORS_ORIGINS = [x.strip() for x in os.getenv("CORS_ORIGINS", "https://localhost,capacitor://localhost,http://localhost").split(",") if x.strip()]

# DEV_MODE=1 — Telegramsiz, brauzerda sinash uchun (initData tekshirilmaydi). Ishchi serverda YOQMANG.
DEV_MODE = os.getenv("DEV_MODE", "0") == "1"
# AI_FAKE=1 — Gemini kalitisiz sinash: AI o'rniga namunaviy javoblar qaytadi.
AI_FAKE = os.getenv("AI_FAKE", "0") == "1"

DATA_DIR.mkdir(parents=True, exist_ok=True)
