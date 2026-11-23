# Hanguk Way — kompyuter ilovasi (Windows, macOS)

Electron asosida. Ilova sahifasi `../miniapp` dan olinadi, server manzili `../mobile/app.config.json` dan.

- Sinash: `cd desktop && npm install && npm start`
- Windows o'rnatuvchisi: `npm run dist:win` → `dist/HangukWay-Windows-*.exe`
- macOS: `npm run dist:mac` → `dist/HangukWay-Mac-*.dmg` (Intel + Apple Silicon)

GitHub Actions (`.github/workflows/desktop.yml`) har `main` yuklashda ikkala faylni yig'ib, «demo» Release'ga
`HangukWay-Windows.exe` va `HangukWay-Mac.dmg` nomi bilan chiqaradi. `/yuklab` sahifasidagi tugmalar shularga olib boradi.

Nutqni tanish kompyuterda server orqali ishlaydi (`/api/stt`), chunki Electron'da brauzerning nutq xizmati yo'q.
Imzo: hozircha sertifikatsiz (Windows SmartScreen va macOS «Open Anyway» ogohlantirishi chiqadi).

## Kompyuterga xos imkoniyatlar (v1.1)

- **Kundalik eslatmalar** — tizim bildirishnomasi (Windows/macOS). Eslatma yoqilgan bo'lsa, oyna yopilganda ilova fonda qoladi
  (Windows: pastki o'ng burchakdagi belgi → «Chiqish» bilan to'liq yopiladi).
- **Kompyuter yoqilganda ishga tushish** — eslatma oynasidagi belgi yoki tray menyusi (macOS: ilova menyusi).
- **Yangilanish** — ilova har 6 soatda `desktop-latest.json` (demo Release) ni tekshiradi va yangi versiya bo'lsa yuklab olishni taklif qiladi.
- **Oyna o'lchami va joyi** eslab qolinadi.
