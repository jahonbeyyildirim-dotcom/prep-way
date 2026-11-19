/* Hanguk Way — darajali qisqa hikoyalar: gapma-gap audio, so'zni bosib lug'at, tarjima, tushunish savollari. */
(function () {
  var H = window.HY, K = window.Komiko, I = window.I18N, S = window.PW_STORIES || [];
  if (!H || !K || !S.length) return;
  var esc = H.esc, $ = H.$;
  function T(o, v) { return I ? I.f(o, v) : o.uz; }
  function pick(o) { return I ? I.pick(o) : o.uz; }
  function ld(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function sv(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var DKEY = "pwStories", st = { lv: 0, cur: null, tr: false, play: 0, ans: {} };
  function lvl() { var p = K.Profile.get(); return p ? (p.level | 0) : 1; }
  function defLv() { var l = lvl(); return l <= 1 ? 1 : l === 2 ? 2 : l === 3 ? 3 : 4; }
  function linkify(s) { return window.PWDict && PWDict.linkify ? PWDict.linkify(esc(s)) : esc(s); }

  function list() {
    var v = $("v-stories"); st.cur = null; stop();
    if (!st.lv) st.lv = 0;
    var done = ld(DKEY, {}), rec = defLv();
    var items = S.filter(function (s) { return !st.lv || s.lv === st.lv; });
    v.innerHTML = '<div class="rl-top"><button class="linkbtn" data-go="home">‹ ' + esc(T({ uz: "Orqaga", ru: "Назад", en: "Back" })) + '</button></div>' +
      '<h2 style="margin:4px 0 2px">📖 ' + esc(T({ uz: "Darajali hikoyalar", ru: "Рассказы по уровням", en: "Graded stories" })) + '</h2>' +
      '<p class="note" style="margin:0 0 10px">' + esc(T({ uz: "O'qing va tinglang. Notanish so'zni bosing — lug'at ochiladi. Oxirida 3 ta savol.", ru: "Читайте и слушайте. Нажмите на незнакомое слово — откроется словарь. В конце 3 вопроса.", en: "Read and listen. Tap any word for the dictionary. Three questions at the end." })) + '</p>' +
      '<div class="filters">' + [0, 1, 2, 3, 4, 5, 6].map(function (l) { return '<button data-sl="' + l + '" class="' + (st.lv === l ? "on" : "") + '">' + (l ? "TOPIK " + l : esc(T({ uz: "Hammasi", ru: "Все", en: "All" }))) + '</button>'; }).join("") + '</div>' +
      '<div class="rl" style="margin-top:10px">' + items.map(function (s) {
        var d = done[s.id];
        return '<button class="rl-c" data-sid="' + s.id + '"><span class="rl-i">' + s.i + '</span><span class="rl-t"><b>' + esc(pick(s.t)) + '</b><small><span class="ko">' + esc(s.ko) + '</span> · TOPIK ' + s.lv + ' · ' + s.s.length + ' ' + esc(T({ uz: "gap", ru: "предл.", en: "sentences" })) +
          (s.lv === rec ? ' · <em>' + esc(T({ uz: "sizga mos", ru: "для вас", en: "for you" })) + '</em>' : '') + '</small></span><span class="st-d' + (d ? " on" : "") + '">' + (d ? "✓ " + d + "/3" : "›") + '</span></button>';
      }).join("") + '</div>';
    v.querySelectorAll("[data-sl]").forEach(function (b) { b.onclick = function () { st.lv = +b.dataset.sl; list(); }; });
    v.querySelectorAll("[data-sid]").forEach(function (b) { b.onclick = function () { open(b.dataset.sid); }; });
  }
  function open(id) {
    var s = S.filter(function (x) { return x.id === id; })[0]; if (!s) return;
    st.cur = s; st.ans = {}; st.tr = lvl() <= 1;
    render(); window.scrollTo(0, 0);
  }
  function render() {
    var s = st.cur, v = $("v-stories");
    v.innerHTML = '<div class="rp-h"><button class="linkbtn" id="stBack">‹</button><span class="rp-hi">' + s.i + '</span><b>' + esc(pick(s.t)) + '</b><span class="chip">TOPIK ' + s.lv + '</span></div>' +
      '<div class="card st-card"><h3 class="ko st-ti">' + esc(s.ko) + '</h3>' +
      '<div class="st-tools"><button class="btn" id="stPlay">' + (st.play ? "⏹ " + esc(T({ uz: "To'xtatish", ru: "Стоп", en: "Stop" })) : "▶️ " + esc(T({ uz: "Hammasini tinglash", ru: "Слушать всё", en: "Listen to all" }))) + '</button>' +
      '<button class="btn ghost" id="stTr">🇺🇿 ' + esc(st.tr ? T({ uz: "Tarjimani yashirish", ru: "Скрыть перевод", en: "Hide translation" }) : T({ uz: "Tarjimani ko'rsatish", ru: "Показать перевод", en: "Show translation" })) + '</button></div>' +
      '<div class="st-txt">' + s.s.map(function (x, i) {
        return '<p class="st-s" data-i="' + i + '"><span class="ko">' + linkify(x[0]) + '</span> <button class="mini st-say" data-i="' + i + '">🔊</button>' + (st.tr ? '<small>' + esc(x[1]) + '</small>' : '') + '</p>';
      }).join("") + '</div></div>' +
      '<div class="d-sec">📌 ' + esc(T({ uz: "Asosiy so'zlar", ru: "Ключевые слова", en: "Key words" })) + '</div><div class="d-chips">' +
      s.w.map(function (w) { return '<button class="chip" data-say="' + esc(w[0]) + '"><span class="ko">' + esc(w[0]) + '</span> — ' + esc(w[1]) + '</button>'; }).join("") + '</div>' +
      '<div class="d-sec">✅ ' + esc(T({ uz: "Tushundingizmi?", ru: "Поняли?", en: "Did you understand?" })) + '</div><div id="stQ"></div>';
    $("stBack").onclick = list;
    $("stTr").onclick = function () { st.tr = !st.tr; stop(); render(); };
    $("stPlay").onclick = function () { if (st.play) stop(); else playAll(); };
    v.querySelectorAll(".st-say").forEach(function (b) { b.onclick = function () { stop(); hl(+b.dataset.i); K.speak(s.s[+b.dataset.i][0]).then(function () { hl(-1); }); }; });
    if (window.PWDict && PWDict.bind) PWDict.bind(v);
    questions();
  }
  function hl(i) { document.querySelectorAll(".st-s").forEach(function (p) { p.classList.toggle("on", +p.dataset.i === i); }); }
  function stop() { if (st.play) { st.play = 0; try { K.stop(); } catch (e) {} hl(-1); var b = $("stPlay"); if (b) b.innerHTML = "▶️ " + esc(T({ uz: "Hammasini tinglash", ru: "Слушать всё", en: "Listen to all" })); } }
  function playAll() {
    var s = st.cur, tok = ++st.play; $("stPlay").innerHTML = "⏹ " + esc(T({ uz: "To'xtatish", ru: "Стоп", en: "Stop" }));
    (function next(i) {
      if (st.play !== tok || !st.cur || i >= s.s.length) { if (st.play === tok) stop(); return; }
      hl(i); var p = document.querySelector('.st-s[data-i="' + i + '"]'); if (p && p.scrollIntoView) p.scrollIntoView({ block: "center", behavior: "smooth" });
      Promise.resolve(K.speak(s.s[i][0])).then(function () { setTimeout(function () { next(i + 1); }, 350); }, function () { next(i + 1); });
    })(0);
  }
  function questions() {
    var s = st.cur, box = $("stQ"), n = Object.keys(st.ans).length;
    box.innerHTML = s.q.map(function (q, qi) {
      var a = st.ans[qi];
      return '<div class="card st-q"><b class="' + (/[가-힣]/.test(q.q) ? "ko" : "") + '">' + (qi + 1) + '. ' + esc(q.q) + '</b><div class="gc-opts" style="margin-top:8px">' + q.o.map(function (o, k) {
        var cls = a == null ? "" : k === q.a ? " ok" : k === a ? " bad" : "";
        return '<button class="opt' + cls + '" data-q="' + qi + '" data-k="' + k + '"' + (a != null ? " disabled" : "") + '><span class="' + (/[가-힣]/.test(o) ? "ko" : "") + '">' + esc(o) + '</span></button>';
      }).join("") + '</div>' + (a != null ? '<div class="exp" style="margin-top:8px">' + esc(q.e) + '</div>' : '') + '</div>';
    }).join("") + (n === s.q.length ? (function () {
      var ok = s.q.filter(function (q, i) { return st.ans[i] === q.a; }).length;
      return '<div class="rv-done" style="font-size:40px">' + (ok === 3 ? "🏆" : ok === 2 ? "👍" : "📚") + '<h3>' + ok + ' / 3</h3><button class="btn" id="stNext">' + esc(T({ uz: "Boshqa hikoya", ru: "Другой рассказ", en: "Another story" })) + ' ›</button></div>';
    })() : '');
    box.querySelectorAll("[data-q]").forEach(function (b) {
      b.onclick = function () {
        var qi = +b.dataset.q; if (st.ans[qi] != null) return;
        st.ans[qi] = +b.dataset.k; H.haptic && H.haptic("note", st.ans[qi] === s.q[qi].a ? "success" : "error");
        if (Object.keys(st.ans).length === s.q.length) finish();
        questions();
      };
    });
    if ($("stNext")) $("stNext").onclick = list;
  }
  function finish() {
    var s = st.cur, ok = s.q.filter(function (q, i) { return st.ans[i] === q.a; }).length, d = ld(DKEY, {});
    var first = d[s.id] == null;
    d[s.id] = Math.max(d[s.id] || 0, ok); sv(DKEY, d);
    document.dispatchEvent(new CustomEvent("pw:xp", { detail: { xp: (first ? 10 : 3) + ok * 3, why: "story" } }));
    K.Activity.mark("read");
  }
  var prevOnView = H.onView, prevLeave = H.onLeave;
  H.onView = function (v) { if (prevOnView) prevOnView(v); if (v === "stories" && !st.cur) list(); };
  H.onLeave = function (v) { if (prevLeave) prevLeave(v); if (v === "stories") stop(); };
  window.PWStories = { open: function (id) { H.go("stories"); if (id) open(id); } };
})();
