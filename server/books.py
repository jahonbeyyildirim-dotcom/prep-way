"""Foydalanuvchi kitoblari: yuklash, faqat koreys tiliga oid ekanini tekshirish, darslar tuzish.

Kitob faqat shu foydalanuvchiga tegishli bo'lib qoladi: boshqa foydalanuvchilarga ko'rsatilmaydi.
"""
import io
import logging
import secrets
import shutil
import time
from pathlib import Path

from . import ai, config, storage
from .ai import AIError
from .korean import hangul_stats

log = logging.getLogger("books")

ALLOWED = {
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
}
NOT_KOREAN = ("Bu fayl qabul qilinmadi: unda koreyscha matn deyarli yo'q. "
              "Ilovaga faqat koreys tiliga oid kitob va qo'llanmalarni yuklash mumkin.")


def _decode_text(data: bytes) -> str:
    for enc in ("utf-8-sig", "utf-16", "cp949", "cp1251"):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            continue
    return data.decode("utf-8", errors="ignore")


def _pdf_text(data: bytes, max_pages: int = 40) -> str:
    try:
        from pypdf import PdfReader
        reader = PdfReader(io.BytesIO(data))
        return "\n".join((p.extract_text() or "") for p in reader.pages[:max_pages])
    except Exception as e:  # skaner qilingan yoki buzuq PDF — AI o'zi o'qiydi
        log.info("PDF matnini olib bo'lmadi: %s", e)
        return ""


def public(meta: dict) -> dict:
    return {k: meta.get(k) for k in ("id", "title", "level", "lesson_count", "lessons", "created", "filename")}


async def add_book(uid: int, data: bytes, filename: str) -> dict:
    ext = Path(filename or "").suffix.lower()
    if ext not in ALLOWED:
        raise AIError("Faqat PDF, TXT yoki rasm (JPG, PNG) qabul qilinadi. Word yoki EPUB faylni avval PDF ga aylantiring.")
    if len(data) > config.MAX_UPLOAD_MB * 1024 * 1024:
        raise AIError(f"Fayl juda katta. Eng ko'pi {config.MAX_UPLOAD_MB} MB.")
    lim = storage.limits(uid)["books"]
    if len(storage.list_books(uid)) >= lim:
        extra = "" if storage.is_premium(uid) else " Premium bilan ko'proq kitob yuklash mumkin."
        raise AIError(f"Kitoblar soni chegarasiga yetdingiz ({lim} ta). Eskisini o'chiring.{extra}")

    # 1-bosqich: tezkor tekshiruv — matnida hangul bormi?
    text = _decode_text(data) if ext == ".txt" else None
    probe = text if text is not None else (_pdf_text(data) if ext == ".pdf" else "")
    if probe and len(probe.strip()) > 300:
        h, ratio = hangul_stats(probe)
        if h < 40 or ratio < 0.03:
            raise AIError(NOT_KOREAN)
    elif ext == ".txt":
        raise AIError("Matn fayli juda qisqa yoki bo'sh.")

    book_id = secrets.token_hex(6)
    d = storage.book_dir(uid, book_id)
    d.mkdir(parents=True, exist_ok=True)
    src = d / f"source{ext}"
    storage.save_bytes(src, data)
    meta = {"id": book_id, "filename": filename, "ext": ext, "mime": ALLOWED[ext], "created": int(time.time())}

    if not await storage.take(uid, "ai"):
        storage.rmtree(d)
        raise AIError("Bugungi AI limiti tugadi. Ertaga qayta urinib ko'ring yoki Premium oling.")
    try:
        if text is None and not config.AI_FAKE:
            meta["gemini_file"] = await ai.upload_file(src, ALLOWED[ext])
        # 2-bosqich: AI tekshiruvi — bu haqiqatan koreys tiliga oid materialmi?
        res = await ai.analyze_book(meta, text)
    except Exception:
        storage.rmtree(d)
        await storage.give_back(uid, "ai")
        raise

    if not res.get("is_korean_material"):
        storage.rmtree(d)
        reason = str(res.get("reason_uz") or "").strip()
        raise AIError(NOT_KOREAN + (f" (AI izohi: {reason})" if reason else ""))

    lessons = []
    for i, ls in enumerate(res.get("lessons") or [], start=1):
        if isinstance(ls, dict) and ls.get("title"):
            lessons.append({"n": i, "title": str(ls["title"])[:120], "summary_uz": str(ls.get("summary_uz", ""))[:200],
                            "pages": str(ls.get("pages", ""))[:20]})
    if not lessons:
        lessons = [{"n": 1, "title": res.get("title") or filename, "summary_uz": "Butun material", "pages": ""}]
    meta.update(title=str(res.get("title") or filename)[:120], level=str(res.get("level") or ""),
                lessons=lessons[:30], lesson_count=len(lessons[:30]))
    storage.write_meta(uid, book_id, meta)
    return public(meta)


async def _ensure_file(uid: int, meta: dict) -> str | None:
    """Kitob matnini (TXT) yoki Gemini'dagi fayl havolasini tayyorlaydi; muddati o'tgan bo'lsa qayta yuklaydi."""
    src = storage.book_dir(uid, meta["id"]) / f"source{meta['ext']}"
    if meta["ext"] == ".txt":
        return _decode_text(src.read_bytes())
    if config.AI_FAKE:
        return None
    g = meta.get("gemini_file")
    if not g or g.get("expires", 0) < time.time():
        meta["gemini_file"] = await ai.upload_file(src, meta["mime"])
        storage.write_meta(uid, meta["id"], meta)
    return None


async def get_lesson(uid: int, book_id: str, n: int) -> dict:
    meta = storage.read_meta(uid, book_id)
    if not meta:
        raise AIError("Kitob topilmadi.")
    lesson_info = next((ls for ls in meta.get("lessons", []) if ls["n"] == n), None)
    if not lesson_info:
        raise AIError("Bunday dars yo'q.")
    cached = storage.read_lesson(uid, book_id, n)
    if cached:
        return cached
    if not await storage.take(uid, "ai"):
        raise AIError("Bugungi AI limiti tugadi. Ertaga qayta urinib ko'ring yoki Premium oling.")
    try:
        text = await _ensure_file(uid, meta)
        lesson = await ai.make_lesson(meta, text, lesson_info)
    except Exception:
        await storage.give_back(uid, "ai")
        raise
    lesson["n"] = n
    storage.write_lesson(uid, book_id, n, lesson)
    return lesson


def delete_book(uid: int, book_id: str) -> None:
    d = storage.book_dir(uid, book_id)
    if d.exists():
        storage.rmtree(d)
