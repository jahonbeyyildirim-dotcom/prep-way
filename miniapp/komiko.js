/* Hanguk Way — KOMIKO: ovozli ustoz.
   - Ovoz chiqarish: server (Gemini, ayol/erkak) → telefon TTS (Capacitor TextToSpeech) → brauzer speechSynthesis.
   - Nutqni tanish: telefon (Capacitor SpeechRecognition, ko-KR) → brauzer webkitSpeechRecognition.
   - Talaffuz bahosi: aytilgan gap maqsad gap bilan harf (jamo) darajasida solishtiriladi — haqiqiy natija.
   - Serversiz (demo) rejimda Komiko tayyor ssenariylar bo'yicha suhbat quradi va har bir javobni baholaydi. */
(function () {
  var H = window.HY;
  if (!H) return;
  var $ = H.$, esc = H.esc, toast = H.toast;
  var C = window.Capacitor, P = (C && C.Plugins) || {};
  var NATIVE = !!(window.PW && window.PW.native);
  // Mahalliy (serversiz) rejim: demo yoki server yo'q
  var aiDown = 0;   // server AI band bo'lsa — vaqtincha oflayn Komiko
  function LOCAL() { return !!(window.PW && window.PW.demo) || !H.SERVER.ok || (aiDown && Date.now() - aiDown < 10 * 60 * 1000); }

  // =====================================================================
  // PROFIL va FAOLLIK (seriya, kunlik daqiqalar)
  // =====================================================================
  var PKEY = "pwProfile", AKEY = "pwActivity";
  function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var Profile = {
    get: function () { return load(PKEY, null); },
    set: function (p) { save(PKEY, p); document.dispatchEvent(new CustomEvent("pw:profile")); },
    voice: function () { var p = Profile.get(); return (p && p.voice) || "female"; },
    speed: function () { var p = Profile.get(); return (p && p.speed) || "normal"; },
    level: function () { var p = Profile.get(); return p ? (p.level | 0) : 1; },
    name: function () { var p = Profile.get(); return (p && p.name) || ""; }
  };
  function today() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  var Activity = {
    all: function () { return load(AKEY, {}); },
    day: function (d) { var a = Activity.all(); return a[d || today()] || { secs: 0, done: [] }; },
    mark: function (kind) {
      var a = Activity.all(), d = today(), x = a[d] || { secs: 0, done: [] };
      if (x.done.indexOf(kind) < 0) x.done.push(kind);
      a[d] = x; Activity._trim(a); save(AKEY, a);
      document.dispatchEvent(new CustomEvent("pw:activity"));
    },
    addSecs: function (s) {
      if (!(s > 0)) return;
      var a = Activity.all(), d = today(), x = a[d] || { secs: 0, done: [] };
      x.secs = Math.min(x.secs + Math.round(s), 6 * 3600); a[d] = x; Activity._trim(a); save(AKEY, a);
    },
    streak: function () {
      var a = Activity.all(), n = 0, t = new Date(), frozen = {};
      (load("pwFreeze", {}).used || []).forEach(function (d) { frozen[d] = 1; });  // muzlatilgan kunlar seriyani uzmaydi
      for (var i = 0; i < 400; i++) {
        var d = new Date(t.getFullYear(), t.getMonth(), t.getDate() - i);
        var k = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        var x = a[k];
        if ((x && (x.done.length || x.secs >= 60)) || frozen[k]) n++;
        else if (i > 0) break; // bugun hali mashq qilinmagan bo'lsa, seriya kechagidan hisoblanadi
      }
      return n;
    },
    _trim: function (a) { var ks = Object.keys(a).sort(); while (ks.length > 120) delete a[ks.shift()]; }
  };
  // Faol bo'limlarda o'tkazilgan vaqt kunlik maqsadga qo'shiladi
  var ACTIVE = { test: 1, speak: 1, lesson: 1, words: 1, hw: 1, mistakes: 1, book: 1 };
  var vt = { v: "home", t0: Date.now() };
  function flushTime() { if (ACTIVE[vt.v]) Activity.addSecs((Date.now() - vt.t0) / 1000); vt.t0 = Date.now(); }
  var prevOnView = H.onView, prevOnLeave = H.onLeave;
  H.onView = function (v) {
    flushTime(); vt.v = v;
    if (v === "result") Activity.mark("test");
    if (prevOnView) prevOnView(v);
    if (v === "speak") onSpeakView();
  };
  H.onLeave = function (v) {
    stopAll();
    if (prevOnLeave) prevOnLeave(v);
  };
  document.addEventListener("visibilitychange", function () { if (document.hidden) flushTime(); else vt.t0 = Date.now(); });

  // =====================================================================
  // KOMIKO AVATARI (original SVG)
  // =====================================================================
  var avN = 0;
  function avatar(size, cls) {
    var id = "kg" + (++avN);
    return '<svg class="komiko ' + (cls || "") + '" width="' + size + '" height="' + size + '" viewBox="0 0 120 120" aria-hidden="true">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b8cff"/><stop offset="1" stop-color="#7a3cf0"/></linearGradient></defs>' +
      '<line x1="60" y1="22" x2="60" y2="10" stroke="#7a3cf0" stroke-width="4" stroke-linecap="round"/>' +
      '<circle class="k-ant" cx="60" cy="9" r="6" fill="#ff5d73"/>' +
      '<circle cx="60" cy="64" r="44" fill="url(#' + id + ')"/>' +
      '<path d="M22 62a38 38 0 0 1 76 0" stroke="#fff" stroke-opacity=".85" stroke-width="5" fill="none"/>' +
      '<rect x="12" y="54" width="15" height="26" rx="7.5" fill="#ff5d73"/><rect x="93" y="54" width="15" height="26" rx="7.5" fill="#ff5d73"/>' +
      '<rect x="31" y="47" width="58" height="42" rx="21" fill="#fff"/>' +
      '<g class="k-eyes"><ellipse cx="48" cy="65" rx="5.5" ry="7" fill="#1d2142"/><ellipse cx="72" cy="65" rx="5.5" ry="7" fill="#1d2142"/>' +
      '<circle cx="50" cy="62" r="1.8" fill="#fff"/><circle cx="74" cy="62" r="1.8" fill="#fff"/></g>' +
      '<circle cx="39" cy="77" r="4" fill="#ffb4c2"/><circle cx="81" cy="77" r="4" fill="#ffb4c2"/>' +
      '<path class="k-mouth" d="M53 77q7 7 14 0" stroke="#1d2142" stroke-width="3.2" fill="#ff8597" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
  }
  function setTalking(on) {
    document.querySelectorAll(".komiko.live").forEach(function (s) { s.classList.toggle("talking", !!on); });
  }

  // =====================================================================
  // OVOZ CHIQARISH
  // =====================================================================
  var TTS = P.TextToSpeech;
  var nv = { checked: false, ok: false, idx: { female: undefined, male: undefined }, hasMale: false };
  function nativeVoices() {
    if (nv.checked || !TTS) return Promise.resolve(nv);
    nv.checked = true;
    return Promise.resolve()
      .then(function () { return TTS.isLanguageSupported ? TTS.isLanguageSupported({ lang: "ko-KR" }) : { supported: true }; })
      .then(function (r) { nv.ok = !!(r && r.supported); return TTS.getSupportedVoices ? TTS.getSupportedVoices() : { voices: [] }; })
      .then(function (r) {
        var vs = (r && r.voices) || [];
        vs.forEach(function (v, i) {
          if (!/^ko/i.test(v.lang || "")) return;
          nv.ok = true;
          var n = ((v.name || "") + " " + (v.voiceURI || "")).toLowerCase();
          var male = /(^|[^e])male|남자|koc|kod|-m-|#male/.test(n) && !/female/.test(n);
          var female = /female|여자|ism|kob|-f-/.test(n);
          if (male && nv.idx.male === undefined) { nv.idx.male = i; nv.hasMale = true; }
          else if (female && nv.idx.female === undefined) nv.idx.female = i;
          else if (nv.idx.female === undefined && !male) nv.idx.female = i;
        });
        return nv;
      })
      .catch(function () { nv.ok = true; return nv; });
  }
  var webVoice = { female: null, male: null };
  function pickWebVoices() {
    if (!("speechSynthesis" in window)) return;
    var vs = (speechSynthesis.getVoices() || []).filter(function (v) { return /^ko/i.test(v.lang); });
    webVoice.female = vs.find(function (v) { return /female|여|yuna|sora|heami|sunhi|jimin/i.test(v.name); }) || vs[0] || null;
    webVoice.male = vs.find(function (v) { return /(^|[^e])male|남|injoon|minjun|hyunsu|bongjin/i.test(v.name) && !/female/i.test(v.name); }) || null;
  }
  if ("speechSynthesis" in window) { pickWebVoices(); try { speechSynthesis.addEventListener("voiceschanged", pickWebVoices); } catch (e) {} }

  var cur = { audio: null, token: 0 }, cache = {};
  function rate() { var sp = (window.Komiko && window.Komiko.tmpSpeed) || Profile.speed(); return sp === "slow" ? 0.72 : 0.92; }

  function stopSpeak() {
    cur.token++;
    try { if (cur.audio) cur.audio.pause(); } catch (e) {}
    try { if (TTS) TTS.stop(); } catch (e) {}
    try { if ("speechSynthesis" in window) speechSynthesis.cancel(); } catch (e) {}
    setTalking(false);
  }
  function deviceSpeak(text, voice, tok) {
    voice = voice || Profile.voice();
    if (TTS && NATIVE) {
      return nativeVoices().then(function () {
        if (!nv.ok) { needVoicePack(); return; }
        var o = { text: text, lang: "ko-KR", rate: rate(), pitch: 1.0, volume: 1.0, category: "playback", queueStrategy: 0 };
        var vi = nv.idx[voice];
        if (vi !== undefined) o.voice = vi;
        if (voice === "male" && !nv.hasMale) o.pitch = 0.78;   // erkak ovozi topilmasa — pastroq ohang
        if (voice === "female" && nv.idx.female === undefined) o.pitch = 1.12;
        if (tok === cur.token) setTalking(true);
        return TTS.speak(o).catch(function (e) {
          if (/not supported|language/i.test(String(e && e.message))) needVoicePack();
        }).then(function () { if (tok === cur.token) setTalking(false); });
      });
    }
    if ("speechSynthesis" in window) {
      return new Promise(function (res) {
        try {
          speechSynthesis.cancel();
          var u = new SpeechSynthesisUtterance(text);
          u.lang = "ko-KR"; u.rate = rate();
          var v = webVoice[voice] || webVoice.female;
          if (v) u.voice = v;
          if (voice === "male" && !webVoice.male) u.pitch = 0.75;
          u.onstart = function () { if (tok === cur.token) setTalking(true); };
          u.onend = u.onerror = function () { if (tok === cur.token) setTalking(false); res(); };
          speechSynthesis.speak(u);
          if (!v) toast("Koreyscha ovoz topilmadi: matnni o'qing.");
        } catch (e) { res(); }
      });
    }
    toast("Bu qurilmada ovoz chiqarib bo'lmadi. Matnni o'qing.");
    return Promise.resolve();
  }
  function serverSpeak(text, voice, tok) {
    var key = voice + "|" + text;
    var play = function (url) {
      return new Promise(function (res) {
        var a = new Audio(url); cur.audio = a;
        if (window.Komiko && Komiko.tmpRate) { try { a.preservesPitch = true; a.playbackRate = Komiko.tmpRate; } catch (e) {} }
        a.onplay = function () { if (tok === cur.token) setTalking(true); };
        a.onended = a.onerror = function () { if (tok === cur.token) setTalking(false); res(); };
        a.play().catch(function () { setTalking(false); res(deviceSpeak(text, voice, tok)); });
      });
    };
    if (cache[key]) return play(cache[key]);
    return H.api("/api/tts", { json: { text: text, voice: voice }, raw: true })
      .then(function (r) { return r.blob(); })
      .then(function (b) { cache[key] = URL.createObjectURL(b); if (tok === cur.token) return play(cache[key]); })
      .catch(function () { if (tok === cur.token) return deviceSpeak(text, voice, tok); });
  }
  // Interfeys tilida gapirish (o'zbek/rus/ingliz). Natija: true — ovoz chiqdi, false — bu tilda ovoz yo'q
  function sayLocal(text, code) {
    stopSpeak();
    var tok = ++cur.token, voice = Profile.voice();
    if (TTS && NATIVE) {
      return TTS.isLanguageSupported({ lang: code }).then(function (r) {
        if (!r || !r.supported) return false;
        if (tok === cur.token) setTalking(true);
        return TTS.speak({ text: text, lang: code, rate: 1.0, pitch: voice === "male" ? 0.85 : 1.08, category: "playback", queueStrategy: 0 })
          .then(function () { if (tok === cur.token) setTalking(false); return true; });
      }).catch(function () { setTalking(false); return false; });
    }
    if ("speechSynthesis" in window) {
      var pre = code.slice(0, 2), vs = (speechSynthesis.getVoices() || []).filter(function (v) { return v.lang.toLowerCase().indexOf(pre) === 0; });
      if (!vs.length) return Promise.resolve(false);
      return new Promise(function (res) {
        var u = new SpeechSynthesisUtterance(text); u.lang = code; u.voice = vs[0];
        u.onstart = function () { if (tok === cur.token) setTalking(true); };
        u.onend = u.onerror = function () { if (tok === cur.token) setTalking(false); res(true); };
        speechSynthesis.speak(u);
      });
    }
    return Promise.resolve(false);
  }
  // Asosiy funksiya: index.html dagi speak() shu yerga yo'naltiriladi
  function speak(text, voice) {
    if (!text) return Promise.resolve();
    stopSpeak();
    var tok = ++cur.token;
    voice = voice || Profile.voice();
    if (!LOCAL()) return serverSpeak(text, voice, tok);
    return deviceSpeak(text, voice, tok);
  }

  function needVoicePack() {
    if (needVoicePack.shown) { toast("Telefonda koreyscha ovoz paketi yo'q."); return; }
    needVoicePack.shown = true;
    sheet('<div style="text-align:center">' + avatar(72) + '</div>' +
      '<h3 style="margin:8px 0 6px;text-align:center">Koreyscha ovoz paketi kerak</h3>' +
      '<p class="note" style="font-size:14.5px">Komiko gapirishi uchun telefoningizda <b>koreys tili ovozi</b> o\'rnatilgan bo\'lishi kerak. ' +
      'Odatda bu «Google nutq xizmatlari» (Speech Services by Google) ichida bo\'ladi:</p>' +
      '<ol class="note" style="font-size:14px;padding-left:18px"><li>Pastdagi tugmani bosing.</li><li>«Install voice data» → <b>한국어 (Korean)</b> ni yuklab oling.</li><li>Ilovaga qaytib, 🔊 ni qayta bosing.</li></ol>' +
      '<button class="btn" id="kvInstall" style="width:100%;margin-top:6px">⬇️ Ovoz paketini o\'rnatish</button>');
    var b = $("kvInstall");
    if (b) b.onclick = function () { try { TTS.openInstall(); } catch (e) {} closeSheet(); nv.checked = false; };
  }

  // =====================================================================
  // NUTQNI TANISH (STT)
  // =====================================================================
  var SR = P.SpeechRecognition;
  var WSR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var lis = { on: false, web: null };
  function canListen() { return !!((SR && NATIVE) || WSR); }
  function srError(e) {
    var m = String((e && (e.message || e.error)) || e || "");
    if (/permission|not-allowed|denied|Missing/i.test(m)) return "Mikrofonga ruxsat berilmadi. Sozlamalar → Ilovalar → Hanguk Way → Ruxsatlar → Mikrofon ni yoqing.";
    if (/no match|no-speech|didn't understand|7|6/i.test(m)) return "Gap eshitilmadi. Mikrofonni bosib, aniqroq va balandroq gapiring.";
    if (/network|2|4/i.test(m)) return "Nutqni tanish uchun internet kerak. Internetni yoqib, qayta urinib ko'ring.";
    if (/busy|8/i.test(m)) return "Mikrofon band. Bir soniyadan keyin qayta urinib ko'ring.";
    if (/not available|unavailable/i.test(m)) return "Telefoningizda nutqni tanish xizmati yo'q. «Google» ilovasini o'rnating yoki yangilang.";
    return "Ovozni tanib bo'lmadi. Qayta urinib ko'ring.";
  }
  // Natija: [variant1, variant2, ...] (koreyscha matnlar)
  function listen(langCode) {
    stopSpeak();
    var LC = langCode || "ko-KR";
    if (SR && NATIVE) {
      return SR.available().then(function (r) {
        if (r && r.available === false) throw new Error("not available");
        return SR.checkPermissions();
      }).then(function (p) {
        if (p && p.speechRecognition === "granted") return p;
        return SR.requestPermissions().then(function (p2) {
          if (!p2 || p2.speechRecognition !== "granted") throw new Error("permission denied");
        });
      }).then(function () {
        lis.on = true;
        return SR.start({ language: LC, maxResults: 5, partialResults: false, popup: false });
      }).then(function (r) {
        lis.on = false;
        var m = (r && r.matches) || [];
        if (!m.length) throw new Error("no match");
        return m;
      }, function (e) { lis.on = false; throw new Error(srError(e)); });
    }
    if (WSR) {
      return new Promise(function (res, rej) {
        var r = new WSR(); lis.web = r;
        r.lang = LC; r.maxAlternatives = 5; r.interimResults = false; r.continuous = false;
        var got = null;
        r.onresult = function (ev) {
          got = [];
          var x = ev.results[0];
          for (var i = 0; i < x.length; i++) got.push(x[i].transcript);
        };
        r.onerror = function (ev) { lis.on = false; rej(new Error(srError(ev.error))); };
        r.onend = function () { lis.on = false; if (got && got.length) res(got); else rej(new Error(srError("no-speech"))); };
        lis.on = true; r.start();
      });
    }
    return Promise.reject(new Error("Bu qurilmada nutqni tanib bo'lmaydi."));
  }
  function stopListen() {
    try { if (SR && NATIVE && lis.on) SR.stop(); } catch (e) {}
    try { if (lis.web) lis.web.stop(); } catch (e) {}
  }
  function stopAll() { stopSpeak(); stopListen(); }

  // =====================================================================
  // SOLISHTIRISH (server/korean.py bilan bir xil g'oya)
  // =====================================================================
  function onlyHangul(s) { return String(s || "").replace(/[^가-힣]/g, ""); }
  function jamo(s) {
    var out = "";
    for (var i = 0; i < s.length; i++) {
      var o = s.charCodeAt(i) - 0xAC00;
      if (o < 0 || o > 11171) { out += s[i]; continue; }
      out += String.fromCharCode(0x1100 + Math.floor(o / 588), 0x1161 + Math.floor((o % 588) / 28)) + (o % 28 ? String.fromCharCode(0x11A7 + o % 28) : "");
    }
    return out;
  }
  function lcs(a, b) { // uzunlik va a dagi mos indekslar
    var n = a.length, m = b.length, dp = [], i, j;
    for (i = 0; i <= n; i++) { dp.push(new Array(m + 1).fill(0)); }
    for (i = 1; i <= n; i++) for (j = 1; j <= m; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    var hit = new Array(n).fill(false); i = n; j = m;
    while (i > 0 && j > 0) {
      if (a[i - 1] === b[j - 1]) { hit[i - 1] = true; i--; j--; }
      else if (dp[i - 1][j] >= dp[i][j - 1]) i--; else j--;
    }
    return { len: dp[n][m], hit: hit };
  }
  // ratio: ikki tomonlama o'xshashlik; cover: maqsad gapning qancha qismi aytildi
  function compare(target, said) {
    var t = onlyHangul(target), s = onlyHangul(said);
    if (!t) return { score: 0, cover: 0, marks: [] };
    var tj = jamo(t), sj = jamo(s);
    var J = lcs(tj, sj);
    // aniqlik: ham tushib qolgan, ham ortiqcha harflar hisobga olinadi
    var ratio = Math.max(tj.length, sj.length) ? J.len / Math.max(tj.length, sj.length) : 0;
    var cover = J.len / tj.length;
    var S = lcs(t, s), marks = [], k = 0;
    for (var i = 0; i < target.length; i++) {
      var c = target[i];
      if (/[가-힣]/.test(c)) { marks.push({ ch: c, ok: S.hit[k] }); k++; }
      else marks.push({ ch: c, ok: true });
    }
    return { score: Math.round(ratio * 100), cover: cover, marks: marks };
  }
  function best(target, variants) {
    var b = null;
    (variants || []).forEach(function (v) { var r = compare(target, v); r.said = v; if (!b || r.score > b.score) b = r; });
    return b || { score: 0, cover: 0, marks: [], said: "" };
  }

  // =====================================================================
  // PASTKI OYNA (sheet)
  // =====================================================================
  function sheet(html) {
    closeSheet();
    var d = document.createElement("div");
    d.className = "k-sheet"; d.id = "kSheet";
    d.innerHTML = '<div class="k-sheet-bg"></div><div class="k-sheet-box">' + html + '<button class="btn ghost" id="kSheetX" style="width:100%;margin-top:10px">Yopish</button></div>';
    document.body.appendChild(d);
    requestAnimationFrame(function () { d.classList.add("on"); });
    d.querySelector(".k-sheet-bg").onclick = closeSheet; $("kSheetX").onclick = closeSheet;
  }
  function closeSheet() { var d = $("kSheet"); if (d) d.remove(); }

  // =====================================================================
  // TALAFFUZ (mahalliy rejim)
  // =====================================================================
  function scoreColor(v) { return v >= 80 ? "var(--green)" : v >= 55 ? "#b7791f" : "var(--red)"; }
  function micUI(btn, on) {
    if (on) { btn.classList.add("rec"); btn.textContent = "⏹"; }
    else { btn.classList.remove("rec"); btn.textContent = "🎙️"; }
  }
  function pronLocal() {
    var btn = $("spMic");
    if (!btn) return;
    btn.onclick = function () {
      if (lis.on) { stopListen(); return; }
      var ko = $("spKo").getAttribute("data-target") || $("spKo").textContent;
      $("spKo").setAttribute("data-target", ko);
      var uz = $("spUz").textContent;
      $("micFallback").hidden = true;
      micUI(btn, true);
      $("spHint").textContent = "🎧 Tinglayapman… gapni ayting (to'xtatish uchun bosing)";
      $("spResult").innerHTML = "";
      listen().then(function (variants) {
        micUI(btn, false);
        var r = best(ko, variants);
        var acc = r.score;
        var bad = r.marks.filter(function (m) { return !m.ok && /[가-힣]/.test(m.ch); }).map(function (m) { return m.ch; });
        H.pushHist("speak", { overall: acc, accuracy: acc, pronunciation: acc, fluency: null, level: "local", date: today() });
        Activity.mark("speak");
        H.haptic("note", acc >= 70 ? "success" : "warning");
        $("spKo").innerHTML = r.marks.map(function (m) {
          return /[가-힣]/.test(m.ch) ? '<span class="' + (m.ok ? "good" : "bad") + '">' + esc(m.ch) + '</span>' : esc(m.ch);
        }).join("");
        var fb = acc >= 90 ? "Ajoyib! Gapni deyarli mukammal aytdingiz." :
                 acc >= 75 ? "Yaxshi! Qizil bo'g'inlarni yana bir bor mashq qiling." :
                 acc >= 50 ? "Yomon emas. Namunani tinglab, sekinroq va aniqroq ayting." :
                 "Gap to'liq tanilmadi. Namunani 2–3 marta tinglab, bo'g'inlarni aniq ayting.";
        var html = '<div class="card k-res" style="margin-top:14px"><div class="score">' +
          '<div class="ring" style="--p:' + acc + ';background:conic-gradient(' + scoreColor(acc) + ' calc(var(--p)*1%),var(--line) 0)"><b>' + acc + '</b></div>' +
          '<div style="flex:1;min-width:180px"><div style="font-weight:800;font-size:17px">Aniqlik: ' + acc + ' / 100</div>' +
          '<div class="note" style="font-size:14px">Telefon eshitgani: <span class="ko"><b>' + esc(r.said || "—") + '</b></span></div></div></div>' +
          '<p style="margin:12px 0 0;font-weight:600">' + avatar(26, "inline") + ' ' + esc(fb) + '</p>';
        if (bad.length) html += '<div class="exp ko">Aniq eshitilmagan bo\'g\'inlar: <b style="color:var(--red)">' + esc(bad.join(" · ")) + '</b></div>';
        var note = $("spNote").textContent;
        if (note && acc < 90) html += '<div class="exp ko">💡 ' + esc(note) + '</div>';
        if (variants.length > 1) html += '<details class="k-alt"><summary>Boshqa variantlar (telefon taxminlari)</summary><div class="ko">' + variants.slice(1).map(esc).join("<br>") + '</div></details>';
        html += '<div class="note" style="margin-top:10px">Baho telefoningizning nutqni tanish tizimi orqali olingan: aytganingiz maqsad gap bilan harfma-harf solishtirildi.</div></div>';
        $("spResult").innerHTML = html;
        $("spHint").textContent = "Qayta urinish uchun mikrofonni bosing";
      }).catch(function (e) {
        micUI(btn, false);
        $("spHint").textContent = "Bosing va gapni ayting";
        $("spResult").innerHTML = '<div class="err" style="margin-top:12px">🎙️ ' + esc(e.message) + '</div>';
      });
    };
    // Gap almashganda maqsad matnini yangilash
    ["spNext", "spUse"].forEach(function (id) {
      var b = $(id); if (!b) return;
      b.addEventListener("click", function () { $("spKo").removeAttribute("data-target"); });
    });
    $("spLevels").addEventListener("click", function () { $("spKo").removeAttribute("data-target"); });
  }

  // =====================================================================
  // KOMIKO SUHBATI (mahalliy, ssenariy asosida)
  // =====================================================================
  var SCRIPTS = {
    intro: { t: "👋 Tanishuv", end: ["오늘 정말 잘했어요! 다음에 또 만나요.", "Bugun juda yaxshi bo'ldi! Keyingi safar yana ko'rishamiz."], turns: [
      { k: ["안녕하세요! 저는 코미코예요. 이름이 뭐예요?", "Salom! Men Komikoman. Ismingiz nima?"], a: [["제 이름은 {N}이에요.", "Mening ismim {N}."], ["저는 {N}입니다.", "Men {N}man."]], kw: ["이름은", "입니다"] },
      { k: ["만나서 반가워요! 어느 나라 사람이에요?", "Tanishganimdan xursandman! Qaysi davlatdansiz?"], a: [["저는 우즈베키스탄 사람이에요.", "Men o'zbekistonlikman."], ["우즈베키스탄에서 왔어요.", "O'zbekistondan keldim."]], kw: ["우즈베키스탄"] },
      { k: ["몇 살이에요?", "Necha yoshdasiz?"], a: [["스물다섯 살이에요.", "Yigirma besh yoshdaman."], ["저는 스무 살이에요.", "Men yigirma yoshdaman."]], kw: ["살"] },
      { k: ["무슨 일을 해요?", "Nima ish qilasiz?"], a: [["저는 학생이에요.", "Men talabaman."], ["저는 회사원이에요.", "Men ofis xodimiman."]], kw: ["학생", "회사원", "일해요"] },
      { k: ["왜 한국어를 공부해요?", "Nega koreys tilini o'rganyapsiz?"], a: [["한국에서 일하고 싶어요.", "Koreyada ishlamoqchiman."], ["한국 대학교에 가고 싶어요.", "Koreya universitetiga bormoqchiman."]], kw: ["싶어요"] }
    ] },
    work: { t: "🏭 Ish joyida", end: ["첫날 수고했어요! 내일 또 봐요.", "Birinchi kun uchun rahmat! Ertaga ko'rishamiz."], turns: [
      { k: ["안녕하세요. 오늘 처음 출근했어요?", "Salom. Bugun birinchi marta ishga keldingizmi?"], a: [["네, 오늘 처음 왔어요.", "Ha, bugun birinchi marta keldim."], ["네, 잘 부탁드립니다.", "Ha, menga yordam berib turing (odob iborasi)."]], kw: ["처음", "부탁"] },
      { k: ["이 기계를 사용할 줄 알아요?", "Bu mashinadan foydalanishni bilasizmi?"], a: [["아니요, 잘 몰라요. 가르쳐 주세요.", "Yo'q, yaxshi bilmayman. O'rgatib qo'ying."], ["네, 사용할 줄 알아요.", "Ha, foydalanishni bilaman."]], kw: ["몰라요", "알아요"] },
      { k: ["일할 때 안전모를 꼭 쓰세요.", "Ishlaganda kaskani albatta kiying."], a: [["네, 알겠습니다.", "Ha, tushundim."], ["네, 꼭 쓰겠습니다.", "Ha, albatta kiyaman."]], kw: ["알겠습니다", "쓰겠습니다"] },
      { k: ["오늘 잔업이 있어요. 할 수 있어요?", "Bugun qo'shimcha ish bor. Qila olasizmi?"], a: [["네, 할 수 있어요.", "Ha, qila olaman."], ["죄송하지만 오늘은 어려워요.", "Kechirasiz, lekin bugun qiyin."]], kw: ["할 수 있어요", "어려워요"] },
      { k: ["손을 다쳤어요? 괜찮아요?", "Qo'lingiz jarohatlandimi? Yaxshimisiz?"], a: [["손이 좀 아파요. 병원에 가도 돼요?", "Qo'lim biroz og'riyapti. Kasalxonaga borsam bo'ladimi?"], ["괜찮아요. 조금 다쳤어요.", "Hechqisi yo'q. Biroz jarohatlandim."]], kw: ["아파요", "괜찮아요"] }
    ] },
    shop: { t: "🛒 Do'konda", end: ["감사합니다! 또 오세요.", "Rahmat! Yana keling."], turns: [
      { k: ["어서 오세요! 뭘 찾으세요?", "Xush kelibsiz! Nima qidiryapsiz?"], a: [["사과 있어요?", "Olma bormi?"], ["운동화를 찾아요.", "Krossovka qidiryapman."]], kw: ["있어요", "찾아요"] },
      { k: ["이거 어때요? 아주 신선해요.", "Bu qanday? Juda yangi."], a: [["이거 얼마예요?", "Bu qancha turadi?"], ["좋아요. 이거 주세요.", "Yaxshi. Shuni bering."]], kw: ["얼마", "주세요"] },
      { k: ["한 개에 천 원이에요. 몇 개 드릴까요?", "Donasi ming von. Nechta beray?"], a: [["다섯 개 주세요.", "Beshta bering."], ["세 개 주세요.", "Uchta bering."]], kw: ["개 주세요"] },
      { k: ["봉투 필요하세요?", "Paket kerakmi?"], a: [["네, 하나 주세요.", "Ha, bitta bering."], ["아니요, 괜찮아요.", "Yo'q, kerak emas."]], kw: ["주세요", "괜찮아요"] },
      { k: ["카드로 계산하시겠어요?", "Karta bilan to'laysizmi?"], a: [["네, 카드로 할게요.", "Ha, karta bilan to'layman."], ["아니요, 현금으로 할게요.", "Yo'q, naqd to'layman."]], kw: ["카드", "현금"] }
    ] },
    hospital: { t: "🏥 Kasalxonada", end: ["빨리 나으세요!", "Tezroq tuzaling!"], turns: [
      { k: ["어디가 아프세요?", "Qayeringiz og'riyapti?"], a: [["머리가 아파요.", "Boshim og'riyapti."], ["배가 아파요.", "Qornim og'riyapti."]], kw: ["아파요"] },
      { k: ["언제부터 아팠어요?", "Qachondan beri og'riyapti?"], a: [["어제부터 아팠어요.", "Kechadan beri og'riyapti."], ["사흘 전부터 아팠어요.", "Uch kun oldindan beri."]], kw: ["부터"] },
      { k: ["열도 있어요?", "Isitmangiz ham bormi?"], a: [["네, 열이 조금 있어요.", "Ha, biroz isitmam bor."], ["아니요, 열은 없어요.", "Yo'q, isitmam yo'q."]], kw: ["열"] },
      { k: ["약을 하루에 세 번 드세요.", "Dorini kuniga uch marta iching."], a: [["밥 먹고 먹어요?", "Ovqatdan keyin ichamanmi?"], ["네, 알겠습니다.", "Ha, tushundim."]], kw: ["알겠습니다", "먹어요"] },
      { k: ["푹 쉬세요. 빨리 나으세요.", "Yaxshi dam oling. Tezroq tuzaling."], a: [["감사합니다, 선생님.", "Rahmat, doktor."], ["네, 감사합니다.", "Ha, rahmat."]], kw: ["감사합니다"] }
    ] },
    daily: { t: "☀️ Kundalik", end: ["재미있었어요! 또 이야기해요.", "Qiziqarli bo'ldi! Yana gaplashamiz."], turns: [
      { k: ["오늘 날씨가 어때요?", "Bugun ob-havo qanday?"], a: [["오늘은 날씨가 좋아요.", "Bugun havo yaxshi."], ["오늘은 비가 와요.", "Bugun yomg'ir yog'yapti."]], kw: ["날씨", "비가", "추워요", "더워요"] },
      { k: ["주말에 보통 뭐 해요?", "Dam olish kunlari odatda nima qilasiz?"], a: [["친구들하고 축구를 해요.", "Do'stlarim bilan futbol o'ynayman."], ["집에서 쉬어요.", "Uyda dam olaman."]], kw: ["해요", "쉬어요"] },
      { k: ["가족이 몇 명이에요?", "Oilangiz necha kishi?"], a: [["우리 가족은 다섯 명이에요.", "Oilamiz besh kishi."], ["네 명이에요.", "To'rt kishi."]], kw: ["명"] },
      { k: ["무슨 음식을 좋아해요?", "Qanday ovqatni yaxshi ko'rasiz?"], a: [["저는 비빔밥을 좋아해요.", "Men pibimpabni yaxshi ko'raman."], ["한국 음식을 좋아해요.", "Koreys taomlarini yaxshi ko'raman."]], kw: ["좋아해요"] },
      { k: ["내일 같이 밥 먹을까요?", "Ertaga birga ovqatlanamizmi?"], a: [["좋아요! 몇 시에 만날까요?", "Yaxshi! Soat nechada uchrashamiz?"], ["미안해요. 내일은 바빠요.", "Kechirasiz. Ertaga bandman."]], kw: ["좋아요", "바빠요"] }
    ] },
    road: { t: "🚇 Yo'lda", end: ["조심히 가세요!", "Ehtiyot bo'lib boring!"], turns: [
      { k: ["어디에 가요?", "Qayerga ketyapsiz?"], a: [["시장에 가요.", "Bozorga ketyapman."], ["회사에 가요.", "Ishga ketyapman."]], kw: ["가요"] },
      { k: ["버스로 가요? 지하철로 가요?", "Avtobusdami yoki metroda?"], a: [["지하철로 가요.", "Metroda boraman."], ["버스로 가요.", "Avtobusda boraman."]], kw: ["지하철", "버스"] },
      { k: ["길을 잃었어요? 도와드릴까요?", "Adashdingizmi? Yordam beraymi?"], a: [["네, 서울역이 어디예요?", "Ha, Seul vokzali qayerda?"], ["네, 화장실이 어디에 있어요?", "Ha, hojatxona qayerda?"]], kw: ["어디"] },
      { k: ["저기 은행 옆에 있어요. 걸어서 오 분 걸려요.", "U yerda, bank yonida. Piyoda besh daqiqa."], a: [["감사합니다!", "Rahmat!"], ["정말 고마워요.", "Juda katta rahmat."]], kw: ["감사", "고마워요"] },
      { k: ["교통카드 있어요?", "Transport kartangiz bormi?"], a: [["네, 있어요.", "Ha, bor."], ["아니요, 어디에서 사요?", "Yo'q, qayerdan sotib olaman?"]], kw: ["있어요", "사요"] }
    ] }
  };
  var REACT = {
    great: [["잘했어요!", "Zo'r!"], ["완벽해요!", "Mukammal!"], ["아주 좋아요!", "Juda yaxshi!"]],
    ok: [["좋아요!", "Yaxshi!"], ["괜찮아요!", "Yomon emas!"]],
    low: [["괜찮아요.", "Hechqisi yo'q."]]
  };
  var PHRASES = [
    [/salom|assalom|привет|здравств|hello|\bhi\b/i, "안녕하세요", "annyeonghaseyo", ["Salom", "Здравствуйте", "Hello"]],
    [/rahmat|tashakkur|спасибо|thank/i, "감사합니다", "gamsahamnida", ["Rahmat", "Спасибо", "Thank you"]],
    [/kechir|uzr|извин|прост|sorry|excuse/i, "죄송합니다", "joesonghamnida", ["Kechirasiz (uzr so'rash)", "Извините (извинение)", "I'm sorry (apology)"]],
    [/xayr|пока|до свидан|bye/i, "안녕히 계세요", "annyeonghi gyeseyo", ["Xayr (qolayotgan odamga)", "До свидания (тому, кто остаётся)", "Goodbye (to someone staying)"]],
    [/qancha|narx|сколько|цена|how much|price/i, "얼마예요?", "eolmayeyo?", ["Qancha turadi?", "Сколько стоит?", "How much is it?"]],
    [/hojatxona|tualet|туалет|toilet|bathroom/i, "화장실이 어디예요?", "hwajangsiri eodiyeyo?", ["Hojatxona qayerda?", "Где туалет?", "Where is the toilet?"]],
    [/qayerda|где|where/i, "어디예요?", "eodiyeyo?", ["Qayerda?", "Где?", "Where is it?"]],
    [/tushunmadim|bilmayman|не понял|не знаю|don't understand|don't know/i, "잘 모르겠어요", "jal moreugesseoyo", ["Tushunmadim / bilmayman", "Не понимаю / не знаю", "I don't understand / I don't know"]],
    [/sekin|медлен|slow/i, "천천히 말해 주세요", "cheoncheonhi malhae juseyo", ["Sekinroq gapiring", "Говорите медленнее", "Please speak slowly"]],
    [/takror|qaytar|повтор|repeat/i, "다시 한 번 말해 주세요", "dasi han beon malhae juseyo", ["Yana bir marta ayting", "Повторите, пожалуйста", "Please say it again"]],
    [/yordam|помог|помощ|help/i, "도와주세요", "dowajuseyo", ["Yordam bering", "Помогите", "Please help me"]],
    [/kasalxona|shifoxona|doktor|больниц|врач|hospital|doctor/i, "병원", "byeongwon", ["Kasalxona", "Больница", "Hospital"]],
    [/og'ri|ogri|болит|hurt|pain/i, "아파요", "apayo", ["Og'riyapti", "Болит", "It hurts"]],
    [/suv|вода|воды|water/i, "물", "mul", ["Suv", "Вода", "Water"]],
    [/ovqat|еда|еду|food|meal/i, "밥", "bap", ["Ovqat (guruch)", "Еда (рис)", "Meal (rice)"]],
    [/maosh|oylik|зарплат|salary/i, "월급", "wolgeup", ["Oylik maosh", "Зарплата", "Monthly salary"]],
    [/pul|деньг|money/i, "돈", "don", ["Pul", "Деньги", "Money"]],
    [/ism|зовут|имя|name/i, "이름이 뭐예요?", "ireumi mwoyeyo?", ["Ismingiz nima?", "Как вас зовут?", "What's your name?"]],
    [/tanish|приятно|nice to meet/i, "만나서 반갑습니다", "mannaseo bangapseumnida", ["Tanishganimdan xursandman", "Приятно познакомиться", "Nice to meet you"]],
    [/sevaman|yaxshi ko'raman|люблю|love/i, "사랑해요", "saranghaeyo", ["Sevaman", "Люблю", "I love you"]],
    [/do'st|dost|друг|friend/i, "친구", "chingu", ["Do'st", "Друг", "Friend"]],
    [/ertaga|завтра|tomorrow/i, "내일", "naeil", ["Ertaga", "Завтра", "Tomorrow"]],
    [/bugun|сегодня|today/i, "오늘", "oneul", ["Bugun", "Сегодня", "Today"]],
    [/kecha|вчера|yesterday/i, "어제", "eoje", ["Kecha", "Вчера", "Yesterday"]],
    [/soat necha|vaqt|который час|время|what time/i, "몇 시예요?", "myeot siyeyo?", ["Soat necha?", "Который час?", "What time is it?"]],
    [/\buy\b|\bдом|\bhome\b|\bhouse/i, "집", "jip", ["Uy", "Дом", "Home"]],
    [/\bish\b|работ|\bwork\b|\bjob\b/i, "일", "il", ["Ish", "Работа", "Work"]],
    [/^ha$|^ha\b|^да\b|^yes\b/i, "네", "ne", ["Ha", "Да", "Yes"]],
    [/yo'q|yoq|^нет|^no\b/i, "아니요", "aniyo", ["Yo'q", "Нет", "No"]],
    [/yaxshi|хорошо|good/i, "좋아요", "joayo", ["Yaxshi", "Хорошо", "Good"]]
  ];

  // Komiko suhbati tarjimalari: koreyscha → [ruscha, inglizcha]
  var CT = {
    "안녕하세요! 저는 코미코예요. 이름이 뭐예요?": ["Привет! Я Комико. Как вас зовут?", "Hi! I'm Komiko. What's your name?"],
    "제 이름은 {N}이에요.": ["Меня зовут {N}.", "My name is {N}."], "저는 {N}입니다.": ["Я — {N}.", "I am {N}."],
    "만나서 반가워요! 어느 나라 사람이에요?": ["Приятно познакомиться! Из какой вы страны?", "Nice to meet you! Where are you from?"],
    "저는 우즈베키스탄 사람이에요.": ["Я из Узбекистана.", "I'm from Uzbekistan."], "우즈베키스탄에서 왔어요.": ["Я приехал из Узбекистана.", "I came from Uzbekistan."],
    "몇 살이에요?": ["Сколько вам лет?", "How old are you?"], "스물다섯 살이에요.": ["Мне двадцать пять.", "I'm twenty-five."], "저는 스무 살이에요.": ["Мне двадцать.", "I'm twenty."],
    "무슨 일을 해요?": ["Чем вы занимаетесь?", "What do you do?"], "저는 학생이에요.": ["Я студент.", "I'm a student."], "저는 회사원이에요.": ["Я офисный работник.", "I'm an office worker."],
    "왜 한국어를 공부해요?": ["Почему вы учите корейский?", "Why are you studying Korean?"],
    "한국에서 일하고 싶어요.": ["Хочу работать в Корее.", "I want to work in Korea."], "한국 대학교에 가고 싶어요.": ["Хочу поступить в корейский университет.", "I want to go to a Korean university."],
    "오늘 정말 잘했어요! 다음에 또 만나요.": ["Сегодня было отлично! До встречи.", "You did great today! See you next time."],
    "안녕하세요. 오늘 처음 출근했어요?": ["Здравствуйте. Вы сегодня первый день на работе?", "Hello. Is today your first day at work?"],
    "네, 오늘 처음 왔어요.": ["Да, сегодня первый день.", "Yes, it's my first day."], "네, 잘 부탁드립니다.": ["Да, прошу любить и жаловать.", "Yes, I look forward to working with you."],
    "이 기계를 사용할 줄 알아요?": ["Вы умеете пользоваться этим станком?", "Do you know how to use this machine?"],
    "아니요, 잘 몰라요. 가르쳐 주세요.": ["Нет, плохо знаю. Научите, пожалуйста.", "No, not really. Please teach me."], "네, 사용할 줄 알아요.": ["Да, умею.", "Yes, I know how."],
    "일할 때 안전모를 꼭 쓰세요.": ["Во время работы обязательно носите каску.", "Always wear a hard hat while working."],
    "네, 알겠습니다.": ["Да, понял.", "Yes, understood."], "네, 꼭 쓰겠습니다.": ["Да, обязательно надену.", "Yes, I'll be sure to wear it."],
    "오늘 잔업이 있어요. 할 수 있어요?": ["Сегодня есть сверхурочная работа. Сможете?", "There's overtime today. Can you do it?"],
    "네, 할 수 있어요.": ["Да, смогу.", "Yes, I can."], "죄송하지만 오늘은 어려워요.": ["Извините, сегодня сложно.", "Sorry, today is difficult."],
    "손을 다쳤어요? 괜찮아요?": ["Вы поранили руку? Всё в порядке?", "Did you hurt your hand? Are you okay?"],
    "손이 좀 아파요. 병원에 가도 돼요?": ["Рука немного болит. Можно в больницу?", "My hand hurts a bit. May I go to the hospital?"], "괜찮아요. 조금 다쳤어요.": ["Ничего. Немного поранился.", "I'm okay. Just a small injury."],
    "첫날 수고했어요! 내일 또 봐요.": ["Спасибо за первый день! До завтра.", "Good work on your first day! See you tomorrow."],
    "어서 오세요! 뭘 찾으세요?": ["Добро пожаловать! Что ищете?", "Welcome! What are you looking for?"],
    "사과 있어요?": ["Яблоки есть?", "Do you have apples?"], "운동화를 찾아요.": ["Ищу кроссовки.", "I'm looking for sneakers."],
    "이거 어때요? 아주 신선해요.": ["Как вам это? Очень свежее.", "How about this? It's very fresh."],
    "이거 얼마예요?": ["Сколько это стоит?", "How much is this?"], "좋아요. 이거 주세요.": ["Хорошо. Дайте это.", "Good. I'll take this."],
    "한 개에 천 원이에요. 몇 개 드릴까요?": ["Тысяча вон за штуку. Сколько вам?", "1,000 won each. How many would you like?"],
    "다섯 개 주세요.": ["Дайте пять.", "Five, please."], "세 개 주세요.": ["Дайте три.", "Three, please."],
    "봉투 필요하세요?": ["Пакет нужен?", "Do you need a bag?"], "네, 하나 주세요.": ["Да, один, пожалуйста.", "Yes, one please."], "아니요, 괜찮아요.": ["Нет, не нужно.", "No, I'm fine."],
    "카드로 계산하시겠어요?": ["Будете платить картой?", "Will you pay by card?"],
    "네, 카드로 할게요.": ["Да, картой.", "Yes, by card."], "아니요, 현금으로 할게요.": ["Нет, наличными.", "No, in cash."],
    "감사합니다! 또 오세요.": ["Спасибо! Приходите ещё.", "Thank you! Come again."],
    "어디가 아프세요?": ["Что у вас болит?", "Where does it hurt?"], "머리가 아파요.": ["Болит голова.", "I have a headache."], "배가 아파요.": ["Болит живот.", "I have a stomachache."],
    "언제부터 아팠어요?": ["С какого времени болит?", "Since when has it hurt?"], "어제부터 아팠어요.": ["Со вчерашнего дня.", "Since yesterday."], "사흘 전부터 아팠어요.": ["Уже три дня.", "For three days."],
    "열도 있어요?": ["Температура тоже есть?", "Do you have a fever too?"], "네, 열이 조금 있어요.": ["Да, небольшая.", "Yes, a slight fever."], "아니요, 열은 없어요.": ["Нет, температуры нет.", "No, no fever."],
    "약을 하루에 세 번 드세요.": ["Принимайте лекарство три раза в день.", "Take the medicine three times a day."],
    "밥 먹고 먹어요?": ["После еды?", "After meals?"],
    "푹 쉬세요. 빨리 나으세요.": ["Хорошо отдохните. Выздоравливайте.", "Get some good rest. Get well soon."],
    "감사합니다, 선생님.": ["Спасибо, доктор.", "Thank you, doctor."], "네, 감사합니다.": ["Да, спасибо.", "Yes, thank you."],
    "빨리 나으세요!": ["Выздоравливайте!", "Get well soon!"],
    "오늘 날씨가 어때요?": ["Какая сегодня погода?", "How's the weather today?"], "오늘은 날씨가 좋아요.": ["Сегодня хорошая погода.", "The weather is nice today."], "오늘은 비가 와요.": ["Сегодня идёт дождь.", "It's raining today."],
    "주말에 보통 뭐 해요?": ["Что вы обычно делаете на выходных?", "What do you usually do on weekends?"],
    "친구들하고 축구를 해요.": ["Играю в футбол с друзьями.", "I play football with friends."], "집에서 쉬어요.": ["Отдыхаю дома.", "I rest at home."],
    "가족이 몇 명이에요?": ["Сколько человек в вашей семье?", "How many people are in your family?"], "우리 가족은 다섯 명이에요.": ["Нас в семье пятеро.", "There are five of us."], "네 명이에요.": ["Четыре человека.", "Four people."],
    "무슨 음식을 좋아해요?": ["Какую еду вы любите?", "What food do you like?"], "저는 비빔밥을 좋아해요.": ["Я люблю пибимпап.", "I like bibimbap."], "한국 음식을 좋아해요.": ["Люблю корейскую еду.", "I like Korean food."],
    "내일 같이 밥 먹을까요?": ["Пообедаем завтра вместе?", "Shall we eat together tomorrow?"],
    "좋아요! 몇 시에 만날까요?": ["Давайте! Во сколько встретимся?", "Sure! What time shall we meet?"], "미안해요. 내일은 바빠요.": ["Извините, завтра я занят.", "Sorry, I'm busy tomorrow."],
    "재미있었어요! 또 이야기해요.": ["Было интересно! Поговорим ещё.", "That was fun! Let's talk again."],
    "어디에 가요?": ["Куда вы идёте?", "Where are you going?"], "시장에 가요.": ["На рынок.", "To the market."], "회사에 가요.": ["На работу.", "To work."],
    "버스로 가요? 지하철로 가요?": ["На автобусе или на метро?", "By bus or by subway?"], "지하철로 가요.": ["На метро.", "By subway."], "버스로 가요.": ["На автобусе.", "By bus."],
    "길을 잃었어요? 도와드릴까요?": ["Заблудились? Помочь?", "Are you lost? Can I help?"],
    "네, 서울역이 어디예요?": ["Да, где станция Сеул?", "Yes, where is Seoul Station?"], "네, 화장실이 어디에 있어요?": ["Да, где туалет?", "Yes, where is the toilet?"],
    "저기 은행 옆에 있어요. 걸어서 오 분 걸려요.": ["Вон там, рядом с банком. Пять минут пешком.", "Over there, next to the bank. Five minutes on foot."],
    "감사합니다!": ["Спасибо!", "Thank you!"], "정말 고마워요.": ["Большое спасибо.", "Thanks so much."],
    "교통카드 있어요?": ["У вас есть транспортная карта?", "Do you have a transit card?"], "네, 있어요.": ["Да, есть.", "Yes, I do."], "아니요, 어디에서 사요?": ["Нет, где её купить?", "No, where do I buy one?"],
    "조심히 가세요!": ["Счастливого пути!", "Get home safely!"],
    "잘했어요!": ["Молодец!", "Well done!"], "완벽해요!": ["Идеально!", "Perfect!"], "아주 좋아요!": ["Очень хорошо!", "Very good!"],
    "좋아요!": ["Хорошо!", "Good!"], "괜찮아요!": ["Неплохо!", "Not bad!"], "괜찮아요.": ["Ничего страшного.", "That's okay."],
    "다시 한 번 말해 볼까요?": ["Попробуем ещё раз?", "Shall we try once more?"]
  };
  var LI = { ru: 0, en: 1 };
  function L() { return window.I18N ? I18N.lang() : "uz"; }
  function tr(ko, uz) { var l = L(); if (l === "uz") return uz; var v = CT[ko]; return v ? v[LI[l]] : uz; }
  function T(m, v) { return window.I18N ? I18N.f(m, v) : m.uz; }
  var kc = { topic: "intro", i: 0, tries: 0, scores: [], done: false, busy: false };

  function chatLog() { return $("chLog"); }
  function add(html) {
    var log = chatLog(); log.insertAdjacentHTML("beforeend", html);
    var last = log.lastElementChild;
    if (last && last.scrollIntoView) last.scrollIntoView({ block: "end", behavior: "smooth" });
    return last;
  }
  function nameFill(s) { var n = Profile.name() || "…"; return s.replace("{N}", n); }
  // Boshqa ikki tildagi tarjima: parts = [[ko, uz], ...]
  function othersOf(parts) {
    var l = L();
    return ["uz", "ru", "en"].filter(function (x) { return x !== l; }).map(function (x) {
      var t = parts.map(function (p) { return x === "uz" ? p[1] : ((CT[p[0]] || [])[LI[x]] || ""); }).join(" ").trim();
      return t ? (window.I18N ? I18N.FLAG[x] : x) + " " + nameFill(t) : "";
    }).filter(Boolean).join(" · ");
  }
  function komikoSay(ko, uz, chips, parts) {
    var oth = parts ? othersOf(parts) : "";
    document.querySelectorAll("#chLog .k-chips").forEach(function (c) { c.remove(); });
    document.querySelectorAll("#chLog .komiko.live").forEach(function (s) { s.classList.remove("live", "talking"); });
    var h = '<div class="k-row">' + avatar(38, "live") + '<div class="bub ai"><div class="ko">' + (window.PWDict ? PWDict.linkify(esc(ko)) : esc(ko)) +
      ' <button class="mini" data-say="' + esc(ko) + '" aria-label="Tinglash">🔊</button></div>' + (uz ? '<div class="tr">' + esc(uz) + '</div>' : '') + (oth ? '<div class="tri">' + esc(oth) + '</div>' : '') + '</div></div>';
    if (chips && chips.length) {
      h += '<div class="k-chips"><div class="k-chips-t">' + T({ uz: "💡 Shunday javob berishingiz mumkin (bosib tinglang):", ru: "💡 Можно ответить так (нажмите, чтобы послушать):", en: "💡 You could answer like this (tap to listen):" }) + '</div>' + chips.map(function (a) {
        var ko2 = nameFill(a[0]);
        return '<button class="k-chip" data-say="' + esc(ko2) + '"><span class="ko">' + esc(ko2) + '</span><small>' + esc(nameFill(tr(a[0], a[1]))) + '</small><small class="tri">' + esc(othersOf([[a[0], a[1]]])) + '</small></button>';
      }).join("") + '</div>';
    }
    add(h);
    speak(ko);
  }
  function setTopicButtons() {
    var box = $("chTopics");
    box.innerHTML = Object.keys(SCRIPTS).map(function (k) {
      return '<button data-t="' + k + '"' + (k === kc.topic ? ' class="on"' : '') + '>' + SCRIPTS[k].t + '</button>';
    }).join("");
    box.querySelectorAll("button").forEach(function (b) {
      b.onclick = function () {
        box.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); });
        kc.topic = b.dataset.t; startLocalChat();
      };
    });
  }
  function startLocalChat() {
    stopAll();
    kc.i = 0; kc.tries = 0; kc.scores = []; kc.done = false; kc.busy = false;
    var S = SCRIPTS[kc.topic];
    chatLog().innerHTML = '<div class="k-intro">' + avatar(54) + '<div><b>' + T({ uz: "Komiko bilan suhbat", ru: "Разговор с Комико", en: "Talk with Komiko" }) + ': ' + esc(window.I18N ? I18N.t(S.t) : S.t) + '</b>' +
      '<div class="note" style="font-size:13.5px">' + T({ uz: "Komiko gapiradi → 🎙️ ni bosib koreyscha javob bering. Har bir javobingiz baholanadi. Yozib ham javob berishingiz yoki o'zbekcha so'rashingiz mumkin: masalan, «rahmat koreyscha qanday?»",
        ru: "Комико говорит → нажмите 🎙️ и ответьте по-корейски. Каждый ответ оценивается. Можно писать или спросить по-русски: например, «как сказать спасибо?»",
        en: "Komiko speaks → tap 🎙️ and answer in Korean. Every answer is scored. You can also type, or ask in English: e.g. \"how do you say thank you?\"" }) + '</div></div></div>';
    askTurn();
  }
  function askTurn() {
    var T = SCRIPTS[kc.topic].turns[kc.i];
    kc.tries = 0;
    komikoSay(T.k[0], tr(T.k[0], T.k[1]), T.a, [T.k]);
  }
  function evalAnswer(variants) {
    var T = SCRIPTS[kc.topic].turns[kc.i], bestR = null, bestA = null;
    T.a.forEach(function (a) {
      var tmpl = a[0].replace("{N}", "");
      variants.forEach(function (v) {
        var r = compare(tmpl, v);
        // Shablonning qancha qismi aytilganiga qaraymiz (ism, son kabi o'zgaruvchi so'zlar ortiqcha bo'lishi mumkin)
        var sc = Math.round(Math.max(r.cover * 100, r.score));
        var hasKw = (T.kw || []).some(function (k) { return onlyHangul(v).indexOf(onlyHangul(k)) >= 0; });
        if (hasKw) sc = Math.max(sc, 72);
        if (!bestR || sc > bestR.sc) { bestR = { sc: sc, said: v, marks: r.marks }; bestA = a; }
      });
    });
    return { r: bestR, a: bestA };
  }
  // Lug'at savoli («X nima degani?», «what does X mean?», «X 뜻이 뭐예요?») — javob lug'atdan
  function dictReply(text, shown) {
    if (!window.PWDict) return false;
    var p = PWDict.answer(text);
    if (!p) return false;
    add('<div class="bub me">' + esc(shown || text) + '</div>');
    var w = add('<div class="k-row">' + avatar(38, "live talking") + '<div class="bub ai"><span class="spin"></span></div></div>');
    p.then(function (r) {
      if (w) w.remove();
      var row = add('<div class="k-row">' + avatar(38) + '<div class="bub ai k-dict">' + r.html + '</div></div>');
      if (row) PWDict.bind(row);
      if (r.entries && r.entries[0]) speak(r.entries[0].ko);
    }).catch(function (e) {
      if (w) w.remove();
      add('<div class="err">📖 ' + esc((e && e.message) || "Lug'at javob bermadi.") + '</div>');
    });
    return true;
  }
  function userAnswer(variants, typed) {
    if (kc.done || kc.busy) return;
    var said = variants[0] || "";
    if (typed && dictReply(said)) return;
    if (!/[가-힣]/.test(variants.join(""))) { helpUz(said); return; }
    var E = evalAnswer(variants), sc = Math.min(100, E.r.sc);
    add('<div class="bub me ko">' + (typed ? "" : "🎙️ ") + esc(E.r.said) + '</div>');
    var good = sc >= 80, okay = sc >= 55;
    var model = nameFill(E.a[0]);
    var fix = '<div class="fix ' + (good ? "" : okay ? "mid" : "low") + '"><b>' + (good ? T({ uz: "✅ To'g'ri!", ru: "✅ Верно!", en: "✅ Correct!" }) : okay ? T({ uz: "🟡 Yaxshi, lekin aniqroq:", ru: "🟡 Хорошо, но точнее:", en: "🟡 Good, but more precisely:" }) : T({ uz: "🔴 To'liq tushunmadim.", ru: "🔴 Не совсем понял.", en: "🔴 I didn't quite get that." })) + ' ' + sc + ' ' + T({ uz: "ball", ru: "баллов", en: "pts" }) + '</b>';
    if (!good) fix += '<div class="ko" style="margin-top:4px">' + T({ uz: "To'g'ri variant", ru: "Правильно", en: "Correct version" }) + ': <b>' + esc(model) + '</b> <button class="mini" data-say="' + esc(model) + '">🔊</button></div><div>' + esc(nameFill(tr(E.a[0], E.a[1]))) + '</div>';
    fix += '</div>';
    add(fix);
    Activity.mark("chat");
    if (!okay && kc.tries === 0) {
      kc.tries++;
      setTimeout(function () { komikoSay("다시 한 번 말해 볼까요?", tr("다시 한 번 말해 볼까요?", "Yana bir marta aytib ko'ramizmi?"), SCRIPTS[kc.topic].turns[kc.i].a, [["다시 한 번 말해 볼까요?", "Yana bir marta aytib ko'ramizmi?"]]); }, 500);
      return;
    }
    kc.scores.push(sc);
    var R = (good ? REACT.great : okay ? REACT.ok : REACT.low);
    R = R[Math.floor(Math.random() * R.length)];
    kc.i++;
    var S = SCRIPTS[kc.topic];
    kc.busy = true;
    setTimeout(function () {
      kc.busy = false;
      if (kc.i >= S.turns.length) { finishLocal(R); return; }
      var T = S.turns[kc.i]; kc.tries = 0;
      komikoSay(R[0] + " " + T.k[0], tr(R[0], R[1]) + " " + tr(T.k[0], T.k[1]), T.a, [R, T.k]);
    }, 700);
  }
  function finishLocal(R) {
    kc.done = true;
    var S = SCRIPTS[kc.topic];
    var avg = kc.scores.length ? Math.round(kc.scores.reduce(function (a, b) { return a + b; }, 0) / kc.scores.length) : 0;
    komikoSay(R[0] + " " + S.end[0], tr(R[0], R[1]) + " " + tr(S.end[0], S.end[1]), null, [R, S.end]);
    H.pushHist("speak", { overall: avg, accuracy: avg, pronunciation: avg, fluency: null, level: "chat-" + kc.topic, date: today() });
    var keys = Object.keys(SCRIPTS), next = keys[(keys.indexOf(kc.topic) + 1) % keys.length];
    add('<div class="card k-sum"><div style="font-weight:800;font-size:17px">🎉 Suhbat tugadi: o\'rtacha ' + avg + ' ball</div>' +
      '<div class="note">' + (avg >= 80 ? "Ajoyib natija! Keyingi mavzuga o'ting." : avg >= 55 ? "Yaxshi! Yana bir marta takrorlasangiz, natija oshadi." : "Shu mavzuni yana bir marta mashq qiling: javob variantlarini tinglab, takrorlang.") + '</div>' +
      '<div class="row" style="margin-top:10px"><button class="btn ghost" id="kAgain">🔁 Qaytadan</button><button class="btn" id="kNext">' + esc(SCRIPTS[next].t) + ' →</button></div></div>');
    $("kAgain").onclick = startLocalChat;
    $("kNext").onclick = function () { kc.topic = next; setTopicButtons(); startLocalChat(); };
  }
  function helpUz(text) {
    var hit = PHRASES.find(function (p) { return p[0].test(text); });
    // Iboralar ro'yxatida yo'q bo'lsa — lug'atdan (savol shaklida yoki qisqa so'z bo'lsa to'g'ridan-to'g'ri)
    if (!hit && (dictReply(text) || (text.length <= 30 && text.split(/\s+/).length <= 3 && dictReply("tarjima: " + text, text)))) return;
    add('<div class="bub me">' + esc(text) + '</div>');
    if (hit) {
      var lbl = hit[3][{ uz: 0, ru: 1, en: 2 }[L()]];
      add('<div class="k-row">' + avatar(38) + '<div class="bub ai"><div>«' + esc(lbl) + '» ' + T({ uz: "koreyscha:", ru: "по-корейски:", en: "in Korean:" }) + '</div><div class="ko" style="font-size:20px;font-weight:700;margin-top:4px">' + esc(hit[1]) +
        ' <button class="mini" data-say="' + esc(hit[1]) + '">🔊</button></div><div class="tr">' + T({ uz: "O'qilishi", ru: "Читается", en: "Reads as" }) + ': ' + esc(hit[2]) + '</div></div></div>');
      speak(hit[1]);
    } else {
      add('<div class="k-row">' + avatar(38) + '<div class="bub ai">' + T({ uz: "Buni hozircha bilmayman 🙂 Yuqoridagi variantlardan birini koreyscha aytib ko'ring. Oddiy iboralarni ham so'rashingiz mumkin: «rahmat», «qancha turadi», «tushunmadim», «yordam bering».",
        ru: "Этого я пока не знаю 🙂 Скажите по-корейски один из вариантов выше. Можно спросить простые фразы: «спасибо», «сколько стоит», «не понимаю», «помогите».",
        en: "I don't know that yet 🙂 Try saying one of the options above in Korean. You can also ask simple phrases: \"thank you\", \"how much\", \"I don't understand\", \"help\"." }) + '</div></div>');
    }
  }
  function chatLocal() {
    setTopicButtons();
    var mic = $("chMic"), send = $("chSend"), inp = $("chText");
    inp.placeholder = window.I18N ? I18N.t("Koreyscha yozing yoki o'zbekcha so'rang…") : "Koreyscha yozing yoki o'zbekcha so'rang…";
    mic.onclick = function () {
      if (lis.on) { stopListen(); return; }
      if (kc.done) { toast("Suhbat tugadi: «Qaytadan» yoki keyingi mavzuni tanlang."); return; }
      micUI(mic, true);
      var w = add('<div class="bub me k-wait">🎧 Tinglayapman…</div>');
      listen().then(function (v) { if (w) w.remove(); micUI(mic, false); userAnswer(v, false); })
        .catch(function (e) { if (w) w.remove(); micUI(mic, false); add('<div class="err">🎙️ ' + esc(e.message) + '</div>'); });
    };
    send.onclick = function () {
      var v = inp.value.trim(); if (!v) return;
      inp.value = "";
      if (kc.done && /[가-힣]/.test(v)) { toast("Suhbat tugadi: «Qaytadan» ni bosing."); return; }
      userAnswer([v], true);
    };
  }

  // =====================================================================
  // GAPIRISH SAHIFASI
  // =====================================================================
  var initDone = false;
  function onSpeakView() {
    var head = $("kHead");
    if (head) head.innerHTML = avatar(46, "live") + '<div><div style="font-weight:800">Komiko</div><div class="note" style="font-size:12.5px">' +
      (Profile.voice() === "male" ? T({ uz: "Erkak ovozi", ru: "Мужской голос", en: "Male voice" }) : T({ uz: "Ayol ovozi", ru: "Женский голос", en: "Female voice" })) + ' · ' +
      (Profile.speed() === "slow" ? T({ uz: "sekin", ru: "медленно", en: "slow" }) : T({ uz: "odatiy tezlik", ru: "обычная скорость", en: "normal speed" })) + '</div></div>' +
      '<button class="btn ghost" id="kVoiceBtn" style="margin-left:auto;padding:7px 12px;font-size:13px">🔈 Ovozni o\'zgartirish</button>';
    var vb = $("kVoiceBtn"); if (vb) vb.onclick = voicePicker;
    if (initDone) return;
    initDone = true;
    if (LOCAL() && canListen()) { pronLocal(); chatLocal(); }
    else if (LOCAL()) {
      // Nutqni tanish yo'q (masalan, kompyuter brauzeri): faqat yozib javob berish
      chatLocal();
      $("chMic").onclick = $("spMic").onclick = function () { toast("Bu qurilmada nutqni tanish yo'q: telefondagi ilovada ishlaydi. Hozircha yozib javob bering."); };
    }
    if (LOCAL()) {
      // Talaffuz ↔ Komiko suhbati almashinuvi (server versiyasidagi suhbat o'rniga)
      $("spSeg").querySelectorAll("button").forEach(function (b) {
        b.onclick = function () {
          stopAll();
          $("spSeg").querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); });
          var chat = b.dataset.m === "chat";
          $("spPron").hidden = chat; $("spChat").hidden = !chat;
          if (chat && !kc.started) { kc.started = true; startLocalChat(); }
        };
      });
    }
  }
  // Boshqa sahifadan to'g'ridan-to'g'ri Komiko suhbatini ochish
  function openChat() {
    H.go("speak");
    var b = document.querySelector('#spSeg [data-m="chat"]'); if (b) b.click();
  }
  function voicePicker() {
    var v = Profile.voice(), s = Profile.speed();
    sheet('<h3 style="margin:0 0 10px">🔈 Komiko ovozi</h3>' +
      '<div class="k-vopts"><button class="k-vo' + (v === "female" ? " on" : "") + '" data-v="female">👩 Ayol</button><button class="k-vo' + (v === "male" ? " on" : "") + '" data-v="male">👨 Erkak</button></div>' +
      '<div class="k-vopts" style="margin-top:8px"><button class="k-vs' + (s === "slow" ? " on" : "") + '" data-s="slow">🐢 Sekin</button><button class="k-vs' + (s !== "slow" ? " on" : "") + '" data-s="normal">🚶 Odatiy</button></div>' +
      '<button class="btn" id="kVTest" style="width:100%;margin-top:12px">▶ Tinglab ko\'rish</button>');
    var box = $("kSheet");
    box.querySelectorAll(".k-vo").forEach(function (b) {
      b.onclick = function () { var p = Profile.get() || {}; p.voice = b.dataset.v; Profile.set(p); box.querySelectorAll(".k-vo").forEach(function (x) { x.classList.toggle("on", x === b); }); onSpeakView(); speak("안녕하세요! 저는 코미코예요."); };
    });
    box.querySelectorAll(".k-vs").forEach(function (b) {
      b.onclick = function () { var p = Profile.get() || {}; p.speed = b.dataset.s; Profile.set(p); box.querySelectorAll(".k-vs").forEach(function (x) { x.classList.toggle("on", x === b); }); onSpeakView(); };
    });
    $("kVTest").onclick = function () { speak("안녕하세요! 저는 코미코예요. 같이 한국어를 공부해요."); };
  }

  // Sahifadagi matnlarni Komiko nomiga moslash
  function rename() {
    var seg = document.querySelector('#spSeg [data-m="chat"]'); if (seg) seg.innerHTML = "🤖 Komiko bilan suhbat";
    var sp = $("v-speak");
    if (sp && !$("kHead")) {
      var h2 = sp.querySelector("h2");
      var d = document.createElement("div"); d.className = "k-head"; d.id = "kHead";
      if (h2) h2.insertAdjacentElement("afterend", d);
    }
  }
  rename();

  // Darajaga mos talaffuz to'plami
  document.addEventListener("pw:profile", function () { initLevel(); });
  function initLevel() {
    var lv = Profile.level(), map = ["beg", "beg", "eps", "adv", "adv"];
    var p = Profile.get();
    var want = p && p.goal === "eps" && lv <= 2 ? "eps" : map[lv] || "beg";
    var b = document.querySelector('#spLevels [data-l="' + want + '"]');
    if (b && !b.classList.contains("on")) b.click();
  }
  if (Profile.get()) setTimeout(initLevel, 0);

  // Server AI javob bermasa (band, limit, internet) — suhbat va talaffuz avtomatik oflayn rejimga o'tadi
  var rawApi = H.api;
  H.api = function (path, opt) {
    return rawApi(path, opt).catch(function (e) {
      if (/^\/api\/(chat|speech)/.test(path) && !LOCAL()) {
        aiDown = Date.now();
        H.toast(T({ uz: "AI serveri hozir band — Komiko oflayn rejimda davom etadi.", ru: "Сервер ИИ занят — Комико продолжит в офлайн-режиме.", en: "The AI server is busy — Komiko continues in offline mode." }));
        initDone = false; kc.started = false;
        setTimeout(function () { onSpeakView(); var b = document.querySelector('#spSeg button.on'); if (b) b.click(); }, 50);
      }
      throw e;
    });
  };
  window.Komiko = {
    speakSlow: function (text) {  // sekin talaffuz (lug'at 🐢 tugmasi)
      var K = window.Komiko; K.tmpSpeed = "slow"; K.tmpRate = 0.72;
      var p = speak(text);
      setTimeout(function () { K.tmpSpeed = null; }, 60);
      return Promise.resolve(p).then(function () { K.tmpRate = null; }, function () { K.tmpRate = null; });
    },
    speak: speak, sayLocal: sayLocal, stop: stopAll, listen: listen, isListening: function () { return lis.on; }, stopListen: stopListen, canListen: canListen,
    compare: compare, best: best, avatar: avatar, Profile: Profile, Activity: Activity,
    sheet: sheet, closeSheet: closeSheet, openChat: openChat, voicePicker: voicePicker, today: today, LOCAL: LOCAL, onlyHangul: onlyHangul
  };
  document.dispatchEvent(new CustomEvent("komiko:ready"));
})();
