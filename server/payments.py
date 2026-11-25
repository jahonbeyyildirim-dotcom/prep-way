"""To'lovlar: Click (Shop API) va Payme (Merchant API) orqali Premium / Ultra obunasi.

Oqim:
  1. Ilova  POST /api/pay/create {plan, provider}  → buyurtma (order) yaratiladi, to'lov sahifasi havolasi qaytadi.
  2. Foydalanuvchi Click yoki Payme sahifasida to'laydi.
  3. Click / Payme serverimizga xabar beradi:  /pay/click/prepare, /pay/click/complete, /pay/payme
     → imzo/parol tekshiriladi, summa tekshiriladi, to'lov tasdiqlansa Premium avtomatik yoqiladi.
  4. Ilova GET /api/pay/order/{id} bilan holatni tekshiradi.

Kalitlar faqat muhit o'zgaruvchilarida (Render → Environment) saqlanadi, kodda emas:
  CLICK_SERVICE_ID, CLICK_MERCHANT_ID, CLICK_SECRET_KEY
  PAYME_MERCHANT_ID, PAYME_KEY, PAYME_TEST=1 (sinov kassasi uchun)
  ixtiyoriy: PAYME_IKPU, PAYME_PACKAGE_CODE (fiskal chek uchun), PRICE_PREMIUM, PRICE_ULTRA, PAY_DAYS
"""
import base64
import hashlib
import hmac
import json
import logging
import os
import time
from urllib.parse import urlencode

from aiohttp import web

from . import config, storage

log = logging.getLogger("payments")

# ---------------- Sozlamalar ----------------
def _env(name, default=""):
    return os.getenv(name, default).strip()


PAY_DAYS = int(_env("PAY_DAYS", "30") or 30)
PLANS = {
    "premium": {"price": int(_env("PRICE_PREMIUM", "84000") or 84000), "days": PAY_DAYS,
                "title": {"uz": "Hanguk Way Premium — 1 oy", "ru": "Hanguk Way Premium — 1 месяц", "en": "Hanguk Way Premium — 1 month"}},
    "ultra": {"price": int(_env("PRICE_ULTRA", "120000") or 120000), "days": PAY_DAYS,
              "title": {"uz": "Hanguk Way Ultra — 1 oy", "ru": "Hanguk Way Ultra — 1 месяц", "en": "Hanguk Way Ultra — 1 month"}},
    # O'quv markazi: guruhga litsenziya — guruh egasi va qo'shilish tartibida birinchi CENTER_SEATS o'quvchi Premium oladi
    "center": {"price": int(_env("PRICE_CENTER", "600000") or 600000), "days": PAY_DAYS, "seats": int(_env("CENTER_SEATS", "30") or 30),
               "title": {"uz": "Hanguk Way — o'quv markazi litsenziyasi, 1 oy", "ru": "Hanguk Way — лицензия учебного центра, 1 месяц",
                         "en": "Hanguk Way — learning centre licence, 1 month"}},
}
ADMIN_KEY = _env("ADMIN_KEY")                # bank o'tkazmasi bilan to'lagan markazlar uchun litsenziyani qo'lda yoqish
CLICK_SERVICE_ID = _env("CLICK_SERVICE_ID")
CLICK_MERCHANT_ID = _env("CLICK_MERCHANT_ID")
CLICK_SECRET_KEY = _env("CLICK_SECRET_KEY")
PAYME_MERCHANT_ID = _env("PAYME_MERCHANT_ID")
PAYME_KEY = _env("PAYME_KEY")
PAYME_TEST = _env("PAYME_TEST") in ("1", "true", "yes")
PAYME_IKPU = _env("PAYME_IKPU")              # soliq.uz dagi xizmat kodi (MXIK/IKPU)
PAYME_PACKAGE_CODE = _env("PAYME_PACKAGE_CODE")
PAYME_TIMEOUT_MS = 12 * 3600 * 1000          # Payme qoidasi: yaratilgan tranzaksiya 12 soatda bekor bo'ladi

ORDERS_FILE = config.DATA_DIR / "orders.json"
PAYME_FILE = config.DATA_DIR / "payme_tx.json"


def providers() -> list[str]:
    out = []
    if CLICK_SERVICE_ID and CLICK_MERCHANT_ID and CLICK_SECRET_KEY:
        out.append("click")
    if PAYME_MERCHANT_ID and PAYME_KEY:
        out.append("payme")
    if config.DEV_MODE:
        out.append("test")                   # faqat lokal sinov: darhol "to'langan" bo'ladi
    return out


def _now_ms() -> int:
    return int(time.time() * 1000)


# ---------------- Buyurtmalar ----------------
def _orders() -> dict:
    return storage._read(ORDERS_FILE, {"seq": 100000, "items": {}})


def get_order(oid) -> dict | None:
    return _orders()["items"].get(str(oid))


async def create_order(uid: int, plan: str, provider: str, group: str = "") -> dict:
    async with storage._lock:
        data = _orders()
        data["seq"] = int(data.get("seq", 100000)) + 1
        oid = str(data["seq"])
        order = {"id": oid, "uid": uid, "plan": plan, "amount": PLANS[plan]["price"], "days": PLANS[plan]["days"],
                 "provider": provider, "status": "new", "created": time.time()}
        if group:
            order["group"] = group
        data["items"][oid] = order
        storage._write(ORDERS_FILE, data)
        return order


async def _set_order(oid: str, **kw) -> dict | None:
    async with storage._lock:
        data = _orders()
        o = data["items"].get(str(oid))
        if not o:
            return None
        o.update(kw)
        storage._write(ORDERS_FILE, data)
        return o


async def _mark_paid(oid: str, provider: str, ref: str) -> bool:
    """Buyurtmani to'langan deb belgilaydi va obunani yoqadi. Bir buyurtma faqat bir marta yoqiladi."""
    o = get_order(oid)
    if not o:
        return False
    if o["status"] == "paid":
        return True
    await _set_order(oid, status="paid", paid_at=time.time(), paid_via=provider, provider_ref=ref)
    if o["plan"] == "center":
        until = await storage.group_license_add(o["group"], int(o["days"]), PLANS["center"]["seats"], f"{provider}:{ref}")
    else:
        until = await storage.add_premium(int(o["uid"]), f"{provider}:{ref}", days=int(o["days"]), tier=o["plan"])
    log.info("To'lov qabul qilindi: order=%s uid=%s plan=%s via=%s until=%s", oid, o["uid"], o["plan"], provider, until)
    return True


def _public_base(req) -> str:
    return (config.WEBAPP_URL or f"{req.scheme}://{req.host}").rstrip("/")


def checkout_url(order: dict, req) -> str:
    ret = f"{_public_base(req)}/pay/done/{order['id']}"
    if order["provider"] == "click":
        return "https://my.click.uz/services/pay?" + urlencode({
            "service_id": CLICK_SERVICE_ID, "merchant_id": CLICK_MERCHANT_ID, "amount": order["amount"],
            "transaction_param": order["id"], "return_url": ret})
    if order["provider"] == "payme":
        raw = f"m={PAYME_MERCHANT_ID};ac.order_id={order['id']};a={order['amount'] * 100};c={ret};l=uz"
        host = "https://checkout.test.paycom.uz" if PAYME_TEST else "https://checkout.paycom.uz"
        return f"{host}/{base64.b64encode(raw.encode()).decode()}"
    return f"{_public_base(req)}/pay/test?order={order['id']}"


# ---------------- Ilova uchun API (avtorizatsiya bilan) ----------------
async def api_plans(req):
    return web.json_response({
        "plans": {k: {"price": v["price"], "days": v["days"], "title": v["title"], "seats": v.get("seats")} for k, v in PLANS.items()},
        "providers": providers(), "tier": storage.tier(req["uid"]), "premium_until": storage.premium_until(req["uid"]),
    })


async def api_create(req):
    body = await req.json()
    plan, provider = str(body.get("plan", "")), str(body.get("provider", ""))
    if plan not in PLANS:
        return web.json_response({"error": "Noma'lum tarif."}, status=400)
    if provider not in providers():
        return web.json_response({"error": "Bu to'lov usuli hozircha ulanmagan."}, status=400)
    group = ""
    if plan == "center":
        group = str(body.get("group", "")).strip().upper()
        if not group or storage.group_owner(group) != req["uid"]:
            return web.json_response({"error": "Litsenziya faqat o'zingiz ochgan guruh uchun olinadi."}, status=400)
    order = await create_order(req["uid"], plan, provider, group)
    return web.json_response({"order_id": order["id"], "amount": order["amount"], "url": checkout_url(order, req)})


async def api_order(req):
    o = get_order(req.match_info["oid"])
    if not o or int(o["uid"]) != req["uid"]:
        return web.json_response({"error": "Buyurtma topilmadi."}, status=404)
    return web.json_response({"id": o["id"], "status": o["status"], "plan": o["plan"], "amount": o["amount"], "group": o.get("group", ""),
                              "tier": storage.tier(req["uid"]), "premium_until": storage.premium_until(req["uid"])})


# ---------------- Sahifalar: to'lovdan qaytish va lokal sinov ----------------
_PAGE = """<!doctype html><html lang="uz"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hanguk Way — to'lov</title><style>body{{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f6f5f1;color:#12245C;
display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:24px}}.c{{background:#fff;border-radius:20px;padding:28px;max-width:420px;
text-align:center;box-shadow:0 10px 30px rgba(18,36,92,.12)}}h1{{font-size:22px;margin:8px 0}}p{{color:#5B6782;line-height:1.5}}
.b{{display:inline-block;margin-top:12px;background:#2B5BE0;color:#fff;text-decoration:none;padding:12px 20px;border-radius:12px;font-weight:700;border:0;font-size:16px}}</style></head>
<body><div class="c">{body}</div></body></html>"""


async def page_done(req):
    o = get_order(req.match_info.get("oid") or req.query.get("order", ""))
    if o and o["status"] == "paid":
        body = "<div style='font-size:48px'>✅</div><h1>To'lov qabul qilindi</h1><p>Obunangiz yoqildi. Hanguk Way ilovasiga qayting — Premium avtomatik ishlaydi.</p>"
    else:
        body = ("<div style='font-size:48px'>⏳</div><h1>To'lov tekshirilmoqda</h1><p>Agar to'lovni yakunlagan bo'lsangiz, bir necha soniyada obuna yoqiladi. "
                "Hanguk Way ilovasiga qayting.</p><script>setTimeout(function(){location.reload()},4000)</script>")
    return web.Response(text=_PAGE.format(body=body), content_type="text/html")


async def page_test(req):
    """Faqat DEV_MODE: to'lov tizimisiz oqimni sinash."""
    if not config.DEV_MODE:
        raise web.HTTPNotFound()
    oid = req.query.get("order", "")
    o = get_order(oid)
    if not o:
        raise web.HTTPNotFound()
    if req.method == "POST":
        await _mark_paid(oid, "test", f"test-{int(time.time())}")
        raise web.HTTPFound(f"/pay/done/{oid}")
    body = (f"<h1>Sinov to'lovi</h1><p>Buyurtma #{oid}: {o['plan']} — {o['amount']:,} so'm</p>"
            f"<form method='post'><button class='b'>To'landi deb belgilash</button></form>").replace(",", " ")
    return web.Response(text=_PAGE.format(body=body), content_type="text/html")


# ---------------- CLICK (Shop API: Prepare / Complete) ----------------
C_OK, C_SIGN, C_AMOUNT, C_ACTION, C_PAID, C_NO_ORDER, C_NO_TX, C_UPDATE, C_REQUEST, C_CANCELLED = 0, -1, -2, -3, -4, -5, -6, -7, -8, -9


def _click_sign(f: dict, with_prepare: bool) -> str:
    s = (f.get("click_trans_id", "") + f.get("service_id", "") + CLICK_SECRET_KEY + f.get("merchant_trans_id", "")
         + (f.get("merchant_prepare_id", "") if with_prepare else "") + f.get("amount", "") + f.get("action", "") + f.get("sign_time", ""))
    return hashlib.md5(s.encode()).hexdigest()


def _click_resp(f: dict, error: int, note: str, **extra):
    return web.json_response({"click_trans_id": f.get("click_trans_id"), "merchant_trans_id": f.get("merchant_trans_id"),
                              "error": error, "error_note": note, **extra})


def _click_check(f: dict, action: str, with_prepare: bool):
    """Umumiy tekshiruvlar. Xato bo'lsa (kod, izoh), bo'lmasa (None, buyurtma)."""
    need = ["click_trans_id", "service_id", "merchant_trans_id", "amount", "action", "sign_time", "sign_string"]
    if with_prepare:
        need.append("merchant_prepare_id")
    if any(f.get(k, "") == "" for k in need):
        return (C_REQUEST, "Error in request from click"), None
    if not CLICK_SECRET_KEY or not hmac.compare_digest(_click_sign(f, with_prepare), f["sign_string"].lower()):
        return (C_SIGN, "SIGN CHECK FAILED!"), None
    if f["action"] != action:
        return (C_ACTION, "Action not found"), None
    if f["service_id"] != CLICK_SERVICE_ID:
        return (C_REQUEST, "Error in request from click"), None
    o = get_order(f["merchant_trans_id"])
    if not o or o["provider"] != "click":
        return (C_NO_ORDER, "User does not exist"), None
    try:
        amount = float(f["amount"])
    except ValueError:
        return (C_REQUEST, "Error in request from click"), None
    if abs(amount - o["amount"]) > 0.009:
        return (C_AMOUNT, "Incorrect parameter amount"), None
    return None, o


async def click_prepare(req):
    f = {k: str(v) for k, v in (await req.post()).items()}
    err, o = _click_check(f, "0", False)
    if err:
        return _click_resp(f, *err)
    if o["status"] == "paid":
        return _click_resp(f, C_PAID, "Already paid")
    if o["status"] == "cancelled":
        return _click_resp(f, C_CANCELLED, "Transaction cancelled")
    await _set_order(o["id"], click_trans_id=f["click_trans_id"], click_prepared=time.time())
    return _click_resp(f, C_OK, "Success", merchant_prepare_id=int(o["id"]))


async def click_complete(req):
    f = {k: str(v) for k, v in (await req.post()).items()}
    err, o = _click_check(f, "1", True)
    if err:
        return _click_resp(f, *err)
    if f["merchant_prepare_id"] != o["id"] or o.get("click_trans_id") != f["click_trans_id"]:
        return _click_resp(f, C_NO_TX, "Transaction does not exist")
    if o["status"] == "paid":
        return _click_resp(f, C_PAID, "Already paid")
    if o["status"] == "cancelled":
        return _click_resp(f, C_CANCELLED, "Transaction cancelled")
    try:
        click_err = int(f.get("error") or 0)
    except ValueError:
        click_err = 0
    if click_err < 0:                       # Click tomonida to'lov amalga oshmadi
        await _set_order(o["id"], status="cancelled", cancel_reason=f.get("error_note", ""))
        return _click_resp(f, C_CANCELLED, "Transaction cancelled")
    if not await _mark_paid(o["id"], "click", f["click_trans_id"]):
        return _click_resp(f, C_UPDATE, "Failed to update user")
    return _click_resp(f, C_OK, "Success", merchant_confirm_id=int(o["id"]))


# ---------------- PAYME (Merchant API, JSON-RPC) ----------------
def _msg(uz, ru, en):
    return {"uz": uz, "ru": ru, "en": en}


E_AUTH = (-32504, _msg("Ruxsat yo'q", "Недостаточно привилегий", "Insufficient privileges"))
E_METHOD = (-32601, _msg("Metod topilmadi", "Метод не найден", "Method not found"))
E_PARSE = (-32700, _msg("JSON xato", "Ошибка разбора JSON", "Parse error"))
E_AMOUNT = (-31001, _msg("Noto'g'ri summa", "Неверная сумма", "Incorrect amount"))
E_NO_TX = (-31003, _msg("Tranzaksiya topilmadi", "Транзакция не найдена", "Transaction not found"))
E_CANT_CANCEL = (-31007, _msg("Xizmat ko'rsatilgan, bekor qilib bo'lmaydi", "Услуга оказана, отмена невозможна", "Service delivered, cannot cancel"))
E_CANT_PERFORM = (-31008, _msg("Amalni bajarib bo'lmaydi", "Невозможно выполнить операцию", "Unable to perform operation"))
E_NO_ORDER = (-31050, _msg("Buyurtma topilmadi", "Заказ не найден", "Order not found"))
E_ORDER_DONE = (-31051, _msg("Buyurtma allaqachon to'langan yoki bekor qilingan", "Заказ уже оплачен или отменён", "Order already paid or cancelled"))
E_ORDER_BUSY = (-31052, _msg("Buyurtma bo'yicha boshqa to'lov kutilmoqda", "По заказу ожидается другой платёж", "Another payment is pending for this order"))


def _payme_txs() -> dict:
    return storage._read(PAYME_FILE, {})


async def _payme_save_tx(tid: str, tx: dict):
    async with storage._lock:
        d = _payme_txs()
        d[tid] = tx
        storage._write(PAYME_FILE, d)


def _payme_order_check(params) -> tuple | dict:
    acc = params.get("account") or {}
    o = get_order(str(acc.get("order_id", "")))
    if not o or o["provider"] != "payme":
        return E_NO_ORDER
    if o["status"] != "new":
        return E_ORDER_DONE
    if int(params.get("amount", -1)) != o["amount"] * 100:
        return E_AMOUNT
    return o


def _detail(o: dict) -> dict | None:
    if not PAYME_IKPU:
        return None
    item = {"title": PLANS[o["plan"]]["title"]["uz"], "price": o["amount"] * 100, "count": 1, "code": PAYME_IKPU, "vat_percent": 0}
    if PAYME_PACKAGE_CODE:
        item["package_code"] = PAYME_PACKAGE_CODE
    return {"receipt_type": 0, "items": [item]}


def _tx_view(tid, tx):
    return {"create_time": tx["create_time"], "perform_time": tx.get("perform_time", 0), "cancel_time": tx.get("cancel_time", 0),
            "transaction": tx["order_id"] + "-" + tid[-6:], "state": tx["state"], "reason": tx.get("reason")}


async def _payme_cancel_timeout(tid, tx):
    tx.update(state=-1, cancel_time=_now_ms(), reason=4)
    await _payme_save_tx(tid, tx)
    await _set_order(tx["order_id"], status="new")


async def payme(req):
    def ok(result, rid):
        return web.json_response({"jsonrpc": "2.0", "result": result, "id": rid})

    def err(e, rid, data=None):
        return web.json_response({"jsonrpc": "2.0", "error": {"code": e[0], "message": e[1], "data": data}, "id": rid})

    # Avtorizatsiya: Basic base64("Paycom:" + PAYME_KEY)
    auth = req.headers.get("Authorization", "")
    expected = "Basic " + base64.b64encode(f"Paycom:{PAYME_KEY}".encode()).decode()
    try:
        body = json.loads(await req.text())
    except Exception:
        return err(E_PARSE, None)
    rid, method, p = body.get("id"), body.get("method", ""), body.get("params") or {}
    if not PAYME_KEY or not hmac.compare_digest(auth, expected):
        return err(E_AUTH, rid)

    if method == "CheckPerformTransaction":
        r = _payme_order_check(p)
        if isinstance(r, tuple):
            return err(r, rid, "order_id" if r is not E_AMOUNT else "amount")
        res = {"allow": True}
        if (d := _detail(r)):
            res["detail"] = d
        return ok(res, rid)

    if method == "CreateTransaction":
        tid = str(p.get("id", ""))
        txs = _payme_txs()
        if tid in txs:
            tx = txs[tid]
            if tx["state"] != 1:
                return err(E_CANT_PERFORM, rid)
            if _now_ms() - tx["create_time"] > PAYME_TIMEOUT_MS:
                await _payme_cancel_timeout(tid, tx)
                return err(E_CANT_PERFORM, rid)
            return ok({"create_time": tx["create_time"], "transaction": _tx_view(tid, tx)["transaction"], "state": 1}, rid)
        r = _payme_order_check(p)
        if isinstance(r, tuple):
            return err(r, rid, "order_id" if r is not E_AMOUNT else "amount")
        busy = [t for t, x in txs.items() if x["order_id"] == r["id"] and x["state"] == 1]
        if busy:
            return err(E_ORDER_BUSY, rid, "order_id")
        tx = {"order_id": r["id"], "amount": int(p.get("amount", 0)), "time": int(p.get("time", 0)),
              "create_time": _now_ms(), "perform_time": 0, "cancel_time": 0, "state": 1, "reason": None}
        await _payme_save_tx(tid, tx)
        return ok({"create_time": tx["create_time"], "transaction": _tx_view(tid, tx)["transaction"], "state": 1}, rid)

    if method == "PerformTransaction":
        tid = str(p.get("id", ""))
        tx = _payme_txs().get(tid)
        if not tx:
            return err(E_NO_TX, rid)
        if tx["state"] == 1:
            if _now_ms() - tx["create_time"] > PAYME_TIMEOUT_MS:
                await _payme_cancel_timeout(tid, tx)
                return err(E_CANT_PERFORM, rid)
            if not await _mark_paid(tx["order_id"], "payme", tid):
                return err(E_CANT_PERFORM, rid)
            tx.update(state=2, perform_time=_now_ms())
            await _payme_save_tx(tid, tx)
        if tx["state"] == 2:
            return ok({"transaction": _tx_view(tid, tx)["transaction"], "perform_time": tx["perform_time"], "state": 2}, rid)
        return err(E_CANT_PERFORM, rid)

    if method == "CancelTransaction":
        tid = str(p.get("id", ""))
        tx = _payme_txs().get(tid)
        if not tx:
            return err(E_NO_TX, rid)
        if tx["state"] == 1:
            tx.update(state=-1, cancel_time=_now_ms(), reason=p.get("reason"))
            await _payme_save_tx(tid, tx)
            await _set_order(tx["order_id"], status="cancelled")
        elif tx["state"] == 2:
            return err(E_CANT_CANCEL, rid)      # obuna allaqachon yoqilgan: qaytarish qo'lda, qo'llab-quvvatlash orqali
        return ok({"transaction": _tx_view(tid, tx)["transaction"], "cancel_time": tx["cancel_time"], "state": tx["state"]}, rid)

    if method == "CheckTransaction":
        tid = str(p.get("id", ""))
        tx = _payme_txs().get(tid)
        if not tx:
            return err(E_NO_TX, rid)
        return ok(_tx_view(tid, tx), rid)

    if method == "GetStatement":
        a, b = int(p.get("from", 0)), int(p.get("to", 0))
        out = []
        for tid, tx in _payme_txs().items():
            if a <= tx["create_time"] <= b:
                v = _tx_view(tid, tx)
                out.append({"id": tid, "time": tx["time"], "amount": tx["amount"], "account": {"order_id": tx["order_id"]}, **v})
        return ok({"transactions": out}, rid)

    if method == "SetFiscalData":
        tid = str(p.get("id", ""))
        tx = _payme_txs().get(tid)
        if not tx:
            return err(E_NO_TX, rid)
        tx.setdefault("fiscal", {})[str(p.get("type", ""))] = p.get("fiscal_data")
        await _payme_save_tx(tid, tx)
        return ok({"success": True}, rid)

    return err(E_METHOD, rid)


async def admin_license(req):
    """Bank o'tkazmasi (hisob-faktura) bilan to'lagan markaz uchun litsenziyani qo'lda yoqish.
    curl -X POST .../admin/group-license -H "X-Admin-Key: ..." -d '{"code":"PN9XRM","days":30}'"""
    if not ADMIN_KEY or not hmac.compare_digest(req.headers.get("X-Admin-Key", ""), ADMIN_KEY):
        raise web.HTTPNotFound()
    try:
        b = await req.json()
        code, days = str(b.get("code", "")).upper(), int(b.get("days", PAY_DAYS))
        seats = int(b.get("seats", PLANS["center"]["seats"]))
        until = await storage.group_license_add(code, days, seats, f"bank:{b.get('ref', '')}")
    except (ValueError, TypeError) as e:
        return web.json_response({"error": str(e)}, status=400)
    log.info("Litsenziya qo'lda yoqildi: %s, %s kun, %s o'rin", code, days, seats)
    return web.json_response({"ok": True, "code": code, "until": until})


def routes() -> list:
    return [
        web.get("/api/pay/plans", api_plans),
        web.post("/api/pay/create", api_create),
        web.get("/api/pay/order/{oid}", api_order),
        web.post("/pay/click/prepare", click_prepare),
        web.post("/pay/click/complete", click_complete),
        web.post("/pay/payme", payme),
        web.post("/admin/group-license", admin_license),
        web.get("/pay/done", page_done),
        web.get("/pay/done/{oid}", page_done),
        web.get("/pay/test", page_test),
        web.post("/pay/test", page_test),
    ]
