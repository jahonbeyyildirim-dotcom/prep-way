/* Hanguk Way — Grammatika kartochkalari (1–6-daraja): ag'dariladigan kartalar, intervalli takrorlash va mini test. */
(function () {
  var H = window.HY, K = window.Komiko, I = window.I18N;
  if (!H || !K) return;
  var esc = H.esc, $ = H.$;
  function T(o, v) { return I ? I.f(o, v) : o.uz; }
  function ld(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function sv(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function all() { return (window.PW_GRAM1 || []).concat((window.PWWrite && PWWrite.GRAM) || []); }
  function mean(g) { var l = I ? I.lang() : "uz"; return l === "ru" ? g[3] : l === "en" ? g[4] : g[2]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var SKEY = "pwGramSRS", DAYS = [0, 1, 2, 4, 8, 16, 32];
  var st = { lv: 0, mode: "cards", i: 0, flip: false, deck: [], quiz: null };
  function srs() { return ld(SKEY, {}); }
  function due() { var s = srs(), now = Date.now(); return all().filter(function (g) { return s[g[0]] && s[g[0]].due <= now; }); }
  function grade(p, g) {
    var s = srs(), x = s[p] || { box: 0, due: 0 }, b = x.box;
    b = g === 0 ? 0 : g === 1 ? Math.max(1, b) : Math.min(DAYS.length - 1, b + 1);
    s[p] = { box: b, due: Date.now() + (g === 0 ? 5 * 60000 : DAYS[b] * 864e5) }; sv(SKEY, s);
    document.dispatchEvent(new CustomEvent("pw:xp", { detail: { xp: g === 2 ? 2 : 1, why: "review" } }));
  }
  function defLv() { var p = K.Profile.get(), l = p ? (p.level | 0) : 1; return l <= 1 ? 1 : l === 2 ? 2 : l === 3 ? 3 : 5; }
  function learned(lv) { var s = srs(); return all().filter(function (g) { return g[1] === lv && s[g[0]] && s[g[0]].box >= 2; }).length; }

  function view() {
    var v = $("v-gcards"); if (!v) return;
    if (!st.lv) st.lv = defLv();
    var lvs = [1, 2, 3, 4, 5, 6], d = due().length;
    v.innerHTML = '<div class="rl-top"><button class="linkbtn" data-go="home">‹ ' + esc(T({ uz: "Orqaga", ru: "Назад", en: "Back" })) + '</button></div>' +
      '<h2 style="margin:4px 0 2px">📘 ' + esc(T({ uz: "Grammatika kartochkalari", ru: "Карточки грамматики", en: "Grammar cards" })) + '</h2>' +
      '<p class="note" style="margin:0 0 10px">' + esc(T({ uz: "{n} ta shakl: TOPIK 1–6. Kartani bosing — ma'nosi va misol ochiladi.", ru: "{n} конструкций, TOPIK 1–6. Нажмите на карточку — откроется значение и пример.", en: "{n} patterns, TOPIK 1–6. Tap a card to see the meaning and an example." }, { n: all().length })) + '</p>' +
      '<div class="gc-seg"><button data-m="cards" class="' + (st.mode === "cards" ? "on" : "") + '">🃏 ' + esc(T({ uz: "Kartalar", ru: "Карточки", en: "Cards" })) + '</button>' +
      '<button data-m="review" class="' + (st.mode === "review" ? "on" : "") + '">🔁 ' + esc(T({ uz: "Takrorlash", ru: "Повторение", en: "Review" })) + (d ? ' <i class="gc-n">' + d + '</i>' : '') + '</button>' +
      '<button data-m="quiz" class="' + (st.mode === "quiz" ? "on" : "") + '">✅ ' + esc(T({ uz: "Test", ru: "Тест", en: "Quiz" })) + '</button></div>' +
      (st.mode !== "review" ? '<div class="filters gc-lv">' + lvs.map(function (l) { return '<button data-l="' + l + '" class="' + (st.lv === l ? "on" : "") + '">' + l + '</button>'; }).join("") + '</div>' : '') +
      '<div id="gcBody"></div>';
    v.querySelectorAll("[data-m]").forEach(function (b) { b.onclick = function () { st.mode = b.dataset.m; st.i = 0; st.flip = false; st.quiz = null; st.deck = []; view(); }; });
    v.querySelectorAll(".gc-lv [data-l]").forEach(function (b) { b.onclick = function () { st.lv = +b.dataset.l; st.i = 0; st.flip = false; st.quiz = null; st.deck = []; view(); }; });
    if (st.mode === "quiz") quiz(); else cards();
  }
  function cards() {
    var body = $("gcBody"), review = st.mode === "review";
    if (!st.deck.length) st.deck = review ? shuffle(due()) : all().filter(function (g) { return g[1] === st.lv; });
    if (!st.deck.length) {
      body.innerHTML = '<div class="card empty">' + esc(review ? T({ uz: "Hozircha takrorlaydigan shakl yo'q 👍 Kartalarni o'rganing — ular shu yerga keladi.", ru: "Пока нечего повторять 👍 Изучайте карточки — они появятся здесь.", en: "Nothing due 👍 Study cards and they'll show up here." }) : T({ uz: "Bu darajada kartalar yo'q.", ru: "Нет карточек этого уровня.", en: "No cards for this level." })) + '</div>';
      return;
    }
    if (st.i >= st.deck.length) {
      body.innerHTML = '<div class="rv-done">🎉<h3>' + esc(T({ uz: "Barakalla!", ru: "Молодец!", en: "Well done!" })) + '</h3><p class="note">' +
        esc(review ? T({ uz: "Takrorlash tugadi.", ru: "Повторение завершено.", en: "Review complete." }) : T({ uz: "{l}-daraja: {k} / {n} shakl o'rganildi.", ru: "Уровень {l}: изучено {k} из {n}.", en: "Level {l}: {k} of {n} learned." }, { l: st.lv, k: learned(st.lv), n: st.deck.length })) + '</p>' +
        '<button class="btn" id="gcAgain">🔁 ' + esc(T({ uz: "Yana bir bor", ru: "Ещё раз", en: "Again" })) + '</button> <button class="btn ghost" id="gcQuiz">✅ ' + esc(T({ uz: "Test", ru: "Тест", en: "Quiz" })) + '</button></div>';
      K.Activity.mark("gram");
      $("gcAgain").onclick = function () { st.i = 0; st.deck = []; view(); };
      $("gcQuiz").onclick = function () { st.mode = "quiz"; st.quiz = null; view(); };
      return;
    }
    var g = st.deck[st.i], s = srs()[g[0]], box = s ? s.box : -1;
    body.innerHTML = '<div class="rv-top"><span class="note">' + (st.i + 1) + ' / ' + st.deck.length + '</span><span class="note">' + (box >= 2 ? "✅ " + esc(T({ uz: "o'rganilgan", ru: "изучено", en: "learned" })) : box >= 0 ? "📖 " + esc(T({ uz: "o'rganilmoqda", ru: "изучается", en: "learning" })) : "🆕") + '</span></div>' +
      '<div class="rv-bar"><i style="width:' + Math.round(st.i / st.deck.length * 100) + '%"></i></div>' +
      '<div class="gc-card' + (st.flip ? " flip" : "") + '" id="gcCard"><span class="gc-lvb">TOPIK ' + g[1] + '</span>' +
        '<div class="ko gc-p">' + esc(g[0]) + '</div>' +
        (st.flip ? '<div class="gc-m">' + esc(mean(g)) + '</div><div class="gc-ex"><span class="ko">' + esc(g[5]) + '</span> <button class="mini" data-say="' + esc(g[5]) + '">🔊</button><small>' + esc(g[6]) + '</small></div>'
          : '<div class="note">' + esc(T({ uz: "Ma'nosini eslang va bosing", ru: "Вспомните значение и нажмите", en: "Recall the meaning, then tap" })) + '</div>') + '</div>' +
      (st.flip ? '<div class="rv-btns"><button class="btn rv-b0" data-g="0">' + esc(T({ uz: "Bilmadim", ru: "Не знал", en: "Didn't know" })) + '</button><button class="btn rv-b1" data-g="1">' + esc(T({ uz: "Qiyin", ru: "Трудно", en: "Hard" })) + '</button><button class="btn rv-b2" data-g="2">' + esc(T({ uz: "Bildim", ru: "Знал", en: "Knew it" })) + '</button></div>'
        : '<div class="gc-nav"><button class="btn ghost" id="gcPrev"' + (st.i ? '' : ' disabled') + '>←</button><button class="btn ghost" id="gcSkip">→</button></div>');
    $("gcCard").onclick = function (e) { if (e.target.closest("[data-say]")) return; if (!st.flip) { st.flip = true; cards(); H.speak(g[5]); } };
    body.querySelectorAll("[data-g]").forEach(function (b) { b.onclick = function () { grade(g[0], +b.dataset.g); st.i++; st.flip = false; cards(); }; });
    if ($("gcPrev")) $("gcPrev").onclick = function () { if (st.i) { st.i--; cards(); } };
    if ($("gcSkip")) $("gcSkip").onclick = function () { st.i++; cards(); };
  }
  function quiz() {
    var body = $("gcBody"), pool = all().filter(function (g) { return g[1] === st.lv; });
    if (pool.length < 4) pool = all().filter(function (g) { return Math.abs(g[1] - st.lv) <= 1; });
    if (!st.quiz) {
      st.quiz = { qs: shuffle(pool).slice(0, 10).map(function (g) {
        var type = Math.random() < 0.5 ? "m2p" : "e2m", others = shuffle(pool.filter(function (x) { return x[0] !== g[0]; })).slice(0, 3);
        var opts = shuffle([g].concat(others));
        return { g: g, type: type, opts: opts, a: opts.indexOf(g) };
      }), i: 0, ok: 0, picked: -1 };
    }
    var Q = st.quiz;
    if (Q.i >= Q.qs.length) {
      var pct = Math.round(Q.ok / Q.qs.length * 100);
      body.innerHTML = '<div class="rv-done">' + (pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚") + '<h3>' + Q.ok + ' / ' + Q.qs.length + '</h3><p class="note">' +
        esc(pct >= 80 ? T({ uz: "Ajoyib! Keyingi darajaga o'tishingiz mumkin.", ru: "Отлично! Можно переходить дальше.", en: "Excellent! Ready for the next level." }) : T({ uz: "Xato qilgan shakllar takrorlashga qo'shildi.", ru: "Ошибочные конструкции добавлены в повторение.", en: "Missed patterns were added to review." })) + '</p>' +
        '<button class="btn" id="gcRe">🔁 ' + esc(T({ uz: "Yangi test", ru: "Новый тест", en: "New quiz" })) + '</button></div>';
      document.dispatchEvent(new CustomEvent("pw:xp", { detail: { xp: 5 + Q.ok, why: "gramquiz" } }));
      K.Activity.mark("gram");
      $("gcRe").onclick = function () { st.quiz = null; quiz(); };
      return;
    }
    var q = Q.qs[Q.i], ans = Q.picked >= 0;
    var prompt = q.type === "m2p" ? '<div class="gc-qt">' + esc(T({ uz: "Qaysi shakl shu ma'noni beradi?", ru: "Какая конструкция имеет это значение?", en: "Which pattern means this?" })) + '</div><div class="gc-qm">' + esc(mean(q.g)) + '</div>'
      : '<div class="gc-qt">' + esc(T({ uz: "Gapdagi grammatika nimani bildiradi?", ru: "Что означает грамматика в предложении?", en: "What does the grammar in this sentence mean?" })) + '</div><div class="gc-qm ko">' + esc(q.g[5]) + ' <button class="mini" data-say="' + esc(q.g[5]) + '">🔊</button></div><div class="note">' + esc(q.g[0]) + '</div>';
    body.innerHTML = '<div class="rv-top"><span class="note">' + (Q.i + 1) + ' / ' + Q.qs.length + '</span><span class="note">✅ ' + Q.ok + '</span></div><div class="rv-bar"><i style="width:' + Math.round(Q.i / Q.qs.length * 100) + '%"></i></div>' +
      '<div class="card">' + prompt + '<div class="gc-opts">' + q.opts.map(function (o, k) {
        var cls = !ans ? "" : k === q.a ? " ok" : k === Q.picked ? " bad" : "";
        return '<button class="opt' + cls + '" data-k="' + k + '"' + (ans ? " disabled" : "") + '><span class="' + (q.type === "m2p" ? "ko" : "") + '">' + esc(q.type === "m2p" ? o[0] : mean(o)) + '</span></button>';
      }).join("") + '</div>' + (ans ? '<div class="exp" style="margin-top:10px"><b class="ko">' + esc(q.g[0]) + '</b> — ' + esc(mean(q.g)) + '<br><span class="ko">' + esc(q.g[5]) + '</span><br><small>' + esc(q.g[6]) + '</small></div><button class="btn" id="gcNext" style="width:100%;margin-top:10px">' + esc(T({ uz: "Keyingi", ru: "Далее", en: "Next" })) + ' →</button>' : '') + '</div>';
    body.querySelectorAll("[data-k]").forEach(function (b) {
      b.onclick = function () {
        Q.picked = +b.dataset.k; var ok = Q.picked === q.a; if (ok) Q.ok++;
        if (!ok) { var s = srs(); s[q.g[0]] = { box: 0, due: Date.now() }; sv(SKEY, s); }
        H.haptic && H.haptic("note", ok ? "success" : "error"); quiz();
      };
    });
    if ($("gcNext")) $("gcNext").onclick = function () { Q.i++; Q.picked = -1; quiz(); };
  }

  var prevOnView = H.onView;
  H.onView = function (v) { if (prevOnView) prevOnView(v); if (v === "gcards") view(); };
  window.PWGCards = { due: function () { return due().length; }, open: function (lv) { if (lv) st.lv = lv; H.go("gcards"); } };
})();
