"""Savollardagi emojilarni OpenMoji (CC BY-SA 4.0) qora chiziqli chizmalariga almashtirish uchun SVG'larni tayyorlaydi.
Foydalanish: python3 tools/make_pics.py /yo'l/openmoji/package
Natija: miniapp/pics/<HEX>.svg va miniapp/pics/pics.js (window.PW_PICS — mavjud chizmalar ro'yxati)."""
import json, os, re, shutil, subprocess, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "miniapp")
SRC = os.path.join(sys.argv[1], "black", "svg")
DST = os.path.join(ROOT, "pics")

JS = r"""
global.window = {};
const fs = require('fs'), vm = require('vm'), path = require('path'), R = process.argv[1];
for (const f of ['questions.js','questions-sets.js','exam-format.js']) vm.runInThisContext(fs.readFileSync(path.join(R,f),'utf8'));
const h = fs.readFileSync(path.join(R,'index.html'),'utf8');
const EX = vm.runInThisContext('(function(){' + h.slice(h.indexOf('var EXAMS'), h.indexOf('var MODES')) + '; return EXAMS;})()');
const isPic = o => !/[A-Za-z0-9가-힣㄰-㆏]/.test(o);
const set = new Set();
const add = s => { if (s && isPic(s)) for (const g of new Intl.Segmenter('en', {granularity:'grapheme'}).segment(s)) if (g.segment.trim()) set.add(g.segment); };
for (const k of ['eps','topik']) for (const q of EX[k].qs.concat(window.PW_QBANK[k]||[])) { add(q.pic); (q.opts||[]).forEach(add); }
for (const T of Object.values(window.PW_FORMAT.TYPES)) if (T.ex) { add(T.ex.pic); (T.ex.opts||[]).forEach(add); }
process.stdout.write(JSON.stringify([...set]));
"""
graphemes = json.loads(subprocess.check_output(["node", "-e", JS, os.path.abspath(ROOT)]))

def hexes(g):
    cps = ["%04X" % ord(c) for c in g]
    yield "-".join(cps)
    no = [c for c in cps if c != "FE0F"]
    yield "-".join(no)
    if len(no) == 1: yield no[0] + "-FE0F"

def minify(svg):
    svg = re.sub(r"<!--.*?-->", "", svg, flags=re.S)
    svg = re.sub(r">\s+<", "><", svg)
    svg = re.sub(r'\s(id)="[^"]*"', "", svg)
    return svg.strip()

if os.path.isdir(DST): shutil.rmtree(DST)
os.makedirs(DST)
have, missing = {}, []
for g in graphemes:
    for hx in hexes(g):
        p = os.path.join(SRC, hx + ".svg")
        if os.path.exists(p):
            key = "-".join(c for c in hx.split("-") if c != "FE0F")
            open(os.path.join(DST, key + ".svg"), "w").write(minify(open(p).read()))
            have[key] = 1
            break
    else:
        missing.append(g)
open(os.path.join(DST, "pics.js"), "w").write(
    "/* OpenMoji (openmoji.org) qora chiziqli chizmalari — CC BY-SA 4.0. tools/make_pics.py yaratadi. */\n"
    "window.PW_PICS = " + json.dumps(have, separators=(",", ":")) + ";\n")
size = sum(os.path.getsize(os.path.join(DST, f)) for f in os.listdir(DST))
print("chizmalar:", len(have), "| topilmadi:", missing, "| hajm: %.0f KB" % (size / 1024))
