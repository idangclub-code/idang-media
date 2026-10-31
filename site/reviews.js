/* IDANG REVIEWS — /reviews 페이지: 릴스 모음 + 전체 구매평 모아보기
   - 후기는 각 상품의 구매평을 실시간으로 불러옵니다(관리자에서 숨긴 후기는 자동 제외).
   - 상품 목록(P)은 후기 많은 순. 새 상품 후기를 넣으려면 P에 [상품번호,'이름'] 추가. */
(function(){
  if(window.__imRvPage)return;window.__imRvPage=1;
  var P=[[32,'school bag'],[71,'school medium'],[51,'ribbon bag'],[105,'angeling medium'],[108,'shearling jacket'],[180,'sakura backpack'],[477,'pink hoppy'],[489,'pompom coat'],[532,'pompom half'],[572,'angel pompom'],[575,'angel school'],[104,'angeling school'],[29,'school bag'],[174,'ribbon wallet'],[182,'mini backpack'],[490,'아이브 ♡'],[54,'school bag mini'],[224,'ribbon mini'],[520,'pompom coat'],[574,'pompom half'],[613,'Angel Haru'],[55,'fur school mini'],[99,'school bag mini'],[222,'ribbon mini'],[223,'ribbon mini'],[239,'sakura backpack'],[275,'원영♡'],[511,'velvet skirt'],[641,'hime ribbon'],[783,'hime ribbon'],[39,'ribbon skirt'],[53,'ribbon bag'],[121,'diary wallet'],[178,'heart school'],[238,'school medium'],[240,'sakura tote'],[256,'school skirt'],[455,'ribbon pin'],[509,'velvet skirt'],[531,'sailor coat'],[780,'hime ribbon'],[57,'heart chain bag'],[59,'tennis skirt'],[75,'chain bag'],[109,'shearling jacket'],[185,'ribbon diary'],[228,'ita medium'],[612,'Angel Haru'],[639,'mini backpack'],[640,'ribbon diary'],[696,'ita medium'],[68,'mini backpack'],[78,'heart bucket bag'],[111,'mini back pack'],[183,'sakura tote'],[220,'ribbon medium'],[221,'ribbon medium'],[242,'leaf blouse'],[247,'school jacket'],[251,'sailor blouse'],[254,'tie blouse'],[255,'tie blouse'],[258,'school skirt'],[259,'sakura skirt'],[277,'sakura school'],[281,'ribbon blouse'],[290,'school skirt'],[450,'Angel Haru'],[530,'사나♡'],[569,'ribbon medium'],[573,'angel school'],[586,'hime diary'],[694,'school mini'],[781,'ribbon mini'],[52,'ribbon bag'],[62,'ribbon knit'],[136,'school medium'],[219,'ribbon medium'],[226,'star chain bag'],[230,'ita medium'],[244,'sakura school'],[260,'sakura skirt'],[263,'pumpkin shorts'],[279,'sailor minidress'],[282,'아일릿♡'],[292,'pumpkin top'],[454,'ribbon pin'],[506,'fur velvet top'],[508,'fur velvet top'],[510,'fur velvet top'],[521,'usagi hoodie'],[522,'usagi hoodie'],[523,'usagi skirt'],[527,'babydoll blouse'],[540,'ribbon medium'],[546,'mini backpack'],[577,'angel school'],[582,'babydoll set'],[663,'dolly onepiece'],[673,'school mini+'],[742,'angel diary'],[60,'tennis skirt'],[74,'chain bag mini'],[79,'heart bucket bag'],[80,'angel school'],[83,'shirring top'],[85,'eyelet skirt'],[97,'school medium'],[112,'mini backpack'],[113,'school bag square'],[114,'school bag square'],[115,'school bag square'],[118,'shirring blouse'],[131,'heart card wallet'],[139,'idang girls club'],[229,'ita medium'],[237,'school bag mini'],[243,'sailor minidress'],[257,'school skirt'],[269,'star t-shirt'],[272,'training shorts'],[273,'bunny hood'],[276,'bunny hat'],[283,'츄♡'],[286,'midi socks'],[287,'knee socks'],[291,'sakura school'],[474,'sugar roll mini'],[478,'sugar roll mini'],[507,'velvet skirt'],[524,'미나♡'],[529,'babydoll skirt'],[542,'ribbon mini'],[583,'babydoll set'],[587,'angel diary'],[589,'mini backpack'],[633,'sugar roll mini'],[661,'hime onepiece'],[665,'kirakira dress'],[667,'big bunny hat'],[679,'spangle haru'],[680,'hime haru'],[681,'cape haru'],[733,'postcard set'],[740,'ribbon wallet (ap)'],[766,'mashmello tee'],[769,'baby tee'],[56,'school bag mini'],[58,'tennis skirt'],[63,'ribbon knit'],[72,'chain bag mini'],[81,'lace check skirt'],[86,'slip dress'],[102,'school mini'],[135,'school medium'],[179,'sakura school'],[181,'mini backpack'],[186,'ribbon diary'],[225,'star chain bag'],[227,'star chain bag'],[241,'sakura school'],[264,'pumpkin mini'],[268,'star t-shirt'],[271,'training shorts'],[274,'bunny hood'],[278,'sailor minidress'],[288,'over-the-knee'],[289,'socks set'],[294,'あい tote'],[295,'s.windbreaker'],[305,'leaf blouse'],[469,'yui T-shirt'],[471,'i T-shirt'],[479,'sugar roll mini'],[528,'babydoll blouse'],[543,'fur school mini'],[545,'fur school mini'],[555,'angel tail'],[570,'angel pompom'],[585,'hime card'],[591,'usagi hoodie'],[596,'angel t-shirt'],[597,'angel t-shirt'],[598,'haru mini'],[634,'sugar roll mini'],[647,'bunny pants'],[648,'hime t shirts'],[652,'kira sleeveless'],[653,'garter shorts'],[655,'ribbon pants'],[656,'gals club jacket'],[658,'gals club skirt'],[659,'gals club skirt'],[660,'balloon dress'],[662,'hime onepiece'],[669,'ribbon medium'],[670,'ribbon medium'],[675,'ribbon mini'],[676,'ribbon mini'],[682,'hoppy haru'],[692,'gals club setup'],[693,'gals club setup'],[719,'kira tail'],[720,'haru clip'],[723,'pin set'],[724,'logo sticker'],[727,'gyaru sticker'],[728,'gals die-cut'],[730,'gyaru die-cut'],[732,'diary paper'],[734,'full set'],[743,'kirakira wallet'],[744,'kirakira wallet'],[745,'kirakira wallet'],[753,'hime omamori'],[754,'gyaru omamori'],[755,'gals keyring'],[760,'hime ribbon'],[761,'hime ribbon'],[762,'kirakira ball cap'],[763,'star ball cap'],[767,'mashmello tee'],[770,'baby tank'],[771,'hime mini dress'],[772,'hime blouse'],[773,'sweatpants'],[774,'sweatpants']];
  var BASE='https://cdn.jsdelivr.net/gh/idangclub-code/idang-media@main/';
  var IG='https://www.instagram.com/idang.club/';
  var css="\n#im-rvp{max-width:1512px;margin:0 auto;padding:36px 16px 80px;font-family:\"Pretendard\",\"Apple SD Gothic Neo\",\"Noto Sans KR\",sans-serif;color:#4a2b3a}\n#im-rvp .hd{text-align:center;margin-bottom:30px}\n#im-rvp .hd h1{font-family:\"Cherry Bomb One\",\"Pretendard\",cursive;font-weight:400;color:#e86aa3;font-size:clamp(30px,4.6vw,48px);margin:0 0 8px;letter-spacing:.5px}\n#im-rvp .hd p{margin:0;font-size:14px;color:#9a7a8a}\n#im-rvp .hd p b{color:#e86aa3}\n#im-rvp h2{font-family:\"Cherry Bomb One\",\"Pretendard\",cursive;font-weight:400;color:#e86aa3;font-size:clamp(22px,3vw,30px);margin:0 0 4px}\n#im-rvp .sub{font-size:13px;color:#9a7a8a;margin:0 0 16px}\n#im-rvp .rl{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none;padding-bottom:6px;margin-bottom:46px}\n#im-rvp .rl::-webkit-scrollbar{display:none}\n#im-rvp .rlc{flex:0 0 calc((100% - 60px)/6);aspect-ratio:9/16;border-radius:18px;overflow:hidden;position:relative;cursor:pointer;background:#ffd9e8;border:0;padding:0;scroll-snap-align:start}\n@media(max-width:900px){#im-rvp .rlc{flex-basis:calc((100% - 24px)/3)}}\n@media(max-width:560px){#im-rvp .rlc{flex-basis:44%}}\n#im-rvp .rlc video{width:100%;height:100%;object-fit:cover;display:block}\n#im-rvp .rlc span{position:absolute;left:8px;right:8px;bottom:8px;background:rgba(255,255,255,.92);border-radius:10px;padding:5px 8px;font-size:11px;font-weight:700;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#4a2b3a}\n#im-rvp .tb{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px}\n#im-rvp .chips{display:flex;gap:8px}\n#im-rvp .chips button{border:2px solid #f4cfe0;background:#fff;color:#c2557f;border-radius:99px;padding:8px 16px;font-size:13px;font-weight:700;cursor:pointer}\n#im-rvp .chips button.on{background:#f37fb2;border-color:#f37fb2;color:#fff}\n#im-rvp .cnt{font-size:13px;color:#9a7a8a}\n#im-rvp .ft{display:flex;flex-direction:column;gap:12px;margin-bottom:14px}\n#im-rvp .cats{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;border-bottom:2px solid #ffe0ec}\n#im-rvp .cats::-webkit-scrollbar{display:none}\n#im-rvp .cats button{flex:0 0 auto;border:0;background:none;padding:10px 14px;font-family:\"Cherry Bomb One\",\"Pretendard\",cursive;font-size:15px;color:#c9a3b4;cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-2px}\n#im-rvp .cats button.on{color:#e86aa3;border-bottom-color:#f37fb2}\n#im-rvp .sr{position:relative;max-width:360px;width:100%}\n#im-rvp .sr input{width:100%;box-sizing:border-box;border:2px solid #f4cfe0;border-radius:99px;padding:10px 16px 10px 38px;font-size:14px;color:#4a2b3a;background:#fff;outline:none;font-family:inherit}\n#im-rvp .sr input:focus{border-color:#f37fb2}\n#im-rvp .sr svg{position:absolute;left:13px;top:50%;width:16px;height:16px;margin-top:-8px;color:#e86aa3}\n#im-rvp .gr{columns:4 260px;column-gap:14px}\n#im-rvp .cd{break-inside:avoid;margin:0 0 14px;background:#fff;border:2px solid #ffe0ec;border-radius:20px;overflow:hidden;box-shadow:0 6px 18px rgba(243,127,178,.12);display:block}\n#im-rvp .cd .ph{position:relative;background:#fff0f6;cursor:zoom-in}\n#im-rvp .cd .ph img{width:100%;display:block}\n#im-rvp .cd .ph em{position:absolute;right:10px;top:10px;background:rgba(74,43,58,.65);color:#fff;font-style:normal;font-size:11px;font-weight:700;border-radius:99px;padding:3px 8px}\n#im-rvp .cd .bd{padding:12px 14px 14px;display:flex;flex-direction:column;gap:6px}\n#im-rvp .cd .st{color:#f37fb2;font-size:13px;letter-spacing:2px;font-family:Arial,sans-serif}\n#im-rvp .cd .tx{margin:0;font-size:13.5px;line-height:1.6;color:#444;white-space:pre-line;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden;cursor:pointer;word-break:keep-all;overflow-wrap:anywhere}\n#im-rvp .cd .tx.op{-webkit-line-clamp:unset;display:block}\n#im-rvp .cd .mt{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:12px;color:#9a7a8a}\n#im-rvp .cd .mt a{color:#e86aa3!important;font-weight:700;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#im-rvp .more{display:block;margin:20px auto 0;border:2px dashed #f37fb2;background:#fff;color:#e2508a;border-radius:99px;padding:12px 26px;font-size:14px;font-weight:700;cursor:pointer}\n#im-rvp .ld{text-align:center;color:#c9a3b4;font-size:13px;padding:18px 0}\n#im-zm{position:fixed;inset:0;z-index:99999;background:rgba(40,20,30,.82);display:none;align-items:center;justify-content:center;padding:16px}\n#im-zm.on{display:flex}\n#im-zm img{max-width:100%;max-height:90vh;border-radius:14px}\n#im-zm button{position:absolute;top:14px;right:16px;width:38px;height:38px;border-radius:50%;border:0;background:#fff;font-size:16px;cursor:pointer}\n";
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function mask(n){n=(n||'').trim();if(!n||/관리자|오프라인|admin/i.test(n))return 'idang club';return n.charAt(0)+'**';}
  var root,grid,cntEl,moreBtn,ldEl,mode='Y',queue=[],seen={},shown=0,busy=false,sentinelObs,cat='ALL',q='',gen=0;
  var CATS=['ALL','BAG','CLOTHING','WALLET','GOODS','ACC'];
  /* 상품명으로 카테고리 판단 (위에서부터 먼저 맞는 것) */
  function catOf(n){n=n.toLowerCase();
    if(/sticker|die-cut|postcard|paper|omamori|keyring|haru|full set|pin set|poster|stand|towel/.test(n))return 'GOODS';
    if(/wallet|diary|card/.test(n))return 'WALLET';
    if(/\bpin\b|clip|tail|cap|hat|socks|knee|angel pompom|hood\b/.test(n))return 'ACC';
    if(/skirt|coat|jacket|blouse|top|tee|t-shirt|t shirts|dress|onepiece|hoodie|pants|shorts|knit|setup|windbreaker|sleeveless|tank|sweatpants|half|babydoll set/.test(n))return 'CLOTHING';
    if(/bag|backpack|back pack|school|tote|medium|mini|ribbon|chain|bucket|ita|hoppy|angeling/.test(n))return 'BAG';
    return '';}
  /* 한글 검색어 → 상품명 영문 키워드 */
  var KO={'스쿨백':'school','미디움':'medium','미니':'mini','리본':'ribbon','히메':'hime','지갑':'wallet','다이어리':'diary','백팩':'backpack','사쿠라':'sakura','엔젤':'angel','폼폼':'pompom','코트':'coat','자켓':'jacket','재킷':'jacket','스커트':'skirt','치마':'skirt','블라우스':'blouse','티셔츠':'tee','후드':'hoodie','핀':'pin','포스터':'poster','스탠드':'stand','타월':'towel','키링':'keyring','토트':'tote','체인':'chain','하루':'haru','우사기':'usagi','갸루':'gyaru','걀즈':'gals','키라키라':'kirakira','모자':'cap','양말':'socks','원피스':'onepiece','세일러':'sailor','시어링':'shearling','벨벳':'velvet'};
  function terms(){var t=q.toLowerCase().trim();if(!t)return [];var en=[];Object.keys(KO).forEach(function(k){if(t.indexOf(k)>=0)en.push(KO[k])});return [t].concat(en);}
  function nameHit(n){var ts=terms();n=n.toLowerCase();return ts.some(function(t){return n.indexOf(t)>=0});}
  function pass(r){if(cat!=='ALL'&&catOf(r.name)!==cat)return false;var ts=terms();if(!ts.length)return true;var hay=(r.name+' '+r.text).toLowerCase();return ts.some(function(t){return hay.indexOf(t)>=0});}
  function reelsHtml(){
    var R=window.__IM_REELS||{},out=[],used={};
    Object.keys(R).forEach(function(k){var g=R[k];g.v.forEach(function(v,i){if(used[v[0]])return;used[v[0]]=1;out.push({k:k,i:i,f:v[0],c:v[1],p:g.items[0]})})});
    if(!out.length)return '';
    return '<h2>idang girls\' moments ♡</h2><p class="sub">아이당 인스타 릴스 모음 · 영상을 누르면 소리와 함께 크게 볼 수 있어요</p><div class="rl">'+out.map(function(o){return '<button class="rlc" data-k="'+esc(o.k)+'" data-i="'+o.i+'"><video muted loop playsinline preload="none" poster="'+BASE+o.f+'.jpg" data-src="'+BASE+o.f+'.mp4"></video><span>'+esc(o.p[0])+' · '+esc(o.c)+'</span></button>'}).join('')+'</div>';
  }
  function build(){
    if(document.getElementById('im-rvp'))return true;
    var hdr=document.getElementById('doz_header_wrap');if(!hdr)return false;
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    root=document.createElement('div');root.id='im-rvp';
    root.innerHTML='<div class="hd"><h1>IDANG REVIEWS</h1><p>아이당 걸즈가 남겨준 진짜 후기 ♡ 포토 후기 쓰면 <b>적립금</b>도 받아가세요</p></div>'+reelsHtml()+
      '<h2>real reviews ♡</h2><p class="sub">상품을 누르면 바로 보러 갈 수 있어요</p><div class="ft"><div class="cats">'+CATS.map(function(c,i){return '<button data-c="'+c+'"'+(i?'':' class="on"')+'>'+c+'</button>'}).join('')+'</div><div class="sr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input type="search" placeholder="상품명·후기 내용으로 검색 (예: 스쿨백, 펄핑크)" aria-label="후기 검색"></div></div><div class="tb"><div class="chips"><button data-m="Y" class="on">포토 후기</button><button data-m="N">전체 후기</button></div><div class="cnt"></div></div><div class="gr"></div><div class="ld">후기를 불러오는 중이에요 ♡</div><button class="more" hidden>후기 더 보기 ♡</button>';
    hdr.parentNode.insertBefore(root,hdr.nextSibling);
    grid=root.querySelector('.gr');cntEl=root.querySelector('.cnt');moreBtn=root.querySelector('.more');ldEl=root.querySelector('.ld');
    /* 릴스: 화면에 보일 때만 재생, 누르면 크게 */
    var vio='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){if(!v.src)v.src=v.dataset.src;var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})},{threshold:.4}):null;
    [].forEach.call(root.querySelectorAll('.rlc video'),function(v){if(vio)vio.observe(v);else{v.src=v.dataset.src;v.autoplay=true}});
    [].forEach.call(root.querySelectorAll('.rlc'),function(b){b.onclick=function(){var R=window.__IM_REELS;if(window.__imReelsOpen&&R)window.__imReelsOpen(R[b.dataset.k],+b.dataset.i)}});
    [].forEach.call(root.querySelectorAll('.chips button'),function(b){b.onclick=function(){if(b.classList.contains('on'))return;[].forEach.call(root.querySelectorAll('.chips button'),function(x){x.classList.toggle('on',x===b)});reset(b.dataset.m)}});
    moreBtn.onclick=function(){load(8)};
    [].forEach.call(root.querySelectorAll('.cats button'),function(b){b.onclick=function(){if(b.classList.contains('on'))return;[].forEach.call(root.querySelectorAll('.cats button'),function(x){x.classList.toggle('on',x===b)});cat=b.dataset.c;reset(mode)}});
    var inp=root.querySelector('.sr input'),tm;inp.addEventListener('input',function(){clearTimeout(tm);tm=setTimeout(function(){q=inp.value;reset(mode)},350)});
    var zm=document.createElement('div');zm.id='im-zm';zm.innerHTML='<button aria-label="닫기">✕</button><img alt="">';document.body.appendChild(zm);
    zm.onclick=function(){zm.classList.remove('on')};
    grid.addEventListener('click',function(e){var t=e.target;
      if(t.classList.contains('tx')){t.classList.toggle('op');return}
      var ph=t.closest&&t.closest('.ph');if(ph){zm.querySelector('img').src=ph.dataset.big;zm.classList.add('on')}});
    if('IntersectionObserver' in window){sentinelObs=new IntersectionObserver(function(es){if(es[0].isIntersecting&&!moreBtn.hidden)load(6)},{rootMargin:'600px'});sentinelObs.observe(moreBtn)}
    reset('Y');return true;
  }
  function reset(m){mode=m;gen++;busy=false;
    var list=P.filter(function(p){return cat==='ALL'||catOf(p[1])===cat});
    if(terms().length){var hit=list.filter(function(p){return nameHit(p[1])});if(hit.length)list=hit;}
    queue=list.map(function(p){return [p[0],p[1],1]});seen={};shown=0;grid.innerHTML='';cntEl.textContent='';ldEl.textContent='후기를 불러오는 중이에요 ♡';load(10)}
  function fetchOne(t){
    var body='prod_idx='+t[0]+'&review_page='+t[2]+'&qna_page=1&only_photo='+mode;
    return fetch('/shop/prod_review_pc_html.cm',{method:'POST',body:body,headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-Requested-With':'XMLHttpRequest'},credentials:'same-origin'}).then(function(r){return r.text()}).then(function(h){
      var d=new DOMParser().parseFromString(h,'text/html'),out=[];
      [].forEach.call(d.querySelectorAll('.list_review_inner'),function(li){
        var code=(li.className.match(/_comment_(c\w+)/)||[])[1]||Math.random();if(seen[code])return;seen[code]=1;
        var tx=li.querySelector('._review_body');if(tx){var dm=tx.querySelector('._dummy');if(dm)dm.remove()}
        var text=tx?tx.textContent.replace(/[ \t]+/g,' ').replace(/\n\s*\n+/g,'\n').trim():'';
        var imgs=[].map.call(li.querySelectorAll('[style*="background"]'),function(e){var m=(e.getAttribute('style')||'').match(/url\(["']?([^"')]+)/);return m?m[1]:null}).filter(Boolean);
        var cells=li.querySelectorAll('.table-cell'),meta=cells.length>1?cells[cells.length-1].textContent.replace(/\s+/g,' '):'';
        var dt=(meta.match(/\d{4}-\d{2}-\d{2}/)||[''])[0],nm=dt?meta.split(dt)[0]:'';
        var stars=li.querySelectorAll('.bt-star.active').length||5;
        if(!text&&!imgs.length)return;
        out.push({id:t[0],name:t[1],text:text,imgs:imgs,dt:dt,nm:mask(nm),st:stars});
      });
      var mx=0;(h.match(/changeContentPCTab\('review',(\d+)/g)||[]).forEach(function(s){var n=+s.match(/(\d+)$/)[1];if(n>mx)mx=n});
      if(mx>t[2])queue.push([t[0],t[1],t[2]+1]);
      return out;
    }).catch(function(){return []});
  }
  function card(r){
    var im=r.imgs[0],big=im?im.replace(/([?&]w=)\d+/,'$1'+'1000'):'',sm=im?im.replace(/([?&]w=)\d+/,'$1'+'600'):'';
    return '<div class="cd">'+(im?'<div class="ph" data-big="'+esc(big)+'"><img loading="lazy" src="'+esc(sm)+'" alt="'+esc(r.name)+' 후기 사진">'+(r.imgs.length>1?'<em>+'+(r.imgs.length-1)+'</em>':'')+'</div>':'')+
      '<div class="bd"><div class="st">'+'♥♥♥♥♥'.slice(0,r.st)+'</div>'+(r.text?'<p class="tx">'+esc(r.text)+'</p>':'')+
      '<div class="mt"><a href="/shop_view/?idx='+r.id+'">'+esc(r.name)+' ›</a><span>'+esc(r.nm)+(r.dt?' · '+r.dt.slice(2).replace(/-/g,'.'):'')+'</span></div></div></div>';
  }
  function load(n){
    if(busy)return;if(!queue.length){done();return}
    busy=true;ldEl.hidden=false;moreBtn.hidden=true;var my=gen,batch=queue.splice(0,n);
    Promise.all(batch.map(fetchOne)).then(function(rs){
      if(my!==gen)return;
      var all=[].concat.apply([],rs).filter(pass).sort(function(a,b){return a.dt<b.dt?1:-1});
      grid.insertAdjacentHTML('beforeend',all.map(card).join(''));shown+=all.length;
      cntEl.textContent='후기 '+shown.toLocaleString()+'개'+(queue.length?'+':'');
      busy=false;ldEl.hidden=true;
      if(!queue.length){done();return}
      moreBtn.hidden=false;
      if(all.length<6)load(n);
    });
  }
  function done(){ldEl.hidden=true;moreBtn.hidden=true;if(!shown){ldEl.hidden=false;ldEl.textContent=(q||cat!=='ALL')?'찾는 후기가 아직 없어요 ♡ 다른 단어로 검색해 보세요':'아직 후기가 없어요'}}
  var tries=0,t=setInterval(function(){if(build()||++tries>40)clearInterval(t)},250);
})();
