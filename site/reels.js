/* IDANG REELS — 상품 상세 하단 영상 (idang-media) */

(function(){
  if(window.__imReels)return;window.__imReels=1;
  var st=document.createElement('style');st.textContent="\n#im-reels{max-width:1200px;margin:56px auto 24px;padding:0 16px;text-align:center;font-family:\"Pretendard\",\"Apple SD Gothic Neo\",\"Noto Sans KR\",sans-serif;color:#4a2b3a}\n#im-reels .rt{font-family:\"Cherry Bomb One\",\"Pretendard\",cursive;font-size:clamp(24px,3.4vw,34px);margin:0 0 6px;color:#e86aa3;font-weight:400}\n#im-reels .rs{font-size:14px;color:#9a7a8a;margin:0 0 22px}\n#im-reels .rs b{color:#e86aa3}\n#im-reels .rw{position:relative}\n#im-reels .rr{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:6px}\n#im-reels .rr::-webkit-scrollbar{display:none}\n#im-reels .rc{flex:0 0 calc((100% - 36px)/4);aspect-ratio:9/16;border-radius:18px;overflow:hidden;position:relative;scroll-snap-align:start;cursor:pointer;background:#ffd9e8;border:0;padding:0}\n@media(max-width:768px){#im-reels .rc{flex-basis:calc((100% - 12px)/2)}}\n#im-reels video{width:100%;height:100%;object-fit:cover;display:block}\n#im-reels .rb{position:absolute;top:10px;left:10px;background:rgba(255,255,255,.95);color:#4a2b3a;border-radius:999px;padding:5px 10px 5px 8px;display:flex;align-items:center;gap:5px;font-size:13px;font-weight:700}\n#im-reels .rb svg{width:16px;height:16px}\n#im-reels .ra{position:absolute;top:50%;transform:translateY(-50%);width:42px;height:42px;border-radius:50%;border:0;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.12);cursor:pointer;font-size:20px;color:#4a2b3a;z-index:2}\n#im-reels .ra.l{left:-6px}#im-reels .ra.r{right:-6px}\n@media(max-width:768px){#im-reels .ra{display:none}}\n#im-rm{position:fixed;inset:0;background:rgba(40,20,30,.6);z-index:99999;display:none;align-items:center;justify-content:center;padding:16px}\n#im-rm.on{display:flex}\n#im-rm .mb{background:#fff;border-radius:22px;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);max-width:820px;width:100%;max-height:92vh;position:relative;font-family:\"Pretendard\",\"Apple SD Gothic Neo\",\"Noto Sans KR\",sans-serif;color:#4a2b3a}\n@media(max-width:640px){#im-rm .mb{grid-template-columns:1fr;overflow:auto}}\n#im-rm video{width:100%;aspect-ratio:9/16;max-height:86vh;object-fit:cover;background:#000;display:block}\n#im-rm .mi{padding:24px;text-align:left;display:flex;flex-direction:column;gap:12px}\n#im-rm .mi h3{margin:0;font-size:17px}\n#im-rm .mi .sm{font-size:13px;color:#9a7a8a}\n#im-rm .pp{display:flex;justify-content:space-between;align-items:center;border:1px solid #f4cfe0;border-radius:14px;padding:13px 14px;text-decoration:none;color:#4a2b3a;background:#fff0f6;font-size:14px}\n#im-rm .pp span:last-child{color:#e86aa3;font-weight:700;font-size:13px}\n#im-rm .ig{font-size:12px;color:#9a7a8a;text-decoration:none;margin-top:auto}\n#im-rm .ig:hover{color:#e86aa3}\n#im-rm .x{position:absolute;top:10px;right:12px;width:34px;height:34px;border-radius:50%;border:0;background:rgba(255,255,255,.92);font-size:16px;cursor:pointer;z-index:2;color:#4a2b3a}\n";document.head.appendChild(st);
  if(!document.querySelector('link[href*="Cherry+Bomb+One"]')){var lf=document.createElement('link');lf.rel='stylesheet';lf.href='https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap';document.head.appendChild(lf);}
  var BASE='https://cdn.jsdelivr.net/gh/idangclub-code/idang-media@main/';
  var IG='https://www.instagram.com/idang.club/';
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
    'school bag':{items:[['스쿨백','/shop_view/?idx=32']],v:[
      ['school/school_DZ-aR4ONOwe','스쿨백 데일리 착용'],
      ['school/school_DelZ8toR7n_','스쿨백 제품 컷'],
      ['school/school_C-uPOIrpkYf','키링 꾸민 스쿨백'],
      ['school/school_DAqHqfpvANy','펄핑크 스쿨백']
    ]},
    'kirakira wallet':{items:[['키라키라 카드지갑','/76/?idx=743']],v:[
      ['wallet/kira_DZEyDRaJ-r7','키라키라 카드지갑 디테일'],
      ['wallet/kira_DYCsp3rtO-S','키라키라 언박싱']
    ]},
    'ribbon medium':{items:[['리본 미디움 스쿨백','/31/?idx=219']],v:[
      ['ribbon/ribbonmed_DdTqVsytZpa','왓츠인마이백 · 핑크']
    ]}
  };
  function key(){var t=(document.title||'').split(' : ')[0].trim().toLowerCase();return REELS[t]?t:null;}
  var bag='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 13H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';
  function build(){
    if(document.getElementById('im-reels'))return;
    var k=key(); if(!k||!/[?&]idx=\d+/.test(location.search))return;
    var pd=document.getElementById('prod_detail'); if(!pd)return;
    var sec=pd.closest('.section_wrap')||pd; var R=REELS[k];
    var w=document.createElement('section'); w.id='im-reels';
    w.innerHTML='<h2 class="rt">idang girls\' moments ♡</h2><p class="rs">아이당으로 완성한 나만의 스타일을 <b>@idang.club</b> 태그해서 공유해 주세요</p><div class="rw"><button class="ra l" aria-label="이전">‹</button><div class="rr"></div><button class="ra r" aria-label="다음">›</button></div>';
    var row=w.querySelector('.rr');
    R.v.forEach(function(it,i){
      var b=document.createElement('button'); b.className='rc'; b.setAttribute('aria-label',it[1]);
      b.innerHTML='<video muted loop playsinline preload="none" poster="'+BASE+it[0]+'.jpg" data-src="'+BASE+it[0]+'.mp4"></video><span class="rb">'+bag+R.items.length+'</span>';
      b.onclick=function(){openM(R,i)}; row.appendChild(b);
    });
    w.querySelector('.l').onclick=function(){row.scrollBy({left:-row.clientWidth*.75,behavior:'smooth'})};
    w.querySelector('.r').onclick=function(){row.scrollBy({left:row.clientWidth*.75,behavior:'smooth'})};
    sec.parentNode.insertBefore(w,sec.nextSibling);
    /* 화면에 보일 때만 재생 */
    var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){if(!v.src)v.src=v.dataset.src;var p=v.play();if(p&&p.catch)p.catch(function(){});}else{v.pause();}})},{threshold:.4}):null;
    [].forEach.call(row.querySelectorAll('video'),function(v){if(io)io.observe(v);else{v.src=v.dataset.src;v.autoplay=true;}});
  }
  function openM(R,i){
    var m=document.getElementById('im-rm');
    if(!m){m=document.createElement('div');m.id='im-rm';m.innerHTML='<div class="mb"><button class="x" aria-label="닫기">✕</button><video controls playsinline loop></video><div class="mi"></div></div>';document.body.appendChild(m);
      m.addEventListener('click',function(e){if(e.target===m||e.target.className==='x')close()});}
    var it=R.v[i], v=m.querySelector('video'); v.poster=BASE+it[0]+'.jpg'; v.src=BASE+it[0]+'.mp4'; v.muted=false;
    m.querySelector('.mi').innerHTML='<div class="sm">@idang.club</div><h3>'+it[1]+'</h3><div class="sm">이 영상 속 아이템 '+R.items.length+'개</div>'+R.items.map(function(p){return '<a class="pp" href="'+p[1]+'"><span>'+p[0]+'</span><span>보러가기 ›</span></a>'}).join('')+'<a class="ig" href="'+IG+'" target="_blank" rel="noopener">@idang.club 인스타 보기 ↗</a>';
    m.classList.add('on'); var p=v.play(); if(p&&p.catch)p.catch(function(){v.muted=true;v.play();});
  }
  function close(){var m=document.getElementById('im-rm');if(!m)return;var v=m.querySelector('video');v.pause();v.removeAttribute('src');v.load();m.classList.remove('on');}
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  var n=0,t=setInterval(function(){build();if(document.getElementById('im-reels')||++n>40)clearInterval(t)},250);
})();
