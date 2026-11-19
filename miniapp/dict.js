/* Hanguk Way — LUG'AT (Dictionary): koreys ↔ o'zbek / rus / ingliz.
   - Istalgan ekranda 📖 tugmasi orqali bir bosishda ochiladi.
   - Matndagi so'zni belgilasangiz (barmoq bilan bosib turing), «📖 Tarjima» tugmasi chiqadi.
   - Oflayn lug'at + ilovadagi barcha so'zlar; server ulansa, topilmagan so'z AI orqali tarjima qilinadi. */
(function () {
  var H = window.HY, K = window.Komiko, I = window.I18N;
  if (!H || !K || !I) return;
  var $ = H.$, esc = H.esc, LG = I.lang();
  function T(m, v) { return I.f(m, v); }
  var TAGS = {
    ibora: { uz: "Ibora", ru: "Фраза", en: "Phrase" }, odam: { uz: "Odamlar", ru: "Люди", en: "People" }, ish: { uz: "Ish joyi", ru: "Работа", en: "Work" },
    joy: { uz: "Joy", ru: "Место", en: "Place" }, transport: { uz: "Transport", ru: "Транспорт", en: "Transport" }, vaqt: { uz: "Vaqt", ru: "Время", en: "Time" },
    ovqat: { uz: "Ovqat", ru: "Еда", en: "Food" }, "fe'l": { uz: "Fe'l", ru: "Глагол", en: "Verb" }, sifat: { uz: "Sifat", ru: "Прилагательное", en: "Adjective" },
    tana: { uz: "Tana, sog'liq", ru: "Тело, здоровье", en: "Body, health" }, savdo: { uz: "Savdo, pul", ru: "Покупки, деньги", en: "Shopping, money" },
    tabiat: { uz: "Tabiat, ob-havo", ru: "Природа, погода", en: "Nature, weather" }, his: { uz: "His-tuyg'u", ru: "Чувства", en: "Feelings" },
    savol: { uz: "So'roq so'z", ru: "Вопросительное слово", en: "Question word" }, son: { uz: "Son", ru: "Число", en: "Number" },
    til: { uz: "Til, o'qish", ru: "Язык, учёба", en: "Language, study" }, six: { uz: "6 daqiqa koreys", ru: "6 минут корейского", en: "6-Minute Korean" },
    card: { uz: "So'z kartochkasi", ru: "Карточка слов", en: "Word card" }, ai: { uz: "AI tarjima", ru: "Перевод ИИ", en: "AI translation" },
    net: { uz: "Yangi so'zlar (AI · DeepL)", ru: "Новые слова (ИИ · DeepL)", en: "New words (AI · DeepL)" },
    zavod: { uz: "Zavod, ishlab chiqarish", ru: "Завод, производство", en: "Factory, production" },
    xavfsizlik: { uz: "Mehnat xavfsizligi", ru: "Охрана труда", en: "Work safety" },
    qishloq: { uz: "Qishloq xo'jaligi, baliqchilik", ru: "Сельское хозяйство, рыболовство", en: "Farming, fishing" },
    qurilish: { uz: "Qurilish", ru: "Строительство", en: "Construction" },
    qonun: { uz: "Mehnat qonuni, viza", ru: "Трудовое право, виза", en: "Labor law, visa" },
    idora: { uz: "Idora, hujjatlar", ru: "Офис, документы", en: "Office, documents" },
    uy: { uz: "Uy-ro'zg'or, dam olish", ru: "Быт, досуг", en: "Home, leisure" },
    oila: { uz: "Oila", ru: "Семья", en: "Family" }, kiyim: { uz: "Kiyim", ru: "Одежда", en: "Clothes" },
    rang: { uz: "Ranglar", ru: "Цвета", en: "Colors" }, ravish: { uz: "Ravish", ru: "Наречие", en: "Adverb" },
    aloqa: { uz: "Aloqa, telefon", ru: "Связь, телефон", en: "Phone, communication" }
  };

  // ---------- Lug'atni yig'ish ----------
  var DB = [], BY = {};
  function add(e) {
    var o = BY[e.ko];
    if (o) { ["rom", "uz", "ru", "en"].forEach(function (k) { if (!o[k] && e[k]) o[k] = e[k]; }); if (e.ex && !o.ex) o.ex = e.ex; if (e.use && !o.use) o.use = e.use; return; }
    BY[e.ko] = e; DB.push(e);
  }
  (window.PW_DICT_RAW || "").split("\n").forEach(function (ln) {
    var p = ln.split("|"); if (p.length < 5) return;
    add({ ko: p[0].trim(), rom: p[1], uz: p[2], ru: p[3], en: p[4], tag: p[5] || "" });
  });
  (window.PW_SIX || []).forEach(function (ep) {
    ep.words.forEach(function (w) { add({ ko: w.ko, rom: w.rom, uz: w.m.uz, ru: w.m.ru, en: w.m.en, tag: "six", ex: w.ex, use: w.use }); });
  });
  (window.PW_WORDS || []).forEach(function (w) {
    var t = I.word(w.ko, w.uz);
    add({ ko: w.ko, rom: w.rom, uz: w.uz, ru: t.ru || "", en: t.en || "", tag: "card", ex: w.ex ? [[w.ex, w.exuz || "", "", ""]] : null });
  });

  // ---------- AI va DeepL orqali qo'shilgan so'zlar (umumiy lug'at) ----------
  var NKEY = "pwDictNet", NSYNC = "pwDictNetSync";
  function netLoad() { try { return JSON.parse(localStorage.getItem(NKEY) || "[]"); } catch (e) { return []; } }
  function netSave(list) { try { localStorage.setItem(NKEY, JSON.stringify(list.slice(-4000))); } catch (e) {} }
  function slim(e) {
    var o = { ko: e.ko, rom: e.rom || "", uz: e.uz || "", ru: e.ru || "", en: e.en || "", tag: "net", src: e.src || "ai" };
    ["dl", "hanja", "pos", "level", "syn", "ant", "note_uz", "note_ru", "note_en"].forEach(function (k) { if (e[k]) o[k] = e[k]; });
    if (e.ex_ko) o.ex = [[e.ex_ko, e.ex_uz || "", e.ex_ru || "", e.ex_en || ""]]; else if (e.ex) o.ex = e.ex;
    return o;
  }
  function learn(list) {  // yangi so'zlarni lug'atga va telefonga saqlaydi
    var have = netLoad(), byKo = {}, added = 0;
    have.forEach(function (x) { byKo[x.ko] = 1; });
    list.forEach(function (e) {
      if (!e || !e.ko) return;
      var o = slim(e);
      if (!BY[o.ko]) { add(o); added++; }
      else { var x = BY[o.ko]; ["hanja", "pos", "level", "syn", "ant", "note_uz", "note_ru", "note_en", "dl"].forEach(function (k) { if (o[k] && !x[k]) x[k] = o[k]; }); if (o.ex && !x.ex) x.ex = o.ex; }
      if (!byKo[o.ko]) { byKo[o.ko] = 1; have.push(o); }
    });
    netSave(have);
    return added;
  }
  netLoad().forEach(function (e) { add(e); });
  function sync() {  // serverdagi umumiy lug'atdan yangi so'zlarni olib keladi (12 soatda bir marta)
    var st = {}; try { st = JSON.parse(localStorage.getItem(NSYNC) || "{}"); } catch (e) {}
    if (st.at && Date.now() - st.at < 12 * 3600 * 1000) return;
    H.api("/api/dict/words?since=" + (st.until || 0)).then(function (r) {
      learn(r.words || []);
      try { localStorage.setItem(NSYNC, JSON.stringify({ at: Date.now(), until: r.until || st.until || 0 })); } catch (e) {}
    }).catch(function () {});
  }

  // ---------- Qidiruv ----------
  var PARTICLES = ["에서는", "에게서", "에서", "에게", "한테", "으로", "까지", "부터", "하고", "이랑", "랑", "은", "는", "이", "가", "을", "를", "에", "도", "만", "의", "와", "과", "로", "요"];
  var ENDINGS = [["했어요", "하다"], ["해요", "하다"], ["합니다", "하다"], ["하세요", "하다"], ["했습니다", "하다"], ["해서", "하다"], ["하고", "하다"], ["하는", "하다"], ["한", "하다"], ["할", "하다"],
    ["았어요", "다"], ["었어요", "다"], ["습니다", "다"], ["세요", "다"], ["어요", "다"], ["아요", "다"], ["고", "다"], ["는", "다"], ["면", "다"], ["지만", "다"], ["어서", "다"], ["아서", "다"]];
  function norm(s) { return String(s || "").toLowerCase().replace(/[ʻʼ‘’`´]/g, "'").replace(/[«»"!?.,;:()]/g, " ").replace(/\s+/g, " ").trim(); }
  function koForms(q) {
    var f = [q];
    PARTICLES.forEach(function (p) { if (q.length > p.length && q.slice(-p.length) === p) f.push(q.slice(0, -p.length)); });
    ENDINGS.forEach(function (e) { if (q.length > e[0].length && q.slice(-e[0].length) === e[0]) f.push(q.slice(0, -e[0].length) + e[1]); });
    return f;
  }
  function search(raw) {
    var q = norm(raw); if (!q) return [];
    var res = [], isKo = /[가-힣]/.test(q);
    if (isKo) {
      var forms = koForms(q.replace(/\s/g, ""));
      DB.forEach(function (e) {
        var k = e.ko.replace(/\s/g, ""), s = 0;
        forms.forEach(function (f, i) {
          if (k === f) s = Math.max(s, i === 0 ? 100 : 92);
          else if (f.length >= 2 && k.indexOf(f) === 0) s = Math.max(s, 70);
          else if (k.length >= 2 && f.indexOf(k.replace(/다$/, "")) === 0 && k.replace(/다$/, "").length >= 1 && f.length - k.length <= 4) s = Math.max(s, 75);
          else if (f.length >= 2 && k.indexOf(f) > 0) s = Math.max(s, 45);
        });
        if (s) res.push({ e: e, s: s });
      });
    } else {
      DB.forEach(function (e) {
        var s = 0;
        [["uz", 0], ["ru", 0], ["en", 0], ["rom", -5]].forEach(function (f) {
          var v = norm(e[f[0]]); if (!v) return;
          var parts = v.split(/\s*[,;/]\s*|\s*\(\s*|\)\s*/).filter(Boolean);
          var bonus = f[0] === LG ? 3 : 0;
          if (parts.some(function (p) { return p === q; })) s = Math.max(s, 100 + bonus + f[1]);
          else if (parts.some(function (p) { return p.indexOf(q) === 0; })) s = Math.max(s, 80 + bonus + f[1]);
          else if (q.length >= 3 && v.indexOf(q) >= 0) s = Math.max(s, 50 + bonus + f[1]);
        });
        if (s) res.push({ e: e, s: s });
      });
    }
    res.sort(function (a, b) { return b.s - a.s || a.e.ko.length - b.e.ko.length; });
    return res.slice(0, 25).map(function (r) { return r.e; });
  }

  // ---------- Saqlangan va tarix ----------
  var SKEY = "pwDictSaved", RKEY = "pwDictRecent";
  function ld(k) { try { return JSON.parse(localStorage.getItem(k) || "[]"); } catch (e) { return []; } }
  function sv(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function isSaved(ko) { return ld(SKEY).some(function (x) { return x.ko === ko; }); }
  function toggleSave(e) {
    var s = ld(SKEY), i = -1;
    s.forEach(function (x, k) { if (x.ko === e.ko) i = k; });
    if (i >= 0) s.splice(i, 1); else s.unshift({ ko: e.ko, rom: e.rom, uz: e.uz, ru: e.ru, en: e.en, tag: e.tag, pos: e.pos, box: 0, due: 0, added: Date.now() });
    sv(SKEY, s.slice(0, 500));
    badge();
  }
  // ---------- Intervalli takrorlash (Leitner): 0 → darhol, keyin 1, 2, 4, 8, 16, 32 kun ----------
  var DAYS = [0, 1, 2, 4, 8, 16, 32];
  function dueList() { var now = Date.now(); return ld(SKEY).filter(function (x) { return (x.due || 0) <= now; }); }
  function grade(ko, g) {  // g: 0 — bilmadim, 1 — qiyin, 2 — bildim
    var s = ld(SKEY);
    s.forEach(function (x) {
      if (x.ko !== ko) return;
      var b = x.box || 0;
      b = g === 0 ? 0 : g === 1 ? Math.max(1, b) : Math.min(DAYS.length - 1, b + 1);
      x.box = b; x.due = Date.now() + (g === 0 ? 5 * 60 * 1000 : DAYS[b] * 864e5); x.seen = (x.seen || 0) + 1;
    });
    sv(SKEY, s); badge();
    document.dispatchEvent(new CustomEvent("pw:xp", { detail: { xp: g === 2 ? 2 : 1, why: "review" } }));
  }
  function badge() {
    var f = document.getElementById("dictFab"); if (!f) return;
    var n = dueList().length, b = f.querySelector(".fab-n");
    if (n && !b) { b = document.createElement("i"); b.className = "fab-n"; f.appendChild(b); }
    if (b) { if (n) b.textContent = n > 99 ? "99+" : n; else b.remove(); }
  }
  function remember(q) { var r = ld(RKEY).filter(function (x) { return x !== q; }); r.unshift(q); sv(RKEY, r.slice(0, 12)); }

  // ---------- Fe'l / sifat aniqlash (tuslanish jadvali uchun) ----------
  function predType(e) {
    if (!window.PWConj || !/^[가-힣]+다$/.test(e.ko || "")) return "";
    var pos = String(e.pos || "").toLowerCase();
    if (e.tag === "sifat" || /sifat|adj|прилаг/.test(pos)) return "adj";
    if (e.tag === "fe'l" || /fe.l|verb|глагол/.test(pos) || /(moq|mak)$/.test(String(e.uz || "").trim()) || /^to /.test(String(e.en || "").trim())) return "verb";
    return "";
  }
  function conjHTML(e, pt) {
    var rows = window.PWConj(e.ko, pt === "adj"); if (!rows.length) return "";
    var L = window.PWConj.LABELS;
    return '<details class="dc-conj"><summary>📐 ' + esc(T({ uz: "Tuslanish", ru: "Спряжение", en: "Conjugation" })) + ' <span class="note">' + esc(pt === "adj" ? T({ uz: "sifat", ru: "прил.", en: "adj." }) : T({ uz: "fe'l", ru: "глагол", en: "verb" })) + '</span></summary><div class="cj">' +
      rows.map(function (r) { return '<button class="cj-r" data-say="' + esc(r.form.replace(/ …$/, "")) + '"><span>' + esc(I.pick(L[r.k])) + '</span><b class="ko">' + esc(r.form) + '</b></button>'; }).join("") + '</div></details>';
  }
  var CAN_SHARE = !!navigator.share;
  // ---------- Ko'rinish ----------
  function card(e) {
    var tag = TAGS[e.tag] ? I.pick(TAGS[e.tag]) : "";
    var meta = [e.hanja ? esc(e.hanja) : "", e.pos ? esc(e.pos) : "", e.level ? "TOPIK " + esc(e.level) : ""].filter(Boolean).join(" · ");
    var h = '<div class="dc"><div class="dc-h"><span class="ko dc-ko">' + esc(e.ko) + '</span>' + (e.rom ? '<span class="note">[' + esc(e.rom) + ']</span>' : '') +
      '<span class="dc-acts"><button class="mini" data-say="' + esc(e.ko) + '" aria-label="Play">🔊</button><button class="mini" data-slow="' + esc(e.ko) + '" aria-label="Slow">🐢</button>' +
      (K.canListen() ? '<button class="mini" data-prac="' + esc(e.ko) + '" aria-label="Practice">🎙️</button>' : '') +
      (CAN_SHARE ? '<button class="mini" data-share="' + esc(e.ko) + '" aria-label="Share">↗</button>' : '') +
      '<button class="dc-star' + (isSaved(e.ko) ? " on" : "") + '" data-star="' + esc(e.ko) + '">' + (isSaved(e.ko) ? "★" : "☆") + '</button></span></div>' +
      '<div class="dc-prac" hidden></div>' +
      (meta ? '<div class="note dc-meta">' + meta + '</div>' : '') +
      '<div class="dc-m">' + I.tri({ uz: e.uz, ru: e.ru, en: e.en }) + '</div>';
    var nt = e["note_" + LG] || e.note_uz || "";
    if (nt) h += '<div class="note dc-note">💡 ' + esc(nt) + '</div>';
    var rel = (e.syn || []).map(function (w) { return '<button class="chip d-rc" data-q="' + esc(w) + '">≈ ' + esc(w) + '</button>'; })
      .concat((e.ant || []).map(function (w) { return '<button class="chip d-rc" data-q="' + esc(w) + '">↔ ' + esc(w) + '</button>'; }));
    if (rel.length) h += '<div class="dc-rel">' + rel.join("") + '</div>';
    var dl = e.dl && (e.dl[LG] || e.dl.uz || e.dl.en);
    if (dl && dl !== I.pick({ uz: e.uz, ru: e.ru, en: e.en })) h += '<div class="note dc-dl">DeepL: ' + esc(dl) + '</div>';
    var srcB = e.src ? String(e.src).split("+").map(function (x) { return x === "deepl" ? "DeepL" : x === "ai" ? "Gemini AI" : x === "claude" ? "Claude AI" : x; }).join(" · ") : "";
    if (tag) h += '<span class="dc-tag">' + esc(tag) + '</span>';
    if (srcB) h += '<span class="dc-tag dc-src">' + esc(srcB) + '</span>';
    var pt = predType(e); if (pt) h += conjHTML(e, pt);
    if (e.use) h += '<div class="sw-u">📍 ' + esc(I.pick(e.use)) + '</div>';
    if (e.ex && e.ex.length) h += '<div class="sw-ex">' + e.ex.slice(0, 2).map(function (x) {
      var EX = { uz: 1, ru: 2, en: 3 }, main = x[EX[LG]] || x[1];
      return '<div class="wx"><span class="ko"><b>' + esc(x[0]) + '</b></span> <button class="mini" data-say="' + esc(x[0]) + '">🔊</button>' + (main ? '<div>' + esc(main) + '</div>' : '') + '</div>';
    }).join("") + '</div>';
    return h + '</div>';
  }
  var aiTok = 0;
  function render(q) {
    var out = $("dRes"); if (!out) return;
    var qq = (q || "").trim();
    if (!qq) { browse(out); return; }
    var sentence = /\s/.test(qq) && qq.length > 14 || /[.?!。？]$/.test(qq);
    var r = sentence ? [] : search(qq);
    if (r.length && !K.LOCAL()) {  // oflayn natija bor, lekin batafsil (misollar, ma'nolar) uchun AI tugmasi
      out.innerHTML = r.map(card).join("") + '<button class="btn ghost d-more" id="dAi" style="width:100%;margin-top:8px">🤖 ' + esc(T({ uz: "AI bilan batafsil: barcha ma'nolar va misollar", ru: "Подробнее с ИИ: все значения и примеры", en: "More with AI: all meanings and examples" })) + '</button><div id="dNone"></div>';
      $("dAi").onclick = function () { this.remove(); aiLookup(qq, true); };
      bind(out); return;
    }
    out.innerHTML = r.length ? r.map(card).join("") : '<div class="card empty" style="padding:18px" id="dNone">🔎 ' + esc(T({ uz: "«{q}» oflayn lug'atda topilmadi.", ru: "«{q}» нет в офлайн-словаре.", en: "\"{q}\" isn't in the offline dictionary." }, { q: qq })) + '</div>';
    if (!r.length && !K.LOCAL()) aiLookup(qq);
    else if (!r.length) $("dNone").insertAdjacentHTML("beforeend", '<div class="note" style="margin-top:6px">' + esc(T({ uz: "Imloni tekshiring yoki so'zning lug'at shaklini yozing (masalan, 먹어요 → 먹다).", ru: "Проверьте написание или введите словарную форму (например, 먹어요 → 먹다).", en: "Check the spelling or type the dictionary form (e.g. 먹어요 → 먹다)." })) + '</div>');
    bind(out);
  }
  // ---------- Ro'yxat ko'rinishi: kun so'zi, mavzular, barcha so'zlar ----------
  var bw = { cat: "", n: 60 };
  function dayWord() {
    var d = new Date(), k = d.getFullYear() * 400 + d.getMonth() * 32 + d.getDate();
    var pool = DB.filter(function (e) { return e.tag !== "ibora" && e.tag !== "card" && e.tag !== "son"; });
    if (!pool.length) pool = DB;
    return pool[k % pool.length];
  }
  function meaning(e) { return I.pick({ uz: e.uz, ru: e.ru, en: e.en }); }
  function browse(out) {
    var saved = ld(SKEY), rec = ld(RKEY), dw = dayWord();
    var cats = {}; DB.forEach(function (e) { var t = e.tag || "boshqa"; cats[t] = (cats[t] || 0) + 1; });
    var list = DB.filter(function (e) { return !bw.cat || (bw.cat === "saved" ? isSaved(e.ko) : (e.tag || "boshqa") === bw.cat); });
    if (bw.cat === "saved") list = saved.map(function (x) { return BY[x.ko] || x; });
    var due = dueList().length;
    var h = '<div class="d-acts"><button class="d-act" data-act="review"><span>🔁</span><b>' + esc(T({ uz: "Takrorlash", ru: "Повторение", en: "Review" })) + '</b><small>' +
      esc(saved.length ? (due ? T({ uz: "{n} ta so'z vaqti keldi", ru: "{n} слов пора повторить", en: "{n} words due" }, { n: due }) : T({ uz: "Hozircha hammasi takrorlangan", ru: "Пока всё повторено", en: "All caught up" })) : T({ uz: "☆ bilan so'z saqlang", ru: "Сохраните слова ☆", en: "Save words with ☆" })) + '</small>' + (due ? '<i class="d-dot">' + due + '</i>' : '') + '</button>' +
      '<button class="d-act" data-act="saved"><span>⭐</span><b>' + esc(T({ uz: "Mening so'zlarim", ru: "Мои слова", en: "My words" })) + '</b><small>' + saved.length + ' ' + esc(T({ uz: "ta so'z", ru: "слов", en: "words" })) + '</small></button>' +
      '<button class="d-act" data-act="photo"><span>📷</span><b>' + esc(T({ uz: "Rasm orqali", ru: "По фото", en: "From a photo" })) + '</b><small>' + esc(T({ uz: "Menyu, belgi, kitob", ru: "Меню, вывески, книги", en: "Menus, signs, books" })) + '</small></button></div>' +
      '<div class="d-sec">📅 ' + esc(T({ uz: "Kun so'zi", ru: "Слово дня", en: "Word of the day" })) + '</div>' + card(dw);
    if (rec.length) h += '<div class="d-sec">🕘 ' + esc(T({ uz: "Oxirgi qidiruvlar", ru: "Недавние запросы", en: "Recent searches" })) + '</div><div class="d-chips">' +
      rec.map(function (r) { return '<button class="chip d-rc" data-q="' + esc(r) + '">' + esc(r) + '</button>'; }).join("") + '</div>';
    h += '<div class="d-sec">📚 ' + esc(T({ uz: "Lug'at ro'yxati", ru: "Список слов", en: "Word list" })) + ' · ' + DB.length + '</div>' +
      '<div class="d-cats"><button class="d-cat' + (!bw.cat ? " on" : "") + '" data-cat="">' + esc(T({ uz: "Hammasi", ru: "Все", en: "All" })) + ' ' + DB.length + '</button>' +
      '<button class="d-cat' + (bw.cat === "saved" ? " on" : "") + '" data-cat="saved">⭐ ' + saved.length + '</button>' +
      Object.keys(cats).sort(function (a, b) { return cats[b] - cats[a]; }).map(function (t) {
        var lbl = TAGS[t] ? I.pick(TAGS[t]) : t;
        return '<button class="d-cat' + (bw.cat === t ? " on" : "") + '" data-cat="' + esc(t) + '">' + esc(lbl) + ' ' + cats[t] + '</button>';
      }).join("") + '</div>';
    h += '<div class="d-list">' + (list.length ? list.slice(0, bw.n).map(function (e) {
      return '<button class="d-row" data-ko="' + esc(e.ko) + '"><span class="ko d-rk">' + esc(e.ko) + '</span><span class="d-rm">' + esc(meaning(e) || "") + '</span>' +
        '<span class="d-rr">' + esc(e.rom || "") + '</span></button>';
    }).join("") : '<div class="note" style="padding:8px 2px">' + esc(T({ uz: "So'z yonidagi ☆ ni bossangiz, shu yerda saqlanadi.", ru: "Нажмите ☆ рядом со словом, чтобы сохранить его.", en: "Tap ☆ next to a word to save it." })) + '</div>') + '</div>' +
      (list.length > bw.n ? '<button class="btn ghost" id="dMore" style="width:100%;margin-top:8px">' + esc(T({ uz: "Yana ko'rsatish", ru: "Показать ещё", en: "Show more" })) + ' (' + (list.length - bw.n) + ')</button>' : '');
    out.innerHTML = h;
    bind(out);
    out.querySelectorAll("[data-cat]").forEach(function (b) { b.onclick = function () { bw.cat = b.dataset.cat; bw.n = 60; browse(out); }; });
    out.querySelectorAll("[data-act]").forEach(function (b) {
      b.onclick = function () {
        var a = b.dataset.act;
        if (a === "review") { if (!ld(SKEY).length) { H.toast(T({ uz: "Avval so'z yonidagi ☆ ni bosib saqlang.", ru: "Сначала сохраните слова ☆.", en: "Save words with ☆ first." })); return; } if (!dueList().length) { H.toast(T({ uz: "Hozircha takrorlaydigan so'z yo'q 👍", ru: "Пока нечего повторять 👍", en: "Nothing due right now 👍" })); return; } rv = null; review(out); }
        else if (a === "saved") { bw.cat = "saved"; bw.n = 60; browse(out); var l = out.querySelector(".d-list"); if (l) l.scrollIntoView({ block: "start" }); }
        else if (a === "photo") photoSearch();
      };
    });
    out.querySelectorAll(".d-row").forEach(function (b) {
      b.onclick = function () {
        var e = BY[b.dataset.ko]; if (!e) return;
        var d = document.createElement("div"); d.innerHTML = card(e); var c = d.firstChild;
        b.replaceWith(c); bind(c.parentNode);
      };
    });
    var more = $("dMore"); if (more) more.onclick = function () { bw.n += 100; var st = out.scrollTop; browse(out); out.scrollTop = st; };
  }
  function aiLookup(q, append) {
    var tok = ++aiTok, box = $("dNone");
    if (box) box.insertAdjacentHTML("beforeend", '<div class="loading" style="margin-top:8px">' + K.avatar(24, "live talking") + ' ' + esc(T({ uz: "Komiko tarjima qilyapti…", ru: "Комико переводит…", en: "Komiko is translating…" })) + '</div>');
    H.api("/api/dict", { json: { q: q, lang: LG } }).then(function (r) {
      if (tok !== aiTok) return;
      var list = (r.entries || []).map(function (e) { var o = slim(e); o.tag = "ai"; searchCache[o.ko] = o; return o; });
      learn(r.entries || []);
      var html = list.length ? list.map(card).join("") : '<div class="card empty">🔎 ' + esc(T({ uz: "Topilmadi. Imloni tekshiring yoki boshqacha yozib ko'ring.", ru: "Не найдено. Проверьте написание или попробуйте иначе.", en: "Not found. Check the spelling or try another wording." })) + '</div>';
      if (append) { var nb = $("dNone"); if (nb) nb.outerHTML = '<div class="d-sec">🤖 AI</div>' + html; } else $("dRes").innerHTML = html;
      bind($("dRes"));
    }).catch(function (err) {
      if (tok !== aiTok) return;
      var b2 = $("dNone"); if (!b2) return;
      var ld = b2.querySelector(".loading"); if (ld) ld.remove();
      b2.insertAdjacentHTML("beforeend", '<div class="note" style="margin-top:6px">⚠️ ' + esc((err && err.message) || T({ uz: "Internet yoki server bilan aloqa yo'q.", ru: "Нет связи с сервером.", en: "No connection to the server." })) + '</div><button class="btn ghost" id="dRetry" style="margin-top:8px">🔁 ' + esc(T({ uz: "Qayta urinish", ru: "Повторить", en: "Retry" })) + '</button>');
      var rb = $("dRetry"); if (rb) rb.onclick = function () { render(q); };
    });
  }
  function bind(root) {
    root.querySelectorAll("[data-star]").forEach(function (b) {
      b.onclick = function () {
        var e = BY[b.dataset.star] || searchCache[b.dataset.star]; if (!e) { var c = b.closest(".dc"); e = { ko: b.dataset.star }; }
        toggleSave(e); var on = isSaved(e.ko); b.classList.toggle("on", on); b.textContent = on ? "★" : "☆"; H.haptic("sel");
      };
    });
    root.querySelectorAll(".d-rc").forEach(function (b) { b.onclick = function () { $("dQ").value = b.dataset.q; render(b.dataset.q); }; });
    root.querySelectorAll("[data-slow]").forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); K.speakSlow ? K.speakSlow(b.dataset.slow) : H.speak(b.dataset.slow); }; });
    root.querySelectorAll("[data-share]").forEach(function (b) {
      b.onclick = function () {
        var e = BY[b.dataset.share] || searchCache[b.dataset.share] || { ko: b.dataset.share };
        var txt = e.ko + (e.rom ? " [" + e.rom + "]" : "") + " — " + (meaning(e) || "") + "\n\nHanguk Way 📖";
        navigator.share({ title: e.ko, text: txt }).catch(function () {});
      };
    });
    root.querySelectorAll("[data-prac]").forEach(function (b) { b.onclick = function () { practice(b); }; });
  }
  // So'zni talaffuz qilib ko'rish: telefon tinglaydi va harfma-harf solishtiradi
  function practice(btn) {
    var ko = btn.dataset.prac, box = btn.closest(".dc").querySelector(".dc-prac");
    box.hidden = false; btn.classList.add("rec");
    box.innerHTML = '<div class="note">🎙️ ' + esc(T({ uz: "Ayting: {w}", ru: "Скажите: {w}", en: "Say: {w}" }, { w: ko })) + '</div>';
    K.listen("ko-KR").then(function (alts) {
      btn.classList.remove("rec");
      var best = null; (alts || []).forEach(function (a) { var c = K.compare(ko, a); if (!best || c.score > best.c.score) best = { a: a, c: c }; });
      if (!best) throw new Error(T({ uz: "Ovoz eshitilmadi.", ru: "Голос не распознан.", en: "No speech heard." }));
      var sc = best.c.score, col = sc >= 85 ? "var(--green)" : sc >= 60 ? "#b7791f" : "var(--red)";
      box.innerHTML = '<div class="pr-row"><b class="pr-sc" style="color:' + col + '">' + sc + '</b><span class="ko pr-w">' + best.c.marks.map(function (m) { return '<i class="' + (m.ok ? "ok" : "bad") + '">' + esc(m.ch) + '</i>'; }).join("") + '</span></div>' +
        '<div class="note">' + esc(T({ uz: "Siz aytdingiz: «{a}»", ru: "Вы сказали: «{a}»", en: "You said: \"{a}\"" }, { a: best.a })) + (sc >= 85 ? " 🎉" : " · " + esc(T({ uz: "qizil harflarni 🐢 sekin tinglab, qayta ayting", ru: "послушайте красные буквы медленно 🐢 и повторите", en: "listen slowly 🐢 to the red letters and retry" }))) + '</div>';
      if (H.pushHist) H.pushHist("speak", { overall: sc, accuracy: sc, pronunciation: sc, fluency: null, level: "dict", date: new Date().toISOString().slice(0, 10) });
    }).catch(function (e) { btn.classList.remove("rec"); box.innerHTML = '<div class="note">⚠️ ' + esc(e.message || String(e)) + '</div>'; });
  }

  // ---------- Takrorlash rejimi ----------
  var rv = null;
  function review(out) {
    var list = dueList();
    if (!rv) rv = { list: list.slice(0, 20), i: 0, ok: 0, show: false };
    if (rv.i >= rv.list.length) {
      out.innerHTML = '<div class="rv-done">🎉<h3>' + esc(T({ uz: "Takrorlash tugadi!", ru: "Повторение завершено!", en: "Review done!" })) + '</h3><p class="note">' +
        esc(T({ uz: "{n} ta so'zdan {o} tasini bildingiz. Keyingi takrorlash vaqti kelganda 📖 tugmasida raqam chiqadi.", ru: "Знали {o} из {n}. Когда придёт время, на кнопке 📖 появится число.", en: "You knew {o} of {n}. When it's time again, a number appears on the 📖 button." }, { n: rv.list.length, o: rv.ok })) + '</p>' +
        '<button class="btn" id="rvBack">' + esc(T({ uz: "Lug'atga qaytish", ru: "Вернуться в словарь", en: "Back to dictionary" })) + '</button></div>';
      if (window.Komiko && Komiko.Activity && rv.list.length) Komiko.Activity.mark("words");
      $("rvBack").onclick = function () { rv = null; bw.cat = ""; browse(out); };
      return;
    }
    var x = rv.list[rv.i], e = BY[x.ko] || x;
    out.innerHTML = '<div class="rv-top"><button class="linkbtn" id="rvX">‹ ' + esc(T({ uz: "Chiqish", ru: "Выйти", en: "Exit" })) + '</button><span class="note">' + (rv.i + 1) + ' / ' + rv.list.length + '</span></div>' +
      '<div class="rv-bar"><i style="width:' + Math.round(rv.i / rv.list.length * 100) + '%"></i></div>' +
      '<div class="rv-card' + (rv.show ? " open" : "") + '" id="rvCard"><div class="ko rv-ko">' + esc(e.ko) + '</div>' +
      (rv.show ? '<div class="note">[' + esc(e.rom || "") + ']</div><div class="rv-m">' + esc(meaning(e) || "") + '</div>' : '<div class="note">' + esc(T({ uz: "Ma'nosini eslang va bosing", ru: "Вспомните значение и нажмите", en: "Recall the meaning, then tap" })) + '</div>') + '</div>' +
      (rv.show ? '<div class="rv-btns"><button class="btn rv-b0" data-g="0">' + esc(T({ uz: "Bilmadim", ru: "Не знал", en: "Didn't know" })) + '</button><button class="btn rv-b1" data-g="1">' + esc(T({ uz: "Qiyin", ru: "Трудно", en: "Hard" })) + '</button><button class="btn rv-b2" data-g="2">' + esc(T({ uz: "Bildim", ru: "Знал", en: "Knew it" })) + '</button></div>' : '');
    H.speak(e.ko);
    $("rvX").onclick = function () { rv = null; browse(out); };
    $("rvCard").onclick = function () { if (!rv.show) { rv.show = true; review(out); } else H.speak(e.ko); };
    out.querySelectorAll("[data-g]").forEach(function (b) {
      b.onclick = function () { var g = +b.dataset.g; grade(x.ko, g); if (g === 2) rv.ok++; H.haptic && H.haptic("sel"); rv.i++; rv.show = false; review(out); };
    });
  }

  // ---------- Rasm orqali qidirish (menyu, belgi, kitob sahifasi) ----------
  function photoSearch() {
    var out = $("dRes"), D = window.PWDaftar;
    var pickP = (D && window.Capacitor && Capacitor.isNativePlatform && Capacitor.isNativePlatform()) ? D.takePhoto(false) : new Promise(function (res, rej) {
      var inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*"; inp.setAttribute("capture", "environment");
      inp.onchange = function () { var f = inp.files && inp.files[0]; if (!f) rej(new Error("cancel")); else res({ file: f, url: URL.createObjectURL(f), format: (f.type || "image/jpeg").split("/")[1] }); };
      inp.click();
    });
    pickP.then(function (ph) {
      out.innerHTML = '<div class="card" style="padding:14px"><img class="ph-th" src="' + esc(ph.url) + '" alt=""><div class="loading" style="margin-top:8px">' + K.avatar(24, "live talking") + ' ' + esc(T({ uz: "Komiko rasmdagi koreyscha matnni o'qiyapti…", ru: "Комико читает корейский текст на фото…", en: "Komiko is reading the Korean text…" })) + '</div></div>';
      var blobP = ph.file ? Promise.resolve(ph.file) : fetch(ph.url).then(function (r) { return r.blob(); });
      return blobP.then(function (b) {
        var fd = new FormData(); fd.append("image", b, "photo." + (ph.format === "png" ? "png" : "jpg")); fd.append("lang", LG);
        return H.api("/api/dict/photo", { body: fd });
      }).then(function (r) {
        var list = (r.words || []).map(function (e) { var o = slim(e); o.tag = "ai"; searchCache[o.ko] = o; return o; });
        learn(r.words || []);
        out.innerHTML = '<div class="card ph-res"><img class="ph-th" src="' + esc(ph.url) + '" alt="">' +
          (r.text ? '<div class="d-sec">📝 ' + esc(T({ uz: "Rasmdagi matn", ru: "Текст на фото", en: "Text in the photo" })) + '</div><div class="ko ph-t">' + (window.PWDict && PWDict.linkify ? PWDict.linkify(esc(r.text)) : esc(r.text)) + '</div>' : '') +
          (r.translation ? '<div class="note" style="margin-top:6px">' + esc(r.translation) + '</div>' : '') + '</div>' +
          (list.length ? '<div class="d-sec">📚 ' + esc(T({ uz: "Asosiy so'zlar", ru: "Ключевые слова", en: "Key words" })) + ' · ' + list.length + '</div>' + list.map(card).join("") : '<div class="card empty">' + esc(T({ uz: "Rasmda koreyscha matn topilmadi.", ru: "Корейский текст не найден.", en: "No Korean text found." })) + '</div>');
        bind(out); if (window.PWDict && PWDict.bind) PWDict.bind(out);
      });
    }).catch(function (e) {
      var m = D && D.camError ? D.camError(e) : String((e && e.message) || e);
      if (m && !/cancel/i.test(m)) out.innerHTML = '<div class="card empty">⚠️ ' + esc(m) + '</div>';
    });
  }
  var searchCache = {};
  var tmr = null;
  function open(q) {
    sync();
    var el = $("dict");
    if (!el) {
      el = document.createElement("div"); el.id = "dict"; el.className = "dict";
      el.innerHTML = '<div class="dict-box"><div class="dict-top"><span class="dict-t">📖 ' + esc(T({ uz: "Lug'at", ru: "Словарь", en: "Dictionary" })) + '</span>' +
        '<span class="dict-l">🇰🇷 ⇄ 🇺🇿 🇷🇺 🇬🇧</span><button class="dict-x" id="dX" aria-label="Close">✕</button></div>' +
        '<div class="dict-s"><input class="inp" id="dQ" type="search" autocomplete="off" autocapitalize="off" placeholder="' + esc(T({ uz: "So'z yozing: 사과, olma, яблоко, apple…", ru: "Введите слово: 사과, olma, яблоко, apple…", en: "Type a word: 사과, olma, яблоко, apple…" })) + '">' +
        (K.canListen() ? '<button class="dict-mic" id="dMic" aria-label="Voice">🎙️</button>' : '') + '<button class="dict-mic" id="dCam" aria-label="Photo">📷</button></div>' +
        '<div class="dict-res" id="dRes"></div></div>';
      document.body.appendChild(el);
      $("dX").onclick = close;
      $("dQ").oninput = function () { var v = this.value; clearTimeout(tmr); tmr = setTimeout(function () { render(v); }, 180); };
      $("dQ").onkeydown = function (e) { if (e.key === "Enter") { remember(this.value.trim()); this.blur(); } };
      $("dCam").onclick = function () { photoSearch(); };
      var mic = $("dMic");
      if (mic) mic.onclick = function () {
        mic.classList.add("rec");
        K.listen("ko-KR").then(function (v) { mic.classList.remove("rec"); $("dQ").value = v[0]; render(v[0]); remember(v[0]); })
          .catch(function (e) { mic.classList.remove("rec"); H.toast(e.message); });
      };
    }
    el.hidden = false; document.body.classList.add("dict-open");
    requestAnimationFrame(function () { el.classList.add("on"); });
    var inp = $("dQ"); inp.value = q || ""; render(inp.value);
    if (q) remember(q); else setTimeout(function () { try { inp.focus(); } catch (e) {} }, 250);
  }
  function close() {
    var el = $("dict"); if (!el) return;
    el.classList.remove("on"); document.body.classList.remove("dict-open");
    setTimeout(function () { el.hidden = true; }, 250);
  }

  // ---------- Har doim ko'rinadigan 📖 tugmasi ----------
  var fab = document.createElement("button");
  fab.className = "dict-fab"; fab.id = "dictFab"; fab.setAttribute("aria-label", "Dictionary");
  fab.innerHTML = '📖<span>' + esc(T({ uz: "Lug'at", ru: "Словарь", en: "Dict" })) + '</span>';
  fab.onclick = function () { open(""); };
  document.body.appendChild(fab);
  setTimeout(badge, 0);

  // ---------- Matnni belgilab tarjima qilish ----------
  var pick = document.createElement("button");
  pick.className = "dict-pick"; pick.hidden = true;
  document.body.appendChild(pick);
  var selT = null;
  document.addEventListener("selectionchange", function () {
    clearTimeout(selT);
    selT = setTimeout(function () {
      var s = String(window.getSelection ? window.getSelection() : "").trim();
      if (s && s.length <= 30 && /[가-힣a-zA-Zа-яА-ЯёЁ']/.test(s) && !document.body.classList.contains("dict-open")) {
        pick.textContent = "📖 «" + s + "» — " + T({ uz: "tarjima", ru: "перевод", en: "translate" });
        pick.dataset.q = s; pick.hidden = false;
      } else pick.hidden = true;
    }, 350);
  });
  pick.onclick = function () { var q = pick.dataset.q; pick.hidden = true; try { window.getSelection().removeAllRanges(); } catch (e) {} open(q); };

  // ---------- Komiko va suhbat uchun: «X nima degani?» savollariga lug'atdan javob ----------
  var ASK = [
    /^(?:tarjima(?: qil(?:ing)?)?|translate|переведи(?:те)?|перевод)\s*[:\-]?\s*(.+)$/i,
    /^(.+?)\s+(?:so'zi(?:ning)?\s+)?(?:nima\s+degani|degani\s+nima|ma'nosi(?:\s+nima)?|ning\s+ma'nosi)\??$/i,
    /^(.+?)\s+(?:koreyscha|koreys\s+tilida)\s+(?:qanday|nima)(?:\s+bo'ladi|\s+deyiladi|\s+aytiladi)?\??$/i,
    /^(?:koreyscha|koreys\s+tilida)\s+(.+?)\s+(?:qanday|nima)(?:\s+bo'ladi|\s+deyiladi)?\??$/i,
    /^(?:что\s+(?:значит|означает)|как\s+переводится)\s+(.+?)\??$/i,
    /^как\s+(?:сказать|будет)\s+(?:по-корейски\s+)?(.+?)(?:\s+по-корейски)?\??$/i,
    /^(.+?)\s+по-корейски\??$/i,
    /^what\s+does\s+(.+?)\s+mean\??$/i,
    /^how\s+(?:do\s+(?:you|i)\s+|to\s+)say\s+(.+?)(?:\s+in\s+korean)?\??$/i,
    /^(.+?)\s+in\s+korean\??$/i,
    /^(.+?)(?:이|가)?\s*(?:무슨\s+뜻이에요|뜻이\s+뭐예요|뜻이\s+뭐야|무슨\s+뜻)\??$/
  ];
  function askTerm(text) {
    var t = String(text || "").trim().replace(/[ʻʼ‘’`´]/g, "'");
    for (var i = 0; i < ASK.length; i++) {
      var m = t.match(ASK[i]);
      if (m && m[1]) {
        var w = m[1].replace(/^[«"“'„]+|[»"”'?.!]+$/g, "").trim();
        if (w && w.length <= 60) return w;
      }
    }
    return null;
  }
  // Savolga lug'atdan javob: {html} yoki null (lug'at savoli emas)
  function answer(text) {
    var term = askTerm(text);
    if (!term) return null;
    var r = search(term).slice(0, 2);
    var head = '<div class="note" style="margin-bottom:6px">📖 ' + esc(T({ uz: "Lug'atdan: «{w}»", ru: "Из словаря: «{w}»", en: "From the dictionary: \"{w}\"" }, { w: term })) + '</div>';
    if (r.length) return Promise.resolve({ term: term, html: head + r.map(card).join(""), entries: r });
    if (K.LOCAL()) return Promise.resolve({ term: term, html: head + '<div class="note">' + esc(T({ uz: "Oflayn lug'atda yo'q. Internet ulanganda AI tarjima qiladi.", ru: "Нет в офлайн-словаре. При подключении к интернету переведёт ИИ.", en: "Not in the offline dictionary. With internet, AI will translate it." })) + '</div>', entries: [] });
    return H.api("/api/dict", { json: { q: term, lang: LG } }).then(function (res) {
      var list = (res.entries || []).map(function (e) { var o = slim(e); o.tag = "ai"; return o; });
      learn(res.entries || []);
      return { term: term, entries: list, html: head + (list.length ? list.map(card).join("") : '<div class="note">' + esc(T({ uz: "Topilmadi.", ru: "Не найдено.", en: "Not found." })) + '</div>') };
    });
  }
  // Koreyscha so'zlarni bosiladigan qiladi (bosilganda lug'at ochiladi). Kirish: allaqachon esc() qilingan matn
  function linkify(escaped) {
    return String(escaped).replace(/[가-힣]+/g, function (w) { return '<span class="kw" data-kw="' + w + '">' + w + '</span>'; });
  }
  document.addEventListener("click", function (ev) {
    var k = ev.target && ev.target.closest && ev.target.closest(".kw");
    if (!k) return;
    ev.preventDefault(); ev.stopPropagation();
    open(k.dataset.kw);
  }, true);

  window.PWDict = { open: open, close: close, search: search, answer: answer, askTerm: askTerm, linkify: linkify, card: card, bind: function (r) { bind(r); },
    size: function () { return DB.length; } };
})();
