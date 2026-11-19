/* Hanguk Way — Rolli vaziyatlar: Komiko bilan maqsadli suhbat (EPS ish joyi, kundalik hayot, TOPIK).
   Har bir vaziyatda 4 ta vazifa bor; AI qaysi biri bajarilganini belgilaydi, oxirida yulduzli hisobot beriladi. */
(function () {
  var H = window.HY, K = window.Komiko, I = window.I18N, ROLES = window.PW_ROLES || [];
  if (!H || !K || !ROLES.length) return;
  var esc = H.esc, $ = H.$;
  function T(o, v) { return I ? I.f(o, v) : o.uz; }
  function pick(o) { return I ? I.pick(o) : o.uz; }
  function gtxt(g) { var l = I ? I.lang() : "uz"; return l === "en" ? g.en2 : l === "ru" ? g.ru : g.uz; }
  function ld(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function sv(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var BKEY = "pwRoleBest", LV = ["A0", "A1", "A2", "B1", "B2"];
  var GROUPS = [["all", { uz: "Hammasi", ru: "Все", en: "All" }], ["eps", { uz: "🏭 Ish joyi", ru: "🏭 Работа", en: "🏭 Work" }],
    ["daily", { uz: "🏙️ Kundalik", ru: "🏙️ Быт", en: "🏙️ Daily life" }], ["topik", { uz: "🎓 TOPIK", ru: "🎓 TOPIK", en: "🎓 TOPIK" }]];
  var rp = { grp: "", sc: null, hist: [], done: [], scores: [], busy: false };
  function lvl() { var p = K.Profile.get(); return p ? (p.level | 0) : 1; }
  function stars(n) { return "★★★".slice(0, n) + "☆☆☆".slice(0, 3 - n); }

  // ---------- Ro'yxat ----------
  function list() {
    var v = $("v-role"); rp.sc = null;
    var p = K.Profile.get() || {}, best = ld(BKEY, {});
    if (!rp.grp) rp.grp = p.goal === "eps" ? "eps" : "all";
    var items = ROLES.filter(function (r) { return rp.grp === "all" || r.g === rp.grp; });
    var L = lvl();
    items.sort(function (a, b) { return Math.abs(a.lv - L) - Math.abs(b.lv - L); });
    v.innerHTML = '<div class="rl-top"><button class="linkbtn" data-go="home">‹ ' + esc(T({ uz: "Orqaga", ru: "Назад", en: "Back" })) + '</button></div>' +
      '<h2 style="margin:4px 0 2px">🎭 ' + esc(T({ uz: "Rolli vaziyatlar", ru: "Ролевые ситуации", en: "Role-play scenes" })) + '</h2>' +
      '<p class="note" style="margin:0 0 10px">' + esc(T({ uz: "Komiko rolga kiradi, siz vazifalarni bajarasiz: yozing yoki gapiring. Har bir gapingiz tuzatiladi.", ru: "Комико играет роль, вы выполняете задания — пишите или говорите. Каждую фразу поправят.", en: "Komiko plays a role, you complete the tasks — type or speak. Every line gets corrected." })) + '</p>' +
      '<div class="d-cats">' + GROUPS.map(function (g) { return '<button class="d-cat' + (rp.grp === g[0] ? " on" : "") + '" data-rg="' + g[0] + '">' + esc(pick(g[1])) + '</button>'; }).join("") + '</div>' +
      '<div class="rl">' + items.map(function (r) {
        var b = best[r.id] || 0, fit = Math.abs(r.lv - L) <= 1;
        return '<button class="rl-c" data-rid="' + r.id + '"><span class="rl-i">' + r.i + '</span><span class="rl-t"><b>' + esc(pick(r.t)) + '</b>' +
          '<small>' + r.goals.length + ' ' + esc(T({ uz: "vazifa", ru: "задания", en: "tasks" })) + ' · ' + LV[r.lv] + (fit ? ' · <em>' + esc(T({ uz: "darajangizga mos", ru: "ваш уровень", en: "your level" })) + '</em>' : '') + '</small></span>' +
          '<span class="rl-s' + (b ? " on" : "") + '">' + stars(b) + '</span></button>';
      }).join("") + '</div>';
    v.querySelectorAll("[data-rg]").forEach(function (b) { b.onclick = function () { rp.grp = b.dataset.rg; list(); }; });
    v.querySelectorAll("[data-rid]").forEach(function (b) { b.onclick = function () { start(b.dataset.rid); }; });
  }

  // ---------- Sahna ----------
  function aiBub(ko, uz) {
    var hide = lvl() >= 3;
    return '<div class="bub ai"><div class="ko">' + (window.PWDict ? PWDict.linkify(esc(ko)) : esc(ko)) + ' <button class="mini" data-say="' + esc(ko) + '">🔊</button></div>' +
      (uz ? (hide ? '<button class="rp-tr">🇺🇿 ' + esc(T({ uz: "Tarjima", ru: "Перевод", en: "Translation" })) + '</button><div class="tr" hidden>' + esc(uz) + '</div>' : '<div class="tr">' + esc(uz) + '</div>') : '') + '</div>';
  }
  function add(html) { var log = $("rpLog"); log.insertAdjacentHTML("beforeend", html); var l = log.lastElementChild; if (l && l.scrollIntoView) l.scrollIntoView({ block: "end", behavior: "smooth" }); }
  function goalsHTML() {
    return rp.sc.goals.map(function (g, i) { var ok = rp.done.indexOf(i) >= 0; return '<div class="rg' + (ok ? " ok" : "") + '"><i>' + (ok ? "✓" : i + 1) + '</i><span>' + esc(gtxt(g)) + '</span></div>'; }).join("");
  }
  function start(id) {
    var r = ROLES.filter(function (x) { return x.id === id; })[0]; if (!r) return;
    rp.sc = r; rp.hist = [{ role: "ai", ko: r.start[0] }]; rp.done = []; rp.scores = []; rp.busy = false;
    var v = $("v-role");
    v.innerHTML = '<div class="rp-h"><button class="linkbtn" id="rpBack">‹</button><span class="rp-hi">' + r.i + '</span><b>' + esc(pick(r.t)) + '</b><button class="btn ghost rp-end" id="rpEnd">' + esc(T({ uz: "Tugatish", ru: "Завершить", en: "Finish" })) + '</button></div>' +
      '<details class="rp-g" open><summary>🎯 ' + esc(T({ uz: "Vazifalar", ru: "Задания", en: "Tasks" })) + ' <span id="rpCnt">0/' + r.goals.length + '</span></summary><div id="rpGoals">' + goalsHTML() + '</div></details>' +
      '<div class="chat rp-log" id="rpLog"></div>' +
      '<div class="rp-in"><button class="rp-hint" id="rpHint" title="Hint">💡</button><input class="inp ko" id="rpText" placeholder="' + esc(T({ uz: "Koreyscha yozing…", ru: "Пишите по-корейски…", en: "Type in Korean…" })) + '" autocomplete="off">' +
      '<button class="dict-mic" id="rpMic">🎙️</button><button class="btn" id="rpSend">➤</button></div>';
    add(aiBub(r.start[0], r.start[1])); H.speak(r.start[0]);
    $("rpBack").onclick = function () { if (window.PWFeat) PWFeat.recCancel(); list(); };
    $("rpEnd").onclick = function () { finish(); };
    $("rpSend").onclick = function () { var t = $("rpText").value.trim(); if (!t) return; $("rpText").value = ""; turn(t, null); };
    $("rpText").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); $("rpSend").click(); } });
    $("rpHint").onclick = hint;
    if (window.PWFeat) PWFeat.bindMic($("rpMic"), null, "", function (a) {
      var b = $("rpMic"); PWFeat.setBusy(b, true); turn(null, a);
      var iv = setInterval(function () { if (!rp.busy) { clearInterval(iv); PWFeat.setBusy(b, false); } }, 300);
    });
    $("rpLog").addEventListener("click", function (e) { var b = e.target.closest(".rp-tr"); if (b) { b.nextElementSibling.hidden = false; b.remove(); } });
  }
  function form(mode) {
    var fd = new FormData();
    fd.append("scene", rp.sc.id); fd.append("mode", mode);
    fd.append("history", JSON.stringify(rp.hist.slice(-14))); fd.append("done", JSON.stringify(rp.done));
    fd.append("level", window.PWLevel ? PWLevel.chat() : "boshlang'ich");
    return fd;
  }
  function wait() { var id = "w" + Date.now(); add('<div class="bub ai" id="' + id + '"><span class="spin"></span></div>'); return function () { var w = document.getElementById(id); if (w) w.remove(); }; }
  function err(e) { add('<div class="err">⚠️ ' + esc(e.message || String(e)) + '</div>'); }
  function canServer() { return window.PWFeat ? PWFeat.needServer(null) : H.SERVER.ok; }
  function turn(text, audio) {
    if (rp.busy || !canServer()) return;
    rp.busy = true;
    var fd = form("turn"), sc = rp.sc;
    if (audio) fd.append("audio", audio.blob, "rec" + audio.ext); else { fd.append("text", text); add('<div class="bub me ko">' + esc(text) + '</div>'); }
    var unwait = wait();
    H.api("/api/roleplay", { body: fd }).then(function (r) {
      unwait(); if (rp.sc !== sc) return;
      if (audio) add('<div class="bub me ko">🎙️ ' + esc(r.user_text) + '</div>');
      if (r.help_uz) add('<div class="fix help ko">💡 ' + esc(r.help_uz) + '</div>');
      else {
        var s = r.scores || {}, fix = "", strip = function (x) { return String(x || "").replace(/[^가-힣]/g, ""); };
        if (r.corrected_ko && strip(r.corrected_ko) !== strip(r.user_text)) fix += '✅ <span class="ko">' + esc(r.corrected_ko) + '</span><br>';
        if (r.correction_uz) fix += esc(r.correction_uz) + '<br>';
        var nums = [s.grammar, s.vocabulary, s.pronunciation].filter(function (x) { return x != null; });
        if (nums.length) rp.scores.push(Math.round(nums.reduce(function (a, b) { return a + b; }, 0) / nums.length));
        if (!r.correction_uz && fix.indexOf("✅") < 0) fix = "👍 " + esc(T({ uz: "To'g'ri!", ru: "Верно!", en: "Correct!" }));
        add('<div class="fix">' + fix + '</div>');
        rp.hist.push({ role: "user", ko: r.corrected_ko || r.user_text });
      }
      (r.goals_done || []).forEach(function (g) {
        if (rp.done.indexOf(g) >= 0) return; rp.done.push(g);
        add('<div class="rg-pop">🎯 ' + esc(T({ uz: "Vazifa bajarildi", ru: "Задание выполнено", en: "Task done" })) + ': ' + esc(gtxt(sc.goals[g])) + '</div>');
        H.haptic && H.haptic("note", "success");
      });
      $("rpGoals").innerHTML = goalsHTML(); $("rpCnt").textContent = rp.done.length + "/" + sc.goals.length;
      if (r.reply_ko) { add(aiBub(r.reply_ko, r.reply_uz)); rp.hist.push({ role: "ai", ko: r.reply_ko }); H.speak(r.reply_ko); }
      if (rp.done.length >= sc.goals.length) setTimeout(function () { if (rp.sc === sc) finish(); }, 2500);
    }).catch(function (e) { unwait(); err(e); }).then(function () { rp.busy = false; });
  }
  function hint() {
    if (rp.busy || !canServer()) return;
    rp.busy = true; var unwait = wait(), sc = rp.sc;
    H.api("/api/roleplay", { body: form("hint") }).then(function (r) {
      unwait(); if (rp.sc !== sc) return;
      add('<div class="fix help"><b>💡 ' + esc(T({ uz: "Shunday deyishingiz mumkin", ru: "Можно сказать так", en: "You could say" })) + ':</b><br><span class="ko">' + esc(r.hint_ko) + '</span> <button class="mini" data-say="' + esc(r.hint_ko) + '">🔊</button><br><small>' + esc(r.hint_uz) + '</small></div>');
      $("rpText").value = r.hint_ko; $("rpText").focus();
    }).catch(function (e) { unwait(); err(e); }).then(function () { rp.busy = false; });
  }
  function finish() {
    if (!rp.sc) return;
    var sc = rp.sc, n = sc.goals.length, d = rp.done.length;
    if (rp.hist.length < 3) { list(); return; }
    if (rp.busy) return; rp.busy = true;
    var avg = rp.scores.length ? Math.round(rp.scores.reduce(function (a, b) { return a + b; }, 0) / rp.scores.length) : null;
    var st = d >= n ? (avg == null || avg >= 75 ? 3 : 2) : d >= Math.ceil(n / 2) ? 1 : 0;
    var best = ld(BKEY, {}); if (st > (best[sc.id] || 0)) { best[sc.id] = st; sv(BKEY, best); }
    document.dispatchEvent(new CustomEvent("pw:xp", { detail: { xp: 10 + d * 5, why: "role" } }));
    K.Activity.mark("speak");
    var v = $("v-role");
    v.innerHTML = '<div class="rp-rep"><div class="rp-big">' + sc.i + '</div><div class="rp-st">' + stars(st) + '</div><h2 style="margin:4px 0">' + esc(pick(sc.t)) + '</h2>' +
      '<p class="note">' + esc(T({ uz: "{d} / {n} vazifa bajarildi", ru: "Выполнено заданий: {d} из {n}", en: "{d} of {n} tasks done" }, { d: d, n: n })) + (avg != null ? ' · ' + esc(T({ uz: "o'rtacha baho {a}", ru: "средняя оценка {a}", en: "avg score {a}" }, { a: avg })) : '') + '</p>' +
      '<div class="card" id="rpSum"><div class="loading">' + K.avatar(24, "live talking") + ' ' + esc(T({ uz: "Komiko xulosa yozyapti…", ru: "Комико пишет итог…", en: "Komiko is writing a summary…" })) + '</div></div>' +
      '<div style="display:flex;gap:8px;margin-top:12px"><button class="btn" id="rpAgain" style="flex:1">🔁 ' + esc(T({ uz: "Qayta", ru: "Ещё раз", en: "Again" })) + '</button><button class="btn ghost" id="rpList" style="flex:1">🎭 ' + esc(T({ uz: "Boshqa vaziyat", ru: "Другая сцена", en: "Another scene" })) + '</button></div></div>';
    if (st === 3 && window.PWCoach && PWCoach.confetti) PWCoach.confetti();
    $("rpAgain").onclick = function () { start(sc.id); };
    $("rpList").onclick = function () { list(); };
    H.api("/api/roleplay", { body: form("finish") }).then(function (r) {
      var b = $("rpSum"); if (!b) return;
      b.innerHTML = '<p style="margin:0 0 10px">' + esc(r.summary_uz) + '</p>' + (r.phrases && r.phrases.length ? '<div class="d-sec">📌 ' + esc(T({ uz: "Eslab qoling", ru: "Запомните", en: "Remember" })) + '</div>' +
        r.phrases.map(function (p) { return '<div class="rp-ph"><span class="ko">' + esc(p.ko) + '</span> <button class="mini" data-say="' + esc(p.ko) + '">🔊</button><small>' + esc(p.uz) + '</small></div>'; }).join("") : '');
    }).catch(function (e) { var b = $("rpSum"); if (b) b.innerHTML = '<div class="note">⚠️ ' + esc(e.message || String(e)) + '</div>'; })
      .then(function () { rp.busy = false; rp.sc = null; });
  }

  var prevOnView = H.onView, prevLeave = H.onLeave;
  H.onView = function (v) { if (prevOnView) prevOnView(v); document.body.classList.toggle("view-role", v === "role"); if (v === "role" && !rp.sc) list(); };
  H.onLeave = function (v) { if (prevLeave) prevLeave(v); if (v === "role" && window.PWFeat) PWFeat.recCancel(); };
  window.PWRole = { open: function (id) { H.go("role"); if (id) start(id); }, list: list };
})();
