/* 4개 몰 SEO 코드 동기화 (2026-11-02). 관리자 SEO 페이지에서 실행. window.name 에 4개 몰 원본 스냅샷({kr,en,jp,cn}) 필요. */
window.__sync1102 = function(V, mall, HASH){
  var W = JSON.parse(window.name), K = W.kr, log = [];
  function txt(v){ return v.state.doc.toString(); }
  function set(v, s){ v.dispatch({changes:{from:0, to:v.state.doc.length, insert:s}}); }
  function lines(t){ return t.split('\n'); }
  function findLine(t, p){ return lines(t).filter(function(l){ return l.trimStart().indexOf(p) === 0; }); }
  function repLine(t, p, nl, tag){ var a = lines(t), n = 0; for (var i = 0; i < a.length; i++) if (a[i].trimStart().indexOf(p) === 0){ if (a[i] !== nl){ a[i] = nl; n++; } } if (n) log.push(tag + ' x' + n); return a.join('\n'); }
  /* 주석 블록 단위 */
  function blk(t, head){ var i = t.indexOf(head); if (i < 0) return null; var s = t.lastIndexOf('<!--', i), e = t.indexOf('<!--', t.indexOf('-->', i) + 3); return {s: s, e: e < 0 ? t.length : e, body: t.slice(s, e < 0 ? t.length : e)}; }
  var B = V.find(function(v){ return txt(v).indexOf('MOST LOVED') >= 0; }), F = V.find(function(v){ return txt(v).indexOf("sec('FIRST PICK'") >= 0; });
  if (!B || !F) return ['editors not found'];
  var b = txt(B), f = txt(F);

  /* --- Body --- */
  /* B3: 예전 오르골 BGM 코드 삭제 (이제 idang-media/site/bgm.js 로 4개 몰 공통) */
  var s0 = b.indexOf('아이당 오르골 BGM v3'), e0 = b.indexOf('/아이당 오르골 BGM');
  if (s0 > 0 && e0 > s0){ s0 = b.lastIndexOf('<!--', s0); e0 = b.indexOf('-->', e0) + 3; b = b.slice(0, s0) + '<!-- 오르골 BGM: 2026-11-02부터 idang-media/site/bgm.js (여러 곡 랜덤, 4개 몰 공통) 로 이동 -->' + b.slice(e0); log.push('old BGM removed'); }
  if (mall !== 'kr'){
    var kb = K[4];
    /* B1: 프리오더 안내 박스 블록은 국문몰과 동일하게 */
    var H1 = '프리오더 안내 박스(32·71·99', x = blk(kb, H1), y = blk(b, H1);
    if (x && y && x.body !== y.body){ b = b.slice(0, y.s) + x.body + b.slice(y.e); log.push('preorder blk synced'); }
    /* B2: 국문몰에만 있던 블록 추가 */
    ['TOKYO PINK(780·781) 썸네일 *TOKYO EDITION* 뱃지', 'REVIEWS 강조 (2026-10-31)'].forEach(function(h){
      if (b.indexOf(h) >= 0) return; var z = blk(kb, h); if (!z) return;
      var prev = kb.lastIndexOf('<!--', z.s - 1), ph = kb.slice(prev + 4, kb.indexOf('-->', prev)).trim().slice(0, 30), pb = blk(b, ph);
      var at = pb ? pb.e : b.indexOf('<!-- 오르골 BGM'); if (at < 0) at = b.length;
      b = b.slice(0, at) + z.body + b.slice(at); log.push('added: ' + h.slice(0, 12));
    });
  }
  /* --- Footer --- */
  if (mall !== 'kr'){
    var kf = K[5];
    /* F1: REVIEWS 더보기 버튼 */
    var H2 = 'REVIEWS 더보기 버튼 (2026-10-31)';
    if (f.indexOf(H2) < 0){ var z2 = blk(kf, H2); if (z2){ var at2 = f.indexOf('<!-- IDANG REELS'); if (at2 < 0) at2 = f.length; f = f.slice(0, at2) + z2.body + f.slice(at2); log.push('added: REVIEWS more'); } }
    /* F2: 메인 REVIEWS 새 레이아웃(국문몰 10/31)과 같은 구조 */
    var P1 = 'css.textContent=M.hs.concat(M.hw)'; f = repLine(f, P1, findLine(kf, P1)[0], 'main css');
    var P2 = '\'<section class="im-sec im-rv2">'; f = repLine(f, P2, findLine(kf, P2)[0], 'reviews section');
    var k32 = findLine(kf, "[32,'").filter(function(l){ return /,$/.test(l); })[0], k586 = findLine(kf, "[586,'")[0];
    if (k32 && k586 && f.indexOf(k586) < 0){ var c32 = k32.replace(/,$/, ''); if (f.indexOf(c32 + '\n') >= 0){ f = f.replace(c32 + '\n', k32 + '\n' + k586 + '\n'); log.push('review 586 added'); } }
    /* F3: 사업자 정보 문구(게시판 안내) 국문몰과 동일 */
    ["var KO=['상호", "en:['Business Name", "ja:['商号"].forEach(function(p){ var kl = findLine(kf, p)[0]; if (!kl) return; var ml = findLine(f, p)[0]; if (!ml) return; var tailK = /\]\}\[L\];\s*$/.test(kl), tailM = /\]\}\[L\];\s*$/.test(ml); if (tailK !== tailM) kl = tailM ? kl.replace(/\],\s*$/, ']}[L];') : kl.replace(/\]\}\[L\];\s*$/, '],'); f = repLine(f, p, kl, 'biz ' + p.slice(0, 6)); });
  }
  /* F3b: 중국어(zh) 사업자 정보 — 4개 몰 모두 */
  var zh = "    zh:['公司名称: IDANG CLUB 株式会社 · 营业执照号: 530-88-03340 · 通信销售业申报号: 2025-首尔广津-0177号','公司地址: 韩国 首尔特别市 广津区 紫阳路28街路23 · 代表: Kim Ha-eun · 邮箱: idangclub@gmail.com','客服时间: 周一至周五 10:00~17:00 / +82-507-1364-2614（※ 咨询仅通过网站留言板受理，电话可能无法接通。） · 银行账户: 新韩银行 140-015-694136（IDANG CLUB 株式会社）']}[L];";
  var zl = findLine(f, "zh:['公司名称")[0];
  if (zl){ if (zl !== zh){ f = f.replace(zl, zh); log.push('zh biz updated'); } }
  else { var jl = findLine(f, "ja:['商号")[0]; if (jl && /\]\}\[L\];\s*$/.test(jl)){ f = f.replace(jl, jl.replace(/\]\}\[L\];\s*$/, '],') + '\n' + zh); log.push('zh biz added'); } }
  var Lold = "L=L.indexOf('ja')===0?'ja':L.indexOf('en')===0?'en':'ko';", Lnew = "L=L.indexOf('ja')===0?'ja':L.indexOf('en')===0?'en':L.indexOf('zh')===0?'zh':'ko';";
  if (f.indexOf(Lold) >= 0 && f.indexOf("var KO=['상호") > f.indexOf(Lold) - 4000){ var li = f.indexOf(Lold), ki = f.indexOf("var KO=['상호"); if (ki > li && ki - li < 3000){ f = f.slice(0, li) + Lnew + f.slice(li + Lold.length); log.push('biz lang zh'); } }
  var BZo = "var BIZ=/사업자번호|사업자등록번호|Business Registration|Business Name|事業者登録番号|商号|All Rights Reserved/i;";
  if (f.indexOf(BZo) >= 0){ f = f.replace(BZo, BZo.replace('|All Rights', '|营业执照号|公司名称|All Rights')); log.push('BIZ regex zh'); }
  /* F4: 릴스/BGM 로더 버전 */
  var m = f.match(/idang-media@'\+'([0-9a-f]{7})'/); if (m && m[1] !== HASH){ f = f.replace(m[0], m[0].replace(m[1], HASH)); log.push('loader ' + m[1] + '->' + HASH); }
  /* 저장 전 문법 검사: <script> 내용만 */
  function chk(t, tag){ var re = /<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g, mm, bad = 0; while ((mm = re.exec(t))){ try { new Function(mm[1]); } catch(e){ bad++; log.push('SYNTAX ' + tag + ': ' + String(e).slice(0, 60)); } } return bad; }
  var bad = chk(b, 'body') + chk(f, 'footer');
  if (bad) { log.push('NOT APPLIED'); return log; }
  set(B, b); set(F, f); log.push('applied');
  return log;
};
