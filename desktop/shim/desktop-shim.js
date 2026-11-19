/* Hanguk Way — kompyuter ilovasi (Windows / macOS) uchun moslashtirish.
   app-mode.js dan OLDIN yuklanadi. Ilovani "mobil ilova" rejimiga o'tkazadi (mehmon sifatida serverga kiradi)
   va nutqni tanishni server orqali bajaradi: kompyuter brauzerining nutq xizmati Electron'da ishlamaydi. */
(function () {
  if (!window.PW_DESKTOP) return;
  document.documentElement.classList.add("desktop");

  function cfg() { return (window.PW_CONFIG && window.PW_CONFIG.apiBase || "").replace(/\/$/, ""); }

  // ---- Nutqni tanish: mikrofon → ovoz yozuvi → /api/stt ----
  var cur = null;
  function stopCur() { if (cur) cur.stop(); }
  var SpeechRecognition = {
    available: function () { return Promise.resolve({ available: !!(navigator.mediaDevices && window.MediaRecorder) }); },
    checkPermissions: function () { return Promise.resolve({ speechRecognition: "granted" }); },
    requestPermissions: function () { return Promise.resolve({ speechRecognition: "granted" }); },
    stop: function () { stopCur(); return Promise.resolve(); },
    start: function (o) {
      o = o || {};
      return navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }).then(function (stream) {
        return new Promise(function (resolve, reject) {
          var types = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus"], mime = "";
          for (var i = 0; i < types.length; i++) if (MediaRecorder.isTypeSupported(types[i])) { mime = types[i]; break; }
          var mr = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined), chunks = [];
          var ac = new (window.AudioContext || window.webkitAudioContext)();
          try { ac.resume(); } catch (e) {}
          var an = ac.createAnalyser(); an.fftSize = 1024; ac.createMediaStreamSource(stream).connect(an);
          var buf = new Float32Array(an.fftSize), t0 = Date.now(), heard = 0, lastLoud = 0, done = false, timer, anyLevel = false, floor = 1;
          function finish() {
            if (done) return; done = true; clearInterval(timer);
            try { mr.stop(); } catch (e) {}
          }
          cur = { stop: finish };
          timer = setInterval(function () {
            an.getFloatTimeDomainData(buf);
            var s = 0; for (var k = 0; k < buf.length; k++) s += buf[k] * buf[k];
            var rms = Math.sqrt(s / buf.length), now = Date.now();
            if (rms > 1e-4) anyLevel = true;
            if (now - t0 < 400) { floor = Math.min(floor, rms); return; }   // fon shovqini darajasi
            if (rms > Math.max(0.012, floor * 4)) { if (!heard) heard = now; lastLoud = now; }
            // Ovoz darajasini o'lchab bo'lmasa (ba'zi qurilmalar): 6 soniya yozib, serverga yuboriladi
            if (!anyLevel && now - t0 > 1500) { heard = heard || t0; if (now - t0 > 6000) finish(); return; }
            if (heard && now - lastLoud > 1300) finish();          // gap tugadi
            else if (!heard && now - t0 > 7000) finish();           // hech narsa eshitilmadi
            else if (now - t0 > 15000) finish();                    // eng uzog'i 15 soniya
          }, 100);
          mr.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
          mr.onstop = function () {
            cur = null;
            try { stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {}
            try { ac.close(); } catch (e) {}
            if (!heard) { reject(new Error("no match")); return; }
            var fd = new FormData();
            fd.append("audio", new Blob(chunks, { type: mr.mimeType || "audio/webm" }), "speech.webm");
            fd.append("lang", String(o.language || "ko-KR"));
            var h = {}; if (window.PW && PW.token) h.Authorization = "Bearer " + PW.token;
            fetch(cfg() + "/api/stt", { method: "POST", headers: h, body: fd })
              .then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.error || "network"); return j; }); })
              .then(function (j) { var t = String(j.transcript || "").trim(); if (!t) throw new Error("no match"); resolve({ matches: [t] }); })
              .catch(reject);
          };
          mr.start(250);
        });
      });
    }
  };

  window.Capacitor = {
    isNativePlatform: function () { return true; },
    getPlatform: function () { return window.PW_DESKTOP.platform === "darwin" ? "mac" : "windows"; },
    Plugins: { SpeechRecognition: SpeechRecognition }
  };
})();
