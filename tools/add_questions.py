"""Savollar bankiga yangi to'plam qo'shadi.
Foydalanish: python3 tools/add_questions.py tools/qbank/batch2.py
To'plam fayli EPS va TOPIK ro'yxatlarini beradi; har bir element:
(id, sec, inst, uz, kind, content, opts, a, exp_uz, exp_ru, exp_en)"""
import json, runpy, sys, os, re
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "miniapp")
data = runpy.run_path(sys.argv[1])
def js(x): return json.dumps(x, ensure_ascii=False)
def qline(q):
    i, sec, inst, uz, kind, content, opts, a, eu, er, ee = q[:11]
    typ = q[11] if len(q) > 11 else None
    assert sec in ("read", "listen") and kind in ("text", "sign", "pic", "audio") and 0 <= a < len(opts) == 4, i
    assert len(set(opts)) == 4, i
    t = (', type:%s' % js(typ)) if typ else ''
    return '    {id:%s, sec:%s%s, inst:%s, uz:%s, %s:%s,\n     opts:%s, a:%d,\n     exp:%s}' % (js(i), js(sec), t, js(inst), js(uz), kind, js(content), js(opts), a, js(eu))
def tline(q): return '  %s: [%s, %s]' % (q[0], js(q[9]), js(q[10]))
qp = os.path.join(ROOT, "questions.js"); s = open(qp, encoding="utf-8").read()
_sets_src = open(os.path.join(ROOT, "questions-sets.js"), encoding="utf-8").read()
have = set(re.findall(r'id:"([et]\d+)"', s + _sets_src))
for key in ("EPS", "TOPIK"):
    for q in data.get(key, []): assert q[0] not in have, "takroriy id: " + q[0]
# Takroriy mazmun tekshiruvi (eski savollar va index.html dagi boshlang'ich savollar bilan)
def norm(c): return re.sub(r"(남자|여자):\s*", "", c.replace("\\n", "\n")).strip()
h = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
seg = h[h.index("var EXAMS"):h.index("var MODES")]
old = set(norm(m) for m in re.findall(r'(?:text|audio|sign|pic):"((?:[^"\\]|\\.)*)"', seg + s + _sets_src))
for key in ("EPS", "TOPIK"):
    for q in data.get(key, []):
        assert norm(q[5]) not in old, "takroriy savol: %s %s" % (q[0], q[5])
        old.add(norm(q[5]))
eps, top = data.get("EPS", []), data.get("TOPIK", [])
sets = data.get("SETS", {})
for key, lst in sets.items():
    for S in lst:
        c = norm(S.get("text") or S.get("audio")); assert c not in old, "takroriy to'plam: " + S["id"]; old.add(c)
        for sq in S["qs"]:
            assert sq[0] not in have, "takroriy id: " + sq[0]; have.add(sq[0])
            assert len(sq[2]) == 4 and len(set(sq[2])) == 4 and 0 <= sq[3] < 4, sq[0]
if eps:
    anchor = "\n  ],\n\n  topik: ["
    assert anchor in s; s = s.replace(anchor, ",\n" + ",\n".join(map(qline, eps)) + anchor, 1)
if top:
    anchor = "\n  ]\n};"
    assert s.rstrip().endswith("]\n};"); idx = s.rfind(anchor)
    s = s[:idx] + ",\n" + ",\n".join(map(qline, top)) + s[idx:]
open(qp, "w", encoding="utf-8").write(s)
tp = os.path.join(ROOT, "questions-i18n.js"); t = open(tp, encoding="utf-8").read()
if eps:
    t = t.replace("\n  t001:", "\n" + ",\n".join(map(tline, eps)) + ",\n  t001:", 1)
if top:
    idx = t.rstrip().rfind("\n};")
    t = t[:idx] + ",\n" + ",\n".join(map(tline, top)) + t[idx:]
sp = os.path.join(ROOT, "questions-sets.js"); ss = open(sp, encoding="utf-8").read()
allsets = []
for key, lst in sets.items():
    body = []
    for S in lst:
        kind = "text" if S.get("text") else "audio"
        qs = ",\n".join('      {id:%s, ask:%s, opts:%s, a:%d,\n       exp:%s}' % (js(sq[0]), js(sq[1]), js(sq[2]), sq[3], js(sq[4])) for sq in S["qs"])
        slot = (', slot:%s' % js(S["slot"])) if S.get("slot") else ''
        body.append('    {id:%s, type:%s%s, sec:%s, %s:%s,\n     qs:[\n%s\n     ]}' % (js(S["id"]), js(S["type"]), slot, js(S["sec"]), kind, js(S[kind]), qs))
        allsets.extend(S["qs"])
    m = re.search(r"\b%s: \[" % key, ss); assert m, key
    # massiv oxiriga qo'shish
    depth, j = 0, m.end() - 1
    while True:
        ch = ss[j]
        if ch == "[": depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0: break
        j += 1
    inner = ss[m.end():j].strip()
    ss = ss[:m.end()] + ("\n" + inner + ",\n" if inner else "\n") + ",\n".join(body) + "\n  " + ss[j:]
open(sp, "w", encoding="utf-8").write(ss)
if allsets:
    idx = t.rstrip().rfind("\n};")
    t = t[:idx] + ",\n" + ",\n".join('  %s: [%s, %s]' % (sq[0], js(sq[5]), js(sq[6])) for sq in allsets) + t[idx:]
open(tp, "w", encoding="utf-8").write(t)
print("to'plamlar:", sum(len(v) for v in sets.values()), "|", "qo'shildi: EPS", len(eps), "TOPIK", len(top))
