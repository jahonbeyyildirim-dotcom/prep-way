// macOS: Apple Developer sertifikatisiz ham ilova Apple Silicon (M1/M2/M3/M4) da ochilishi uchun
// "ad-hoc" imzo qo'yiladi. Sertifikat olingach, package.json → build.mac.identity ga uning nomi yoziladi.
const { execFileSync } = require("node:child_process");
const path = require("node:path");
exports.default = async function (ctx) {
  if (ctx.electronPlatformName !== "darwin") return;
  // Universal (Intel + Apple Silicon) yig'ishda avval x64 va arm64 alohida yig'iladi — ular birlashtirilgandan keyingina imzolanadi
  const { Arch } = require("electron-builder");
  if (ctx.arch !== Arch.universal) return;
  const app = path.join(ctx.appOutDir, `${ctx.packager.appInfo.productFilename}.app`);
  execFileSync("codesign", ["--force", "--deep", "--sign", "-", app], { stdio: "inherit" });
};
