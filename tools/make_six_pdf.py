"""«6 daqiqa koreys» epizodlaridan PDF yaratadi: miniapp/pdf/six-<id>-<til>.pdf
Ishga tushirish: python3 tools/make_six_pdf.py  (Playwright + Chromium kerak)"""
import asyncio, html, json, subprocess, sys
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
data = json.loads(subprocess.check_output(["node", "-e", "global.window={};require(process.argv[1]);process.stdout.write(JSON.stringify(window.PW_SIX))", str(ROOT / "miniapp/six-data.js")]))
LI = {"uz": 2, "ru": 3, "en": 4}
FLAG = {"uz": "UZ", "ru": "RU", "en": "EN"}
NAME = {"K": "Komiko", "M": "Minjun"}
L = {
  "title": {"uz": "6 daqiqa koreys", "ru": "6 минут корейского", "en": "6-Minute Korean"},
  "q": {"uz": "Bugungi savol", "ru": "Вопрос дня", "en": "Today's question"},
  "ans": {"uz": "Javob", "ru": "Ответ", "en": "Answer"},
  "script": {"uz": "Suhbat matni", "ru": "Текст диалога", "en": "Script"},
  "words": {"uz": "Yangi so'zlar", "ru": "Новые слова", "en": "New words"},
  "use": {"uz": "Qayerda ishlatiladi", "ru": "Где используется", "en": "Where it's used"},
  "ex": {"uz": "Misollar", "ru": "Примеры", "en": "Examples"},
  "gr": {"uz": "Grammatika", "ru": "Грамматика", "en": "Grammar"},
  "quiz": {"uz": "Savollar", "ru": "Вопросы", "en": "Quiz"},
  "key": {"uz": "Javoblar", "ru": "Ответы", "en": "Answer key"},
  "note": {"uz": "Sariq rang bilan belgilangan so'zlar «Yangi so'zlar» bo'limida tushuntirilgan.", "ru": "Слова, выделенные жёлтым, объяснены в разделе «Новые слова».", "en": "Words highlighted in yellow are explained in the \"New words\" section."},
}
e = html.escape

def mark(ep, ko):
    h = e(ko)
    for w in ep["words"]:
        for f in w.get("hl", [w["ko"]]):
            ef = e(f)
            if ef in h and "<mark>" + ef not in h:
                h = h.replace(ef, "<mark>" + ef + "</mark>", 1)
    return h

def tri(o, lg):
    others = [l for l in ("uz", "ru", "en") if l != lg and o.get(l)]
    return f'<b>{e(o.get(lg) or o["uz"])}</b><div class="tri">' + " · ".join(f'{FLAG[l]}: {e(o[l])}' for l in others) + "</div>"

def ex_html(x, lg):
    others = [l for l in ("uz", "ru", "en") if l != lg]
    EX = {"uz": 1, "ru": 2, "en": 3}
    return f'<div class="ex"><span class="ko">{e(x[0])}</span><br>{e(x[EX[lg]])}<div class="tri">' + " · ".join(f'{FLAG[l]}: {e(x[EX[l]])}' for l in others) + "</div></div>"

def page(ep, lg):
    t = lambda k: L[k][lg]
    lines = ep["lines"] + ep["outro"]
    rows = "".join(f'<tr class="{l[0]}"><td class="who">{NAME[l[0]]}</td><td><div class="ko">{mark(ep, l[1])}</div><div class="tr">{e(l[LI[lg]])}</div></td></tr>' for l in lines)
    words = "".join(f'<div class="w"><div class="wh"><span class="ko big">{e(w["ko"])}</span> <span class="rom">[{e(w["rom"])}]</span></div>{tri(w["m"], lg)}'
                    f'<div class="use"><b>{t("use")}:</b> {e(w["use"].get(lg) or w["use"]["uz"])}</div><div class="exs"><b>{t("ex")}:</b>{"".join(ex_html(x, lg) for x in w["ex"])}</div></div>' for w in ep["words"])
    g = ep["grammar"]
    quiz = "".join(f'<li>{e(q["q"].get(lg) or q["q"]["uz"])}<div class="ko opts">' + " &nbsp; ".join(f'{i+1}) {e(o)}' for i, o in enumerate(q["o"])) + "</div></li>" for q in ep["quiz"])
    key = ", ".join(f'{i+1} — {q["a"]+1}' for i, q in enumerate(ep["quiz"]))
    return f"""<!doctype html><html lang="{lg}"><head><meta charset="utf-8"><style>
@page {{ size: A4; margin: 16mm 15mm; }}
body {{ font-family: 'Noto Sans CJK KR', 'Inter', sans-serif; color:#14171f; font-size:10.5pt; line-height:1.45 }}
.ko {{ font-family: 'Noto Sans CJK KR', sans-serif }}
.hd {{ background:linear-gradient(135deg,#1e3a8a,#0ea5e9); color:#fff; border-radius:12px; padding:14px 18px; margin-bottom:12px }}
.hd small {{ text-transform:uppercase; letter-spacing:.08em; font-weight:700; opacity:.85 }}
.hd h1 {{ margin:2px 0 0; font-size:20pt }}
.hd .sub {{ opacity:.9 }}
h2 {{ font-size:13pt; color:#1e3a8a; border-bottom:2px solid #dbe4f5; padding-bottom:3px; margin:16px 0 8px }}
.q {{ border-left:4px solid #0ea5e9; background:#f1f7fd; padding:8px 12px; border-radius:6px }}
table {{ width:100%; border-collapse:collapse }}
td {{ vertical-align:top; padding:5px 6px; border-bottom:1px solid #eef0f4 }}
td.who {{ width:58px; font-weight:800; font-size:9pt; color:#7a3cf0 }}
tr.M td.who {{ color:#0e8f7e }}
.tr {{ color:#5b6170; font-size:9.5pt }}
mark {{ background:#ffe58a; font-weight:700; padding:0 1px }}
.w {{ border:1px solid #e4e2db; border-radius:8px; padding:8px 10px; margin-bottom:8px; page-break-inside:avoid }}
.big {{ font-size:15pt; font-weight:700 }}
.rom {{ color:#5b6170 }}
.tri {{ color:#5b6170; font-size:9pt }}
.use {{ background:#f6f5f1; border-radius:6px; padding:4px 8px; margin-top:4px; font-size:9.5pt }}
.ex {{ border-left:3px solid #0ea5e9; padding-left:8px; margin-top:4px; font-size:9.5pt }}
.gram {{ border-left:4px solid #0f3d91; padding:6px 12px; background:#f1f4fb; border-radius:6px; page-break-inside:avoid }}
.gram .p {{ font-size:14pt; font-weight:700; color:#0f3d91 }}
ol li {{ margin-bottom:6px }} .opts {{ color:#333 }}
.ft {{ margin-top:14px; font-size:8.5pt; color:#8a8f9a; border-top:1px solid #eee; padding-top:6px }}
</style></head><body>
<div class="hd"><small>{t("title")} · {ep["id"]} · {e(ep["level"])}</small><h1>{e(ep["title"].get(lg))}</h1><div class="sub ko">{e(ep["ko"])} · Komiko &amp; Minjun</div></div>
<div class="q"><b>❓ {t("q")}:</b> <span class="ko">{e(ep["q"]["ko"])}</span><br>{e(ep["q"][lg])}</div>
<h2>{t("script")}</h2><p class="tr">{t("note")}</p><table>{rows}</table>
<div class="q" style="margin-top:10px"><b>{t("ans")}:</b> <span class="ko">{e(ep["q"]["a"]["ko"])}</span> — {e(ep["q"]["a"][lg])}</div>
<h2>{t("words")}</h2>{words}
<h2>{t("gr")}</h2><div class="gram"><div class="p ko">{e(g["p"])}</div>{tri(g["m"], lg)}{"".join(ex_html(x, lg) for x in g["ex"])}</div>
<h2>{t("quiz")}</h2><ol>{quiz}</ol><p class="tr"><b>{t("key")}:</b> {key}</p>
<div class="ft">Hanguk Way · {t("title")}</div></body></html>"""

async def main():
    out = ROOT / "miniapp/pdf"; out.mkdir(exist_ok=True)
    async with async_playwright() as p:
        exe = "/usr/bin/google-chrome" if Path("/usr/bin/google-chrome").exists() else None
        br = await p.chromium.launch(executable_path=exe) if exe else await p.chromium.launch()
        pg = await br.new_page()
        for ep in data:
            for lg in ("uz", "ru", "en"):
                await pg.set_content(page(ep, lg), wait_until="load")
                f = out / f"six-{ep['id']}-{lg}.pdf"
                await pg.pdf(path=str(f), format="A4", print_background=True)
                print(f.name, f.stat().st_size // 1024, "KB")
        await br.close()

asyncio.run(main())
