/* 아이당 오르골 BGM v4 — 여러 곡 랜덤 재생 (4개 몰 공통, reels.js 가 불러옴)
   · 곡 추가: 아래 SONGS 에 {n:이름, bpm, m:[[음,박]...], c:[[코드,박]...]} 추가 (음은 'C5','F#4', 쉼표는 0)
   · 페이지 이동해도 같은 곡·위치에서 이어서, 곡이 끝나면 다른 곡으로(같은 곡 연속 X)
   · 음표 버튼: 켜기/끄기 (끄면 7일이 아니라 계속 기억), 길게 누르거나 더블클릭: 다음 곡 */
(function(){
  if (window.__idangBgm) return; window.__idangBgm = 4;
  var OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext; if (!OAC) return;
  var LEVEL = 0.12, KEY = "idang_bgm_off3", POS = "idang_bgm_pos4", SR = 22050, TAIL = 3.2;
  var P = [[1,1,1.6],[2,.28,3.5],[3.01,.10,6],[5.43,.07,11],[8.9,.03,18]];
  var NN = {C:0,'C#':1,Db:1,D:2,'D#':3,Eb:3,E:4,F:5,'F#':6,Gb:6,G:7,'G#':8,Ab:8,A:9,'A#':10,Bb:10,B:11};
  function mid(s){ if (typeof s === 'number') return s; var m = /^([A-G][#b]?)(\d)$/.exec(s); return m ? 12 * (+m[2] + 1) + NN[m[1]] : 0; }
  var CH = {C:[48,55,60,64],G:[43,50,55,59],F:[41,48,53,57],Am:[45,52,57,60],Em:[40,47,52,55],D:[50,57,62,66],A:[45,52,57,61],Bm:[47,54,59,62],'F#m':[42,49,54,57],E:[40,47,52,56],Dm:[50,57,62,65],'E7':[40,47,50,56]};
  /* 멜로디+코드 → 오르골 음표 목록 [초, midi, 세기] */
  function build(S){
    var spb = 60 / S.bpm, out = [], t = 0, up = S.up || 0;
    S.m.forEach(function(x){ var n = mid(x[0]); if (n) out.push([t, n + up, S.mv || 430]); t += x[1] * spb; });
    var len = t; t = 0;
    (S.c || []).forEach(function(x){
      var c = CH[x[0]], pat = S.arp || [0,1,2,3,2,1], step = (S.as || .5) * spb, k = 0;
      for (var u = 0; u < x[1] * spb - 1e-6 && t + u < len; u += step, k++) out.push([t + u, c[pat[k % pat.length]] + 12, k % pat.length ? 170 : 290]);
      t += x[1] * spb;
    });
    return {ev: out, len: len + (S.gap || 1.2)};
  }
  function seq(a){ return a.trim().split(/\s+/).map(function(w){ var p = w.split(':'); return [p[0] === '-' ? 0 : p[0], p[1] ? +p[1] : 1]; }); }
  function cs(a){ return a.trim().split(/\s+/).map(function(w){ var p = w.split(':'); return [p[0], p[1] ? +p[1] : 4]; }); }

  var SONGS = [
    {n:"idang original", raw: [[0.01,81,500],[0.587,78,425],[1.502,81,350],[2.097,83,350],[2.698,76,350],[2.999,83,425],[3.89,76,350],[4.199,83,425],[4.796,76,500],[5.717,69,350],[6.001,73,425],[6.298,69,350],[6.599,73,425],[6.897,69,350],[7.795,78,425],[8.398,73,425],[8.702,81,350],[8.999,78,425],[9.305,81,350],[9.899,78,350],[10.2,81,425],[10.808,81,425],[11.403,74,425],[11.997,76,500],[12.299,71,350],[12.603,83,425],[13.51,80,350],[13.799,83,425],[14.099,80,350],[14.705,81,350],[14.996,69,425],[15.299,81,350],[15.604,69,425],[15.903,81,350],[16.2,69,425],[16.503,81,350],[17.386,81,425],[18.605,85,425],[20.095,93,350],[21.292,76,350],[22.201,76,425],[22.804,74,425],[23.098,76,350],[24.295,76,350],[24.6,78,425],[24.9,69,350],[25.207,73,425],[25.804,71,425],[26.401,69,500],[27.306,73,350],[28.499,73,350],[31.195,74,500],[32.403,73,425],[33.003,71,425],[33.899,71,350],[35.396,71,425],[36.301,73,350],[37.488,73,350],[38.403,76,500],[39.302,73,350],[39.592,76,425],[40.2,78,425],[40.495,76,350],[41.404,76,425],[41.99,78,425],[42.595,73,425],[43.204,83,500],[43.506,71,350],[43.789,69,425],[44.998,73,425],[46.202,73,425],[47.997,74,500],[48.908,73,350],[49.194,74,425],[49.502,73,350],[50.395,71,500],[51.607,71,425],[52.5,69,350],[52.798,71,500],[53.691,73,350],[54.908,73,350],[56.104,73,350],[57.304,69,350],[0.006,62,300],[0.602,69,180],[1.197,78,170],[1.796,69,160],[2.396,64,300],[3.007,71,180],[3.593,80,170],[4.197,71,160],[4.798,57,300],[5.401,64,180],[6.003,73,170],[6.594,64,160],[7.191,66,300],[7.8,73,180],[8.406,81,170],[9.004,73,160],[9.601,62,300],[10.198,69,180],[10.801,78,170],[11.399,69,160],[12.004,64,300],[12.596,71,180],[13.201,80,170],[13.799,71,160],[14.403,57,300],[15.001,64,180],[15.613,73,170],[16.207,64,160],[16.807,57,300],[17.39,64,180],[17.998,73,170],[18.597,64,160],[19.203,57,300],[19.789,64,180],[20.406,73,170],[21.005,64,160],[21.593,57,300],[22.195,64,180],[22.796,73,170],[23.4,64,160],[24.003,66,300],[24.61,73,180],[25.199,81,170],[25.804,73,160],[26.401,57,300],[27.009,64,180],[27.604,73,170],[28.207,64,160],[28.795,62,300],[29.399,69,180],[29.996,78,170],[30.608,69,160],[31.203,64,300],[31.798,71,180],[32.398,80,170],[33.002,71,160],[33.596,64,300],[34.195,71,180],[34.802,80,170],[35.412,71,160],[35.999,57,300],[36.597,64,180],[37.194,73,170],[37.793,64,160],[38.403,57,300],[39.004,64,180],[39.6,73,170],[40.202,64,160],[40.801,57,300],[41.401,64,180],[41.992,73,170],[42.598,64,160],[43.201,61,300],[43.796,68,180],[44.398,76,170],[44.996,68,160],[45.598,62,300],[46.204,69,180],[46.798,78,170],[47.399,69,160],[48.004,59,300],[48.603,66,180],[49.208,74,170],[49.79,66,160],[50.404,57,300],[50.998,64,180],[51.601,73,170],[52.204,64,160],[52.805,62,300],[53.405,69,180],[54.001,78,170],[54.608,69,160],[55.199,64,300],[55.799,71,180],[56.404,80,170],[56.997,71,160]], len: 57.6},
    {n:"Twinkle Twinkle (Mozart)", bpm: 96,
     m: seq("C5 C5 G5 G5 A5 A5 G5:2 F5 F5 E5 E5 D5 D5 C5:2 G5 G5 F5 F5 E5 E5 D5:2 G5 G5 F5 F5 E5 E5 D5:2 C5 C5 G5 G5 A5 A5 G5:2 F5 F5 E5 E5 D5 D5 C5:2"),
     c: cs("C:2 C:2 F:2 C:2 F:2 C:2 G:2 C:2 C:2 F:2 C:2 G:2 C:2 F:2 C:2 G:2 C:2 C:2 F:2 C:2 F:2 C:2 G:2 C:2"), rep: 2},
    {n:"Ode to Joy (Beethoven)", bpm: 100,
     m: seq("E5 E5 F5 G5 G5 F5 E5 D5 C5 C5 D5 E5 E5:1.5 D5:.5 D5:2 E5 E5 F5 G5 G5 F5 E5 D5 C5 C5 D5 E5 D5:1.5 C5:.5 C5:2"),
     c: cs("C G C G C G C G:2 C:2"), rep: 2},
    {n:"Für Elise (Beethoven)", bpm: 132, as: 1, arp:[0,1,2],
     m: seq("E6:.5 D#6:.5 E6:.5 D#6:.5 E6:.5 B5:.5 D6:.5 C6:.5 A5:1 -:.5 C5:.5 E5:.5 A5:.5 B5:1 -:.5 E5:.5 G#5:.5 B5:.5 C6:1 -:.5 E5:.5 E6:.5 D#6:.5 E6:.5 D#6:.5 E6:.5 B5:.5 D6:.5 C6:.5 A5:1 -:.5 C5:.5 E5:.5 A5:.5 B5:1 -:.5 E5:.5 C6:.5 B5:.5 A5:2"),
     c: cs("Am:4 Am:3 E:3 Am:2 Am:4 Am:3 E:3 Am:2"), rep: 2},
    {n:"Minuet in G (Petzold)", bpm: 120, as: 1, arp:[0,2,1],
     m: seq("D6 G5:.5 A5:.5 B5:.5 C6:.5 D6 G5 G5 E6 C6:.5 D6:.5 E6:.5 F#6:.5 G6 G5 G5 C6 D6:.5 C6:.5 B5:.5 A5:.5 B5 C6:.5 B5:.5 A5:.5 G5:.5 F#5 G5:.5 A5:.5 B5:.5 G5:.5 A5:3 D6 G5:.5 A5:.5 B5:.5 C6:.5 D6 G5 G5 E6 C6:.5 D6:.5 E6:.5 F#6:.5 G6 G5 G5 C6 D6:.5 C6:.5 B5:.5 A5:.5 B5 C6:.5 B5:.5 A5:.5 G5:.5 A5 B5:.5 A5:.5 G5:.5 F#5:.5 G5:3"),
     c: cs("G:3 G:3 C:3 G:3 C:3 G:3 D:3 D:3 G:3 G:3 C:3 G:3 C:3 G:3 D:3 G:3")},
    {n:"Canon in D (Pachelbel)", bpm: 76, up: 0,
     m: seq("-:16 F#6:2 E6:2 D6:2 C#6:2 B5:2 A5:2 B5:2 C#6:2 F#6:2 E6:2 D6:2 C#6:2 B5:2 A5:2 B5:2 C#6:2 D6 C#6 D6 D5 C#5 A5 E5 F#5 D5 D6 C#6 B5 C#6 F#6 A6 B6 G6:2 F#6:2 E6:2 G6:2 F#6:4"),
     c: cs("D:2 A:2 Bm:2 F#m:2 G:2 D:2 G:2 A:2 D:2 A:2 Bm:2 F#m:2 G:2 D:2 G:2 A:2 D:2 A:2 Bm:2 F#m:2 G:2 D:2 G:2 A:2 D:2 A:2 Bm:2 F#m:2 G:2 D:2 G:2 A:2 G:2 D:2 A:2 A:2 D:4")},
    {n:"Greensleeves", bpm: 108, as: 1, arp:[0,1,2],
     m: seq("A5 C6:2 D6 E6:1.5 F6:.5 E6 D6:2 B5 G5:1.5 A5:.5 B5 C6:2 A5 A5:1.5 G#5:.5 A5 B5:2 G#5 E5:2 A5 C6:2 D6 E6:1.5 F6:.5 E6 D6:2 B5 G5:1.5 A5:.5 B5 C6:1.5 B5:.5 A5 G#5:1.5 F#5:.5 G#5 A5:3 A5:2"),
     c: cs("Am:1 Am:3 C:3 G:3 Em:3 Am:3 Am:3 E:3 E:3 Am:3 C:3 G:3 Em:3 Am:1.5 E:1.5 E:3 Am:3 Am:2"), rep: 2}
  ];
  /* 코드에 '-:0' 같은 빈 칸은 무시 */
  SONGS.forEach(function(S){ if (S.c) S.c = S.c.filter(function(x){ return CH[x[0]] && x[1] > 0; }); });

  function wav(x, sr){
    var n = x.length, b = new ArrayBuffer(44 + n * 2), v = new DataView(b);
    function s(o, t){ for (var i = 0; i < t.length; i++) v.setUint8(o + i, t.charCodeAt(i)); }
    s(0,"RIFF"); v.setUint32(4, 36 + n * 2, true); s(8,"WAVE"); s(12,"fmt "); v.setUint32(16,16,true); v.setUint16(20,1,true); v.setUint16(22,1,true);
    v.setUint32(24,sr,true); v.setUint32(28,sr*2,true); v.setUint16(32,2,true); v.setUint16(34,16,true); s(36,"data"); v.setUint32(40,n*2,true);
    for (var i = 0; i < n; i++){ var a = Math.max(-1, Math.min(1, x[i])); v.setInt16(44 + i * 2, a * 32767, true); }
    return URL.createObjectURL(new Blob([b], {type: "audio/wav"}));
  }
  var cache = {};
  function render(id, cb){
    if (cache[id]) return cb(cache[id]);
    var S = SONGS[id], B;
    if (S.raw) B = {ev: S.raw, len: S.len};
    else { B = build(S); var r = S.rep || 1, one = B.len, ev = [];
      for (var q = 0; q < r; q++) B.ev.forEach(function(e){ ev.push([e[0] + q * one, e[1], e[2]]); });
      B = {ev: ev, len: one * r}; }
    var total = B.len + TAIL, oc;
    try { oc = new OAC(1, Math.ceil(total * SR), SR); } catch(e){ SR = 44100; oc = new OAC(1, Math.ceil(total * SR), SR); }
    var dry = oc.createGain(); dry.connect(oc.destination);
    var conv = oc.createConvolver(), ir = oc.createBuffer(1, SR * 1.6, SR), d = ir.getChannelData(0);
    for (var i = 1; i < d.length; i++) d[i] = (Math.random()*2-1) * Math.exp(-3.2 * i / SR);
    conv.buffer = ir; var wet = oc.createGain(); wet.gain.value = 0.06; dry.connect(conv); conv.connect(wet); wet.connect(oc.destination);
    B.ev.forEach(function(e){
      var t = e[0], f = 440 * Math.pow(2, (e[1] - 69) / 12), vel = e[2] / 1000;
      P.forEach(function(p){
        var fr = f * p[0]; if (fr > SR / 2.2) return;
        var o = oc.createOscillator(), g = oc.createGain();
        o.frequency.value = fr; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(p[1] * vel, t + 0.003);
        g.gain.setTargetAtTime(0, t + 0.003, 1 / p[2]); o.connect(g); g.connect(dry); o.start(t); o.stop(Math.min(t + 3.2, total));
      });
    });
    function done(buf){
      var s = buf.getChannelData(0), n = s.length, r = new Float32Array(n), peak = 0;
      if (S.raw){ n = Math.round(S.len * SR); r = new Float32Array(n); for (var i = 0; i < n; i++) r[i] = s[i] + (i + n < s.length ? s[i + n] : 0); }
      else r.set(s);
      for (var j = 0; j < r.length; j++){ var a = Math.abs(r[j]); if (a > peak) peak = a; }
      var k = LEVEL / (peak || 1); for (var z = 0; z < r.length; z++) r[z] *= k;
      cache[id] = wav(r, SR); cb(cache[id]);
    }
    try { var pr = oc.startRendering(); if (pr && pr.then) pr.then(done); else oc.oncomplete = function(e){ done(e.renderedBuffer); }; }
    catch(e){ console.warn("BGM 생성 실패", e); }
  }

  /* 상태 */
  var off = false; try { off = localStorage.getItem(KEY) === "1"; } catch(e){}
  var st = null; try { st = JSON.parse(sessionStorage.getItem(POS) || "null"); } catch(e){}
  var cur = st && SONGS[st.i] ? st.i : Math.floor(Math.random() * SONGS.length), seekTo = st ? st.t || 0 : 0, want = false;
  function nextId(){ if (SONGS.length < 2) return 0; var n; do { n = Math.floor(Math.random() * SONGS.length); } while (n === cur); return n; }

  var au = new Audio(); au.preload = "auto"; au.setAttribute("playsinline", ""); au.setAttribute("webkit-playsinline", "");
  window.__idangBgmAu = au; window.__idangBgmSongs = SONGS.map(function(s){ return s.n; });
  var SILENT = wav(new Float32Array(2205), SR), url = null;
  au.loop = SONGS[cur].raw ? true : false;
  au.addEventListener("playing", function(){ ui(au.src === url); });
  au.addEventListener("pause", function(){ ui(false); });
  au.addEventListener("loadedmetadata", function(){ if (au.src === url && seekTo > 0){ try { au.currentTime = Math.min(seekTo, au.duration - .5); } catch(e){} seekTo = 0; } });
  au.addEventListener("ended", function(){ if (want) go(nextId()); });
  function savePos(){ if (url && au.src === url && !au.paused){ try { sessionStorage.setItem(POS, JSON.stringify({i: cur, t: au.currentTime})); } catch(e){} } }
  setInterval(savePos, 1000); window.addEventListener("pagehide", savePos);
  /* 오리지널 곡은 한 바퀴 반 돌고 다음 곡으로 */
  au.addEventListener("timeupdate", function(){ var S = SONGS[cur]; if (S.raw && want && au.currentTime > S.len - .3){ S.__n = (S.__n || 0) + 1; if (S.__n >= 2){ S.__n = 0; go(nextId()); } } });

  function go(id){
    cur = id; seekTo = 0; au.loop = !!SONGS[id].raw;
    render(id, function(u){ url = u; if (want){ au.src = u; var p = au.play(); if (p && p.catch) p.catch(function(){}); } });
    setTimeout(function(){ render(nextId(), function(){}); }, 4000); /* 다음 곡 미리 준비 */
  }
  function play(){
    want = true; unhook();
    if (url && au.src === url) { var p0 = au.play(); return p0; }
    if (url){ au.src = url; return au.play(); }
    au.src = SILENT; var p = au.play(); render(cur, function(u){ url = u; if (want){ au.src = u; var q = au.play(); if (q && q.catch) q.catch(function(){}); } }); return p;
  }
  function stop(){ want = false; ui(false); au.pause(); }
  function save(v){ try { localStorage.setItem(KEY, v ? "1" : "0"); } catch(e){} }

  var EVTS = ["pointerdown","mousedown","touchend","pointerup","click","keydown"];
  function first(e){ if (e && e.target && e.target.closest && e.target.closest("#idang-bgm-btn")) return; if (!off && !want){ var p = play(); if (p && p.catch) p.catch(function(){ want = false; }); } }
  function hook(){ EVTS.forEach(function(n){ document.addEventListener(n, first, true); }); }
  function unhook(){ EVTS.forEach(function(n){ document.removeEventListener(n, first, true); }); }

  var css = "#idang-bgm-btn{position:fixed;right:18px;bottom:18px;z-index:9999;width:46px;height:46px;border-radius:50%;border:none;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.12);font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .2s;padding:0;-webkit-tap-highlight-color:transparent}"
   + "#idang-bgm-btn:hover{transform:scale(1.08)}#idang-bgm-btn.off{opacity:.55}"
   + "#idang-bgm-tip{position:fixed;right:72px;bottom:27px;z-index:9999;background:#fff;color:#e2508a;border:1.5px solid #ffc9de;border-radius:99px;padding:7px 12px;font:600 12px/1.2 'Jua','Pretendard','Apple SD Gothic Neo',sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.1);white-space:nowrap;opacity:0;transform:translateX(6px);transition:opacity .4s,transform .4s;pointer-events:none}"
   + "#idang-bgm-tip.show{opacity:1;transform:none}";
  var btn, tip, tipT;
  var hl = location.hostname + " " + (document.documentElement.lang || "").toLowerCase();
  var L = /japan| ja/.test(hl) ? "ja" : /china| zh/.test(hl) ? "zh" : /global| en/.test(hl) ? "en" : "ko";
  var TAP = {ko:"♪ 탭하면 음악이 나와요", en:"♪ Tap anywhere for music", ja:"♪ タップで音楽が流れます", zh:"♪ 点击屏幕播放音乐"}[L];
  function ui(on){ if (!btn) return; btn.textContent = on ? "🎵" : "🔇"; btn.classList.toggle("off", !on); if (on) tipHide(); }
  function tipHide(){ if (tip) tip.classList.remove("show"); }
  function say(txt, ms){ if (!tip) return; tip.textContent = txt; document.body.appendChild(tip); clearTimeout(tipT); setTimeout(function(){ tip.classList.add("show"); }, 30); tipT = setTimeout(tipHide, ms || 2600); }
  function mount(){
    if (document.getElementById("idang-bgm-btn")) return;
    var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);
    btn = document.createElement("button"); btn.id = "idang-bgm-btn"; btn.type = "button"; btn.setAttribute("aria-label", "BGM"); btn.title = "BGM";
    tip = document.createElement("div"); tip.id = "idang-bgm-tip";
    document.body.appendChild(btn); ui(false);
    var lp = null, skipped = false;
    function skip(){ skipped = true; off = false; save(false); want = true; go(nextId()); say("♪ " + SONGS[cur].n); }
    btn.addEventListener("pointerdown", function(){ skipped = false; lp = setTimeout(skip, 650); });
    ["pointerup","pointerleave","pointercancel"].forEach(function(n){ btn.addEventListener(n, function(){ clearTimeout(lp); }); });
    btn.addEventListener("dblclick", function(ev){ ev.preventDefault(); if (!skipped) skip(); });
    btn.addEventListener("click", function(ev){
      ev.stopPropagation(); if (skipped) { skipped = false; return; }
      if (want) { off = true; save(true); stop(); }
      else { off = false; save(false); var p = play(); if (p && p.catch) p.catch(function(){}); }
    });
    if (!off){
      hook(); var p = play(); if (p && p.catch) p.catch(function(){ want = false; hook(); });
      setTimeout(function(){ if (!want || au.paused) say(TAP, 4000); }, 1200);
    }
  }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);
})();
