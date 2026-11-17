"""Oddiy fayl asosidagi saqlash (JSON).

Har bir yozuv persist.py orqali Postgres bazasiga ham nusxalanadi (DATABASE_URL berilgan bo'lsa),
shuning uchun bepul hostingda server qayta ishga tushsa ham ma'lumotlar yo'qolmaydi.
"""
import asyncio
import json
import time
from datetime import datetime, timezone, timedelta
from pathlib import Path

from . import config, persist

_lock = asyncio.Lock()
PREMIUM_FILE = config.DATA_DIR / "premium_users.json"
USAGE_FILE = config.DATA_DIR / "usage.json"
BOOKS_DIR = config.DATA_DIR / "books"
TTS_DIR = config.DATA_DIR / "tts_cache"
BOOKS_DIR.mkdir(parents=True, exist_ok=True)
TTS_DIR.mkdir(parents=True, exist_ok=True)

TASHKENT = timezone(timedelta(hours=5))


def _read(path: Path, default):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return default


def _write(path: Path, data) -> None:
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    tmp.replace(path)
    persist.save(path)


def save_bytes(path: Path, data: bytes) -> None:
    """Ikkilik faylni (masalan, kitob PDF) yozadi va bazaga nusxalaydi."""
    path.write_bytes(data)
    persist.save(path)


def rmtree(path: Path) -> None:
    """Papkani diskdan va bazadan o'chiradi."""
    import shutil
    shutil.rmtree(path, ignore_errors=True)
    persist.remove(path)


# ---------- Premium ----------
def premium_until(uid: int) -> float:
    return float(_read(PREMIUM_FILE, {}).get(str(uid), {}).get("until", 0))


def is_premium(uid: int) -> bool:
    return premium_until(uid) > time.time()


async def add_premium(uid: int, charge_id: str) -> float:
    async with _lock:
        users = _read(PREMIUM_FILE, {})
        start = max(time.time(), float(users.get(str(uid), {}).get("until", 0)))
        until = start + config.PREMIUM_DAYS * 86400
        users[str(uid)] = {"until": until, "last_charge_id": charge_id}
        _write(PREMIUM_FILE, users)
        return until


# ---------- Kunlik limitlar ----------
def _today() -> str:
    return datetime.now(TASHKENT).strftime("%Y-%m-%d")


def limits(uid: int) -> dict:
    p = is_premium(uid)
    return {
        "ai": config.PREMIUM_DAILY_AI if p else config.FREE_DAILY_AI,
        "tts": config.PREMIUM_DAILY_TTS if p else config.FREE_DAILY_TTS,
        "books": config.PREMIUM_MAX_BOOKS if p else config.FREE_MAX_BOOKS,
    }


def usage(uid: int) -> dict:
    u = _read(USAGE_FILE, {}).get(str(uid), {})
    if u.get("date") != _today():
        return {"ai": 0, "tts": 0}
    return {"ai": u.get("ai", 0), "tts": u.get("tts", 0)}


async def take(uid: int, kind: str, n: int = 1) -> bool:
    """Limitdan n ta oladi. Limit tugagan bo'lsa False qaytaradi."""
    async with _lock:
        data = _read(USAGE_FILE, {})
        u = data.get(str(uid), {})
        if u.get("date") != _today():
            u = {"date": _today(), "ai": 0, "tts": 0}
        if u.get(kind, 0) + n > limits(uid)[kind]:
            return False
        u[kind] = u.get(kind, 0) + n
        data[str(uid)] = u
        _write(USAGE_FILE, data)
        return True


async def give_back(uid: int, kind: str, n: int = 1) -> None:
    """AI xato bergan bo'lsa, olingan limitni qaytaramiz."""
    async with _lock:
        data = _read(USAGE_FILE, {})
        u = data.get(str(uid))
        if u and u.get("date") == _today():
            u[kind] = max(0, u.get(kind, 0) - n)
            _write(USAGE_FILE, data)


# ---------- Kitoblar ----------
def user_books_dir(uid: int) -> Path:
    d = BOOKS_DIR / str(uid)
    d.mkdir(parents=True, exist_ok=True)
    return d


def book_dir(uid: int, book_id: str) -> Path:
    if not book_id.isalnum():
        raise ValueError("bad id")
    return user_books_dir(uid) / book_id


def list_books(uid: int) -> list[dict]:
    out = []
    for d in user_books_dir(uid).iterdir():
        meta = _read(d / "meta.json", None)
        if meta:
            out.append({k: meta.get(k) for k in ("id", "title", "level", "lesson_count", "created", "filename")})
    # Yangi kitob birinchi (bazadan tiklangandan keyin ham to'g'ri tartib)
    return sorted(out, key=lambda m: m.get("created") or 0, reverse=True)


def read_meta(uid: int, book_id: str) -> dict | None:
    return _read(book_dir(uid, book_id) / "meta.json", None)


def write_meta(uid: int, book_id: str, meta: dict) -> None:
    d = book_dir(uid, book_id)
    d.mkdir(parents=True, exist_ok=True)
    _write(d / "meta.json", meta)


def read_lesson(uid: int, book_id: str, n: int) -> dict | None:
    return _read(book_dir(uid, book_id) / "lessons" / f"{n}.json", None)


async def delete_user(uid: int) -> None:
    """Foydalanuvchining barcha ma'lumotlarini o'chiradi."""
    async with _lock:
        for path in (PREMIUM_FILE, USAGE_FILE):
            data = _read(path, {})
            if data.pop(str(uid), None) is not None:
                _write(path, data)
    rmtree(BOOKS_DIR / str(uid))


def write_lesson(uid: int, book_id: str, n: int, lesson: dict) -> None:
    d = book_dir(uid, book_id) / "lessons"
    d.mkdir(parents=True, exist_ok=True)
    _write(d / f"{n}.json", lesson)
