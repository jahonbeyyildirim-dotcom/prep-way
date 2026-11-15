/* Prep Way — DAFTAR TEKSHIRUVI.
   Komiko topshiriq beradi → o'quvchi daftarga qo'lda yozadi → kamera bilan rasmga oladi →
   rasm ichidagi koreyscha matn telefonning o'zida o'qiladi (Google ML Kit, internetsiz) yoki server (Gemini) orqali →
   har bir band kutilgan javob bilan solishtiriladi. Joylashuv (GPS) ham belgilanadi. */
(function () {
  var H = window.HY, K = window.Komiko;
  if (!H || !K) return;
  var $ = H.$, esc = H.esc, toast = H.toast;
  var C = window.Capacitor, P = (C && C.Plugins) || {};
  var NATIVE = !!(window.PW && window.PW.native);

  // ---------- Topshiriqlar (daraja bo'yicha) ----------
  var TASKS = [
    { id: "h0a", lv: [0], title: "Hangul: oila va oddiy so'zlar", how: "Har bir so'zni koreys harflari bilan daftaringizga yozing.", items: [
      ["ona", "엄마"], ["ota", "아빠"], ["sut", "우유"], ["bola", "아이"], ["bodring", "오이"]] },
    { id: "h0b", lv: [0, 1], title: "Hangul: kundalik so'zlar", how: "So'zlarni koreyscha yozing.", items: [
      ["suv", "물"], ["kitob", "책"], ["uy", "집"], ["non", "빵"], ["olma", "사과"]] },
    { id: "h1a", lv: [1], title: "Joylar", how: "Joy nomlarini koreyscha yozing.", items: [
      ["maktab", "학교"], ["kasalxona", "병원"], ["do'kon", "가게"], ["bank", "은행"], ["kutubxona", "도서관"]] },
    { id: "h1b", lv: [1, 2], goal: "eps", title: "Ish joyi so'zlari (EPS)", how: "EPS-TOPIK'da ko'p uchraydigan so'zlarni yozing.", items: [
      ["zavod", "공장"], ["qo'lqop", "장갑"], ["kaska", "안전모"], ["ombor", "창고"], ["maosh", "월급"]] },
    { id: "h1c", lv: [1, 2], title: "Hafta kunlari", how: "Hafta kunlarini koreyscha yozing.", items: [
      ["dushanba", "월요일"], ["seshanba", "화요일"], ["chorshanba", "수요일"], ["payshanba", "목요일"], ["juma", "금요일"]] },
    { id: "h2a", lv: [2, 3], title: "Kundalik gaplar", how: "Gaplarni koreyschaga tarjima qilib yozing.", items: [
      ["Men talabaman.", "저는 학생입니다."], ["Bu qancha turadi?", "이거 얼마예요?"], ["Hojatxona qayerda?", "화장실이 어디예요?"],
      ["Rahmat.", "감사합니다."], ["O'zbekistondan keldim.", "우즈베키스탄에서 왔어요."]] },
    { id: "h2b", lv: [2, 3], goal: "eps", title: "Ish joyida gaplar (EPS)", how: "Gaplarni koreyschaga tarjima qilib yozing.", items: [
      ["Kaskani kiying.", "안전모를 쓰세요."], ["Mashina buzildi.", "기계가 고장 났어요."], ["Qo'limni jarohatladim.", "손을 다쳤어요."],
      ["Bugun qo'shimcha ish bormi?", "오늘 잔업이 있어요?"], ["Omborga olib boring.", "창고에 가져가세요."]] },
    { id: "h3a", lv: [3, 4], title: "Murakkab gaplar", how: "Gaplarni koreyschaga tarjima qiling (grammatikaga e'tibor bering).", items: [
      ["Ertaga yomg'ir yog'adi, soyabon oling.", "내일 비가 오니까 우산을 가져가세요."], ["Vaqtim bo'lsa, sayohatga boraman.", "시간이 있으면 여행을 갈 거예요."],
      ["Kitob o'qish uchun kutubxonaga bordim.", "책을 읽으려고 도서관에 갔어요."], ["U kelguncha kutaman.", "그 사람이 올 때까지 기다릴게요."],
      ["Koreys tilini o'rganish qiyin, lekin qiziq.", "한국어 공부는 어렵지만 재미있어요."]] }
  ];
  var HKEY = "pwHomework", TKEY = "pwHwTask", LKEY = "pwHwLoc";
  function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  function poolForMe() {
    var p = K.Profile.get() || {}, lv = p.level == null ? 1 : p.level;
    var pool = TASKS.filter(function (t) { return t.lv.indexOf(lv) >= 0 && (!t.goal || t.goal === p.goal); });
    if (!pool.length) pool = TASKS.filter(function (t) { return t.lv.indexOf(lv) >= 0; });
    return pool.length ? pool : TASKS;
  }
  function curTask() {
    var id = load(TKEY, ""), t = TASKS.filter(function (x) { return x.id === id; })[0];
    if (!t) { t = poolForMe()[0]; save(TKEY, t.id); }
    return t;
  }
  function nextTask() {
    var pool = poolForMe(), cur = curTask(), i = pool.indexOf(cur);
    var t = pool[(i + 1) % pool.length];
    if (t === cur && pool.length === 1) t = TASKS[(TASKS.indexOf(cur) + 1) % TASKS.length];
    save(TKEY, t.id); renderTask(); $("hwOut").innerHTML = "";
  }

  // ---------- Joylashuv ----------
  var PLACES = [
    ["Toshkent", 41.311, 69.279], ["Samarqand", 39.654, 66.959], ["Buxoro", 39.767, 64.423], ["Namangan", 40.998, 71.672],
    ["Andijon", 40.783, 72.344], ["Farg'ona", 40.389, 71.783], ["Qo'qon", 40.528, 70.943], ["Marg'ilon", 40.471, 71.724],
    ["Qarshi", 38.861, 65.789], ["Nukus", 42.461, 59.617], ["Urganch", 41.55, 60.633], ["Jizzax", 40.116, 67.842],
    ["Guliston", 40.49, 68.784], ["Navoiy", 40.103, 65.379], ["Termiz", 37.224, 67.278], ["Chirchiq", 41.469, 69.582],
    ["Olmaliq", 40.844, 69.598], ["Angren", 41.017, 70.144], ["Xiva", 41.378, 60.364], ["Shahrisabz", 39.058, 66.834],
    ["Seul", 37.566, 126.978], ["Pusan", 35.18, 129.075], ["Inchxon", 37.456, 126.705], ["Tegu", 35.871, 128.601],
    ["Kvanju", 35.16, 126.851], ["Tejon", 36.35, 127.385], ["Ulsan", 35.539, 129.311], ["Suvon", 37.263, 127.029],
    ["Ansan", 37.322, 126.831], ["Kimxe", 35.234, 128.889], ["Chxonan", 36.815, 127.114], ["Xvason", 37.2, 126.83],
    ["Pyontxek", 36.992, 127.113], ["Chxanvon", 35.228, 128.681], ["Kumi", 36.12, 128.344], ["Moskva", 55.756, 37.617]
  ];
  function km(a, b, c, d) {
    var R = 6371, r = Math.PI / 180, x = (c - a) * r, y = (d - b) * r;
    var h = Math.sin(x / 2) * Math.sin(x / 2) + Math.cos(a * r) * Math.cos(c * r) * Math.sin(y / 2) * Math.sin(y / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function nearest(lat, lon) {
    var b = null;
    PLACES.forEach(function (p) { var d = km(lat, lon, p[1], p[2]); if (!b || d < b.d) b = { n: p[0], d: d }; });
    return b && b.d < 60 ? b : null;
  }
  function placeText(g) {
    if (!g) return "";
    var n = nearest(g.lat, g.lon);
    return (n ? (n.d < 3 ? n.n : n.n + " yaqinida (" + Math.round(n.d) + " km)") : "Joylashuv aniqlandi");
  }
  function getLocation() {
    var done = function (pos) { return { lat: pos.coords.latitude, lon: pos.coords.longitude, acc: Math.round(pos.coords.accuracy || 0), t: Date.now() }; };
    var opts = { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 };
    var GL = P.Geolocation;
    if (GL && NATIVE) {
      return GL.checkPermissions().then(function (p) {
        if (p && (p.location === "granted" || p.coarseLocation === "granted")) return p;
        return GL.requestPermissions({ permissions: ["location", "coarseLocation"] });
      }).then(function (p) {
        if (!p || (p.location !== "granted" && p.coarseLocation !== "granted")) throw new Error("denied");
        return GL.getCurrentPosition(opts);
      }).then(done);
    }
    if (navigator.geolocation) {
      return new Promise(function (res, rej) { navigator.geolocation.getCurrentPosition(function (p) { res(done(p)); }, rej, opts); });
    }
    return Promise.reject(new Error("no geo"));
  }

  // ---------- Rasm olish ----------
  function takePhoto(fromGallery) {
    var Cam = P.Camera;
    if (Cam && NATIVE && Cam.takePhoto) {
      var o = { quality: 85, targetWidth: 1800, targetHeight: 2400, correctOrientation: true, saveToGallery: false, editable: "no" };
      return (fromGallery ? Cam.chooseFromGallery({ quality: 85, targetWidth: 1800, targetHeight: 2400, correctOrientation: true, mediaType: 0, limit: 1 })
        .then(function (r) { return (r && r.results && r.results[0]) || Promise.reject(new Error("cancel")); }) : Cam.takePhoto(o))
        .then(function (r) { return { path: r.uri, url: r.webPath || (r.uri && C.convertFileSrc ? C.convertFileSrc(r.uri) : ""), format: "jpeg" }; });
    }
    if (Cam && NATIVE) {
      return Cam.getPhoto({ quality: 85, resultType: "uri", source: fromGallery ? "PHOTOS" : "CAMERA", correctOrientation: true,
        width: 1800, saveToGallery: false, allowEditing: false })
        .then(function (r) { return { path: r.path, url: r.webPath, format: r.format || "jpeg" }; });
    }
    return new Promise(function (res, rej) {
      var inp = $("hwFile");
      inp.value = "";
      if (fromGallery) inp.removeAttribute("capture"); else inp.setAttribute("capture", "environment");
      inp.onchange = function () {
        var f = inp.files && inp.files[0];
        if (!f) { rej(new Error("cancel")); return; }
        res({ file: f, url: URL.createObjectURL(f), format: (f.type || "image/jpeg").split("/")[1] });
      };
      inp.click();
    });
  }
  function camError(e) {
    var m = String((e && e.message) || e || "");
    if (/cancel/i.test(m)) return "";
    if (/denied|permission/i.test(m)) return "Kameraga ruxsat berilmadi. Sozlamalar → Ilovalar → Prep Way → Ruxsatlar → Kamera ni yoqing.";
    return "Rasmga olib bo'lmadi: " + m;
  }
  function thumb(url) {
    return new Promise(function (res) {
      var img = new Image();
      img.onload = function () {
        try {
          var w = 220, h = Math.round(img.height / img.width * w), c = document.createElement("canvas");
          c.width = w; c.height = h; c.getContext("2d").drawImage(img, 0, 0, w, h);
          res(c.toDataURL("image/jpeg", 0.6));
        } catch (e) { res(""); }
      };
      img.onerror = function () { res(""); };
      img.src = url;
    });
  }

  // ---------- Matnni o'qish (OCR) ----------
  function ocrDevice(photo) {
    var TR = P.TextRecognition;
    if (!(TR && NATIVE && photo.path)) return Promise.reject(new Error("NO_OCR"));
    return TR.processImage({ path: photo.path, script: "KOREAN" }).then(function (r) {
      var lines = [];
      (r.blocks || []).forEach(function (b) { (b.lines || []).forEach(function (l) { if (l.text) lines.push(l.text); }); });
      if (!lines.length && r.text) lines = String(r.text).split(/\n+/);
      return { text: r.text || lines.join("\n"), lines: lines };
    });
  }
  function serverCheck(photo, task) {
    var blobP = photo.file ? Promise.resolve(photo.file) : fetch(photo.url).then(function (r) { return r.blob(); });
    return blobP.then(function (b) {
      var fd = new FormData();
      fd.append("image", b, "daftar." + (photo.format === "png" ? "png" : "jpg"));
      fd.append("task", JSON.stringify({ title_uz: task.title, items: task.items.map(function (i) { return { uz: i[0], ko: i[1] }; }) }));
      return H.api("/api/homework", { body: fd });
    });
  }
  // Har bir band uchun eng mos qatorni topish
  function grade(task, lines) {
    var L = lines.map(function (l) { return { raw: l, h: K.onlyHangul(l) }; }).filter(function (x) { return x.h; });
    var all = L.map(function (x) { return x.h; }).join("");
    return task.items.map(function (it, n) {
      var exp = it[1], E = K.onlyHangul(exp), bestS = 0, bestRaw = "";
      L.forEach(function (x) {
        var r = K.compare(exp, x.h), s = r.score;
        if (x.h.length <= E.length * 2.2) s = Math.max(s, Math.round(r.cover * 96));
        if (s > bestS) { bestS = s; bestRaw = x.raw; }
      });
      if (bestS < 90 && E.length >= 4) { // gap ikki qatorga bo'linib ketgan bo'lishi mumkin
        var r2 = K.compare(exp, all);
        if (Math.round(r2.cover * 92) > bestS && r2.cover >= 0.9) { bestS = Math.round(r2.cover * 92); bestRaw = "(bir necha qatorda)"; }
      }
      var need = E.length <= 3 ? 90 : 80;
      return { n: n + 1, uz: it[0], ko: exp, written: bestS >= 40 ? bestRaw : "", score: bestS, ok: bestS >= need, near: bestS >= 60 && bestS < need };
    });
  }

  // ---------- Ko'rinish ----------
  function view() {
    var s = $("v-hw");
    if (!s || s.dataset.ready) return;
    s.dataset.ready = "1";
    s.innerHTML =
      '<div class="hw-head">' + K.avatar(54, "live") + '<div><h2 style="margin:0">Daftar tekshiruvi</h2><div class="note" style="font-size:13.5px">Daftaringizga yozing, rasmga oling — Komiko tekshiradi</div></div></div>' +
      '<div id="hwTask"></div>' +
      '<div class="hw-steps"><div><span>1</span>✍️ Daftarga yozing</div><div><span>2</span>📷 Rasmga oling</div><div><span>3</span>✅ Natija</div></div>' +
      '<div class="hw-btns"><button class="btn hw-cam" id="hwCam">📷 Rasmga olish</button><button class="btn ghost" id="hwGal">🖼 Galereya</button></div>' +
      '<label class="hw-loc"><input type="checkbox" id="hwLoc"><span>📍 Topshiriq qayerda bajarilganini belgilash (GPS)</span></label>' +
      '<div id="hwOut"></div>' +
      '<div class="sec-t">Oldingi tekshiruvlar</div><div id="hwHist"></div>' +
      '<input type="file" id="hwFile" accept="image/*" hidden>';
    $("hwLoc").checked = load(LKEY, true) !== false;
    $("hwLoc").onchange = function () { save(LKEY, this.checked); };
    $("hwCam").onclick = function () { run(false); };
    $("hwGal").onclick = function () { run(true); };
  }
  function renderTask() {
    var t = curTask();
    $("hwTask").innerHTML = '<div class="card hw-task"><div class="hw-tt"><span class="chip">📝 Topshiriq</span><button class="linkbtn" id="hwNext">🔄 Boshqa topshiriq</button></div>' +
      '<h3 style="margin:8px 0 4px">' + esc(t.title) + '</h3><div class="note">' + esc(t.how) + '</div>' +
      '<ol class="hw-items">' + t.items.map(function (i) { return '<li><b>' + esc(i[0]) + '</b><span class="hw-q">→ koreyscha?</span></li>'; }).join("") + '</ol>' +
      '<div class="note" style="font-size:12.5px">💡 Aniq, katta harflar bilan yozing. Har bir javobni alohida qatorga raqam bilan yozing. Rasmni yorug\' joyda, daftarni to\'liq ko\'rinadigan qilib oling.</div></div>';
    $("hwNext").onclick = nextTask;
  }
  function renderHist() {
    var h = load(HKEY, []);
    $("hwHist").innerHTML = h.length ? h.map(function (x) {
      var d = new Date(x.t);
      return '<div class="hw-h">' + (x.thumb ? '<img src="' + x.thumb + '" alt="">' : '<div class="hw-ni">📄</div>') +
        '<div style="flex:1;min-width:0"><b>' + esc(x.title) + '</b><div class="s">' + d.toLocaleDateString("uz-UZ") + ' ' + ("0" + d.getHours()).slice(-2) + ':' + ("0" + d.getMinutes()).slice(-2) +
        (x.place ? ' · 📍 ' + esc(x.place) : '') + '</div></div><span class="hw-sc" style="color:' + (x.ok / x.total >= 0.8 ? "var(--green)" : x.ok / x.total >= 0.5 ? "#b7791f" : "var(--red)") + '">' + x.ok + '/' + x.total + '</span></div>';
    }).join("") : '<div class="card empty" style="padding:22px">Hali tekshiruv yo\'q. Birinchi topshiriqni bajaring!</div>';
  }
  function run(gallery) {
    var t = curTask(), out = $("hwOut"), wantLoc = $("hwLoc").checked;
    var locP = wantLoc ? getLocation().catch(function () { return null; }) : Promise.resolve(null);
    var photo;
    takePhoto(gallery).then(function (ph) {
      photo = ph;
      out.innerHTML = '<div class="card hw-res"><img class="hw-img" src="' + esc(ph.url) + '" alt="Daftar rasmi">' +
        '<div class="loading">' + K.avatar(30, "live talking") + ' Komiko daftaringizni o\'qiyapti…</div></div>';
      out.scrollIntoView({ behavior: "smooth", block: "start" });
      var viaServer = !K.LOCAL();
      var check = viaServer
        ? serverCheck(ph, t).then(function (r) { return { src: "server", text: r.recognized_text || "", items: t.items.map(function (it, k) {
            var x = (r.items || [])[k] || {}; return { n: k + 1, uz: it[0], ko: it[1], written: x.written || "", ok: !!x.ok, near: false, note: x.note_uz || "" }; }), feedback: r.feedback_uz || "" }; })
          .catch(function () { return ocrDevice(ph).then(function (o) { return { src: "device", text: o.text, items: grade(t, o.lines) }; }); })
        : ocrDevice(ph).then(function (o) { return { src: "device", text: o.text, items: grade(t, o.lines) }; });
      return Promise.all([check, locP, thumb(ph.url)]);
    }).then(function (all) {
      var R = all[0], geo = all[1], th = all[2];
      show(t, photo, R, geo, wantLoc);
      var ok = R.items.filter(function (i) { return i.ok; }).length;
      var h = load(HKEY, []);
      h.unshift({ t: Date.now(), title: t.title, ok: ok, total: t.items.length, place: geo ? placeText(geo) : "", lat: geo && geo.lat, lon: geo && geo.lon, thumb: th });
      save(HKEY, h.slice(0, 15)); renderHist();
      K.Activity.mark("hw");
    }).catch(function (e) {
      var m = e && e.message === "NO_OCR"
        ? "Bu qurilmada rasmdagi matnni o'qib bo'lmaydi. Daftar tekshiruvi telefondagi Prep Way ilovasida ishlaydi."
        : camError(e);
      if (m) out.innerHTML = '<div class="err">⚠️ ' + esc(m) + '</div>';
      else if (!photo) out.innerHTML = "";
    });
  }
  function show(t, photo, R, geo, wantLoc) {
    var ok = R.items.filter(function (i) { return i.ok; }).length, n = R.items.length, pct = Math.round(ok / n * 100);
    var col = pct >= 80 ? "var(--green)" : pct >= 50 ? "#b7791f" : "var(--red)";
    var msg = !R.text.trim() ? "Rasmda koreyscha yozuv topilmadi. Daftarni yaqinroqdan, yorug' joyda rasmga oling." :
      pct === 100 ? "Ajoyib! Hammasi to'g'ri yozilgan. 🎉" : pct >= 80 ? "Juda yaxshi! Faqat bir-ikki joyni tuzating." :
      pct >= 50 ? "Yomon emas. Qizil bandlarni to'g'ri variant bilan solishtirib, qayta yozing." : "Keling, yana bir bor urinib ko'ramiz: to'g'ri variantlarni ko'rib, qayta yozing.";
    var h = '<div class="card hw-res"><img class="hw-img" src="' + esc(photo.url) + '" alt="Daftar rasmi">' +
      '<div class="score" style="margin-top:12px"><div class="ring" style="--p:' + pct + ';background:conic-gradient(' + col + ' calc(var(--p)*1%),var(--line) 0)"><b>' + ok + '/' + n + '</b></div>' +
      '<div style="flex:1;min-width:170px"><div style="font-weight:800;font-size:17px">' + esc(t.title) + '</div><div class="note" style="font-size:14px">' + K.avatar(22, "inline") + ' ' + esc(R.feedback || msg) + '</div></div></div>';
    if (wantLoc) {
      h += geo ? '<div class="hw-geo"><div>📍 <b>' + esc(placeText(geo)) + '</b></div><span>' + geo.lat.toFixed(5) + ', ' + geo.lon.toFixed(5) + (geo.acc ? ' · ±' + geo.acc + ' m' : '') + ' · ' +
        new Date(geo.t).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }) + '</span>' +
        '<a href="https://www.openstreetmap.org/?mlat=' + geo.lat + '&mlon=' + geo.lon + '#map=16/' + geo.lat + '/' + geo.lon + '" target="_blank" rel="noopener">Xaritada ko\'rish ↗</a></div>'
        : '<div class="hw-geo off">📍 Joylashuvni aniqlab bo\'lmadi (GPS o\'chiq yoki ruxsat berilmagan).</div>';
    }
    h += '<div class="hw-list">' + R.items.map(function (i) {
      var st = i.ok ? "ok" : i.near ? "near" : "bad";
      return '<div class="hw-it ' + st + '"><span class="hw-ic">' + (i.ok ? "✓" : i.near ? "≈" : "✕") + '</span><div style="flex:1;min-width:0">' +
        '<div class="note" style="font-size:12.5px">' + i.n + '. ' + esc(i.uz) + '</div>' +
        '<div class="ko">To\'g\'ri: <b>' + esc(i.ko) + '</b> <button class="mini" data-say="' + esc(i.ko) + '">🔊</button></div>' +
        (i.ok ? '' : '<div class="ko hw-w">Siz yozgan: ' + (i.written ? esc(i.written) : '<i>topilmadi</i>') + '</div>') +
        (i.note ? '<div class="hw-note">' + esc(i.note) + '</div>' : (i.near ? '<div class="hw-note">Deyarli to\'g\'ri: harflarni tekshiring (받침, unlilar).</div>' : '')) +
        '</div></div>';
    }).join("") + '</div>';
    if (R.text.trim()) h += '<details class="k-alt"><summary>Komiko rasmdan o\'qigan matn</summary><div class="ko" style="white-space:pre-line">' + esc(R.text) + '</div></details>';
    h += '<div class="note" style="margin-top:10px;font-size:12.5px">' + (R.src === "server" ? "Tekshiruv: Komiko AI (server)." : "Tekshiruv telefoningizda, internetsiz bajarildi. Qo'lyozma noaniq bo'lsa, ba'zi harflar noto'g'ri o'qilishi mumkin: shunday holda rasmni qayta oling.") + '</div>' +
      '<div class="row" style="margin-top:12px"><button class="btn ghost" id="hwAgain">📷 Qayta rasmga olish</button><button class="btn" id="hwNew">Keyingi topshiriq →</button></div></div>';
    $("hwOut").innerHTML = h;
    $("hwAgain").onclick = function () { run(false); };
    $("hwNew").onclick = function () { nextTask(); window.scrollTo({ top: 0, behavior: "smooth" }); };
    H.haptic("note", pct >= 80 ? "success" : "warning");
    K.speak(pct >= 80 ? "잘했어요!" : pct >= 50 ? "좋아요! 조금만 더 연습해요." : "괜찮아요. 다시 해 봐요.");
  }

  var prevOnView = H.onView;
  H.onView = function (v) {
    if (prevOnView) prevOnView(v);
    if (v === "hw") { view(); renderTask(); renderHist(); }
  };
  var profKey = "";
  document.addEventListener("pw:profile", function () {
    var p = K.Profile.get() || {}, k = p.level + "|" + p.goal;
    if (profKey && k !== profKey) { save(TKEY, ""); if ($("hwTask")) renderTask(); }
    profKey = k;
  });
  (function () { var p = K.Profile.get() || {}; profKey = p.level + "|" + p.goal; })();
  window.PWDaftar = { grade: grade, tasks: TASKS, nearest: nearest };
})();
