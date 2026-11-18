"""Lug'at xizmati: umumiy kesh (Postgres) + Gemini + DeepL.

Ishlash tartibi:
  1. So'z avval umumiy keshdan qidiriladi — topilsa, AI limitidan sarflanmaydi.
  2. Topilmasa: Gemini to'liq lug'at maqolasini tuzadi (lug'aviy shakl, o'qilishi, 3 tilda ma'no, misol).
  3. DeepL (DEEPL_API_KEY berilgan bo'lsa) bosh so'zni o'zbek/rus/ingliz tiliga mustaqil tarjima qiladi;
     Gemini ishlamasa — DeepL yolg'iz o'zi maqola tuzadi.
  4. Natija umumiy keshga yoziladi: bitta foydalanuvchi qidirgan so'z hammaning lug'atiga qo'shiladi.
"""
from __future__ import annotations

import asyncio
import json
import logging
import re
import time

import aiohttp

from . import ai, config, persist

log = logging.getLogger("dict")

_MEM: dict[str, dict] = {}          # baza bo'lmasa — xotiradagi kesh
_MEM_MAX = 5000
_table_ready = False
_KO = re.compile(r"[가-힣]")


def _key(q: str) -> str:
    return re.sub(r"\s+", " ", q.strip().lower())[:80]


# ---------------- Kunlik chegara (suiiste'molga qarshi) ----------------
_QUOTA: dict[tuple, int] = {}


def take_quota(uid) -> bool:
    day = time.strftime("%Y-%m-%d")
    if len(_QUOTA) > 20000:
        _QUOTA.clear()
    k = (uid, day)
    if _QUOTA.get(k, 0) >= config.DICT_DAILY_LIMIT:
        return False
    _QUOTA[k] = _QUOTA.get(k, 0) + 1
    return True


def give_back(uid) -> None:
    k = (uid, time.strftime("%Y-%m-%d"))
    if _QUOTA.get(k):
        _QUOTA[k] -= 1


# ---------------- Kesh ----------------
async def _ensure_table() -> bool:
    global _table_ready
    if not persist.enabled():
        return False
    if _table_ready:
        return True
    try:
        async with persist._pool.acquire() as c:
            await c.execute(
                "CREATE TABLE IF NOT EXISTS pw_dict (q TEXT PRIMARY KEY, entries JSONB NOT NULL, src TEXT, "
                "hits INTEGER NOT NULL DEFAULT 1, created DOUBLE PRECISION, updated DOUBLE PRECISION)")
            await c.execute("CREATE INDEX IF NOT EXISTS pw_dict_updated ON pw_dict (updated)")
        _table_ready = True
    except Exception as e:  # baza vaqtincha ishlamasa — xotira keshi bilan davom etamiz
        log.warning("pw_dict jadvali tayyor emas: %s", e)
    return _table_ready


async def cache_get(q: str) -> dict | None:
    k = _key(q)
    if k in _MEM:
        return _MEM[k]
    if await _ensure_table():
        try:
            async with persist._pool.acquire() as c:
                row = await c.fetchrow("UPDATE pw_dict SET hits = hits + 1 WHERE q = $1 RETURNING entries, src", k)
            if row:
                v = {"entries": json.loads(row["entries"]), "src": row["src"] or ""}
                _remember(k, v)
                return v
        except Exception as e:
            log.warning("pw_dict o'qilmadi: %s", e)
    return None


def _remember(k: str, v: dict) -> None:
    if len(_MEM) >= _MEM_MAX:
        _MEM.pop(next(iter(_MEM)))
    _MEM[k] = v


async def cache_put(q: str, entries: list, src: str) -> None:
    k = _key(q)
    _remember(k, {"entries": entries, "src": src})
    if await _ensure_table():
        now = time.time()
        try:
            async with persist._pool.acquire() as c:
                await c.execute(
                    "INSERT INTO pw_dict (q, entries, src, created, updated) VALUES ($1, $2, $3, $4, $4) "
                    "ON CONFLICT (q) DO UPDATE SET entries = EXCLUDED.entries, src = EXCLUDED.src, updated = EXCLUDED.updated",
                    k, json.dumps(entries, ensure_ascii=False), src, now)
        except Exception as e:
            log.warning("pw_dict yozilmadi: %s", e)


async def community_words(since: float = 0, limit: int = 3000) -> dict:
    """Keshdagi barcha so'zlar (ilovaning oflayn lug'atiga qo'shish uchun)."""
    out, seen, last = [], set(), since
    if await _ensure_table():
        try:
            async with persist._pool.acquire() as c:
                rows = await c.fetch("SELECT entries, updated FROM pw_dict WHERE updated > $1 ORDER BY updated LIMIT $2",
                                     float(since), int(limit))
            for r in rows:
                last = max(last, r["updated"] or 0)
                for e in json.loads(r["entries"]):
                    if e.get("ko") and e["ko"] not in seen:
                        seen.add(e["ko"]); out.append(e)
        except Exception as e:
            log.warning("pw_dict ro'yxati o'qilmadi: %s", e)
    else:
        for v in list(_MEM.values()):
            for e in v["entries"]:
                if e.get("ko") and e["ko"] not in seen:
                    seen.add(e["ko"]); out.append(e)
    return {"words": out, "until": last}


# ---------------- DeepL ----------------
def deepl_enabled() -> bool:
    return bool(config.DEEPL_API_KEY)


async def _deepl(texts: list[str], target: str, source: str | None = None) -> list[str]:
    key = config.DEEPL_API_KEY
    host = "https://api-free.deepl.com" if key.endswith(":fx") else "https://api.deepl.com"
    body = {"text": texts, "target_lang": target}
    if source:
        body["source_lang"] = source
    async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=12)) as s:
        async with s.post(host + "/v2/translate", json=body,
                          headers={"Authorization": f"DeepL-Auth-Key {key}"}) as r:
            if r.status != 200:
                raise RuntimeError(f"DeepL {r.status}: {(await r.text())[:120]}")
            data = await r.json()
    return [t.get("text", "") for t in data.get("translations", [])]


async def _deepl_three(kos: list[str]) -> list[dict]:
    """Koreyscha so'zlarni o'zbek, rus va ingliz tiliga tarjima qiladi (har biri alohida, xatoga chidamli)."""
    res = [dict() for _ in kos]

    async def one(lang: str, code: str):
        try:
            tr = await _deepl(kos, code, "KO")
            for i, t in enumerate(tr[:len(kos)]):
                res[i][lang] = t.strip()[:200]
        except Exception as e:
            log.info("DeepL %s: %s", code, e)

    await asyncio.gather(one("uz", "UZ"), one("ru", "RU"), one("en", "EN-US"))
    return res


# ---------------- Romanizatsiya (Revised Romanization + asosiy tovush o'zgarishlari) ----------------
INI=["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"]
VOW=["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"]
# final index -> (representative final sound, consonant moved on liaison (initial index) , remaining final idx after split)
# finals: 0 none,1 ㄱ,2 ㄲ,3 ㄳ,4 ㄴ,5 ㄵ,6 ㄶ,7 ㄷ,8 ㄹ,9 ㄺ,10 ㄻ,11 ㄼ,12 ㄽ,13 ㄾ,14 ㄿ,15 ㅀ,16 ㅁ,17 ㅂ,18 ㅄ,19 ㅅ,20 ㅆ,21 ㅇ,22 ㅈ,23 ㅊ,24 ㅋ,25 ㅌ,26 ㅍ,27 ㅎ
FSOUND={0:"",1:"k",2:"k",3:"k",4:"n",5:"n",6:"n",7:"t",8:"l",9:"k",10:"m",11:"l",12:"l",13:"l",14:"p",15:"l",16:"m",17:"p",18:"p",19:"t",20:"t",21:"ng",22:"t",23:"t",24:"k",25:"t",26:"p",27:"t"}
# liaison: final idx -> (kept final idx, moved initial idx)
LIA={1:(0,0),2:(0,1),3:(1,9),4:(0,2),5:(4,12),6:(0,2),7:(0,3),8:(0,5),9:(8,0),10:(8,6),11:(8,7),12:(8,9),13:(8,16),14:(8,17),15:(0,5),16:(0,6),17:(0,7),18:(17,9),19:(0,9),20:(0,10),22:(0,12),23:(0,14),24:(0,15),25:(0,16),26:(0,17),27:(0,None)}
ASP={0:15,3:16,12:14,7:17}  # ㄱ->ㅋ, ㄷ->ㅌ, ㅈ->ㅊ, ㅂ->ㅍ (initial indices)
def romanize(s):
    syl=[]
    for ch in s:
        c=ord(ch)-0xAC00
        syl.append([c//588,(c%588)//28,c%28] if 0<=c<11172 else ch)
    out=[]
    for i,x in enumerate(syl):
        if isinstance(x,str): out.append(x); continue
        ini,vow,fin=x
        nx=syl[i+1] if i+1<len(syl) and not isinstance(syl[i+1],str) else None
        fs=FSOUND[fin]
        if nx is not None and fin:
            ni=nx[0]
            if ni==11 and fin in LIA:            # 연음
                keep,mv=LIA[fin]
                fs=FSOUND[keep] if keep else ""
                if mv is not None: nx[0]=mv
            elif fin in (6,15,27) and ni in ASP:  # ㅎ + ㄱㄷㅈ -> 격음
                nx[0]=ASP[ni]; fs=FSOUND[{6:4,15:8,27:0}[fin]]
            elif ni in (2,6) and fs in ("k","t","p"): # 비음화
                fs={"k":"ng","t":"n","p":"m"}[fs]
            elif ni==5 and fs in ("n",) and fin==4:   # ㄴ+ㄹ -> ll
                fs="l"; nx[0]=5
            elif ni==5 and fs=="l":
                pass
            elif ni==2 and fs=="l":                  # ㄹ+ㄴ -> ll
                nx[0]=5
            elif ni==5 and fs in ("m","ng"):         # ㅁㅇ+ㄹ -> n
                nx[0]=2
            elif ni==5 and fs in ("k","p"):          # ㄱㅂ+ㄹ -> ngn/mn
                nx[0]=2; fs={"k":"ng","p":"m"}[fs]
        ir=INI[ini]
        # ㄹ ㄹ -> ll ; boshqa holatda bo'g'in boshidagi ㄹ 'r', so'ng 'l' bo'lsa (ll)
        if ini==5 and i>0 and not isinstance(syl[i-1],str) and out and out[-1].endswith("l"):
            ir="l"
        if fin==8 and nx is None: fs="l"
        out.append(ir+VOW[vow]+fs)
    return "".join(out)


# ---------------- Asosiy qidiruv ----------------
async def lookup(q: str, lang: str = "uz") -> dict:
    """Keshsiz qidiruv: Gemini + DeepL. Natija keshga yoziladi."""
    q = q.strip()[:80]
    entries, src = [], []
    try:
        entries = (await ai.dict_lookup(q, lang)).get("entries", [])
        if entries:
            src.append(ai.last_provider() or "ai")
    except Exception as e:
        log.info("Gemini lug'at: %s", e)

    if deepl_enabled():
        try:
            if entries:
                dl = await _deepl_three([e["ko"] for e in entries])
                for e, d in zip(entries, dl):
                    if any(d.values()):
                        e["dl"] = d
                        for k in ("uz", "ru", "en"):  # Gemini bermagan bo'sh maydonlarni to'ldiramiz
                            if not e.get(k) and d.get(k):
                                e[k] = d[k]
                src.append("deepl")
            else:
                ko = q if _KO.search(q) else ((await _deepl([q], "KO")) or [""])[0].strip()
                if ko:
                    d = (await _deepl_three([ko]))[0]
                    entries = [{"ko": ko, "rom": romanize(ko), "uz": d.get("uz", ""), "ru": d.get("ru", ""),
                                "en": d.get("en", ""), "dl": d}]
                    src.append("deepl")
        except Exception as e:
            log.info("DeepL lug'at: %s", e)

    s = "+".join(src)
    for e in entries:
        e["src"] = s
    if entries:
        await cache_put(q, entries, s)
    return {"entries": entries, "src": s}
