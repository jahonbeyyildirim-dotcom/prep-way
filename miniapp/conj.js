/* Hanguk Way — koreys fe'l va sifatlarini tuslash (internetsiz).
   Muntazam va noto'g'ri tuslanadigan (ㅂ, ㄷ, ㅅ, 르, ㅎ, 으, ㄹ, 하다) so'zlar.
   window.PWConj(word, isAdj) → [{k, form}] ; k — shakl kaliti (label LABELS da). */
(function () {
  var B = 0xAC00;
  function dec(ch) { var c = ch.charCodeAt(0) - B; if (c < 0 || c > 11171) return null; return { l: Math.floor(c / 588), v: Math.floor((c % 588) / 28), t: c % 28 }; }
  function enc(l, v, t) { return String.fromCharCode(B + l * 588 + v * 28 + (t || 0)); }
  function last(s) { return s.charAt(s.length - 1); }
  function init(s) { return s.slice(0, -1); }
  function setT(s, t) { var d = dec(last(s)); return init(s) + enc(d.l, d.v, t); }
  // batchim kodlari
  var T_N = 4, T_L = 8, T_B = 17, T_S = 19, T_SS = 20, T_D = 7, T_H = 27;
  var V = { A: 0, AE: 1, YA: 2, EO: 4, E: 5, YEO: 6, O: 8, WA: 9, WAE: 10, OE: 11, U: 13, WO: 14, WI: 16, EU: 18, UI: 19, I: 20 };

  var B_REG = ["입", "잡", "좁", "씹", "접", "업", "뽑", "집", "굽히"]; // ㅂ muntazam
  var D_IRR = ["듣", "걷", "묻", "싣", "깨닫", "붇", "일컫"];             // ㄷ noto'g'ri
  var S_IRR = ["낫", "짓", "붓", "잇", "젓", "긋"];                      // ㅅ noto'g'ri
  var H_REG = ["좋", "놓", "넣", "낳", "닿", "쌓", "많", "괜찮", "싫", "않", "끊"]; // ㅎ muntazam
  var REU_REG = ["따르", "치르", "들르", "다다르"];                      // 르 → 으 tushadi
  function endsWith(stem, list) { return list.some(function (x) { return stem === x || stem.slice(-x.length) === x; }); }

  function kind(stem) {
    var d = dec(last(stem)); if (!d) return "x";
    if (last(stem) === "하") return "ha";
    if (d.t === T_B && !endsWith(stem, B_REG)) return "b";
    if (d.t === T_D && endsWith(stem, D_IRR)) return "d";
    if (d.t === T_S && endsWith(stem, S_IRR)) return "s";
    if (d.t === T_H && !endsWith(stem, H_REG)) return "h";
    if (d.t === T_L) return "l";
    if (last(stem) === "르" && stem.length >= 2 && !endsWith(stem, REU_REG)) return "reu";
    if (d.v === V.EU && d.t === 0) return "eu";
    return "reg";
  }
  function bright(stem) {  // oxirgi (yoki undan oldingi) bo'g'in unlisi ㅏ/ㅗ mi
    var d = dec(last(stem));
    return d && (d.v === V.A || d.v === V.O || d.v === V.YA);
  }

  // -아/어 shakli (해요, 먹어, 가 …)
  function aForm(stem) {
    var k = kind(stem), d = dec(last(stem));
    if (k === "ha") return init(stem) + "해";
    if (k === "b") {  // 돕다, 곱다 → 와; qolganlari → 워
      var base = setT(stem, 0);
      return base + ((stem === "돕" || stem === "곱") ? "와" : "워");
    }
    if (k === "d") return setT(stem, T_L) + (bright(stem) ? "아" : "어");
    if (k === "s") return setT(stem, 0) + (bright(stem) ? "아" : "어");
    if (k === "h") return init(stem) + enc(d.l, d.v === V.YA ? 3 : V.AE, 0);  // 하얗 → 하얘, 그렇 → 그래
    if (k === "reu") {
      var pre = init(stem), pd = dec(last(pre));
      return setT(pre, T_L) + (pd && (pd.v === V.A || pd.v === V.O) ? "라" : "러");
    }
    if (k === "eu") {
      if (stem.length === 1) return enc(d.l, V.EO, 0);
      var p2 = dec(last(init(stem)));
      return init(stem) + enc(d.l, p2 && (p2.v === V.A || p2.v === V.O) ? V.A : V.EO, 0);
    }
    if (d.t) return stem + (bright(stem) ? "아" : "어");
    switch (d.v) {
      case V.A: case V.EO: case V.AE: case V.E: case V.YEO: case V.WAE: return stem;
      case V.O: return init(stem) + enc(d.l, V.WA, 0);
      case V.U: return init(stem) + enc(d.l, V.WO, 0);
      case V.I: return init(stem) + enc(d.l, V.YEO, 0);
      case V.OE: return init(stem) + enc(d.l, V.WAE, 0);
      default: return stem + "어";
    }
  }
  // -(으) qo'shimchalari uchun asos: {base, vowel} — vowel=true bo'lsa -면, -세요; aks holda -으면
  function euBase(stem) {
    var k = kind(stem), d = dec(last(stem));
    if (k === "b") return { base: setT(stem, 0) + "우", vowel: true };
    if (k === "d") return { base: setT(stem, T_L), vowel: false };
    if (k === "s") return { base: setT(stem, 0), vowel: false, keepEu: true };
    if (k === "h") return { base: setT(stem, 0), vowel: true };
    if (k === "l") return { base: stem, vowel: true, l: true };
    return { base: stem, vowel: !d.t };
  }
  function withEu(stem, vow, cons) {  // vow: unlidan keyingi qo'shimcha ("면"), cons: "으면"
    var b = euBase(stem);
    if (b.vowel) return b.base + vow;
    return b.base + cons;
  }
  function withBatchim(stem, t, consTail) {  // -ㄴ, -ㄹ: unliga batchim sifatida qo'shiladi
    var b = euBase(stem);
    if (b.l) return (t === T_N ? setT(stem, T_N) : stem);
    if (b.vowel) return setT(b.base, t);
    return b.base + consTail;
  }
  function formal(stem) {
    var k = kind(stem), d = dec(last(stem));
    if (k === "l") return setT(stem, T_B) + "니다";
    if (!d.t) return setT(stem, T_B) + "니다";
    return stem + "습니다";
  }
  function past(a) { return setT(a, T_SS) + "어요"; }

  function conj(word, isAdj) {
    word = String(word || "").trim();
    if (!/^[가-힣]+다$/.test(word) || word.length < 2 || word === "이다") return [];
    var stem = word.slice(0, -1), a = aForm(stem), k = kind(stem), out = [];
    function add(key, form) { out.push({ k: key, form: form }); }
    var verbNoun = !isAdj && k === "ha" && stem.length > 1 && !/(깨끗|조용|따뜻|피곤|행복|간단|편|불편|친절|유명|중요|필요|복잡|건강|심심|똑똑|약)하$/.test(stem);
    add("pres", a + "요");
    add("formal", formal(stem));
    add("past", past(a));
    add("fut", withBatchim(stem, T_L, "을") + " 거예요");
    add("neg", word === "있다" ? "없어요" : word === "알다" ? "몰라요" : verbNoun ? init(stem) + " 안 해요" : "안 " + a + "요");
    if (!isAdj) {
      add("please", withEu(stem, "세요", "으세요"));
      add("want", stem + "고 싶어요");
    }
    add("if", withEu(stem, "면", "으면"));
    add("so", a + "서");
    add("but", stem + "지만");
    add("and", stem + "고");
    if (isAdj) add("modA", withBatchim(stem, T_N, "은") + " …");
    else {
      add("modN", (k === "l" ? setT(stem, 0) : stem) + "는 …");
      if (word !== "있다" && word !== "없다") add("modP", withBatchim(stem, T_N, "은") + " …");
    }
    add("modF", withBatchim(stem, T_L, "을") + " …");
    return out;
  }
  // -(으)세요 uchun ㄹ o'zakda ㄹ tushadi: 살다 → 사세요
  var _withEu = withEu;
  withEu = function (stem, vow, cons) {
    if (kind(stem) === "l" && vow === "세요") return setT(stem, 0) + "세요";
    return _withEu(stem, vow, cons);
  };

  var LABELS = {
    pres: { uz: "Hozirgi (muloyim)", ru: "Настоящее (вежл.)", en: "Present (polite)" },
    formal: { uz: "Hozirgi (rasmiy)", ru: "Настоящее (офиц.)", en: "Present (formal)" },
    past: { uz: "O'tgan zamon", ru: "Прошедшее", en: "Past" },
    fut: { uz: "Kelasi zamon", ru: "Будущее", en: "Future" },
    neg: { uz: "Inkor", ru: "Отрицание", en: "Negative" },
    please: { uz: "Iltimos qilish", ru: "Просьба", en: "Please do" },
    want: { uz: "Istak", ru: "Желание", en: "Want to" },
    "if": { uz: "Shart (agar)", ru: "Условие (если)", en: "If" },
    so: { uz: "Sabab / ketma-ketlik", ru: "Причина / после", en: "So / and then" },
    but: { uz: "Lekin", ru: "Но", en: "But" },
    and: { uz: "Va", ru: "И", en: "And" },
    modN: { uz: "Sifatdosh (hozirgi)", ru: "Причастие (наст.)", en: "Modifier (present)" },
    modP: { uz: "Sifatdosh (o'tgan)", ru: "Причастие (прош.)", en: "Modifier (past)" },
    modA: { uz: "Ot oldidan", ru: "Перед сущ.", en: "Before a noun" },
    modF: { uz: "Sifatdosh (kelasi)", ru: "Причастие (буд.)", en: "Modifier (future)" }
  };
  window.PWConj = conj;
  window.PWConj.LABELS = LABELS;
  window.PWConj.kind = function (w) { return /다$/.test(w) ? kind(w.slice(0, -1)) : ""; };
})();
