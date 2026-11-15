// Telegram Mini App kodini (../miniapp) mobil ilova uchun www/ papkasiga ko'chiradi,
// app.config.json dan app-config.js yozadi va iPhone uchun Google URL sxemasini sozlaydi.
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "..", "miniapp");
const out = join(root, "www");
const cfg = JSON.parse(readFileSync(join(root, "app.config.json"), "utf8"));

if (cfg.demo) console.log("ℹ️  DEMO rejim: server va Google kirish ishlatilmaydi");
for (const k of (cfg.demo ? [] : ["apiBase", "googleWebClientId", "googleIosClientId"])) {
  if (!cfg[k] || /SIZNING|XXXX/.test(cfg[k])) console.warn(`⚠️  app.config.json: "${k}" hali to'ldirilmagan`);
}
if (cfg.apiBase && !cfg.apiBase.startsWith("https://")) throw new Error("apiBase https:// bilan boshlanishi kerak");

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
// PDF fayllar ilovaga qo'shilmaydi (internetdan ochiladi) — APK hajmi kichik qoladi
cpSync(src, out, { recursive: true, filter: (p) => !/[\\/]pdf([\\/]|$)/.test(p.slice(src.length)) });
writeFileSync(join(out, "app-config.js"),
  "window.PW_CONFIG = " + JSON.stringify({
    apiBase: (cfg.apiBase || "").replace(/\/$/, ""),
    googleWebClientId: cfg.googleWebClientId || "",
    googleIosClientId: cfg.googleIosClientId || "",
    demo: !!cfg.demo
  }, null, 2) + ";\n");

// iPhone: Google kirishdan qaytish uchun "teskari" client ID URL sxemasi (Info.plist)
const plist = join(root, "ios", "App", "App", "Info.plist");
if (existsSync(plist) && cfg.googleIosClientId && !/XXXX/.test(cfg.googleIosClientId)) {
  const reversed = cfg.googleIosClientId.split(".").reverse().join(".");
  let p = readFileSync(plist, "utf8");
  p = p.replace(/<string>com\.googleusercontent\.apps\.[^<]*<\/string>/, `<string>${reversed}</string>`);
  writeFileSync(plist, p);
}
console.log("✅ www/ tayyor:", out);
