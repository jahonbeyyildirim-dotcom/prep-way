/* Hanguk Way — guruhlar va o'qituvchi paneli.
   O'qituvchi guruh yaratadi va kodni ulashadi; o'quvchilar kod bilan qo'shiladi. Qo'shilgan o'quvchi ilovasi
   qisqa statistikani (testlar, o'rtacha natija, seriya, daqiqalar, eng zaif tur) serverga yuboradi — o'qituvchi jadvalda ko'radi. */
(function () {
  var H = window.HY, K = window.Komiko, I = window.I18N;
  if (!H || !K) return;
  var esc = H.esc, $ = H.$;
  function T(o, v) { return I ? I.f(o, v) : o.uz; }
  function ld(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function sv(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function ymd(d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function dayAgo(i) { var t = new Date(); return ymd(new Date(t.getFullYear(), t.getMonth(), t.getDate() - i)); }
  var BASE = (H.CONFIG && H.CONFIG.API_BASE) || location.origin; if (!/^https?:/.test(BASE)) BASE = "https://prepway-api.onrender.com";
  var GKEY = "pwGroups", LVN = ["A0", "A1", "A2", "B1", "B2"];
  function online() { return !(window.PW && PW.demo) && H.SERVER && H.SERVER.ok; }
  function needOnline(box) {
    if (online()) return true;
    var m = T({ uz: "Guruhlar internet va hisob orqali ishlaydi (telefon ilovasi yoki Telegram).", ru: "Группы работают онлайн через аккаунт (приложение или Telegram).", en: "Groups need the internet and an account (phone app or Telegram)." });
    if (box) box.innerHTML = '<div class="card empty">' + esc(m) + '</div>'; else H.toast(m);
    return false;
  }

  // ---------- O'quvchi statistikasi (faqat guruhga qo'shilgan bo'lsa yuboriladi) ----------
  function snapshot() {
    var p = K.Profile.get() || {}, hist = H.hist(), set = {}, act = K.Activity.all(), mins = 0, last = "";
    for (var i = 0; i < 7; i++) { var k = dayAgo(i); set[k] = 1; if (act[k]) mins += Math.floor(act[k].secs / 60); }
    Object.keys(act).sort().forEach(function (k) { var x = act[k]; if ((x.done && x.done.length) || x.secs >= 60) last = k; });
    var ts = (hist.tests || []).filter(function (t) { return set[t.date]; });
    var exam = p.goal === "topik" ? ((p.level | 0) >= 3 ? "topik2" : "topik") : "eps", weak = "";
    if (window.PWCoach) { var w = PWCoach.weak(exam)[0]; if (w && w.a < 0.8) { var L = PWCoach.label(w.t); weak = (typeof L === "string" ? L : L.sec + " " + L.range) + " · " + Math.round(w.a * 100) + "%"; } }
    return { tests7: ts.length, avg7: ts.length ? Math.round(ts.reduce(function (a, t) { return a + (t.pct || 0); }, 0) / ts.length) : 0,
      streak: K.Activity.streak(), mins7: mins, xp: window.PWLeague ? PWLeague.xp().total : 0, words: ld("pwDictSaved", []).length,
      role: Object.keys(ld("pwRoleBest", {})).length, stories: Object.keys(ld("pwStories", {})).length,
      level: LVN[p.level | 0] || "", weak: weak, exam: exam, last: last };
  }
  var tSync = null;
  function syncStats() {
    clearTimeout(tSync);
    tSync = setTimeout(function () {
      var g = ld(GKEY, null); if (!g || !g.joined || !g.joined.length || !online()) return;
      H.api("/api/group/stats", { json: snapshot() }).catch(function () {});
    }, 2500);
  }
  function refreshGroups() {
    if (!online()) return Promise.resolve(ld(GKEY, { owned: [], joined: [] }));
    return H.api("/api/groups").then(function (r) { sv(GKEY, r); return r; }).catch(function () { return ld(GKEY, { owned: [], joined: [] }); });
  }
  document.addEventListener("pw:test", syncStats);
  document.addEventListener("pw:xp", syncStats);
  setTimeout(syncStats, 5000);

  // ---------- Ko'rinish ----------
  function view() {
    var v = $("v-teacher"); if (!v) return;
    v.innerHTML = '<div class="rl-top"><button class="linkbtn" data-go="home">‹ ' + esc(T({ uz: "Orqaga", ru: "Назад", en: "Back" })) + '</button></div>' +
      '<h2 style="margin:4px 0 2px">👩‍🏫 ' + esc(T({ uz: "Guruhlar", ru: "Группы", en: "Groups" })) + '</h2>' +
      '<p class="note" style="margin:0 0 12px">' + esc(T({ uz: "O'qituvchi guruh ochadi va kodni beradi. O'quvchilar kod bilan qo'shiladi — o'qituvchi ularning natijalarini bitta jadvalda ko'radi.", ru: "Учитель создаёт группу и даёт код. Ученики вступают по коду — учитель видит их результаты в одной таблице.", en: "A teacher creates a group and shares the code. Students join with it, and the teacher sees everyone's progress in one table." })) + '</p>' +
      '<div id="tcBody"><div class="loading"><span class="spin"></span></div></div>';
    if (!needOnline($("tcBody"))) return;
    refreshGroups().then(render);
  }
  function render(g) {
    var b = $("tcBody"); if (!b) return;
    b.innerHTML =
      '<div class="card tc-sec"><b>🎒 ' + esc(T({ uz: "O'quvchi sifatida", ru: "Как ученик", en: "As a student" })) + '</b>' +
        (g.joined.length ? '<div class="tc-list">' + g.joined.map(function (x) { return '<div class="tc-it"><span>' + esc(x.name) + ' <small class="note">' + esc(x.code) + '</small></span><button class="linkbtn" data-leave="' + esc(x.code) + '">' + esc(T({ uz: "Chiqish", ru: "Выйти", en: "Leave" })) + '</button></div>'; }).join("") + '</div>' : '') +
        '<div class="tc-row"><input class="inp" id="tcCode" maxlength="6" placeholder="' + esc(T({ uz: "Guruh kodi, masalan PN9XRM", ru: "Код группы, напр. PN9XRM", en: "Group code, e.g. PN9XRM" })) + '" style="text-transform:uppercase"><button class="btn" id="tcJoin">' + esc(T({ uz: "Qo'shilish", ru: "Вступить", en: "Join" })) + '</button></div>' +
        '<p class="note tc-priv">🔒 ' + esc(T({ uz: "Qo'shilsangiz, o'qituvchi ismingiz, testlar soni, o'rtacha natija, seriya, XP va eng zaif savol turingizni ko'radi. Istalgan vaqtda chiqishingiz mumkin.", ru: "Вступив, вы показываете учителю имя, число тестов, средний результат, серию, XP и самый слабый тип вопросов. Выйти можно в любой момент.", en: "When you join, the teacher sees your name, test count, average score, streak, XP and weakest question type. You can leave any time." })) + '</p></div>' +
      '<div class="card tc-sec"><b>👩‍🏫 ' + esc(T({ uz: "O'qituvchi sifatida", ru: "Как учитель", en: "As a teacher" })) + '</b>' +
        (g.owned.length ? '<div class="tc-list">' + g.owned.map(function (x) { return '<button class="tc-it tc-open" data-open="' + esc(x.code) + '"><span><b>' + esc(x.name) + '</b> <small class="note">' + esc(x.code) + ' · ' + x.count + ' ' + esc(T({ uz: "o'quvchi", ru: "учен.", en: "students" })) + '</small></span><span>›</span></button>'; }).join("") + '</div>' : '') +
        '<div class="tc-row"><input class="inp" id="tcName" maxlength="40" placeholder="' + esc(T({ uz: "Guruh nomi, masalan 2517-guruh", ru: "Название, напр. группа 2517", en: "Group name, e.g. Class 2517" })) + '"><button class="btn" id="tcNew">+ ' + esc(T({ uz: "Yaratish", ru: "Создать", en: "Create" })) + '</button></div></div>';
    $("tcJoin").onclick = function () { join($("tcCode").value); };
    $("tcNew").onclick = function () {
      var n = $("tcName").value.trim(); if (!n) { $("tcName").focus(); return; }
      H.api("/api/group/create", { json: { name: n } }).then(function (r) { H.toast("✅ " + T({ uz: "Guruh yaratildi: {c}", ru: "Группа создана: {c}", en: "Group created: {c}" }, { c: r.code })); return refreshGroups(); })
        .then(function () { view(); }).catch(function (e) { H.toast(e.message); });
    };
    b.querySelectorAll("[data-leave]").forEach(function (x) {
      x.onclick = function () { H.api("/api/group/leave", { json: { code: x.dataset.leave } }).then(refreshGroups).then(render).catch(function (e) { H.toast(e.message); }); };
    });
    b.querySelectorAll("[data-open]").forEach(function (x) { x.onclick = function () { dash(x.dataset.open); }; });
  }
  function join(code) {
    code = String(code || "").trim().toUpperCase(); if (code.length < 4) return;
    if (!needOnline(null)) return;
    var p = K.Profile.get() || {};
    return H.api("/api/group/join", { json: { code: code, name: p.name || "" } }).then(function (r) {
      H.toast("🎒 " + T({ uz: "«{n}» guruhiga qo'shildingiz.", ru: "Вы вступили в «{n}».", en: "You joined “{n}”." }, { n: r.name }));
      return refreshGroups().then(function (g) { syncStats(); if (H.curView() === "teacher") render(g); });
    }).catch(function (e) { H.toast(e.message); });
  }
  function ago(d) {
    if (!d) return "—"; var n = Math.round((new Date(dayAgo(0)) - new Date(d)) / 864e5);
    return n <= 0 ? T({ uz: "bugun", ru: "сегодня", en: "today" }) : n === 1 ? T({ uz: "kecha", ru: "вчера", en: "yesterday" }) : T({ uz: "{n} kun oldin", ru: "{n} дн. назад", en: "{n} days ago" }, { n: n });
  }
  function dash(code) {
    var b = $("tcBody"); b.innerHTML = '<div class="loading"><span class="spin"></span></div>';
    H.api("/api/group/" + encodeURIComponent(code)).then(function (r) {
      var rows = r.rows || [], act = rows.filter(function (x) { return x.last && (new Date(dayAgo(0)) - new Date(x.last)) / 864e5 <= 6; }).length;
      var scored = rows.filter(function (x) { return x.tests7; }), avg = scored.length ? Math.round(scored.reduce(function (a, x) { return a + x.avg7; }, 0) / scored.length) : null;
      var link = BASE + "/?g=" + r.code;
      b.innerHTML = '<button class="linkbtn" id="tcBack">‹ ' + esc(T({ uz: "Guruhlar", ru: "Группы", en: "Groups" })) + '</button>' +
        '<div class="tc-head"><div><h3 style="margin:4px 0 0">' + esc(r.name) + '</h3><div class="note">' + esc(T({ uz: "Kod", ru: "Код", en: "Code" })) + ': <b class="tc-code">' + esc(r.code) + '</b></div></div>' +
        '<button class="btn" id="tcShare">📤 ' + esc(T({ uz: "Taklif qilish", ru: "Пригласить", en: "Invite" })) + '</button></div>' +
        '<div class="rp" style="margin:10px 0">' +
          '<div class="rp-c"><span>👥</span><b>' + rows.length + '</b><small>' + esc(T({ uz: "o'quvchi", ru: "учеников", en: "students" })) + '</small></div>' +
          '<div class="rp-c"><span>🔥</span><b>' + act + '</b><small>' + esc(T({ uz: "shu hafta faol", ru: "активны за неделю", en: "active this week" })) + '</small></div>' +
          '<div class="rp-c"><span>🎯</span><b>' + (avg == null ? "—" : avg + "%") + '</b><small>' + esc(T({ uz: "o'rtacha natija", ru: "средний результат", en: "avg score" })) + '</small></div></div>' +
        licBox(r) +
        (rows.length ? '<div class="tc-tbl">' + rows.map(function (x, i) {
          var cold = !x.last || (new Date(dayAgo(0)) - new Date(x.last)) / 864e5 > 6;
          return '<div class="tc-st' + (cold ? " cold" : "") + '"><div class="tc-st-h"><b>' + (i + 1) + '. ' + esc(x.name) + '</b>' + (x.level ? '<i class="lg-lv">' + esc(x.level) + '</i>' : '') + (x.seat ? '<i class="tc-prem" title="Premium">💎</i>' : '') + '<span class="tc-xp">' + (x.wxp || 0) + ' XP</span></div>' +
            '<div class="tc-st-g"><span>📝 ' + (x.tests7 || 0) + ' ' + esc(T({ uz: "test", ru: "тест.", en: "tests" })) + '</span><span>🎯 ' + (x.tests7 ? x.avg7 + "%" : "—") + '</span><span>🔥 ' + (x.streak || 0) + '</span><span>⏱ ' + (x.mins7 || 0) + ' ' + esc(T({ uz: "daq", ru: "мин", en: "min" })) + '</span></div>' +
            '<div class="note">' + (x.weak ? '⚠️ ' + esc(x.weak) + ' · ' : '') + esc(T({ uz: "oxirgi faollik", ru: "последняя активность", en: "last active" })) + ': ' + esc(ago(x.last)) + '</div></div>';
        }).join("") + '</div>' : '<div class="card empty">' + esc(T({ uz: "Hali hech kim qo'shilmagan. Kodni yoki havolani o'quvchilarga yuboring.", ru: "Пока никто не вступил. Отправьте ученикам код или ссылку.", en: "No one has joined yet. Send the code or link to your students." })) + '</div>') +
        '<p class="note" style="margin-top:10px">' + esc(T({ uz: "Ko'rsatkichlar oxirgi 7 kun bo'yicha. XP — shu haftaning ligasi.", ru: "Показатели за последние 7 дней. XP — за текущую неделю лиги.", en: "Figures cover the last 7 days. XP is this week's league score." })) + '</p>' +
        (rows.length ? '<button class="btn ghost" id="tcXls" style="width:100%;margin-top:6px">📊 ' + esc(T({ uz: "Excel'ga yuklab olish", ru: "Скачать в Excel", en: "Download as Excel" })) + '</button>' : '') +
        '<button class="btn ghost" id="tcDel" style="width:100%;margin-top:6px;color:var(--red)">🗑 ' + esc(T({ uz: "Guruhni o'chirish", ru: "Удалить группу", en: "Delete group" })) + '</button>';
      $("tcBack").onclick = view;
      if ($("tcLic")) $("tcLic").onclick = function () {
        if (!window.PWPay) return;
        PWPay.open("center", { group: r.code, name: r.name });
      };
      if ($("tcXls")) $("tcXls").onclick = function () {
        var btn = $("tcXls"); btn.disabled = true;
        H.api("/api/group/" + encodeURIComponent(r.code) + "/export-link").then(function (x) {
          btn.disabled = false;
          if (window.PWPay && PWPay.openUrl) PWPay.openUrl(x.url); else window.open(x.url, "_blank");
        }).catch(function (e) { btn.disabled = false; H.toast(e.message); });
      };
      $("tcShare").onclick = function () {
        var txt = T({ uz: "Hanguk Way'dagi «{n}» guruhimga qo'shiling! Kod: {c}", ru: "Вступайте в мою группу «{n}» в Hanguk Way! Код: {c}", en: "Join my group “{n}” on Hanguk Way! Code: {c}" }, { n: r.name, c: r.code });
        if (navigator.share) navigator.share({ text: txt, url: link }).catch(function () {});
        else if (navigator.clipboard) navigator.clipboard.writeText(txt + "\n" + link).then(function () { H.toast(T({ uz: "Nusxalandi.", ru: "Скопировано.", en: "Copied." })); });
      };
      $("tcDel").onclick = function () {
        K.sheet('<h3 style="margin:0 0 8px">' + esc(T({ uz: "Guruhni o'chirasizmi?", ru: "Удалить группу?", en: "Delete the group?" })) + '</h3><p class="note">' + esc(T({ uz: "O'quvchilar guruhdan chiqariladi. Buni qaytarib bo'lmaydi.", ru: "Ученики будут исключены. Это нельзя отменить.", en: "Students will be removed. This can't be undone." })) + '</p><button class="btn" id="tcDelOk" style="width:100%;background:var(--red)">' + esc(T({ uz: "Ha, o'chirish", ru: "Да, удалить", en: "Yes, delete" })) + '</button>');
        $("tcDelOk").onclick = function () { K.closeSheet(); H.api("/api/group/" + encodeURIComponent(r.code), { method: "DELETE" }).then(refreshGroups).then(function () { view(); }).catch(function (e) { H.toast(e.message); }); };
      };
    }).catch(function (e) { b.innerHTML = '<div class="err">⚠️ ' + esc(e.message) + '</div>'; });
  }

  // ---------- O'quv markazi litsenziyasi ----------
  function dmy(ts) { var d = new Date(ts * 1000); return ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear(); }
  function licBox(r) {
    var L = r.license || {};
    if (L.active) {
      return '<div class="card tc-lic on"><b>💎 ' + esc(T({ uz: "Markaz litsenziyasi faol", ru: "Лицензия центра активна", en: "Centre licence active" })) + '</b>' +
        '<div class="note">' + esc(T({ uz: "{d} gacha · {u} / {s} o'rin band. Siz va 💎 belgili o'quvchilar Premium'dan foydalanadi.", ru: "До {d} · занято {u} из {s} мест. Вы и ученики с 💎 пользуются Premium.", en: "Until {d} · {u} of {s} seats used. You and students marked 💎 have Premium." }, { d: dmy(L.until), u: L.used || 0, s: L.seats || 0 })) + '</div>' +
        '<button class="linkbtn" id="tcLic">' + esc(T({ uz: "Yana 1 oyga uzaytirish", ru: "Продлить на месяц", en: "Extend by 1 month" })) + ' ›</button></div>';
    }
    return '<div class="card tc-lic"><b>🏫 ' + esc(T({ uz: "O'quv markazi litsenziyasi", ru: "Лицензия учебного центра", en: "Learning centre licence" })) + '</b>' +
      '<div class="note">' + esc(T({ uz: "Oyiga 600 000 so'm: siz va guruhga birinchi qo'shilgan 30 ta o'quvchi Premium oladi (kuniga 300 ta AI so'rov). Bank o'tkazmasi bilan to'lash uchun biz bilan bog'laning.", ru: "600 000 сум в месяц: вы и первые 30 учеников группы получают Premium (300 AI-запросов в день). Для оплаты переводом свяжитесь с нами.", en: "600,000 UZS/month: you and the first 30 students get Premium (300 AI requests a day). Contact us to pay by bank transfer." })) + '</div>' +
      '<button class="btn" id="tcLic" style="margin-top:8px">💳 ' + esc(T({ uz: "Litsenziya olish", ru: "Купить лицензию", en: "Get a licence" })) + '</button></div>';
  }
  window.addEventListener("pw:premium", function (e) {
    var o = e.detail || {};
    if (o.plan === "center" && o.group && H.curView() === "teacher") dash(o.group);
  });

  // Havola orqali taklif: /?g=KOD
  (function () { var m = /[?&]g=([A-Za-z0-9]{4,8})/.exec(location.search); if (m) { sv("pwGroupPending", m[1].toUpperCase()); try { history.replaceState(null, "", location.pathname); } catch (e) {} } })();
  function offer() {
    var c = ld("pwGroupPending", ""), p = K.Profile.get(); if (!c || !p || !p.created || document.getElementById("kSheet")) return;
    localStorage.removeItem("pwGroupPending");
    if (!online()) { H.toast(T({ uz: "Guruhga qo'shilish uchun ilovaga hisob bilan kiring.", ru: "Чтобы вступить в группу, войдите в аккаунт.", en: "Sign in to join the group." })); return; }
    K.sheet('<div style="text-align:center"><div style="font-size:48px">🎒</div><h3 style="margin:4px 0">' + esc(T({ uz: "Guruhga taklif", ru: "Приглашение в группу", en: "Group invitation" })) + '</h3><p class="note">' + esc(T({ uz: "Kod: {c}. Qo'shilsangiz, o'qituvchi natijalaringizni ko'radi.", ru: "Код: {c}. Учитель будет видеть ваши результаты.", en: "Code: {c}. Your teacher will see your progress." }, { c: c })) + '</p><button class="btn" id="tcOk" style="width:100%">' + esc(T({ uz: "Qo'shilish", ru: "Вступить", en: "Join" })) + '</button></div>');
    $("tcOk").onclick = function () { K.closeSheet(); join(c); };
  }
  var prevOnView = H.onView;
  H.onView = function (v) { if (prevOnView) prevOnView(v); if (v === "teacher") view(); if (v === "home") setTimeout(offer, 1000); };
  setTimeout(offer, 1800);
  window.PWTeacher = { open: function () { H.go("teacher"); }, join: join, snapshot: snapshot };
})();
