// 由原 motion.html 拆出：动效词典（34 个动效 + 页面逻辑）。
(()=>{
const NS='http://www.w3.org/2000/svg';
const $defs=document.getElementById('fxdefs');
const h=(tag,cls,parent,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;if(parent)parent.appendChild(e);return e;};
const clamp=(x,a=0,b=1)=>x<a?a:x>b?b:x;
const lerp=(a,b,x)=>a+(b-a)*x;
const pr=(t,s,l)=>l<=0?(t>=s?1:0):clamp((t-s)/l);
const rnd=i=>{const s=Math.sin(i*12.9898+78.233)*43758.5453;return s-Math.floor(s);};
const sstep=x=>x*x*(3-2*x);
const C={ink:'#F3EFE6',orange:'#FF5A1F',blue:'#3B5BFF',cream:'#F3E7CF',yellow:'#FFC53D',dark:'#15171C'};

/* ── 缓动曲线 ── */
const EASE={
  linear:x=>x,
  outCubic:x=>1-Math.pow(1-x,3),
  inCubic:x=>x*x*x,
  inOutCubic:x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,
  outExpo:x=>x>=1?1:1-Math.pow(2,-10*x),
  inExpo:x=>x<=0?0:Math.pow(2,10*x-10),
  inOutExpo:x=>x<=0?0:x>=1?1:x<.5?Math.pow(2,20*x-10)/2:(2-Math.pow(2,-20*x+10))/2,
  outBack:(x,s=1.70158)=>{const c=s+1;return 1+c*Math.pow(x-1,3)+s*Math.pow(x-1,2);},
  spring:x=>x>=1?1:1-Math.exp(-6.5*x)*Math.cos(x*Math.PI*4.5),
};
const EASE_INFO={
  linear:['线性','linear','Linear'],
  outCubic:['缓出','cubic-bezier(.33,1,.68,1)','Ease Out'],
  inCubic:['缓入','cubic-bezier(.32,0,.67,0)','Ease In'],
  inOutCubic:['缓入缓出','cubic-bezier(.65,0,.35,1)','Ease In-Out'],
  outExpo:['急停','cubic-bezier(.16,1,.3,1)','Expo Out'],
  inExpo:['加速冲出','cubic-bezier(.7,0,.84,0)','Expo In'],
  inOutExpo:['急起急停','cubic-bezier(.87,0,.13,1)','Expo In-Out'],
  outBack:['回弹','cubic-bezier(.34,1.56,.64,1)','Back Out'],
  spring:['弹簧','物理弹簧，贝塞尔写不出来','Spring'],
};
const ez=(name,p)=>name==='outBack'?(x=>EASE.outBack(x,p&&p.back!=null?p.back:1.70158)):EASE[name];

/* ── 参数描述 ── */
const R=(key,label,min,max,step,val,unit='')=>({key,label,type:'range',min,max,step,val,unit});
const S=(key,label,opts,val)=>({key,label,type:'select',opts,val});
const EZ=(val,opts)=>({key:'ease',label:'曲线',type:'ease',val,opts});

/* ── 公用：场景 / 方向模糊 ── */
function scene(parent,kind,x){const s=h('div','scene '+kind,parent,`<div class="sc-tag">SCENE ${kind}</div><div class="sc-word">${kind==='A'?'第一幕':'第二幕'}</div>`);if(x)s.style.left=x+'px';return s;}
let filterSeq=0;
function makeCtx(){
  const made=[];
  return{
    dirBlur(){
      const id='db'+(filterSeq++);
      const f=document.createElementNS(NS,'filter');f.id=id;
      f.setAttribute('x','-10%');f.setAttribute('y','-10%');f.setAttribute('width','120%');f.setAttribute('height','120%');
      const g=document.createElementNS(NS,'feGaussianBlur');g.setAttribute('stdDeviation','0 0');f.appendChild(g);$defs.appendChild(f);made.push(f);
      return{css:`url(#${id})`,set(x,y){g.setAttribute('stdDeviation',`${x.toFixed(2)} ${y.toFixed(2)}`);}};
    },
    duotone(dk,lt){
      const id='dt'+(filterSeq++);
      const f=document.createElementNS(NS,'filter');f.id=id;f.setAttribute('color-interpolation-filters','sRGB');
      const hx=s=>[1,3,5].map(i=>(parseInt(s.slice(i,i+2),16)/255).toFixed(3));const a=hx(dk),b=hx(lt);
      f.innerHTML=`<feColorMatrix type="matrix" values=".3 .59 .11 0 0 .3 .59 .11 0 0 .3 .59 .11 0 0 0 0 0 1 0"/><feComponentTransfer><feFuncR type="table" tableValues="${a[0]} ${b[0]}"/><feFuncG type="table" tableValues="${a[1]} ${b[1]}"/><feFuncB type="table" tableValues="${a[2]} ${b[2]}"/></feComponentTransfer>`;
      $defs.appendChild(f);made.push(f);return `url(#${id})`;
    },
    cleanup(){made.forEach(f=>f.remove());made.length=0;}
  };
}
function typeTimes(p,n){const T=[];let acc=0;for(let i=0;i<n;i++){acc+=p.iv*(1+p.jit/100*(rnd(i+3)*2-1));T.push(acc);}return T;}
const TW_TEXT=[...'你只需要把想法说清楚。'];
function rampTable(p){
  const N=400,w=p.width/100;
  const sp=u=>{const d=Math.abs(u-.5)/(w/2);const k=d<=.6?1:d>=1?0:1-sstep((d-.6)/.4);return 1-(1-p.slow)*k;};
  const acc=[0];for(let i=1;i<=N;i++)acc.push(acc[i-1]+sp((i-.5)/N));
  const tot=acc[N];
  const pos=u=>{u=clamp(u);const f=u*N,i=Math.floor(f);if(i>=N)return 1;return lerp(acc[i],acc[i+1],f-i)/tot;};
  return{pos,sp};
}
function findOrigin(word,font){
  const W=960,H=540,c=document.createElement('canvas');c.width=W;c.height=H;
  const g=c.getContext('2d',{willReadFrequently:true});
  g.font=font;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(word,480,270);
  const d=g.getImageData(0,0,W,H).data;
  const filled=(x,y)=>{x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=W||y>=H)return false;return d[(y*W+x)*4+3]>128;};
  let best={x:480,y:270,score:-1};
  for(let y=150;y<=390;y+=3)for(let x=280;x<=680;x+=3){
    if(!filled(x,y))continue;
    let depth=0;
    for(let r=1;r<=22;r++){let ok=true;for(let a=0;a<8;a++){if(!filled(x+Math.cos(a*Math.PI/4)*r,y+Math.sin(a*Math.PI/4)*r)){ok=false;break;}}if(!ok)break;depth=r;}
    const score=depth-Math.hypot(x-480,y-270)*.03;
    if(score>best.score)best={x,y,score};
  }
  return best;
}
function paintPhoto(c,kind){
  const g=c.getContext('2d');g.setTransform(c.width/220,0,0,c.height/300,0,0);let gr;
  if(kind===0){
    gr=g.createLinearGradient(0,0,0,170);gr.addColorStop(0,'#F39A5B');gr.addColorStop(1,'#F6D1A0');g.fillStyle=gr;g.fillRect(0,0,220,170);
    g.fillStyle='#FFF1D6';g.beginPath();g.arc(110,150,34,0,7);g.fill();
    gr=g.createLinearGradient(0,170,0,300);gr.addColorStop(0,'#2F6F9E');gr.addColorStop(1,'#123C5C');g.fillStyle=gr;g.fillRect(0,170,220,130);
    g.fillStyle='rgba(255,226,180,.55)';for(let i=0;i<9;i++){const w=60-i*5;g.fillRect(110-w/2,182+i*12,w,3);}
  }else if(kind===1){
    gr=g.createLinearGradient(0,0,0,300);gr.addColorStop(0,'#8CC4EA');gr.addColorStop(1,'#E6F2F8');g.fillStyle=gr;g.fillRect(0,0,220,300);
    const m=(pts,col)=>{g.fillStyle=col;g.beginPath();g.moveTo(0,300);pts.forEach(([x,y])=>g.lineTo(x,y));g.lineTo(220,300);g.fill();};
    m([[0,170],[60,90],[100,140],[150,70],[220,150]],'#7B8FA6');
    g.fillStyle='#fff';g.beginPath();g.moveTo(150,70);g.lineTo(168,96);g.lineTo(132,96);g.fill();
    m([[0,210],[70,160],[130,200],[220,170]],'#3F7A4F');m([[0,260],[90,225],[220,250]],'#24502F');
  }else{
    gr=g.createLinearGradient(0,0,0,300);gr.addColorStop(0,'#2B1B4F');gr.addColorStop(1,'#B5577A');g.fillStyle=gr;g.fillRect(0,0,220,300);
    for(let i=0;i<7;i++){const x=i*34-6,w=30,hh=110+rnd(i+9)*120;g.fillStyle='#1B1630';g.fillRect(x,300-hh,w,hh);g.fillStyle='#FFD27A';
      for(let y=300-hh+10;y<290;y+=16)for(let xx=x+5;xx<x+w-5;xx+=9)if(rnd(xx*3+y)>.45)g.fillRect(xx,y,4,6);}
  }
}
function bulgePer(p){if(p.speed<=0)return 4000;const one=p.cell/p.speed*1000;return Math.max(1,Math.round(4000/one))*one;}
const GRIDS={'2x2':[2,2],'3x3':[3,3],'1x3':[3,1]};
const gridMax=p=>{const[c,r]=GRIDS[p.grid];return p.order==='diag'?c+r-2:c*r-1;};

/* ── 21 个条目 ── */
const CATS=[
  {id:'curves',name:'曲线',desc:'所有动效的手感都来自曲线。先认这八条，之后说「急停」「回弹」，指的就是这里的样子。'},
  {id:'text',name:'文字',desc:'宣传片里最密集的部分。同样一句话，入场方式不同，情绪完全不同。'},
  {id:'texture',name:'质感',desc:'不改变内容，只给画面加一层「被打磨过」的感觉。'},
  {id:'morph',name:'形变与接力',desc:'发布片里最有辨识度的部分：不切镜头，让同一个东西变形，去接下一段内容。'},
  {id:'trans',name:'转场',desc:'都是从「第一幕」切到「第二幕」，方便对比。盯换场的那几帧。'},
  {id:'motion',name:'运动与镜头',desc:'物体怎么动、镜头怎么动。'},
];
const FX=[
{no:'00',cat:'curves',name:'曲线对照',en:'Easing Curves',wide:true,
 watch:'八个点用同样的时长、从同一个起点跑到同一个终点，只有路上的快慢不同。看「残影」的间距：挤在一起的地方慢，拉开的地方快。回弹会冲过终点再回来，弹簧会来回晃几下。',
 params:[R('dur','时长',300,3000,50,1200,'ms'),S('trail','残影',[['on','显示'],['off','隐藏']],'on')],
 dur:p=>p.dur,
 build(cv,p){
   const keys=['linear','outCubic','inOutCubic','outExpo','inExpo','inOutExpo','outBack','spring'];
   const x0=330,x1=880,top=34,rh=59;
   const rows=keys.map((k,i)=>{
     const y=top+i*rh+rh/2;
     const lab=h('div','cv-lab',cv,`${EASE_INFO[k][0]}<small>${EASE_INFO[k][2]}</small>`);lab.style.top=(y-17)+'px';
     const tr=h('div','cv-track',cv);tr.style.cssText=`left:${x0}px;width:${x1-x0}px;top:${y-1}px`;
     const gs=[];if(p.trail==='on')for(let g=6;g>=1;g--){const d=h('div','cv-dot',cv);d.style.opacity=(.5*(1-g/7)).toFixed(2);gs.push([d,g]);}
     const dot=h('div','cv-dot',cv);return{k,y,dot,gs};
   });
   const place=(d,k,y,t)=>{const e=EASE[k](pr(t,0,p.dur));d.style.transform=`translate(${(lerp(x0,x1,e)-10).toFixed(2)}px,${y-10}px)`;};
   return{update(t){rows.forEach(r=>{place(r.dot,r.k,r.y,t);r.gs.forEach(([d,g])=>place(d,r.k,r.y,t-g*25));});}};
 }},

{no:'01',cat:'text',name:'砸字',en:'Slam / Punch-in',
 watch:'字从很大一下缩回正常大小，落定的瞬间整个画面震一下。盯落地那一帧：震屏要和字停住同时发生，晚一帧就不对劲。曲线换成「加速冲出」更像砸下来，「急停」更像盖章。',
 params:[R('dur','时长',150,900,10,420,'ms'),R('from','起始倍数',1.5,6,.1,3.2,'×'),R('shake','震屏',0,30,1,14,'px'),EZ('outExpo',['outExpo','inExpo','outCubic','outBack','linear'])],
 dur:p=>p.dur+350,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);const cam=h('div','fill',cv);const w=h('div','word big',cam,'就是现在');
   return{update(t){
     const x=pr(t,0,p.dur),e=ease(x),s=lerp(p.from,1,e);
     w.style.transform=`translate(-50%,-50%) scale(${s.toFixed(4)})`;
     w.style.opacity=t<0?0:clamp(x/.2);
     const b=Math.max(0,1-e)*(p.from-1)*3;w.style.filter=b>.1?`blur(${b.toFixed(2)}px)`:'none';
     const k=t-p.dur;let dx=0,dy=0;
     if(k>0){const a=p.shake*Math.exp(-k/80);dx=a*Math.sin(k*.11);dy=a*Math.cos(k*.153)*.8;}
     cam.style.transform=`translate(${dx.toFixed(2)}px,${dy.toFixed(2)}px)`;
   }};
 }},

{no:'02',cat:'text',name:'遮罩升起',en:'Mask Reveal',
 watch:'字是从一条看不见的线下面升上来的，不是淡入。打开「遮罩边界」能看到那条线。第二行比第一行晚一点出发，这个时间差就是行间错峰。',
 params:[R('dur','时长',300,1500,10,700,'ms'),R('stag','行间错峰',0,400,10,120,'ms'),EZ('outExpo',['outExpo','outCubic','inOutCubic','outBack']),S('show','遮罩边界',[['off','隐藏'],['on','显示']],'off')],
 dur:p=>p.dur+p.stag,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);const st=h('div','stack',cv);
   const ins=['把复杂的事','做得很简单'].map((s,i)=>{const L=h('div','mline'+(p.show==='on'?' show':''),st);const I=h('div','minner',L,s);if(i)I.style.color=C.orange;return I;});
   return{update(t){ins.forEach((I,i)=>{const e=ease(pr(t,i*p.stag,p.dur));I.style.transform=`translateY(${((1-e)*112).toFixed(2)}%)`;});}};
 }},

{no:'03',cat:'text',name:'逐字错峰',en:'Staggered Letters',
 watch:'每个字的动作完全一样，只是出发时间依次往后推。错峰间隔调小，字就连成一股浪；调大，就变成一个一个往外蹦。',
 params:[R('dur','单字时长',200,1000,10,500,'ms'),R('gap','错峰间隔',10,200,5,55,'ms'),R('dist','位移',0,160,5,70,'px'),S('mode','方式',[['up','从下升起'],['down','从上落下'],['scale','由小放大'],['blur','模糊变清']],'up'),EZ('outCubic',['outCubic','outExpo','outBack','spring','linear'])],
 dur:p=>p.dur+7*p.gap,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);const row=h('div','row',cv);const sp=[...'一个字一个字地来'].map(c=>h('span','ch',row,c));
   return{update(t){sp.forEach((el,i)=>{
     const x=pr(t,i*p.gap,p.dur),e=ease(x);el.style.opacity=clamp(x*3).toFixed(3);
     let tf;
     if(p.mode==='up')tf=`translateY(${((1-e)*p.dist).toFixed(2)}px)`;
     else if(p.mode==='down')tf=`translateY(${(-(1-e)*p.dist).toFixed(2)}px)`;
     else if(p.mode==='scale')tf=`scale(${lerp(.3,1,e).toFixed(4)})`;
     else tf=`translateY(${((1-e)*p.dist*.4).toFixed(2)}px)`;
     el.style.transform=tf;
     el.style.filter=p.mode==='blur'&&e<.995?`blur(${((1-e)*p.dist/5).toFixed(2)}px)`:'none';
   });}};
 }},

{no:'04',cat:'text',name:'老虎机换词',en:'Slot Word Swap',
 watch:'前半句不动，后面的词像老虎机一样往上滚。滚得最快的时候带一点竖向模糊，停下来就清楚。曲线选「回弹」，新词会冲过头再弹回来。',
 params:[R('dur','换词时长',150,900,10,380,'ms'),R('hold','停留',200,1500,50,650,'ms'),R('blur','运动模糊',0,12,.5,5,'px'),EZ('inOutCubic',['inOutCubic','outExpo','outBack','spring'])],
 dur:p=>3*(p.hold+p.dur),
 main:p=>({ease:ez(p.ease,p),prog:t=>{const cyc=p.hold+p.dur;const k=clamp(Math.floor((t-p.hold)/cyc),0,2);return pr(t,p.hold+k*cyc,p.dur);}}),
 build(cv,p,ctx){
   const ease=ez(p.ease,p);const row=h('div','row slotrow',cv);h('span','pre',row,'让 AI 帮你');
   const box=h('div','slot',row);const ws=['写稿','剪片','配乐','做动效'].map(w=>h('div','sw',box,w));
   const bl=ctx.dirBlur();const cyc=p.hold+p.dur;
   const cAt=t=>{let c=0;for(let k=0;k<3;k++)c+=ease(pr(t,p.hold+k*cyc,p.dur));return c;};
   return{update(t){
     const c=cAt(t);
     ws.forEach((el,i)=>{const d=i-c;el.style.transform=`translateY(${(d*100).toFixed(2)}%)`;el.style.opacity=Math.abs(d)<1.2?1:0;});
     const v=Math.abs(cAt(t+8)-cAt(t-8))/16*p.dur/1.5;const b=p.blur*Math.min(1.3,v);
     bl.set(0,b);box.style.filter=b>.05?bl.css:'none';
   }};
 }},

{no:'05',cat:'text',name:'打字机',en:'Typewriter',
 watch:'字一个一个出现，间隔不完全一样，像真人在打字。打字时光标常亮，停下来才开始闪。切到「居中」看看：每多一个字，整行都会往左挪半格。',
 params:[R('iv','每字间隔',20,250,5,75,'ms'),R('jit','手打抖动',0,80,5,30,'%'),R('blink','光标周期',300,1400,10,530,'ms'),S('cur','光标',[['bar','竖线'],['block','方块'],['under','下划线']],'bar'),S('align','对齐',[['left','左对齐'],['center','居中']],'left')],
 dur:p=>{const T=typeTimes(p,TW_TEXT.length);return T[T.length-1]+250;},
 main:p=>{const T=typeTimes(p,TW_TEXT.length),N=TW_TEXT.length,end=T[N-1];return{ease:x=>Math.floor(x*N+1e-6)/N,prog:t=>clamp(t/end),label:'阶梯',bez:'每个字是一级台阶，不是平滑过渡'};},
 build(cv,p){
   const T=typeTimes(p,TW_TEXT.length);const line=h('div','tw '+p.align,cv);const s=h('span','',line);const cur=h('span','cur '+p.cur,line);let n0=-1;
   return{update(t){
     let n=0;while(n<T.length&&T[n]<=t)n++;
     if(n!==n0){s.textContent=TW_TEXT.slice(0,n).join('');n0=n;}
     const typing=t>=0&&t<=T[T.length-1]+250;
     cur.style.opacity=typing?1:(((t+1e5)%p.blink)<p.blink/2?1:0);
   }};
 }},

{no:'06',cat:'text',name:'数字滚动',en:'Number Counter',
 watch:'数字从 0 涨到目标值，先快后慢，最后几位慢慢停住。「滚轮」模式下每一位像里程表一样竖着转，低位转满一圈才带着高位进一。',
 params:[R('dur','时长',400,3500,50,1600,'ms'),S('mode','样式',[['odo','滚轮'],['jump','跳数']],'odo'),EZ('outExpo',['outExpo','outCubic','inOutCubic','linear'])],
 dur:p=>p.dur,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p),target=128640;const wrap=h('div','cnt',cv);let upd;
   if(p.mode==='jump'){const n=h('div','num',wrap);upd=v=>{n.textContent=Math.round(v).toLocaleString('en-US');};}
   else{
     const n=h('div','num',wrap);const cols=[];
     [5,4,3,'c',2,1,0].forEach(k=>{
       if(k==='c'){cols.push({k,el:h('span','comma',n,',')});return;}
       const col=h('span','dcol',n);const strip=h('span','strip',col,[0,1,2,3,4,5,6,7,8,9,0].map(d=>`<span>${d}</span>`).join(''));cols.push({k,el:col,strip});
     });
     upd=v=>{cols.forEach(c=>{
       if(c.k==='c'){c.el.style.opacity=v>=1000?1:.18;return;}
       const P=Math.pow(10,c.k);let pos;
       if(c.k===0)pos=v%10;else{const base=Math.floor(v/P)%10,lf=(v%P)/P;pos=base+sstep(clamp((lf-.85)/.15));}
       c.strip.style.transform=`translateY(${(-pos*1.1).toFixed(4)}em)`;
       c.el.style.opacity=v>=P||c.k===0?1:.18;
     });};
   }
   h('div','cap',wrap,'次播放');
   return{update(t){upd(target*ease(pr(t,0,p.dur)));}};
 }},

{no:'07',cat:'text',name:'快闪字',en:'Rapid Word Cuts',
 watch:'每个词只停一拍，硬切，没有任何过渡。拍内字会轻轻往前推一点，让静止的字也有动势。打开反色，背景会黑白交替，节奏更冲。',
 params:[R('beat','每拍时长',60,500,10,180,'ms'),R('push','拍内推镜',0,30,1,8,'%'),S('inv','反色',[['on','开'],['off','关']],'on')],
 dur:p=>4*p.beat,
 main:p=>({ease:EASE.linear,prog:t=>t<0?0:t>=4*p.beat?1:(t%p.beat)/p.beat,label:'线性（拍内推镜）',bez:'每拍重新从 0 开始'}),
 build(cv,p){
   const words=['更快','更稳','更聪明','更像你'];const bg=h('div','fill',cv);const w=h('div','word big',cv);let last=-2;
   return{update(t){
     if(t<0){bg.style.background='#0B0C0F';w.style.opacity=0;last=-2;return;}
     w.style.opacity=1;const i=Math.min(3,Math.floor(t/p.beat));const u=t>=4*p.beat?1:(t-i*p.beat)/p.beat;
     if(i!==last){w.textContent=words[i];last=i;const inv=p.inv==='on'&&i%2===1;bg.style.background=inv?C.cream:'#0B0C0F';w.style.color=i===3?C.orange:(inv?C.dark:C.ink);}
     w.style.transform=`translate(-50%,-50%) scale(${(1+p.push/100*u).toFixed(4)})`;
   }};
 }},

{no:'08',cat:'texture',name:'扫光',en:'Light Sweep / Sheen',
 watch:'一道斜向的亮带从左扫到右，只亮在字上，底板上留一层很淡的反光。光带窄，像金属上的锐利反光；光带宽，像柔和的高光。',
 params:[R('dur','时长',300,2500,50,1000,'ms'),R('width','光带宽度',4,60,1,18,'%'),R('ang','倾角',0,60,1,20,'°'),EZ('inOutCubic',['inOutCubic','outCubic','linear','inOutExpo'])],
 dur:p=>p.dur,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);const plate=h('div','plate',cv);h('div','sh sh-base',plate,'MOTION');const glint=h('div','sh',plate);const hi=h('div','sh sh-hi',plate,'MOTION');
   return{update(t){
     const e=ease(pr(t,0,p.dur)),w=p.width,P=lerp(-w,100+w,e),a=90+p.ang;
     hi.style.backgroundImage=`linear-gradient(${a}deg,transparent ${P-w}%,rgba(255,255,255,.98) ${P}%,transparent ${P+w}%)`;
     glint.style.backgroundImage=`linear-gradient(${a}deg,transparent ${P-w*1.6}%,rgba(255,255,255,.09) ${P}%,transparent ${P+w*1.6}%)`;
   }};
 }},

{no:'09',cat:'texture',name:'描边生长',en:'Line Draw / Stroke Reveal',
 watch:'线像被一支笔实时画出来，先圈住重点，再补一个箭头。打开笔尖能看到正在画的位置。曲线决定这支笔是匀速画，还是起笔快、收笔慢。',
 params:[R('dur','时长',300,2500,50,1100,'ms'),R('sw','线宽',1,16,1,6,'px'),S('tip','笔尖',[['on','显示'],['off','隐藏']],'on'),EZ('inOutCubic',['inOutCubic','outCubic','linear','outExpo'])],
 dur:p=>p.dur*1.3,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);
   const svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox','0 0 960 540');svg.setAttribute('class','fill');cv.appendChild(svg);
   svg.innerHTML=`<text x="480" y="300" text-anchor="middle" font-size="80" font-weight="900" fill="#F3EFE6">重点在这里</text>
     <path class="d1" d="M300 332 C200 300,232 190,470 180 C690 172,762 240,702 312 C650 366,420 372,300 336 C250 318,268 280,330 262"/>
     <path class="d2" d="M862 472 C832 422,792 382,742 344 M742 344 L782 346 M742 344 L752 382"/>
     <circle class="tip" r="7" fill="#FFC53D"/>`;
   const d1=svg.querySelector('.d1'),d2=svg.querySelector('.d2'),tip=svg.querySelector('.tip');
   [d1,d2].forEach(d=>{d.setAttribute('fill','none');d.setAttribute('stroke',C.orange);d.setAttribute('stroke-width',p.sw);d.setAttribute('stroke-linecap','round');d.setAttribute('stroke-linejoin','round');});
   const L1=d1.getTotalLength(),L2=d2.getTotalLength();
   d1.style.strokeDasharray=`${L1} ${L1}`;d2.style.strokeDasharray=`${L2} ${L2}`;
   return{update(t){
     const x1=pr(t,0,p.dur),e1=ease(x1),x2=pr(t,p.dur*.85,p.dur*.45),e2=ease(x2);
     d1.style.strokeDashoffset=L1*(1-e1);d2.style.strokeDashoffset=L2*(1-e2);
     let pt=null;if(x1>0&&x1<1)pt=d1.getPointAtLength(L1*e1);else if(x2>0&&x2<1)pt=d2.getPointAtLength(L2*e2);
     if(pt&&p.tip==='on'){tip.setAttribute('cx',pt.x);tip.setAttribute('cy',pt.y);tip.style.opacity=1;}else tip.style.opacity=0;
   }};
 }},

{no:'10',cat:'trans',name:'甩镜',en:'Whip Pan',
 watch:'镜头猛地横甩到下一个画面，中间几帧全是横向拖影。拖影只在速度最快的时候出现，起步和落定都是清楚的。用 0.1× 盯中间最糊的那两三帧。',
 params:[R('dur','时长',200,1200,10,450,'ms'),R('blur','动态模糊',0,60,1,30,'px'),EZ('inOutExpo',['inOutExpo','inOutCubic','outExpo','linear'])],
 dur:p=>p.dur,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p,ctx){
   const ease=ez(p.ease,p);const strip=h('div','strip2',cv);scene(strip,'A');scene(strip,'B',960);const bl=ctx.dirBlur();
   const f=t=>960*ease(pr(t,0,p.dur));
   return{update(t){
     const x=f(t);strip.style.transform=`translateX(${(-x).toFixed(2)}px)`;
     const v=Math.abs(f(t+8)-f(t-8))/16,n=v*p.dur/960/3.5,b=p.blur*Math.min(1.2,n);
     bl.set(b,0);strip.style.filter=b>.05?bl.css:'none';
   }};
 }},

{no:'11',cat:'trans',name:'穿字转场',en:'Zoom Through Text',
 watch:'镜头冲进字的笔画里，笔画里透出来的就是下一个画面。放大越来越快，最后几帧最猛。用 0.1× 看镜头是朝哪一笔冲进去的。',
 params:[R('dur','时长',400,2500,50,1000,'ms'),R('max','最大倍数',8,120,1,50,'×'),EZ('inExpo',['inExpo','inOutCubic','inOutExpo','linear'])],
 dur:p=>p.dur,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);const c=h('canvas','fill',cv);c.width=1920;c.height=1080;c.style.width='960px';c.style.height='540px';const g=c.getContext('2d');
   const L=document.createElement('canvas');L.width=1920;L.height=1080;const lg=L.getContext('2d');
   const word='更大的世界',FONT='900 150px "Noto Sans SC","PingFang SC","Hiragino Sans GB",sans-serif';
   const O=findOrigin(word,FONT);
   return{update(t){
     const x=pr(t,0,p.dur),e=ease(x),s=Math.pow(p.max,e),bs=lerp(1.35,1,e);
     g.setTransform(2,0,0,2,0,0);g.globalAlpha=1;g.fillStyle=C.orange;g.fillRect(0,0,960,540);
     g.save();g.translate(480,270);g.scale(bs,bs);g.fillStyle=C.dark;g.font='900 128px "Noto Sans SC","PingFang SC",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('第二幕',0,0);g.restore();
     const fade=1-clamp((x-.82)/.18);if(fade<=0)return;
     lg.setTransform(2,0,0,2,0,0);lg.globalCompositeOperation='source-over';lg.clearRect(0,0,960,540);lg.fillStyle=C.dark;lg.fillRect(0,0,960,540);
     lg.globalCompositeOperation='destination-out';lg.save();lg.translate(O.x,O.y);lg.scale(s,s);lg.translate(-O.x,-O.y);
     lg.font=FONT;lg.textAlign='center';lg.textBaseline='middle';lg.fillText(word,480,270);lg.restore();lg.globalCompositeOperation='source-over';
     g.setTransform(1,0,0,1,0,0);g.globalAlpha=fade;g.drawImage(L,0,0);g.globalAlpha=1;
   }};
 }},

{no:'12',cat:'trans',name:'色块擦屏',en:'Stacked Panel Wipe',
 watch:'几层不同颜色的色块接力扫过画面，全部盖住的那一刻换场景，再一层层退出去。层间错峰调到 0，就是一整块平推。',
 params:[R('dur','单层时长',200,900,10,420,'ms'),R('gap','层间错峰',0,200,5,70,'ms'),R('n','层数',1,5,1,3),EZ('inOutExpo',['inOutExpo','inOutCubic','outExpo','outBack'])],
 dur:p=>2*((p.n-1)*p.gap+p.dur)+80,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);const A=scene(cv,'A'),B=scene(cv,'B');const cols=['#3B5BFF','#F3E7CF','#FFC53D','#7A5CFF','#2BD4A4'];const n=p.n;
   const ps=[];for(let i=0;i<n;i++){const d=h('div','panel',cv);d.style.background=cols[i];ps.push(d);}
   const Tc=(n-1)*p.gap+p.dur,To=Tc+80;
   return{update(t){
     const sw=t>=Tc+40;A.style.visibility=sw?'hidden':'visible';B.style.visibility=sw?'visible':'hidden';
     ps.forEach((d,i)=>{let pct=-100+100*ease(pr(t,i*p.gap,p.dur));pct+=100*ease(pr(t,To+(n-1-i)*p.gap,p.dur));d.style.transform=`translateX(${pct.toFixed(3)}%)`;});
   }};
 }},

{no:'13',cat:'trans',name:'圆形扩散',en:'Circle Reveal / Iris',
 watch:'下一个画面从一个点开始，以圆形往外扩开。起点放在按钮上，就像点了按钮打开新画面。打开描边能看清圆的边缘走到哪了。',
 params:[R('dur','时长',300,1600,10,750,'ms'),S('org','起点',[['btn','按钮'],['center','画面中心']],'btn'),S('ring','描边',[['off','关'],['on','开']],'off'),EZ('inOutCubic',['inOutCubic','inExpo','outExpo','outCubic'])],
 dur:p=>p.dur,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);scene(cv,'A');const cx=p.org==='btn'?790:480,cy=p.org==='btn'?430:270;
   if(p.org==='btn')h('div','btn',cv,'→').style.cssText=`left:${cx-36}px;top:${cy-36}px`;
   const B=scene(cv,'B');const Rm=Math.max(...[[0,0],[960,0],[0,540],[960,540]].map(([x,y])=>Math.hypot(x-cx,y-cy)))+4;const ring=h('div','ring',cv);
   return{update(t){
     const x=pr(t,0,p.dur),r=Math.max(0,Rm*ease(x));
     B.style.clipPath=`circle(${r.toFixed(2)}px at ${cx}px ${cy}px)`;
     const on=p.ring==='on'&&x>0&&x<1;ring.style.opacity=on?1:0;
     if(on){ring.style.width=ring.style.height=2*r+'px';ring.style.left=cx-r+'px';ring.style.top=cy-r+'px';}
   }};
 }},

{no:'14',cat:'trans',name:'故障切换',en:'Glitch Transition',
 watch:'切换时有几帧画面错位：横条碎片左右乱跳，字有红蓝重影，偶尔整屏反色。中间最乱，两头收住。逐帧看，每一帧都不一样。',
 params:[R('dur','持续',100,900,10,320,'ms'),R('amp','强度',0,80,1,28,'px'),R('n','切片数',2,16,1,7),S('fps','抖动频率',[['30','每帧都变'],['15','每两帧变一次']],'30')],
 dur:p=>p.dur,main:p=>({ease:x=>Math.sin(Math.PI*x),len:p.dur,label:'强度包络',bez:'中间最乱，两头收住'}),
 build(cv,p){
   const A=scene(cv,'A'),B=scene(cv,'B');const slices=[];
   for(let i=0;i<p.n;i++){const s=h('div','slice',cv);slices.push({s,a:scene(s,'A'),b:scene(s,'B')});}
   const wa=A.querySelector('.sc-word'),wb=B.querySelector('.sc-word'),fps=+p.fps;
   return{update(t){
     const x=pr(t,0,p.dur);
     if(t<0||t>p.dur){const sb=t>p.dur;A.style.visibility=sb?'hidden':'visible';B.style.visibility=sb?'visible':'hidden';slices.forEach(o=>o.s.style.display='none');wa.style.textShadow=wb.style.textShadow='none';A.style.filter=B.style.filter='none';return;}
     const fi=Math.floor(t/(1000/fps)),Rr=k=>rnd(fi*97+k*13.37),env=Math.pow(Math.sin(Math.PI*x),.6),amp=p.amp*env;
     const useB=Rr(1)<x;A.style.visibility=useB?'hidden':'visible';B.style.visibility=useB?'visible':'hidden';
     const dx=(Rr(2)-.5)*2*amp*.6;wa.style.textShadow=wb.style.textShadow=`${dx.toFixed(1)}px 0 #FF2D55,${(-dx).toFixed(1)}px 0 #00E5FF`;
     A.style.filter=B.style.filter=Rr(3)<.18*env?'invert(1)':'none';
     slices.forEach((o,i)=>{
       if(Rr(10+i)>.7){o.s.style.display='none';return;}
       o.s.style.display='block';const top=Rr(20+i)*95,hh=2+Rr(30+i)*16;
       o.s.style.clipPath=`inset(${top.toFixed(1)}% 0 ${Math.max(0,100-top-hh).toFixed(1)}% 0)`;
       o.s.style.transform=`translateX(${((Rr(40+i)-.5)*2*amp*2).toFixed(1)}px)`;
       const sb=Rr(50+i)<x;o.a.style.visibility=sb?'hidden':'visible';o.b.style.visibility=sb?'visible':'hidden';
     });
   }};
 }},

{no:'15',cat:'trans',name:'无限推进',en:'Infinite Zoom',
 watch:'画面里套着一个小画面，镜头一直往里推，小画面变成整个画面，里面又套着下一层。每层倍率越大，层和层之间推得越远。',
 params:[R('dur','时长',600,4000,50,1800,'ms'),R('S','每层倍率',2,8,.5,4,'×'),S('N','推进层数',[['1','1 层'],['2','2 层'],['3','3 层']],'2'),EZ('inOutCubic',['inOutCubic','linear','inOutExpo','outExpo'])],
 dur:p=>p.dur,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p),N=+p.N;
   const L=[['城市','#1B2333','#F3EFE6'],['街道','#3B5BFF','#F3EFE6'],['窗口','#F3E7CF','#15171C'],['屏幕','#FF5A1F','#15171C'],['像素','#15171C','#FFC53D']];
   const cam=h('div','fill zoomcam',cv);let parent=cam;
   for(let i=0;i<Math.min(L.length,N+2);i++){
     const[lab,bg,fg]=L[i];const lv=h('div','lvl',parent);lv.style.background=bg;lv.style.color=fg;
     h('div','lv-lab',lv,lab);h('div','lv-tag',lv,`LEVEL ${i}`);
     if(i>0){lv.classList.add('kid');lv.style.transform=`scale(${1/p.S})`;}
     parent=lv;
   }
   return{update(t){const e=ease(pr(t,0,p.dur));cam.style.transform=`scale(${Math.pow(p.S,N*e).toFixed(5)})`;}};
 }},

{no:'16',cat:'motion',name:'弹入回弹',en:'Pop / Overshoot',
 watch:'图标从 0 放大，冲过头一点再缩回正常大小。回弹量就是冲过头多少，0 就是不冲过头。曲线换成「弹簧」，会来回晃几下才停。',
 params:[R('dur','时长',200,1200,10,520,'ms'),R('back','回弹量',0,5,.1,1.8),R('gap','错峰',0,250,5,90,'ms'),EZ('outBack',['outBack','spring','outCubic','outExpo'])],
 dur:p=>p.dur+2*p.gap,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);const row=h('div','row',cv);row.style.gap='56px';
   const items=[['文',C.orange,C.dark],['图',C.blue,C.ink],['声',C.cream,C.dark]].map(([c,bg,fg])=>{const d=h('div','tile',row,c);d.style.background=bg;d.style.color=fg;return d;});
   return{update(t){items.forEach((d,i)=>{const x=pr(t,i*p.gap,p.dur),e=ease(x);d.style.transform=`scale(${Math.max(0,e).toFixed(4)})`;d.style.opacity=clamp(x*5);});}};
 }},

{no:'17',cat:'motion',name:'视差纵深',en:'Parallax',
 watch:'镜头横移时，远处的山几乎不动，中间的楼慢一点，字正常走，最前面的柱子扫得最快。纵深强度调到 0，所有层一起平移，立体感马上消失。',
 params:[R('dur','时长',800,4000,50,2400,'ms'),R('pan','镜头位移',60,500,10,260,'px'),R('depth','纵深强度',0,1.5,.05,1),EZ('inOutCubic',['inOutCubic','linear','outCubic','outExpo'])],
 dur:p=>p.dur,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);const sky=h('div','fill',cv);sky.style.background='linear-gradient(#0F1730,#2A2346 70%,#3A2A3F)';
   const OFF=820;const mk=(f,blur)=>{const l=h('div','plx',cv);l.style.left=-OFF+'px';if(blur)l.style.filter=`blur(${blur}px)`;return{l,f};};
   const far=mk(.15);h('div','sun',far.l).style.cssText=`left:${OFF+600}px;top:100px`;h('div','ridge',far.l);
   const mid=mk(.5);for(let i=0;i<14;i++){const b=h('div','bld',mid.l);b.style.cssText=`left:${OFF-300+i*130}px;width:${70+rnd(i)*90}px;height:${120+rnd(i+20)*190}px`;}
   const near=mk(1);h('div','plx-word',near.l,'纵深').style.left=OFF+270+'px';
   const fg=mk(1.8,3);for(let i=0;i<7;i++)h('div','pole',fg.l).style.left=(OFF-400+i*300+rnd(i+40)*80)+'px';h('div','ground',fg.l);
   const Ls=[far,mid,near,fg];
   return{update(t){const e=ease(pr(t,0,p.dur)),cam=lerp(p.pan/2,-p.pan/2,e);Ls.forEach(o=>{const k=1+(o.f-1)*p.depth;o.l.style.transform=`translateX(${(cam*k).toFixed(2)}px)`;});}};
 }},

{no:'18',cat:'motion',name:'3D 翻转',en:'3D Card Flip',
 watch:'卡片绕竖轴翻过来，背面是新内容。透视距离越小，翻的时候近大远小越夸张；越大越像平面翻页。翻到一半时卡片会微微抬起，影子跟着变淡。',
 params:[R('dur','时长',300,1600,10,750,'ms'),R('persp','透视距离',300,3000,50,1100,'px'),R('lift','抬起',0,30,1,8,'%'),EZ('inOutCubic',['inOutCubic','outBack','outExpo','spring'])],
 dur:p=>p.dur,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);const per=h('div','fill',cv);per.style.perspective=p.persp+'px';const shadow=h('div','fshadow',per);const card=h('div','flip',per);
   h('div','face front',card,'<small>BEFORE</small>旧方案');h('div','face back',card,'<small>AFTER</small>新方案');
   return{update(t){
     const x=pr(t,0,p.dur),e=ease(x),lift=1+p.lift/100*Math.sin(Math.PI*x);
     card.style.transform=`translate(-50%,-50%) scale(${lift.toFixed(4)}) rotateY(${(180*e).toFixed(2)}deg)`;
     shadow.style.transform=`translate(-50%,0) scale(${(1+(lift-1)*3).toFixed(3)},1)`;shadow.style.opacity=(.6-(lift-1)*2).toFixed(3);
   }};
 }},

{no:'19',cat:'motion',name:'速度变速',en:'Speed Ramp',
 watch:'同一个动作中间突然变慢，再加速离开。残影的间距就是速度：间距密的地方就是慢放。右边曲线中间那段变平的部分就是慢放区，斜率等于速度。',
 params:[R('dur','总时长',800,4000,50,1800,'ms'),R('slow','慢放倍率',.05,1,.05,.15,'×'),R('width','慢放区宽度',10,70,5,35,'%')],
 dur:p=>p.dur,main:p=>({ease:rampTable(p).pos,len:p.dur,label:'时间重映射',bez:'斜率就是速度，变平的地方是慢放'}),
 build(cv,p){
   const Rt=rampTable(p),x0=110,x1=850;
   const rule=h('div','ruler',cv);for(let x=0;x<=960;x+=40){const tk=h('div','tick'+(x%160===0?' big':''),rule);tk.style.left=x+'px';if(x%160===0)h('span','',tk,String(x));}
   const w=p.width/100,za=Rt.pos(.5-w*.3),zb=Rt.pos(.5+w*.3);const band=h('div','zone',cv,'<span>慢放区</span>');band.style.left=lerp(x0,x1,za)+'px';band.style.width=Math.max(4,(zb-za)*(x1-x0))+'px';
   const ghosts=[];for(let k=8;k>=1;k--){const g=h('div','ball',cv);g.style.opacity=(.42*(1-k/9)).toFixed(3);ghosts.push([g,k]);}
   const ball=h('div','ball',cv);const rd=h('div','rate',cv);
   const place=(el,t)=>{const u=Rt.pos(pr(t,0,p.dur));el.style.transform=`translate(${(lerp(x0,x1,u)-35).toFixed(2)}px,${(235-Math.sin(u*Math.PI)*60).toFixed(2)}px)`;};
   return{update(t){
     place(ball,t);ghosts.forEach(([g,k])=>place(g,t-k*22));
     const moving=t>=0&&t<=p.dur;rd.innerHTML=`播放速度 <b>${moving?Rt.sp(pr(t,0,p.dur)).toFixed(2)+'×':'—'}</b>`;
   }};
 }},

{no:'20',cat:'motion',name:'网格拼贴',en:'Grid Assemble',
 watch:'画面分成几格，每格从不同方向飞进来拼成整版。顺序选「对角线」时，会从左上角一路铺到右下角，像一道浪。',
 params:[R('dur','单格时长',200,1000,10,480,'ms'),R('gap','错峰',0,250,5,70,'ms'),S('grid','网格',[['3x3','3×3'],['2x2','2×2'],['1x3','横排 3 格']],'3x3'),S('order','顺序',[['diag','对角线'],['seq','逐个'],['rand','随机']],'diag'),EZ('outExpo',['outExpo','outCubic','outBack','inOutCubic'])],
 dur:p=>p.dur+gridMax(p)*p.gap,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);const[c,r]=GRIDS[p.grid];const pad=36,g=12,W=(960-2*pad-(c-1)*g)/c,H=(540-2*pad-(r-1)*g)/r;
   const cols=[C.blue,C.cream,C.orange,'#2A2F3A',C.yellow];const tiles=[];
   for(let j=0;j<r;j++)for(let i=0;i<c;i++){
     const k=j*c+i,col=cols[k%5];const d=h('div','gtile',cv,`<span>${String(k+1).padStart(2,'0')}</span>`);
     d.style.cssText=`left:${pad+i*(W+g)}px;top:${pad+j*(H+g)}px;width:${W}px;height:${H}px;background:${col}`;
     if(col===C.blue||col==='#2A2F3A')d.style.color=C.ink;
     const ord=p.order==='seq'?k:p.order==='diag'?i+j:Math.floor(rnd(k+7)*c*r);tiles.push({d,dir:k%4,ord});
   }
   const D=[[-1100,0],[0,-700],[1100,0],[0,700]];
   return{update(t){tiles.forEach(o=>{const m=1-ease(pr(t,o.ord*p.gap,p.dur)),[dx,dy]=D[o.dir];o.d.style.transform=`translate(${(dx*m).toFixed(1)}px,${(dy*m).toFixed(1)}px)`;});}};
 }},

/* ── #21–#33：拆自 ElevenLabs Agents Architect 发布片 ── */
{no:'21',cat:'text',name:'开门展开',en:'Split Reveal',src:'0:00.8 片头、1:02 片尾',
 watch:'两根竖线先贴在一起，然后往两边分开，字从中间长出来，左右两个词同时各自往外长。分开是越来越快的，字一出来竖线就停住。原片 20 帧（约 330ms）分完，每 1～2 帧冒出一个字母。',
 params:[R('dur','分开时长',150,900,10,330,'ms'),R('gap','每字间隔',0,120,5,30,'ms'),S('after','竖线之后',[['dots','缩成点往外飘'],['stay','留在两边']],'dots'),EZ('inCubic',['inCubic','inOutCubic','outExpo','linear'])],
 dur:p=>p.dur+3*p.gap+(p.after==='dots'?1150:300),main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);h('div','fill paper',cv);
   const row=h('div','sr-row',cv);const cs=[];
   ['你的','智能体'].forEach(g=>{const w=h('span','',row);[...g].forEach((c,ci)=>cs.push({el:h('span','',w,c),ci}));});
   const Wt=row.offsetWidth,cx=480,tl=cx-Wt/2,tr=cx+Wt/2,BW=10;
   const bl=h('div','sr-bar',cv),br=h('div','sr-bar',cv);const t0=p.dur*.55;
   return{update(t){
     const e=ease(pr(t,0,p.dur));const lx=lerp(cx-4-BW,tl-26-BW,e),rx=lerp(cx+4,tr+26,e);
     let hh=78,dr=0;
     if(p.after==='dots'){const k=t-(p.dur+3*p.gap+150);hh=lerp(78,12,EASE.outCubic(pr(k,0,160)));dr=200*EASE.outCubic(pr(k,0,950));}
     bl.style.height=br.style.height=hh+'px';
     bl.style.transform=`translate(${(lx-dr).toFixed(2)}px,${270-hh/2}px)`;br.style.transform=`translate(${(rx+dr).toFixed(2)}px,${270-hh/2}px)`;
     row.style.clipPath=`inset(0 ${Math.max(0,tr-rx).toFixed(2)}px 0 ${Math.max(0,lx+BW-tl).toFixed(2)}px)`;
     cs.forEach(s=>{s.el.style.opacity=t>=t0+s.ci*p.gap?1:0;});
   }};
 }},

{no:'22',cat:'text',name:'两端收拢',en:'Collapse to Center',src:'0:01.7、1:01.5',
 watch:'一行字两头各有一个小方块。方块往中间走，走过的地方字就没了，最后两块合成一块，再长大去接下一个画面。这个小方块就是接力棒，下一镜从它开始。',
 params:[R('dur','收拢时长',150,1200,10,400,'ms'),S('end','收完之后',[['grow','合成方块长大'],['vanish','直接消失']],'grow'),EZ('inCubic',['inCubic','inOutCubic','outExpo','linear'])],
 dur:p=>p.dur+(p.end==='grow'?450:200),main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);h('div','fill paper',cv);const row=h('div','sr-row cl',cv,'你的智能体正在工作');
   const Wt=row.offsetWidth,cx=480,tl=cx-Wt/2,tr=cx+Wt/2,D=12;
   const dl=h('div','cl-dot',cv),dr=h('div','cl-dot',cv);
   return{update(t){
     const e=ease(pr(t,0,p.dur));const lx=lerp(tl-14-D,cx-D/2,e),rx=lerp(tr+14,cx-D/2,e);
     row.style.clipPath=`inset(0 ${Math.max(0,tr-rx).toFixed(2)}px 0 ${Math.max(0,lx+D-tl).toFixed(2)}px)`;
     const k=t-p.dur;let s=D,op=1;
     if(k>0){if(p.end==='grow')s=lerp(D,64,EASE.outBack(pr(k,0,380),1.4));else op=1-pr(k,0,140);}
     dl.style.cssText=`width:${s.toFixed(2)}px;height:${s.toFixed(2)}px;opacity:${op};transform:translate(${(k>0?cx-s/2:lx).toFixed(2)}px,${(270-s/2).toFixed(2)}px)`;
     dr.style.cssText=`opacity:${k>0?0:1};transform:translate(${rx.toFixed(2)}px,${270-D/2}px)`;
   }};
 }},

{no:'23',cat:'text',name:'乱码解码',en:'Text Scramble / Decode',src:'0:02.0–0:04.4 卡片四周的小标签',
 watch:'字先是一串乱跳的字符，然后从左到右一个个锁定成正确的字。乱码刷新得快，像机器在算；刷新慢一点，更像老式终端。',
 params:[R('dur','单行时长',200,1500,10,600,'ms'),R('stag','行间错峰',0,400,10,150,'ms'),S('rate','乱码刷新',[['60','每帧'],['30','每两帧'],['15','每四帧']],'30'),S('set','乱码字符',[['upper','大写字母'],['sym','符号'],['num','数字']],'upper')],
 dur:p=>p.dur+2*p.stag,main:p=>({ease:EASE.linear,len:p.dur,label:'线性（锁定进度）',bez:'从左往右匀速锁定'}),
 build(cv,p){
   h('div','fill paper',cv);const SETS={upper:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',sym:'#%&*+=<>/\\|_-:;!?',num:'0123456789'};const cs=SETS[p.set];
   const box=h('div','scr',cv);
   const ls=['ANALYZING CONVERSATIONS','FINDING TRANSFER PATTERNS','PROPOSING CHANGE 03'].map(s=>{const r=h('div','scr-l',box);h('span','scr-b',r);return{el:h('span','',r),s};});
   return{update(t){
     const fi=Math.floor(t/(1000/+p.rate));
     ls.forEach((o,i)=>{
       const s0=i*p.stag;if(t<s0){o.el.textContent='';return;}
       const x=pr(t,s0,p.dur),n=o.s.length,lock=Math.floor(x*n),vis=Math.min(n,Math.ceil(x*n*1.8)+1);let out='';
       for(let j=0;j<vis;j++){const c=o.s[j];out+=(j<lock||c===' ')?c:cs[Math.floor(rnd(fi*131+j*7+i*977)*cs.length)];}
       o.el.textContent=out;
     });
   }};
 }},

{no:'24',cat:'text',name:'逐词点亮',en:'Word-by-word Highlight',src:'0:48.5、0:59.6',
 watch:'整句话一开始就在，只是很暗，然后一个词一个词亮起来，像有人跟着念。和打字机不同：字的位置从头到尾不动，只有亮度在变。',
 params:[R('gap','每词间隔',50,600,10,250,'ms'),R('fade','变亮时长',0,600,10,200,'ms'),R('base','起始亮度',0,60,1,25,'%'),S('bg','底色',[['dark','暗底'],['light','亮底']],'dark')],
 dur:p=>5*p.gap+p.fade,
 main:p=>({ease:EASE.outCubic,prog:t=>{const k=clamp(Math.floor(t/p.gap),0,5);return pr(t,k*p.gap,p.fade);},label:'单词变亮（缓出）',bez:'每个词各自走一遍这条曲线'}),
 build(cv,p){
   const dark=p.bg==='dark';const bg=h('div','fill',cv);bg.style.background=dark?'#0B0C0F':'#F2F1EE';
   const row=h('div','wh-row',cv);row.style.color=dark?'#F3EFE6':'#17181B';
   const ws=['按','你','定下的','标准','来','做'].map(w=>h('span','',row,w));
   return{update(t){ws.forEach((el,i)=>{const e=EASE.outCubic(pr(t,i*p.gap,p.fade));el.style.opacity=lerp(p.base/100,1,e).toFixed(3);});}};
 }},

{no:'25',cat:'text',name:'羽化擦除',en:'Feathered Wipe',src:'0:05.4 "Architect"',
 watch:'后缀词带着一条软边从左往右擦出来，不是整体淡入。软边越宽越像「渐显」，越窄越像「划出来」。前面的主体同时往左让一点，整组重新居中。原片约 0.2 秒。',
 params:[R('dur','擦除时长',100,1200,10,220,'ms'),R('feather','羽化宽度',0,80,1,35,'%'),S('shift','主体让位',[['on','开'],['off','关']],'on'),EZ('outCubic',['outCubic','linear','inOutCubic','outExpo'])],
 dur:p=>p.dur,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);h('div','fill paper',cv);
   const row=h('div','fw-row',cv);const m=h('span','fw-main',row,'再花点时间');const s=h('span','fw-suf',row,'动效词典');
   const Wm=m.offsetWidth,Wg=row.offsetWidth,f=p.feather;
   return{update(t){
     const e=ease(pr(t,0,p.dur)),P=lerp(0,100+f,e);
     const mk=`linear-gradient(90deg,#000 ${(P-f).toFixed(2)}%,transparent ${P.toFixed(2)}%)`;s.style.webkitMaskImage=mk;s.style.maskImage=mk;
     const x=p.shift==='on'?lerp(480-Wm/2,480-Wg/2,e):480-Wg/2;row.style.transform=`translate(${x.toFixed(2)}px,-50%)`;
   }};
 }},

{no:'26',cat:'morph',name:'形变',en:'Shape Morph',src:'0:32.3–0:33.4',
 watch:'同一块东西从卡片变圆角、变圆，再变成有光影的球，中间不切镜头。外面那圈细框慢半拍跟着缩，这个「慢半拍」就是跟随。渐变在里面一直流动。',
 params:[R('dur','时长',400,2500,50,1000,'ms'),R('size','终点直径',60,300,5,150,'px'),R('lag','外框滞后',0,300,10,90,'ms'),S('shade','球体光影',[['on','开'],['off','关']],'on'),EZ('inOutCubic',['inOutCubic','outExpo','inOutExpo','spring'])],
 dur:p=>p.dur+p.lag,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);h('div','fill paper',cv);const fr=h('div','mf',cv);const card=h('div','mc',cv);const sh=h('div','msh',card);const S0=[560,320];
   const place=(el,w,hh,r)=>{el.style.cssText=`width:${w.toFixed(2)}px;height:${hh.toFixed(2)}px;left:${(480-w/2).toFixed(2)}px;top:${(270-hh/2).toFixed(2)}px;border-radius:${r.toFixed(2)}px`;};
   return{update(t){
     const e=ease(pr(t,0,p.dur)),w=lerp(S0[0],p.size,e),hh=lerp(S0[1],p.size,e);
     place(card,w,hh,lerp(26,Math.min(w,hh)/2,clamp(e*1.3)));
     card.style.backgroundPosition=`${(50+30*Math.sin(t/700)).toFixed(1)}% ${(50+30*Math.cos(t/900)).toFixed(1)}%`;
     sh.style.opacity=p.shade==='on'?EASE.inCubic(clamp((e-.35)/.65)).toFixed(3):0;
     const e2=ease(pr(t,p.lag,p.dur)),fw=lerp(S0[0],p.size,e2)+60,fh=lerp(S0[1],p.size,e2)+60;
     place(fr,fw,fh,lerp(36,Math.min(fw,fh)/2,clamp(e2*1.3)));
   }};
 }},

{no:'27',cat:'morph',name:'胶囊展开',en:'Pill Expand',src:'0:34.0–0:35.3',
 watch:'一个小圆点往右长出一条胶囊，文字在胶囊里稍晚一点淡进来。选「再拉成输入框」，胶囊会继续横向拉长、变高，变成一个输入框，里面的字换成提示语。',
 params:[R('dur','展开时长',200,1200,10,500,'ms'),R('delay','文字延迟',0,400,10,120,'ms'),S('to','展开到',[['input','再拉成输入框'],['pill','停在胶囊']],'input'),EZ('outExpo',['outExpo','inOutCubic','outBack','spring'])],
 dur:p=>p.dur+p.delay+(p.to==='input'?400+p.dur:0),main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);h('div','fill paper',cv);const pill=h('div','pill',cv);h('div','orb',pill);
   const lb=h('div','pl',pill,'问问助手');const ph=h('div','ph',pill,'问点什么，或者用 @ 引用文件…');
   const W1=230,s2=p.dur+p.delay+400;
   return{update(t){
     const e1=ease(pr(t,0,p.dur));let w=lerp(56,W1,e1),hh=56,lo=EASE.outCubic(pr(t,p.delay,260)),po=0;
     if(p.to==='input'){const e2=ease(pr(t,s2,p.dur));w=lerp(w,720,e2);hh=lerp(56,96,e2);lo*=1-pr(t,s2,140);po=EASE.outCubic(pr(t,s2+p.dur*.4,300));}
     pill.style.cssText=`width:${w.toFixed(2)}px;height:${hh.toFixed(2)}px;left:${(480-w/2).toFixed(2)}px;top:${(270-hh/2).toFixed(2)}px`;
     lb.style.opacity=lo;lb.style.transform=`translateX(${((1-lo)*-12).toFixed(2)}px)`;ph.style.opacity=po;
   }};
 }},

{no:'28',cat:'morph',name:'容器变形接力',en:'Container Transform',src:'0:28.4 文档 → 提案表格',
 watch:'旧内容先淡掉，空卡片直接变成新尺寸，新内容再一行行进来。卡片本身一直在画面里，没有被换掉。四个角上的小点跟着卡片走，是这支片子从头贯穿到尾的取景标记。',
 params:[R('dur','变形时长',200,1200,10,500,'ms'),R('stag','行错峰',0,200,5,70,'ms'),S('marks','角标',[['on','开'],['off','关']],'on'),EZ('inOutCubic',['inOutCubic','outExpo','outBack','spring'])],
 dur:p=>150+p.dur+3*p.stag+280,main:p=>({ease:ez(p.ease,p),prog:t=>pr(t,150,p.dur)}),
 build(cv,p){
   const ease=ez(p.ease,p);h('div','fill paper',cv);const card=h('div','cm',cv);
   const A=h('div','cm-a',card,'<div class="cm-title">替代验证流程</div>'+[90,70,82,55,76,64].map(w=>`<div class="ln" style="width:${w}%"></div>`).join(''));
   const B=h('div','cm-b',card);const rows=[h('div','cm-title',B,'待处理提案')];
   ['82','68','74'].forEach(w=>rows.push(h('div','cm-row',B,`<div class="ln" style="max-width:${w}%"></div><span class="tag">待定</span>`)));
   const mk=[0,1,2,3].map(()=>h('div','mk',cv));if(p.marks!=='on')mk.forEach(m=>m.style.display='none');
   const SA=[420,330],SB=[640,250];
   return{update(t){
     A.style.opacity=1-pr(t,0,150);
     const e=ease(pr(t,150,p.dur)),w=lerp(SA[0],SB[0],e),hh=lerp(SA[1],SB[1],e),x=480-w/2,y=270-hh/2;
     card.style.cssText=`left:${x.toFixed(2)}px;top:${y.toFixed(2)}px;width:${w.toFixed(2)}px;height:${hh.toFixed(2)}px`;
     rows.forEach((r,i)=>{const o=EASE.outCubic(pr(t,150+p.dur+i*p.stag,280));r.style.opacity=o;r.style.transform=`translateY(${((1-o)*10).toFixed(2)}px)`;});
     [[x-16,y-16],[x+w+10,y-16],[x-16,y+hh+10],[x+w+10,y+hh+10]].forEach(([mx,my],i)=>{mk[i].style.transform=`translate(${mx.toFixed(2)}px,${my.toFixed(2)}px)`;});
   }};
 }},

{no:'29',cat:'morph',name:'共享元素转场',en:'Shared Element Transition',src:'0:16.4 图标飞进列表',
 watch:'中间一列图标，每个都飞到列表里自己那一行，落位后后面的文字才开始打。图标从头到尾是同一个东西，只是换了位置，观众的眼睛会被它一路带到新画面。',
 params:[R('dur','飞行时长',200,1200,10,600,'ms'),R('stag','错峰',0,200,5,60,'ms'),S('txt','文字',[['type','落位后打字'],['fade','落位后淡入']],'type'),EZ('inOutCubic',['inOutCubic','outExpo','outBack','spring'])],
 dur:p=>p.dur+3*p.stag+450,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);h('div','fill paper',cv);
   const D=[['说','#EBDDFB','#7B3FD6','先告诉客户可以换个方式验证'],['问','#DCEBFA','#2F7FD1','问一下邮箱和订单号'],['查','#FCE6D6','#D9661E','调用订单查询工具'],['答','#DDF3E1','#2E9A4E','验证通过，继续处理']];
   const it=D.map(([g,bg,fg,tx],i)=>{const ic=h('div','se-ic',cv,g);ic.style.background=bg;ic.style.color=fg;const te=h('div','se-tx',cv);te.style.top=(150+i*72+6)+'px';return{ic,te,tx,s:[456,159+i*58],e:[170,150+i*72]};});
   return{update(t){it.forEach((o,i)=>{
     const e=ease(pr(t,i*p.stag,p.dur));o.ic.style.transform=`translate(${lerp(o.s[0],o.e[0],e).toFixed(2)}px,${lerp(o.s[1],o.e[1],e).toFixed(2)}px)`;
     const land=i*p.stag+p.dur;
     if(p.txt==='type'){const n=t<land?0:Math.floor((t-land)/28)+1;o.te.textContent=o.tx.slice(0,n);}
     else{o.te.textContent=o.tx;o.te.style.opacity=EASE.outCubic(pr(t,land,250));}
   });}};
 }},

{no:'30',cat:'motion',name:'景别跳切',en:'Scale Jump Cut',src:'0:08.98 输入框特写 → 全景',
 watch:'同一个输入框，先是贴得很近的特写，然后一刀切到全景。东西和位置都没变，变的只是景别。特写那段一直在慢慢往里推，切过去之后画面马上稳下来，这一下「松开」很舒服。',
 params:[R('zoom','特写倍数',1.5,4,.1,2.6,'×'),R('hold','特写时长',200,2000,50,900,'ms'),R('push','特写内慢推',0,15,1,5,'%'),S('after','切过去之后',[['drift','继续慢拉'],['still','静止']],'drift')],
 dur:p=>p.hold+1100,
 main:p=>({ease:x=>x<.5?0:1,prog:t=>t<p.hold?clamp(t/p.hold)*.5:1,label:'硬切',bez:'0 帧过渡，景别瞬间改变'}),
 build(cv,p){
   const bg=h('div','fill',cv);bg.style.background='linear-gradient(135deg,#9DB0C2,#CBD5DD 45%,#7D7FA8)';
   const cam=h('div','fill',cv);cam.style.transformOrigin='0 0';
   h('div','ibox',cam,'<div class="ib-chip">客服助手 ×</div><div class="ib-tx">为什么客户总要转人工？</div><div class="ib-at">@</div><div class="ib-send"></div>');
   return{update(t){
     let s,A;
     if(t<p.hold){s=p.zoom*(1+p.push/100*pr(t,0,p.hold));A=[380,262];}
     else{s=p.after==='drift'?1-.04*EASE.outCubic(pr(t,p.hold,1100)):1;A=[480,270];}
     cam.style.transform=`translate(${(480-s*A[0]).toFixed(2)}px,${(270-s*A[1]).toFixed(2)}px) scale(${s.toFixed(4)})`;
   }};
 }},

{no:'31',cat:'motion',name:'拉远揭示',en:'Pull-back Reveal',src:'0:47.1 UI 特写 → 整页',
 watch:'先只给你看一个细节，镜头往后拉，你才发现它只是整页里的一小块。曲线用「急停」：一开始退得很快，最后一段慢慢停稳。原片这里是用跳切做的，连续拉远是更顺的版本。',
 params:[R('dur','时长',400,2500,50,900,'ms'),R('from','起始倍数',2,6,.1,3.5,'×'),EZ('outExpo',['outExpo','inOutCubic','outCubic','linear'])],
 dur:p=>p.dur,main:p=>({ease:ez(p.ease,p),len:p.dur}),
 build(cv,p){
   const ease=ez(p.ease,p);h('div','fill paper',cv);const cam=h('div','fill',cv);cam.style.transformOrigin='0 0';
   const pg=h('div','pg',cam);
   pg.innerHTML=`<div style="position:absolute;left:0;top:0;right:0;height:44px;border-bottom:1px solid #EFEFF1"></div>
     <div class="ln" style="position:absolute;left:20px;top:15px;width:90px;margin:0"></div>
     <div style="position:absolute;left:0;top:44px;bottom:0;width:150px;border-right:1px solid #EFEFF1"></div>
     ${[0,1,2,3,4].map(i=>`<div class="ln" style="position:absolute;left:20px;top:${70+i*30}px;width:${90-i*8}px;margin:0"></div>`).join('')}
     <div style="position:absolute;left:180px;top:62px;font-size:22px;font-weight:700;color:#17181B">智能体设置</div>
     ${[170,160,175,120,165,140].map((w,i)=>`<div class="ln" style="position:absolute;left:180px;top:${112+i*24}px;width:${w}px;margin:0"></div>`).join('')}
     <div style="position:absolute;left:380px;top:108px;font-size:15px;font-weight:700;color:#17181B">默认语言</div>
     <div class="ln" style="position:absolute;left:380px;top:136px;width:200px;margin:0"></div>
     <div class="pg-row" style="top:160px">English<span class="tag2">默认</span></div>
     <div class="pg-row hl" style="top:200px">西班牙语</div>
     <div style="position:absolute;left:380px;top:258px;font-size:15px;font-weight:700;color:#17181B">模型</div>
     <div class="ln" style="position:absolute;left:380px;top:286px;width:180px;margin:0"></div>
     <div class="pg-row" style="top:310px">GPT-4o</div>`;
   [[-14,-14],[648,-14],[-14,388],[648,388]].forEach(([x,y])=>{h('div','mk',cam).style.transform=`translate(${x}px,${y}px)`;});
   return{update(t){
     const e=ease(pr(t,0,p.dur)),s=Math.pow(p.from,1-e),ax=lerp(495,320,e),ay=lerp(216,190,e);
     cam.style.transform=`translate(${(480-s*ax).toFixed(2)}px,${(270-s*ay).toFixed(2)}px) scale(${s.toFixed(4)})`;
   }};
 }},

{no:'32',cat:'texture',name:'双色调褪色',en:'Duotone to Color',src:'0:50.5 照片三联',
 watch:'照片刚出来时只有一种色调（深浅两种颜色），然后真实的颜色慢慢回来。配合「由小方块长成照片」，像是从品牌色里把真实世界显影出来。',
 params:[R('dur','褪色时长',200,1500,10,600,'ms'),R('delay','褪色延迟',0,800,10,250,'ms'),S('tone','双色调',[['pink','品红'],['blue','靛蓝'],['orange','橙']],'pink'),S('grow','长出来',[['on','开'],['off','关']],'on')],
 dur:p=>Math.max(p.delay+p.dur,570)+150,
 main:p=>({ease:EASE.inOutCubic,prog:t=>pr(t,p.delay,p.dur),label:'褪色（缓入缓出）',bez:'单色调那一层的透明度从 1 走到 0'}),
 build(cv,p,ctx){
   h('div','fill paper',cv);const TONES={pink:['#4A1236','#F4C6DD'],blue:['#1A1F5C','#BFD3F2'],orange:['#4A1E05','#FFD3A6']};const flt=ctx.duotone(...TONES[p.tone]);
   const tiles=[0,1,2].map(i=>{const d=h('div','dt',cv);const c1=h('canvas','',d),c2=h('canvas','',d);[c1,c2].forEach(c=>{c.width=440;c.height=600;paintPhoto(c,i);});c2.style.filter=flt;return{d,c2,cx:480+(i-1)*250,st:i===1?0:120};});
   return{update(t){
     const fo=1-EASE.inOutCubic(pr(t,p.delay,p.dur));
     tiles.forEach(o=>{
       let w=220,hh=300,op=1;
       if(p.grow==='on'){const e=EASE.outExpo(pr(t,o.st,450));w=lerp(56,220,e);hh=lerp(56,300,e);op=t<o.st?0:1;}
       o.d.style.cssText=`opacity:${op};width:${w.toFixed(2)}px;height:${hh.toFixed(2)}px;left:${(o.cx-w/2).toFixed(2)}px;top:${(270-hh/2).toFixed(2)}px`;
       o.c2.style.opacity=fo.toFixed(3);
     });
   }};
 }},

{no:'33',cat:'texture',name:'鱼眼凸起网格',en:'Lens Bulge Grid',src:'全片背景',ambient:true,
 watch:'背景是一片圆角方格，中间像隔着放大镜一样鼓起来，四周被压扁，而且一直在慢慢漂、轻轻呼吸。它不抢戏，但让白底一直是活的。把凸起强度拉到 0 对比一下。',
 params:[R('k','凸起强度',0,1,.05,.5),R('cell','格子尺寸',40,160,5,90,'px'),R('speed','漂移速度',0,80,1,18,'px/s'),S('bg','底色',[['light','亮底'],['dark','暗底']],'light')],
 dur:p=>bulgePer(p),
 build(cv,p){
   const dark=p.bg==='dark';const bg=h('div','fill',cv);bg.style.background=dark?'#0E0F12':'#F2F1EE';
   const c=h('canvas','fill',cv);c.width=1920;c.height=1080;c.style.width='960px';c.style.height='540px';const g=c.getContext('2d');
   h('div','bz-tile'+(dark?' dk':''),cv,'<i></i><i></i>');
   const per=bulgePer(p),N=28,a=p.cell*.39,pts=[];
   for(let j=0;j<N;j++){const th=j/N*Math.PI*2,co=Math.cos(th),si=Math.sin(th);pts.push([a*Math.sign(co)*Math.sqrt(Math.abs(co)),a*Math.sign(si)*Math.sqrt(Math.abs(si))]);}
   return{update(t){
     const u=(((t%per)+per)%per)/per,off=(p.speed*u*per/1000)%p.cell,k=p.k*(1+.1*Math.sin(u*Math.PI*2)),cx=480,cy=270,Rr=560;
     g.setTransform(2,0,0,2,0,0);g.clearRect(0,0,960,540);g.strokeStyle=dark?'rgba(255,255,255,.09)':'rgba(23,24,27,.11)';g.lineWidth=1.2;
     const i0=Math.floor((-p.cell-480-off)/p.cell),i1=Math.ceil((960+p.cell-480-off)/p.cell),j0=Math.floor((-p.cell-270-off)/p.cell),j1=Math.ceil((540+p.cell-270-off)/p.cell);
     for(let i=i0;i<=i1;i++)for(let j=j0;j<=j1;j++){
       const x=480+i*p.cell+off,y=270+j*p.cell+off;g.beginPath();
       pts.forEach(([px,py],n)=>{let X=x+px,Y=y+py;const dx=X-cx,dy=Y-cy,d=Math.hypot(dx,dy)/Rr;if(d<1){const f=1+k*Math.pow(1-d*d,2);X=cx+dx*f;Y=cy+dy*f;}n?g.lineTo(X,Y):g.moveTo(X,Y);});
       g.closePath();g.stroke();
     }
   }};
 }},
];

/* ── 卡片引擎 ── */
const PRE=300,HOLD=900,FRAME=1000/30;
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ICON={
  play:'<svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z" fill="currentColor"/></svg>',
  pause:'<svg viewBox="0 0 16 16"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor"/></svg>',
  prev:'<svg viewBox="0 0 16 16"><path d="M3 3h2v10H3zM13 3v10L6 8z" fill="currentColor"/></svg>',
  next:'<svg viewBox="0 0 16 16"><path d="M11 3h2v10h-2zM3 3v10l7-5z" fill="currentColor"/></svg>',
  again:'<svg viewBox="0 0 16 16"><path d="M8 2.5a5.5 5.5 0 1 1-5.2 3.7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M1.6 2.2l1.5 4.3 4.1-1.8z" fill="currentColor"/></svg>',
};
const SPEEDS=[[1,'1×'],[.5,'½×'],[.25,'¼×'],[.1,'0.1×']];
const TERM={std:'通用叫法',en:'英文通用',own:'自拟叫法'};
const TERM_OF={'00':'std','01':'std','02':'std','03':'en','04':'own','05':'std','06':'std','07':'std','08':'std','09':'en','10':'std','11':'en','12':'en','13':'std','14':'std','15':'std','16':'std','17':'std','18':'std','19':'std','20':'en','21':'en','22':'own','23':'std','24':'en','25':'std','26':'std','27':'own','28':'en','29':'std','30':'std','31':'std','32':'std','33':'own'};
const fmt=(q,v)=>{const dec=(String(q.step).split('.')[1]||'').length;return Number(v).toFixed(dec)+(q.unit||'');};
const cards=[];

function makeCard(def,mount){
  const p={};def.params.forEach(q=>p[q.key]=q.val);
  const st={t:0,playing:!reduceMotion,speed:1,visible:false,total:1000};
  const ctx=makeCtx();let fx,main,motion;

  const root=h('article','card'+(def.wide?' wide':''),mount);root.id='fx'+def.no;
  const stage=h('div','stage',root);const cv=h('div','canvas',stage);
  new ResizeObserver(()=>{cv.style.transform=`scale(${stage.clientWidth/960})`;}).observe(stage);

  const tr=h('div','transport',root);
  const btn=(icon,label)=>{const b=h('button','tb',tr,ICON[icon]);b.type='button';b.setAttribute('aria-label',label);b.title=label;return b;};
  const bPlay=btn('pause','播放 / 暂停'),bAgain=btn('again','从头播'),bPrev=btn('prev','上一帧'),bNext=btn('next','下一帧');
  const scrub=h('input','scrub',tr);scrub.type='range';scrub.min=0;scrub.max=1000;scrub.step=1;scrub.setAttribute('aria-label','时间轴');scrub.id='scrub'+def.no;
  const tc=h('span','tc',tr);
  const seg=h('div','seg',tr);const spBtns=SPEEDS.map(([v,l])=>{const b=h('button','',seg,l);b.type='button';b.onclick=()=>setSpeed(v);return[v,b];});

  const body=h('div','body',root);
  h('div','meta',body,`<span class="no">#${def.no}</span><h3>${def.name}</h3><span class="en">${def.en}</span><span class="term ${TERM_OF[def.no]}">${TERM[TERM_OF[def.no]]}</span>`);
  h('p','watch',body,`<b>盯这里</b>${def.watch}`);
  if(def.src)h('p','src',body,`出处：ElevenLabs Agents Architect 发布片 ${def.src}`);
  const tune=h('div','tune',body);const prms=h('div','prms',tune);
  let gCan,gCap;if(def.main){const gw=h('div','graph',tune);gCan=h('canvas','',gw);gCap=h('div','gcap',gw);}
  const codeRow=h('div','code',body);const code=h('code','',codeRow);const bCopy=h('button','copy',codeRow,'复制调用码');bCopy.type='button';

  def.params.forEach(q=>{
    const id=`p${def.no}-${q.key}`;const w=h('div','prm',prms);const lab=h('label','',w);lab.htmlFor=id;h('span','',lab,q.label);const out=h('output','',lab);
    let inp;
    if(q.type==='range'){inp=h('input','',w);inp.type='range';inp.min=q.min;inp.max=q.max;inp.step=q.step;inp.value=q.val;}
    else{inp=h('select','',w);const opts=q.type==='ease'?q.opts.map(k=>[k,EASE_INFO[k][0]]):q.opts;opts.forEach(([v,l])=>{const o=h('option','',inp,l);o.value=v;});inp.value=q.val;}
    inp.id=id;
    const show=()=>{out.textContent=q.type==='range'?fmt(q,p[q.key]):'';};
    inp.addEventListener('input',()=>{p[q.key]=q.type==='range'?+inp.value:inp.value;show();rebuild(true);});
    inp.addEventListener('change',()=>{st.t=0;setPlaying(true);render();});
    show();
  });

  function codeStr(){
    return `#${def.no} ${def.name}（${def.en}）｜`+def.params.map(q=>{
      const v=p[q.key];
      if(q.type==='range')return `${q.label} ${fmt(q,v)}`;
      if(q.type==='ease')return `曲线 ${EASE_INFO[v][0]}`;
      return `${q.label} ${q.opts.find(o=>o[0]===v)[1]}`;
    }).join('｜');
  }
  function rebuild(keep){
    ctx.cleanup();cv.innerHTML='';
    fx=def.build(cv,p,ctx);main=def.main?def.main(p):null;motion=def.dur(p);
    st.total=def.ambient?motion:PRE+motion+HOLD;
    st.t=keep?Math.min(st.t,st.total):(def.ambient?0:PRE+motion);
    code.textContent=codeStr();
    if(main){
      const k=p.ease;
      const label=main.label||(k?EASE_INFO[k][0]:'');
      const bez=main.bez||(k?(k==='outBack'&&p.back!=null?`回弹量 ${p.back}`:EASE_INFO[k][1]):'');
      gCap.innerHTML=`${label}<span>${bez}</span>`;
      let lo=0,hi=1;for(let i=0;i<=120;i++){const y=main.ease(i/120);lo=Math.min(lo,y);hi=Math.max(hi,y);}
      main.range=[lo,hi];
    }
    render();
  }
  function drawGraph(local){
    const dpr=Math.min(2,window.devicePixelRatio||1),W=168,H=104;
    if(gCan.width!==W*dpr){gCan.width=W*dpr;gCan.height=H*dpr;}
    const g=gCan.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const[lo,hi]=main.range,pad=10,X=x=>pad+x*(W-2*pad),Y=y=>H-pad-(y-lo)/(hi-lo)*(H-2*pad);
    g.strokeStyle='#ffffff26';g.lineWidth=1;g.setLineDash([3,3]);g.beginPath();g.moveTo(X(0),Y(0));g.lineTo(X(1),Y(0));g.moveTo(X(0),Y(1));g.lineTo(X(1),Y(1));g.stroke();g.setLineDash([]);
    g.strokeStyle='#5C6270';g.lineWidth=1.5;g.beginPath();for(let i=0;i<=120;i++){const x=i/120;i?g.lineTo(X(x),Y(main.ease(x))):g.moveTo(X(x),Y(main.ease(x)));}g.stroke();
    const x=main.prog?main.prog(local):pr(local,0,main.len);
    g.strokeStyle='#FF5A1F';g.lineWidth=2.2;g.beginPath();const n=Math.round(120*x);for(let i=0;i<=n;i++){const u=i/120;i?g.lineTo(X(u),Y(main.ease(u))):g.moveTo(X(u),Y(main.ease(u)));}g.lineTo(X(x),Y(main.ease(x)));g.stroke();
    g.strokeStyle='#FF5A1F55';g.lineWidth=1;g.beginPath();g.moveTo(X(x),4);g.lineTo(X(x),H-4);g.stroke();
    g.fillStyle='#FF5A1F';g.beginPath();g.arc(X(x),Y(main.ease(x)),4,0,Math.PI*2);g.fill();
  }
  function render(){
    const local=def.ambient?st.t:st.t-PRE;fx.update(local);
    scrub.value=Math.round(st.t/st.total*1000);
    const F=Math.round(motion/FRAME),f=Math.floor(local/FRAME);
    tc.textContent=def.ambient?`循环 · ${(local/1000).toFixed(2)}s / ${(motion/1000).toFixed(1)}s`:local<0?`预备 · 共 ${F} 帧`:local>motion?`落定 · 共 ${F} 帧`:`第 ${String(f).padStart(2,'0')} 帧 / ${F} · ${Math.round(local)}ms`;
    if(main)drawGraph(local);
  }
  function setPlaying(v){st.playing=v;bPlay.innerHTML=v?ICON.pause:ICON.play;if(v&&st.t>=st.total)st.t=0;}
  function setSpeed(v){st.speed=v;spBtns.forEach(([s,b])=>b.setAttribute('aria-pressed',String(s===v)));}
  bPlay.onclick=()=>setPlaying(!st.playing);
  bAgain.onclick=()=>{st.t=0;setPlaying(true);render();};
  bPrev.onclick=()=>{setPlaying(false);st.t=clamp(st.t-FRAME,0,st.total);render();};
  bNext.onclick=()=>{setPlaying(false);st.t=clamp(st.t+FRAME,0,st.total);render();};
  scrub.addEventListener('input',()=>{setPlaying(false);st.t=scrub.value/1000*st.total;render();});
  bCopy.onclick=()=>{
    const s=codeStr();
    const done=()=>{bCopy.textContent='已复制';setTimeout(()=>bCopy.textContent='复制调用码',1400);};
    const fallback=()=>{const r=document.createRange();r.selectNodeContents(code);const sel=getSelection();sel.removeAllRanges();sel.addRange(r);bCopy.textContent='已选中，按 ⌘C';setTimeout(()=>bCopy.textContent='复制调用码',2400);};
    try{navigator.clipboard.writeText(s).then(done,fallback);}catch(e){fallback();}
  };
  setSpeed(1);setPlaying(st.playing);rebuild(false);
  const card={def,st,root,render,rebuild,setPlaying,setSpeed};cards.push(card);return card;
}

/* ── 页面组装 ── */
const app=document.getElementById('app'),nav=document.getElementById('nav');
CATS.forEach(cat=>{
  const list=FX.filter(f=>f.cat===cat.id);
  const sec=h('section','cat',app);sec.id=cat.id;
  h('h2','',sec,`${cat.name}<span>${list.map(f=>'#'+f.no).join(' ')}</span>`);h('p','',sec,cat.desc);
  const grid=h('div','grid',sec);list.forEach(d=>makeCard(d,grid));
  const a=h('a','',nav,`${cat.name}<span>${list.length}</span>`);a.href='#'+cat.id;
});
const gs=document.getElementById('gspeed');
const gBtns=SPEEDS.map(([v,l])=>{const b=h('button','',gs,l);b.type='button';b.onclick=()=>{cards.forEach(c=>c.setSpeed(v));gBtns.forEach(([s,x])=>x.setAttribute('aria-pressed',String(s===v)));};return[v,b];});
gBtns[0][1].setAttribute('aria-pressed','true');
document.getElementById('gpause').onclick=()=>cards.forEach(c=>c.setPlaying(false));
document.getElementById('gplay').onclick=()=>cards.forEach(c=>c.setPlaying(true));

const io=new IntersectionObserver(es=>es.forEach(e=>{const c=cards.find(c=>c.root===e.target);if(!c)return;c.st.visible=e.isIntersecting;if(e.isIntersecting)c.render();}),{rootMargin:'200px'});
cards.forEach(c=>io.observe(c.root));

let last=performance.now();
function tick(now){
  const dt=Math.min(64,now-last);last=now;
  for(const c of cards){if(!c.st.visible||!c.st.playing)continue;c.st.t+=dt*c.st.speed;if(c.st.t>c.st.total)c.st.t=c.def.ambient?c.st.t-c.st.total:0;c.render();}
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>cards.forEach(c=>c.rebuild(true)));
})();
