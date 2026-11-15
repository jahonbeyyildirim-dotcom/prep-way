/* «6 daqiqa koreys»: ikki boshlovchi suhbatini tinglash, matnni ko'rish, yangi so'zlar, grammatika, savollar va PDF. */
(function () {
  var H = window.HY, K = window.Komiko, I = window.I18N, EP = window.PW_SIX || [];
  if (!H || !K || !I || !EP.length) return;
  var $ = H.$, esc = H.esc, LG = I.lang(), LI = { uz: 2, ru: 3, en: 4 };
  function T(m, v) { return I.f(m, v); }
  function P(o) { return I.pick(o); }
  var VOICE = { K: "female", M: "male" }, NAME = { K: "Komiko", M: "Minjun" };
  var PDF_BASE = "https://raw.githubusercontent.com/jahonbeyyildirim-dotcom/prep-way/main/miniapp/pdf/";
  var DKEY = "pwSixDone";
  function done() { try { return JSON.parse(localStorage.getItem(DKEY) || "{}"); } catch (e) { return {}; } }
  function markDone(id) { var d = done(); d[id] = Date.now(); try { localStorage.setItem(DKEY, JSON.stringify(d)); } catch (e) {} K.Activity.mark("six"); }

  // Epizodning to'liq navbati: suhbat + so'zlar takrori + xayrlashuv
  function queue(ep) {
    var q = ep.lines.slice();
    ep.words.forEach(function (w) { q.push(["K", w.ko + ".", P(w.m), P(w.m), P(w.m), w]); q.push(["M", w.ex[0][0], w.ex[0][1], w.ex[0][2], w.ex[0][3], w]); });
    return q.concat(ep.outro);
  }
  function minutes(ep) {
    var secs = queue(ep).reduce(function (s, l) { return s + l[1].replace(/\s/g, "").length * 0.23 + 0.9; }, 0);
    return Math.max(1, Math.round(secs / 60));
  }
  function today() {
    var d = new Date(), n = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5);
    var ep = EP[n % EP.length];
    return { id: ep.id, title: P(ep.title) };
  }
  function trLine(l) { return l[LI[LG]] || l[2]; }
  // Matnda yangi so'zlarni ajratib ko'rsatish
  function mark(ep, ko) {
    var h = esc(ko);
    ep.words.forEach(function (w, i) {
      (w.hl || [w.ko]).forEach(function (f) {
        var ef = esc(f);
        if (h.indexOf(ef) >= 0 && h.indexOf('data-w="' + i + '"') < 0) h = h.replace(ef, '<mark data-w="' + i + '">' + ef + '</mark>');
      });
    });
    return h;
  }

  // ---------- Ro'yxat ----------
  function list() {
    var v = $("v-six"), d = done();
    v.innerHTML = '<div class="six-head">' + K.avatar(54, "live") + '<span class="six-av2">' + K.avatar(54, "mj") + '</span><div><h2 style="margin:0">' + esc(T({ uz: "6 daqiqa koreys", ru: "6 минут корейского", en: "6-Minute Korean" })) + '</h2>' +
      '<div class="note" style="font-size:13.5px">' + esc(T({ uz: "Komiko va Minjun kundalik mavzularda gaplashadi. Tinglang, matnni ko'ring, yangi so'zlarni o'rganing.", ru: "Комико и Минджун говорят на бытовые темы. Слушайте, читайте текст, учите новые слова.", en: "Komiko and Minjun chat about everyday topics. Listen, read along, learn new words." })) + '</div></div></div>' +
      '<div class="six-list">' + EP.map(function (ep) {
        return '<button class="six-ep' + (d[ep.id] ? " ok" : "") + '" data-ep="' + ep.id + '"><span class="se-n">' + ep.id + '</span><span class="se-t"><b>' + esc(P(ep.title)) + '</b><small class="ko">' + esc(ep.ko) + ' · ' + ep.level + ' · ≈' + minutes(ep) + ' ' + esc(T({ uz: "daq", ru: "мин", en: "min" })) +
          ' · ' + ep.words.length + ' ' + esc(T({ uz: "yangi so'z", ru: "новых слов", en: "new words" })) + '</small></span><span class="se-c">' + (d[ep.id] ? "✓" : "▶") + '</span></button>';
      }).join("") + '</div>';
    v.querySelectorAll("[data-ep]").forEach(function (b) { b.onclick = function () { open(+b.dataset.ep); }; });
  }

  // ---------- Epizod ----------
  var pl = { ep: null, q: [], i: 0, on: false, tok: 0, tr: true, speed: "normal" };
  function open(id) {
    stop();
    var ep = EP.filter(function (e) { return e.id === id; })[0]; if (!ep) return;
    pl.ep = ep; pl.q = queue(ep); pl.i = 0; pl.speed = K.Profile.speed();
    var v = $("v-six");
    v.innerHTML = '<button class="linkbtn" id="sxBack">← ' + esc(T({ uz: "Barcha epizodlar", ru: "Все выпуски", en: "All episodes" })) + '</button>' +
      '<div class="six-top"><div class="six-hosts">' + K.avatar(46, "live k-k") + '<span class="six-av2">' + K.avatar(46, "live mj k-m") + '</span></div>' +
      '<div><div class="note" style="font-weight:800;font-size:12.5px;text-transform:uppercase;letter-spacing:.05em">🎧 ' + esc(T({ uz: "6 daqiqa koreys", ru: "6 минут корейского", en: "6-Minute Korean" })) + ' · ' + ep.id + '</div>' +
      '<h2 style="margin:2px 0 0">' + esc(P(ep.title)) + '</h2><div class="note ko" style="font-size:13px">' + esc(ep.ko) + ' · ' + ep.level + ' · ≈' + minutes(ep) + ' ' + esc(T({ uz: "daq", ru: "мин", en: "min" })) + '</div></div></div>' +
      '<div class="card six-q"><b>❓ ' + esc(T({ uz: "Bugungi savol", ru: "Вопрос дня", en: "Today's question" })) + '</b><div class="ko" style="font-size:17px;margin-top:4px">' + esc(ep.q.ko) + '</div><div class="note">' + esc(P(ep.q)) + '</div>' +
      '<button class="linkbtn" id="sxAns">' + esc(T({ uz: "Javobni ko'rsatish", ru: "Показать ответ", en: "Show answer" })) + '</button><div id="sxAnsT" hidden class="ok-box" style="margin-top:6px"></div></div>' +
      '<div class="card six-player"><div class="sp-now" id="sxNow"></div>' +
      '<div class="sp-bar"><i id="sxBar"></i></div><div class="sp-row"><span id="sxPos" class="note"></span>' +
      '<div class="sp-btns"><button class="sp-b" id="sxPrev" aria-label="Prev">⏮</button><button class="sp-play" id="sxPlay">▶</button><button class="sp-b" id="sxNext" aria-label="Next">⏭</button></div>' +
      '<button class="sp-sp" id="sxSpeed"></button></div></div>' +
      '<div class="seg six-tabs" id="sxTabs"><button data-t="tx" class="on">📜 ' + esc(T({ uz: "Matn", ru: "Текст", en: "Script" })) + '</button><button data-t="wd">📚 ' + esc(T({ uz: "So'zlar", ru: "Слова", en: "Words" })) + '</button>' +
      '<button data-t="gr">🧩 ' + esc(T({ uz: "Grammatika", ru: "Грамматика", en: "Grammar" })) + '</button><button data-t="qz">✅ ' + esc(T({ uz: "Savollar", ru: "Тест", en: "Quiz" })) + '</button></div>' +
      '<div id="sxPane"></div>' +
      '<a class="btn six-pdf" id="sxPdf" href="' + PDF_BASE + 'six-' + ep.id + '-' + LG + '.pdf">📄 ' + esc(T({ uz: "PDF variantini yuklab olish", ru: "Скачать PDF-версию", en: "Download the PDF" })) + '</a>';
    $("sxBack").onclick = function () { stop(); list(); };
    $("sxAns").onclick = function () { var a = $("sxAnsT"); a.hidden = !a.hidden; a.innerHTML = '<span class="ko">' + esc(ep.q.a.ko) + '</span> — ' + esc(P(ep.q.a)); };
    $("sxPlay").onclick = function () { if (pl.on) pause(); else play(); };
    $("sxPrev").onclick = function () { var was = pl.on; stop(); pl.i = Math.max(0, pl.i - 1); upd(); if (was) play(); };
    $("sxNext").onclick = function () { var was = pl.on; stop(); pl.i = Math.min(pl.q.length - 1, pl.i + 1); upd(); if (was) play(); };
    $("sxSpeed").onclick = function () { pl.speed = pl.speed === "slow" ? "normal" : "slow"; upd(); };
    $("sxTabs").querySelectorAll("button").forEach(function (b) {
      b.onclick = function () { $("sxTabs").querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); }); pane(b.dataset.t); };
    });
    pane("tx"); upd();
    window.scrollTo(0, 0);
  }
  function upd() {
    var l = pl.q[pl.i]; if (!l) return;
    $("sxNow").innerHTML = '<div class="sp-who ' + l[0] + '">' + NAME[l[0]] + '</div><div class="ko sp-ko">' + mark(pl.ep, l[1]) + '</div><div class="sp-tr">' + esc(trLine(l)) + '</div>';
    $("sxBar").style.width = Math.round((pl.i + (pl.on ? 0.5 : 0)) / pl.q.length * 100) + "%";
    $("sxPos").textContent = (pl.i + 1) + " / " + pl.q.length;
    $("sxPlay").textContent = pl.on ? "⏸" : "▶";
    $("sxSpeed").textContent = pl.speed === "slow" ? "🐢 0.75×" : "🚶 1×";
    document.querySelectorAll(".tx-l").forEach(function (r) { r.classList.toggle("cur", +r.dataset.i === pl.i); });
    document.querySelectorAll(".komiko.k-k").forEach(function (s) { s.classList.toggle("dim", l[0] !== "K"); });
    document.querySelectorAll(".komiko.k-m").forEach(function (s) { s.classList.toggle("dim", l[0] !== "M"); });
    bindMarks($("sxNow"));
  }
  function play() {
    if (pl.i >= pl.q.length) pl.i = 0;
    pl.on = true; var tok = ++pl.tok; upd();
    var cur = document.querySelector('.tx-l[data-i="' + pl.i + '"]');
    if (cur && $("sxPane").dataset.t === "tx" && cur.scrollIntoView) cur.scrollIntoView({ block: "center", behavior: "smooth" });
    var l = pl.q[pl.i];
    K.tmpSpeed = pl.speed;
    var pr = K.speak(l[1], VOICE[l[0]]) || Promise.resolve();
    pr.then(function () {
      if (tok !== pl.tok || !pl.on) return;
      setTimeout(function () {
        if (tok !== pl.tok || !pl.on) return;
        pl.i++;
        if (pl.i >= pl.q.length) { pl.on = false; pl.i = pl.q.length - 1; K.tmpSpeed = null; upd(); markDone(pl.ep.id); finished(); return; }
        play();
      }, 450);
    });
  }
  function pause() { pl.on = false; pl.tok++; K.stop(); K.tmpSpeed = null; upd(); }
  function stop() { if (pl.on) pause(); pl.tok++; }
  function finished() {
    H.toast(T({ uz: "🎉 Epizod tugadi! Endi savollarga javob bering.", ru: "🎉 Выпуск окончен! Теперь ответьте на вопросы.", en: "🎉 Episode finished! Now try the quiz." }));
    var a = $("sxAnsT"); if (a && a.hidden) $("sxAns").click();
  }

  function bindMarks(root) {
    root.querySelectorAll("mark[data-w]").forEach(function (m) { m.onclick = function (e) { e.stopPropagation(); wordSheet(pl.ep.words[+m.dataset.w]); }; });
  }
  function exHTML(e) {
    var EX = { uz: 1, ru: 2, en: 3 }, main = e[EX[LG]], others = ["uz", "ru", "en"].filter(function (l) { return l !== LG; });
    return '<div class="wx"><div class="ko"><b>' + esc(e[0]) + '</b> <button class="mini" data-say="' + esc(e[0]) + '">🔊</button></div><div>' + esc(main) + '</div>' +
      '<div class="tri">' + others.map(function (l) { return I.FLAG[l] + " " + esc(e[EX[l]]); }).join(" · ") + '</div></div>';
  }
  function wordHTML(w) {
    return '<div class="six-w"><div class="sw-h"><span class="ko sw-ko">' + esc(w.ko) + '</span><span class="note">[' + esc(w.rom) + ']</span><button class="mini" data-say="' + esc(w.ko) + '">🔊</button></div>' +
      '<div class="sw-m">' + I.tri(w.m) + '</div>' +
      '<div class="sw-u">📍 <b>' + esc(T({ uz: "Qayerda ishlatiladi", ru: "Где используется", en: "Where it's used" })) + ':</b> ' + esc(P(w.use)) + '</div>' +
      '<div class="sw-ex"><b>' + esc(T({ uz: "Misollar", ru: "Примеры", en: "Examples" })) + ':</b>' + w.ex.map(exHTML).join("") + '</div></div>';
  }
  function wordSheet(w) { K.sheet(wordHTML(w)); }
  function pane(t) {
    var ep = pl.ep, el = $("sxPane"); el.dataset.t = t;
    if (t === "tx") {
      el.innerHTML = '<div class="tx-tools"><label><input type="checkbox" id="sxTr"' + (pl.tr ? " checked" : "") + '> ' + esc(T({ uz: "Tarjimani ko'rsatish", ru: "Показывать перевод", en: "Show translation" })) + '</label>' +
        '<span class="note">' + esc(T({ uz: "Ajratilgan so'zni bosing", ru: "Нажмите на выделенное слово", en: "Tap a highlighted word" })) + '</span></div>' +
        '<div class="tx">' + pl.q.map(function (l, i) {
          return '<div class="tx-l ' + l[0] + (i === pl.i ? " cur" : "") + (l[5] ? " rc" : "") + '" data-i="' + i + '"><span class="tx-w">' + NAME[l[0]] + '</span><div><div class="ko">' + mark(ep, l[1]) + '</div>' +
            '<div class="tx-tr"' + (pl.tr ? "" : " hidden") + '>' + esc(trLine(l)) + '</div></div></div>';
        }).join("") + '</div>';
      $("sxTr").onchange = function () { pl.tr = this.checked; el.querySelectorAll(".tx-tr").forEach(function (x) { x.hidden = !pl.tr; }); };
      el.querySelectorAll(".tx-l").forEach(function (r) { r.onclick = function () { var was = pl.on; stop(); pl.i = +r.dataset.i; upd(); if (was) play(); else { K.tmpSpeed = pl.speed; K.speak(pl.q[pl.i][1], VOICE[pl.q[pl.i][0]]); } }; });
      bindMarks(el);
    } else if (t === "wd") {
      el.innerHTML = ep.words.map(wordHTML).join("");
    } else if (t === "gr") {
      var g = ep.grammar;
      el.innerHTML = '<div class="card gram"><div class="p ko">' + esc(g.p) + '</div><div style="margin-top:6px">' + I.tri(g.m) + '</div>' +
        '<div class="sw-ex" style="margin-top:10px"><b>' + esc(T({ uz: "Misollar", ru: "Примеры", en: "Examples" })) + ':</b>' + g.ex.map(exHTML).join("") + '</div></div>';
    } else {
      var st = { a: [] };
      var draw = function () {
        var right = st.a.filter(function (x, i) { return x === ep.quiz[i].a; }).length, all = st.a.filter(function (x) { return x != null; }).length;
        el.innerHTML = ep.quiz.map(function (q, qi) {
          var ans = st.a[qi];
          return '<div class="card exq" style="margin-bottom:10px"><b>' + (qi + 1) + '. ' + esc(P(q.q)) + '</b><div class="opts" style="margin-top:8px">' + q.o.map(function (o, k) {
            var cls = ans == null ? "" : k === q.a ? " right" : k === ans ? " wrong" : "";
            return '<button class="opt ko' + cls + '" data-q="' + qi + '" data-k="' + k + '"' + (ans != null ? " disabled" : "") + '><span class="n">' + (k + 1) + '</span>' + esc(o) + '</button>';
          }).join("") + '</div></div>';
        }).join("") + (all === ep.quiz.length ? '<div class="ok-box">🎉 ' + right + ' / ' + ep.quiz.length + ' — ' + esc(right === ep.quiz.length ? T({ uz: "Ajoyib!", ru: "Отлично!", en: "Excellent!" }) : T({ uz: "Suhbatni yana bir marta tinglang.", ru: "Послушайте ещё раз.", en: "Listen once more." })) + '</div>' : '');
        el.querySelectorAll("[data-q]").forEach(function (b) { b.onclick = function () { st.a[+b.dataset.q] = +b.dataset.k; if (st.a.filter(function (x) { return x != null; }).length === ep.quiz.length) markDone(ep.id); draw(); }; });
      };
      draw();
    }
  }

  var prevOnView = H.onView, prevOnLeave = H.onLeave;
  H.onView = function (v) { if (prevOnView) prevOnView(v); if (v === "six") list(); };
  H.onLeave = function (v) { if (v === "six") stop(); if (prevOnLeave) prevOnLeave(v); };
  window.PWSix = { today: today, open: open, episodes: EP };
})();
