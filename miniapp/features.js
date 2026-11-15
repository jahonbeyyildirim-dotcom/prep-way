/* Prep Way — AI bo'limlari: talaffuz baholash, AI suhbatdosh (ovozli assistent),
   kitoblar va ular bo'yicha darslar, shaxsiy maslahatlar, AI so'zlar. index.html dagi window.HY dan foydalanadi. */
(function () {
  var H = window.HY;
  if (!H) return;
  var $ = H.$, esc = H.esc, toast = H.toast;

  function loading(msg) { return '<div class="loading"><span class="spin"></span>' + esc(msg) + '</div>'; }
  function errBox(msg) { return '<div class="err">⚠️ ' + esc(msg) + '</div>'; }
  function needServer(el) {
    if (H.SERVER.ok) return true;
    if (el) el.innerHTML = errBox("Bu bo'lim AI server orqali ishlaydi. Ilovani Telegram'dagi bot orqali oching.");
    else toast("Bu bo'lim AI server orqali ishlaydi. Ilovani bot orqali oching.");
    return false;
  }
  function say(ko) { return '<button class="mini" data-say="' + esc(ko) + '" aria-label="Tinglash">🔊</button>'; }
  function scoreColor(v) { return v >= 80 ? "var(--green)" : v >= 55 ? "#b7791f" : "var(--red)"; }

  // Har qanday [data-say] tugmasi koreyscha matnni o'qib beradi
  document.addEventListener("click", function (e) {
    var s = e.target.closest("[data-say]");
    if (s) { e.stopPropagation(); H.speak(s.getAttribute("data-say")); }
  });

  // =====================================================================
  // MASLAHATLAR (doimiy) + AI shaxsiy maslahat
  // =====================================================================
  var TIPS = [
    ["🎧 Tinglash", ["Har kuni 15–20 daqiqa tinglang: avval matnsiz, keyin matn bilan.",
      "Audio boshlanishidan oldin savol va javob variantlarini o'qib oling.",
      "Raqamlar, vaqt, joy va odam nomlariga alohida e'tibor bering.",
      "Soya usuli (shadowing): audio bilan bir vaqtda takrorlang."]],
    ["📖 O'qish", ["Avval savolni, keyin matnni o'qing: nima qidirayotganingizni biling.",
      "그런데, 하지만 (lekin), 그래서 (shuning uchun) kabi bog'lovchilar ko'pincha javobga ishora qiladi.",
      "Bitta savolga uzoq qolib ketmang: vaqtni teng taqsimlang.",
      "Notanish so'zni kontekstdan taxmin qilishni mashq qiling."]],
    ["✍️ Yozish (TOPIK II)", ["51–52-savollar: bo'sh joyni grammatik jihatdan to'g'ri va qisqa to'ldiring.",
      "53-savol: grafik yoki jadvalni 200–300 belgida tasvirlang.",
      "54-savol: 600–700 belgilik insho: kirish, asosiy qism, xulosa.",
      "Yozma uslubda -다 / -ㄴ다 / -는다 shaklidan foydalaning, -요 dan emas."]],
    ["🗣 Gapirish va talaffuz", ["O'zingizni yozib, namuna bilan solishtiring: Komiko bo'limidagi talaffuz mashqi aynan shu uchun.",
      "Asosiy qoidalarni o'rganing: 연음 (bo'g'inga o'tish), 비음화 (burun tovushiga o'tish), 경음화 (qattiqlashish).",
      "Sekin va aniq gapirish tez, lekin noaniq gapirishdan yaxshiroq baholanadi.",
      "Komiko bilan har kuni 5 daqiqa gaplashing."]],
    ["🗂️ So'z yodlash", ["Kuniga 15–20 ta so'z yodlang va 1, 3, 7 kundan keyin takrorlang.",
      "So'zni yakka emas, gap ichida o'rganing: kartochkadagi misollarni ovoz chiqarib o'qing.",
      "Xitoy-koreys o'zaklarini biling: 학 = o'qish (학교, 학생, 학습).",
      "Yuqori darajada maqol va 사자성어 ham uchraydi: ularni alohida yodlang."]],
    ["🏭 EPS-TOPIK", ["Imtihon rasmiy standart darslik asosida tuziladi: avvalo shu darslikni o'rganing.",
      "Ishlamoqchi bo'lgan sohangiz (ishlab chiqarish, qurilish, qishloq xo'jaligi) so'zlarini alohida o'rganing.",
      "Xavfsizlik belgilari va asbob-uskuna nomlari ko'p so'raladi.",
      "Haftasiga kamida 2 marta to'liq mock test ishlang."]]
  ];
  $("tipsList").innerHTML = TIPS.map(function (t) {
    return '<details class="tip"><summary>' + esc(t[0]) + '</summary><ul>' +
      t[1].map(function (li) { return '<li class="ko">' + esc(li) + '</li>'; }).join("") + '</ul></details>';
  }).join("");

  $("advBtn").onclick = function () {
    var out = $("advOut");
    if (!needServer(out)) return;
    var h = H.hist();
    var stats = { tests: h.tests, speaking: h.speak, mistakes_in_notebook: H.mistakesCount(),
      today: new Date().toISOString().slice(0, 10) };
    var btn = this; btn.disabled = true;
    out.innerHTML = loading("AI natijalaringizni tahlil qilmoqda…");
    H.api("/api/advice", { json: stats }).then(function (a) {
      var html = '<div style="margin-top:14px">';
      if (a.summary_uz) html += '<p style="margin:0 0 10px;font-weight:600">' + esc(a.summary_uz) + '</p>';
      if ((a.strengths_uz || []).length) html += '<div class="ok-box" style="margin-bottom:8px">💪 ' + a.strengths_uz.map(esc).join(" · ") + '</div>';
      if ((a.weaknesses_uz || []).length) html += '<div class="err" style="margin-bottom:8px">🎯 ' + a.weaknesses_uz.map(esc).join(" · ") + '</div>';
      (a.tips || []).forEach(function (t) {
        html += '<div style="margin-top:10px"><b>' + esc(t.title_uz || "") + '</b><div class="ko" style="font-size:14.5px">' + esc(t.text_uz || "") + '</div></div>';
      });
      if ((a.week_plan || []).length) {
        html += '<div class="sec-t">7 kunlik reja</div><div class="plan">' + a.week_plan.map(function (d) {
          return '<div><b>' + esc(d.day || "") + '</b><span class="ko">' + esc(d.task_uz || "") + '</span></div>';
        }).join("") + '</div>';
      }
      out.innerHTML = html + '</div>';
    }).catch(function (e) { out.innerHTML = errBox(e.message); })
      .then(function () { btn.disabled = false; });
  };

  // =====================================================================
  // OVOZ YOZISH (mikrofon)
  // =====================================================================
  var Rec = { mr: null, stream: null, chunks: [], active: false, t0: 0, timer: null, auto: null };
  var MAX_REC = 30; // soniya

  function recStart(onTick) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder)
      return Promise.reject(new Error("NOSUPPORT"));
    return navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      var types = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
      var mime = "";
      for (var i = 0; i < types.length; i++) {
        if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(types[i])) { mime = types[i]; break; }
      }
      var mr = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      Rec.mr = mr; Rec.stream = stream; Rec.chunks = []; Rec.active = true; Rec.t0 = Date.now();
      mr.ondataavailable = function (ev) { if (ev.data && ev.data.size) Rec.chunks.push(ev.data); };
      mr.start();
      Rec.timer = setInterval(function () { onTick && onTick(Math.floor((Date.now() - Rec.t0) / 1000)); }, 250);
      return mr;
    });
  }
  function recStop() {
    return new Promise(function (resolve) {
      var mr = Rec.mr;
      clearInterval(Rec.timer); clearTimeout(Rec.auto);
      if (!mr || mr.state === "inactive") { Rec.active = false; resolve(null); return; }
      mr.onstop = function () {
        try { Rec.stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {}
        var type = (mr.mimeType || "audio/webm");
        var blob = new Blob(Rec.chunks, { type: type });
        var ext = /mp4|aac|m4a/.test(type) ? ".m4a" : /ogg/.test(type) ? ".ogg" : ".webm";
        Rec.active = false; Rec.mr = null;
        resolve({ blob: blob, ext: ext, secs: (Date.now() - Rec.t0) / 1000 });
      };
      mr.stop();
    });
  }
  function recCancel() { if (Rec.active) recStop(); }

  function micFallback(err) {
    var box = $("micFallback");
    var denied = err && (err.name === "NotAllowedError" || err.name === "SecurityError");
    if (window.PW && PW.native) {
      box.innerHTML = denied
        ? "🎙️ Mikrofonga ruxsat berilmadi. Telefon sozlamalarida: <b>Ilovalar → Prep Way → Ruxsatlar → Mikrofon</b> ni yoqing, keyin qayta urinib ko'ring."
        : "🎙️ Bu qurilmada ovoz yozib bo'lmadi. Ilovani qayta ishga tushirib ko'ring.";
      box.hidden = false;
      return;
    }
    box.innerHTML = (denied
      ? "🎙️ Mikrofonga ruxsat berilmadi. Telefon sozlamalarida Telegram uchun mikrofonni yoqing."
      : "🎙️ Bu qurilmada ilova ichida ovoz yozib bo'lmadi.") +
      '<div style="margin-top:8px;font-weight:500;color:var(--ink)">Muqobil yo\'l: botga koreyscha <b>ovozli xabar</b> yuboring. Bot ham xuddi shunday baholaydi va ovozli javob qaytaradi.</div>' +
      '<button class="btn" id="toBot" style="margin-top:10px">💬 Botga o\'tish</button>';
    box.hidden = false;
    $("toBot").onclick = function () {
      var link = "https://t.me/" + H.botUser();
      if (H.inTG) { try { H.tg.openTelegramLink(link); return; } catch (e) {} }
      toast("Botga yozing: @" + H.botUser());
    };
  }

  // Mikrofon tugmasini boshqarish: 1-bosish yozadi, 2-bosish to'xtatadi va onDone(audio) chaqiradi
  function bindMic(btn, hintEl, idleHint, onDone) {
    btn.onclick = function () {
      if (btn.dataset.busy) return;
      if (!needServer(null)) return;
      if (Rec.active) {
        btn.classList.remove("rec"); btn.textContent = "🎙️";
        recStop().then(function (a) {
          if (!a || a.secs < 0.6) { if (hintEl) hintEl.textContent = "Juda qisqa. Qayta urinib ko'ring."; return; }
          onDone(a);
        });
        return;
      }
      $("micFallback").hidden = true;
      recStart(function (s) {
        if (hintEl) hintEl.textContent = "● Yozilmoqda 0:" + (s < 10 ? "0" : "") + s + " — tugatish uchun bosing";
      }).then(function () {
        H.haptic("impact", "light");
        btn.classList.add("rec"); btn.textContent = "⏹";
        Rec.auto = setTimeout(function () { if (Rec.active) btn.click(); }, MAX_REC * 1000);
      }).catch(function (e) {
        micFallback(e);
        if (hintEl) hintEl.textContent = idleHint;
      });
    };
  }
  function setBusy(btn, on) {
    if (on) { btn.dataset.busy = "1"; btn.disabled = true; btn.innerHTML = '<span class="spin"></span>'; }
    else { delete btn.dataset.busy; btn.disabled = false; btn.textContent = "🎙️"; }
  }

  // =====================================================================
  // GAPIRISH: TALAFFUZ
  // =====================================================================
  var SENT = {
    beg: [
      ["안녕하세요. 저는 우즈베키스탄 사람입니다.", "Assalomu alaykum. Men o'zbekistonlikman."],
      ["만나서 반갑습니다.", "Tanishganimdan xursandman."],
      ["이거 얼마예요?", "Bu qancha turadi?"],
      ["화장실이 어디에 있어요?", "Hojatxona qayerda?"],
      ["한국어를 공부하고 있어요.", "Koreys tilini o'rganyapman."]
    ],
    eps: [
      ["안전모를 꼭 쓰세요.", "Xavfsizlik kaskasini albatta kiying."],
      ["기계가 고장 났어요.", "Mashina buzilib qoldi."],
      ["손을 다쳐서 병원에 가야 해요.", "Qo'limni jarohatladim, kasalxonaga borishim kerak."],
      ["오늘 잔업이 있어요?", "Bugun qo'shimcha ish bormi?"],
      ["이 상자를 창고에 옮겨 주세요.", "Bu qutini omborga olib boring."]
    ],
    adv: [
      ["고령화 문제를 해결하기 위해 다양한 방안을 모색해야 합니다.", "Aholi qarishi muammosini hal qilish uchun turli yo'llarni izlash kerak."],
      ["무리한 개발은 심각한 환경 파괴를 초래할 수 있습니다.", "Haddan oshgan qurilish jiddiy tabiat buzilishiga olib kelishi mumkin."],
      ["지속 가능한 발전을 위해서는 정부와 시민의 협력이 필요합니다.", "Barqaror rivojlanish uchun hukumat va fuqarolar hamkorligi zarur."],
      ["나이를 막론하고 누구나 이 프로그램에 참여할 수 있습니다.", "Yoshidan qat'i nazar, har kim bu dasturda qatnasha oladi."]
    ],
    hard: [
      ["맛있어요.", "Mazali.", "Talaffuzi [마시써요]: ㅅ keyingi bo'g'inga o'tadi (연음)."],
      ["감사합니다.", "Rahmat.", "Talaffuzi [감사함니다]: ㅂ+ㄴ → ㅁ+ㄴ (비음화)."],
      ["같이 갑시다.", "Birga boraylik.", "Talaffuzi [가치 갑씨다]: ㅌ+이 → 치, ㅂ+ㅅ → ㅆ."],
      ["책을 읽었어요.", "Kitob o'qidim.", "읽었어요 → [일거써요]: ㄺ dan ㄹ qoladi, ㄱ keyingi bo'g'inga o'tadi."],
      ["신라 시대", "Silla davri", "Talaffuzi [실라]: ㄴ+ㄹ → ㄹ+ㄹ (유음화)."],
      ["좋아해요.", "Yaxshi ko'raman.", "Talaffuzi [조아해요]: ㅎ unli oldidan tushib qoladi."],
      ["국물이 맛있네요.", "Sho'rva mazali ekan.", "Talaffuzi [궁무리 마신네요]: ㄱ+ㅁ → ㅇ+ㅁ, ㅆ+ㄴ → ㄴ+ㄴ."]
    ]
  };
  var sp = { lvl: "beg", i: 0, custom: null };

  function curSentence() { return sp.custom || SENT[sp.lvl][sp.i % SENT[sp.lvl].length]; }
  function renderSentence() {
    var s = curSentence();
    $("spKo").textContent = s[0];
    $("spUz").textContent = s[1] || "";
    $("spNote").textContent = s[2] || "";
    $("spResult").innerHTML = "";
    $("spHint").textContent = "Bosing, gapni o'qing, tugatgach yana bosing";
  }
  $("spLevels").querySelectorAll("button").forEach(function (b) {
    b.onclick = function () {
      $("spLevels").querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); });
      sp.lvl = b.dataset.l; sp.i = 0; sp.custom = null; renderSentence();
    };
  });
  $("spNext").onclick = function () { sp.custom = null; sp.i++; renderSentence(); };
  $("spListen").onclick = function () { H.speak(curSentence()[0]); };
  function practice(ko, uz) {
    sp.custom = [ko, uz || "", "Siz tanlagan gap"];
    renderSentence();
  }
  $("spUse").onclick = function () {
    var v = $("spCustom").value.trim();
    if (!/[가-힣]/.test(v)) { toast("Koreyscha gap kiriting."); return; }
    practice(v, "");
  };

  bindMic($("spMic"), $("spHint"), "Bosing, gapni o'qing, tugatgach yana bosing", function (a) {
    var s = curSentence(), btn = $("spMic");
    setBusy(btn, true);
    $("spHint").textContent = "AI baholamoqda…";
    $("spResult").innerHTML = loading("Talaffuzingiz tahlil qilinmoqda…");
    var fd = new FormData();
    fd.append("target", s[0]);
    fd.append("audio", a.blob, "rec" + a.ext);
    H.api("/api/speech", { body: fd }).then(function (r) {
      H.pushHist("speak", { overall: r.overall, accuracy: r.accuracy, pronunciation: r.pronunciation, fluency: r.fluency,
        level: sp.custom ? "custom" : sp.lvl, date: new Date().toISOString().slice(0, 10) });
      H.haptic("note", r.overall >= 70 ? "success" : "warning");
      $("spKo").innerHTML = (r.marks || []).map(function (m) {
        return /[가-힣]/.test(m.ch) ? '<span class="' + (m.ok ? "good" : "bad") + '">' + esc(m.ch) + '</span>' : esc(m.ch);
      }).join("") || esc(s[0]);
      var html = '<div class="card" style="margin-top:14px"><div class="score">' +
        '<div class="ring" style="--p:' + r.overall + ';background:conic-gradient(' + scoreColor(r.overall) + ' calc(var(--p)*1%),var(--line) 0)"><b>' + r.overall + '</b></div>' +
        '<div style="flex:1;min-width:200px"><div style="font-weight:800;font-size:17px">Umumiy ball: ' + r.overall + ' / 100</div>' +
        '<div class="note" style="font-size:14px">Siz aytdingiz: <span class="ko">' + esc(r.transcript || "—") + '</span></div></div></div>' +
        '<div class="scores"><div class="sbox"><b style="color:' + scoreColor(r.accuracy) + '">' + r.accuracy + '</b><span>Aniqlik</span></div>' +
        '<div class="sbox"><b style="color:' + scoreColor(r.pronunciation) + '">' + r.pronunciation + '</b><span>Talaffuz</span></div>' +
        '<div class="sbox"><b style="color:' + scoreColor(r.fluency) + '">' + r.fluency + '</b><span>Ravonlik</span></div></div>';
      if (r.feedback_uz) html += '<p style="margin:14px 0 0;font-weight:600">' + esc(r.feedback_uz) + '</p>';
      (r.problems || []).forEach(function (p) {
        html += '<div class="exp ko"><b>' + esc(p.part || "") + '</b> — ' + esc(p.issue_uz || "") + '</div>';
      });
      if ((r.tips_uz || []).length) html += '<ul class="tiplist">' + r.tips_uz.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul>';
      html += '<div class="note" style="margin-top:10px">Qizil bo\'g\'inlar aniq eshitilmagan. Namunani tinglab, qayta urinib ko\'ring.</div></div>';
      $("spResult").innerHTML = html;
      $("spHint").textContent = "Qayta urinish uchun mikrofonni bosing";
    }).catch(function (e) {
      $("spResult").innerHTML = errBox(e.message);
      $("spHint").textContent = "Bosing, gapni o'qing, tugatgach yana bosing";
    }).then(function () { setBusy(btn, false); });
  });

  // =====================================================================
  // GAPIRISH: AI SUHBATDOSH (ovozli assistent)
  // =====================================================================
  var STARTERS = {
    intro: ["안녕하세요! 저는 한국어 선생님이에요. 이름이 뭐예요?", "Salom! Men koreys tili o'qituvchisiman. Ismingiz nima?"],
    work: ["안녕하세요. 오늘 처음 출근했지요? 어느 나라에서 왔어요?", "Salom. Bugun birinchi kun ishga keldingiz-a? Qaysi davlatdan keldingiz?"],
    shop: ["어서 오세요! 뭘 찾으세요?", "Xush kelibsiz! Nima qidiryapsiz?"],
    hospital: ["어디가 아프세요?", "Qayeringiz og'riyapti?"],
    daily: ["오늘 날씨가 정말 좋네요. 주말에 보통 뭐 해요?", "Bugun havo juda yaxshi ekan. Dam olish kunlari odatda nima qilasiz?"],
    free: ["안녕하세요! 무엇에 대해 이야기하고 싶어요?", "Salom! Nima haqida gaplashmoqchisiz?"]
  };
  var ch = { topic: "intro", history: [], busy: false, started: false };

  function aiBubble(ko, uz) {
    return '<div class="bub ai"><div class="ko">' + esc(ko) + ' ' + say(ko) + '</div>' +
      (uz ? '<div class="tr">' + esc(uz) + '</div>' : '') + '</div>';
  }
  function addHTML(html) {
    var log = $("chLog");
    log.insertAdjacentHTML("beforeend", html);
    var last = log.lastElementChild;
    if (last && last.scrollIntoView) last.scrollIntoView({ block: "end", behavior: "smooth" });
  }
  function startChat() {
    var s = STARTERS[ch.topic];
    ch.history = [{ role: "ai", ko: s[0] }];
    $("chLog").innerHTML = '<div class="note" style="text-align:center">Koreyscha yozing yoki 🎙️ bilan gapiring. Har bir javobingiz baholanadi. O\'zbekcha so\'rasangiz ham bo\'ladi: masalan, «Kechirasiz» koreyscha qanday?</div>';
    addHTML(aiBubble(s[0], s[1]));
    ch.started = true;
  }
  $("chTopics").querySelectorAll("button").forEach(function (b) {
    b.onclick = function () {
      $("chTopics").querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); });
      ch.topic = b.dataset.t; startChat();
    };
  });

  function sendChat(text, audio) {
    if (ch.busy || !needServer(null)) return;
    ch.busy = true;
    var fd = new FormData();
    fd.append("history", JSON.stringify(ch.history.slice(-10)));
    fd.append("topic", ch.topic);
    fd.append("level", "boshlang'ich yoki o'rta (javoblariga qarab moslang)");
    if (audio) fd.append("audio", audio.blob, "rec" + audio.ext);
    else { fd.append("text", text); addHTML('<div class="bub me ko">' + esc(text) + '</div>'); }
    var waitId = "w" + Date.now();
    addHTML('<div class="bub ai" id="' + waitId + '"><span class="spin"></span></div>');
    $("chSend").disabled = true;
    H.api("/api/chat", { body: fd }).then(function (r) {
      var w = document.getElementById(waitId); if (w) w.remove();
      if (audio) addHTML('<div class="bub me ko">🎙️ ' + esc(r.user_text) + '</div>');
      if (r.help_uz) {
        addHTML('<div class="fix help ko">💡 ' + esc(r.help_uz) + '</div>');
      } else {
        var sc = r.scores || {}, parts = [];
        if (sc.grammar != null) parts.push("Grammatika " + sc.grammar);
        if (sc.vocabulary != null) parts.push("So'z boyligi " + sc.vocabulary);
        if (sc.pronunciation != null) parts.push("Talaffuz " + sc.pronunciation);
        var fix = "";
        var strip = function (s) { return String(s || "").replace(/[^가-힣]/g, ""); };
        if (r.corrected_ko && strip(r.corrected_ko) !== strip(r.user_text)) fix += '✅ <span class="ko">' + esc(r.corrected_ko) + '</span><br>';
        if (r.correction_uz) fix += esc(r.correction_uz) + '<br>';
        if (parts.length) fix += '📊 ' + parts.join(" · ");
        if (!r.correction_uz && !fix.includes("✅")) fix = "👍 To'g'ri! " + fix;
        if (fix) addHTML('<div class="fix">' + fix + '</div>');
        ch.history.push({ role: "user", ko: r.corrected_ko || r.user_text });
      }
      if (r.reply_ko) {
        addHTML(aiBubble(r.reply_ko, r.reply_uz));
        ch.history.push({ role: "ai", ko: r.reply_ko });
        H.speak(r.reply_ko);
      }
    }).catch(function (e) {
      var w = document.getElementById(waitId); if (w) w.remove();
      addHTML(errBox(e.message));
    }).then(function () { ch.busy = false; $("chSend").disabled = false; });
  }
  $("chSend").onclick = function () {
    var v = $("chText").value.trim();
    if (!v) return;
    $("chText").value = "";
    sendChat(v, null);
  };
  $("chText").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); $("chSend").click(); } });
  bindMic($("chMic"), null, "", function (a) {
    var btn = $("chMic"); setBusy(btn, true);
    sendChat(null, a);
    var iv = setInterval(function () { if (!ch.busy) { clearInterval(iv); setBusy(btn, false); } }, 300);
  });

  $("spSeg").querySelectorAll("button").forEach(function (b) {
    b.onclick = function () {
      recCancel();
      $("spSeg").querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); });
      var chat = b.dataset.m === "chat";
      $("spPron").hidden = chat; $("spChat").hidden = !chat;
      if (chat && !ch.started) startChat();
    };
  });

  // =====================================================================
  // KITOBLAR
  // =====================================================================
  var bk = { list: [], cur: null, lesson: null };

  function loadBooks() {
    var L = $("bkList");
    if (!needServer(L)) return;
    L.innerHTML = loading("Kitoblar yuklanmoqda…");
    H.api("/api/books").then(function (r) {
      bk.list = r.books || [];
      if (!bk.list.length) {
        L.innerHTML = '<div class="card empty">Hali kitob yo\'q. Koreys tili darsligingizni yuklang: AI uni darslarga bo\'lib beradi.</div>';
        return;
      }
      L.innerHTML = bk.list.map(function (b) {
        return '<button class="lsn" data-book="' + esc(b.id) + '"><span class="n">📘</span><span style="flex:1"><div style="font-weight:800">' +
          esc(b.title || b.filename) + '</div><div class="s">' + esc(b.level || "") + ' · ' + (b.lesson_count || 0) + ' ta dars</div></span><span>›</span></button>';
      }).join("") + '<div class="note">Kitoblar: ' + bk.list.length + ' / ' + r.limit + '</div>';
    }).catch(function (e) { L.innerHTML = errBox(e.message); });
  }
  $("bkList").addEventListener("click", function (e) {
    var b = e.target.closest("[data-book]");
    if (b) openBook(b.dataset.book);
  });

  $("bkFile").onchange = function () {
    var f = this.files && this.files[0];
    this.value = "";
    if (!f) return;
    var st = $("bkStatus");
    if (!needServer(st)) return;
    if (f.size > 20 * 1024 * 1024) { st.innerHTML = errBox("Fayl juda katta. Eng ko'pi 20 MB."); return; }
    st.innerHTML = loading("«" + f.name + "» tekshirilmoqda: koreys tiliga oidmi va qanday darslardan iborat. 30–90 soniya, ilovani yopmang…");
    var fd = new FormData(); fd.append("file", f, f.name);
    H.api("/api/books", { body: fd }).then(function (r) {
      H.haptic("note", "success");
      st.innerHTML = '<div class="ok-box">✅ «' + esc(r.book.title) + '» qo\'shildi: ' + r.book.lesson_count + ' ta dars.</div>';
      loadBooks();
      showBook(r.book);
    }).catch(function (e) { H.haptic("note", "error"); st.innerHTML = errBox(e.message); });
  };

  function showBook(b) {
    bk.cur = b;
    $("bkTitle").textContent = b.title || b.filename;
    $("bkMeta").textContent = (b.level ? b.level + " · " : "") + (b.lesson_count || 0) + " ta dars";
    $("bkLessons").innerHTML = (b.lessons || []).map(function (l) {
      return '<button class="lsn" data-ln="' + l.n + '"><span class="n">' + l.n + '</span><span style="flex:1"><div class="ko" style="font-weight:700">' +
        esc(l.title) + '</div><div class="s">' + esc(l.summary_uz || "") + (l.pages ? " · " + esc(l.pages) + "-betlar" : "") + '</div></span><span>›</span></button>';
    }).join("");
    var del = $("bkDel"); delete del.dataset.confirm; del.textContent = "🗑 Kitobni o'chirish";
    H.go("book");
  }
  function openBook(id) {
    $("bkStatus").innerHTML = "";
    H.api("/api/books/" + encodeURIComponent(id)).then(function (r) { showBook(r.book); })
      .catch(function (e) { toast(e.message); });
  }
  $("bkLessons").addEventListener("click", function (e) {
    var b = e.target.closest("[data-ln]");
    if (b) openLesson(+b.dataset.ln);
  });
  $("bkDel").onclick = function () {
    if (!this.dataset.confirm) { this.dataset.confirm = "1"; this.textContent = "Tasdiqlang: butunlay o'chirish"; return; }
    var id = bk.cur && bk.cur.id;
    H.api("/api/books/" + encodeURIComponent(id), { method: "DELETE" }).then(function () {
      toast("Kitob o'chirildi."); H.go("books");
    }).catch(function (e) { toast(e.message); });
  };

  // ---------------- DARS ----------------
  function openLesson(n) {
    var body = $("lsBody");
    H.go("lesson");
    body.innerHTML = loading("AI kitobingiz asosida dars tayyorlamoqda… (birinchi ochilishda 20–60 soniya)");
    H.api("/api/books/" + encodeURIComponent(bk.cur.id) + "/lessons/" + n, { method: "POST" })
      .then(function (r) { bk.lesson = r.lesson; renderLesson(r.lesson); })
      .catch(function (e) { body.innerHTML = errBox(e.message) + '<button class="btn ghost" style="margin-top:12px" id="lsRetry">Qayta urinish</button>';
        $("lsRetry").onclick = function () { openLesson(n); }; });
  }
  $("lsBack").onclick = function () { H.go("book"); };

  function renderLesson(L) {
    var h = '<h2 class="ko" style="margin-top:12px">' + esc(L.title || "") + '</h2>';
    if (L.intro_uz) h += '<p style="color:var(--muted);margin-top:-6px">' + esc(L.intro_uz) + '</p>';
    if ((L.vocab || []).length) {
      h += '<div class="sec-t">Yangi so\'zlar</div><div class="vgrid">' + L.vocab.map(function (v) {
        return '<div class="vw"><div><div class="k ko">' + esc(v.ko) + '</div><div class="r">' + esc(v.rom || "") + '</div><div class="u">' + esc(v.uz || "") + '</div></div>' + say(v.ko) + '</div>';
      }).join("") + '</div>';
    }
    if ((L.grammar || []).length) {
      h += '<div class="sec-t">Grammatika</div><div class="review" style="margin-top:0">' + L.grammar.map(function (g) {
        return '<div class="card gram"><div class="p ko">' + esc(g.pattern || "") + '</div><div style="white-space:pre-line;margin-top:6px">' + esc(g.explain_uz || "") + '</div>' +
          (g.examples || []).map(function (x) { return '<div class="exp"><span class="ko" style="font-weight:700">' + esc(x.ko) + '</span> ' + say(x.ko) + '<br>' + esc(x.uz || "") + '</div>'; }).join("") + '</div>';
      }).join("") + '</div>';
    }
    if (L.reading && L.reading.ko) {
      h += '<div class="sec-t">O\'qish matni</div><div class="card"><div class="ko" style="font-size:17px;white-space:pre-line;line-height:1.7">' + esc(L.reading.ko) + '</div>' +
        '<div class="row" style="margin-top:10px">' + '<button class="btn ghost" data-say="' + esc(L.reading.ko) + '">🔊 Tinglash</button>' +
        '<button class="btn ghost" id="trBtn">Tarjimani ko\'rsatish</button></div><div id="trTxt" hidden style="margin-top:10px;color:var(--muted);white-space:pre-line">' + esc(L.reading.uz || "") + '</div></div>';
    }
    if ((L.exercises || []).length) {
      h += '<div class="sec-t">Mashqlar <span id="exScore"></span></div><div class="review" style="margin-top:0">' + L.exercises.map(function (x, i) {
        return '<div class="card exq" data-ex="' + i + '"><div class="ko" style="font-weight:700;margin-bottom:10px;white-space:pre-line">' + (i + 1) + '. ' + esc(x.q) + '</div><div class="opts">' +
          x.options.map(function (o, k) { return '<button class="opt ko" data-k="' + k + '"><span class="n">' + (k + 1) + '</span>' + esc(o) + '</button>'; }).join("") +
          '</div><div class="exp" hidden></div></div>';
      }).join("") + '</div>';
    }
    if ((L.speaking || []).length) {
      h += '<div class="sec-t">Gapirib ko\'ring</div><div class="review" style="margin-top:0">' + L.speaking.map(function (s) {
        return '<div class="card row" style="justify-content:space-between"><div style="flex:1;min-width:180px"><div class="ko" style="font-weight:700">' + esc(s.ko) + '</div><div class="note" style="font-size:13.5px">' + esc(s.uz || "") + '</div></div>' +
          '<div class="row">' + say(s.ko) + '<button class="btn" data-practice="' + esc(s.ko) + '" data-uz="' + esc(s.uz || "") + '">🎙️ Mashq</button></div></div>';
      }).join("") + '</div>';
    }
    if ((L.tips_uz || []).length) h += '<div class="sec-t">Maslahat</div><ul class="tiplist">' + L.tips_uz.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul>';
    $("lsBody").innerHTML = h;
    var tb = $("trBtn");
    if (tb) tb.onclick = function () { var t = $("trTxt"); t.hidden = !t.hidden; tb.textContent = t.hidden ? "Tarjimani ko'rsatish" : "Tarjimani yashirish"; };
  }
  var exDone = {};
  $("lsBody").addEventListener("click", function (e) {
    var p = e.target.closest("[data-practice]");
    if (p) {
      H.go("speak");
      $("spSeg").querySelector('[data-m="pron"]').click();
      practice(p.getAttribute("data-practice"), p.getAttribute("data-uz"));
      return;
    }
    var o = e.target.closest(".exq .opt");
    if (!o) return;
    var card = o.closest(".exq"), i = +card.dataset.ex, x = bk.lesson.exercises[i];
    if (card.dataset.done) return;
    card.dataset.done = "1";
    var k = +o.dataset.k, right = k === +x.answer;
    H.haptic("note", right ? "success" : "error");
    card.querySelectorAll(".opt").forEach(function (b) {
      var bk2 = +b.dataset.k;
      if (bk2 === +x.answer) b.classList.add("right");
      else if (bk2 === k) b.classList.add("wrong");
    });
    var ex = card.querySelector(".exp"); ex.hidden = false;
    ex.innerHTML = (right ? "✅ To'g'ri! " : "❌ Xato. ") + esc(x.explain_uz || "");
    var cards = $("lsBody").querySelectorAll(".exq"), done = 0, ok = 0;
    cards.forEach(function (c) { if (c.dataset.done) { done++; if (c.querySelector(".opt.right") && !c.querySelector(".opt.wrong")) ok++; } });
    $("exScore").textContent = "· " + ok + " / " + cards.length + (done === cards.length ? " ✓" : "");
  });

  // =====================================================================
  // SO'ZLAR: AI bilan yangi so'zlar
  // =====================================================================
  $("wMore").onclick = function () {
    if (!needServer(null)) return;
    var f = H.wordFilter(), level = f === "all" ? "adv" : f;
    var exclude = H.WORDS.filter(function (w) { return w.t === level; }).map(function (w) { return w.ko; });
    var btn = this; btn.disabled = true; btn.innerHTML = '<span class="spin"></span> AI so\'z tanlamoqda…';
    H.api("/api/words", { json: { level: level, exclude: exclude } }).then(function (r) {
      var added = 0;
      (r.words || []).forEach(function (w) {
        if (!H.WORDS.some(function (x) { return x.ko === w.ko; })) {
          H.WORDS.push({ ko: w.ko, rom: w.rom, uz: w.uz, t: level, ex: w.example_ko, exuz: w.example_uz });
          added++;
        }
      });
      H.resetDeck();
      toast(added ? added + " ta yangi so'z qo'shildi." : "Yangi so'z topilmadi, qayta urinib ko'ring.");
    }).catch(function (e) { toast(e.message); })
      .then(function () { btn.disabled = false; btn.textContent = "🤖 AI: yana 10 ta so'z"; });
  };

  // =====================================================================
  // Ko'rinishlar o'zgarganda
  // =====================================================================
  H.onView = function (v) {
    if (v === "books") loadBooks();
    if (v === "speak" && !$("spKo").textContent) renderSentence();
  };
  H.onLeave = function (v) {
    if (v === "speak") {
      recCancel();
      ["spMic", "chMic"].forEach(function (id) { var b = $(id); if (!b.dataset.busy) { b.classList.remove("rec"); b.textContent = "🎙️"; } });
    }
  };
  renderSentence();
})();
