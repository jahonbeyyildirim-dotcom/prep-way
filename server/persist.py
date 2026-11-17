"""DATA_DIR dagi muhim fayllarni Postgres bazasiga nusxalaydi va server qayta ishga tushganda tiklaydi.

Nega: bepul hostingda (Render free) disk vaqtinchalik — qayta ishga tushganda fayllar o'chadi.
DATABASE_URL berilmasa, hech narsa qilmaydi (oddiy fayl rejimi).

Saqlanadi: premium_users.json, usage.json, books/** (meta, darslar, kitob fayli).
Saqlanmaydi: tts_cache/** (keshni qayta yaratish mumkin).
"""
import asyncio
import logging
import os
import re
import time
from pathlib import Path

from . import config

log = logging.getLogger("persist")
DSN = os.getenv("DATABASE_URL", "").strip()
# Neon manzilidagi channel_binding parametrini asyncpg tushunmaydi — olib tashlaymiz
DSN = re.sub(r"([?&])channel_binding=[^&]*&?", r"\1", DSN).rstrip("?&")
SKIP = ("tts_cache/",)

_pool = None
_queue: asyncio.Queue | None = None
_worker: asyncio.Task | None = None


def enabled() -> bool:
    return _pool is not None


def _rel(path: Path) -> str | None:
    try:
        rel = Path(path).resolve().relative_to(config.DATA_DIR.resolve()).as_posix()
    except ValueError:
        return None
    return None if rel.startswith(SKIP) else rel


async def init() -> None:
    """Bazaga ulanadi, jadvalni yaratadi va barcha fayllarni DATA_DIR ga tiklaydi."""
    global _pool, _queue, _worker
    if not DSN:
        log.warning("DATABASE_URL yo'q — ma'lumotlar faqat diskda (qayta ishga tushganda o'chishi mumkin).")
        return
    import asyncpg
    for attempt in range(5):
        try:
            _pool = await asyncpg.create_pool(DSN, min_size=1, max_size=3, command_timeout=30,
                                              statement_cache_size=0)  # Neon pooler (PgBouncer) uchun
            break
        except Exception as e:  # Neon uyqudan uyg'onishi bir necha soniya olishi mumkin
            log.warning("Bazaga ulanib bo'lmadi (%s/5): %s", attempt + 1, e)
            await asyncio.sleep(3 * (attempt + 1))
    if _pool is None:
        log.error("Baza ishlamayapti — fayl rejimida davom etamiz.")
        return
    async with _pool.acquire() as c:
        await c.execute("""CREATE TABLE IF NOT EXISTS pw_files (
            path TEXT PRIMARY KEY, data BYTEA NOT NULL, updated DOUBLE PRECISION NOT NULL)""")
        rows = await c.fetch("SELECT path, data FROM pw_files")
    root = config.DATA_DIR.resolve()
    n = 0
    for r in rows:
        p = (root / r["path"]).resolve()
        if root not in p.parents:  # xavfsizlik: faqat DATA_DIR ichiga
            continue
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_bytes(r["data"])
        n += 1
    log.info("Bazadan %d ta fayl tiklandi.", n)
    _queue = asyncio.Queue()
    _worker = asyncio.create_task(_run())


def save(path: Path) -> None:
    """Fayl yozilgandan keyin chaqiriladi: bazaga yuborish navbatga qo'yiladi."""
    if _queue is None:
        return
    rel = _rel(path)
    if rel is None:
        return
    try:
        data = Path(path).read_bytes()
    except FileNotFoundError:
        return
    _queue.put_nowait(("save", rel, data))


def remove(path: Path) -> None:
    """Fayl yoki papka o'chirilgandan keyin chaqiriladi."""
    if _queue is None:
        return
    rel = _rel(path)
    if rel:
        _queue.put_nowait(("remove", rel, None))


async def _run() -> None:
    while True:
        op, rel, data = await _queue.get()
        for attempt in range(3):
            try:
                async with _pool.acquire() as c:
                    if op == "save":
                        await c.execute("""INSERT INTO pw_files(path, data, updated) VALUES($1, $2, $3)
                            ON CONFLICT(path) DO UPDATE SET data = EXCLUDED.data, updated = EXCLUDED.updated""",
                                        rel, data, time.time())
                    else:
                        await c.execute("DELETE FROM pw_files WHERE path = $1 OR path LIKE $2",
                                        rel, rel.rstrip("/") + "/%")
                break
            except Exception as e:
                log.warning("Bazaga yozishda xato (%s, %s): %s", op, rel, e)
                await asyncio.sleep(2 * (attempt + 1))
        _queue.task_done()


async def flush(timeout: float = 10) -> None:
    """To'xtashdan oldin navbatdagi yozuvlarni tugatadi."""
    if _queue is not None:
        try:
            await asyncio.wait_for(_queue.join(), timeout)
        except asyncio.TimeoutError:
            log.warning("Ba'zi yozuvlar bazaga yetib bormadi.")
