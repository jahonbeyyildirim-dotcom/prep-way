/* Hanguk Way — murabbiy: streak muzlatish, haftalik ko'rinish, kunlik maqsad bayrami,
   zaif savol turlari xaritasi, "Nega xato?" AI izohi va kundalik eslatmalar. */
(function () {
  var H = window.HY, K = window.Komiko, I = window.I18N;
  if (!H || !K) return;
  var esc = H.esc, $ = H.$;
  function T(o, v) { return I ? I.f(o, v) : o.uz; }
  function ld(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function sv(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function ymd(d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function dayAgo(i) { var t = new Date(); return ymd(new Date(t.getFullYear(), t.getMonth(), t.getDate() - i)); }
  var A = K.Activity, NATIVE = !!(window.PW && window.PW.native);
  function active(k) { var x = A.all()[k]; return !!(x && ((x.done && x.done.length) || x.secs >= 60)); }

  // ================= STREAK MUZLATISH =================
  // Boshlanishda 1 ta, har 7 kunlik seriyada +1 (ko'pi bilan 2). O'tkazib yuborilgan kun avtomatik "muzlatiladi".
  var FKEY = "pwFreeze";
  function fz() { var f = ld(FKEY, null); if (!f) { f = { have: 1, used: [], earned: "" }; sv(FKEY, f); } return f; }
  function maintain() {
    var p = K.Profile.get(); if (!p || !p.created) return;
    var f = fz(), used = {}; f.used.forEach(function (d) { used[d] = 1; });
    // kecha (va kerak bo'lsa undan oldingi kun) o'tkazib yuborilgan bo'lsa — oldin seriya bo'lgan taqdirda muzlatamiz
    var gap = [];
    for (var i = 1; i <= 2; i++) { var k = dayAgo(i); if (active(k) || used[k]) break; gap.push(k); }
    var before = dayAgo(gap.length + 1);
    if (gap.length && gap.length <= f.have && (active(before) || used[before])) {
      gap.forEach(function (k) { f.used.push(k); }); f.have -= gap.length; f.used = f.used.slice(-30); sv(FKEY, f);
      setTimeout(function () { H.toast("🧊 " + T({ uz: "Seriyangiz saqlab qolindi — {n} kun muzlatildi.", ru: "Серия сохранена — заморожено дней: {n}.", en: "Streak saved — {n} day(s) frozen." }, { n: gap.length })); }, 1500);
    }
  }
  function earn() {
    var f = fz(), s = A.streak(), td = dayAgo(0);
    if (s > 0 && s % 7 === 0 && active(td) && f.earned !== td && f.have < 2) {
      f.have++; f.earned = td; sv(FKEY, f);
      H.toast("🧊 +1 " + T({ uz: "muzlatish! {s} kunlik seriya uchun sovg'a.", ru: "заморозка! Подарок за серию {s} дн.", en: "freeze! A gift for your {s}-day streak." }, { s: s }));
    }
  }

  // ================= HAFTA KO'RINISHI =================
  var WD = { uz: ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"], ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"], en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] };
  function week() {
    var t = new Date(), dow = (t.getDay() + 6) % 7, f = fz(), used = {}, lg = I ? I.lang() : "uz";
    f.used.forEach(function (d) { used[d] = 1; });
    var h = '<div class="wk">';
    for (var i = 0; i < 7; i++) {
      var d = new Date(t.getFullYear(), t.getMonth(), t.getDate() - dow + i), k = ymd(d);
      var st = active(k) ? "on" : used[k] ? "ice" : i === dow ? "today" : i > dow ? "fut" : "miss";
      h += '<div class="wk-d ' + st + '"><i>' + (st === "on" ? "🔥" : st === "ice" ? "🧊" : "") + '</i><span>' + (WD[lg] || WD.uz)[i] + '</span></div>';
    }
    return h + '<div class="wk-f" title="Streak freeze">🧊 ' + f.have + '</div></div>';
  }

  // ================= KUNLIK MAQSAD BAYRAMI =================
  function checkGoal() {
    var p = K.Profile.get(); if (!p || !p.created) return;
    var d = A.day(), goal = (p.daily || 10) * 60, td = dayAgo(0);
    if (d.secs >= goal && ld("pwGoalCel", "") !== td) {
      sv("pwGoalCel", td); earn(); confetti();
      document.dispatchEvent(new CustomEvent("pw:xp", { detail: { xp: 20, why: "goal" } }));
      H.toast("🎉 " + T({ uz: "Bugungi maqsad bajarildi! 🔥 {s} kun ketma-ket.", ru: "Цель на сегодня выполнена! 🔥 {s} дн. подряд.", en: "Daily goal done! 🔥 {s} days in a row." }, { s: A.streak() }));
      H.haptic && H.haptic("note", "success");
      remind();  // bugungi eslatma kerak emas
    }
  }
  function confetti() {
    var c = document.createElement("div"); c.className = "cf";
    var col = ["#FF5A4E", "#FF9A3C", "#2B5BE0", "#12245C", "#2f9e6b", "#f5c542"];
    for (var i = 0; i < 60; i++) {
      var s = document.createElement("i");
      s.style.cssText = "left:" + Math.random() * 100 + "%;background:" + col[i % col.length] + ";animation-delay:" + (Math.random() * 0.5) + "s;animation-duration:" + (1.6 + Math.random() * 1.2) + "s;transform:rotate(" + (Math.random() * 360) + "deg)";
      c.appendChild(s);
    }
    document.body.appendChild(c); setTimeout(function () { c.remove(); }, 3500);
  }

  // ================= ZAIF JOYLAR =================
  var SKEY = "pwTypeStat";
  function record(exam, qs, ans) {
    var st = ld(SKEY, {}), e = st[exam] || (st[exam] = {});
    qs.forEach(function (q, i) {
      if (!q.type) return;
      var x = e[q.type] || (e[q.type] = { r: [] });
      x.r.push(ans[i] === q.a ? 1 : 0); if (x.r.length > 20) x.r = x.r.slice(-20);
    });
    sv(SKEY, st);
  }
  function acc(x) { return x.r.reduce(function (a, b) { return a + b; }, 0) / x.r.length; }
  function label(t) {
    var F = window.PW_FORMAT, y = F && F.TYPES[t]; if (!y) return t;
    var txt = I ? I.pick({ uz: y.uz, ru: y.ru, en: y.en }) : y.uz;
    txt = String(txt || "").replace(/<보기>dagidek |, как в <보기>|, as in <보기>|как в <보기>, |<보기>/g, "").replace(/\s+/g, " ").trim();
    if (txt.length > 58) txt = txt.slice(0, 56).replace(/\s+\S*$/, "") + "…";
    return { sec: H.secName(y.sec), range: y.range || "", txt: txt };
  }
  function weak(exam) {
    var e = ld(SKEY, {})[exam] || {};
    return Object.keys(e).filter(function (t) { return e[t].r.length >= 3; })
      .map(function (t) { return { t: t, a: acc(e[t]), n: e[t].r.length }; })
      .sort(function (a, b) { return a.a - b.a; });
  }
  function pickExam(p) {
    var pref = p.goal === "topik" ? ((p.level | 0) >= 3 ? "topik2" : "topik") : "eps", st = ld(SKEY, {});
    var cnt = function (k) { var e = st[k] || {}; return Object.keys(e).reduce(function (a, t) { return a + e[t].r.length; }, 0); };
    if (cnt(pref) >= 8) return pref;
    var best = ["eps", "topik", "topik2"].sort(function (a, b) { return cnt(b) - cnt(a); })[0];
    return cnt(best) > cnt(pref) ? best : pref;
  }
  function card(p) {
    if (!p || (p.level | 0) === 0) return "";
    var ex = pickExam(p), w = weak(ex), bad = w.filter(function (x) { return x.a < 0.8; }).slice(0, 3);
    var h = '<div class="cc"><div class="cc-h"><b>🎯 ' + esc(T({ uz: "Zaif joylaringiz", ru: "Ваши слабые места", en: "Your weak spots" })) + '</b><span class="chip">' + esc(H.examName(ex)) + '</span></div>';
    if (w.length < 2) return h + '<p class="note">' + esc(T({ uz: "2–3 ta test topshiring — qaysi savol turlarida ko'p xato qilayotganingizni topib, aynan shularni mashq qildiraman.", ru: "Пройдите 2–3 теста — я найду типы вопросов, где больше ошибок, и дам тренировку именно по ним.", en: "Take 2–3 tests — I'll find the question types you miss most and drill exactly those." })) + '</p></div>';
    if (!bad.length) return h + '<p class="note">💪 ' + esc(T({ uz: "Barcha savol turlarida 80% dan yuqori! To'liq imtihon topshirib ko'ring.", ru: "Во всех типах вопросов выше 80%! Попробуйте полный экзамен.", en: "Above 80% on every question type! Try a full exam." })) + '</p></div>';
    h += bad.map(function (x) {
      var L = label(x.t), pc = Math.round(x.a * 100), col = pc < 50 ? "var(--red)" : "#b7791f";
      return '<div class="cc-r"><div class="cc-t"><b>' + esc(L.sec) + (L.range ? ' · ' + esc(L.range) : '') + '</b><small>' + esc(L.txt) + '</small></div>' +
        '<div class="cc-p"><b style="color:' + col + '">' + pc + '%</b><i class="cc-bar"><i style="width:' + pc + '%;background:' + col + '"></i></i></div></div>';
    }).join("");
    return h + '<button class="btn cc-go" data-start="' + ex + ':weak:' + bad.map(function (x) { return x.t; }).join(",") + '">🎯 ' +
      esc(T({ uz: "Shularni mashq qilish · ~12 savol", ru: "Тренировать это · ~12 вопросов", en: "Practise these · ~12 questions" })) + '</button></div>';
  }

  // ================= "NEGA XATO?" =================
  var WKEY = "pwWhy";
  function strip(h) { var d = document.createElement("div"); d.innerHTML = h || ""; return d.textContent || ""; }
  function whyHTML(r) {
    return '<div class="why-r"><b>✅ ' + esc(T({ uz: "Nega bu to'g'ri", ru: "Почему это верно", en: "Why this is right" })) + '</b><p>' + esc(r.why_right) + '</p></div>' +
      (r.why_wrong ? '<div class="why-r"><b>❌ ' + esc(T({ uz: "Sizning javobingiz", ru: "Ваш ответ", en: "Your answer" })) + '</b><p>' + esc(r.why_wrong) + '</p></div>' : '') +
      (r.words && r.words.length ? '<div class="why-w">' + r.words.map(function (w) { return '<button class="chip" data-say="' + esc(w.ko) + '"><span class="ko">' + esc(w.ko) + '</span> — ' + esc(w.uz) + '</button>'; }).join("") + '</div>' : '') +
      (r.tip ? '<div class="why-tip">💡 ' + esc(r.tip) + '</div>' : '');
  }
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest(".why-btn"); if (!b) return;
    var q = H.whyQ(b.dataset.why), box = b.nextElementSibling; if (!q || !box) return;
    var your = +b.dataset.your, ck = q.id + ":" + (your > -1 ? q.opts[your] : "-") + ":" + (I ? I.lang() : "uz"), cache = ld(WKEY, {});
    box.hidden = false; b.hidden = true;
    if (cache[ck]) { box.innerHTML = whyHTML(cache[ck]); return; }
    box.innerHTML = '<div class="loading">' + K.avatar(24, "live talking") + ' ' + esc(T({ uz: "Komiko tahlil qilyapti…", ru: "Комико разбирает…", en: "Komiko is analysing…" })) + '</div>';
    var exam = /^[uvy]/.test(q.id) ? "TOPIK II" : /^t/.test(q.id) ? "TOPIK I" : "EPS-TOPIK";
    H.api("/api/explain", { json: { exam: exam, inst: q.inst || "", body: q.text || q.sign || q.pic || q.audio || "", opts: q.opts, correct: q.a, your: your, note: strip(q.exp) } })
      .then(function (r) {
        box.innerHTML = whyHTML(r);
        var c = ld(WKEY, {}), ks = Object.keys(c); if (ks.length > 150) delete c[ks[0]]; c[ck] = r; sv(WKEY, c);
      }).catch(function (e) { box.innerHTML = '<div class="note">⚠️ ' + esc(e.message || String(e)) + '</div>'; b.hidden = false; });
  });

  // ================= ESLATMALAR (faqat telefon ilovasida) =================
  var RKEY = "pwRemind";
  function LN() { var C = window.Capacitor; return NATIVE && C && C.Plugins && C.Plugins.LocalNotifications; }
  function remind() {
    var L = LN(), r = ld(RKEY, null); if (!L || !r || !r.on) return;
    var ids = []; for (var i = 0; i < 7; i++) ids.push({ id: 7001 + i });
    var p = K.Profile.get() || {}, goal = p.daily || 10, s = A.streak(), done = A.day().secs >= goal * 60, now = new Date(), list = [];
    for (var j = 0; j < 7; j++) {
      var at = new Date(now.getFullYear(), now.getMonth(), now.getDate() + j, r.h, r.m || 0);
      if (at <= now || (j === 0 && done)) continue;
      list.push({ id: 7001 + j, title: "Hanguk Way 🔥", schedule: { at: at, allowWhileIdle: true },
        body: s ? T({ uz: "{s} kunlik seriyangizni uzmang! Bugungi {g} daqiqani bajaramizmi?", ru: "Не прерывайте серию в {s} дн.! Позанимаемся {g} минут?", en: "Keep your {s}-day streak! Ready for today's {g} minutes?" }, { s: s + (j ? j : 0), g: goal })
          : T({ uz: "Bugun {g} daqiqa koreys tili — Komiko kutyapti 🙂", ru: "Сегодня {g} минут корейского — Комико ждёт 🙂", en: "{g} minutes of Korean today — Komiko is waiting 🙂" }, { g: goal }) });
    }
    L.cancel({ notifications: ids }).catch(function () {}).then(function () { if (list.length) return L.schedule({ notifications: list }); }).catch(function () {});
  }
  function reminderSheet() {
    var r = ld(RKEY, { on: false, h: 19, m: 0 });
    K.sheet('<h3 style="margin:0 0 8px">🔔 ' + esc(T({ uz: "Kundalik eslatma", ru: "Ежедневное напоминание", en: "Daily reminder" })) + '</h3>' +
      '<p class="note">' + esc(T({ uz: "Har kuni tanlangan soatda eslataman. Maqsad bajarilgan kunlari bezovta qilmayman.", ru: "Напомню каждый день в выбранный час. В дни, когда цель выполнена, не побеспокою.", en: "I'll remind you daily at the chosen time — but not on days you've hit your goal." })) + '</p>' +
      '<div class="onb-speed" style="justify-content:flex-start;flex-wrap:wrap">' + [8, 12, 18, 19, 20, 21].map(function (h) { return '<button data-rh="' + h + '" class="' + (r.on && r.h === h ? "on" : "") + '">' + h + ':00</button>'; }).join("") +
      '<button data-rh="off" class="' + (!r.on ? "on" : "") + '">' + esc(T({ uz: "O'chirish", ru: "Выкл.", en: "Off" })) + '</button></div>' +
      (window.PW_DESKTOP ? '<label style="display:flex;gap:10px;margin-top:12px;align-items:flex-start;cursor:pointer"><input type="checkbox" id="rmAuto" style="width:20px;height:20px;margin-top:2px"><span class="note" style="margin:0">' +
        esc(T({ uz: "Kompyuter yoqilganda Hanguk Way fonda ishga tushsin — oyna ochilmagan bo'lsa ham eslatma keladi.", ru: "Запускать Hanguk Way в фоне при включении компьютера — напоминания придут, даже если окно не открыто.", en: "Start Hanguk Way in the background when the computer starts — reminders arrive even if the window isn't open." })) + '</span></label>' : ''));
    if (window.PW_DESKTOP && PW_DESKTOP.autostart) {
      var cb = $("rmAuto");
      PW_DESKTOP.autostart().then(function (v) { cb.checked = !!v; }).catch(function () {});
      cb.onchange = function () { PW_DESKTOP.autostart(cb.checked).catch(function () {}); };
    }
    document.querySelectorAll("[data-rh]").forEach(function (b) {
      b.onclick = function () {
        var L = LN();
        if (b.dataset.rh === "off") { sv(RKEY, { on: false, h: r.h, m: 0 }); if (L) { var ids = []; for (var i = 0; i < 7; i++) ids.push({ id: 7001 + i }); L.cancel({ notifications: ids }).catch(function () {}); } K.closeSheet(); H.toast(T({ uz: "Eslatma o'chirildi.", ru: "Напоминание выключено.", en: "Reminder off." })); return; }
        var h = +b.dataset.rh;
        if (!L) { H.toast(T({ uz: "Eslatmalar telefon ilovasida ishlaydi.", ru: "Напоминания работают в приложении на телефоне.", en: "Reminders work in the phone app." })); return; }
        L.requestPermissions().then(function (pm) {
          if (pm && pm.display === "denied") throw new Error(T({ uz: "Bildirishnomalarga ruxsat berilmagan (telefon sozlamalaridan yoqing).", ru: "Уведомления запрещены (включите в настройках).", en: "Notifications are blocked (enable them in settings)." }));
          sv(RKEY, { on: true, h: h, m: 0 }); remind(); K.closeSheet();
          H.toast("🔔 " + T({ uz: "Har kuni {h}:00 da eslataman.", ru: "Буду напоминать в {h}:00.", en: "I'll remind you at {h}:00." }, { h: h }) +
            (window.PW_DESKTOP ? " " + T({ uz: "Oynani yopsangiz ham ilova fonda qoladi.", ru: "Приложение останется в фоне после закрытия окна.", en: "The app stays in the background when you close the window." }) : ""));
        }).catch(function (e) { H.toast(e.message || String(e)); });
      };
    });
  }

  // ================= ULASH =================
  var prevOnView = H.onView;
  H.onView = function (v) { if (prevOnView) prevOnView(v); setTimeout(checkGoal, 60); };
  document.addEventListener("pw:activity", function () { setTimeout(checkGoal, 60); });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) { maintain(); remind(); } });
  maintain(); setTimeout(remind, 2000); setInterval(checkGoal, 60000);

  window.PWCoach = { label: label, record: record, weak: weak, card: card, week: week, reminderSheet: reminderSheet, remind: remind, maintain: maintain, hasLN: function () { return !!LN(); }, confetti: confetti, reminder: function () { return ld(RKEY, null); } };
  document.dispatchEvent(new CustomEvent("pw:activity"));  // bosh sahifa yangi kartalar bilan qayta chiziladi
})();
