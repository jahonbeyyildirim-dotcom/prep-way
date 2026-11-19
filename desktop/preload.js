// Sahifaga faqat "kompyuter ilovasi" belgisini beradi (Node.js imkoniyatlari sahifaga ochilmaydi).
const { contextBridge } = require("electron");
contextBridge.exposeInMainWorld("PW_DESKTOP", { platform: process.platform, version: process.env.npm_package_version || "" });
