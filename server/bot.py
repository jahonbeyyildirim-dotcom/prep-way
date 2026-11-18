"""Telegram bot: ilovani ochish, ovozli xabarlarni baholash (ovozli assistent), kitob qabul qilish, Premium (Stars)."""
import html
import logging
import time

from aiogram import Bot, F, Router
from aiogram.filters import Command, CommandObject, CommandStart
from aiogram.types import (
    BufferedInputFile,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    LabeledPrice,
    Message,
    PreCheckoutQuery,
    WebAppInfo,
)

from . import ai, books, config, korean, storage
from .ai import AIError

log = logging.getLogger("bot")
router = Router()
HISTORY: dict[int, list] = {}  # ovozli suhbat tarixi (xotirada, server qayta ishga tushsa tozalanadi)
def e(s) -> str:
    return html.escape(str(s), quote=False)


def app_kb(text: str = "📚 Ilovani ochish") -> InlineKeyboardMarkup | None:
    if not config.WEBAPP_URL:
        return None
    return InlineKeyboardMarkup(inline_keyboard=[[InlineKeyboardButton(text=text, web_app=WebAppInfo(url=config.WEBAPP_URL))]])


# ---------------------------------------------------------------- buyruqlar
@router.message(CommandStart())
async def cmd_start(m: Message, command: CommandObject):
    if command.args == "premium":
        await send_invoice(m)
        return
    name = e(m.from_user.first_name if m.from_user else "")
    await m.answer(
        f"Assalomu alaykum, {name}! 👋\n\n"
        "🇰🇷 <b>Hanguk Way</b> — EPS-TOPIK va TOPIK imtihonlariga o'zbek tilida tayyorlanish.\n\n"
        "🎙 <b>Ovozli assistent:</b> menga koreyscha ovozli xabar yuboring. Gapingizni baholayman, xatolarni "
        "tuzataman va suhbatni davom ettiraman.\n"
        "📚 <b>O'z kitobingiz:</b> koreys tili darsligini PDF yoki rasm qilib yuboring. Shu kitob bo'yicha "
        "darslar tuzib beraman.\n"
        "📝 <b>Ilovada:</b> mock testlar, talaffuz mashqi, qiyin so'zlar va shaxsiy maslahatlar.\n\n"
        "Boshlash uchun tugmani bosing 👇",
        reply_markup=app_kb(),
    )


@router.message(Command("help"))
async def cmd_help(m: Message):
    await m.answer(
        "🎙 Koreyscha ovozli xabar yuboring — baholayman va javob beraman.\n"
        "✍️ Koreyscha yozing — xatolarni tuzataman.\n"
        "❓ O'zbekcha so'rang (masalan: «Kechirasiz» koreyscha qanday?) — o'rgataman.\n"
        "📚 Koreys tili kitobini PDF/rasm qilib yuboring — darslar tuzaman.\n\n"
        "/yangi — suhbatni yangidan boshlash\n/premium — Premium (Telegram Stars)\n/paysupport — to'lov bo'yicha yordam",
        reply_markup=app_kb(),
    )


@router.message(Command("yangi"))
async def cmd_reset(m: Message):
    HISTORY.pop(m.from_user.id, None)
    await m.answer("🔄 Suhbat yangidan boshlandi. Koreyscha biror narsa ayting yoki yozing!")


# ---------------------------------------------------------------- Premium (Telegram Stars)
@router.message(Command("premium"))
async def cmd_premium(m: Message):
    await send_invoice(m)


async def send_invoice(m: Message):
    until = storage.premium_until(m.from_user.id)
    if until > time.time():
        days = int((until - time.time()) // 86400) + 1
        await m.answer(f"⭐ Sizda Premium bor, yana {days} kun amal qiladi. Qayta to'lasangiz muddat uzayadi.")
    await m.answer_invoice(
        title="Hanguk Way Premium — 1 oy",
        description=f"Kuniga {config.PREMIUM_DAILY_AI} ta AI so'rov, {config.PREMIUM_MAX_BOOKS} tagacha kitob, "
                    f"ovozli assistent va shaxsiy maslahatlar ({config.PREMIUM_DAYS} kun).",
        payload="premium_30d",
        currency="XTR",  # Telegram Stars — raqamli xizmatlar uchun majburiy
        prices=[LabeledPrice(label=f"Premium {config.PREMIUM_DAYS} kun", amount=config.PREMIUM_STARS)],
        provider_token="",
    )


@router.pre_checkout_query()
async def on_pre_checkout(q: PreCheckoutQuery):
    if q.invoice_payload != "premium_30d":
        await q.answer(ok=False, error_message="Noma'lum to'lov. Qaytadan urinib ko'ring.")
        return
    await q.answer(ok=True)


@router.message(F.successful_payment)
async def on_paid(m: Message):
    until = await storage.add_premium(m.from_user.id, m.successful_payment.telegram_payment_charge_id)
    date = time.strftime("%d.%m.%Y", time.localtime(until))
    await m.answer(f"✅ To'lov qabul qilindi! Premium {date} gacha faol.", reply_markup=app_kb())


@router.message(Command("paysupport"))
async def cmd_paysupport(m: Message):
    await m.answer(
        f"💬 To'lov bo'yicha savollar uchun: {e(config.SUPPORT_CONTACT)}\n\n"
        "To'lov sanasi va muammoni yozing. Telegram qo'llab-quvvatlash xizmati bu botdagi xaridlar bo'yicha "
        "yordam bera olmaydi, shuning uchun bevosita bizga yozing."
    )


# ---------------------------------------------------------------- ovozli assistent
def _format_turn(user_text: str, res: dict, spoken: bool) -> str:
    lines = [f"🗣 <b>Siz:</b> {e(user_text)}"]
    if res.get("help_uz"):
        lines.append(f"\n💡 {e(res['help_uz'])}")
    else:
        corrected = res.get("corrected_ko", "").strip()
        if corrected and korean.only_hangul(corrected) != korean.only_hangul(user_text):
            lines.append(f"✅ <b>To'g'risi:</b> {e(corrected)}")
        if res.get("correction_uz"):
            lines.append(f"📝 {e(res['correction_uz'])}")
        sc = res.get("scores") or {}
        parts = []
        if sc.get("grammar") is not None:
            parts.append(f"Grammatika {sc['grammar']}")
        if sc.get("vocabulary") is not None:
            parts.append(f"So'z boyligi {sc['vocabulary']}")
        if spoken and sc.get("pronunciation") is not None:
            parts.append(f"Talaffuz {sc['pronunciation']}")
        if parts:
            lines.append("📊 " + " · ".join(parts) + " (100 dan)")
    if res.get("reply_ko"):
        lines.append(f"\n🤖 <b>{e(res['reply_ko'])}</b>\n🇺🇿 <i>{e(res.get('reply_uz', ''))}</i>")
    return "\n".join(lines)


async def _turn(m: Message, bot: Bot, text: str, wav: bytes | None):
    uid = m.from_user.id
    hist = HISTORY.setdefault(uid, [])
    res = await ai.chat_turn(hist, text, level="noma'lum (javoblariga qarab moslang)", topic="free", wav=wav)
    hist.extend([{"role": "user", "ko": res.get("corrected_ko") or text}, {"role": "ai", "ko": res.get("reply_ko", "")}])
    del hist[:-12]
    await m.reply(_format_turn(text, res, spoken=wav is not None))
    # AI javobini ovozli xabar qilib ham yuboramiz
    if res.get("reply_ko") and korean.only_hangul(res["reply_ko"]) and await storage.take(uid, "tts"):
        try:
            ogg = await ai.wav_to_ogg_opus(await ai.tts(res["reply_ko"]))
            await bot.send_voice(m.chat.id, BufferedInputFile(ogg, "javob.ogg"))
        except AIError as err:
            log.info("TTS yuborilmadi: %s", err)


@router.message(F.voice | F.audio | F.video_note)
async def on_voice(m: Message, bot: Bot):
    media = m.voice or m.audio or m.video_note
    if (media.duration or 0) > config.MAX_AUDIO_SECONDS:
        await m.reply(f"Ovozli xabar {config.MAX_AUDIO_SECONDS} soniyadan oshmasin.")
        return
    if not await storage.take(m.from_user.id, "ai"):
        await m.reply("Bugungi AI limiti tugadi. Ertaga qayta urinib ko'ring yoki /premium oling.")
        return
    await bot.send_chat_action(m.chat.id, "typing")
    try:
        buf = await bot.download(media)
        wav = await ai.to_wav(buf.read(), "voice.ogg" if m.voice else "audio.mp4")
        text = await ai.transcribe(wav)
        if not text:
            raise AIError("Ovozda gap eshitilmadi. Qayta yozib ko'ring.")
        await _turn(m, bot, text, wav)
    except AIError as err:
        await storage.give_back(m.from_user.id, "ai")
        await m.reply(f"⚠️ {e(str(err))}")


@router.message(F.text & ~F.text.startswith("/"))
async def on_text(m: Message, bot: Bot):
    text = m.text.strip()[:500]
    if not await storage.take(m.from_user.id, "ai"):
        await m.reply("Bugungi AI limiti tugadi. Ertaga qayta urinib ko'ring yoki /premium oling.")
        return
    await bot.send_chat_action(m.chat.id, "typing")
    try:
        await _turn(m, bot, text, None)
    except AIError as err:
        await storage.give_back(m.from_user.id, "ai")
        await m.reply(f"⚠️ {e(str(err))}")


# ---------------------------------------------------------------- kitob qabul qilish
async def _add_book(m: Message, bot: Bot, file_obj, filename: str, size: int | None):
    if size and size > min(config.MAX_UPLOAD_MB, 20) * 1024 * 1024:
        await m.reply(f"Fayl juda katta. Eng ko'pi {min(config.MAX_UPLOAD_MB, 20)} MB.")
        return
    wait = await m.reply("⏳ Kitob tekshirilmoqda: koreys tiliga oidmi va qanday darslardan iborat. 30–90 soniya...")
    try:
        buf = await bot.download(file_obj)
        book = await books.add_book(m.from_user.id, buf.read(), filename)
    except AIError as err:
        await wait.edit_text(f"⚠️ {e(str(err))}")
        return
    lessons = "\n".join(f"{ls['n']}. {e(ls['title'])}" for ls in book["lessons"][:12])
    more = f"\n… va yana {book['lesson_count'] - 12} ta dars" if book["lesson_count"] > 12 else ""
    await wait.edit_text(
        f"✅ <b>{e(book['title'])}</b> qo'shildi!\n📶 Daraja: {e(book.get('level') or '—')}\n\n"
        f"<b>Darslar:</b>\n{lessons}{more}\n\nIlovadagi <b>Kitoblarim</b> bo'limida darslarni oching 👇",
        reply_markup=app_kb("📚 Kitoblarim"),
    )


@router.message(F.document)
async def on_document(m: Message, bot: Bot):
    d = m.document
    await _add_book(m, bot, d, d.file_name or "kitob.pdf", d.file_size)


@router.message(F.photo)
async def on_photo(m: Message, bot: Bot):
    p = m.photo[-1]
    await _add_book(m, bot, p, "sahifa.jpg", p.file_size)
