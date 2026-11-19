/* Hanguk Way — oflayn rejim: ilova fayllari keshda saqlanadi, testlar, lug'at va kartalar internetsiz ishlaydi.
   HTML: avval tarmoq (yangilanish uchun), bo'lmasa kesh. Statik fayllar ham avval tarmoqdan (versiyalar aralashmasin), internet bo'lmasa keshdan. /api — faqat tarmoq. */
var CACHE = "hw-static-v1";
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(["./", "index.html", "komiko.css", "mark.png", "icon.png"]).catch(function () {}); }));
  self.skipWaiting();
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var r = e.request; if (r.method !== "GET") return;
  var u = new URL(r.url);
  if (u.origin === location.origin && (u.pathname.indexOf("/api/") === 0 || /\.apk$|\/yuklab|\/download/.test(u.pathname))) return;
  if (r.mode === "navigate") {
    e.respondWith(fetch(r).then(function (res) { var cp = res.clone(); caches.open(CACHE).then(function (c) { c.put("./", cp); }); return res; })
      .catch(function () { return caches.match("./").then(function (m) { return m || caches.match("index.html"); }); }));
    return;
  }
  if (u.origin !== location.origin) {
    if (!/fonts\.(googleapis|gstatic)\.com$|telegram\.org$/.test(u.hostname)) return;
    // Shriftlar: keshdan darhol, fonda yangilash
    e.respondWith(caches.open(CACHE).then(function (c) {
      return c.match(r).then(function (hit) {
        var net = fetch(r).then(function (res) { if (res && (res.ok || res.type === "opaque")) c.put(r, res.clone()); return res; }).catch(function () { return hit; });
        return hit || net;
      });
    }));
    return;
  }
  // O'z fayllarimiz: avval tarmoq (har doim yangi versiya), internet bo'lmasa — kesh
  e.respondWith(fetch(r).then(function (res) {
    if (res && res.ok) { var cp = res.clone(); caches.open(CACHE).then(function (c) { c.put(r, cp); }); }
    return res;
  }).catch(function () { return caches.match(r); }));
});
