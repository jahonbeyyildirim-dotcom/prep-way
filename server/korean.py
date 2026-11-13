"""Koreys matni bilan ishlash: hangul ulushini hisoblash va talaffuzni matn bo'yicha solishtirish."""
import difflib
import re

_S_BASE, _S_END = 0xAC00, 0xD7A3
_JAMO = re.compile(r"[ᄀ-ᇿ㄰-㆏]")


def is_hangul(ch: str) -> bool:
    o = ord(ch)
    return _S_BASE <= o <= _S_END or bool(_JAMO.match(ch))


def hangul_stats(text: str) -> tuple[int, float]:
    """(hangul belgilar soni, barcha harflar ichidagi ulushi)."""
    letters = [c for c in text if c.isalpha()]
    if not letters:
        return 0, 0.0
    h = sum(1 for c in letters if is_hangul(c))
    return h, h / len(letters)


def _decompose(syl: str) -> str:
    """Bo'g'inni jamo (harf) larga ajratadi: 한 -> ㅎ ㅏ ㄴ."""
    o = ord(syl)
    if not (_S_BASE <= o <= _S_END):
        return syl
    o -= _S_BASE
    lead, vowel, tail = o // 588, (o % 588) // 28, o % 28
    return chr(0x1100 + lead) + chr(0x1161 + vowel) + (chr(0x11A7 + tail) if tail else "")


def only_hangul(text: str) -> str:
    return "".join(c for c in text if _S_BASE <= ord(c) <= _S_END)


def compare(target: str, said: str) -> dict:
    """Maqsad gap va aytilgan gapni solishtiradi.

    Natija: {"score": 0..100, "marks": [{"ch": "안", "ok": True}, ...]}
    score — harflar (jamo) darajasidagi o'xshashlik; marks — har bir bo'g'in to'g'ri aytilganmi.
    """
    t, s = only_hangul(target), only_hangul(said)
    if not t:
        return {"score": 0, "marks": []}
    tj = "".join(_decompose(c) for c in t)
    sj = "".join(_decompose(c) for c in s)
    score = round(difflib.SequenceMatcher(None, tj, sj, autojunk=False).ratio() * 100)

    ok = [False] * len(t)
    for a, _b, size in difflib.SequenceMatcher(None, t, s, autojunk=False).get_matching_blocks():
        for i in range(a, a + size):
            ok[i] = True
    # Belgilarni asl matn bo'yicha qaytaramiz (bo'sh joy va tinish belgilari doim "to'g'ri")
    marks, k = [], 0
    for ch in target:
        if _S_BASE <= ord(ch) <= _S_END:
            marks.append({"ch": ch, "ok": ok[k]})
            k += 1
        else:
            marks.append({"ch": ch, "ok": True})
    return {"score": score, "marks": marks}
