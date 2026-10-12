---
title: "MCP：给 AI 的万能插头"
description: "上一篇说，AI 要能办事，得给它接上各种工具。那问题来了：工具成千上万，AI 也有好多家，怎么接？MCP 就是为这事定的一个规矩。"
date: 2026-10-10
tags: ["AI 白话课", "AI 开始自己办事了"]
level: 入门
series: AI 白话课
order: 7
kicker: "MCP · 模型上下文协议"
featured: false
---

## 还记得那一抽屉充电线吗

<p>前些年，家里总有一个抽屉，塞满了各种充电线。这个手机是圆口的，那个是扁口的，耳机又是另一种。换个手机，一堆线就作废了。</p>

<p>后来大家慢慢都统一到了 Type-C。一根线，手机、平板、耳机、笔记本都能充。</p>

<p>AI 接工具，以前也是那一抽屉线的状态。</p>

<div class="figure">
<div class="tabs">
<button class="tab on" data-m="before">以前</button>
<button class="tab" data-m="after">有了 MCP</button>
</div>
<svg class="plug" id="svg" viewbox="0 0 440 230"></svg>
<div class="cap" id="cap"></div>
</div>

<p>以前，每家 AI 想用一个工具，都得单独写一套对接的程序。3 家 AI、4 个工具，就要接 12 次。工具一多，根本接不过来。</p>

<p>MCP 的思路是：大家约好一个统一的接口。工具这边按这个标准做一次，AI 那边按这个标准支持一次，然后<strong>谁都能插谁</strong>。</p>

## 这三个字母什么意思

<p>MCP 是 Model Context Protocol 的缩写，中文一般叫"模型上下文协议"。</p>

<ul>
<li><b>Model</b>，模型，就是 AI。</li>
<li><b>Context</b>，上下文，就是 AI 干活时能看到的信息（第 3 篇讲过）。</li>
<li><b>Protocol</b>，协议，就是大家约好的规矩。</li>
</ul>

<p>连起来就是：<strong>一套给 AI 送信息、送工具的通用规矩。</strong></p>

<p>它是 2024 年底由 Anthropic（做 Claude 的公司）提出来的，后来 OpenAI、谷歌、微软，还有国内不少厂商都陆续支持了，现在基本成了行业里通用的做法。</p>

## 插上了会怎样

<p>下面这个 AI 一开始什么工具都没接。你可以先问问题，再给它插上工具，看看区别：</p>

<div class="figure">
<div class="demo-title">动手试试：给 AI 插工具</div>
<div style="font-size:13px;color:var(--muted);margin-bottom:6px">点一下就插上 / 拔掉</div>
<div class="toolbox" id="tb">
<button class="tool" data-t="cal">日历</button>
<button class="tool" data-t="file">电脑文件</button>
<button class="tool" data-t="map">地图</button>
</div>
<div class="ask-row" id="qs">
<button data-q="cal">明天下午我有空吗？</button>
<button data-q="file">帮我找一下上个月的那份报价单。</button>
<button data-q="map">从公司到火车站现在开车要多久？</button>
</div>
<div id="ans"></div>
</div>

<p>AI 还是同一个 AI，脑子没变。变的是它<strong>能看到什么、能碰到什么</strong>。</p>

## 跟普通人有什么关系

<p>老实说，MCP 主要是写程序的人关心的事，普通人不需要自己去"插"。但它会实实在在地影响你用到的东西：</p>

<ul>
<li>你用的 AI 助手，能连的东西会越来越多：日历、笔记、网盘、邮箱、公司的系统。</li>
<li>做工具的人只要做一次，各家 AI 都能用，所以好用的工具会冒出来得更快。</li>
<li>你换一个 AI 用，之前接好的工具大多还能接着用，不用从头来。</li>
</ul>

<p>你在一些 AI 软件的设置里，可能会看到"MCP 服务器""连接器""插件"之类的选项，那就是在管这些插头。</p>

## 插头越多，越要小心

<p>给 AI 接上工具，就等于把家里的钥匙交了一把给它。接上邮箱，它就能读你的邮件；接上文件，它就能动你的文件。</p>

<ul>
<li><b>只装信得过的。</b>来路不明的 MCP 工具，跟来路不明的 App 一样，可能偷数据。</li>
<li><b>能只读就只读。</b>只需要它查东西，就别给它改、删的权限。</li>
<li><b>留意它要做什么。</b>正规的软件在 AI 调用工具前会提示你确认，别看都不看就点"允许"。</li>
</ul>

<div class="remember">
<div class="label">记住这一句</div>
<p>MCP 就是 AI 世界的 Type-C 口。工具按这个标准做一次，所有 AI 都能插上用。</p>
</div>

<style>.prose .plug text{font-size:13px}.prose .toolbox{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}.prose .tool{font:inherit;font-size:14px;padding:6px 12px;border-radius:6px;border:1px dashed #b9ae9e;background:#faf7f0;cursor:pointer}.prose .tool.on{border-style:solid;border-color:var(--green);background:var(--green-soft);color:var(--green)}.prose .tool.on::before{content:"✓ "}.prose .ask-row{display:flex;flex-direction:column;gap:6px}.prose .ask-row button{text-align:left;font:inherit;font-size:14.5px;padding:8px 12px;border-radius:6px;border:1px solid var(--line);background:#fff;cursor:pointer}.prose .ask-row button:hover{border-color:#bbb}
</style>

<script>
const ais = ['AI 甲','AI 乙','AI 丙'], tools = ['日历','邮箱','文件','地图'];
function box(x,y,w,t,fill){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="34" rx="6" fill="'+fill+'"/><text x="'+(x+w/2)+'" y="'+(y+22)+'" text-anchor="middle" fill="#2a2724">'+t+'</text>';}
function draw(m){
  let s='';
  const ay = [30,98,166], ty=[14,66,118,170];
  if(m==='before'){
    const colors=['#c0562f','#2f6474','#4f7a3a'];
    ay.forEach((y,i)=>ty.forEach(t=>{ s+='<path d="M110 '+(y+17)+' C200 '+(y+17)+' 240 '+(t+17)+' 330 '+(t+17)+'" stroke="'+colors[i]+'" stroke-width="1.6" fill="none" opacity=".6"/>'; }));
    document.getElementById('cap').textContent='每一对都要单独接一次：3 × 4 = 12 根线';
  } else {
    ay.forEach(y=>{ s+='<line x1="110" y1="'+(y+17)+'" x2="195" y2="115" stroke="#2a2724" stroke-width="1.8"/>'; });
    ty.forEach(t=>{ s+='<line x1="245" y1="115" x2="330" y2="'+(t+17)+'" stroke="#2a2724" stroke-width="1.8"/>'; });
    s+='<rect x="190" y="90" width="60" height="50" rx="8" fill="#2a2724"/><text x="220" y="120" text-anchor="middle" fill="#fff" font-weight="700">MCP</text>';
    document.getElementById('cap').textContent='大家都接到同一个标准上：3 + 4 = 7 根线，以后再加谁都方便';
  }
  ay.forEach((y,i)=>s+=box(20,y,90,ais[i],'#dce8eb'));
  ty.forEach((y,i)=>s+=box(330,y,90,tools[i],'#f6ecc9'));
  const svg=document.getElementById('svg'); svg.innerHTML=s; svg.classList.remove('fade'); void svg.offsetWidth; svg.classList.add('fade');
}
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));t.classList.add('on');draw(t.dataset.m);});
draw('before');

const on = {cal:false,file:false,map:false};
const qText = {cal:'明天下午我有空吗？',file:'帮我找一下上个月的那份报价单。',map:'从公司到火车站现在开车要多久？'};
const without = {
  cal:'抱歉，我看不到你的日程安排。你可以打开日历看一下，或者把明天的安排告诉我。',
  file:'我没法访问你电脑上的文件。你可以按修改日期排序，或者搜索“报价”两个字试试。',
  map:'我查不到实时路况。一般来说开车大概二三十分钟，具体建议用导航软件看一下。'
};
const withT = {
  cal:'<i style="color:#4f7a3a">[正在用：日历]</i><br>明天下午 2 点到 3 点有个项目会，其他时间都空着，3 点以后可以安排。',
  file:'<i style="color:#4f7a3a">[正在用：电脑文件]</i><br>找到了：“报价单_华东客户_9月.xlsx”，9 月 18 日修改的，在“文档/客户”文件夹里。',
  map:'<i style="color:#4f7a3a">[正在用：地图]</i><br>现在出发大约 26 分钟，中山路那段有点堵，走滨江路能快 5 分钟左右。'
};
let lastQ=null;
function answer(q){
  lastQ=q;
  document.getElementById('ans').innerHTML='<div class="bubble me fade" style="margin-top:14px">'+qText[q]+'</div><div class="bubble ai fade">'+(on[q]?withT[q]:without[q])+'</div>';
}
document.querySelectorAll('.tool').forEach(b=>b.onclick=()=>{ on[b.dataset.t]=!on[b.dataset.t]; b.classList.toggle('on'); if(lastQ) answer(lastQ); });
document.querySelectorAll('#qs button').forEach(b=>b.onclick=()=>answer(b.dataset.q));
</script>
