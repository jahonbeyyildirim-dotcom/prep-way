/* Prep Way — DEMO rejim: serversiz ishlaydi. Server o'rniga namunaviy javoblar qaytaradi.
   Faqat app.config.json da "demo": true bo'lganda yoqiladi. Haqiqiy AI baholash serverda ishlaydi. */
(function () {
  if (!(window.PW && window.PW.demo)) return;

  var KEY = "pwDemoBooks";
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function save(b) { try { localStorage.setItem(KEY, JSON.stringify(b)); } catch (e) {} }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function fail(msg) { return Promise.reject(new Error(msg)); }
  var isKo = function (s) { return /[가-힣]/.test(s || ""); };

  var LESSONS = [
    { n: 1, title: "제1과 인사", summary_uz: "Salomlashish va o'zini tanishtirish", pages: "8–15" },
    { n: 2, title: "제2과 가족", summary_uz: "Oila a'zolari va ularni tanishtirish", pages: "16–23" },
    { n: 3, title: "제3과 일상생활", summary_uz: "Kundalik ishlar va vaqt", pages: "24–31" }
  ];
  var LESSON = {
    title: "제1과 인사",
    intro_uz: "Bu darsda salomlashish, o'zini tanishtirish va 은/는 · 입니다 grammatikasini o'rganamiz.",
    vocab: [
      { ko: "안녕하세요", rom: "annyeonghaseyo", uz: "Assalomu alaykum" },
      { ko: "반갑습니다", rom: "bangapseumnida", uz: "Tanishganimdan xursandman" },
      { ko: "이름", rom: "ireum", uz: "ism" },
      { ko: "학생", rom: "haksaeng", uz: "talaba, o'quvchi" },
      { ko: "선생님", rom: "seonsaengnim", uz: "o'qituvchi" },
      { ko: "사람", rom: "saram", uz: "odam, kishi" },
      { ko: "회사원", rom: "hoesawon", uz: "ofis xodimi" },
      { ko: "나라", rom: "nara", uz: "davlat, mamlakat" }
    ],
    grammar: [
      { pattern: "N은/는 N입니다", explain_uz: "\"... — ...dir\" degan tasdiq gap. Oxirgi bo'g'inda undosh (받침) bo'lsa 은, bo'lmasa 는 qo'shiladi.",
        examples: [{ ko: "저는 학생입니다.", uz: "Men talabaman." }, { ko: "선생님은 한국 사람입니다.", uz: "O'qituvchi koreys." }] },
      { pattern: "N입니까?", explain_uz: "Rasmiy so'roq gap: \"...mi?\" Javob: 네 (ha) yoki 아니요 (yo'q).",
        examples: [{ ko: "학생입니까?", uz: "Talabamisiz?" }] }
    ],
    reading: { ko: "안녕하세요. 저는 아민입니다.\n우즈베키스탄 사람입니다.\n저는 대학생입니다.\n만나서 반갑습니다.",
               uz: "Assalomu alaykum. Men Aminman.\nO'zbekistonlikman.\nMen talabaman.\nTanishganimdan xursandman." },
    exercises: [
      { q: "\"Men talabaman\" koreyscha qanday?", options: ["저는 학생입니다.", "저는 선생님입니다.", "학생이 없습니다.", "학교에 갑니다."], answer: 0, explain_uz: "학생 — talaba, 입니다 — \"...dir\"." },
      { q: "선생님(  ) 한국 사람입니다.", options: ["는", "은", "을", "이"], answer: 1, explain_uz: "선생님 undosh (ㅁ) bilan tugaydi, shuning uchun 은." },
      { q: "\"반갑습니다\" nimani anglatadi?", options: ["Xayr", "Rahmat", "Tanishganimdan xursandman", "Kechirasiz"], answer: 2, explain_uz: "Tanishuvda aytiladigan odob iborasi." },
      { q: "저(  ) 회사원입니다.", options: ["은", "는", "이", "가"], answer: 1, explain_uz: "저 unli bilan tugaydi, shuning uchun 는." }
    ],
    speaking: [
      { ko: "안녕하세요. 저는 아민입니다.", uz: "Assalomu alaykum. Men Aminman." },
      { ko: "저는 우즈베키스탄 사람입니다.", uz: "Men o'zbekistonlikman." },
      { ko: "만나서 반갑습니다.", uz: "Tanishganimdan xursandman." }
    ],
    tips_uz: ["Yangi so'zlarni ovoz chiqarib 3 marta takrorlang.", "은/는 qoidasini o'z ismingiz bilan mashq qiling."]
  };
  var REPLIES = {
    intro: [["반가워요! 어느 나라 사람이에요?", "Tanishganimdan xursandman! Qaysi davlatdansiz?"], ["한국어를 얼마나 공부했어요?", "Koreys tilini qancha vaqt o'qidingiz?"], ["왜 한국어를 배우고 싶어요?", "Nega koreys tilini o'rganmoqchisiz?"]],
    work: [["좋아요. 오늘은 3번 기계에서 일하세요.", "Yaxshi. Bugun 3-mashinada ishlang."], ["안전모를 꼭 쓰세요. 질문 있어요?", "Kaskani albatta kiying. Savolingiz bormi?"]],
    shop: [["사과는 한 개에 천 원이에요. 몇 개 드릴까요?", "Olma donasi ming von. Nechta beray?"], ["봉투 필요하세요?", "Paket kerakmi?"]],
    hospital: [["언제부터 아팠어요?", "Qachondan beri og'riyapti?"], ["약을 하루에 세 번 드세요.", "Dorini kuniga uch marta iching."]],
    daily: [["저는 주말에 보통 영화를 봐요. 당신은요?", "Men dam olish kunlari odatda kino ko'raman. Sizchi?"], ["내일 날씨가 어때요?", "Ertaga ob-havo qanday?"]],
    free: [["재미있네요! 더 이야기해 주세요.", "Qiziq ekan! Yana gapirib bering."], ["좋은 질문이에요. 다른 질문 있어요?", "Yaxshi savol. Boshqa savolingiz bormi?"]]
  };
  var turn = 0;
  var WORDS = [
    { ko: "모색하다", rom: "mosaekhada", uz: "(yechim) izlamoq", example_ko: "해결 방안을 모색해야 합니다.", example_uz: "Yechim yo'lini izlash kerak." },
    { ko: "직면하다", rom: "jingmyeonhada", uz: "duch kelmoq", example_ko: "우리는 큰 문제에 직면했다.", example_uz: "Biz katta muammoga duch keldik." },
    { ko: "확산되다", rom: "hwaksandoeda", uz: "keng tarqalmoq", example_ko: "소문이 빠르게 확산되었다.", example_uz: "Mish-mish tez tarqaldi." },
    { ko: "뒷받침하다", rom: "dwitbatchimhada", uz: "qo'llab-quvvatlamoq, asoslamoq", example_ko: "자료가 주장을 뒷받침한다.", example_uz: "Ma'lumotlar fikrni asoslaydi." },
    { ko: "급격하다", rom: "geupgyeokhada", uz: "keskin, tez", example_ko: "기온이 급격하게 떨어졌다.", example_uz: "Harorat keskin tushib ketdi." },
    { ko: "제약", rom: "jeyak", uz: "cheklov", example_ko: "시간의 제약이 있다.", example_uz: "Vaqt cheklovi bor." }
  ];

  function fd(o) { return (o && o.body instanceof FormData) ? o.body : null; }

  window.PW_DEMO_API = function (path, opt) {
    opt = opt || {};
    var m = (opt.method || (opt.body ? "POST" : "GET")).toUpperCase();
    var f = fd(opt), j = opt.json || {};
    if (path === "/api/me") return Promise.resolve({ name: "Demo", premium: false, premium_until: 0, limits: { ai: 15, tts: 60, books: 3 }, usage: { ai: 0, tts: 0 }, bot_username: "", premium_stars: 200 });
    if (path === "/api/tts") return fail("Demo: server ovozi yo'q");
    if (path === "/api/speech") {
      var target = String(f && f.get("target") || "");
      var syl = target.split(""), idxs = [];
      syl.forEach(function (c, i) { if (isKo(c)) idxs.push(i); });
      var bad = idxs.length > 3 ? idxs[rnd(1, idxs.length - 2)] : -1;
      var acc = bad < 0 ? 100 : Math.round(100 - 100 / idxs.length * 0.6);
      var pron = rnd(68, 88), flu = rnd(70, 90);
      return wait(1200).then(function () { return {
        transcript: target, accuracy: acc, overall: Math.round(0.45 * acc + 0.35 * pron + 0.2 * flu), pronunciation: pron, fluency: flu,
        marks: syl.map(function (c, i) { return { ch: c, ok: i !== bad }; }),
        problems: bad < 0 ? [] : [{ part: syl[bad], issue_uz: "Bu bo'g'in aniq eshitilmadi: namunani tinglab, sekinroq takrorlang." }],
        feedback_uz: "Demo: bu namunaviy baho. Haqiqiy versiyada AI ovozingizni tinglab baholaydi.",
        tips_uz: ["Avval sekin, keyin odatiy tezlikda ayting.", "Namunani 3 marta tinglab, keyin takrorlang."] }; });
    }
    if (path === "/api/chat") {
      var text = String(f && f.get("text") || "저는 우즈베키스탄 사람이에요");
      var topic = String(f && f.get("topic") || "free"), list = REPLIES[topic] || REPLIES.free, r = list[turn++ % list.length];
      var ko = isKo(text);
      return wait(900).then(function () { return {
        user_text: text, corrected_ko: ko ? text : "", correction_uz: "",
        scores: ko ? { grammar: rnd(75, 95), vocabulary: rnd(70, 92), pronunciation: f && f.get("audio") ? rnd(65, 88) : null } : {},
        help_uz: ko ? "" : "Demo: haqiqiy versiyada AI savolingizga o'zbekcha javob beradi va koreyscha qanday aytilishini o'rgatadi.",
        reply_ko: r[0], reply_uz: r[1] }; });
    }
    if (path === "/api/advice") return wait(1000).then(function () { return {
      summary_uz: "Demo maslahat: haqiqiy versiyada AI test va talaffuz natijalaringizni tahlil qiladi.",
      strengths_uz: ["O'qish bo'limi"], weaknesses_uz: ["Tinglash", "Talaffuz: 받침"],
      tips: [{ title_uz: "Har kuni 15 daqiqa tinglang", text_uz: "Qisqa dialoglarni avval matnsiz, keyin matn bilan tinglang." },
             { title_uz: "Talaffuz mashqi", text_uz: "Gapirish bo'limida «Qiyin talaffuz» darajasini kuniga 5 ta gap bilan mashq qiling." }],
      week_plan: [{ day: "1-kun", task_uz: "EPS mock test + xatolarni ko'rib chiqish" }, { day: "2-kun", task_uz: "20 ta yangi so'z + talaffuz" },
                  { day: "3-kun", task_uz: "AI suhbatdosh: «Ish joyida» mavzusi" }, { day: "4-kun", task_uz: "Tinglash: 10 ta audio savol" },
                  { day: "5-kun", task_uz: "Kitob bo'yicha 1 ta dars" }, { day: "6-kun", task_uz: "To'liq mock test" }, { day: "7-kun", task_uz: "Takrorlash va dam olish" }] }; });
    if (path === "/api/words") return wait(800).then(function () {
      var ex = j.exclude || [];
      return { words: WORDS.filter(function (w) { return ex.indexOf(w.ko) < 0; }) };
    });
    if (path === "/api/books" && m === "GET") return Promise.resolve({ books: load(), limit: 3 });
    if (path === "/api/books" && m === "POST") {
      var file = f && f.get("file");
      var name = (file && file.name) || "kitob.pdf";
      if (!/\.(pdf|txt|jpe?g|png|webp)$/i.test(name)) return fail("Faqat PDF, TXT yoki rasm (JPG, PNG) qabul qilinadi.");
      return wait(2200).then(function () {
        var books = load();
        if (books.length >= 3) throw new Error("Demo: eng ko'pi 3 ta kitob.");
        var b = { id: "d" + Date.now(), title: name.replace(/\.[^.]+$/, ""), filename: name, level: "Boshlang'ich (TOPIK 1–2)",
                  lessons: LESSONS, lesson_count: LESSONS.length, created: Math.floor(Date.now() / 1000) };
        books.unshift(b); save(books);
        return { book: b };
      });
    }
    var mb = path.match(/^\/api\/books\/(\w+)(\/lessons\/(\d+))?$/);
    if (mb) {
      var books2 = load(), bk = books2.filter(function (x) { return x.id === mb[1]; })[0];
      if (!bk) return fail("Kitob topilmadi.");
      if (m === "DELETE") { save(books2.filter(function (x) { return x.id !== mb[1]; })); return Promise.resolve({ ok: true }); }
      if (mb[3]) {
        var info = LESSONS.filter(function (l) { return l.n === +mb[3]; })[0] || LESSONS[0];
        var L = JSON.parse(JSON.stringify(LESSON)); L.title = info.title; L.n = info.n;
        return wait(1200).then(function () { return { lesson: L }; });
      }
      return Promise.resolve({ book: bk });
    }
    return fail("Demo versiyada bu funksiya yo'q.");
  };
})();
