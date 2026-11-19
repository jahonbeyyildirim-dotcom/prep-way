/* Hanguk Way — XP va haftalik liga, nishonlar (yutuqlar), haftalik hisobot, imtihon kunigacha sanoq. */
(function () {
  var H = window.HY, K = window.Komiko, I = window.I18N;
  if (!H || !K) return;
  var esc = H.esc, $ = H.$;
  function T(o, v) { return I ? I.f(o, v) : o.uz; }
  function ld(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function sv(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function ymd(d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function dayAgo(i) { var t = new Date(); return ymd(new Date(t.getFullYear(), t.getMonth(), t.getDate() - i)); }
  function isoWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var dn = d.getUTCDay() || 7; d.setUTCDate(d.getUTCDate() + 4 - dn);
    var y0 = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return d.getUTCFullYear() + "-W" + ("0" + Math.ceil(((d - y0) / 864e5 + 1) / 7)).slice(-2);
  }
  var A = K.Activity, P = K.Profile;
  var LVN = ["A0", "A1", "A2", "B1", "B2"];

  // ======================= XP =======================
  var XKEY = "pwXP";
  function xs() {
    var x = ld(XKEY, null) || { total: 0, wk: "", wxp: 0, days: {}, pend: 0, rev: 0, best: 0, flags: {} };
    var w = isoWeek(new Date()); if (x.wk !== w) { x.wk = w; x.wxp = 0; }
    return x;
  }
  function addXP(n, why) {
    n = Math.round(n); if (!(n > 0)) return;
    var x = xs(), td = dayAgo(0);
    x.total += n; x.wxp += n; x.pend += n; x.days[td] = (x.days[td] || 0) + n;
    if (why === "review") x.rev = (x.rev || 0) + 1;
    var ks = Object.keys(x.days).sort(); while (ks.length > 60) delete x.days[ks.shift()];
    sv(XKEY, x);
    floatXP(n); queueSync(); setTimeout(checkBadges, 400);
  }
  function floatXP(n) {
    var e = document.createElement("div"); e.className = "xp-pop"; e.textContent = "+" + n + " XP";
    document.body.appendChild(e); setTimeout(function () { e.remove(); }, 1400);
  }
  function flag(k) { var x = xs(); if (!x.flags[k]) { x.flags[k] = dayAgo(0); sv(XKEY, x); } }

  // Server bilan sinxronlash (bir necha soniyada bir marta, xato bo'lsa keyinroq)
  var syncT = null, lgCache = null, lgAt = 0;
  function online() { return !(window.PW && PW.demo) && H.SERVER && H.SERVER.ok; }
  function queueSync() { clearTimeout(syncT); syncT = setTimeout(sync, 3000); }
  function sync() {
    var x = xs(), p = P.get() || {}; if (!x.pend || !online()) return Promise.resolve();
    var send = Math.min(x.pend, 300);
    return H.api("/api/xp", { json: { xp: send, name: p.name || "", lv: LVN[p.level | 0] || "" } }).then(function () {
      var y = xs(); y.pend = Math.max(0, y.pend - send); sv(XKEY, y); lgAt = 0;
      if (y.pend) queueSync();
    }).catch(function () {});
  }
  function league() {
    if (!online()) return Promise.resolve(null);
    if (lgCache && Date.now() - lgAt < 120000) return Promise.resolve(lgCache);
    return sync().then(function () { return H.api("/api/league"); }).then(function (r) { lgCache = r; lgAt = Date.now(); return r; }).catch(function () { return lgCache; });
  }

  // XP manbalari
  document.addEventListener("pw:xp", function (e) { addXP(e.detail.xp, e.detail.why); });
  document.addEventListener("pw:test", function (e) {
    var d = e.detail, mode = String(d.key).split(":")[1] || "quick", pct = d.n ? d.ok / d.n : 0;
    addXP(5 + d.ok * 2 + (mode === "exam" || mode === "full" ? 20 : 0), "test");
    if (mode === "exam" || mode === "full") flag("fullExam");
    if (pct >= 0.9 && d.n >= 10) flag("ninety");
  });
  var prevPush = H.pushHist;
  H.pushHist = function (kind, item) {
    prevPush(kind, item);
    if (kind === "speak") { addXP(5 + (item.overall >= 85 ? 5 : 0), "speak"); if (item.overall >= 85) flag("pron85"); }
    if (kind === "tests" && /yozish|письмо|writing/.test(item.exam || "")) { addXP(10, "write"); flag("write"); }
  };
  var prevMark = A.mark;
  A.mark = function (kind) {
    var first = (A.day().done || []).indexOf(kind) < 0;
    prevMark(kind);
    if (first && kind !== "test" && kind !== "speak") addXP(5, kind);
  };

  // ======================= NISHONLAR =======================
  function ctx() {
    var x = xs(), hist = H.hist(), s = A.streak();
    if (s > (x.best || 0)) { x.best = s; sv(XKEY, x); }
    return { x: x, tests: (hist.tests || []).length, best: x.best || s, saved: ld("pwDictSaved", []).length, rev: x.rev || 0, f: x.flags || {} };
  }
  var BADGES = [
    { id: "first", i: "🎯", t: { uz: "Birinchi qadam", ru: "Первый шаг", en: "First step" }, d: { uz: "Birinchi testni topshiring", ru: "Пройдите первый тест", en: "Take your first test" }, ok: function (c) { return c.tests >= 1; } },
    { id: "s3", i: "🔥", t: { uz: "3 kun ketma-ket", ru: "3 дня подряд", en: "3-day streak" }, d: { uz: "3 kunlik seriya", ru: "Серия 3 дня", en: "Reach a 3-day streak" }, ok: function (c) { return c.best >= 3; } },
    { id: "s7", i: "🔥", t: { uz: "Bir hafta", ru: "Неделя", en: "One week" }, d: { uz: "7 kunlik seriya", ru: "Серия 7 дней", en: "Reach a 7-day streak" }, ok: function (c) { return c.best >= 7; } },
    { id: "s30", i: "🌋", t: { uz: "Bir oy", ru: "Месяц", en: "One month" }, d: { uz: "30 kunlik seriya", ru: "Серия 30 дней", en: "Reach a 30-day streak" }, ok: function (c) { return c.best >= 30; } },
    { id: "t10", i: "📋", t: { uz: "Mashqchi", ru: "Практик", en: "Practiser" }, d: { uz: "10 ta test", ru: "10 тестов", en: "Take 10 tests" }, ok: function (c) { return c.tests >= 10; } },
    { id: "full", i: "📝", t: { uz: "Imtihon sinovi", ru: "Пробный экзамен", en: "Mock exam" }, d: { uz: "To'liq imtihonni topshiring", ru: "Пройдите полный экзамен", en: "Finish a full exam" }, ok: function (c) { return !!c.f.fullExam; } },
    { id: "ninety", i: "🏆", t: { uz: "A'lochi", ru: "Отличник", en: "Top scorer" }, d: { uz: "10+ savollik testda 90%+", ru: "90%+ в тесте из 10+ вопросов", en: "90%+ on a 10+ question test" }, ok: function (c) { return !!c.f.ninety; } },
    { id: "w50", i: "📚", t: { uz: "So'z yig'uvchi", ru: "Собиратель слов", en: "Word collector" }, d: { uz: "50 ta so'z saqlang", ru: "Сохраните 50 слов", en: "Save 50 words" }, ok: function (c) { return c.saved >= 50; } },
    { id: "r100", i: "🧠", t: { uz: "Xotira ustasi", ru: "Мастер памяти", en: "Memory master" }, d: { uz: "100 marta so'z takrorlang", ru: "100 повторений слов", en: "100 word reviews" }, ok: function (c) { return c.rev >= 100; } },
    { id: "pron", i: "🎙️", t: { uz: "Toza talaffuz", ru: "Чистое произношение", en: "Clear speaker" }, d: { uz: "Talaffuzda 85+ ball", ru: "85+ за произношение", en: "Score 85+ in pronunciation" }, ok: function (c) { return !!c.f.pron85; } },
    { id: "write", i: "✍️", t: { uz: "Yozuvchi", ru: "Писатель", en: "Writer" }, d: { uz: "TOPIK II yozish javobini baholating", ru: "Оцените ответ по письму TOPIK II", en: "Get a TOPIK II writing graded" }, ok: function (c) { return !!c.f.write; } },
    { id: "xp1k", i: "⚡", t: { uz: "1000 XP", ru: "1000 XP", en: "1000 XP" }, d: { uz: "Jami 1000 XP to'plang", ru: "Наберите 1000 XP", en: "Earn 1000 XP in total" }, ok: function (c) { return c.x.total >= 1000; } },
    { id: "podium", i: "🥇", t: { uz: "Liga sovrindori", ru: "Призёр лиги", en: "League podium" }, d: { uz: "Haftani ligada top-3 da yakunlang", ru: "Закончите неделю в топ-3 лиги", en: "Finish a week in the league top 3" }, ok: function (c) { return !!c.f.podium; } }
  ];
  var BKEY = "pwBadges";
  function checkBadges() {
    var got = ld(BKEY, {}), c = ctx(), fresh = [];
    BADGES.forEach(function (b) { if (!got[b.id] && b.ok(c)) { got[b.id] = dayAgo(0); fresh.push(b); } });
    if (!fresh.length) return;
    sv(BKEY, got);
    var b = fresh[0];
    setTimeout(function () {
      if (window.PWCoach && PWCoach.confetti) PWCoach.confetti();
      H.toast("🏅 " + T({ uz: "Yangi nishon: {i} {t}", ru: "Новый значок: {i} {t}", en: "New badge: {i} {t}" }, { i: b.i, t: T(b.t) }));
    }, 600);
  }
  function badgesSheet() {
    var got = ld(BKEY, {}), n = Object.keys(got).length;
    K.sheet('<h3 style="margin:0 0 4px">🏅 ' + esc(T({ uz: "Yutuqlar", ru: "Достижения", en: "Achievements" })) + ' <span class="note">' + n + ' / ' + BADGES.length + '</span></h3>' +
      '<div class="bdg">' + BADGES.map(function (b) {
        var on = !!got[b.id];
        return '<div class="bd' + (on ? " on" : "") + '"><span>' + (on ? b.i : "🔒") + '</span><b>' + esc(T(b.t)) + '</b><small>' + esc(T(b.d)) + '</small></div>';
      }).join("") + '</div>');
  }

  // ======================= LIGA =======================
  function daysLeft(iso) { var ms = new Date(iso) - new Date(); return Math.max(0, Math.ceil(ms / 864e5)); }
  function rowsHTML(rows, lim) {
    return rows.slice(0, lim).map(function (r) {
      var md = r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : r.rank === 3 ? "🥉" : r.rank;
      return '<div class="lg-r' + (r.me ? " me" : "") + '"><span class="lg-k">' + md + '</span><span class="lg-n">' + esc(r.name) + (r.me ? ' <small>(' + esc(T({ uz: "siz", ru: "вы", en: "you" })) + ')</small>' : '') + (r.lv ? ' <i class="lg-lv">' + esc(r.lv) + '</i>' : '') + '</span><b>' + r.xp + ' XP</b></div>';
    }).join("");
  }
  function fillCard() {
    var box = $("lgBox"); if (!box) return;
    league().then(function (r) {
      box = $("lgBox"); if (!box) return;
      var x = xs();
      if (!r) { box.innerHTML = '<p class="note">' + esc(T({ uz: "Bu hafta: {x} XP. Liga reytingi internet orqali ko'rinadi.", ru: "На этой неделе: {x} XP. Рейтинг лиги виден онлайн.", en: "This week: {x} XP. The league table shows when online." }, { x: x.wxp })) + '</p>'; return; }
      if (r.prev && r.prev.rank <= 3 && r.prev.of >= 3) { var y = xs(); y.flags.podium = y.flags.podium || dayAgo(0); sv(XKEY, y); checkBadges(); }
      box.innerHTML = '<div class="lg-me"><div><b>' + (r.me ? r.me + T({ uz: "-o'rin", ru: " место", en: " place" }) : "—") + '</b><small>' + esc(T({ uz: "{n} ishtirokchi", ru: "участников: {n}", en: "{n} learners" }, { n: r.total })) + '</small></div>' +
        '<div><b>' + (r.my_xp || x.wxp) + ' XP</b><small>' + esc(T({ uz: "bu hafta", ru: "за неделю", en: "this week" })) + '</small></div>' +
        '<div><b>' + daysLeft(r.ends) + '</b><small>' + esc(T({ uz: "kun qoldi", ru: "дн. осталось", en: "days left" })) + '</small></div></div>' +
        (r.rows.length ? '<div class="lg-l">' + rowsHTML(r.rows, 3) + '</div>' : '<p class="note">' + esc(T({ uz: "Bu hafta hali hech kim XP to'plamadi — birinchi bo'ling!", ru: "На этой неделе ещё никто не набрал XP — будьте первым!", en: "No one has XP yet this week — be first!" })) + '</p>');
    });
  }
  function leagueSheet() {
    K.sheet('<h3 style="margin:0 0 8px">🏆 ' + esc(T({ uz: "Haftalik liga", ru: "Недельная лига", en: "Weekly league" })) + '</h3><div id="lgFull"><div class="loading">…</div></div>' +
      '<p class="note" style="margin-top:10px">' + esc(T({ uz: "XP: test (har to'g'ri javob +2, to'liq imtihon +20), so'z takrorlash, talaffuz, yozish, kunlik maqsad (+20). Reyting har dushanba yangilanadi.", ru: "XP: тесты (+2 за верный ответ, полный экзамен +20), повторение слов, произношение, письмо, дневная цель (+20). Рейтинг обновляется по понедельникам.", en: "XP: tests (+2 per correct answer, full exam +20), word reviews, pronunciation, writing, daily goal (+20). Resets every Monday." })) + '</p>');
    lgAt = 0;
    league().then(function (r) {
      var b = $("lgFull"); if (!b) return;
      if (!r) { b.innerHTML = '<p class="note">' + esc(T({ uz: "Internetga ulaning.", ru: "Подключитесь к интернету.", en: "Connect to the internet." })) + '</p>'; return; }
      b.innerHTML = (r.prev ? '<div class="note" style="margin-bottom:8px">' + esc(T({ uz: "O'tgan hafta: {r}-o'rin, {x} XP", ru: "Прошлая неделя: {r} место, {x} XP", en: "Last week: #{r}, {x} XP" }, { r: r.prev.rank, x: r.prev.xp })) + '</div>' : '') +
        '<div class="lg-l">' + (r.rows.length ? rowsHTML(r.rows, 31) : '<p class="note">—</p>') + '</div>';
    });
  }

  // ======================= HAFTALIK HISOBOT =======================
  function sumRange(a, b) {  // a..b kun oldin (a > b)
    var act = A.all(), x = xs(), hist = H.hist(), r = { mins: 0, days: 0, xp: 0, tests: 0, pct: 0 }, set = {};
    for (var i = a; i >= b; i--) { var k = dayAgo(i), d = act[k]; set[k] = 1; if (d) { r.mins += Math.floor(d.secs / 60); if ((d.done && d.done.length) || d.secs >= 60) r.days++; } r.xp += x.days[k] || 0; }
    var ts = (hist.tests || []).filter(function (t) { return set[t.date]; });
    r.tests = ts.length; r.pct = ts.length ? Math.round(ts.reduce(function (s, t) { return s + (t.pct || 0); }, 0) / ts.length) : null;
    return r;
  }
  function trend(a, b, unit) {
    if (b == null || a == null) return '';
    var d = a - b; return d === 0 ? '<i class="rp-eq">=</i>' : '<i class="' + (d > 0 ? "rp-up" : "rp-dn") + '">' + (d > 0 ? "▲ +" : "▼ ") + d + (unit || "") + '</i>';
  }
  function reportSheet() {
    var w = sumRange(6, 0), pw = sumRange(13, 7), p = P.get() || {};
    var weak = window.PWCoach ? PWCoach.weak(p.goal === "topik" ? ((p.level | 0) >= 3 ? "topik2" : "topik") : "eps") : [];
    var tip = !w.days ? T({ uz: "Bu hafta mashq bo'lmadi. Kichikdan boshlang: har kuni 5 daqiqa — seriya o'zi yuradi.", ru: "На этой неделе не было занятий. Начните с малого: 5 минут в день.", en: "No practice this week. Start small: 5 minutes a day." }) :
      w.days >= 6 ? T({ uz: "Ajoyib intizom! Endi to'liq imtihon formatida mashq qilish vaqti.", ru: "Отличная дисциплина! Пора тренироваться в формате полного экзамена.", en: "Great discipline! Time to practise in full-exam format." }) :
      T({ uz: "Yaxshi! Keyingi hafta kamida 5 kun mashq qilishga harakat qiling.", ru: "Хорошо! На следующей неделе постарайтесь заниматься 5+ дней.", en: "Good! Aim for 5+ practice days next week." });
    var cell = function (ico, val, lbl, tr) { return '<div class="rp-c"><span>' + ico + '</span><b>' + val + '</b><small>' + esc(lbl) + '</small>' + (tr || '') + '</div>'; };
    K.sheet('<h3 style="margin:0 0 4px">📊 ' + esc(T({ uz: "Haftalik hisobot", ru: "Недельный отчёт", en: "Weekly report" })) + '</h3><p class="note" style="margin:0 0 10px">' + esc(dayAgo(6) + " — " + dayAgo(0)) + '</p>' +
      '<div class="rp">' +
        cell("📅", w.days + "/7", T({ uz: "faol kun", ru: "активных дней", en: "active days" }), trend(w.days, pw.days)) +
        cell("⏱", w.mins, T({ uz: "daqiqa", ru: "минут", en: "minutes" }), trend(w.mins, pw.mins)) +
        cell("⚡", w.xp, "XP", trend(w.xp, pw.xp)) +
        cell("📝", w.tests, T({ uz: "test", ru: "тестов", en: "tests" }), trend(w.tests, pw.tests)) +
        cell("🎯", w.pct == null ? "—" : w.pct + "%", T({ uz: "o'rtacha natija", ru: "средний результат", en: "avg score" }), trend(w.pct, pw.pct, "%")) +
        cell("🔥", A.streak(), T({ uz: "kun seriya", ru: "дней подряд", en: "day streak" })) +
      '</div>' +
      (weak.length ? '<div class="rp-w">🎯 ' + esc(T({ uz: "Eng zaif tur", ru: "Самый слабый тип", en: "Weakest type" })) + ': <b>' + Math.round(weak[0].a * 100) + '%</b> · ' + esc((function (L) { return typeof L === "string" ? L : L.sec + (L.range ? " " + L.range : "") + " — " + L.txt; })(PWCoach.label(weak[0].t))) + '</div>' : '') +
      '<div class="why-tip" style="margin-top:10px">💡 ' + esc(tip) + '</div>');
    var r = ld("pwReportSeen", {}); r[isoWeek(new Date())] = 1; sv("pwReportSeen", r);
  }
  function autoReport() {  // yangi haftaning birinchi ochilishida, o'tgan haftada faollik bo'lgan bo'lsa
    var p = P.get(); if (!p || !p.created) return;
    var wk = isoWeek(new Date()), seen = ld("pwReportSeen", {});
    if (seen[wk] || new Date().getDay() !== 1) return;
    if (sumRange(7, 1).days === 0) return;
    setTimeout(function () { if (H.curView() === "home" && !document.getElementById("kSheet")) reportSheet(); }, 2500);
  }

  // ======================= IMTIHON SANASI =======================
  var EKEY = "pwExamDate";
  function examLeft() { var d = ld(EKEY, ""); if (!d) return null; var t = new Date(); t.setHours(0, 0, 0, 0); return Math.round((new Date(d + "T00:00:00") - t) / 864e5); }
  function examTip(n) {
    return n > 60 ? T({ uz: "Shoshilmang: har kuni maqsad daqiqangiz va haftasiga 1 ta tezkor test.", ru: "Без спешки: дневная цель и 1 быстрый тест в неделю.", en: "No rush: your daily goal plus one quick test a week." }) :
      n > 30 ? T({ uz: "Haftasiga 1 ta to'liq imtihon va zaif joylar mashqi.", ru: "1 полный экзамен в неделю и тренировка слабых мест.", en: "One full exam a week plus weak-spot practice." }) :
      n > 7 ? T({ uz: "Haftasiga 2 ta to'liq imtihon, kuniga 20+ daqiqa. Xatolar daftarini har kuni ko'ring.", ru: "2 полных экзамена в неделю, 20+ минут в день. Каждый день — тетрадь ошибок.", en: "Two full exams a week, 20+ min a day. Review mistakes daily." }) :
      n > 0 ? T({ uz: "Yangi mavzu emas — takrorlash: kuniga 1 to'liq imtihon va xatolar daftari. Yaxshi uxlang!", ru: "Не новое — повторение: 1 полный экзамен в день и тетрадь ошибок. Высыпайтесь!", en: "Review, not new topics: one full exam a day and your mistakes. Sleep well!" }) :
      T({ uz: "Bugun imtihon! Omad, 화이팅! 💪", ru: "Сегодня экзамен! Удачи, 화이팅! 💪", en: "Exam day! Good luck, 화이팅! 💪" });
  }
  function examCard(p) {
    var n = examLeft(); if (n == null || n < 0) return "";
    var ex = p.goal === "topik" ? ((p.level | 0) >= 3 ? "TOPIK II" : "TOPIK I") : "EPS-TOPIK";
    return '<button class="ex-cd" id="exCd"><div class="ex-n"><b>' + (n ? "D-" + n : "D-DAY") + '</b><small>' + esc(ex) + '</small></div><div class="ex-t">' + esc(examTip(n)) + '</div></button>';
  }
  function examSheet() {
    var cur = ld(EKEY, ""), min = dayAgo(0);
    K.sheet('<h3 style="margin:0 0 8px">📅 ' + esc(T({ uz: "Imtihon sanasi", ru: "Дата экзамена", en: "Exam date" })) + '</h3>' +
      '<p class="note">' + esc(T({ uz: "Sanani kiriting — bosh sahifada qolgan kunlar va shunga mos tavsiya chiqadi.", ru: "Укажите дату — на главной появятся оставшиеся дни и совет.", en: "Set the date — the home screen will count down and adapt its advice." })) + '</p>' +
      '<input type="date" class="inp" id="exDate" min="' + min + '" value="' + esc(cur) + '" style="width:100%;margin:8px 0 12px">' +
      '<div style="display:flex;gap:8px"><button class="btn" id="exSave" style="flex:1">' + esc(T({ uz: "Saqlash", ru: "Сохранить", en: "Save" })) + '</button>' +
      (cur ? '<button class="btn ghost" id="exDel">' + esc(T({ uz: "O'chirish", ru: "Удалить", en: "Remove" })) + '</button>' : '') + '</div>');
    $("exSave").onclick = function () {
      var v = $("exDate").value; if (!v) return;
      sv(EKEY, v); K.closeSheet(); document.dispatchEvent(new CustomEvent("pw:activity"));
      H.toast("📅 " + T({ uz: "Imtihongacha {n} kun.", ru: "До экзамена {n} дн.", en: "{n} days to the exam." }, { n: examLeft() }));
    };
    if ($("exDel")) $("exDel").onclick = function () { localStorage.removeItem(EKEY); K.closeSheet(); document.dispatchEvent(new CustomEvent("pw:activity")); };
  }

  // ======================= BOSH SAHIFA KARTASI =======================
  function card(p) {
    if (!p || !p.created) return "";
    var got = Object.keys(ld(BKEY, {})).length;
    setTimeout(fillCard, 0);
    return '<div class="lg"><div class="cc-h"><b>🏆 ' + esc(T({ uz: "Haftalik liga", ru: "Недельная лига", en: "Weekly league" })) + '</b><button class="linkbtn" id="lgAll">' + esc(T({ uz: "Hammasi", ru: "Все", en: "All" })) + ' ›</button></div>' +
      '<div id="lgBox"><div class="note">…</div></div>' +
      '<div class="lg-b"><button class="lg-btn" id="lgBadges">🏅 ' + esc(T({ uz: "Yutuqlar", ru: "Достижения", en: "Badges" })) + ' <b>' + got + '/' + BADGES.length + '</b></button>' +
      '<button class="lg-btn" id="lgReport">📊 ' + esc(T({ uz: "Haftalik hisobot", ru: "Отчёт недели", en: "Weekly report" })) + '</button>' +
      (examLeft() == null ? '<button class="lg-btn" id="lgExam">📅 ' + esc(T({ uz: "Imtihon sanasi", ru: "Дата экзамена", en: "Exam date" })) + '</button>' : '') + '</div></div>';
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("#lgAll,#lgBadges,#lgReport,#lgExam,#exCd"); if (!t) return;
    ({ lgAll: leagueSheet, lgBadges: badgesSheet, lgReport: reportSheet, lgExam: examSheet, exCd: examSheet })[t.id]();
  });

  window.PWLeague = { card: card, examCard: examCard, examSheet: examSheet, addXP: addXP, badgesSheet: badgesSheet, reportSheet: reportSheet, leagueSheet: leagueSheet, xp: xs, sync: sync };
  checkBadges(); autoReport(); setTimeout(sync, 4000);
  document.dispatchEvent(new CustomEvent("pw:activity"));
})();
