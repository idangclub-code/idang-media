/* IDANG REELS — 상품 상세 하단 영상 (idang-media) */

(function(){
  if(window.__imReels)return;window.__imReels=1;
  /* ── '같이 코디하면 더 귀여워' (관련상품 .idang-rel): 전 기기 한 줄 가로 스크롤 + 양옆 화살표 ── */
  (function(){
    var c=document.createElement('style');c.id='idangRelMob';
    c.textContent='html body .idang-rel .owl-stage-outer{overflow-x:auto!important;overflow-y:hidden!important;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;scrollbar-width:none;position:relative}'
      +'html body .idang-rel .owl-stage-outer::-webkit-scrollbar{display:none}'
      +'html body .idang-rel .owl-stage{display:flex!important;flex-wrap:nowrap!important;justify-content:flex-start!important;transform:none!important;transition:none!important;margin:0!important;max-width:none!important;width:auto!important;gap:12px!important}'
      +'html body .idang-rel .owl-item{flex:0 0 calc((100% - 36px)/4.2)!important;width:calc((100% - 36px)/4.2)!important;max-width:none!important;margin:0!important;scroll-snap-align:start}'
      +'html body .idang-rel .owl-item.cloned{display:none!important}'
      +'html body .idang-rel .owl-nav,html body .idang-rel .owl-dots{display:none!important}'
      +'html body .idang-rel .ir-wrap{position:relative}html body .idang-rel .ir-a{position:absolute;top:40%;transform:translateY(-50%);z-index:3;width:38px;height:38px;border-radius:50%;border:0;background:rgba(255,255,255,.95);box-shadow:0 3px 12px rgba(0,0,0,.15);font-size:20px;color:#4a2b3a;padding:0;line-height:38px;cursor:pointer}'
      +'html body .idang-rel .ir-a.l{left:-4px}html body .idang-rel .ir-a.r{right:-4px}html body .idang-rel .ir-a[hidden]{display:none}'
      +'@media(max-width:991px){html body .idang-rel .owl-item{flex:0 0 38vw!important;width:38vw!important}html body .idang-rel .ir-a{width:34px;height:34px;font-size:18px;line-height:34px}html body .idang-rel .ir-a.l{left:4px}html body .idang-rel .ir-a.r{right:4px}}';
    document.head.appendChild(c);
    function setup(){
      [].forEach.call(document.querySelectorAll('.idang-rel .owl-stage-outer'),function(o){
        if(o.__ir)return;o.__ir=1;
        /* 캐러셀 드래그가 가로 스크롤을 가로채지 않게 (전 기기) */
        ['touchstart','touchmove','touchend','pointerdown','mousedown'].forEach(function(ev){o.addEventListener(ev,function(e){e.stopPropagation()},true)});
        var wrap=o.parentNode; wrap.classList.add('ir-wrap');
        var L=document.createElement('button'),R=document.createElement('button');L.className='ir-a l';R.className='ir-a r';L.type=R.type='button';L.textContent='‹';R.textContent='›';L.setAttribute('aria-label','prev');R.setAttribute('aria-label','next');
        wrap.appendChild(L);wrap.appendChild(R);
        L.onclick=function(){o.scrollBy({left:-o.clientWidth*.7,behavior:'smooth'})};R.onclick=function(){o.scrollBy({left:o.clientWidth*.7,behavior:'smooth'})};
        function ar(){var max=o.scrollWidth-o.clientWidth;L.hidden=o.scrollLeft<=4;R.hidden=o.scrollLeft>=max-4||max<=4}
        o.addEventListener('scroll',ar,{passive:true});window.addEventListener('resize',ar);setTimeout(ar,100);setTimeout(ar,1200);
      });
    }
    var n=0,t=setInterval(function(){setup();if(++n>40)clearInterval(t)},500);
  })();
  var st=document.createElement('style');st.textContent="\n#im-reels{max-width:1200px;margin:56px auto 24px;padding:0 16px;text-align:center;font-family:\"Pretendard\",\"Apple SD Gothic Neo\",\"Noto Sans KR\",sans-serif;color:#4a2b3a}\n#im-reels .rt{font-family:\"Cherry Bomb One\",\"Pretendard\",cursive;font-size:clamp(24px,3.4vw,34px);margin:0 0 6px;color:#e86aa3;font-weight:400}\n#im-reels .rs{font-size:14px;color:#9a7a8a;margin:0 0 22px}\n#im-reels .rs b{color:#e86aa3}\n#im-reels .rw{position:relative}\n#im-reels .rr{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:6px}\n#im-reels .rr::-webkit-scrollbar{display:none}\n#im-reels .rc{flex:0 0 calc((100% - 36px)/4);aspect-ratio:9/16;border-radius:18px;overflow:hidden;position:relative;scroll-snap-align:start;cursor:pointer;background:#ffd9e8;border:0;padding:0}\n@media(max-width:768px){#im-reels .rc{flex-basis:calc((100% - 24px)/2.3)}}\n#im-reels video{width:100%;height:100%;object-fit:cover;display:block}\n#im-reels .rb{position:absolute;top:10px;left:10px;background:rgba(255,255,255,.95);color:#4a2b3a;border-radius:999px;padding:5px 10px 5px 8px;display:flex;align-items:center;gap:5px;font-size:13px;font-weight:700}\n#im-reels .rb svg{width:16px;height:16px}\n#im-reels .ra{position:absolute;top:50%;transform:translateY(-50%);width:42px;height:42px;border-radius:50%;border:0;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.12);cursor:pointer;font-size:20px;color:#4a2b3a;z-index:2}\n#im-reels .ra.l{left:-6px}#im-reels .ra.r{right:-6px}\n#im-reels .ra[hidden]{display:none}\n@media(max-width:768px){#im-reels .ra{width:34px;height:34px;font-size:18px;background:rgba(255,255,255,.94)}#im-reels .ra.l{left:4px}#im-reels .ra.r{right:4px}}\n#im-reels.mob{float:left;width:100%;clear:both;margin:22px 0 6px !important}\n#im-rm{position:fixed;inset:0;background:rgba(40,20,30,.6);z-index:99999;display:none;align-items:center;justify-content:center;padding:16px}\n#im-rm.on{display:flex}\n#im-rm .mb{background:#fff;border-radius:22px;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);max-width:820px;width:100%;max-height:92vh;position:relative;font-family:\"Pretendard\",\"Apple SD Gothic Neo\",\"Noto Sans KR\",sans-serif;color:#4a2b3a}\n@media(max-width:640px){#im-rm .mb{grid-template-columns:1fr;overflow:auto}}\n#im-rm video{width:100%;aspect-ratio:9/16;max-height:86vh;object-fit:cover;background:#000;display:block}\n#im-rm .mi{padding:24px;text-align:left;display:flex;flex-direction:column;gap:12px}\n#im-rm .mi h3{margin:0;font-size:17px}\n#im-rm .mi .sm{font-size:13px;color:#9a7a8a}\n#im-rm .pp{display:flex;justify-content:space-between;align-items:center;border:1px solid #f4cfe0;border-radius:14px;padding:13px 14px;text-decoration:none;color:#4a2b3a;background:#fff0f6;font-size:14px}\n#im-rm .pp span:last-child{color:#e86aa3;font-weight:700;font-size:13px}\n#im-rm .ig{font-size:12px;color:#9a7a8a;text-decoration:none;margin-top:auto}\n#im-rm .ig:hover{color:#e86aa3}\n#im-rm .x{position:absolute;top:10px;right:12px;width:34px;height:34px;border-radius:50%;border:0;background:rgba(255,255,255,.92);font-size:16px;cursor:pointer;z-index:2;color:#4a2b3a}\n";document.head.appendChild(st);
  if(!document.querySelector('link[href*="Cherry+Bomb+One"]')){var lf=document.createElement('link');lf.rel='stylesheet';lf.href='https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap';document.head.appendChild(lf);}
  var BASE='https://cdn.jsdelivr.net/gh/idangclub-code/idang-media@main/';
  /* 사이트 코드가 특정 버전(@커밋)으로 불렀으면 같은 버전의 파일을 쓰도록 */
  var CS=document.currentScript&&document.currentScript.src||'';var VM=CS.match(/^(https:\/\/cdn\.jsdelivr\.net\/gh\/idangclub-code\/idang-media@[^/]+\/)/);var SCR=VM?VM[1]:BASE;
  /* 영상·썸네일도 같은 버전에서 불러오기 (@main 은 jsDelivr 캐시 때문에 새 파일이 늦게 뜰 수 있음) */
  BASE=SCR;
  var IG='https://www.instagram.com/idang.club/';
  /* 몰별 언어: 국문(idang.club) / EN(idanglobal) / JP(idangjapan) / CN(idangchina) — 상품 idx 는 4개 몰 공통 */
  var H=location.hostname, LANG=/idanglobal/.test(H)?'en':/idangjapan/.test(H)?'ja':/idangchina/.test(H)?'zh':'ko';
  var TX={
    ko:{sub:'아이당으로 완성한 나만의 스타일을 <b>@idang.club</b> 태그해서 공유해 주세요',items:'이 영상 속 아이템 {n}개',go:'보러가기 ›',ig:'@idang.club 인스타 보기 ↗',prev:'이전',next:'다음',close:'닫기'},
    en:{sub:'Tag <b>@idang.club</b> and share your own idang style',items:'Items in this video: {n}',go:'Shop ›',ig:'See @idang.club on Instagram ↗',prev:'Previous',next:'Next',close:'Close'},
    ja:{sub:'<b>@idang.club</b> をタグ付けして、あなたのアイダンスタイルをシェアしてね',items:'この動画のアイテム {n}点',go:'見る ›',ig:'@idang.club のInstagramを見る ↗',prev:'前へ',next:'次へ',close:'閉じる'},
    zh:{sub:'标记 <b>@idang.club</b>，分享你的 idang 穿搭吧',items:'视频中的单品 {n}件',go:'去看看 ›',ig:'查看 @idang.club 的 Instagram ↗',prev:'上一个',next:'下一个',close:'关闭'}
  }[LANG];
  /* 해외몰: 상품 링크는 /shop_view/?idx= 로, 상품명은 그 몰의 상품명으로 바꿔서 보여줌 */
  var NM={};
  function plink(u){if(LANG==='ko')return u;var m=u.match(/idx=(\d+)/);return m?'/shop_view/?idx='+m[1]:u;}
  function pname(p,cb){if(LANG==='ko')return cb(p[0]);var u=plink(p[1]);if(NM[u])return cb(NM[u]);
    fetch(u).then(function(r){return r.text()}).then(function(t){var m=t.match(/<title>([^<]*)<\/title>/);NM[u]=m?m[1].split(' : ')[0].trim():p[0];cb(NM[u])}).catch(function(){cb('')});}
  /* 상품별 영상 목록: key = 상품명(페이지 제목 앞부분), v = 영상 파일, cap = 설명, items = 영상 속 상품 */
  var REELS={
    'hime ribbon':{items:[['히메리본백','/shop_view/?idx=780']],v:[
      ['hime/hime_DW_WFsYkow3','신상 언박싱 · 리본 디테일'],
      ['hime/hime_Dajt9YCBob0','착용 룩북'],
      ['hime/hime_De1KQ4kp62R','3컬러 비교'],
      ['hime/hime_DebpWwutyBw','왓츠인마이백'],
      ['hime/hime_DbGjj7Eyh-q','착용 코디'],
      ['hime/hime_Dba2QX9h992','데일리 착용']
    ]},
    /* 컬러별 상세페이지는 'idx:번호' 로 따로 지정 (같은 상품명이어도 컬러마다 다른 영상) */
    'idx:32':{items:[['펄핑크 스쿨백','/shop_view/?idx=32']],v:[
      ['school/school_DZ-aR4ONOwe','스쿨백 데일리 착용'],
      ['school/school_DelZ8toR7n_','스쿨백 제품 컷'],
      ['school/school_C-uPOIrpkYf','키링 꾸민 스쿨백'],
      ['school/school_DAqHqfpvANy','펄핑크 스쿨백'],
      ['school/school_C6jCMVEJuQW','스쿨백 코디 모음'],
      ['school/school_DDHY3M3ykfJ','헬로키티 스쿨백'],
      ['school/school_DEzoP_Myybb','스쿨백 꾸미기'],
      ['school/school_DGdLRxfyqb5','스쿨백 언박싱']
    ]},
    'idx:97':{items:[['아이보리 스쿨백 미디움','/shop_view/?idx=97']],v:[
      ['school/school_C4sowKGpvfn','아이보리 스쿨백 왓츠인마이백']
    ]},
    'idx:71':{items:[['펄핑크 스쿨백 미디움','/shop_view/?idx=71']],v:[
      ['school/schoolmed_DFW4222pRav','펄핑크 스쿨백 미디움'],
      ['school/schoolmed_C6eR2FppiAM','여행 가방 코디'],
      ['school/schoolmed_C84ty-FSGBm','헬로키티 스쿨백 미디움'],
      ['school/school_DEzoP_Myybb','스쿨백 꾸미기'],
      ['school/schoolmed_DWoErbbgTWK','스쿨백 착용'],
      ['school/school_DelZ8toR7n_','스쿨백 제품 컷']
    ]},
    'idx:99':{items:[['펄핑크 스쿨백 미니','/shop_view/?idx=99']],v:[
      ['school/schoolmini_C71ftUbv5vq','펄핑크 스쿨백 미니'],
      ['school/schoolmini_C8zjGBXStfW','왓츠인마이백'],
      ['school/schoolmini_DUzzuTSgfQg','스쿨백 미니 착용'],
      ['school/schoolmed_DWoErbbgTWK','스쿨백 착용']
    ]},
    'idx:219':{items:[['리본 미디움 스쿨백 핑크','/31/?idx=219']],v:[
      ['ribbon/ribbonmed_DdTqVsytZpa','왓츠인마이백 · 핑크']
    ]},
    'idx:670':{items:[['리본 미디움 스쿨백 핑크','/31/?idx=670']],v:[
      ['ribbon/ribbonmed_DdTqVsytZpa','왓츠인마이백 · 핑크']
    ]},
    'idx:540':{items:[['리본 미디움 페일핑크','/31/?idx=540']],v:[
      ['ribbon/ribbonmed_DTutRKQAf0Y','페일핑크 착용 모음']
    ]},
    'idx:669':{items:[['리본 미디움 호피','/31/?idx=669']],v:[
      ['ribbon/ribbonmed_DZ_yyXaM9-m','호피 스쿨백 꾸미기']
    ]},
    'idx:474':{items:[['슈가롤 미니 화이트','/shop_view/?idx=474']],v:[
      ['sugar/sugar_DOEWdrqgUPj','슈가롤 화이트'],['sugar/sugar_DRwQMMXAWQ-','슈가롤 화이트 착용']
    ]},
    'idx:633':{items:[['슈가롤 미니 화이트','/shop_view/?idx=633']],v:[
      ['sugar/sugar_DOEWdrqgUPj','슈가롤 화이트'],['sugar/sugar_DRwQMMXAWQ-','슈가롤 화이트 착용']
    ]},
    'ribbon diary':{items:[['리본 다이어리','/shop_view/?idx=640']],v:[
      ['diary/diary_DWadCq7gXEo','리본 다이어리'],['diary/diary_DV1EGFFAYJY','리본 다이어리 · 백팩 코디']
    ]},
    'sailor coat':{items:[['세일러 코트','/shop_view/?idx=531']],v:[
      ['sailor/sailor_DWd7MC4pbcG','세일러 코트 · 하루 엔젤']
    ]},
    'ita medium':{items:[['이타 스쿨백','/shop_view/?idx=228']],v:[
      ['ita/ita_DWJp0jfAbuC','이타 스쿨백 꾸미기']
    ]},
    'usagi skirt':{items:[['우사기 스커트','/shop_view/?idx=523']],v:[
      ['skirt/usagi_DU497D1AcZe','Hearts2Hearts 착용']
    ]},
    'kirakira wallet':{items:[['키라키라 카드지갑','/76/?idx=743']],v:[
      ['wallet/kira_DZEyDRaJ-r7','키라키라 카드지갑 디테일'],
      ['wallet/kira_DYCsp3rtO-S','키라키라 언박싱']
    ]}
  };
  REELS['pompom coat']={items:[['폼폼 코트','/shop_view/?idx=489']],v:[
    ['pompom/coat_DDlt2YIJiJw','폼폼 코트 핑크'],['pompom/coat_DOG0DiqAQ-h','폼폼 코트 착용'],['pompom/coat_DUycwjokgi4','폼폼 코트 코디'],['pompom/coat_DSSI6yMgfO6','폼폼 코트 착용'],['pompom/coat_DGdNEJnyTBw','폼폼 코트 후기']
  ]};
  REELS['pompom half']={items:[['폼폼 하프 코트','/shop_view/?idx=532']],v:[
    ['pompom/half_DS1wnAcAZw9','폼폼 하프 코트'],['pompom/half_DQPLkjSgZar','딸기우유 코트'],['pompom/half_DUa9noGgYJw','폼폼 하프 코트 착용']
  ]};
  /* 하루 인형: 하루 계열 상품 전부 같은 영상 */
  /* 하루 인형: 하루 계열 상품 전부 같은 영상. 영상마다 실제로 나오는 제품을 3번째 칸에 적어둠 */
  var H_ANGEL=['엔젤 하루','/shop_view/?idx=613'], H_MINI=['하루 미니','/shop_view/?idx=598'];
  var HARU={items:[H_ANGEL],v:[
    ['haru/haru_DLc0tbBpRcU','엔젤 하루 키링',[H_ANGEL]],
    ['haru/haru_DQwuj_hgfCs','하루 엔젤 미니',[H_MINI]],
    ['haru/haru_DapEOdMQlcl','하루 인형'],
    ['haru/haru_Da0hecYyuq2','하루 인형'],
    ['haru/haru_DaDeAt_hPg4','Hearts2Hearts 지우 · 엔젤 하루',[H_ANGEL]]
  ]};
  ['angel haru','haru mini','cape haru','hime haru','spangle haru','hoppy haru'].forEach(function(k){REELS[k]=HARU});
  REELS['cape haru']={items:[['케이프 하루','/shop_view/?idx=681']],v:[['haru/caharu_DTs7Ir2ki4d','케이프 하루',[['케이프 하루','/shop_view/?idx=681']]]].concat(HARU.v)};
  REELS['idx:677']={items:[['스쿨백 미니 핫핑크','/31/?idx=677'],['스쿨백 미디움 핫핑크','/31/?idx=786']],v:[['school/schoolmini_DaDYjsmhXBe','핫핑크 스쿨백 미니 · 하트 키링']]};
  REELS['idx:786']=REELS['idx:677'];
  /* 리본우사기 핑크그레이 (2026-11-10): 자켓 789 · 스커트 790 · 셋업 791 */
  (function(){var J=['리본우사기 자켓','/shop_view/?idx=789'],S=['리본우사기 스커트','/shop_view/?idx=790'];
    var RU={items:[J,S],v:[['usagi/ribbonusagi_lookbook','리본우사기 셋업 착용'],['usagi/ribbonusagi_360','리본우사기 360°']]};
    ['ribbon usagi jacket','ribbon usagi skirt','ribbon usagi setup'].forEach(function(k){REELS[k]=RU});})();
  function key(){var m=location.search.match(/[?&]idx=(\d+)/);if(m&&REELS['idx:'+m[1]])return 'idx:'+m[1];var t=(document.title||'').split(' : ')[0].trim().toLowerCase().replace(/\s+/g,' ');return REELS[t]?t:null;}
  var bag='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 13H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';
  function build(){
    if(document.getElementById('im-reels'))return;
    var k=key(); if(!k||!/[?&]idx=\d+/.test(location.search))return;
    var pd=document.getElementById('prod_detail'); if(!pd)return;
    var sec=pd.closest('.section_wrap')||pd; var R=REELS[k];
    var w=document.createElement('section'); w.id='im-reels';
    w.innerHTML='<h2 class="rt">idang girls\' moments ♡</h2><p class="rs">'+TX.sub+'</p><div class="rw"><button class="ra l" aria-label="'+TX.prev+'">‹</button><div class="rr"></div><button class="ra r" aria-label="'+TX.next+'">›</button></div>';
    var row=w.querySelector('.rr');
    R.v.forEach(function(it,i){
      var b=document.createElement('button'); b.className='rc'; b.setAttribute('aria-label',it[1]);
      b.innerHTML='<video muted loop playsinline preload="none" poster="'+BASE+it[0]+'.jpg" data-src="'+BASE+it[0]+'.mp4"></video>';
      b.onclick=function(){openM(R,i)}; row.appendChild(b);
    });
    w.querySelector('.l').onclick=function(){row.scrollBy({left:-row.clientWidth*.75,behavior:'smooth'})};
    w.querySelector('.r').onclick=function(){row.scrollBy({left:row.clientWidth*.75,behavior:'smooth'})};
    /* 구매 박스 바로 아래(상세 탭 위)에 넣기 — 없으면 예전처럼 섹션 뒤 */
    var gw=pd.querySelector('.goods_wrapper');
    /* PC: 구매 박스 아래 / 모바일(세로 배치): 상품 사진 바로 아래 */
    var imgCol=gw&&gw.children[0], mq=window.matchMedia?window.matchMedia('(max-width:991px)'):null;
    function place(){
      if(mq&&mq.matches&&imgCol&&imgCol.parentNode===gw){w.classList.add('mob');w.style.margin='';if(w.previousSibling!==imgCol)gw.insertBefore(w,imgCol.nextSibling);}
      else{w.classList.remove('mob');if(gw&&gw.parentNode){w.style.margin='28px auto 8px';if(w.previousSibling!==gw)gw.parentNode.insertBefore(w,gw.nextSibling);} else if(!w.parentNode)sec.parentNode.insertBefore(w,sec.nextSibling);}
    }
    place(); if(mq){if(mq.addEventListener)mq.addEventListener('change',place);else if(mq.addListener)mq.addListener(place);}
    /* 화살표: 넘길 게 있을 때만 표시 (처음엔 왼쪽 숨김, 끝에선 오른쪽 숨김) */
    var la=w.querySelector('.l'), ra=w.querySelector('.r');
    function arrows(){var max=row.scrollWidth-row.clientWidth;la.hidden=row.scrollLeft<=4;ra.hidden=row.scrollLeft>=max-4||max<=4;}
    row.addEventListener('scroll',arrows,{passive:true}); window.addEventListener('resize',arrows); setTimeout(arrows,60); setTimeout(arrows,800);
    /* 화면에 보일 때만 재생 */
    var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){if(!v.src)v.src=v.dataset.src;var p=v.play();if(p&&p.catch)p.catch(function(){});}else{v.pause();}})},{threshold:.4}):null;
    [].forEach.call(row.querySelectorAll('video'),function(v){if(io)io.observe(v);else{v.src=v.dataset.src;v.autoplay=true;}});
  }
  function openM(R,i){
    var m=document.getElementById('im-rm');
    if(!m){m=document.createElement('div');m.id='im-rm';m.innerHTML='<div class="mb"><button class="x" aria-label="닫기">✕</button><video controls playsinline loop></video><div class="mi"></div></div>';document.body.appendChild(m);
      m.addEventListener('click',function(e){if(e.target===m||e.target.className==='x')close()});}
    var it=R.v[i], v=m.querySelector('video'); v.poster=BASE+it[0]+'.jpg'; v.src=BASE+it[0]+'.mp4'; v.muted=false;
    var its=it[2]||R.items, mi=m.querySelector('.mi');
    mi.innerHTML='<div class="sm">@idang.club</div><h3>'+(LANG==='ko'?it[1]:'')+'</h3><div class="sm">'+TX.items.replace('{n}',its.length)+'</div>'+its.map(function(p){return '<a class="pp" href="'+plink(p[1])+'"><span>'+(LANG==='ko'?p[0]:'')+'</span><span>'+TX.go+'</span></a>'}).join('')+'<a class="ig" href="'+IG+'" target="_blank" rel="noopener">'+TX.ig+'</a>';
    if(LANG!=='ko'){var sp=mi.querySelectorAll('.pp span:first-child');its.forEach(function(p,j){pname(p,function(n){sp[j].textContent=n;if(j===0)mi.querySelector('h3').textContent=n;})});}
    m.querySelector('.x').setAttribute('aria-label',TX.close);
    m.classList.add('on'); var p=v.play(); if(p&&p.catch)p.catch(function(){v.muted=true;v.play();});
  }
  function close(){var m=document.getElementById('im-rm');if(!m)return;var v=m.querySelector('video');v.pause();v.removeAttribute('src');v.load();m.classList.remove('on');}
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  /* 리뷰 모음 페이지(/reviews)에서 쓰도록 공개 + reviews.js 불러오기 */
  /* 오르골 BGM (여러 곡 랜덤) — 4개 몰 공통 */
  (function(){if(window.__idangBgm)return;var b=document.createElement('script');b.src=SCR+'site/bgm.js?v='+Math.floor(Date.now()/36e5);b.defer=true;document.head.appendChild(b);})();
  window.__IM_REELS=REELS; window.__imReelsOpen=openM;
  if(/^\/reviews\/?$/.test(location.pathname)){var rs=document.createElement('script');rs.src=SCR+'site/reviews.js?v='+Math.floor(Date.now()/36e5);rs.defer=true;document.head.appendChild(rs);}
  var n=0,t=setInterval(function(){build();if(document.getElementById('im-reels')||++n>40)clearInterval(t)},250);
})();
