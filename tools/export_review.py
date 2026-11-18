"""Metodist uchun savollar jadvali (.xlsx).
Foydalanish: python3 tools/export_review.py [chiqish.xlsx]
Barcha savollarni (index.html dagi boshlang'ich savollar, questions.js, questions-sets.js) tur, variantlar,
to'g'ri javob va uch tilli izoh bilan bitta faylga chiqaradi. Metodist "Holat" va "Metodist izohi" ustunlarini to'ldiradi."""
import json, os, re, subprocess, sys
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule
from openpyxl.comments import Comment

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "miniapp")
OUT = sys.argv[1] if len(sys.argv) > 1 else "Hanguk-Way-savollar-tekshiruv.xlsx"

JS = r"""
global.window = {};
const fs = require('fs'), vm = require('vm'), path = require('path');
const R = process.argv[1];
for (const f of ['questions.js','questions-i18n.js','questions-sets.js','exam-format.js']) vm.runInThisContext(fs.readFileSync(path.join(R,f),'utf8'));
const h = fs.readFileSync(path.join(R,'index.html'),'utf8');
const seg = h.slice(h.indexOf('var EXAMS'), h.indexOf('var MODES'));
const EXAMS = vm.runInThisContext('(function(){' + seg + '; return EXAMS;})()');
const F = window.PW_FORMAT, out = {};
for (const k of ['eps','topik']) {
  const legacy = EXAMS[k].qs.map((q,i)=>Object.assign({}, q, {id: k.charAt(0)+String(i+1).padStart(3,'0')}));
  const flat = [];
  ((window.PW_QSETS||{})[k]||[]).forEach(S => S.qs.forEach((sq,j) => flat.push(Object.assign({}, sq,
     {sec:S.sec, type:S.type, grp:S.id, slot:S.slot||'', inst:sq.ask, text:S.text, audio:S.audio}))));
  out[k] = legacy.concat(window.PW_QBANK[k]||[]).concat(flat).map(q => {
    const t = F.typeOf(k, q), T = F.TYPES[t] || {};
    const tr = window.PW_QTR[q.id] || [];
    return {id:q.id, sec:q.sec, type:t, range:T.range||'', tko:T.ko||q.inst, ask:(q.grp||(F.ASK_KEEP||{})[t]) ? q.inst : '',
      grp:q.grp||'', slot:q.slot||'', content:q.text||q.sign||q.pic||q.audio||'', kind:q.text?'Matn':q.sign?'Belgi':q.pic?'Rasm':'Audio',
      opts:q.opts, a:q.a, uz:q.exp||'', ru:tr[0]||'', en:tr[1]||''};
  });
}
process.stdout.write(JSON.stringify(out));
"""
data = json.loads(subprocess.check_output(["node", "-e", JS, os.path.abspath(ROOT)]))

def clean(s):
    s = re.sub(r"<[^>]+>", "", s or "")
    return s.replace("[[", "«").replace("]]", "»").strip()

# Rasmiy manbada tekshirilishi kerak bo'lgan qoidalar
CHECK = {"e226": "Qoida (15 kun) — rasmiy manbadan tekshiring", "e259": "Qoida (14 kun) — rasmiy manbadan tekshiring"}

ARIAL = "Arial"
HEAD = Font(name=ARIAL, bold=True, color="FFFFFF", size=10)
HEAD_FILL = PatternFill("solid", fgColor="1F3864")
INPUT_FILL = PatternFill("solid", fgColor="FFF2CC")
SET_FILL = PatternFill("solid", fgColor="EEF3FB")
BODY = Font(name=ARIAL, size=10)
BOLD = Font(name=ARIAL, size=10, bold=True)
THIN = Side(style="thin", color="D0D0D0")
BOX = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)
WRAP = Alignment(wrap_text=True, vertical="top")
STATUSES = ["✅ To'g'ri", "✏️ Tuzatish kerak", "❌ O'chirish"]
SEC = {"read": "O'qish (읽기)", "listen": "Tinglash (듣기)"}

COLS = [("№", 5), ("ID", 7), ("Bo'lim", 13), ("Tur (rasmiy ko'rsatma)", 34), ("Juft to'plam", 9),
        ("Savol", 26), ("Matn / audio / rasm", 46), ("1", 18), ("2", 18), ("3", 18), ("4", 18),
        ("To'g'ri javob", 20), ("Izoh (o'zbekcha)", 46), ("Izoh (ruscha)", 40), ("Izoh (inglizcha)", 40),
        ("Diqqat", 18), ("Holat", 17), ("Metodist izohi", 40)]
C_STATUS, C_NOTE = 17, 18

wb = Workbook()
guide = wb.active
guide.title = "Ko'rsatma"
sheets = {}
for key, title in (("eps", "EPS-TOPIK"), ("topik", "TOPIK I")):
    ws = wb.create_sheet(title)
    sheets[key] = ws
    for c, (name, w) in enumerate(COLS, 1):
        cell = ws.cell(row=1, column=c, value=name)
        cell.font, cell.fill, cell.border = HEAD, HEAD_FILL, BOX
        cell.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center")
        ws.column_dimensions[cell.column_letter].width = w
    ws.row_dimensions[1].height = 30
    dv = DataValidation(type="list", formula1='"' + ",".join(STATUSES) + '"', allow_blank=True,
                        showErrorMessage=True, errorTitle="Holat", error="Ro'yxatdan tanlang")
    ws.add_data_validation(dv)
    r = 2
    for i, q in enumerate(data[key], 1):
        rng = (" [" + q["range"] + "]") if q["range"] and key == "topik" else ""
        row = [i, q["id"], SEC.get(q["sec"], q["sec"]), (q["type"] or "") + rng + "\n" + q["tko"],
               q["grp"], q["ask"], q["kind"] + ": " + q["content"], *q["opts"],
               "%d) %s" % (q["a"] + 1, q["opts"][q["a"]]), clean(q["uz"]), clean(q["ru"]), clean(q["en"]),
               CHECK.get(q["id"], ""), None, None]
        for c, v in enumerate(row, 1):
            cell = ws.cell(row=r, column=c, value=v)
            cell.font, cell.border, cell.alignment = BODY, BOX, WRAP
            if q["grp"] and c <= 7:
                cell.fill = SET_FILL
        ws.cell(row=r, column=12).font = BOLD
        for c in (C_STATUS, C_NOTE):
            ws.cell(row=r, column=c).fill = INPUT_FILL
        if q["id"] in CHECK:
            ws.cell(row=r, column=16).font = Font(name=ARIAL, size=10, bold=True, color="C00000")
        r += 1
    last = r - 1
    dv.add(f"Q2:Q{last}")
    ws.freeze_panes = "C2"
    ws.auto_filter.ref = f"A1:R{last}"
    # Holat bo'yicha qator rangi
    ws.conditional_formatting.add(f"Q2:R{last}", FormulaRule(formula=[f'LEFT($Q2,1)="✅"'], fill=PatternFill("solid", fgColor="D9EAD3")))
    ws.conditional_formatting.add(f"Q2:R{last}", FormulaRule(formula=[f'LEFT($Q2,2)="✏️"'], fill=PatternFill("solid", fgColor="FCE5CD")))
    ws.conditional_formatting.add(f"Q2:R{last}", FormulaRule(formula=[f'LEFT($Q2,1)="❌"'], fill=PatternFill("solid", fgColor="F4CCCC")))
    ws.cell(row=1, column=C_STATUS).comment = Comment("Ro'yxatdan tanlang: To'g'ri / Tuzatish kerak / O'chirish", "Hanguk Way")

# ---------- Ko'rsatma varag'i ----------
g = guide
g.column_dimensions["A"].width = 30
for col in "BCDEF":
    g.column_dimensions[col].width = 18
g["A1"] = "Hanguk Way — savollar bazasini metodist tekshiruvi"
g["A1"].font = Font(name=ARIAL, size=16, bold=True, color="1F3864")
lines = [
    "Bu faylda ilovadagi barcha savollar bor: har biri rasmiy savol turi, variantlar, to'g'ri javob va uch tildagi izoh bilan.",
    "Siz faqat sariq ustunlarni to'ldirasiz: «Holat» (ro'yxatdan tanlang) va «Metodist izohi» (nima noto'g'ri, qanday bo'lishi kerak).",
    "Ko'k fondagi qatorlar — juft savollar: bitta matn yoki audioga ikkita savol (TOPIK I [25~30], [49~70]).",
    "«Diqqat» ustunida qizil yozuv bor savollarda rasmiy qoida keltirilgan — uni amaldagi qonun bo'yicha albatta tekshiring.",
    "Filtr: sarlavhadagi ▼ tugmasi orqali bo'lim, tur yoki holat bo'yicha saralash mumkin.",
]
for i, t in enumerate(lines, 3):
    g.cell(row=i, column=1, value=t).font = BODY
g["A9"] = "Namuna (qanday to'ldiriladi)"
g["A9"].font = BOLD
ex_head = ["ID", "Savol qisqacha", "Holat", "Metodist izohi"]
ex_row = ["e073", "저는 한국어를 잘하고 (    ). → 싶어요", "✏️ Tuzatish kerak", "Izohga «-고 싶다 faqat 1- va 2-shaxsda» qo'shilsin"]
for c, v in enumerate(ex_head, 1):
    cell = g.cell(row=10, column=c, value=v); cell.font, cell.fill, cell.border = HEAD, HEAD_FILL, BOX
for c, v in enumerate(ex_row, 1):
    cell = g.cell(row=11, column=c, value=v); cell.font, cell.border = Font(name=ARIAL, size=10, italic=True, color="595959"), BOX
g["A13"] = "Holat bo'yicha hisob (avtomatik)"
g["A13"].font = BOLD
hdr = ["Imtihon", "Jami savol", STATUSES[0], STATUSES[1], STATUSES[2], "Tekshirilmagan"]
for c, v in enumerate(hdr, 1):
    cell = g.cell(row=14, column=c, value=v); cell.font, cell.fill, cell.border = HEAD, HEAD_FILL, BOX
    cell.alignment = Alignment(horizontal="center", wrap_text=True)
for i, (key, title) in enumerate((("eps", "EPS-TOPIK"), ("topik", "TOPIK I")), 15):
    last = len(data[key]) + 1
    ref = f"'{title}'!"
    vals = [title, f"=COUNTA({ref}B2:B{last})",
            f'=COUNTIF({ref}Q2:Q{last},"{STATUSES[0]}")', f'=COUNTIF({ref}Q2:Q{last},"{STATUSES[1]}")',
            f'=COUNTIF({ref}Q2:Q{last},"{STATUSES[2]}")', f"=B{i}-C{i}-D{i}-E{i}"]
    for c, v in enumerate(vals, 1):
        cell = g.cell(row=i, column=c, value=v); cell.font, cell.border = (BOLD if c == 1 else BODY), BOX
        cell.number_format = "0"
g.cell(row=17, column=1, value="Jami").font = BOLD
for c, col in enumerate("BCDEF", 2):
    cell = g.cell(row=17, column=c, value=f"=SUM({col}15:{col}16)"); cell.font, cell.border = BOLD, BOX
g["A19"] = "Savol turlari: E-… — EPS-TOPIK, T-… — TOPIK I. TOPIK turlarida [n~m] — rasmiy imtihondagi raqamlar oralig'i."
g["A19"].font = Font(name=ARIAL, size=9, color="595959")
wb.save(OUT)
print(OUT, {k: len(v) for k, v in data.items()})
