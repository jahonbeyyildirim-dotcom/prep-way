// Hanguk Way — Windows va macOS uchun kompyuter ilovasi (Electron).
// Ilova sahifasi (../miniapp) ilova ichiga joylanadi va https://localhost manzilidan ochiladi —
// Android ilovasi bilan bir xil manzil, shuning uchun server (CORS) uni taniydi.
//
// Kompyuterga xos imkoniyatlar:
//  - kundalik eslatmalar (tizim bildirishnomasi), oyna yopilsa ham fonda ishlaydi (Windows: tray belgisi)
//  - kompyuter yoqilganda avtomatik ishga tushish (ixtiyoriy)
//  - yangi versiya chiqqanini tekshirish
//  - oyna o'lchami va joyini eslab qolish
const { app, BrowserWindow, protocol, net, shell, session, systemPreferences, Menu, Tray, Notification,
        nativeTheme, nativeImage, ipcMain, dialog, screen } = require("electron");
const path = require("node:path");
const fs = require("node:fs");
const { pathToFileURL } = require("node:url");

const WWW = path.join(__dirname, "www");
const HOST = "localhost";
const ORIGIN = `https://${HOST}`;
const START = `${ORIGIN}/index.html`;
const ICON = path.join(__dirname, "build", "icon.png");
const DOWNLOAD_PAGE = "https://prepway-api.onrender.com/yuklab";
const UPDATE_URL = "https://github.com/jahonbeyyildirim-dotcom/prep-way/releases/download/demo/desktop-latest.json";
const IS_MAC = process.platform === "darwin";
const STARTED_HIDDEN = process.argv.includes("--hidden");

protocol.registerSchemesAsPrivileged([
  { scheme: "https", privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true } },
]);

if (!app.requestSingleInstanceLock()) { app.quit(); }
app.setAppUserModelId("uz.hangukway.desktop");   // Windows bildirishnomalari uchun shart

let win = null, tray = null, quitting = false;

// ---------------- Kichik sozlamalar fayli ----------------
const STATE_FILE = () => path.join(app.getPath("userData"), "desktop-state.json");
function loadState() { try { return JSON.parse(fs.readFileSync(STATE_FILE(), "utf8")); } catch (e) { return {}; } }
function saveState(patch) {
  const s = Object.assign(loadState(), patch);
  try { fs.writeFileSync(STATE_FILE(), JSON.stringify(s, null, 1)); } catch (e) {}
  return s;
}

// ---------------- Ilova fayllarini berish ----------------
function serveLocal() {
  // Faqat https://localhost/... ilova fayllaridan beriladi; qolgan so'rovlar (server, Google) odatdagidek internetga ketadi.
  protocol.handle("https", (req) => {
    const u = new URL(req.url);
    if (u.hostname !== HOST) return net.fetch(req, { bypassCustomProtocolHandlers: true });
    let rel = decodeURIComponent(u.pathname);
    if (rel === "/" || rel === "") rel = "/index.html";
    const file = path.normalize(path.join(WWW, rel));
    if (!file.startsWith(WWW) || !fs.existsSync(file) || fs.statSync(file).isDirectory())
      return new Response("Topilmadi", { status: 404 });
    return net.fetch(pathToFileURL(file).toString());
  });
}

// ---------------- Oyna ----------------
function visibleBounds(b) {
  if (!b) return null;
  const ok = screen.getAllDisplays().some((d) => {
    const a = d.workArea;
    return b.x < a.x + a.width - 60 && b.x + b.width > a.x + 60 && b.y >= a.y - 10 && b.y < a.y + a.height - 60;
  });
  return ok ? b : null;
}

function createWindow(show = true) {
  const st = loadState();
  const b = visibleBounds(st.bounds) || { width: 1100, height: 820 };
  win = new BrowserWindow({
    ...b, minWidth: 380, minHeight: 560,
    title: "Hanguk Way",
    backgroundColor: nativeTheme.shouldUseDarkColors ? "#0e1424" : "#f6f5f1",
    icon: ICON, autoHideMenuBar: true, show: false,
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, sandbox: true, nodeIntegration: false, spellcheck: false },
  });
  if (st.maximized) win.maximize();
  win.once("ready-to-show", () => { if (show) win.show(); });
  win.loadURL(START);

  const remember = () => {
    if (!win || win.isDestroyed() || win.isMinimized()) return;
    saveState(win.isMaximized() ? { maximized: true } : { maximized: false, bounds: win.getBounds() });
  };
  win.on("resize", debounce(remember, 500));
  win.on("move", debounce(remember, 500));

  // Oyna yopilganda: eslatmalar yoqilgan bo'lsa fonda qoladi (aks holda eslatma kelmaydi)
  win.on("close", (e) => {
    if (quitting) return;
    if (IS_MAC || hasReminders()) {
      e.preventDefault(); win.hide();
      if (!IS_MAC && !loadState().trayHintShown) {
        saveState({ trayHintShown: true });
        notify("Hanguk Way fonda ishlayapti", "Eslatmalar kelib turadi. To'liq yopish: pastki o'ng burchakdagi belgi → «Chiqish».");
      }
    }
  });
  win.on("closed", () => { win = null; });

  // Tashqi havolalar (to'lov sahifalari, oferta, PDF) oddiy brauzerda ochiladi
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url) && !url.startsWith(ORIGIN + "/")) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith(ORIGIN + "/")) { e.preventDefault(); if (/^https?:/i.test(url)) shell.openExternal(url); }
  });
}

function showWindow() {
  if (!win) createWindow(true);
  else { if (win.isMinimized()) win.restore(); win.show(); win.focus(); }
}

function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

// ---------------- Eslatmalar (Capacitor LocalNotifications o'rnini bosadi) ----------------
const timers = new Map();
function reminders() { return (loadState().notifications || []).filter((n) => n.at > Date.now()); }
function hasReminders() { return reminders().length > 0; }

function notify(title, body) {
  if (!Notification.isSupported()) return;
  const n = new Notification({ title, body, icon: ICON, silent: false });
  n.on("click", showWindow);
  n.show();
}

function arm() {
  for (const t of timers.values()) clearTimeout(t);
  timers.clear();
  for (const n of reminders()) {
    const ms = n.at - Date.now();
    if (ms > 2 ** 31 - 1) continue;           // juda uzoq muddat — keyingi ishga tushishda o'rnatiladi
    timers.set(n.id, setTimeout(() => {
      notify(n.title || "Hanguk Way", n.body || "");
      saveState({ notifications: (loadState().notifications || []).filter((x) => x.id !== n.id) });
      timers.delete(n.id); updateTray();
    }, ms));
  }
  updateTray();
}

ipcMain.handle("ln:schedule", (_e, list) => {
  const cur = (loadState().notifications || []).filter((n) => n.at > Date.now());
  const ids = new Set(list.map((n) => n.id));
  const keep = cur.filter((n) => !ids.has(n.id));
  const add = list.filter((n) => Number.isFinite(n.at)).map((n) => ({ id: n.id, at: n.at, title: String(n.title || "").slice(0, 120), body: String(n.body || "").slice(0, 300) }));
  saveState({ notifications: keep.concat(add) }); arm();
  return { ok: true };
});
ipcMain.handle("ln:cancel", (_e, ids) => {
  const del = new Set(ids);
  saveState({ notifications: (loadState().notifications || []).filter((n) => !del.has(n.id)) }); arm();
  return { ok: true };
});
ipcMain.handle("ln:pending", () => reminders().map((n) => ({ id: n.id, title: n.title, body: n.body, at: n.at })));
ipcMain.handle("app:autostart", (_e, on) => {
  if (typeof on === "boolean") setAutostart(on);
  return app.getLoginItemSettings().openAtLogin;
});
ipcMain.handle("app:info", () => ({ version: app.getVersion(), platform: process.platform, autostart: app.getLoginItemSettings().openAtLogin }));

// ---------------- Avtomatik ishga tushish ----------------
function setAutostart(on) {
  app.setLoginItemSettings({ openAtLogin: on, openAsHidden: true, args: on ? ["--hidden"] : [] });
  updateTray();
}

// ---------------- Tray (Windows) ----------------
function updateTray() {
  if (IS_MAC) return;
  if (!tray) {
    const img = nativeImage.createFromPath(ICON).resize({ width: 32, height: 32 });
    tray = new Tray(img);
    tray.setToolTip("Hanguk Way");
    tray.on("click", showWindow);
  }
  const n = reminders();
  const next = n.length ? new Date(Math.min(...n.map((x) => x.at))) : null;
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: "Hanguk Way'ni ochish", click: showWindow },
    { type: "separator" },
    { label: next ? `Keyingi eslatma: ${next.toLocaleDateString("uz-UZ")} ${String(next.getHours()).padStart(2, "0")}:${String(next.getMinutes()).padStart(2, "0")}` : "Eslatma yoqilmagan", enabled: false },
    { label: "Kompyuter yoqilganda ishga tushsin", type: "checkbox", checked: app.getLoginItemSettings().openAtLogin, click: (i) => setAutostart(i.checked) },
    { label: "Yangilanishni tekshirish", click: () => checkUpdate(true) },
    { type: "separator" },
    { label: `Versiya ${app.getVersion()}`, enabled: false },
    { label: "Chiqish", click: () => { quitting = true; app.quit(); } },
  ]));
}

// ---------------- Yangilanish ----------------
function newer(a, b) {
  const pa = String(a).split(".").map(Number), pb = String(b).split(".").map(Number);
  for (let i = 0; i < 3; i++) { if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) > (pb[i] || 0); }
  return false;
}
async function checkUpdate(manual = false) {
  try {
    const r = await net.fetch(UPDATE_URL + "?t=" + Date.now());
    if (!r.ok) throw new Error("HTTP " + r.status);
    const info = await r.json();
    if (info.version && newer(info.version, app.getVersion())) {
      const st = loadState();
      if (!manual && st.skipVersion === info.version) return;
      const res = await dialog.showMessageBox(win && win.isVisible() ? win : undefined, {
        type: "info", title: "Yangi versiya", buttons: ["Yuklab olish", "Keyinroq", "Bu versiyani o'tkazib yuborish"], defaultId: 0, cancelId: 1,
        message: `Hanguk Way ${info.version} chiqdi`, detail: (info.notes || "Yangi imkoniyatlar va tuzatishlar.") + `\n\nSizdagi versiya: ${app.getVersion()}`,
      });
      if (res.response === 0) shell.openExternal(IS_MAC ? (info.mac || DOWNLOAD_PAGE) : (info.win || DOWNLOAD_PAGE));
      if (res.response === 2) saveState({ skipVersion: info.version });
    } else if (manual) {
      dialog.showMessageBox({ type: "info", title: "Hanguk Way", message: "Sizda eng so'nggi versiya", detail: `Versiya ${app.getVersion()}` });
    }
  } catch (e) {
    if (manual) dialog.showMessageBox({ type: "warning", title: "Hanguk Way", message: "Yangilanishni tekshirib bo'lmadi", detail: "Internet aloqasini tekshiring." });
  }
}

// ---------------- Ishga tushirish ----------------
app.on("second-instance", showWindow);
app.on("before-quit", () => { quitting = true; });

app.whenReady().then(async () => {
  serveLocal();
  // Mikrofon va bildirishnomalarga ruxsat — faqat ilovaning o'z sahifasi uchun
  const ok = new Set(["media", "notifications", "clipboard-sanitized-write", "fullscreen"]);
  session.defaultSession.setPermissionRequestHandler((wc, perm, cb, details) => {
    const own = (details.requestingUrl || wc.getURL() || "").startsWith(ORIGIN + "/");
    cb(own && ok.has(perm));
  });
  session.defaultSession.setPermissionCheckHandler((wc, perm, origin) => origin === ORIGIN && ok.has(perm));
  if (IS_MAC) {
    try { await systemPreferences.askForMediaAccess("microphone"); } catch (e) {}
    Menu.setApplicationMenu(Menu.buildFromTemplate([
      { role: "appMenu", submenu: [{ role: "about", label: "Hanguk Way haqida" }, { label: "Yangilanishni tekshirish", click: () => checkUpdate(true) },
        { label: "Mac yoqilganda ishga tushsin", type: "checkbox", checked: app.getLoginItemSettings().openAtLogin, click: (i) => setAutostart(i.checked) },
        { type: "separator" }, { role: "hide", label: "Yashirish" }, { role: "quit", label: "Chiqish" }] },
      { role: "editMenu" },
      { label: "Ko'rinish", submenu: [{ role: "reload", label: "Yangilash" }, { role: "togglefullscreen", label: "To'liq ekran" }, { type: "separator" }, { role: "zoomIn", label: "Kattalashtirish" }, { role: "zoomOut", label: "Kichraytirish" }, { role: "resetZoom", label: "Asl o'lcham" }] },
      { role: "windowMenu" },
    ]));
  } else {
    Menu.setApplicationMenu(null);
  }
  createWindow(!STARTED_HIDDEN);
  arm();
  setTimeout(() => checkUpdate(false), 8000);
  setInterval(() => checkUpdate(false), 6 * 3600 * 1000);
  app.on("activate", showWindow);
});

app.on("window-all-closed", () => { if (!IS_MAC && !hasReminders()) app.quit(); });
