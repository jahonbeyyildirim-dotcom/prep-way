/* Prep Way — til tanlash, tanishuv (8 savol, ixtiyoriy ovozli) va shaxsiy bosh sahifa. */
(function () {
  var H = window.HY, K = window.Komiko, I = window.I18N;
  if (!H || !K || !I) return;
  var $ = H.$, esc = H.esc;
  var Profile = K.Profile, Activity = K.Activity;
  var LG = I.lang();
  function T(m, v) { return I.f(m, v); }
  function P(o) { return o[LG] || o.uz; }

  var GOALS = [
    { v: "eps", i: "🏭", t: { uz: "Koreyada ishlash", ru: "Работа в Корее", en: "Work in Korea" }, s: { uz: "EPS-TOPIK · E-9 viza", ru: "EPS-TOPIK · виза E-9", en: "EPS-TOPIK · E-9 visa" }, kw: "ish|ishla|работ|work|job|eps" },
    { v: "topik", i: "🎓", t: { uz: "Universitet va grant", ru: "Университет и грант", en: "University and scholarship" }, s: { uz: "TOPIK I / II", ru: "TOPIK I / II", en: "TOPIK I / II" }, kw: "universitet|o'qish|grant|университет|учёб|учеб|грант|university|study|scholar|topik" },
    { v: "travel", i: "✈️", t: { uz: "Sayohat va muloqot", ru: "Путешествия и общение", en: "Travel and communication" }, s: { uz: "Kundalik so'zlashuv", ru: "Бытовой разговор", en: "Everyday conversation" }, kw: "sayohat|muloqot|путешеств|общен|travel|trip|talk" },
    { v: "culture", i: "🎬", t: { uz: "K-drama, K-pop", ru: "K-драмы, K-pop", en: "K-dramas, K-pop" }, s: { uz: "Tushunish va zavqlanish", ru: "Понимать и наслаждаться", en: "Understand and enjoy" }, kw: "drama|dorama|pop|kino|serial|музык|сериал|дорам|music|movie|series" },
    { v: "other", i: "✨", t: { uz: "Boshqa", ru: "Другое", en: "Other" }, s: { uz: "O'zim uchun", ru: "Для себя", en: "For myself" }, kw: "boshqa|o'zim|другое|для себя|other|myself" }
  ];
  var SELF = [
    { v: 0, i: "🌱", t: { uz: "Umuman bilmayman", ru: "Совсем не знаю", en: "I don't know any" }, s: { uz: "Noldan boshlayman", ru: "Начинаю с нуля", en: "Starting from zero" }, kw: "umuman|bilmayman|noldan|совсем|не знаю|с нуля|zero|nothing|don't know|none" },
    { v: 1, i: "🔤", t: { uz: "Hangulni o'qiy olaman", ru: "Читаю хангыль", en: "I can read Hangul" }, s: { uz: "Harflarni bilaman", ru: "Знаю буквы", en: "I know the letters" }, kw: "hangul|harf|o'qiy|хангыль|букв|читаю|letters|read" },
    { v: 2, i: "💬", t: { uz: "Oddiy gaplar tuza olaman", ru: "Строю простые фразы", en: "I can make simple sentences" }, s: { uz: "Salomlashish, tanishuv", ru: "Приветствие, знакомство", en: "Greetings, introductions" }, kw: "oddiy|gap|простые|фраз|simple|sentence" },
    { v: 3, i: "📖", t: { uz: "O'rta daraja", ru: "Средний уровень", en: "Intermediate" }, s: { uz: "Matn o'qiy olaman", ru: "Читаю тексты", en: "I can read texts" }, kw: "o'rta|средн|intermediate|middle" },
    { v: 4, i: "🏆", t: { uz: "Yuqori daraja", ru: "Высокий уровень", en: "Advanced" }, s: { uz: "Erkin gaplashaman", ru: "Говорю свободно", en: "I speak fluently" }, kw: "yuqori|erkin|высок|свободно|advanced|fluent|high" }
  ];
  var SKILLS = [
    { v: "listen", i: "🎧", t: { uz: "Tinglash", ru: "Аудирование", en: "Listening" }, kw: "tingla|eshit|аудир|слуш|listen" },
    { v: "speak", i: "🗣️", t: { uz: "Gapirish", ru: "Говорение", en: "Speaking" }, kw: "gapir|говор|речь|speak|talk" },
    { v: "read", i: "📖", t: { uz: "O'qish", ru: "Чтение", en: "Reading" }, kw: "o'qish|чтен|чита|read" },
    { v: "write", i: "✍️", t: { uz: "Yozish", ru: "Письмо", en: "Writing" }, kw: "yozish|письм|пис|writ" },
    { v: "words", i: "🗂️", t: { uz: "So'z yodlash", ru: "Запоминание слов", en: "Learning words" }, kw: "so'z|слов|word|vocab" },
    { v: "grammar", i: "🧩", t: { uz: "Grammatika", ru: "Грамматика", en: "Grammar" }, kw: "grammat|граммат|grammar" }
  ];
  var WHEN = [
    { v: "1m", i: "🔥", t: { uz: "1 oy ichida", ru: "В течение месяца", en: "Within a month" }, kw: "bir oy|\\b1 oy|один месяц|одного месяц|в течение месяца|^месяц|one month|\\b1 month|a month" },
    { v: "3m", i: "📅", t: { uz: "3 oy ichida", ru: "В течение 3 месяцев", en: "Within 3 months" }, kw: "uch oy|\\b3 oy|три месяц|\\b3 мес|three month|\\b3 month" },
    { v: "6m", i: "🗓️", t: { uz: "6 oy ichida", ru: "В течение 6 месяцев", en: "Within 6 months" }, kw: "olti oy|\\b6 oy|шесть месяц|полгода|\\b6 мес|six month|\\b6 month|half a year" },
    { v: "none", i: "🤔", t: { uz: "Hali bilmayman", ru: "Пока не знаю", en: "Not sure yet" }, kw: "bilmayman|hali|не знаю|пока|not sure|don't know|no idea" }
  ];
  var DAILY = [
    { v: 5, i: "☕", t: { uz: "5 daqiqa", ru: "5 минут", en: "5 minutes" }, s: { uz: "Yengil", ru: "Легко", en: "Light" }, kw: "besh|\\b5\\b|пять|five" },
    { v: 10, i: "🙂", t: { uz: "10 daqiqa", ru: "10 минут", en: "10 minutes" }, s: { uz: "Odatiy", ru: "Обычно", en: "Regular" }, kw: "o'n|\\b10\\b|десят|\\bten\\b" },
    { v: 20, i: "💪", t: { uz: "20 daqiqa", ru: "20 минут", en: "20 minutes" }, s: { uz: "Jiddiy", ru: "Серьёзно", en: "Serious" }, kw: "yigirma|\\b20\\b|двадцат|twenty" },
    { v: 30, i: "🚀", t: { uz: "30+ daqiqa", ru: "30+ минут", en: "30+ minutes" }, s: { uz: "Intensiv", ru: "Интенсивно", en: "Intensive" }, kw: "o'ttiz|\\b30\\b|тридцат|thirty|soat|час|hour" }
  ];
  var QUIZ = [
    { q: { uz: "Bu so'z qanday o'qiladi?", ru: "Как читается это слово?", en: "How is this word read?" }, big: "한국", o: ["hanguk", "nanguk", "hangul", "handuk"], a: 0 },
    { q: { uz: "«Rahmat» koreyscha qaysi?", ru: "Как по-корейски «спасибо»?", en: "Which one means \"thank you\"?" }, o: ["안녕하세요", "감사합니다", "죄송합니다", "괜찮아요"], a: 1 },
    { q: { uz: "Bo'sh joyni to'ldiring: «Men talabaman»", ru: "Заполните пропуск: «Я студент»", en: "Fill in the blank: \"I am a student\"" }, big: "저는 학생(    ).", o: ["있습니다", "합니다", "입니다", "갑니다"], a: 2 }
  ];
  var LEVELS = [
    { t: { uz: "Noldan boshlovchi", ru: "С нуля", en: "Absolute beginner" }, s: { uz: "Hangul alifbosidan boshlaymiz", ru: "Начнём с алфавита хангыль", en: "We'll start with the Hangul alphabet" }, short: "A0" },
    { t: { uz: "Boshlang'ich", ru: "Начальный", en: "Beginner" }, s: { uz: "TOPIK 1 darajasi", ru: "Уровень TOPIK 1", en: "TOPIK level 1" }, short: "A1" },
    { t: { uz: "Boshlang'ich+", ru: "Начальный+", en: "Beginner+" }, s: { uz: "TOPIK 2 · EPS-TOPIK", ru: "TOPIK 2 · EPS-TOPIK", en: "TOPIK 2 · EPS-TOPIK" }, short: "A2" },
    { t: { uz: "O'rta", ru: "Средний", en: "Intermediate" }, s: { uz: "TOPIK 3–4", ru: "TOPIK 3–4", en: "TOPIK 3–4" }, short: "B1" },
    { t: { uz: "Yuqori", ru: "Продвинутый", en: "Advanced" }, s: { uz: "TOPIK 5–6", ru: "TOPIK 5–6", en: "TOPIK 5–6" }, short: "B2+" }
  ];
  var ORD = {
    uz: ["birinchi|\\bbir\\b|\\b1\\b", "ikkinchi|\\bikki\\b|\\b2\\b", "uchinchi|\\buch\\b|\\b3\\b", "to'rtinchi|\\bto'rt\\b|\\b4\\b", "beshinchi|\\bbesh\\b|\\b5\\b"],
    ru: ["перв|один|\\b1\\b", "втор|два|\\b2\\b", "трет|три|\\b3\\b", "четв|\\b4\\b", "пят|\\b5\\b"],
    en: ["first|\\bone\\b|\\b1\\b", "second|\\btwo\\b|\\b2\\b", "third|three|\\b3\\b", "fourth|four|\\b4\\b", "fifth|five|\\b5\\b"]
  };
  var Q = {
    name: { uz: "Ismingiz nima?", ru: "Как вас зовут?", en: "What's your name?" },
    nameS: { uz: "Sizga shunday murojaat qilaman", ru: "Буду обращаться к вам так", en: "That's what I'll call you" },
    goal: { uz: "{n}koreys tilini nima uchun o'rganyapsiz?", ru: "{n}зачем вы учите корейский?", en: "{n}why are you learning Korean?" },
    goalS: { uz: "Shunga qarab dars va testlarni tanlayman", ru: "Подберу уроки и тесты под цель", en: "I'll pick lessons and tests for it" },
    self: { uz: "{n}hozir koreys tilini qanchalik bilasiz?", ru: "{n}насколько вы сейчас знаете корейский?", en: "{n}how much Korean do you know now?" },
    selfS: { uz: "O'zingizni baholang, keyin kichik sinov qilamiz", ru: "Оцените себя, потом небольшой тест", en: "Rate yourself, then a short quiz" },
    quiz: { uz: "Kichik sinov: {i} / 3", ru: "Мини-тест: {i} / 3", en: "Mini quiz: {i} / 3" },
    quizS: { uz: "Bilmasangiz, taxmin qiling: bu faqat darajangizni aniqlash uchun", ru: "Не знаете — угадайте: это только для уровня", en: "If unsure, guess: it's only to find your level" },
    skills: { uz: "{n}qaysi ko'nikmalar sizga qiyin?", ru: "{n}что вам даётся труднее всего?", en: "{n}which skills are hard for you?" },
    skillsS: { uz: "Bir nechtasini tanlashingiz mumkin", ru: "Можно выбрать несколько", en: "You can choose several" },
    when: { uz: "Imtihoningiz qachon?", ru: "Когда у вас экзамен?", en: "When is your exam?" },
    whenS: { uz: "Rejani shunga qarab tuzaman", ru: "Составлю план под это", en: "I'll plan around it" },
    daily: { uz: "Kuniga qancha vaqt ajrata olasiz?", ru: "Сколько времени в день готовы уделять?", en: "How much time can you study a day?" },
    dailyS: { uz: "Kichik, lekin har kungi mashq eng yaxshi natija beradi", ru: "Понемногу, но каждый день — лучший результат", en: "A little every day works best" },
    voice: { uz: "Komiko qaysi ovozda gapirsin?", ru: "Каким голосом говорить Комико?", en: "Which voice should Komiko use?" },
    voiceS: { uz: "Tinglab ko'rib tanlang. Keyin istalgan vaqtda o'zgartirsa bo'ladi", ru: "Послушайте и выберите. Потом можно сменить", en: "Listen and choose. You can change it later" }
  };
  var TOTAL = 8;

  // =====================================================================
  // TANISHUV
  // =====================================================================
  var ob = null;
  function startOnboarding() {
    var old = Profile.get() || {};
    ob = { step: I.chosen() ? 0 : -1, voice: false, d: { name: old.name || "", goal: old.goal || "", self: old.self, quiz: [], qi: 0, skills: old.skills || [], when: old.when || "",
      daily: old.daily || 0, voice: old.voice || "", speed: old.speed || "normal" } };
    var el = document.createElement("div");
    el.className = "onb"; el.id = "onb";
    el.innerHTML = '<div class="onb-top"><button class="onb-back" id="onbBack" aria-label="Back">‹</button>' +
      '<div class="onb-bar"><i id="onbBar"></i></div><span class="onb-n" id="onbN"></span>' +
      '<button class="onb-vt" id="onbVt" hidden></button></div>' +
      '<div class="onb-body" id="onbBody"></div>' +
      '<div class="onb-listen" id="onbListen" hidden></div>' +
      '<div class="onb-foot"><button class="btn onb-go" id="onbNext"></button></div>';
    document.body.appendChild(el);
    document.body.classList.add("onb-open");
    $("onbBack").onclick = function () { if (ob.step > 0) { vTok++; K.stop(); ob.step--; render(-1); } };
    $("onbNext").onclick = next;
    $("onbVt").onclick = function () { setVoiceMode(!ob.voice); };
    render(1);
  }
  function setVoiceMode(on) {
    ob.voice = on; vTok++;
    if (!on) { K.stop(); $("onbListen").hidden = true; }
    updTop();
    if (on && ob.step >= 1) vAsk();
  }
  function updTop() {
    var vt = $("onbVt"); vt.hidden = !(ob.step >= 1 && ob.step <= TOTAL);
    vt.textContent = ob.voice ? "🔇" : "🎙️";
  }
  function canNext() {
    var d = ob.d;
    switch (ob.step) {
      case -1: return false;
      case 1: return d.name.trim().length >= 2;
      case 2: return !!d.goal;
      case 3: return d.self != null;
      case 4: return d.quiz.length >= QUIZ.length && d.quiz.every(function (x) { return x != null; });
      case 5: return d.skills.length > 0;
      case 6: return !!d.when;
      case 7: return !!d.daily;
      case 8: return !!d.voice;
      default: return true;
    }
  }
  function updNext() {
    var b = $("onbNext"); b.disabled = !canNext();
    b.parentNode.hidden = ob.step <= 0;
    b.textContent = ob.step === TOTAL ? T({ uz: "Rejamni ko'rish ✨", ru: "Посмотреть мой план ✨", en: "See my plan ✨" })
      : ob.step > TOTAL ? T({ uz: "Boshlash 🎯", ru: "Начать 🎯", en: "Let's start 🎯" }) : T({ uz: "Davom etish", ru: "Продолжить", en: "Continue" });
  }
  function next() {
    if (!canNext()) return;
    vTok++;
    if (ob.step === 1) ob.d.name = ob.d.name.trim().slice(0, 30);
    if (ob.step > TOTAL) { finish(); return; }
    ob.step++; render(1);
  }
  function opts(list, cur, multi, key) {
    return '<div class="onb-opts">' + list.map(function (o, idx) {
      var on = multi ? cur.indexOf(o.v) >= 0 : cur === o.v;
      return '<button class="onb-opt' + (on ? " on" : "") + '" data-k="' + key + '" data-v="' + esc(String(o.v)) + '"><span class="oi">' + o.i + '</span><span class="ot"><b>' + esc(P(o.t)) + '</b>' +
        (o.s ? '<small>' + esc(P(o.s)) + '</small>' : '') + '</span>' + (multi ? '<span class="ock">' + (on ? "✓" : "") + '</span>' : '<span class="onum">' + (idx + 1) + '</span>') + '</button>';
    }).join("") + '</div>';
  }
  function ask(q, sub) {
    return '<div class="onb-ask">' + K.avatar(64, "live float") + '<div class="onb-q"><div class="onb-qt">' + esc(q) + '</div>' + (sub ? '<div class="onb-qs">' + esc(sub) + '</div>' : '') + '</div></div>';
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function qText(step) {
    var n = ob.d.name ? ob.d.name + ", " : "";
    switch (step) {
      case 1: return T(Q.name);
      case 2: return cap(T(Q.goal, { n: n }));
      case 3: return cap(T(Q.self, { n: n }));
      case 4: return T(Q.quiz, { i: Math.min(ob.d.qi, 2) + 1 });
      case 5: return cap(T(Q.skills, { n: n }));
      case 6: return T(Q.when);
      case 7: return T(Q.daily);
      case 8: return T(Q.voice);
    }
    return "";
  }
  function render(dir) {
    var d = ob.d, s = ob.step, h = "";
    $("onbBack").style.visibility = s > 0 && s <= TOTAL + 1 ? "visible" : "hidden";
    $("onbBar").style.width = Math.max(0, Math.min(100, (s / TOTAL) * 100)) + "%";
    $("onbN").textContent = s >= 1 && s <= TOTAL ? s + " / " + TOTAL : "";
    document.querySelector(".onb-top").style.visibility = s <= 0 ? "hidden" : "visible";
    updTop();
    if (s === -1) {
      h = '<div class="onb-hero">' + K.avatar(120, "live float") + '<h1>Prep Way</h1>' +
        '<p>Tilni tanlang · Выберите язык · Choose your language</p>' +
        '<div class="onb-langs">' + [["uz", "🇺🇿", "O'zbekcha", "Koreys tilini o'zbek tilida"], ["ru", "🇷🇺", "Русский", "Корейский на русском"], ["en", "🇬🇧", "English", "Korean in English"]].map(function (l) {
          return '<button class="onb-lang" data-lang="' + l[0] + '"><span class="lf">' + l[1] + '</span><span class="ot"><b>' + l[2] + '</b><small>' + l[3] + '</small></span><span class="ar">›</span></button>';
        }).join("") + '</div>' +
        '<p class="onb-mini">Har bir yangi so\'z boshqa ikki tilda ham ko\'rsatiladi · Каждое слово — ещё на двух языках · Every word also shows the other two languages</p></div>';
    } else if (s === 0) {
      h = '<div class="onb-hero">' + K.avatar(150, "live float") + '<h1>Annyeong! 👋<br>' + esc(T({ uz: "Men", ru: "Я —", en: "I'm" })) + ' <span class="grad">Komiko</span></h1>' +
        '<p>' + esc(T({ uz: "Koreys tilini birga o'rganamiz: gapirishni, tinglashni va imtihonga tayyorlanishni.", ru: "Будем учить корейский вместе: говорить, слушать и готовиться к экзамену.", en: "Let's learn Korean together: speaking, listening and exam prep." })) + '</p>' +
        '<p class="onb-mini">' + esc(T({ uz: "Avval sizni tanib olay: 8 ta qisqa savol, taxminan 1 daqiqa.", ru: "Сначала познакомимся: 8 коротких вопросов, около минуты.", en: "First let me get to know you: 8 short questions, about 1 minute." })) + '</p>' +
        '<div class="onb-modes"><button class="onb-mode v" id="onbVoiceYes"><span>🎙️</span><b>' + esc(T({ uz: "Komiko bilan ovozli", ru: "Голосом с Комико", en: "Talk with Komiko" })) + '</b><small>' +
        esc(T({ uz: "Savollarni aytaman, siz ovoz bilan javob berasiz", ru: "Я задаю вопросы, вы отвечаете голосом", en: "I ask aloud, you answer by voice" })) + '</small></button>' +
        '<button class="onb-mode" id="onbVoiceNo"><span>👆</span><b>' + esc(T({ uz: "Bosib tanlayman", ru: "Выберу нажатием", en: "Tap to choose" })) + '</b><small>' +
        esc(T({ uz: "Oddiy rejim", ru: "Обычный режим", en: "Standard mode" })) + '</small></button></div>' +
        '<button class="linkbtn" id="onbLang" style="margin-top:14px">🌐 ' + { uz: "O'zbekcha", ru: "Русский", en: "English" }[LG] + ' · ' + esc(T({ uz: "tilni o'zgartirish", ru: "сменить язык", en: "change language" })) + '</button></div>';
    } else if (s === 1) {
      h = ask(qText(1), T(Q.nameS)) +
        '<input class="inp onb-inp" id="onbName" maxlength="30" placeholder="' + esc(T({ uz: "Masalan: Amin", ru: "Например: Амин", en: "e.g. Amin" })) + '" value="' + esc(d.name) + '" autocomplete="given-name">';
    } else if (s === 2) {
      h = ask(qText(2), T(Q.goalS)) + opts(GOALS, d.goal, false, "goal");
    } else if (s === 3) {
      h = ask(qText(3), T(Q.selfS)) + opts(SELF, d.self, false, "self");
    } else if (s === 4) {
      var qi = Math.min(d.qi, QUIZ.length - 1), QQ = QUIZ[qi], ans = d.quiz[qi];
      h = ask(qText(4), T(Q.quizS)) +
        '<div class="onb-quiz"><div class="onb-qq">' + esc(P(QQ.q)) + '</div>' + (QQ.big ? '<div class="onb-big ko">' + esc(QQ.big) + '</div>' : '') +
        '<div class="onb-qo">' + QQ.o.map(function (o, i) {
          var cls = ans == null ? "" : i === QQ.a ? " right" : i === ans ? " wrong" : " dim";
          return '<button class="onb-qb ko' + cls + '" data-qa="' + i + '"' + (ans != null ? " disabled" : "") + '><span class="onum">' + (i + 1) + '</span>' + esc(o) + '</button>';
        }).join("") + '</div>' + (ans != null ? '<div class="onb-qf">' + esc(ans === QQ.a ? T({ uz: "✅ To'g'ri!", ru: "✅ Верно!", en: "✅ Correct!" }) : T({ uz: "Hechqisi yo'q: to'g'ri javob yashil rangda.", ru: "Ничего: верный ответ — зелёный.", en: "No problem: the right answer is in green." })) + '</div>' : '') + '</div>';
    } else if (s === 5) {
      h = ask(qText(5), T(Q.skillsS)) + opts(SKILLS, d.skills, true, "skills");
    } else if (s === 6) {
      h = ask(qText(6), T(Q.whenS)) + opts(WHEN, d.when, false, "when");
    } else if (s === 7) {
      h = ask(qText(7), T(Q.dailyS)) + opts(DAILY, d.daily, false, "daily");
    } else if (s === 8) {
      h = ask(qText(8), T(Q.voiceS)) +
        '<div class="onb-voices">' + [["female", "👩", { uz: "Ayol ovozi", ru: "Женский голос", en: "Female voice" }, { uz: "Yumshoq va aniq", ru: "Мягкий и чёткий", en: "Soft and clear" }],
          ["male", "👨", { uz: "Erkak ovozi", ru: "Мужской голос", en: "Male voice" }, { uz: "Past va xotirjam", ru: "Низкий и спокойный", en: "Deep and calm" }]].map(function (v) {
          return '<div class="onb-voice' + (d.voice === v[0] ? " on" : "") + '" data-voice="' + v[0] + '"><div class="ov-i">' + v[1] + '</div><b>' + esc(P(v[2])) + '</b><small>' + esc(P(v[3])) + '</small>' +
            '<button class="ov-play" data-play="' + v[0] + '">▶ ' + esc(T({ uz: "Tinglash", ru: "Слушать", en: "Listen" })) + '</button></div>';
        }).join("") + '</div>' +
        '<div class="onb-speed"><span>' + esc(T({ uz: "Tezlik:", ru: "Скорость:", en: "Speed:" })) + '</span><button data-speed="slow" class="' + (d.speed === "slow" ? "on" : "") + '">🐢 ' + esc(T({ uz: "Sekin", ru: "Медленно", en: "Slow" })) + '</button><button data-speed="normal" class="' + (d.speed !== "slow" ? "on" : "") + '">🚶 ' + esc(T({ uz: "Odatiy", ru: "Обычно", en: "Normal" })) + '</button></div>';
    } else {
      var lv = calcLevel(), L = LEVELS[lv], goal = GOALS.filter(function (g) { return g.v === d.goal; })[0] || GOALS[4];
      h = '<div class="onb-done">' + K.avatar(110, "live float") + '<h1>' + esc(T({ uz: "Rejangiz tayyor, {n}! 🎉", ru: "Ваш план готов, {n}! 🎉", en: "Your plan is ready, {n}! 🎉" }, { n: d.name })) + '</h1>' +
        '<div class="onb-lv"><span class="lv-badge">' + L.short + '</span><div><b>' + esc(P(L.t)) + '</b><small>' + esc(P(L.s)) + '</small></div></div>' +
        '<div class="onb-sum"><div><span>🎯 ' + esc(T({ uz: "Maqsad", ru: "Цель", en: "Goal" })) + '</span><b>' + esc(P(goal.t)) + '</b></div><div><span>⏱ ' + esc(T({ uz: "Har kuni", ru: "Каждый день", en: "Every day" })) + '</span><b>' + d.daily + ' ' + esc(T({ uz: "daqiqa", ru: "мин", en: "min" })) + '</b></div>' +
        '<div><span>🔈 Komiko</span><b>' + esc(d.voice === "male" ? T({ uz: "Erkak ovozi", ru: "Мужской голос", en: "Male voice" }) : T({ uz: "Ayol ovozi", ru: "Женский голос", en: "Female voice" })) + '</b></div><div><span>✅ ' + esc(T({ uz: "Sinov", ru: "Тест", en: "Quiz" })) + '</span><b>' + quizScore() + ' / 3</b></div></div>' +
        '<div class="onb-plan"><div class="onb-plt">' + esc(T({ uz: "Har kungi rejangiz:", ru: "Ваш план на каждый день:", en: "Your daily plan:" })) + '</div>' + planFor(d.goal, lv).map(function (p) { return '<div>' + esc(p) + '</div>'; }).join("") + '</div></div>';
    }
    var body = $("onbBody");
    body.innerHTML = '<div class="onb-step ' + (dir < 0 ? "from-l" : "from-r") + '">' + h + '</div>';
    bindStep();
    updNext();
    body.scrollTop = 0;
    if (ob.voice && s >= 1) vAsk();
    else $("onbListen").hidden = true;
  }
  function choose(k, v) {
    var d = ob.d;
    d[k] = (k === "self" || k === "daily") ? +v : v;
    $("onbBody").querySelectorAll('.onb-opt[data-k="' + k + '"]').forEach(function (x) { x.classList.toggle("on", x.dataset.v === String(v)); });
    H.haptic("sel"); updNext();
    var st = ob.step;
    setTimeout(function () { if (ob && ob.step === st && canNext() && st >= 2 && st <= 7 && st !== 5) next(); }, ob.voice ? 700 : 320);
  }
  function rerenderQuiet() { var v = ob.voice; ob.voice = false; render(1); ob.voice = v; }
  function answerQuiz(i) {
    var d = ob.d, qi = Math.min(d.qi, QUIZ.length - 1);
    d.quiz[qi] = i;
    H.haptic("note", i === QUIZ[qi].a ? "success" : "warning");
    rerenderQuiet();
    if (ob.voice) { vTok++; K.sayLocal(i === QUIZ[qi].a ? T({ uz: "To'g'ri!", ru: "Верно!", en: "Correct!" }) : T({ uz: "Hechqisi yo'q.", ru: "Ничего страшного.", en: "That's okay." }), I.speechCode()); }
    setTimeout(function () {
      if (!ob || ob.step !== 4) return;
      if (d.qi < QUIZ.length - 1) { d.qi++; render(1); } else if (ob.voice) next();
    }, 1300);
  }
  function bindStep() {
    var d = ob.d, body = $("onbBody");
    body.querySelectorAll("[data-lang]").forEach(function (b) {
      b.onclick = function () { var l = b.dataset.lang; if (l === LG) { try { localStorage.setItem("pwLang", l); } catch (e) {} ob.step = 0; render(1); } else I.setLang(l); };
    });
    if ($("onbVoiceYes")) {
      $("onbVoiceYes").onclick = function () { ob.step = 1; ob.voice = true; render(1); };
      $("onbVoiceNo").onclick = function () { ob.voice = false; ob.step = 1; render(1); };
      $("onbLang").onclick = function () { ob.step = -1; render(-1); };
    }
    var nmI = $("onbName");
    if (nmI) { nmI.oninput = function () { d.name = nmI.value; updNext(); }; nmI.onkeydown = function (e) { if (e.key === "Enter") next(); }; if (!ob.voice) setTimeout(function () { try { nmI.focus(); } catch (e) {} }, 250); }
    body.querySelectorAll(".onb-opt").forEach(function (b) {
      b.onclick = function () {
        var k = b.dataset.k, v = b.dataset.v;
        if (k === "skills") {
          var i = d.skills.indexOf(v); if (i >= 0) d.skills.splice(i, 1); else d.skills.push(v);
          b.classList.toggle("on"); b.querySelector(".ock").textContent = d.skills.indexOf(v) >= 0 ? "✓" : "";
          updNext(); return;
        }
        choose(k, v);
      };
    });
    body.querySelectorAll("[data-qa]").forEach(function (b) { b.onclick = function () { answerQuiz(+b.dataset.qa); }; });
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

  // ---------- Ovozli tanishuv ----------
  var vTok = 0, noVoiceWarned = false;
  function listenBar(state, text) {
    var b = $("onbListen"); b.hidden = false;
    b.className = "onb-listen " + state;
    b.innerHTML = '<button class="onb-mic" id="onbMic">' + (state === "on" ? "⏹" : "🎙️") + '</button><div class="ol-t">' + esc(text) + '</div>';
    $("onbMic").onclick = function () { if (K.isListening()) K.stopListen(); else { vTok++; vListen(); } };
  }
  function vAsk() {
    var tok = ++vTok, s = ob.step;
    if (s < 1 || s > TOTAL + 1) return;
    var text = s > TOTAL ? T({ uz: "Rejangiz tayyor, {n}! Boshlaymizmi?", ru: "Ваш план готов, {n}! Начнём?", en: "Your plan is ready, {n}! Shall we start?" }, { n: ob.d.name }) : qText(s);
    if (s === 4) { var QQ = QUIZ[Math.min(ob.d.qi, 2)]; text = P(QQ.q) + " " + T({ uz: "Variant raqamini ayting.", ru: "Назовите номер варианта.", en: "Say the option number." }); }
    listenBar("wait", "🔊 " + T({ uz: "Komiko gapiryapti…", ru: "Комико говорит…", en: "Komiko is speaking…" }));
    K.sayLocal(text, I.speechCode()).then(function (spoken) {
      if (tok !== vTok || !ob || ob.step !== s) return;
      if (!spoken && !noVoiceWarned) {
        noVoiceWarned = true;
        H.toast(T({ uz: "Telefoningizda o'zbekcha ovoz yo'q: savolni o'qing va javobni ovoz bilan ayting.", ru: "На телефоне нет голоса для этого языка: читайте вопрос и отвечайте голосом.", en: "No voice for this language on your phone: read the question and answer by voice." }));
      }
      if (s > TOTAL) { $("onbListen").hidden = true; return; }
      vListen();
    });
  }
  function vListen() {
    var tok = vTok, s = ob.step;
    listenBar("on", "🎧 " + (s === 8 ? T({ uz: "«Ayol» yoki «erkak» deng", ru: "Скажите «женский» или «мужской»", en: "Say \"female\" or \"male\"" }) : T({ uz: "Tinglayapman… javob bering", ru: "Слушаю… отвечайте", en: "Listening… go ahead" })));
    K.listen(I.speechCode()).then(function (v) {
      if (tok !== vTok || !ob || ob.step !== s) return;
      vHandle(v, s);
    }).catch(function (e) {
      if (tok !== vTok || !ob || ob.step !== s) return;
      listenBar("idle", e.message + " " + T({ uz: "🎙️ ni bosib qayta ayting.", ru: "Нажмите 🎙️ и повторите.", en: "Tap 🎙️ and try again." }));
    });
  }
  function norm(x) { return String(x || "").toLowerCase().replace(/[ʻʼ‘’`]/g, "'").replace(/[.,!?«»"]/g, " "); }
  function matchOpt(list, said) {
    var best = -1, bs = 0, ord = ORD[LG] || ORD.uz, short = said.split("|")[0].trim().split(/\s+/).length <= 2;
    list.forEach(function (o, i) {
      var sc = 0;
      if (o.kw && new RegExp(o.kw, "i").test(said)) sc += 3;
      norm(P(o.t)).split(/\s+/).filter(function (w) { return w.length > 2; }).forEach(function (w) { if (said.indexOf(w.slice(0, Math.max(3, w.length - 2))) >= 0) sc += 1; });
      if (short && ord[i] && new RegExp("(^|\\s)(" + ord[i] + ")", "i").test(said)) sc += 2;
      if (sc > bs) { bs = sc; best = i; }
    });
    return bs > 0 ? best : -1;
  }
  function vHandle(variants, s) {
    var said = norm(variants.join(" | ")), first = variants[0] || "", d = ob.d, hit = -1;
    var again = function () { listenBar("idle", "«" + first + "» — " + T({ uz: "tushunmadim. 🎙️ ni bosib qayta ayting yoki bosib tanlang.", ru: "не понял. Нажмите 🎙️ или выберите вручную.", en: "didn't catch that. Tap 🎙️ or choose by tapping." })); };
    if (s === 1) {
      var n = first.replace(/^(mening ismim|ismim|men|меня зовут|зовут|я|my name is|my name's|i'm|i am|this is|call me)\s+/i, "").replace(/\s*(man|bo'laman)$/i, "").replace(/[.,!?]/g, "").trim().split(/\s+/).slice(0, 2).join(" ");
      if (n.length < 2) { again(); return; }
      d.name = n.charAt(0).toUpperCase() + n.slice(1);
      var inp = $("onbName"); if (inp) inp.value = d.name;
      updNext();
      var hi = T({ uz: "Tanishganimdan xursandman, {n}!", ru: "Приятно познакомиться, {n}!", en: "Nice to meet you, {n}!" }, { n: d.name });
      listenBar("wait", "👋 " + hi); vTok++;
      K.sayLocal(hi, I.speechCode()).then(function () { setTimeout(function () { if (ob && ob.step === 1) next(); }, 600); });
      return;
    }
    if (s === 2) { hit = matchOpt(GOALS, said); if (hit >= 0) { listenBar("wait", "✓ " + P(GOALS[hit].t)); choose("goal", GOALS[hit].v); return; } }
    if (s === 3) { hit = matchOpt(SELF, said); if (hit >= 0) { listenBar("wait", "✓ " + P(SELF[hit].t)); choose("self", SELF[hit].v); return; } }
    if (s === 4) { hit = matchOpt(QUIZ[Math.min(d.qi, 2)].o.map(function (o) { return { t: { uz: o } }; }), said); if (hit >= 0) { answerQuiz(hit); return; } }
    if (s === 5) {
      SKILLS.forEach(function (o) { if (new RegExp(o.kw, "i").test(said) && d.skills.indexOf(o.v) < 0) d.skills.push(o.v); });
      if (d.skills.length) {
        rerenderQuiet();
        listenBar("wait", "✓ " + d.skills.map(function (v) { return P(SKILLS.filter(function (o) { return o.v === v; })[0].t); }).join(", "));
        setTimeout(function () { if (ob && ob.step === 5) next(); }, 1300);
        return;
      }
    }
    if (s === 6) { hit = matchOpt(WHEN, said); if (hit >= 0) { listenBar("wait", "✓ " + P(WHEN[hit].t)); choose("when", WHEN[hit].v); return; } }
    if (s === 7) { hit = matchOpt(DAILY, said); if (hit >= 0) { listenBar("wait", "✓ " + P(DAILY[hit].t)); choose("daily", DAILY[hit].v); return; } }
    if (s === 8) {
      var v = /ayol|xotin|женск|женщ|female|woman|birinchi|перв|first/i.test(said) ? "female" : /erkak|мужск|мужчин|\bmale\b|\bman\b|ikkinchi|втор|second/i.test(said) ? "male" : "";
      if (v) {
        d.voice = v;
        $("onbBody").querySelectorAll(".onb-voice").forEach(function (x) { x.classList.toggle("on", x.dataset.voice === v); });
        updNext(); listenBar("wait", v === "male" ? "👨 ✓" : "👩 ✓"); vTok++;
        K.tmpSpeed = d.speed;
        K.speak("안녕하세요! 저는 코미코예요.", v).then(function () { setTimeout(function () { if (ob && ob.step === 8) next(); }, 500); });
        return;
      }
    }
    again();
  }

  function playVoice(v) { vTok++; K.tmpSpeed = ob.d.speed; K.speak("안녕하세요! 저는 코미코예요. 같이 한국어를 공부해요!", v); }
  function quizScore() { var d = ob.d; return QUIZ.reduce(function (n, q, i) { return n + (d.quiz[i] === q.a ? 1 : 0); }, 0); }
  function calcLevel() { var pts = (ob.d.self || 0) + quizScore(); return pts <= 1 ? 0 : pts <= 3 ? 1 : pts <= 5 ? 2 : pts === 6 ? 3 : 4; }
  function planFor(goal, lv) {
    var p = [];
    if (lv === 0) p.push("🔤 " + T({ uz: "Hangul harflari va oddiy so'zlar", ru: "Буквы хангыль и простые слова", en: "Hangul letters and simple words" }));
    p.push("🎧 " + T({ uz: "«6 daqiqa koreys»: bitta suhbatni tinglash", ru: "«6 минут корейского»: одна беседа", en: "\"6-Minute Korean\": one episode" }));
    p.push(goal === "eps" ? "📝 " + T({ uz: "EPS-TOPIK tezkor test (10 savol)", ru: "Быстрый тест EPS-TOPIK (10 вопросов)", en: "EPS-TOPIK quick test (10 questions)" })
      : goal === "topik" ? "📝 " + T({ uz: "TOPIK I tezkor test (10 savol)", ru: "Быстрый тест TOPIK I (10 вопросов)", en: "TOPIK I quick test (10 questions)" })
      : "🗂️ " + T({ uz: "Kundalik so'zlar kartochkasi", ru: "Карточки бытовых слов", en: "Everyday word cards" }));
    p.push("🤖 " + T({ uz: "Komiko bilan 5 daqiqa ovozli suhbat", ru: "5 минут разговора с Комико", en: "5-minute voice chat with Komiko" }));
    p.push("📷 " + T({ uz: "Daftarga yozish topshirig'i va tekshiruv", ru: "Задание в тетради и проверка", en: "Notebook writing task and check" }));
    return p;
  }
  function finish() {
    var d = ob.d, lv = calcLevel();
    K.stop(); vTok++;
    Profile.set({ name: d.name, goal: d.goal, self: d.self, quiz: quizScore(), level: lv, skills: d.skills, when: d.when,
      daily: d.daily, voice: d.voice, speed: d.speed, lang: LG, created: Date.now() });
    var el = $("onb"); el.classList.add("out");
    setTimeout(function () { el.remove(); document.body.classList.remove("onb-open"); }, 350);
    ob = null; K.tmpSpeed = null;
    renderHome();
    K.speak("좋아요, 시작해요!");
  }

  // =====================================================================
  // BOSH SAHIFA
  // =====================================================================
  function greet() {
    var h = new Date().getHours();
    return h < 5 ? T({ uz: "Xayrli tun", ru: "Доброй ночи", en: "Good night" }) : h < 12 ? T({ uz: "Xayrli tong", ru: "Доброе утро", en: "Good morning" })
      : h < 18 ? T({ uz: "Xayrli kun", ru: "Добрый день", en: "Good afternoon" }) : T({ uz: "Xayrli kech", ru: "Добрый вечер", en: "Good evening" });
  }
  function renderHome() {
    var box = $("homeDash"); if (!box) return;
    var p = Profile.get();
    if (!p || !p.created) { box.innerHTML = ""; return; }
    var day = Activity.day(), mins = Math.floor(day.secs / 60), goalMin = p.daily || 10, pct = Math.min(100, Math.round(mins / goalMin * 100));
    var streak = Activity.streak(), L = LEVELS[p.level | 0] || LEVELS[1];
    var done = day.done || [];
    var msg = pct >= 100 ? T({ uz: "Bugungi maqsad bajarildi! 🎉 Ertaga ham kutaman.", ru: "Цель на сегодня выполнена! 🎉 Жду завтра.", en: "Today's goal done! 🎉 See you tomorrow." }) :
      done.length ? T({ uz: "Zo'r ketyapsiz, {n}! Rejadagi qolgan ishlarni ham bajaramizmi?", ru: "Отлично идёте, {n}! Сделаем остальное?", en: "Great progress, {n}! Shall we finish the plan?" }, { n: p.name }) :
      streak ? T({ uz: "{s} kunlik seriyani uzmaylik! Bugun {m} daqiqa mashq qilamiz.", ru: "Не прервём серию в {s} дн.! Сегодня {m} минут практики.", en: "Let's keep your {s}-day streak! {m} minutes of practice today." }, { s: streak, m: goalMin }) :
      T({ uz: "Bugun {m} daqiqa mashq qilamizmi? Men tayyorman!", ru: "Позанимаемся сегодня {m} минут? Я готов!", en: "Shall we practise {m} minutes today? I'm ready!" }, { m: goalMin });
    var examKey = p.goal === "topik" ? "topik" : "eps";
    var ep = window.PWSix ? PWSix.today() : null;
    var plan = [
      { k: "six", i: "🎧", t: T({ uz: "6 daqiqa koreys", ru: "6 минут корейского", en: "6-Minute Korean" }), s: ep ? ep.title : "", a: 'data-go="six"' },
      { k: "test", i: "⚡", t: (examKey === "eps" ? "EPS-TOPIK" : "TOPIK I") + " " + T({ uz: "tezkor test", ru: "быстрый тест", en: "quick test" }), s: T({ uz: "10 savol · 10 daqiqa", ru: "10 вопросов · 10 минут", en: "10 questions · 10 min" }), a: 'data-start="' + examKey + ':quick"' },
      { k: "chat", i: "🤖", t: T({ uz: "Komiko bilan suhbat", ru: "Разговор с Комико", en: "Talk with Komiko" }), s: T({ uz: "Ovozli mashq · 5 daqiqa", ru: "Голосовая практика · 5 минут", en: "Voice practice · 5 min" }), a: 'data-act="chat"' },
      { k: "hw", i: "📷", t: T({ uz: "Daftar topshirig'i", ru: "Задание в тетради", en: "Notebook task" }), s: T({ uz: "Yozing → rasmga oling → Komiko tekshiradi", ru: "Напишите → сфотографируйте → Комико проверит", en: "Write → take a photo → Komiko checks" }), a: 'data-go="hw"' }
    ];
    var isDone = function (x) { return done.indexOf(x.k) >= 0 || (x.k === "chat" && done.indexOf("speak") >= 0); };
    var nDone = plan.filter(isDone).length;
    box.innerHTML =
      '<div class="dh">' +
        '<div class="dh-glyph" aria-hidden="true">한 글 말<br>배 움 길</div>' +
        '<div class="dh-top"><div><div class="dh-greet">' + esc(greet()) + ',</div><div class="dh-name">' + esc(p.name || "") + ' 👋</div></div>' +
          '<button class="dh-set" id="dhSet" aria-label="Settings">⚙️</button></div>' +
        '<div class="dh-mid">' + K.avatar(86, "live float") + '<div class="dh-bub">' + esc(msg) + '</div></div>' +
        '<div class="dh-stats">' +
          '<div class="st"><b>🔥 ' + streak + '</b><span>' + esc(T({ uz: "kun seriya", ru: "дней подряд", en: "day streak" })) + '</span></div>' +
          '<div class="st"><b>' + mins + '<small>/' + goalMin + '</small></b><span>' + esc(T({ uz: "daqiqa bugun", ru: "мин сегодня", en: "min today" })) + '</span><i class="st-bar"><i style="width:' + pct + '%"></i></i></div>' +
          '<div class="st"><b>' + L.short + '</b><span>' + esc(P(L.t)) + '</span></div>' +
        '</div>' +
      '</div>' +
      (ep ? '<button class="six-card" data-go="six"><div class="sc-l"><span class="sc-tag">🎧 ' + esc(T({ uz: "6 daqiqa koreys", ru: "6 минут корейского", en: "6-Minute Korean" })) + '</span>' +
        '<b>' + esc(ep.title) + '</b><small>' + esc(T({ uz: "Ikki kishi suhbati · yangi so'zlar · PDF", ru: "Диалог двоих · новые слова · PDF", en: "Two-person chat · new words · PDF" })) + '</small></div><span class="sc-play">▶</span></button>' : '') +
      '<div class="sec-h"><h2>' + esc(T({ uz: "Bugungi reja", ru: "План на сегодня", en: "Today's plan" })) + '</h2><span class="chip">' + nDone + ' / ' + plan.length + '</span></div>' +
      '<div class="plan-l">' + plan.map(function (x) {
        var ok = isDone(x);
        return '<button class="pl' + (ok ? " ok" : "") + '" ' + x.a + '><span class="pl-i">' + x.i + '</span><span class="pl-t"><b>' + esc(x.t) + '</b><small>' + esc(x.s) + '</small></span><span class="pl-c">' + (ok ? "✓" : "›") + '</span></button>';
      }).join("") + '</div>' +
      '<div class="tiles">' +
        '<button class="tile t1" data-act="chat"><span>🤖</span><b>Komiko</b><small>' + esc(T({ uz: "Ovozli suhbat", ru: "Голосовой диалог", en: "Voice chat" })) + '</small></button>' +
        '<button class="tile t2" data-go="hw"><span>📷</span><b>' + esc(T({ uz: "Daftar", ru: "Тетрадь", en: "Notebook" })) + '</b><small>' + esc(T({ uz: "Rasm bilan tekshiruv", ru: "Проверка по фото", en: "Photo check" })) + '</small></button>' +
        '<button class="tile t3" data-go="speak"><span>🎯</span><b>' + esc(T({ uz: "Talaffuz", ru: "Произношение", en: "Pronunciation" })) + '</b><small>' + esc(T({ uz: "Gapni ayting, baho oling", ru: "Скажите фразу — получите оценку", en: "Say it, get a score" })) + '</small></button>' +
        '<button class="tile t5" id="dhDict"><span>📖</span><b>' + esc(T({ uz: "Lug'at", ru: "Словарь", en: "Dictionary" })) + '</b><small>' + esc(T({ uz: "Koreys ⇄ o'zbek · rus · ingliz: istalgan so'zni tarjima qiling", ru: "Корейский ⇄ узбекский · русский · английский: переводите любое слово", en: "Korean ⇄ Uzbek · Russian · English: translate any word" })) + '</small></button>' +
        '<button class="tile t4" data-go="books"><span>📚</span><b>' + esc(T({ uz: "Kitoblar", ru: "Книги", en: "Books" })) + '</b><small>' + esc(T({ uz: "O'z darsligingiz", ru: "Ваш учебник", en: "Your textbook" })) + '</small></button>' +
      '</div>';
    $("dhSet").onclick = settings;
    if ($("dhDict")) $("dhDict").onclick = function () { if (window.PWDict) PWDict.open(""); };
    box.querySelectorAll('[data-act="chat"]').forEach(function (b) { b.onclick = function () { K.openChat(); }; });
    var hello = $("hello"); if (hello) hello.textContent = "";
  }
  function settings() {
    var p = Profile.get() || {};
    K.sheet('<h3 style="margin:0 0 12px">⚙️ ' + esc(T({ uz: "Sozlamalar", ru: "Настройки", en: "Settings" })) + '</h3>' +
      '<div class="note" style="font-weight:700;margin-bottom:6px">🌐 ' + esc(T({ uz: "Ilova tili", ru: "Язык приложения", en: "App language" })) + '</div><div class="onb-speed" style="justify-content:flex-start">' +
      [["uz", "🇺🇿 O'zbekcha"], ["ru", "🇷🇺 Русский"], ["en", "🇬🇧 English"]].map(function (l) { return '<button data-sl="' + l[0] + '" class="' + (LG === l[0] ? "on" : "") + '">' + l[1] + '</button>'; }).join("") + '</div>' +
      '<div style="height:12px"></div>' +
      '<button class="lsn" id="stVoice"><span class="n">🔈</span><span style="flex:1"><b>' + esc(T({ uz: "Komiko ovozi", ru: "Голос Комико", en: "Komiko's voice" })) + '</b><div class="s">' +
        esc(p.voice === "male" ? T({ uz: "Erkak", ru: "Мужской", en: "Male" }) : T({ uz: "Ayol", ru: "Женский", en: "Female" })) + ' · ' + esc(p.speed === "slow" ? T({ uz: "sekin", ru: "медленно", en: "slow" }) : T({ uz: "odatiy", ru: "обычно", en: "normal" })) + '</div></span>›</button>' +
      '<div style="height:8px"></div>' +
      '<div class="note" style="font-weight:700;margin-bottom:6px">⏱ ' + esc(T({ uz: "Kunlik maqsad", ru: "Цель на день", en: "Daily goal" })) + '</div><div class="onb-speed" style="justify-content:flex-start">' +
      [5, 10, 20, 30].map(function (m) { return '<button data-dm="' + m + '" class="' + ((p.daily || 10) === m ? "on" : "") + '">' + m + ' ' + esc(T({ uz: "daq", ru: "мин", en: "min" })) + '</button>'; }).join("") + '</div>' +
      '<div style="height:12px"></div>' +
      '<button class="lsn" id="stRedo"><span class="n">🔄</span><span style="flex:1"><b>' + esc(T({ uz: "Tanishuv savollarini qaytadan", ru: "Пройти знакомство заново", en: "Redo the intro questions" })) + '</b><div class="s">' + esc(T({ uz: "Darajani qayta aniqlash", ru: "Заново определить уровень", en: "Re-check your level" })) + '</div></span>›</button>' +
      '<p class="note" style="font-size:11.5px;margin-top:14px;opacity:.75">' + esc(T({ uz: "Chizmalar", ru: "Рисунки", en: "Drawings" })) + ': OpenMoji — CC BY-SA 4.0</p>');
    $("stVoice").onclick = function () { K.closeSheet(); K.voicePicker(); };
    $("stRedo").onclick = function () { K.closeSheet(); startOnboarding(); };
    document.querySelectorAll("#kSheet [data-sl]").forEach(function (b) { b.onclick = function () { I.setLang(b.dataset.sl); }; });
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
