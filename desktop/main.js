// Hanguk Way — Windows va macOS uchun kompyuter ilovasi (Electron).
// Ilova sahifasi (../miniapp) ilova ichiga joylanadi va https://localhost manzilidan ochiladi —
// Android ilovasi bilan bir xil manzil, shuning uchun server (CORS) uni taniydi.
const { app, BrowserWindow, protocol, net, shell, session, systemPreferences, Menu, nativeTheme } = require("electron");
const path = require("node:path");
const fs = require("node:fs");
const { pathToFileURL } = require("node:url");

const WWW = path.join(__dirname, "www");
const HOST = "localhost";
const START = `https://${HOST}/index.html`;

protocol.registerSchemesAsPrivileged([
  { scheme: "https", privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true } },
]);

if (!app.requestSingleInstanceLock()) app.quit();

let win = null;

function serveLocal() {
  // Faqat https://localhost/... ilova fayllaridan beriladi; qolgan barcha so'rovlar (server, Google) odatdagidek internetga ketadi.
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

function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 820,
    minWidth: 380,
    minHeight: 560,
    title: "Hanguk Way",
    backgroundColor: nativeTheme.shouldUseDarkColors ? "#0e1424" : "#f6f5f1",
    icon: path.join(__dirname, "build", "icon.png"),
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      spellcheck: false,
    },
  });
  win.once("ready-to-show", () => win.show());
  win.loadURL(START);

  // Tashqi havolalar (maxfiylik siyosati, PDF, Telegram) oddiy brauzerda ochiladi
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url) && !url.startsWith(`https://${HOST}/`)) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith(`https://${HOST}/`)) { e.preventDefault(); if (/^https?:/i.test(url)) shell.openExternal(url); }
  });
}

app.on("second-instance", () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });

app.whenReady().then(async () => {
  serveLocal();
  // Mikrofon (talaffuz, Komiko bilan suhbat) va bildirishnomalarga ruxsat — faqat ilovaning o'z sahifasi uchun
  const ok = new Set(["media", "notifications", "clipboard-sanitized-write", "fullscreen"]);
  session.defaultSession.setPermissionRequestHandler((wc, perm, cb, details) => {
    const own = (details.requestingUrl || wc.getURL() || "").startsWith(`https://${HOST}/`);
    cb(own && ok.has(perm));
  });
  session.defaultSession.setPermissionCheckHandler((wc, perm, origin) => origin === `https://${HOST}` && ok.has(perm));
  if (process.platform === "darwin") {
    try { await systemPreferences.askForMediaAccess("microphone"); } catch (e) {}
    Menu.setApplicationMenu(Menu.buildFromTemplate([
      { role: "appMenu" }, { role: "editMenu" },
      { label: "Ko'rinish", submenu: [{ role: "reload", label: "Yangilash" }, { role: "togglefullscreen", label: "To'liq ekran" }, { type: "separator" }, { role: "zoomIn", label: "Kattalashtirish" }, { role: "zoomOut", label: "Kichraytirish" }, { role: "resetZoom", label: "Asl o'lcham" }] },
      { role: "windowMenu" },
    ]));
  } else {
    Menu.setApplicationMenu(null);
  }
  createWindow();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
