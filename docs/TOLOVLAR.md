# To'lovlarni ulash: Click va Payme

Kod tayyor (`server/payments.py`, `miniapp/pay.js`). Shartnoma tuzilgach, faqat quyidagilarni sozlash qoladi.

## 1. Click

1. click.uz → «Biznes uchun» → ariza. Shartnoma imzolanadi.
2. **merchant.click.uz** → Xizmatlar → xizmatni tahrirlash:
   - **Prepare URL:** `https://prepway-api.onrender.com/pay/click/prepare`
   - **Complete URL:** `https://prepway-api.onrender.com/pay/click/complete`
3. Kabinetdan uchta qiymatni oling: **Service ID**, **Merchant ID**, **Secret key**.
4. Render → prepway-api → **Environment** ga o'zingiz qo'shing (kalitni hech kimga yubormang):
   - `CLICK_SERVICE_ID`
   - `CLICK_MERCHANT_ID`
   - `CLICK_SECRET_KEY`

## 2. Payme

1. business.payme.uz yoki 1350 → ariza. Shartnoma imzolanadi.
2. **merchant.payme.uz** → kassa → sozlamalar:
   - **Endpoint URL:** `https://prepway-api.onrender.com/pay/payme`
   - **Hisob (account) maydoni:** `order_id` (turi: matn/raqam)
3. Kassa ID va kalitni oling. Avval **test kaliti** bilan sinang.
4. Render → Environment:
   - `PAYME_MERCHANT_ID` — kassa ID
   - `PAYME_KEY` — kalit (sinovda test kaliti)
   - `PAYME_TEST=1` — sinov paytida (to'lov sahifasi checkout.test.paycom.uz). Haqiqiy kalitga o'tganda o'chiring.
   - Fiskal chek uchun (Payme so'rasa): `PAYME_IKPU` (xizmatning MXIK kodi, tasnif.soliq.uz), `PAYME_PACKAGE_CODE`
5. Payme sinov sahifasida (test.paycom.uz) barcha ssenariylarni o'tkazing — Payme shundan keyin kassani ishga tushiradi.

## 3. Narxlar (ixtiyoriy)

Standart: Premium 84 000 so'm, Ultra 120 000 so'm, 30 kun. O'zgartirish uchun: `PRICE_PREMIUM`, `PRICE_ULTRA`, `PAY_DAYS`.

## 4. Tekshirish

- Ilova → Asosiy → Tariflar → «Premium olish». Kalitlar qo'shilgan tizimlargina ko'rinadi.
- To'lovdan keyin obuna avtomatik yoqiladi; ilova 3 soniyada bir tekshiradi.
- Buyurtmalar: `data/orders.json`, Payme tranzaksiyalari: `data/payme_tx.json` (bazaga ham nusxalanadi).

## 5. Sahifalar (to'lov tizimlari so'raydi)

- Ommaviy oferta: `https://prepway-api.onrender.com/oferta` — sariq joylarga YaTT rekvizitlarini yozing (`miniapp/oferta.html`).
- Maxfiylik siyosati: `https://prepway-api.onrender.com/privacy`

## Muhim

- Google Play'dagi versiyada raqamli obuna faqat **Google Play Billing** orqali sotilishi mumkin. Click/Payme — saytdan yuklangan APK, kompyuter va veb versiyalar uchun.
- Telegram Mini App ichida — Telegram Stars (avvalgidek).
