/* Prep Way — mobil ilova rejimi (Android / iPhone, Capacitor).
   Telegram Mini App'da hech narsa qilmaydi. Ilovada: Google orqali kirish ekrani, sessiya tokeni,
   akkaunt oynasi (chiqish, akkauntni o'chirish, maxfiylik siyosati). */
(function () {
  var C = window.Capacitor;
  var native = !!(C && C.isNativePlatform && C.isNativePlatform());
  var cfg = window.PW_CONFIG || {};
  var TKEY = "pwSession", UKEY = "pwUser";
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  var user = null;
  try { user = JSON.parse(lsGet(UKEY) || "null"); } catch (e) {}
  var apiBase = (cfg.apiBase || "").replace(/\/$/, "");

  // DEMO rejim: serversiz, kirishsiz (app.config.json → "demo": true)
  var demo = !!cfg.demo && !(window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData);
  var PW = window.PW = {
    native: native,
    demo: demo,
    platform: native ? C.getPlatform() : "web",
    token: lsGet(TKEY),
    user: user,
    showLogin: showLogin,
    sessionExpired: function () { lsSet(TKEY, null); PW.token = null; showLogin("Sessiya tugadi. Qaytadan kiring."); },
    logout: function () {
      lsSet(TKEY, null); lsSet(UKEY, null);
      try { var SL = C.Plugins.SocialLogin; SL && SL.logout && SL.logout({ provider: "google" }).catch(function () {}); } catch (e) {}
      location.reload();
    }
  };
  if (demo) {
    document.documentElement.classList.add("demo");
    document.addEventListener("DOMContentLoaded", function () {
      var b = document.createElement("div");
      b.style.cssText = "background:#cd2e3a;color:#fff;text-align:center;font-size:12.5px;font-weight:700;padding:calc(6px + env(safe-area-inset-top)) 10px 6px";
      b.textContent = "DEMO versiya — AI javoblari namunaviy";
      document.body.insertBefore(b, document.body.firstChild);
      var hdr = document.querySelector("header"); if (hdr) hdr.style.paddingTop = "0";
    });
    return;
  }
  if (!native) return;
  document.documentElement.classList.add("native");

  // ---------- uslublar ----------
  var css = document.createElement("style");
  css.textContent =
    ".pw-ov{position:fixed;inset:0;z-index:100;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px calc(32px + env(safe-area-inset-bottom));text-align:center}" +
    ".pw-logo{width:96px;height:96px;border-radius:28px;background:var(--blue);color:#fff;display:grid;place-items:center;font-family:'Noto Sans KR',sans-serif;font-size:48px;font-weight:700;position:relative;overflow:hidden;margin-bottom:22px}" +
    ".pw-logo::after{content:'';position:absolute;right:-12px;bottom:-12px;width:40px;height:40px;border-radius:50%;background:var(--red)}" +
    ".pw-ov h1{font-size:34px;margin:0 0 8px}" +
    ".pw-ov p{color:var(--muted);margin:0 0 28px;max-width:340px}" +
    ".pw-g{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;max-width:340px;padding:15px 18px;border-radius:14px;border:1px solid var(--line);background:var(--card);color:var(--ink);font-weight:700;font-size:16px}" +
    ".pw-g:disabled{opacity:.6}" +
    ".pw-small{font-size:12.5px;color:var(--muted);margin-top:18px;max-width:340px}" +
    ".pw-small a{color:var(--blue)}" +
    ".pw-err{color:var(--red);font-weight:600;font-size:14px;margin-top:14px;max-width:340px}" +
    ".pw-sheet{position:fixed;inset:0;z-index:90;background:rgba(10,15,25,.45);display:flex;align-items:flex-end}" +
    ".pw-sheet .in{background:var(--card);width:100%;border-radius:22px 22px 0 0;padding:24px 20px calc(24px + env(safe-area-inset-bottom));display:grid;gap:12px}";
  document.head.appendChild(css);

  var G_ICON = '<svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';

  function esc(s) { return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // ---------- kirish ekrani ----------
  function showLogin(msg) {
    if (document.getElementById("pwLogin")) return;
    var ov = document.createElement("div");
    ov.className = "pw-ov"; ov.id = "pwLogin";
    ov.innerHTML =
      '<div class="pw-logo">길</div><h1>Prep Way</h1>' +
      '<p>Koreys tili imtihonlariga o\'zbek tilida, sun\'iy intellekt bilan tayyorlaning.</p>' +
      '<button class="pw-g" id="pwG">' + G_ICON + '<span>Google bilan kirish</span></button>' +
      '<div class="pw-err" id="pwErr">' + esc(msg || "") + '</div>' +
      '<div class="pw-small">Kirish orqali <a href="' + esc(apiBase) + '/privacy" target="_blank" rel="noopener">Maxfiylik siyosati</a>ga rozilik bildirasiz.</div>';
    document.body.appendChild(ov);
    document.getElementById("pwG").onclick = googleLogin;
  }

  function googleLogin() {
    var btn = document.getElementById("pwG"), err = document.getElementById("pwErr");
    err.textContent = "";
    var SL = C.Plugins && C.Plugins.SocialLogin;
    if (!SL) { err.textContent = "Google kirish moduli topilmadi. Ilovani yangilang."; return; }
    if (!apiBase || !cfg.googleWebClientId) { err.textContent = "Ilova sozlanmagan: server manzili yoki Google client ID kiritilmagan."; return; }
    btn.disabled = true; btn.querySelector("span").textContent = "Kirilmoqda…";
    SL.initialize({ google: { webClientId: cfg.googleWebClientId, iOSClientId: cfg.googleIosClientId,
                              iOSServerClientId: cfg.googleWebClientId, mode: "online" } })
      .then(function () { return SL.login({ provider: "google", options: { scopes: ["email", "profile"] } }); })
      .then(function (res) {
        var idToken = res && res.result && res.result.idToken;
        if (!idToken) throw new Error("Google'dan token olinmadi. Qayta urinib ko'ring.");
        return fetch(apiBase + "/api/auth/google", { method: "POST", headers: { "Content-Type": "application/json" },
                                                       body: JSON.stringify({ id_token: idToken }) });
      })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.error || "Kirishda xato."); return j; }); })
      .then(function (j) {
        lsSet(TKEY, j.token); lsSet(UKEY, JSON.stringify(j.user || {}));
        location.reload();
      })
      .catch(function (e) {
        var m = (e && e.message) || "";
        if (/cancel/i.test(m)) m = "Kirish bekor qilindi.";
        else if (/Failed to fetch|NetworkError|Load failed/i.test(m)) m = "Serverga ulanib bo'lmadi. Internetni tekshiring.";
        err.textContent = m || "Kirishda xato. Qayta urinib ko'ring.";
        btn.disabled = false; btn.querySelector("span").textContent = "Google bilan kirish";
      });
  }

  // ---------- akkaunt oynasi ----------
  function showAccount() {
    var sh = document.createElement("div");
    sh.className = "pw-sheet";
    var u = PW.user || {};
    sh.innerHTML = '<div class="in">' +
      '<div style="font-weight:800;font-size:18px">' + esc(u.name || "Akkaunt") + '</div>' +
      '<div class="note" style="margin-top:-8px">' + esc(u.email || "") + '</div>' +
      '<a class="btn ghost" href="' + esc(apiBase) + '/privacy" target="_blank" rel="noopener" style="text-decoration:none">Maxfiylik siyosati</a>' +
      '<button class="btn ghost" id="pwOut">Chiqish</button>' +
      '<button class="btn ghost" id="pwDel" style="color:var(--red)">Akkauntni o\'chirish</button>' +
      '<div class="note" id="pwDelNote"></div>' +
      '<button class="btn" id="pwClose">Yopish</button></div>';
    document.body.appendChild(sh);
    sh.addEventListener("click", function (e) { if (e.target === sh) sh.remove(); });
    document.getElementById("pwClose").onclick = function () { sh.remove(); };
    document.getElementById("pwOut").onclick = PW.logout;
    document.getElementById("pwDel").onclick = function () {
      var b = this, note = document.getElementById("pwDelNote");
      if (!b.dataset.confirm) {
        b.dataset.confirm = "1"; b.textContent = "Tasdiqlang: butunlay o'chirish";
        note.textContent = "Yuklagan kitoblaringiz, darslar va hisobingiz serverdan o'chiriladi. Bu amalni qaytarib bo'lmaydi.";
        return;
      }
      b.disabled = true; b.textContent = "O'chirilmoqda…";
      fetch(apiBase + "/api/me", { method: "DELETE", headers: { Authorization: "Bearer " + PW.token } })
        .then(function (r) { if (!r.ok) throw new Error(); try { localStorage.clear(); } catch (e) {} PW.logout(); })
        .catch(function () { b.disabled = false; b.textContent = "Akkauntni o'chirish"; note.textContent = "O'chirib bo'lmadi. Internetni tekshirib, qayta urinib ko'ring."; });
    };
  }

  var acc = document.getElementById("accBtn");
  if (acc) acc.onclick = showAccount;
  var hello = document.getElementById("hello");
  if (hello && user && user.name) hello.textContent = "Salom, " + user.name + "!";
  if (!PW.token) showLogin();
})();
