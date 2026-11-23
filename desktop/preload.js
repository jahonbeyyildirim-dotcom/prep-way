// Sahifaga faqat kerakli kompyuter imkoniyatlarini beradi (Node.js sahifaga ochilmaydi).
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("PW_DESKTOP", {
  platform: process.platform,
  // Kundalik eslatmalar: asosiy jarayon tizim bildirishnomasini ko'rsatadi (oyna yopiq bo'lsa ham)
  schedule: (list) => ipcRenderer.invoke("ln:schedule", list),
  cancel: (ids) => ipcRenderer.invoke("ln:cancel", ids),
  pending: () => ipcRenderer.invoke("ln:pending"),
  autostart: (on) => ipcRenderer.invoke("app:autostart", on),
  info: () => ipcRenderer.invoke("app:info"),
});
