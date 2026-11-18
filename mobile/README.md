# Hanguk Way — Android va iPhone ilovasi

Telegram Mini App'dagi Hanguk Way'ning hamma bo'limlari (mock test, talaffuz, AI suhbatdosh, kitoblar, so'zlar, maslahatlar) alohida telefon ilovasi sifatida ishlaydi. Ilova **Capacitor** asosida qurilgan: bitta kod Android va iPhone uchun ishlaydi. Foydalanuvchi **Google akkaunti** bilan kiradi.

```
mobile/
├── app.config.json        ← 1) SHU YERNI TO'LDIRASIZ: server manzili va Google client ID'lari
├── capacitor.config.json  ← ilova nomi va ID: uz.prepway.app
├── scripts/build-web.mjs  ← ../miniapp kodini ilovaga ko'chiradi
├── resources/             ← ikonka va ochilish ekrani (splash) manbasi
├── android/               ← Android loyihasi (Android Studio'da ochiladi)
└── ios/                   ← iPhone loyihasi (Xcode'da ochiladi)
KALITLAR-MAXFIY/           ← Android imzo kaliti. HECH KIMGA BERMANG, GitHub'ga YUKLAMANG
.github/workflows/         ← GitHub ilovani o'zi yig'adi (APK va AAB)
```

---

## 1-qadam. Serverni yangilang

Server kodi ham yangilandi: endi Google orqali kirish, akkauntni o'chirish va maxfiylik siyosati sahifasi (`/privacy`) bor. Serveringizni shu koddan qayta joylang va ikkita yangi o'zgaruvchini qo'shing:

| Nomi | Izoh |
|---|---|
| `GOOGLE_CLIENT_IDS` | 2-qadamdagi **Web** va **iOS** client ID'lari, vergul bilan |
| `SECRET_KEY` | Uzun tasodifiy satr (40+ belgi). Sessiyalarni imzolaydi. Uni hech qachon o'zgartirmang, aks holda hamma qaytadan kirishi kerak bo'ladi |

`miniapp/privacy.html` faylidagi `[sana]` va `[aloqa]` joylarini to'ldiring. Do'konlar maxfiylik siyosati havolasini talab qiladi, sizniki: `https://SERVERINGIZ/privacy`.

## 2-qadam. Google Cloud'da kirishni sozlang

1. **console.cloud.google.com** → yangi loyiha yarating (masalan, *Hanguk Way*).
2. **APIs & Services → OAuth consent screen (Google Auth Platform)**: ilova nomi *Hanguk Way*, yordam emaili, maxfiylik siyosati havolasi (`https://SERVERINGIZ/privacy`). Turi: **External**. Keyin ilovani **Publish** qiling, aks holda faqat test foydalanuvchilar kira oladi.
3. **Credentials → Create credentials → OAuth client ID** orqali **uchta** client yarating:

| Turi | Nima kiritiladi | Natija qayerga yoziladi |
|---|---|---|
| **Web application** | Hech narsa (nom kifoya) | `app.config.json` → `googleWebClientId` va serverdagi `GOOGLE_CLIENT_IDS` |
| **Android** | Package name: `uz.prepway.app`, SHA-1: `KALITLAR-MAXFIY/README-MAXFIY.txt` dan | Hech qayerga (Google o'zi taniydi) |
| **iOS** | Bundle ID: `uz.prepway.app` | `app.config.json` → `googleIosClientId` va serverdagi `GOOGLE_CLIENT_IDS` |

> Google Play'ga chiqarganingizda Play o'z kaliti bilan qayta imzolaydi. **Play Console → Test and release → App integrity** bo'limidagi *App signing key* SHA-1'ini ham yana bitta **Android** client qilib qo'shing. Aks holda Play'dan o'rnatilgan ilovada Google bilan kirish ishlamaydi.

## 3-qadam. `mobile/app.config.json` ni to'ldiring

```json
{
  "apiBase": "https://SERVERINGIZ-manzili",
  "googleWebClientId": "....apps.googleusercontent.com",
  "googleIosClientId": "....apps.googleusercontent.com"
}
```

## 4-qadam. GitHub'da Android ilovani yig'ing (kompyuterga hech narsa o'rnatmasdan)

1. **github.com** da akkaunt oching va yangi repository yarating.
2. Loyiha papkasini repository'ga yuklang. **`KALITLAR-MAXFIY` papkasini yuklamang** (`.gitignore` uni o'zi chetlab o'tadi). Agar GitHub saytida *Upload files* orqali yuklasangiz, bu papkani o'zingiz tashlab qoldiring.
3. **Settings → Secrets and variables → Actions → New repository secret** bo'limida 4 ta secret qo'shing. Qiymatlari `KALITLAR-MAXFIY/README-MAXFIY.txt` da:
   `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`
4. **Actions** bo'limini oching: har yuklashda Android ilova o'zi yig'iladi (5–10 daqiqa). Tayyor APK oxirgi ishning **Artifacts** bo'limida bo'ladi.
5. **Hamma yuklab olishi uchun:** **Releases → Draft a new release** → teg: `v1.0.0` → **Publish**. Bir necha daqiqada Release sahifasiga `HangukWay-1.0.0.apk` (telefonga o'rnatish uchun) va `HangukWay-1.0.0.aab` (Google Play uchun) qo'shiladi.

> **Havola hamma uchun ochiq bo'lishi uchun** repository **Public** bo'lishi kerak. Kalit va parollar Secrets'da turadi, kodda yo'q. Kodni yopiq saqlamoqchi bo'lsangiz, APK'ni Artifacts'dan yuklab olib, Telegram kanalingizga yoki saytingizga qo'ying.

Foydalanuvchi APK'ni ochganda telefon bir marta «noma'lum manbadan o'rnatish»ga ruxsat so'raydi: bu oddiy holat.

## 5-qadam. Google Play'ga chiqarish

1. **play.google.com/console** da dasturchi akkaunti oching (bir martalik to'lov, shaxsni tasdiqlash kerak).
2. Yangi ilova yarating → `HangukWay-x.y.z.aab` faylini yuklang.
3. Do'kon sahifasini to'ldiring: tavsif, skrinshotlar, ikonka (`mobile/resources/icon.png`), **Privacy policy** havolasi, **Data safety** shakli (Google akkaunt, ovoz va yuklangan fayllar haqida), akkauntni o'chirish yo'li (ilovada: *Akkaunt → Akkauntni o'chirish*).
4. Yangi shaxsiy akkauntlar uchun Google avval bir guruh testerlar bilan **yopiq sinov**ni talab qilishi mumkin. Play Console nimani so'rasa, shuni bajaring.
5. Har yangi versiya uchun yangi teg qo'ying (`v1.0.1`, `v1.1.0`…). Versiya raqami o'zi oshadi.

## 6-qadam. iPhone (App Store)

iPhone ilovasini chiqarish uchun ikki narsa majburiy:
- **Apple Developer Program** a'zoligi (yillik to'lov);
- **Mac kompyuter** va **Xcode**. Mac bo'lmasa, Mac'ni ijaraga beradigan bulutli xizmatlar ham bor.

GitHub'dagi `iPhone ilova (tekshiruv)` ishi har yuklashda iPhone kodi xatosiz yig'ilishini tekshiradi. Lekin App Store'ga yuklash Mac'da bajariladi:

```bash
cd mobile
npm ci
npm run ios          # sahifani tayyorlaydi va Xcode'ni ochadi
```

Xcode'da:
1. **App → Signing & Capabilities → Team**: Apple akkauntingizni tanlang. Bundle ID: `uz.prepway.app`.
2. **Product → Archive → Distribute App → App Store Connect**.
3. **appstoreconnect.apple.com**: avval **TestFlight** orqali o'zingiz va do'stlaringiz sinab ko'ring. Keyin do'kon sahifasini to'ldirib, **App Review**'ga yuboring.

Apple ko'rib chiqishda talab qiladigan narsalar ilovada bor: akkauntni o'chirish tugmasi, maxfiylik siyosati, mikrofon nima uchun kerakligi haqida izoh.

---

## To'lovlar haqida muhim

- **Premium hozircha faqat Telegram'da (Stars) ishlaydi.** Ilovada Premium tugmasi «tez kunda» deydi. Ilova akkaunti (Google) va Telegram akkaunti alohida.
- Google Play va App Store'dagi ilovalarda raqamli obuna odatda **do'konning o'z to'lov tizimi** orqali sotiladi: Google Play Billing va Apple In-App Purchase. Ilova ichida Click yoki Payme'ga yo'naltirish do'kon qoidalariga zid bo'lishi mumkin. Ilova ichida obuna sotish keyingi bosqich. Uni do'kon qoidalariga moslab qo'shish kerak.

## Kompyuterda sinash (ixtiyoriy)

Android Studio o'rnatilgan bo'lsa:

```bash
cd mobile
npm ci
npm run android      # Android Studio ochiladi → ▶ Run (telefon yoki emulyator)
```

Debug versiyada Google bilan kirish ishlashi uchun kompyuteringizdagi debug kalitning SHA-1'ini ham Android client qilib qo'shing (`cd android && ./gradlew signingReport`).

## Ikonka yoki nomni o'zgartirish

- Ikonka: `mobile/resources/icon.png` (1024×1024) va `splash.png` ni almashtiring, keyin `npm run icons`.
- Ilova nomi: `capacitor.config.json` → `appName`. **`appId` ni o'zgartirmang**: do'konga chiqqandan keyin uni o'zgartirib bo'lmaydi.
