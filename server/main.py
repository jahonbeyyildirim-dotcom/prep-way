"""Ishga tushirish: python -m server.main  (loyiha papkasidan)

Bitta jarayonda ikkita narsa ishlaydi:
  1) veb-server: Mini App sahifasi + /api (Telegram shu manzilni ochadi)
  2) Telegram bot (polling)
"""
import asyncio
import logging

from aiohttp import web

from . import api, config

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger("main")


async def main():
    app = api.make_app()
    bot = dp = None
    if config.BOT_TOKEN:
        from aiogram import Bot, Dispatcher
        from aiogram.client.default import DefaultBotProperties
        from aiogram.types import MenuButtonWebApp, WebAppInfo

        from .bot import router

        bot = Bot(config.BOT_TOKEN, default=DefaultBotProperties(parse_mode="HTML"))
        dp = Dispatcher()
        dp.include_router(router)
        me = await bot.get_me()
        app["bot_username"] = me.username
        if config.WEBAPP_URL.startswith("https://"):
            await bot.set_chat_menu_button(menu_button=MenuButtonWebApp(text="Ilova", web_app=WebAppInfo(url=config.WEBAPP_URL)))
        else:
            log.warning("WEBAPP_URL https:// bilan boshlanmaydi — menyu tugmasi o'rnatilmadi.")
    else:
        log.warning("BOT_TOKEN yo'q — Telegram bot o'chirilgan, faqat mobil ilova API ishlaydi.")

    if not config.GEMINI_API_KEY and not config.AI_FAKE:
        log.warning("GEMINI_API_KEY kiritilmagan — AI funksiyalari ishlamaydi.")

    runner = web.AppRunner(app)
    await runner.setup()
    await web.TCPSite(runner, "0.0.0.0", config.PORT).start()
    log.info("Server ishga tushdi: http://0.0.0.0:%s", config.PORT)

    try:
        if dp:
            await dp.start_polling(bot)
        else:
            await asyncio.Event().wait()
    finally:
        await runner.cleanup()


if __name__ == "__main__":
    asyncio.run(main())
