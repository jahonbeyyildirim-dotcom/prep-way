// Ilova sahifasini (../miniapp) kompyuter ilovasi uchun desktop/www/ ga ko'chiradi:
// server manzili mobile/app.config.json dan olinadi, desktop-shim.js qo'shiladi.
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "..", "miniapp");
const out = join(root, "www");
const cfg = JSON.parse(readFileSync(join(root, "..", "mobile", "app.config.json"), "utf8"));
if (process.env.PW_API_BASE) cfg.apiBase = process.env.PW_API_BASE; // faqat sinov uchun
if (!cfg.apiBase || !(cfg.apiBase.startsWith("https://") || process.env.PW_API_BASE)) throw new Error("mobile/app.config.json: apiBase https:// bilan boshlanishi kerak");

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
// PDF darsliklar internetdan ochiladi; o'rnatish sahifasi va service worker kerak emas
cpSync(src, out, { recursive: true, filter: (p) => !/[\\/](pdf([\\/]|$)|yuklab\.html$|sw\.js$)/.test(p.slice(src.length)) });
writeFileSync(join(out, "app-config.js"), "window.PW_CONFIG = " + JSON.stringify({
  apiBase: cfg.apiBase.replace(/\/$/, ""), googleWebClientId: "", googleIosClientId: "", demo: false, guest: true,
}, null, 2) + ";\n");
cpSync(join(root, "shim", "desktop-shim.js"), join(out, "desktop-shim.js"));
const idx = join(out, "index.html");
let html = readFileSync(idx, "utf8");
if (!html.includes('<script src="app-config.js"></script>')) throw new Error("index.html: app-config.js topilmadi");
html = html.replace('<script src="app-config.js"></script>', '<script src="app-config.js"></script>\n<script src="desktop-shim.js"></script>');
writeFileSync(idx, html);
console.log("✅ desktop/www tayyor");
