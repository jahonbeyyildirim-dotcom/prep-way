# Prep Way: Telegram Mini App + AI server

EPS-TOPIK va TOPIK imtihonlariga o'zbek tilida tayyorlov. Bu versiyada sun'iy intellekt (Google Gemini) ulangan.

## Nimalar bor

| Bo'lim | Nima qiladi |
|---|---|
| 🎯 **Talaffuz baholash** | Foydalanuvchi gapni o'qiydi. AI aniqlik, talaffuz va ravonlikni 100 balldan baholaydi, noto'g'ri bo'g'inlarni qizil rangda ko'rsatadi va o'zbekcha maslahat beradi |
| 🤖 **AI suhbatdosh (ovozli assistent)** | Ovoz yoki matn bilan koreyscha suhbat (tanishuv, ish joyi, do'kon, kasalxona...). Har bir javob tuzatiladi va baholanadi, AI javobi ovoz bilan o'qiladi |
| 🎙 **Botda ovozli assistent** | Botga koreyscha ovozli xabar yuboriladi, bot baholab, **ovozli javob** qaytaradi. Mikrofon Mini App ichida ishlamaydigan telefonlar uchun ham yo'l shu |
| 📚 **Kitoblarim** | Foydalanuvchi o'z kitobini yuklaydi (PDF, TXT, rasm). **Faqat koreys tiliga oid** materiallar qabul qilinadi. AI kitobni darslarga bo'ladi va har bir dars bo'yicha so'zlar, grammatika, matn, mashqlar va gapirish mashqini tuzadi. Kitobni botga fayl qilib yuborsa ham bo'ladi |
| 💡 **Maslahatlar** | 6 bo'limli doimiy maslahatlar va natijalar asosida AI tuzgan shaxsiy maslahat hamda 7 kunlik reja |
| 🗂 **So'zlar** | TOPIK I, EPS, o'rta (3–4), **eng qiyin (5–6)**, maqollar va 사자성어. "AI: yana 10 ta so'z" tugmasi tanlangan daraja bo'yicha yangi so'zlarni misollari bilan qo'shadi |
| 📝 Mock test, xatolar daftari, Premium (Telegram Stars) | Avvalgidek |

## 📱 Android va iPhone ilovasi

Prep Way endi alohida telefon ilovasi sifatida ham bor (Google akkaunt bilan kirish). Yo'riqnoma: **[mobile/README.md](mobile/README.md)**.
Qisqacha: serverga `GOOGLE_CLIENT_IDS` va `SECRET_KEY` qo'shing, `mobile/app.config.json` ni to'ldiring, loyihani GitHub'ga yuklang. GitHub APK'ni o'zi yig'ib beradi.

## Tuzilishi

```
prep-way/
├── miniapp/            ← Telegram ichida ochiladigan sahifa
│   ├── index.html
│   └── features.js     ← AI bo'limlari
├── server/             ← Python server (sahifa + API + bot, bitta jarayon)
│   ├── main.py         ← ishga tushirish
│   ├── api.py          ← Mini App uchun API
│   ├── bot.py          ← Telegram bot
│   ├── ai.py           ← Gemini bilan ishlash
│   ├── books.py        ← kitob yuklash va tekshirish
│   ├── auth.py         ← Telegram foydalanuvchisini tekshirish
│   ├── korean.py       ← talaffuzni matn bo'yicha solishtirish
│   ├── storage.py      ← Premium, limitlar, kitoblar
│   └── config.py       ← sozlamalar
├── requirements.txt
└── Dockerfile
```

Endi Mini App va server **bitta manzilda** ishlaydi, shuning uchun GitHub Pages kerak emas.

---

## 1. Kalitlarni olish

1. **Bot tokeni:** @BotFather → `/newbot` (avvalgi botingiz bo'lsa, o'shaning tokeni).
2. **Gemini API kaliti:** aistudio.google.com saytiga Google akkaunt bilan kiring → **Get API key** → **Create API key**. Bepul limit bilan boshlash mumkin, karta shart emas. Foydalanuvchilar ko'paysa, pullik tarifga o'tish kerak bo'ladi.

## 2. Kompyuterda sinab ko'rish (kalitsiz)

Python 3.10+ va **ffmpeg** kerak (Windows: `winget install ffmpeg`, Mac: `brew install ffmpeg`).

```bash
pip install -r requirements.txt
# Windows PowerShell:
$env:DEV_MODE="1"; $env:AI_FAKE="1"; python -m server.main
# Mac / Linux:
DEV_MODE=1 AI_FAKE=1 python -m server.main
```

Brauzerda `http://localhost:8080` ni oching. AI o'rniga namunaviy javoblar qaytadi: bu dizayn va tugmalarni tekshirish uchun.

Haqiqiy AI bilan sinash uchun `AI_FAKE` ni olib tashlab, `GEMINI_API_KEY` ni qo'shing.

## 3. Serverga joylash

Telegram faqat **https://** manzilni ochadi. Serverga uchta narsa kerak:
- **Docker** (loyihada `Dockerfile` bor, ffmpeg o'zi o'rnatiladi);
- **https manzil**;
- **doimiy disk (volume)**, `/data` papkasiga ulanadi. Kitoblar, Premium va limitlar shu yerda saqlanadi.

Docker qo'llaydigan istalgan hosting mos keladi: Railway, Render, Fly.io yoki o'zingizning VPS. Bepul tariflarda server uxlab qolishi yoki disk o'chib ketishi mumkin. Haqiqiy foydalanuvchilar uchun doimiy diskli tarif tanlang.

Hostingda quyidagi **muhit o'zgaruvchilarini** (Environment Variables) kiriting:

| Nomi | Majburiy | Izoh |
|---|---|---|
| `BOT_TOKEN` | ✅ | @BotFather tokeni |
| `GEMINI_API_KEY` | ✅ | AI Studio kaliti |
| `WEBAPP_URL` | ✅ | Serveringiz manzili, masalan `https://prep-way.up.railway.app` |
| `SUPPORT_CONTACT` | tavsiya | To'lov bo'yicha aloqa, masalan `@sizning_username` |
| `GEMINI_MODEL` | — | Standart: `gemini-3.8-flash`. Model eskirsa, AI Studio'dagi yangisini yozing |
| `GEMINI_TTS_MODEL` | — | Ovoz modeli, standart: `gemini-3.8-flash-lite-tts` |
| `PREMIUM_STARS` | — | Premium narxi, standart 200 |
| `FREE_DAILY_AI` / `PREMIUM_DAILY_AI` | — | Kunlik AI so'rovlar: 15 / 300 |
| `FREE_MAX_BOOKS` / `PREMIUM_MAX_BOOKS` | — | Kitoblar soni: 1 / 20 |
| `GOOGLE_CLIENT_IDS` | ilova uchun | Google Web va iOS client ID'lari, vergul bilan (mobil ilova) |
| `SECRET_KEY` | ilova uchun | Sessiya tokenlarini imzolash uchun uzun tasodifiy satr |

Server ishga tushgach, bot o'zi menyu tugmasini (**Ilova**) `WEBAPP_URL` ga bog'laydi.

## 4. Telegram sozlamasi (ixtiyoriy)

@BotFather → `/mybots` → botingiz → **Bot Settings** → Mini App sozlamasi. U yerga `WEBAPP_URL` ni kiriting, shunda ilova bot profilidan ham ochiladi.

`miniapp/index.html` dagi `BOT_USERNAME` ni yangilash shart emas: server bot nomini o'zi yuboradi.

---

## Qanday ishlaydi

**Talaffuz baholash.** Ovoz serverga yuboriladi va ffmpeg bilan WAV formatiga aylantiriladi. Keyin ikki bosqichda tekshiriladi:
1. AI ovozni maqsad gapni **ko'rmasdan** matnga aylantiradi, shunda xatolar "to'g'rilanib" ketmaydi. Bu matn maqsad gap bilan harfma-harf solishtiriladi: **Aniqlik** balli va qizil/yashil bo'g'inlar shundan chiqadi.
2. AI ovozni tinglab **Talaffuz** va **Ravonlik**ni baholaydi va qaysi tovush xato ekanini tushuntiradi.

Umumiy ball: 45% aniqlik + 35% talaffuz + 20% ravonlik.

**Kitobni tekshirish (faqat koreys tili).** Ham ikki bosqichli:
1. Fayldagi matn ichida hangul ulushi hisoblanadi. Koreyscha deyarli bo'lmasa, AI'ga yuborilmasdan rad etiladi va limit sarflanmaydi.
2. AI kitobni o'qib, koreys tiliga oid material ekanini tasdiqlaydi va darslar ro'yxatini tuzadi. Koreyaga oid, lekin boshqa tildagi kitoblar ham rad etiladi.

Har bir dars birinchi marta ochilganda tuziladi va saqlab qo'yiladi. Qayta ochilganda AI limiti sarflanmaydi.

**Xavfsizlik.** Mini App har so'rovda Telegram bergan `initData` ni yuboradi va server uni bot tokeni bilan tekshiradi. Shuning uchun birov boshqa foydalanuvchining Premium'i yoki kitoblaridan foydalana olmaydi. Yuklangan kitoblar faqat egasiga ko'rinadi.

**Limitlar.** AI har so'rovda pul (yoki bepul limit) sarflaydi, shuning uchun har bir foydalanuvchiga kunlik limit qo'yilgan. AI xato bersa, limit qaytariladi. Ovozga aylantirilgan gaplar keshlanadi: bir gap faqat bir marta yaratiladi.

---

## Bilish kerak bo'lgan cheklovlar

- **Mikrofon:** Mini App ichida ovoz yozish Telegram versiyasi va telefonga bog'liq. Ishlamasa, ilova avtomatik ravishda "botga ovozli xabar yuboring" degan yo'lni ko'rsatadi. Bot orqali ovozli assistent hamma telefonda ishlaydi.
- **AI baholash taxminiy.** U o'qituvchining o'rnini to'liq bosa olmaydi. Mashq va yo'nalish berish uchun yaxshi, lekin imtihon natijasini kafolatlamaydi.
- **Model nomlari o'zgaradi.** Google eski modellarni vaqti-vaqti bilan o'chiradi. AI "model topilmadi" desa, `GEMINI_MODEL` ni AI Studio'dagi yangi nomga almashtiring.
- **Mualliflik huquqi:** foydalanuvchi kitobni o'zi o'qish uchun yuklaydi. Kitob boshqa foydalanuvchilarga ko'rsatilmaydi, AI esa undan uzun parchalarni ko'chirmasdan o'z matnini yozadi. Rasmiy EPS-TOPIK va TOPIK savollarini ilovaga ko'chirib qo'ymang.
- **Saqlash:** hozircha JSON fayllar ishlatiladi. Bir necha ming foydalanuvchidan keyin ma'lumotlar bazasiga (PostgreSQL) o'tish kerak.
- **To'lov:** Telegram ichida raqamli xizmat uchun faqat Telegram Stars. Bu Telegram qoidasi.
