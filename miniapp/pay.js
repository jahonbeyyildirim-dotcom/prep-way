/* Hanguk Way — Premium / Ultra obunasini Click yoki Payme orqali sotib olish.
   Telegram ichida to'lov Telegram Stars orqali (index.html dagi buyBtn), ilovada (Android, iPhone, kompyuter) — shu modul. */
(function () {
  var H = window.HY, K = window.Komiko, I = window.I18N;
  if (!H || !K) return;
  var esc = H.esc, $ = H.$;
  function T(o, v) { return I ? I.f(o, v) : o.uz; }
  function som(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + T({ uz: "so'm", ru: "сум", en: "UZS" }); }
  function dmy(ts) { var d = new Date(ts * 1000); return ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear(); }

  var PLANS = null, PROVIDERS = [], poll = null;
  var NAMES = { premium: "Premium", ultra: "Ultra", center: "Markaz litsenziyasi" }, EXTRA = {};
  var PROV = {
    click: { name: "Click", sub: { uz: "Uzcard, Humo · Click ilovasi", ru: "Uzcard, Humo · приложение Click", en: "Uzcard, Humo · Click app" }, cls: "pay-click" },
    payme: { name: "Payme", sub: { uz: "Uzcard, Humo · Payme ilovasi", ru: "Uzcard, Humo · приложение Payme", en: "Uzcard, Humo · Payme app" }, cls: "pay-payme" },
    test: { name: "Sinov to'lovi", sub: { uz: "faqat dasturchi rejimi", ru: "только режим разработчика", en: "developer mode only" }, cls: "pay-test" }
  };

  function canPay() { return !!(window.PW && (PW.native || PW.demo)) && !H.inTG; }

  function load() {
    if (PLANS) return Promise.resolve();
    return H.api("/api/pay/plans").then(function (d) { PLANS = d.plans || {}; PROVIDERS = d.providers || []; render(d); });
  }

  // Tariflar bo'limidagi holat qatori va narxlar
  function render(d) {
    if (PLANS) Object.keys(PLANS).forEach(function (k) { var el = $("price_" + k); if (el) el.textContent = som(PLANS[k].price); });
    var st = $("payStatus"); if (!st) return;
    var tier = (d && d.tier) || (H.SERVER.me && H.SERVER.me.tier) || "free";
    var until = (d && d.premium_until) || (H.SERVER.me && H.SERVER.me.premium_until) || 0;
    if (tier !== "free" && until > Date.now() / 1000) {
      st.innerHTML = "✅ " + esc(T({ uz: "Sizda {t} faol: {d} gacha", ru: "У вас активен {t}: до {d}", en: "{t} is active until {d}" }, { t: NAMES[tier] || "Premium", d: dmy(until) }));
      st.style.display = "";
    } else st.style.display = "none";
  }

  function playBuild() { return !!(window.PW_CONFIG && PW_CONFIG.store === "play"); }

  function open(plan, extra) {
    EXTRA = extra || {};
    if (playBuild()) { H.toast(T({ uz: "Google Play orqali to'lov tez orada qo'shiladi.", ru: "Оплата через Google Play скоро появится.", en: "Google Play payments are coming soon." })); return; }
    if (!canPay()) { H.toast(T({ uz: "To'lov Hanguk Way ilovasida (Android, iPhone, kompyuter) ishlaydi.", ru: "Оплата доступна в приложении Hanguk Way.", en: "Payments work in the Hanguk Way app." })); return; }
    if (PW.demo) { H.toast(T({ uz: "Demo versiyada to'lov yo'q.", ru: "В демо-версии оплаты нет.", en: "No payments in the demo." })); return; }
    K.sheet('<div class="loading">…</div>');
    load().then(function () { chooser(plan); }).catch(function (e) { K.sheet('<p class="note">' + esc(e.message) + '</p>'); });
  }

  function chooser(plan) {
    var p = PLANS[plan]; if (!p) return;
    var list = PROVIDERS.filter(function (k) { return PROV[k]; });
    var html = '<h3 style="margin:0 0 4px">💳 ' + esc(T({ uz: "{t} — 1 oy", ru: "{t} — 1 месяц", en: "{t} — 1 month" }, { t: NAMES[plan] })) + '</h3>' +
      '<div class="pay-amt">' + esc(som(p.price)) + '</div>' +
      (plan === "center" ? '<p class="note" style="margin:2px 0 6px">' + esc(T({ uz: "«{g}» guruhi: siz va birinchi qo'shilgan {n} ta o'quvchi 30 kun Premium oladi.", ru: "Группа «{g}»: вы и первые {n} учеников получат Premium на 30 дней.", en: "Group “{g}”: you and the first {n} students get Premium for 30 days." }, { g: EXTRA.name || EXTRA.group, n: p.seats || 30 })) + '</p>' : '');
    if (!list.length) {
      html += '<p class="note">' + esc(T({ uz: "To'lov tizimlari hozir ulanmoqda. Tez orada Click va Payme orqali to'lash mumkin bo'ladi.", ru: "Платёжные системы подключаются. Скоро можно будет оплатить через Click и Payme.", en: "Payment systems are being connected. Click and Payme will be available soon." })) + '</p>';
    } else {
      html += '<p class="note" style="margin:6px 0 10px">' + esc(T({ uz: "To'lov usulini tanlang:", ru: "Выберите способ оплаты:", en: "Choose a payment method:" })) + '</p>';
      list.forEach(function (k) {
        html += '<button class="pay-btn ' + PROV[k].cls + '" data-prov="' + k + '"><b>' + esc(PROV[k].name) + '</b><small>' + esc(T(PROV[k].sub)) + '</small><span>›</span></button>';
      });
      html += '<p class="note" style="font-size:12.5px;margin-top:10px">🔒 ' + esc(T({ uz: "Karta ma'lumotlari faqat Click yoki Payme sahifasida kiritiladi — ilovaga saqlanmaydi. To'lovdan keyin obuna avtomatik yoqiladi. Obuna avtomatik yangilanmaydi. To'lov qilish bilan ommaviy oferta shartlariga rozilik bildirasiz.", ru: "Данные карты вводятся только на странице Click или Payme и не сохраняются в приложении. Подписка включится автоматически и не продлевается сама.", en: "Card details are entered only on the Click or Payme page and are never stored in the app. The plan turns on automatically and does not auto-renew." })) + '</p>';
    }
    K.sheet(html);
    document.querySelectorAll("#kSheet [data-prov]").forEach(function (b) {
      b.onclick = function () { start(plan, b.dataset.prov, b); };
    });
  }

  function openUrl(url) {
    // Ilovada tashqi havola tizim brauzerida (yoki Click/Payme ilovasida) ochiladi
    if (window.PW && PW.native) { location.href = url; return; }
    var w = window.open(url, "_blank", "noopener"); if (!w) location.href = url;
  }

  function start(plan, prov, btn) {
    btn.disabled = true;
    H.api("/api/pay/create", { json: { plan: plan, provider: prov, group: EXTRA.group || "" } }).then(function (d) {
      try { localStorage.setItem("pwPayOrder", JSON.stringify({ id: d.order_id, t: Date.now() })); } catch (e) {}
      waiting(d.order_id);
      setTimeout(function () { openUrl(d.url); }, 150);
    }).catch(function (e) { btn.disabled = false; H.toast(e.message); });
  }

  function waiting(oid) {
    K.sheet('<div style="text-align:center"><div style="font-size:44px">⏳</div><h3 style="margin:6px 0">' + esc(T({ uz: "To'lov kutilmoqda", ru: "Ожидаем оплату", en: "Waiting for payment" })) + '</h3>' +
      '<p class="note">' + esc(T({ uz: "To'lov sahifasida to'lovni yakunlang va ilovaga qayting. Obuna avtomatik yoqiladi.", ru: "Завершите оплату на странице платежа и вернитесь в приложение.", en: "Finish the payment on the payment page and come back to the app." })) + '</p>' +
      '<button class="btn" id="payCheck" style="width:100%">' + esc(T({ uz: "To'lovni tekshirish", ru: "Проверить оплату", en: "Check payment" })) + '</button></div>');
    $("payCheck").onclick = function () { check(oid, true); };
    startPoll(oid);
  }

  function startPoll(oid) {
    stopPoll(); var n = 0;
    poll = setInterval(function () { if (++n > 200) return stopPoll(); if (!document.hidden) check(oid, false); }, 3000);
  }
  function stopPoll() { if (poll) { clearInterval(poll); poll = null; } }

  function check(oid, manual) {
    return H.api("/api/pay/order/" + encodeURIComponent(oid)).then(function (o) {
      if (o.status === "paid") { stopPoll(); success(o); }
      else if (o.status === "cancelled") { stopPoll(); forget(); if (manual || $("payCheck")) K.sheet('<p class="note">' + esc(T({ uz: "To'lov bekor qilindi. Qaytadan urinib ko'rishingiz mumkin.", ru: "Оплата отменена. Можно попробовать снова.", en: "The payment was cancelled. You can try again." })) + '</p>'); }
      else if (manual) H.toast(T({ uz: "To'lov hali kelmadi. Bir necha soniyadan keyin yana tekshiring.", ru: "Оплата ещё не поступила. Проверьте через несколько секунд.", en: "Payment not received yet. Check again in a few seconds." }));
    }).catch(function (e) { if (manual) H.toast(e.message); });
  }

  function forget() { try { localStorage.removeItem("pwPayOrder"); } catch (e) {} }

  function success(o) {
    forget();
    if (H.SERVER.me) { H.SERVER.me.tier = o.tier; H.SERVER.me.premium = true; H.SERVER.me.premium_until = o.premium_until; }
    H.api("/api/me").then(function (me) { H.SERVER.me = me; render(); }).catch(function () {});
    render(o);
    K.sheet('<div style="text-align:center"><div style="font-size:52px">🎉</div><h3 style="margin:6px 0">' + esc(T({ uz: "{t} yoqildi!", ru: "{t} активирован!", en: "{t} is on!" }, { t: NAMES[o.plan] || "Premium" })) + '</h3>' +
      '<p class="note">' + esc(o.plan === "center"
        ? T({ uz: "Guruh o'quvchilariga Premium berildi. Yangi qo'shilganlar ham bo'sh o'rin bo'lsa avtomatik oladi.", ru: "Ученики группы получили Premium. Новые участники получат его автоматически, пока есть места.", en: "Group students now have Premium. New members get it automatically while seats remain." })
        : T({ uz: "{d} gacha amal qiladi. Rahmat!", ru: "Действует до {d}. Спасибо!", en: "Valid until {d}. Thank you!" }, { d: dmy(o.premium_until) })) + '</p></div>');
    try { if (window.PWCoach && PWCoach.confetti) PWCoach.confetti(); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent("pw:premium", { detail: o })); } catch (e) {}
  }

  // Ilovaga qaytganda tugallanmagan to'lovni tekshirish
  function resume() {
    var p = null; try { p = JSON.parse(localStorage.getItem("pwPayOrder")); } catch (e) {}
    if (!p || !p.id) return;
    if (Date.now() - p.t > 864e5) { forget(); return; }
    check(p.id, false);
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden) resume(); });

  // Oferta / maxfiylik havolalari serverdagi sahifaga olib boradi
  document.querySelectorAll(".ext-link").forEach(function (a) {
    a.onclick = function (e) { e.preventDefault(); var base = (window.PW_CONFIG && PW_CONFIG.apiBase) || ""; openUrl(base.replace(/\/$/, "") + a.dataset.href); };
  });

  // Tugmalar
  document.querySelectorAll("[data-plan]").forEach(function (b) { b.onclick = function () { open(b.dataset.plan); }; });
  if (canPay()) {
    document.querySelectorAll(".app-pay").forEach(function (el) { el.style.display = ""; });
    setTimeout(function () { load().catch(function () {}); resume(); }, 1200);
  }

  window.PWPay = { open: open, check: check, render: render, openUrl: openUrl, plans: function () { return load().then(function () { return PLANS; }); } };
})();
