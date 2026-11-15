/* Prep Way — tanishuv (8 bosqich) va shaxsiy bosh sahifa. */
(function () {
  var H = window.HY, K = window.Komiko;
  if (!H || !K) return;
  var $ = H.$, esc = H.esc;
  var Profile = K.Profile, Activity = K.Activity;

  var GOALS = [
    { v: "eps", i: "🏭", t: "Koreyada ishlash", s: "EPS-TOPIK · E-9 viza" },
    { v: "topik", i: "🎓", t: "Universitet va grant", s: "TOPIK I / II" },
    { v: "travel", i: "✈️", t: "Sayohat va muloqot", s: "Kundalik so'zlashuv" },
    { v: "culture", i: "🎬", t: "K-drama, K-pop", s: "Tushunish va zavqlanish" },
    { v: "other", i: "✨", t: "Boshqa", s: "O'zim uchun" }
  ];
  var SELF = [
    { v: 0, i: "🌱", t: "Umuman bilmayman", s: "Noldan boshlayman" },
    { v: 1, i: "🔤", t: "Hangulni o'qiy olaman", s: "Harflarni bilaman" },
    { v: 2, i: "💬", t: "Oddiy gaplar tuza olaman", s: "Salomlashish, tanishuv" },
    { v: 3, i: "📖", t: "O'rta daraja", s: "Matn o'qiy olaman" },
    { v: 4, i: "🏆", t: "Yuqori daraja", s: "Erkin gaplashaman" }
  ];
  var SKILLS = [
    { v: "listen", i: "🎧", t: "Tinglash" }, { v: "speak", i: "🗣️", t: "Gapirish" },
    { v: "read", i: "📖", t: "O'qish" }, { v: "write", i: "✍️", t: "Yozish" },
    { v: "words", i: "🗂️", t: "So'z yodlash" }, { v: "grammar", i: "🧩", t: "Grammatika" }
  ];
  var WHEN = [
    { v: "1m", i: "🔥", t: "1 oy ichida" }, { v: "3m", i: "📅", t: "3 oy ichida" },
    { v: "6m", i: "🗓️", t: "6 oy ichida" }, { v: "none", i: "🤔", t: "Hali bilmayman" }
  ];
  var DAILY = [
    { v: 5, i: "☕", t: "5 daqiqa", s: "Yengil" }, { v: 10, i: "🙂", t: "10 daqiqa", s: "Odatiy" },
    { v: 20, i: "💪", t: "20 daqiqa", s: "Jiddiy" }, { v: 30, i: "🚀", t: "30+ daqiqa", s: "Intensiv" }
  ];
  var QUIZ = [
    { q: "Bu so'z qanday o'qiladi?", big: "한국", o: ["hanguk", "nanguk", "hangul", "handuk"], a: 0 },
    { q: "«Rahmat» koreyscha qaysi?", o: ["안녕하세요", "감사합니다", "죄송합니다", "괜찮아요"], a: 1 },
    { q: "Bo'sh joyni to'ldiring: «Men talabaman»", big: "저는 학생(    ).", o: ["있습니다", "합니다", "입니다", "갑니다"], a: 2 }
  ];
  var LEVELS = [
    { t: "Noldan boshlovchi", s: "Hangul alifbosidan boshlaymiz", short: "A0" },
    { t: "Boshlang'ich", s: "TOPIK 1 darajasi", short: "A1" },
    { t: "Boshlang'ich+", s: "TOPIK 2 · EPS-TOPIK", short: "A2" },
    { t: "O'rta", s: "TOPIK 3–4", short: "B1" },
    { t: "Yuqori", s: "TOPIK 5–6", short: "B2+" }
  ];
  var TOTAL = 8;

  // =====================================================================
  // TANISHUV
  // =====================================================================
  var ob = null;
  function startOnboarding() {
    var old = Profile.get() || {};
    ob = { step: 0, d: { name: old.name || "", goal: old.goal || "", self: old.self, quiz: [], qi: 0, skills: old.skills || [], when: old.when || "",
      daily: old.daily || 0, voice: old.voice || "", speed: old.speed || "normal" } };
    var el = document.createElement("div");
    el.className = "onb"; el.id = "onb";
    el.innerHTML = '<div class="onb-top"><button class="onb-back" id="onbBack" aria-label="Orqaga">‹</button>' +
      '<div class="onb-bar"><i id="onbBar"></i></div><span class="onb-n" id="onbN"></span></div>' +
      '<div class="onb-body" id="onbBody"></div>' +
      '<div class="onb-foot"><button class="btn onb-go" id="onbNext">Davom etish</button></div>';
    document.body.appendChild(el);
    document.body.classList.add("onb-open");
    $("onbBack").onclick = function () { if (ob.step > 0) { ob.step--; render(-1); } };
    $("onbNext").onclick = next;
    render(1);
  }
  function canNext() {
    var d = ob.d;
    switch (ob.step) {
      case 1: return d.name.trim().length >= 2;
      case 2: return !!d.goal;
      case 3: return d.self != null;
      case 4: return d.quiz.length >= QUIZ.length;
      case 5: return d.skills.length > 0;
      case 6: return !!d.when;
      case 7: return !!d.daily;
      case 8: return !!d.voice;
      default: return true;
    }
  }
  function updNext() {
    var b = $("onbNext"); b.disabled = !canNext();
    b.textContent = ob.step === 0 ? "Boshladik! 🚀" : ob.step === TOTAL ? "Rejamni ko'rish ✨" : ob.step > TOTAL ? "Boshlash 🎯" : "Davom etish";
  }
  function next() {
    if (!canNext()) return;
    if (ob.step === 1) ob.d.name = ob.d.name.trim().slice(0, 30);
    if (ob.step > TOTAL) { finish(); return; }
    ob.step++; render(1);
  }
  function opts(list, cur, multi, key) {
    return '<div class="onb-opts' + (list.length > 4 ? "" : " two") + '">' + list.map(function (o) {
      var on = multi ? cur.indexOf(o.v) >= 0 : cur === o.v;
      return '<button class="onb-opt' + (on ? " on" : "") + '" data-k="' + key + '" data-v="' + esc(String(o.v)) + '"><span class="oi">' + o.i + '</span><span class="ot"><b>' + esc(o.t) + '</b>' +
        (o.s ? '<small>' + esc(o.s) + '</small>' : '') + '</span>' + (multi ? '<span class="ock">' + (on ? "✓" : "") + '</span>' : '') + '</button>';
    }).join("") + '</div>';
  }
  function ask(q, sub) {
    return '<div class="onb-ask">' + K.avatar(64, "live float") + '<div class="onb-q"><div class="onb-qt">' + esc(q) + '</div>' + (sub ? '<div class="onb-qs">' + esc(sub) + '</div>' : '') + '</div></div>';
  }
  function render(dir) {
    var d = ob.d, s = ob.step, h = "";
    $("onbBack").style.visibility = s > 0 && s <= TOTAL + 1 ? "visible" : "hidden";
    $("onbBar").style.width = Math.min(100, (s / TOTAL) * 100) + "%";
    $("onbN").textContent = s >= 1 && s <= TOTAL ? s + " / " + TOTAL : "";
    document.querySelector(".onb-top").style.visibility = s === 0 ? "hidden" : "visible";
    if (s === 0) {
      h = '<div class="onb-hero">' + K.avatar(150, "live float") + '<h1>Annyeong! 👋<br>Men <span class="grad">Komiko</span></h1>' +
        '<p>Koreys tilini birga o\'rganamiz: gapirishni, tinglashni va imtihonga tayyorlanishni.</p>' +
        '<p class="onb-mini">Avval sizni tanib olay: <b>8 ta qisqa savol</b>, taxminan 1 daqiqa.</p>' +
        '<div class="onb-feats"><span>🎙️ Ovozli mashq</span><span>📷 Daftar tekshiruvi</span><span>📝 Mock testlar</span></div></div>';
    } else if (s === 1) {
      h = ask("Ismingiz nima?", "Sizga shunday murojaat qilaman") +
        '<input class="inp onb-inp" id="onbName" maxlength="30" placeholder="Masalan: Amin" value="' + esc(d.name) + '" autocomplete="given-name">';
    } else if (s === 2) {
      h = ask((d.name ? d.name + ", k" : "K") + "oreys tilini nima uchun o'rganyapsiz?", "Shunga qarab dars va testlarni tanlayman") + opts(GOALS, d.goal, false, "goal");
    } else if (s === 3) {
      h = ask("Hozir koreys tilini qanchalik bilasiz?", "O'zingizni baholang, keyin kichik sinov qilamiz") + opts(SELF, d.self, false, "self");
    } else if (s === 4) {
      var qi = Math.min(d.qi, QUIZ.length - 1), Q = QUIZ[qi], ans = d.quiz[qi];
      h = ask("Kichik sinov: " + (qi + 1) + " / " + QUIZ.length, "Bilmasangiz, taxmin qiling: bu faqat darajangizni aniqlash uchun") +
        '<div class="onb-quiz"><div class="onb-qq">' + esc(Q.q) + '</div>' + (Q.big ? '<div class="onb-big ko">' + esc(Q.big) + '</div>' : '') +
        '<div class="onb-qo">' + Q.o.map(function (o, i) {
          var cls = ans == null ? "" : i === Q.a ? " right" : i === ans ? " wrong" : " dim";
          return '<button class="onb-qb ko' + cls + '" data-qa="' + i + '"' + (ans != null ? " disabled" : "") + '>' + esc(o) + '</button>';
        }).join("") + '</div>' + (ans != null ? '<div class="onb-qf">' + (ans === Q.a ? "✅ To'g'ri!" : "Hechqisi yo'q: to'g'ri javob yashil rangda.") + '</div>' : '') + '</div>';
    } else if (s === 5) {
      h = ask("Qaysi ko'nikmalar sizga qiyin?", "Bir nechtasini tanlashingiz mumkin") + opts(SKILLS, d.skills, true, "skills");
    } else if (s === 6) {
      h = ask("Imtihoningiz qachon?", "Rejani shunga qarab tuzaman") + opts(WHEN, d.when, false, "when");
    } else if (s === 7) {
      h = ask("Kuniga qancha vaqt ajrata olasiz?", "Kichik, lekin har kungi mashq eng yaxshi natija beradi") + opts(DAILY, d.daily, false, "daily");
    } else if (s === 8) {
      h = ask("Komiko qaysi ovozda gapirsin?", "Tinglab ko'rib tanlang. Keyin istalgan vaqtda o'zgartirsa bo'ladi") +
        '<div class="onb-voices">' + [["female", "👩", "Ayol ovozi", "Yumshoq va aniq"], ["male", "👨", "Erkak ovozi", "Past va xotirjam"]].map(function (v) {
          return '<div class="onb-voice' + (d.voice === v[0] ? " on" : "") + '" data-voice="' + v[0] + '"><div class="ov-i">' + v[1] + '</div><b>' + v[2] + '</b><small>' + v[3] + '</small>' +
            '<button class="ov-play" data-play="' + v[0] + '">▶ Tinglash</button></div>';
        }).join("") + '</div>' +
        '<div class="onb-speed"><span>Tezlik:</span><button data-speed="slow" class="' + (d.speed === "slow" ? "on" : "") + '">🐢 Sekin</button><button data-speed="normal" class="' + (d.speed !== "slow" ? "on" : "") + '">🚶 Odatiy</button></div>';
    } else {
      var lv = calcLevel(), L = LEVELS[lv], goal = GOALS.filter(function (g) { return g.v === d.goal; })[0] || GOALS[4];
      var plan = planFor(d.goal, lv);
      h = '<div class="onb-done">' + K.avatar(110, "live float") + '<h1>Rejangiz tayyor, ' + esc(d.name) + '! 🎉</h1>' +
        '<div class="onb-lv"><span class="lv-badge">' + L.short + '</span><div><b>' + esc(L.t) + '</b><small>' + esc(L.s) + '</small></div></div>' +
        '<div class="onb-sum"><div><span>🎯 Maqsad</span><b>' + esc(goal.t) + '</b></div><div><span>⏱ Har kuni</span><b>' + d.daily + ' daqiqa</b></div>' +
        '<div><span>🔈 Komiko</span><b>' + (d.voice === "male" ? "Erkak ovozi" : "Ayol ovozi") + '</b></div><div><span>✅ Sinov</span><b>' + quizScore() + ' / 3</b></div></div>' +
        '<div class="onb-plan"><div class="onb-plt">Har kungi rejangiz:</div>' + plan.map(function (p) { return '<div>' + p + '</div>'; }).join("") + '</div></div>';
    }
    var body = $("onbBody");
    body.innerHTML = '<div class="onb-step ' + (dir < 0 ? "from-l" : "from-r") + '">' + h + '</div>';
    bindStep();
    updNext();
    body.scrollTop = 0;
  }
  function bindStep() {
    var d = ob.d, body = $("onbBody");
    var nm = $("onbName");
    if (nm) { nm.oninput = function () { d.name = nm.value; updNext(); }; nm.onkeydown = function (e) { if (e.key === "Enter") next(); }; setTimeout(function () { try { nm.focus(); } catch (e) {} }, 250); }
    body.querySelectorAll(".onb-opt").forEach(function (b) {
      b.onclick = function () {
        var k = b.dataset.k, v = b.dataset.v;
        if (k === "skills") {
          var i = d.skills.indexOf(v); if (i >= 0) d.skills.splice(i, 1); else d.skills.push(v);
          b.classList.toggle("on"); b.querySelector(".ock").textContent = d.skills.indexOf(v) >= 0 ? "✓" : "";
          updNext(); return;
        }
        d[k] = (k === "self" || k === "daily") ? +v : v;
        body.querySelectorAll('.onb-opt[data-k="' + k + '"]').forEach(function (x) { x.classList.toggle("on", x === b); });
        H.haptic("sel"); updNext();
        setTimeout(function () { if (ob && canNext() && ob.step >= 2 && ob.step <= 7 && ob.step !== 5) next(); }, 320);
      };
    });
    body.querySelectorAll("[data-qa]").forEach(function (b) {
      b.onclick = function () {
        var qi = Math.min(d.qi, QUIZ.length - 1);
        d.quiz[qi] = +b.dataset.qa;
        H.haptic("note", d.quiz[qi] === QUIZ[qi].a ? "success" : "warning");
        render(1);
        setTimeout(function () { if (ob && ob.step === 4 && d.qi < QUIZ.length - 1) { d.qi++; render(1); } }, 900);
      };
    });
    body.querySelectorAll(".onb-voice").forEach(function (c) {
      c.onclick = function (e) {
        d.voice = c.dataset.voice;
        body.querySelectorAll(".onb-voice").forEach(function (x) { x.classList.toggle("on", x === c); });
        updNext();
        if (!e.target.closest("[data-play]")) playVoice(d.voice);
      };
    });
    body.querySelectorAll("[data-play]").forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); d.voice = b.dataset.play;
      body.querySelectorAll(".onb-voice").forEach(function (x) { x.classList.toggle("on", x.dataset.voice === d.voice); }); updNext(); playVoice(d.voice); }; });
    body.querySelectorAll("[data-speed]").forEach(function (b) {
      b.onclick = function () { d.speed = b.dataset.speed; body.querySelectorAll("[data-speed]").forEach(function (x) { x.classList.toggle("on", x === b); }); if (d.voice) playVoice(d.voice); };
    });
  }
  function playVoice(v) {
    K.tmpSpeed = ob.d.speed;   // profil faqat yakunda saqlanadi
    K.speak("안녕하세요! 저는 코미코예요. 같이 한국어를 공부해요!", v);
  }
  function quizScore() { var d = ob.d; return QUIZ.reduce(function (n, q, i) { return n + (d.quiz[i] === q.a ? 1 : 0); }, 0); }
  function calcLevel() {
    var pts = (ob.d.self || 0) + quizScore();            // 0..7
    return pts <= 1 ? 0 : pts <= 3 ? 1 : pts <= 5 ? 2 : pts === 6 ? 3 : 4;
  }
  function planFor(goal, lv) {
    var p = [];
    if (lv === 0) p.push("🔤 Hangul harflari va oddiy so'zlar");
    p.push(goal === "eps" ? "📝 EPS-TOPIK tezkor test (10 savol)" : goal === "topik" ? "📝 TOPIK I tezkor test (10 savol)" : "🗂️ Kundalik so'zlar kartochkasi");
    p.push("🤖 Komiko bilan 5 daqiqa ovozli suhbat");
    p.push("📷 Daftarga yozish topshirig'i va tekshiruv");
    return p;
  }
  function finish() {
    var d = ob.d, lv = calcLevel();
    Profile.set({ name: d.name, goal: d.goal, self: d.self, quiz: quizScore(), level: lv, skills: d.skills, when: d.when,
      daily: d.daily, voice: d.voice, speed: d.speed, created: Date.now() });
    var el = $("onb"); el.classList.add("out");
    setTimeout(function () { el.remove(); document.body.classList.remove("onb-open"); }, 350);
    ob = null; K.tmpSpeed = null;
    renderHome();
    K.speak("좋아요, " + "시작해요!");
  }

  // =====================================================================
  // BOSH SAHIFA
  // =====================================================================
  function greet() {
    var h = new Date().getHours();
    return h < 5 ? "Xayrli tun" : h < 12 ? "Xayrli tong" : h < 18 ? "Xayrli kun" : "Xayrli kech";
  }
  function renderHome() {
    var box = $("homeDash"); if (!box) return;
    var p = Profile.get();
    if (!p || !p.created) { box.innerHTML = ""; return; }
    var day = Activity.day(), mins = Math.floor(day.secs / 60), goalMin = p.daily || 10, pct = Math.min(100, Math.round(mins / goalMin * 100));
    var streak = Activity.streak(), L = LEVELS[p.level | 0] || LEVELS[1];
    var goal = GOALS.filter(function (g) { return g.v === p.goal; })[0] || GOALS[4];
    var done = day.done || [];
    var msg = pct >= 100 ? "Bugungi maqsad bajarildi! 🎉 Ertaga ham kutaman." :
      done.length ? "Zo'r ketyapsiz! Rejadagi qolgan ishlarni ham bajaramizmi?" :
      streak ? streak + " kunlik seriyani uzmaylik! Bugun " + goalMin + " daqiqa mashq qilamiz." :
      "Bugun " + goalMin + " daqiqa mashq qilamizmi? Men tayyorman!";
    var examKey = p.goal === "topik" ? "topik" : "eps";
    var plan = [
      { k: "test", i: "⚡", t: (examKey === "eps" ? "EPS-TOPIK" : "TOPIK I") + " tezkor test", s: "10 savol · 10 daqiqa", a: 'data-start="' + examKey + ':quick"' },
      { k: "chat", i: "🤖", t: "Komiko bilan suhbat", s: "Ovozli mashq · 5 daqiqa", a: 'data-act="chat"' },
      { k: "hw", i: "📷", t: "Daftar topshirig'i", s: "Yozing → rasmga oling → Komiko tekshiradi", a: 'data-go="hw"' }
    ];
    var nDone = plan.filter(function (x) { return done.indexOf(x.k) >= 0 || (x.k === "chat" && done.indexOf("speak") >= 0); }).length;
    box.innerHTML =
      '<div class="dh">' +
        '<div class="dh-glyph" aria-hidden="true">한 글 말<br>배 움 길</div>' +
        '<div class="dh-top"><div><div class="dh-greet">' + greet() + ',</div><div class="dh-name">' + esc(p.name || "do'stim") + ' 👋</div></div>' +
          '<button class="dh-set" id="dhSet" aria-label="Sozlamalar">⚙️</button></div>' +
        '<div class="dh-mid">' + K.avatar(86, "live float") + '<div class="dh-bub">' + esc(msg) + '</div></div>' +
        '<div class="dh-stats">' +
          '<div class="st"><b>🔥 ' + streak + '</b><span>kun seriya</span></div>' +
          '<div class="st"><b>' + mins + '<small>/' + goalMin + '</small></b><span>daqiqa bugun</span><i class="st-bar"><i style="width:' + pct + '%"></i></i></div>' +
          '<div class="st"><b>' + L.short + '</b><span>' + esc(L.t) + '</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="sec-h"><h2>Bugungi reja</h2><span class="chip">' + nDone + ' / 3</span></div>' +
      '<div class="plan-l">' + plan.map(function (x) {
        var ok = done.indexOf(x.k) >= 0 || (x.k === "chat" && done.indexOf("speak") >= 0);
        return '<button class="pl' + (ok ? " ok" : "") + '" ' + x.a + '><span class="pl-i">' + x.i + '</span><span class="pl-t"><b>' + esc(x.t) + '</b><small>' + esc(x.s) + '</small></span><span class="pl-c">' + (ok ? "✓" : "›") + '</span></button>';
      }).join("") + '</div>' +
      '<div class="tiles">' +
        '<button class="tile t1" data-act="chat"><span>🤖</span><b>Komiko</b><small>Ovozli suhbat</small></button>' +
        '<button class="tile t2" data-go="hw"><span>📷</span><b>Daftar</b><small>Rasm bilan tekshiruv</small></button>' +
        '<button class="tile t3" data-go="speak"><span>🎯</span><b>Talaffuz</b><small>Gapni ayting, baho oling</small></button>' +
        '<button class="tile t4" data-go="books"><span>📚</span><b>Kitoblar</b><small>O\'z darsligingiz</small></button>' +
      '</div>';
    $("dhSet").onclick = settings;
    box.querySelectorAll('[data-act="chat"]').forEach(function (b) { b.onclick = function () { K.openChat(); }; });
    var hello = $("hello"); if (hello) hello.textContent = "";
  }
  function settings() {
    var p = Profile.get() || {};
    K.sheet('<h3 style="margin:0 0 12px">⚙️ Sozlamalar</h3>' +
      '<button class="lsn" id="stVoice"><span class="n">🔈</span><span style="flex:1"><b>Komiko ovozi</b><div class="s">' + (p.voice === "male" ? "Erkak" : "Ayol") + ' · ' + (p.speed === "slow" ? "sekin" : "odatiy") + '</div></span>›</button>' +
      '<div style="height:8px"></div>' +
      '<div class="note" style="font-weight:700;margin-bottom:6px">⏱ Kunlik maqsad</div><div class="onb-speed" style="justify-content:flex-start">' +
      [5, 10, 20, 30].map(function (m) { return '<button data-dm="' + m + '" class="' + ((p.daily || 10) === m ? "on" : "") + '">' + m + ' daq</button>'; }).join("") + '</div>' +
      '<div style="height:12px"></div>' +
      '<button class="lsn" id="stRedo"><span class="n">🔄</span><span style="flex:1"><b>Tanishuv savollarini qaytadan</b><div class="s">Darajani qayta aniqlash</div></span>›</button>');
    $("stVoice").onclick = function () { K.closeSheet(); K.voicePicker(); };
    $("stRedo").onclick = function () { K.closeSheet(); startOnboarding(); };
    document.querySelectorAll("#kSheet [data-dm]").forEach(function (b) {
      b.onclick = function () { var q = Profile.get() || {}; q.daily = +b.dataset.dm; Profile.set(q);
        document.querySelectorAll("#kSheet [data-dm]").forEach(function (x) { x.classList.toggle("on", x === b); }); renderHome(); };
    });
  }

  document.addEventListener("pw:activity", renderHome);
  document.addEventListener("pw:profile", renderHome);
  var prevOnView = H.onView;
  H.onView = function (v) { if (prevOnView) prevOnView(v); if (v === "home") renderHome(); };

  renderHome();
  if (!(Profile.get() || {}).created) startOnboarding();
  window.PWHome = { render: renderHome, onboarding: startOnboarding };
})();
