/* Hanguk Way — natija kartasi (rasm) va do'stni musobaqaga chaqirish (havola orqali aynan o'sha savollar). */
(function () {
  var H = window.HY, K = window.Komiko, I = window.I18N;
  if (!H || !K) return;
  var esc = H.esc, $ = H.$;
  function T(o, v) { return I ? I.f(o, v) : o.uz; }
  function ld(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function sv(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var BASE = (H.CONFIG && H.CONFIG.API_BASE) || location.origin;
  if (!/^https?:/.test(BASE)) BASE = "https://prepway-api.onrender.com";
  var last = null;

  // ---------- Kod: base64url(JSON) ----------
  function enc(o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  function dec(s) { try { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; return JSON.parse(decodeURIComponent(escape(atob(s)))); } catch (e) { return null; } }
  function chLink(r) {
    var p = K.Profile.get() || {};
    return BASE + "/?ch=" + enc({ k: r.exam, i: r.ids, s: r.ok, n: r.n, nm: String(p.name || "").split(" ")[0].slice(0, 20) });
  }

  // ---------- Natija qatori (test tugagach) ----------
  document.addEventListener("pw:test", function (e) {
    var d = e.detail, k = String(d.key).split(":");
    last = { exam: k[0], mode: k[1] || "quick", ok: d.ok, n: d.n, ids: d.ids, name: d.name, pct: d.n ? Math.round(d.ok / d.n * 100) : 0 };
    setTimeout(renderRow, 0);
  });
  function renderRow() {
    var box = $("shareRow"); if (!box || !last) return;
    var h = "", ch = ld("pwChCur", null);
    if (last.mode === "ch" && ch) {
      var me = last.ok, them = ch.s, res = me > them ? "win" : me === them ? "tie" : "lose";
      h += '<div class="ch-res ' + res + '"><div class="ch-vs"><div><small>' + esc(T({ uz: "Siz", ru: "Вы", en: "You" })) + '</small><b>' + me + '/' + last.n + '</b></div><span>VS</span><div><small>' + esc(ch.nm || "?") + '</small><b>' + them + '/' + ch.n + '</b></div></div>' +
        '<div class="ch-msg">' + esc(res === "win" ? T({ uz: "🏆 Siz yutdingiz!", ru: "🏆 Вы победили!", en: "🏆 You won!" }) : res === "tie" ? T({ uz: "🤝 Durang!", ru: "🤝 Ничья!", en: "🤝 It's a tie!" }) : T({ uz: "Bu safar {n} yutdi — qayta urinib ko'ring!", ru: "В этот раз победил(а) {n} — попробуйте ещё!", en: "{n} won this time — try again!" }, { n: ch.nm || "?" })) + '</div></div>';
      if (res === "win" && window.PWCoach && PWCoach.confetti) PWCoach.confetti();
      localStorage.removeItem("pwChCur");
    }
    h += '<div class="sh-row"><button class="btn sh-b" id="shCard">📤 ' + esc(T({ uz: "Natijani ulashish", ru: "Поделиться результатом", en: "Share result" })) + '</button>' +
      (last.ids && last.ids.length ? '<button class="btn sh-b sh-ch" id="shCh">⚔️ ' + esc(T({ uz: "Do'stni chaqirish", ru: "Вызвать друга", en: "Challenge a friend" })) + '</button>' : '') + '</div>';
    box.innerHTML = h;
    $("shCard").onclick = shareCard;
    if ($("shCh")) $("shCh").onclick = shareChallenge;
  }

  // ---------- Natija kartasi (canvas) ----------
  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function draw() {
    return new Promise(function (res) {
      var W = 1080, Hh = 1350, cv = document.createElement("canvas"); cv.width = W; cv.height = Hh;
      var c = cv.getContext("2d"), p = K.Profile.get() || {}, F = '"Manrope","Noto Sans KR",system-ui,sans-serif';
      var g = c.createLinearGradient(0, 0, W, Hh); g.addColorStop(0, "#12245C"); g.addColorStop(1, "#2B5BE0");
      c.fillStyle = g; c.fillRect(0, 0, W, Hh);
      c.globalAlpha = 0.07; c.fillStyle = "#fff"; c.font = "900 520px " + F; c.textAlign = "right"; c.fillText("한", W + 40, Hh - 120); c.globalAlpha = 1;
      var img = new Image();
      img.onload = img.onerror = function () {
        if (img.width) { c.save(); rr(c, 80, 80, 120, 120, 28); c.clip(); c.drawImage(img, 80, 80, 120, 120); c.restore(); }
        c.textAlign = "left"; c.fillStyle = "#fff"; c.font = "800 60px " + F; c.fillText("Hanguk", 230, 160);
        var hw = c.measureText("Hanguk ").width; c.fillStyle = "#FF6B5E"; c.fillText("Way", 230 + hw, 160);
        c.fillStyle = "rgba(255,255,255,.75)"; c.font = "700 32px " + F; c.fillText(T({ uz: "Koreys tili · TOPIK · EPS", ru: "Корейский · TOPIK · EPS", en: "Korean · TOPIK · EPS" }), 232, 200);
        // halqa
        var cx = W / 2, cy = 560, R = 230, pct = last.pct;
        c.lineWidth = 46; c.strokeStyle = "rgba(255,255,255,.14)"; c.beginPath(); c.arc(cx, cy, R, 0, Math.PI * 2); c.stroke();
        var rg = c.createLinearGradient(cx - R, cy, cx + R, cy); rg.addColorStop(0, "#FF4D5E"); rg.addColorStop(1, "#FF9A3C");
        c.strokeStyle = rg; c.lineCap = "round"; c.beginPath(); c.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(0.01, pct / 100)); c.stroke();
        c.textAlign = "center"; c.fillStyle = "#fff"; c.font = "900 150px " + F; c.fillText(pct + "%", cx, cy + 40);
        c.font = "700 40px " + F; c.fillStyle = "rgba(255,255,255,.85)"; c.fillText(T({ uz: "{a} / {b} to'g'ri", ru: "{a} / {b} верно", en: "{a} / {b} correct" }, { a: last.ok, b: last.n }), cx, cy + 105);
        c.font = "800 50px " + F; c.fillStyle = "#fff"; c.fillText(last.name, cx, 900);
        var lv = document.querySelector("#bars .lv-big"); lv = lv ? lv.textContent.replace(/\s+/g, " ").trim() : "";
        if (lv) { c.font = "800 44px " + F; c.fillStyle = "#FFB37A"; c.fillText("🎯 " + lv, cx, 975); }
        var st = K.Activity.streak();
        c.font = "700 38px " + F; c.fillStyle = "rgba(255,255,255,.85)";
        c.fillText((p.name ? p.name + " · " : "") + (st ? "🔥 " + st + " " + T({ uz: "kun ketma-ket", ru: "дн. подряд", en: "day streak" }) + " · " : "") + new Date().toLocaleDateString(), cx, 1060);
        var ft = T({ uz: "Siz ham sinab ko'ring:", ru: "Попробуйте и вы:", en: "Try it too:" }) + " " + BASE.replace(/^https?:\/\//, "") + "/yuklab";
        c.font = "800 34px " + F; var tw = Math.min(W - 100, c.measureText(ft).width + 90);
        rr(c, cx - tw / 2, 1160, tw, 96, 48); c.fillStyle = "rgba(255,255,255,.16)"; c.fill();
        c.fillStyle = "#fff"; c.fillText(ft, cx, 1220, W - 140);
        cv.toBlob(function (b) { res({ blob: b, url: cv.toDataURL("image/png") }); }, "image/png");
      };
      img.src = "mark.png";
    });
  }
  function shareCard() {
    if (!last) return;
    var btn = $("shCard"); btn.disabled = true;
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(draw).then(function (r) {
      btn.disabled = false;
      var file = r.blob && window.File ? new File([r.blob], "hanguk-way-natija.png", { type: "image/png" }) : null;
      var text = T({ uz: "Hanguk Way'da {e}: {p}% 🎯", ru: "Hanguk Way, {e}: {p}% 🎯", en: "Hanguk Way, {e}: {p}% 🎯" }, { e: last.name, p: last.pct });
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        return navigator.share({ files: [file], text: text }).catch(function () {});
      }
      K.sheet('<h3 style="margin:0 0 8px">📤 ' + esc(T({ uz: "Natija kartasi", ru: "Карточка результата", en: "Result card" })) + '</h3>' +
        '<img src="' + r.url + '" alt="" style="width:100%;border-radius:14px;display:block">' +
        '<p class="note">' + esc(T({ uz: "Rasmni bosib turing va saqlang yoki yuboring.", ru: "Нажмите и удерживайте картинку, чтобы сохранить.", en: "Long-press the image to save or send it." })) + '</p>' +
        '<a class="btn" style="display:block;text-align:center" download="hanguk-way-natija.png" href="' + r.url + '">⬇️ ' + esc(T({ uz: "Yuklab olish", ru: "Скачать", en: "Download" })) + '</a>');
    }).catch(function (e) { btn.disabled = false; H.toast(e.message || String(e)); });
  }

  // ---------- Do'stni chaqirish ----------
  function shareChallenge() {
    if (!last) return;
    var url = chLink(last), text = T({ uz: "⚔️ Men Hanguk Way'da {e} testidan {s}/{n} oldim. Shu savollarda meni yenga olasizmi?", ru: "⚔️ Я набрал(а) {s}/{n} в тесте {e} в Hanguk Way. Сможете обойти меня на тех же вопросах?", en: "⚔️ I scored {s}/{n} on {e} in Hanguk Way. Can you beat me on the same questions?" }, { e: last.name, s: last.ok, n: last.n });
    if (navigator.share) return navigator.share({ text: text, url: url }).catch(function () {});
    if (H.inTG && H.tg && H.tg.openTelegramLink) return H.tg.openTelegramLink("https://t.me/share/url?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(text));
    (navigator.clipboard ? navigator.clipboard.writeText(text + "\n" + url) : Promise.reject()).then(function () {
      H.toast(T({ uz: "Havola nusxalandi — do'stingizga yuboring.", ru: "Ссылка скопирована — отправьте другу.", en: "Link copied — send it to a friend." }));
    }).catch(function () { K.sheet('<p class="note">' + esc(text) + '</p><input class="inp" style="width:100%" readonly value="' + esc(url) + '">'); });
  }

  // Havola orqali kelgan chaqiriq
  (function () {
    var m = /[?&]ch=([^&#]+)/.exec(location.search); if (!m) return;
    var d = dec(m[1]); if (d && d.k && d.i && d.i.length) sv("pwChPending", d);
    try { history.replaceState(null, "", location.pathname); } catch (e) {}
  })();
  function offer() {
    var d = ld("pwChPending", null), p = K.Profile.get();
    if (!d || !p || !p.created || H.curView() !== "home" || document.getElementById("kSheet")) return;
    localStorage.removeItem("pwChPending");
    K.sheet('<div style="text-align:center"><div style="font-size:52px">⚔️</div><h3 style="margin:4px 0">' + esc(T({ uz: "{n} sizni musobaqaga chaqirdi!", ru: "{n} вызывает вас на соревнование!", en: "{n} challenged you!" }, { n: d.nm || "Do'stingiz" })) + '</h3>' +
      '<p class="note">' + esc(T({ uz: "{e}: {s}/{n} to'g'ri. Aynan shu {n} ta savolda yengib ko'ring.", ru: "{e}: {s}/{n} верно. Обойдите на тех же {n} вопросах.", en: "{e}: {s}/{n} correct. Beat it on the same {n} questions." }, { e: H.examName(d.k), s: d.s, n: d.n })) + '</p>' +
      '<button class="btn" id="chGo" style="width:100%">🚀 ' + esc(T({ uz: "Boshlash", ru: "Начать", en: "Start" })) + '</button></div>');
    $("chGo").onclick = function () { sv("pwChCur", d); K.closeSheet(); H.startTest(d.k + ":ch:" + d.i.join(",")); };
  }
  var prevOnView = H.onView;
  H.onView = function (v) { if (prevOnView) prevOnView(v); if (v === "home") setTimeout(offer, 800); };
  document.addEventListener("pw:profile", function () { setTimeout(offer, 1200); });
  setTimeout(offer, 1500);
  window.PWShare = { link: chLink, enc: enc, dec: dec };
})();
