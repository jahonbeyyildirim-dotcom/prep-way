/* Hanguk Way — DARAJAGA MOSLASHUV.
   Foydalanuvchi darajasi (0: A0 … 4: B2+) va maqsadiga qarab:
   - bosh sahifadagi «Bugungi reja» va yo'nalish kartasi;
   - imtihon kartalari tartibi va «Sizga tavsiya» belgisi;
   - So'zlar, Grammatika, Yozish bo'limlarining boshlang'ich holati;
   - AI suhbatdosh javoblarining murakkabligi;
   - noldan boshlovchilar uchun «Hangul alifbosi» bo'limi. */
(function () {
  var H = window.HY, I = window.I18N;
  if (!H) return;
  var $ = H.$, esc = H.esc;
  function T(o, v) { return I ? I.f(o, v) : o.uz; }
  function prof() { try { return JSON.parse(localStorage.getItem("pwProfile") || "null"); } catch (e) { return null; } }
  function lv() { var p = prof(); return p && p.created ? Math.max(0, Math.min(4, p.level | 0)) : -1; }

  var NAME = [
    { uz: "Noldan boshlovchi", ru: "С нуля", en: "Absolute beginner" },
    { uz: "Boshlang'ich (TOPIK 1)", ru: "Начальный (TOPIK 1)", en: "Beginner (TOPIK 1)" },
    { uz: "Boshlang'ich+ (TOPIK 2 · EPS)", ru: "Начальный+ (TOPIK 2 · EPS)", en: "Beginner+ (TOPIK 2 · EPS)" },
    { uz: "O'rta (TOPIK 3–4)", ru: "Средний (TOPIK 3–4)", en: "Intermediate (TOPIK 3–4)" },
    { uz: "Yuqori (TOPIK 5–6)", ru: "Продвинутый (TOPIK 5–6)", en: "Advanced (TOPIK 5–6)" }
  ];
  var FOCUS = [
    { uz: "Avval harflar: Hangul alifbosi, birinchi so'zlar va to'g'ri talaffuz.", ru: "Сначала буквы: хангыль, первые слова и произношение.", en: "Letters first: Hangul, first words and pronunciation." },
    { uz: "Kundalik so'zlar, oddiy grammatika va qisqa matnlar. Maqsad — TOPIK I (1–2).", ru: "Бытовая лексика, простая грамматика, короткие тексты. Цель — TOPIK I.", en: "Everyday words, basic grammar, short texts. Target — TOPIK I." },
    { uz: "Tinglash va o'qishni imtihon formatida mustahkamlash. Maqsad — 2-daraja / EPS.", ru: "Аудирование и чтение в формате экзамена. Цель — уровень 2 / EPS.", en: "Exam-format listening and reading. Target — level 2 / EPS." },
    { uz: "TOPIK II: 3–4-daraja grammatikasi, uzun matnlar va yozish (51–52).", ru: "TOPIK II: грамматика 3–4, длинные тексты и письмо (51–52).", en: "TOPIK II: level 3–4 grammar, long texts and writing (51–52)." },
    { uz: "TOPIK II: 5–6-daraja — insho (53–54), murakkab so'zlar va to'liq imtihon.", ru: "TOPIK II: 5–6 — эссе (53–54), сложная лексика и полный экзамен.", en: "TOPIK II: 5–6 — essays (53–54), advanced vocabulary and full exams." }
  ];

  // Tavsiya etiladigan imtihon
  function recExam(p) {
    var l = p.level | 0;
    if (p.goal === "eps") return "eps";
    return l >= 3 ? "topik2" : "topik";
  }
  // So'zlar bo'limidagi mos filtr
  function wordFilter(p) {
    var l = p.level | 0;
    return l >= 4 ? "adv" : l === 3 ? "mid" : p.goal === "eps" ? "eps" : "topik1";
  }

  // ---------------------------------------------------------------- BUGUNGI REJA
  function plan(p) {
    var l = p.level | 0, ex = recExam(p), ep = window.PWSix ? PWSix.today() : null, out = [];
    var EXN = { eps: "EPS-TOPIK", topik: "TOPIK I", topik2: "TOPIK II" }[ex];
    function add(k, i, t, s, a) { out.push({ k: k, i: i, t: T(t), s: T(s), a: a }); }
    var six = function () { add("six", "🎧", { uz: "6 daqiqa koreys", ru: "6 минут корейского", en: "6-Minute Korean" }, ep ? { uz: ep.title, ru: ep.title, en: ep.title } : { uz: "", ru: "", en: "" }, 'data-go="six"'); };
    var chat = function (s) { add("chat", "🤖", { uz: "Komiko bilan suhbat", ru: "Разговор с Комико", en: "Talk with Komiko" }, s, 'data-act="chat"'); };
    var words = function (s) { add("words", "🗂️", { uz: "So'z kartochkalari", ru: "Карточки слов", en: "Word cards" }, s, 'data-go="words" data-wf="' + wordFilter(p) + '"'); };
    if (l === 0) {
      add("hangul", "🔤", { uz: "Hangul alifbosi", ru: "Алфавит хангыль", en: "Hangul alphabet" }, { uz: "Harflarni eshitib o'rganing · mini-sinov", ru: "Учите буквы на слух · мини-тест", en: "Learn letters by ear · mini quiz" }, 'data-go="hangul"');
      words({ uz: "Birinchi so'zlar · 5 daqiqa", ru: "Первые слова · 5 минут", en: "First words · 5 min" });
      add("speak", "🎯", { uz: "Talaffuz", ru: "Произношение", en: "Pronunciation" }, { uz: "Oddiy so'zlarni ayting — Komiko baholaydi", ru: "Скажите простые слова — Комико оценит", en: "Say simple words — Komiko scores them" }, 'data-go="speak"');
      chat({ uz: "Salomlashish va tanishuv · sekin", ru: "Приветствие и знакомство · медленно", en: "Greetings and introductions · slow" });
    } else if (l <= 2) {
      six();
      add("test", "⚡", { uz: EXN + (l === 1 ? " o'qish mashqi" : " tezkor test"), ru: EXN + (l === 1 ? " — чтение" : " — быстрый тест"), en: EXN + (l === 1 ? " reading practice" : " quick test") },
        { uz: "10 savol · har biriga izoh", ru: "10 вопросов · с разбором", en: "10 questions · with explanations" }, 'data-start="' + ex + (l === 1 && ex !== "eps" ? ":read" : ":quick") + '"');
      words({ uz: l === 1 ? "Kundalik so'zlar" : (p.goal === "eps" ? "EPS: zavod va ish so'zlari" : "TOPIK I so'zlari"), ru: l === 1 ? "Бытовые слова" : (p.goal === "eps" ? "EPS: слова для работы" : "Слова TOPIK I"), en: l === 1 ? "Everyday words" : (p.goal === "eps" ? "EPS: workplace words" : "TOPIK I words") });
      chat({ uz: "Ovozli mashq · 5 daqiqa", ru: "Голосовая практика · 5 минут", en: "Voice practice · 5 min" });
      add("hw", "📷", { uz: "Daftar topshirig'i", ru: "Задание в тетради", en: "Notebook task" }, { uz: "Yozing → rasmga oling → Komiko tekshiradi", ru: "Напишите → сфотографируйте → Комико проверит", en: "Write → take a photo → Komiko checks" }, 'data-go="hw"');
    } else if (l === 3) {
      six();
      if (ex === "eps") add("test", "📝", { uz: "EPS-TOPIK imtihon formati", ru: "EPS-TOPIK в формате экзамена", en: "EPS-TOPIK exam format" }, { uz: "40 savol · 50 daqiqa", ru: "40 вопросов · 50 минут", en: "40 questions · 50 min" }, 'data-start="eps:full"');
      else add("test", "⚡", { uz: "TOPIK II tezkor test", ru: "TOPIK II — быстрый тест", en: "TOPIK II quick test" }, { uz: "Tinglash + o'qish · 10 savol", ru: "Аудирование + чтение · 10 вопросов", en: "Listening + reading · 10 questions" }, 'data-start="topik2:quick"');
      add("write", "✍️", { uz: "Yozish 51–52", ru: "Письмо 51–52", en: "Writing 51–52" }, { uz: "Ikki bo'sh joy · AI baholaydi", ru: "Два пропуска · оценивает ИИ", en: "Two blanks · AI-graded" }, 'data-go="write" data-wn="51"');
      add("gram", "🧩", { uz: "Grammatika 3–4", ru: "Грамматика 3–4", en: "Grammar 3–4" }, { uz: "Bugun 3 ta shakl — misol bilan", ru: "3 конструкции с примерами", en: "3 patterns with examples" }, 'data-go="t2gram" data-gl="3"');
      chat({ uz: "Erkin suhbat · o'rta daraja", ru: "Свободный разговор · средний", en: "Free talk · intermediate" });
    } else {
      add("test", "📝", ex === "eps" ? { uz: "EPS-TOPIK imtihon formati", ru: "EPS-TOPIK в формате экзамена", en: "EPS-TOPIK exam format" } : { uz: "TOPIK II o'qish (uzun matnlar)", ru: "TOPIK II — чтение (длинные тексты)", en: "TOPIK II reading (long texts)" },
        ex === "eps" ? { uz: "40 savol · 50 daqiqa", ru: "40 вопросов · 50 минут", en: "40 questions · 50 min" } : { uz: "10 savol · 18 daqiqa", ru: "10 вопросов · 18 минут", en: "10 questions · 18 min" }, 'data-start="' + (ex === "eps" ? "eps:full" : "topik2:read") + '"');
      add("write", "✍️", { uz: "Insho 53–54", ru: "Эссе 53–54", en: "Essay 53–54" }, { uz: "600–700 belgi · AI rasmiy mezonlar bo'yicha", ru: "600–700 знаков · ИИ по критериям", en: "600–700 chars · AI, official criteria" }, 'data-go="write" data-wn="54"');
      add("gram", "🧩", { uz: "Grammatika 5–6", ru: "Грамматика 5–6", en: "Grammar 5–6" }, { uz: "Rasmiy va kitobiy shakllar", ru: "Книжные конструкции", en: "Formal and literary patterns" }, 'data-go="t2gram" data-gl="5"');
      words({ uz: "Yuqori daraja so'zlari", ru: "Лексика высокого уровня", en: "Advanced vocabulary" });
      chat({ uz: "Munozara: o'z fikringizni koreyscha himoya qiling", ru: "Дискуссия: защитите мнение по-корейски", en: "Debate: defend your view in Korean" });
    }
    return out;
  }

  // ---------------------------------------------------------------- YO'NALISH KARTASI
  function trackCard(p) {
    var l = p.level | 0;
    return '<div class="lv-track-card lv' + l + '"><div class="ltc-h"><span class="ltc-b">' + ["A0", "A1", "A2", "B1", "B2+"][l] + '</span><div><b>' + esc(T(NAME[l])) + '</b><small>' + esc(T(FOCUS[l])) + '</small></div></div>' +
      '<div class="ltc-steps">' + [0, 1, 2, 3, 4].map(function (i) { return '<i class="' + (i < l ? "ok" : i === l ? "on" : "") + '"></i>'; }).join("") + '</div>' +
      '<button class="linkbtn" id="ltcRedo">🔄 ' + esc(T({ uz: "Darajamni qayta aniqlash", ru: "Определить уровень заново", en: "Re-check my level" })) + '</button></div>';
  }

  // ---------------------------------------------------------------- IMTIHON KARTALARI
  function arrangeExams() {
    var p = prof(); if (!p || !p.created) return;
    var l = p.level | 0, rec = recExam(p);
    var grid = document.querySelector("#v-home .grid2"); if (!grid) return;
    var cards = {};
    grid.querySelectorAll(".card.exam").forEach(function (c) {
      var k = c.classList.contains("t2") ? "topik2" : c.querySelector('[data-start^="eps:"]') ? "eps" : "topik";
      cards[k] = c; c.classList.toggle("rec", k === rec);
      var old = c.querySelector(".rec-tag, .lvl-hint"); while (old) { old.remove(); old = c.querySelector(".rec-tag, .lvl-hint"); }
    });
    var order = rec === "eps" ? (l >= 3 ? ["eps", "topik2", "topik"] : ["eps", "topik", "topik2"])
      : rec === "topik2" ? ["topik2", "topik", "eps"] : ["topik", "eps", "topik2"];
    order.forEach(function (k) { if (cards[k]) grid.appendChild(cards[k]); });
    if (cards[rec]) cards[rec].insertAdjacentHTML("afterbegin", '<span class="rec-tag">⭐ ' + esc(T({ uz: "Sizga tavsiya", ru: "Рекомендуем вам", en: "Recommended for you" })) + '</span>');
    if (cards.topik2 && l <= 1) cards.topik2.insertAdjacentHTML("beforeend", '<div class="lvl-hint">' + esc(T({ uz: "Hozircha qiyin bo'lishi mumkin — TOPIK I dan keyin o'ting.", ru: "Пока может быть сложно — сначала TOPIK I.", en: "May be hard for now — start with TOPIK I." })) + '</div>');
    if (cards.topik && l >= 4) cards.topik.insertAdjacentHTML("beforeend", '<div class="lvl-hint">' + esc(T({ uz: "Siz uchun oson — takrorlash uchun.", ru: "Для вас легко — для повторения.", en: "Easy for you — good for review." })) + '</div>');
  }

  // ---------------------------------------------------------------- HANGUL ALIFBOSI
  var CONS = [["ㄱ", "가", "g/k"], ["ㄴ", "나", "n"], ["ㄷ", "다", "d/t"], ["ㄹ", "라", "r/l"], ["ㅁ", "마", "m"], ["ㅂ", "바", "b/p"], ["ㅅ", "사", "s"],
    ["ㅇ", "아", "— / ng"], ["ㅈ", "자", "j"], ["ㅊ", "차", "ch"], ["ㅋ", "카", "k"], ["ㅌ", "타", "t"], ["ㅍ", "파", "p"], ["ㅎ", "하", "h"],
    ["ㄲ", "까", "kk"], ["ㄸ", "따", "tt"], ["ㅃ", "빠", "pp"], ["ㅆ", "싸", "ss"], ["ㅉ", "짜", "jj"]];
  var VOW = [["ㅏ", "아", "a"], ["ㅑ", "야", "ya"], ["ㅓ", "어", "eo"], ["ㅕ", "여", "yeo"], ["ㅗ", "오", "o"], ["ㅛ", "요", "yo"], ["ㅜ", "우", "u"], ["ㅠ", "유", "yu"],
    ["ㅡ", "으", "eu"], ["ㅣ", "이", "i"], ["ㅐ", "애", "ae"], ["ㅔ", "에", "e"], ["ㅘ", "와", "wa"], ["ㅝ", "워", "wo"], ["ㅢ", "의", "ui"]];
  var FIRST = [["안녕하세요", "annyeonghaseyo", { uz: "Assalomu alaykum", ru: "Здравствуйте", en: "Hello" }], ["감사합니다", "gamsahamnida", { uz: "Rahmat", ru: "Спасибо", en: "Thank you" }],
    ["네", "ne", { uz: "Ha", ru: "Да", en: "Yes" }], ["아니요", "aniyo", { uz: "Yo'q", ru: "Нет", en: "No" }], ["물", "mul", { uz: "Suv", ru: "Вода", en: "Water" }],
    ["엄마", "eomma", { uz: "Onam", ru: "Мама", en: "Mom" }], ["친구", "chingu", { uz: "Do'st", ru: "Друг", en: "Friend" }], ["학교", "hakgyo", { uz: "Maktab", ru: "Школа", en: "School" }]];
  var hq = null;
  function hangulView() {
    var s = $("v-hangul"); if (!s) return;
    function cell(x) { return '<button class="hg-c" data-say="' + x[1] + '"><b class="ko">' + x[0] + '</b><small>' + x[2] + '</small></button>'; }
    s.innerHTML = '<h2 style="margin-top:0">🔤 ' + esc(T({ uz: "Hangul alifbosi", ru: "Алфавит хангыль", en: "Hangul alphabet" })) + '</h2>' +
      '<div class="note" style="margin:-6px 0 12px">' + esc(T({ uz: "Harfni bosing — tovushini eshitasiz. Har bir bo'g'in: undosh + unli (+ oxirgi undosh).", ru: "Нажмите на букву — услышите звук. Слог = согласная + гласная (+ конечная).", en: "Tap a letter to hear it. A syllable = consonant + vowel (+ final)." })) + '</div>' +
      '<div class="sec-t">' + esc(T({ uz: "Undoshlar", ru: "Согласные", en: "Consonants" })) + ' · 19</div><div class="hg-grid">' + CONS.map(cell).join("") + '</div>' +
      '<div class="sec-t" style="margin-top:14px">' + esc(T({ uz: "Unlilar", ru: "Гласные", en: "Vowels" })) + ' · 15</div><div class="hg-grid">' + VOW.map(cell).join("") + '</div>' +
      '<div class="card hg-build"><div class="sec-t" style="margin:0 0 8px">' + esc(T({ uz: "Bo'g'in qanday tuziladi", ru: "Как строится слог", en: "How a syllable is built" })) + '</div>' +
      [["ㄱ + ㅏ", "가", "ga"], ["ㄴ + ㅗ", "노", "no"], ["ㅎ + ㅏ + ㄴ", "한", "han"], ["ㄱ + ㅜ + ㄱ", "국", "guk"]].map(function (x) {
        return '<button class="hg-row" data-say="' + x[1] + '"><span class="ko">' + x[0] + '</span><span>→</span><b class="ko">' + x[1] + '</b><small>' + x[2] + '</small></button>'; }).join("") +
      '<div class="note" style="margin-top:6px">한 + 국 = <b class="ko">한국</b> (Hanguk) — ' + esc(T({ uz: "Koreya", ru: "Корея", en: "Korea" })) + '</div></div>' +
      '<div class="sec-t" style="margin-top:14px">' + esc(T({ uz: "Birinchi so'zlar", ru: "Первые слова", en: "First words" })) + '</div><div class="hg-words">' +
      FIRST.map(function (w) { return '<button class="hg-w" data-say="' + w[0] + '"><b class="ko">' + w[0] + '</b><small>' + w[1] + ' · ' + esc(T(w[2])) + '</small></button>'; }).join("") + '</div>' +
      '<div class="card hg-quiz" id="hgQuiz"></div>';
    s.querySelectorAll("[data-say]").forEach(function (b) { b.onclick = function () { H.speak(b.dataset.say); }; });
    hq = { n: 0, ok: 0 }; quiz();
  }
  function quiz() {
    var box = $("hgQuiz"); if (!box) return;
    if (hq.n >= 5) {
      box.innerHTML = '<div class="sec-t" style="margin:0">🎉 ' + esc(T({ uz: "Natija: {o} / 5", ru: "Результат: {o} / 5", en: "Score: {o} / 5" }, { o: hq.ok })) + '</div>' +
        '<button class="btn" id="hgAgain" style="margin-top:10px">' + esc(T({ uz: "Yana 5 ta", ru: "Ещё 5", en: "5 more" })) + '</button>';
      $("hgAgain").onclick = function () { hq = { n: 0, ok: 0 }; quiz(); };
      if (hq.ok >= 3 && window.Komiko && Komiko.Activity) Komiko.Activity.mark("hangul");
      return;
    }
    var pool = CONS.slice(0, 14).concat(VOW.slice(0, 10)), x = pool[Math.floor(Math.random() * pool.length)];
    var opts = [x[2]]; while (opts.length < 4) { var y = pool[Math.floor(Math.random() * pool.length)][2]; if (opts.indexOf(y) < 0) opts.push(y); }
    opts.sort(function () { return Math.random() - 0.5; });
    box.innerHTML = '<div class="sec-t" style="margin:0 0 8px">✅ ' + esc(T({ uz: "Mini-sinov {n} / 5: bu harf qanday o'qiladi?", ru: "Мини-тест {n} / 5: как читается буква?", en: "Mini quiz {n} / 5: how is this letter read?" }, { n: hq.n + 1 })) + '</div>' +
      '<div class="hg-big ko">' + x[0] + '</div><div class="hg-opts">' + opts.map(function (o) { return '<button class="btn ghost" data-o="' + esc(o) + '">' + esc(o) + '</button>'; }).join("") + '</div>';
    box.querySelectorAll("[data-o]").forEach(function (b) {
      b.onclick = function () {
        var ok = b.dataset.o === x[2]; if (ok) hq.ok++;
        b.classList.add(ok ? "ok" : "bad"); H.speak(x[1]); H.haptic && H.haptic("note", ok ? "success" : "warning");
        box.querySelectorAll("[data-o]").forEach(function (z) { z.disabled = true; if (z.dataset.o === x[2]) z.classList.add("ok"); });
        setTimeout(function () { hq.n++; quiz(); }, 1100);
      };
    });
  }

  // ---------------------------------------------------------------- BOSHQA BO'LIMLARDAGI STANDART HOLAT
  // Reja bandi bosilganda: so'z filtri, yozish raqami, grammatika darajasi
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-wf],[data-wn],[data-gl]"); if (!b) return;
    if (b.dataset.wn) try { localStorage.setItem("pwWriteTab", b.dataset.wn); } catch (x) {}
    if (b.dataset.gl) try { localStorage.setItem("pwGramLv", b.dataset.gl); } catch (x) {}
    if (b.dataset.wf) setTimeout(function () { setWords(b.dataset.wf); }, 0);
  }, true);
  function setWords(f) {
    var btn = document.querySelector('#wFilters [data-f="' + f + '"]');
    if (btn && !btn.classList.contains("on")) btn.click();
  }
  var wordsInit = false;
  var prevOnView = H.onView;
  H.onView = function (v) {
    if (v === "hangul") hangulView();
    if (v === "words") {
      var p = prof();
      if (!wordsInit && p && p.created) { wordsInit = true; setWords(wordFilter(p)); }
      if (window.Komiko && Komiko.Activity) Komiko.Activity.mark("words");
    }
    if (v === "t2gram" && window.Komiko && Komiko.Activity) Komiko.Activity.mark("gram");
    if (prevOnView) prevOnView(v);
    if (v === "home") arrangeExams();
  };
  document.addEventListener("pw:profile", function () { wordsInit = false; arrangeExams(); });
  document.addEventListener("click", function (e) { if (e.target && e.target.id === "ltcRedo" && window.PWHome) PWHome.onboarding(); });

  // AI suhbatdosh uchun daraja tavsifi
  var CHAT = ["absolute beginner (A0): only very short, very simple Korean sentences; always add an Uzbek explanation",
    "beginner (TOPIK level 1): short simple sentences, basic polite -아요/어요 forms",
    "elementary (TOPIK level 2 / EPS-TOPIK): everyday topics, simple connectors",
    "intermediate (TOPIK level 3–4): natural sentences, connectors like -는데, -(으)니까, -기 때문에",
    "advanced (TOPIK level 5–6): rich vocabulary, formal written grammar, discuss opinions in depth"];

  window.PWLevel = {
    get: lv, plan: plan, trackCard: trackCard, recExam: recExam, arrange: arrangeExams,
    chat: function () { var l = lv(); return CHAT[l < 0 ? 1 : l]; },
    writeTab: function () { var t = 0; try { t = +localStorage.getItem("pwWriteTab") || 0; localStorage.removeItem("pwWriteTab"); } catch (e) {} return t || (lv() >= 4 ? 53 : 51); },
    gramLv: function () { var g = 0; try { g = +localStorage.getItem("pwGramLv") || 0; localStorage.removeItem("pwGramLv"); } catch (e) {} if (g) return g; var l = lv(); return l >= 4 ? 5 : l === 3 ? 3 : 0; }
  };
  setTimeout(arrangeExams, 0);
  // home.js level.js dan oldin yuklanadi — bosh sahifani reja va daraja kartasi bilan qayta chizamiz
  document.dispatchEvent(new CustomEvent("pw:activity"));
})();
