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
LEAGUE_FILE = config.DATA_DIR / "league.json"
GROUPS_FILE = config.DATA_DIR / "groups.json"
GSTATS_FILE = config.DATA_DIR / "group_stats.json"
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
        lg = _read(LEAGUE_FILE, {})
        if any([lg.get(k, {}).pop(str(uid), None) is not None for k in ("users", "prev")]):
            _write(LEAGUE_FILE, lg)
        gs = _read(GSTATS_FILE, {})
        if gs.pop(str(uid), None) is not None:
            _write(GSTATS_FILE, gs)
        gr = _read(GROUPS_FILE, {})
        changed = False
        for code in list(gr):
            if gr[code].get("owner") == uid:
                del gr[code]; changed = True
            elif gr[code].get("members", {}).pop(str(uid), None) is not None:
                changed = True
        if changed:
            _write(GROUPS_FILE, gr)
    rmtree(BOOKS_DIR / str(uid))


def write_lesson(uid: int, book_id: str, n: int, lesson: dict) -> None:
    d = book_dir(uid, book_id) / "lessons"
    d.mkdir(parents=True, exist_ok=True)
    _write(d / f"{n}.json", lesson)


# ---------- Haftalik liga (XP) ----------
LEAGUE_DAY_CAP = 1500   # bir kunda ko'pi bilan shuncha XP hisoblanadi
LEAGUE_CALL_CAP = 300   # bitta so'rovda


def _week() -> str:
    y, w, _ = datetime.now(TASHKENT).isocalendar()
    return f"{y}-W{w:02d}"


def _week_end() -> str:
    now = datetime.now(TASHKENT)
    end = (now + timedelta(days=7 - now.isoweekday())).replace(hour=23, minute=59, second=59, microsecond=0)
    return end.isoformat()


def _league_roll(lg: dict) -> dict:
    """Yangi hafta boshlansa, o'tgan hafta natijalari prev ga o'tadi."""
    wk = _week()
    if lg.get("week") != wk:
        lg = {"week": wk, "users": {}, "prev": lg.get("users", {}) if lg.get("week") else {}, "prev_week": lg.get("week", "")}
    return lg


def _clean_name(name: str) -> str:
    name = " ".join(str(name or "").split())[:24]
    parts = name.split(" ")
    if len(parts) > 1:  # maxfiylik: ism + familiyaning bosh harfi
        name = parts[0] + " " + parts[1][:1] + "."
    return name or "O'quvchi"


def _ranked(users: dict) -> list:
    return sorted(((u, v) for u, v in users.items() if v.get("xp", 0) > 0), key=lambda x: -x[1].get("xp", 0))


async def league_add(uid: int, xp: int, name: str, level: str = "") -> int:
    xp = max(0, min(int(xp), LEAGUE_CALL_CAP))
    async with _lock:
        lg = _league_roll(_read(LEAGUE_FILE, {}))
        u = lg["users"].setdefault(str(uid), {"xp": 0})
        if u.get("day") != _today():
            u["day"], u["dayxp"] = _today(), 0
        xp = min(xp, LEAGUE_DAY_CAP - u.get("dayxp", 0))
        if xp > 0:
            u["xp"] = u.get("xp", 0) + xp
            u["dayxp"] = u.get("dayxp", 0) + xp
        u["name"] = _clean_name(name)
        if level:
            u["lv"] = str(level)[:6]
        _write(LEAGUE_FILE, lg)
        return u["xp"]


def league_get(uid: int, top: int = 30) -> dict:
    lg = _league_roll(_read(LEAGUE_FILE, {}))
    rk = _ranked(lg.get("users", {}))
    me = str(uid)
    my_rank = next((i + 1 for i, (u, _v) in enumerate(rk) if u == me), None)
    rows = [{"rank": i + 1, "name": v.get("name", ""), "xp": v.get("xp", 0), "lv": v.get("lv", ""), "me": u == me}
            for i, (u, v) in enumerate(rk[:top])]
    if my_rank and my_rank > top:
        v = lg["users"][me]
        rows.append({"rank": my_rank, "name": v.get("name", ""), "xp": v.get("xp", 0), "lv": v.get("lv", ""), "me": True})
    prk = _ranked(lg.get("prev", {}))
    prev = next(({"rank": i + 1, "xp": v.get("xp", 0), "of": len(prk)} for i, (u, v) in enumerate(prk) if u == me), None)
    return {"week": lg.get("week", _week()), "ends": _week_end(), "total": len(rk), "me": my_rank,
            "my_xp": lg.get("users", {}).get(me, {}).get("xp", 0), "rows": rows, "prev": prev}


# ---------- O'qituvchi guruhlari ----------
import secrets as _secrets
_CODE_ABC = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"


def _new_code(existing) -> str:
    while True:
        c = "".join(_secrets.choice(_CODE_ABC) for _ in range(6))
        if c not in existing:
            return c


async def group_create(uid: int, name: str) -> dict:
    name = " ".join(str(name or "").split())[:40] or "Guruh"
    async with _lock:
        gr = _read(GROUPS_FILE, {})
        if sum(1 for g in gr.values() if g.get("owner") == uid) >= 10:
            raise ValueError("Ko'pi bilan 10 ta guruh yaratish mumkin.")
        code = _new_code(gr)
        gr[code] = {"name": name, "owner": uid, "created": time.time(), "members": {}}
        _write(GROUPS_FILE, gr)
        return {"code": code, "name": name}


async def group_join(uid: int, code: str, name: str) -> dict:
    code = str(code or "").strip().upper()
    async with _lock:
        gr = _read(GROUPS_FILE, {})
        g = gr.get(code)
        if not g:
            raise ValueError("Bunday guruh kodi topilmadi.")
        if sum(1 for x in gr.values() if str(uid) in x.get("members", {})) >= 5 and str(uid) not in g["members"]:
            raise ValueError("Ko'pi bilan 5 ta guruhga qo'shilish mumkin.")
        if len(g["members"]) >= 200 and str(uid) not in g["members"]:
            raise ValueError("Guruh to'lgan (200 kishi).")
        g["members"][str(uid)] = {"name": _clean_name(name), "joined": g["members"].get(str(uid), {}).get("joined", time.time())}
        _write(GROUPS_FILE, gr)
        return {"code": code, "name": g["name"]}


async def group_leave(uid: int, code: str) -> None:
    async with _lock:
        gr = _read(GROUPS_FILE, {})
        g = gr.get(str(code).upper())
        if g and g["members"].pop(str(uid), None) is not None:
            _write(GROUPS_FILE, gr)


async def group_delete(uid: int, code: str) -> bool:
    async with _lock:
        gr = _read(GROUPS_FILE, {})
        g = gr.get(str(code).upper())
        if not g or g.get("owner") != uid:
            return False
        del gr[str(code).upper()]
        _write(GROUPS_FILE, gr)
        return True


def groups_of(uid: int) -> dict:
    gr = _read(GROUPS_FILE, {})
    own = [{"code": c, "name": g["name"], "count": len(g.get("members", {}))} for c, g in gr.items() if g.get("owner") == uid]
    joined = [{"code": c, "name": g["name"]} for c, g in gr.items() if str(uid) in g.get("members", {})]
    return {"owned": own, "joined": joined}


def in_any_group(uid: int) -> bool:
    return any(str(uid) in g.get("members", {}) for g in _read(GROUPS_FILE, {}).values())


async def group_stats_save(uid: int, st: dict) -> bool:
    if not in_any_group(uid):
        return False
    clean = {}
    for k in ("tests7", "avg7", "streak", "mins7", "xp", "words", "role", "stories"):
        try:
            clean[k] = max(0, min(int(st.get(k) or 0), 10_000_000))
        except (TypeError, ValueError):
            clean[k] = 0
    for k in ("level", "weak", "exam", "last"):
        clean[k] = str(st.get(k) or "")[:80]
    clean["ts"] = time.time()
    async with _lock:
        gs = _read(GSTATS_FILE, {})
        gs[str(uid)] = clean
        _write(GSTATS_FILE, gs)
    return True


def group_view(uid: int, code: str) -> dict | None:
    gr = _read(GROUPS_FILE, {})
    g = gr.get(str(code).upper())
    if not g or g.get("owner") != uid:
        return None
    gs = _read(GSTATS_FILE, {})
    lg = _league_roll(_read(LEAGUE_FILE, {}))
    rows = []
    for m, info in g.get("members", {}).items():
        st = gs.get(m, {})
        rows.append({"name": info.get("name", ""), "joined": info.get("joined", 0), "wxp": lg.get("users", {}).get(m, {}).get("xp", 0), **st})
    rows.sort(key=lambda r: -r.get("wxp", 0))
    return {"code": str(code).upper(), "name": g["name"], "rows": rows}
