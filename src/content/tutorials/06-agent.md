---
title: "Agent：从\"出主意\"到\"去办事\""
description: "这两年 AI 圈最热的词，可能就是 Agent 了，中文常叫\"智能体\"。说白了就一件事：AI 不光会说，还开始会做了。"
date: 2026-10-10
tags: ["AI 白话课", "AI 开始自己办事了"]
level: 入门
series: AI 白话课
order: 6
kicker: "AGENT · 智能体"
featured: false
---

## 军师和跑腿的

<p>你问普通的聊天 AI："周六晚上想带爸妈吃顿饭，帮我订个餐厅。"</p>

<p>它会很热心地告诉你：可以考虑离家近的、口味清淡的、有包间的，订之前记得打电话确认……说得都对，但<strong>最后还得你自己去订</strong>。它是个军师，只出主意。</p>

<p>Agent 不一样。同样一句话交给它，它会自己去查附近的餐厅、看评价、看有没有空位，然后真的帮你把位子订上。它是个能跑腿的。</p>

## 它是怎么干活的

<p>Agent 干活的套路，跟人办事差不多，就是一个圈，反复转：</p>

<div class="figure">
<svg class="loop" viewbox="0 0 420 230">
<defs><marker id="ar" markerheight="8" markerwidth="8" orient="auto" refx="6" refy="4"><path d="M0,0 L8,4 L0,8 z" fill="#857d75"></path></marker></defs>
<path d="M150 62 Q210 20 270 62" fill="none" marker-end="url(#ar)" stroke="#857d75" stroke-width="2"></path>
<path d="M300 120 Q300 175 240 190" fill="none" marker-end="url(#ar)" stroke="#857d75" stroke-width="2"></path>
<path d="M180 190 Q120 175 120 120" fill="none" marker-end="url(#ar)" stroke="#857d75" stroke-width="2"></path>
<rect fill="#f6ecc9" height="56" rx="10" width="120" x="60" y="62"></rect>
<text fill="#2a2724" font-weight="700" text-anchor="middle" x="120" y="88">想一想</text>
<text fill="#6b635b" font-size="12.5" text-anchor="middle" x="120" y="108">下一步该干嘛</text>
<rect fill="#dce8eb" height="56" rx="10" width="120" x="240" y="62"></rect>
<text fill="#2a2724" font-weight="700" text-anchor="middle" x="300" y="88">动动手</text>
<text fill="#6b635b" font-size="12.5" text-anchor="middle" x="300" y="108">用个工具去做</text>
<rect fill="#e3edda" height="56" rx="10" width="120" x="150" y="170"></rect>
<text fill="#2a2724" font-weight="700" text-anchor="middle" x="210" y="196">看结果</text>
<text fill="#6b635b" font-size="12.5" text-anchor="middle" x="210" y="216">成了没有</text>
</svg>
<div class="cap">一直转，直到事情办完，或者遇到需要问你的地方</div>
</div>

<p>关键在"看结果"这一步。事情不总是一次就成的，订不上就换一家，查不到就换个关键词。普通的聊天 AI 说完一段话就停了，Agent 会根据结果<strong>自己调整下一步</strong>。</p>

<p>下面一步一步看它怎么订这顿饭：</p>

<div class="figure">
<div class="demo-title">动手试试：看 Agent 订餐厅</div>
<div class="bubble me">周六晚上 6 点，带我爸妈吃饭，一共 3 个人，离家近点，我爸不吃辣。</div>
<div class="log" id="log"></div>
<div class="btns">
<button class="btn primary" id="next">下一步</button>
<button class="btn" id="reset">重来</button>
</div>
</div>

<p>注意第 7 步：付钱之前，它停下来问了你。靠谱的 Agent 都应该这样，<strong>花钱、发消息、删东西这类收不回来的事，要先问人</strong>。</p>

## 它凭什么能"动手"？

<p>AI 本身只会处理文字，它没有手。能动手，是因为有人给它接上了各种"工具"：能搜索网页的、能打开 App 的、能读写文件的、能发邮件的。</p>

<p>AI 负责动脑子，判断该用哪个工具、怎么用；工具负责真正去执行。这就像一个聪明的经理，手下配了一群干具体活的人。</p>

<p>怎么给 AI 接工具？这就要说到下一篇的 MCP 了。</p>

## 现在都能见到哪些 Agent

<ul>
<li><b>手机上：</b>一些手机助手已经能帮你点外卖、打车、回消息，你说一句，它在各个 App 之间点来点去。</li>
<li><b>写程序：</b>程序员用的编程 Agent，能自己读代码、改代码、跑测试，出了错再修。这是目前 Agent 用得最成熟的地方。</li>
<li><b>查资料：</b>"深度研究"类的功能，它会自己搜几十个网页，读完再整理成一份报告给你。</li>
<li><b>办公：</b>帮你整理表格、写周报、把一堆文件归类。</li>
</ul>

## 还没那么神

<p>说实话，Agent 现在还处在"能用，但得盯着"的阶段：</p>

<ul>
<li>步骤一多，中间哪一步理解偏了，后面就一路错下去。</li>
<li>它可能会很"自信"地办错事，比如订错日期。</li>
<li>你给它的权限越大，出错的代价越大。</li>
</ul>

<p>所以现阶段的正确用法是：<strong>让它干，但你来把关</strong>。小事放手，大事过目。</p>

<div class="remember">
<div class="label">记住这一句</div>
<p>聊天 AI 是出主意的军师，Agent 是能跑腿的助手。它会自己想、自己做、看结果再调整，但关键的事得你点头。</p>
</div>

<style>.prose .log{background:#fff;border:1px solid var(--line);border-radius:8px;padding:6px 14px;min-height:120px}.prose .row{display:flex;gap:10px;padding:8px 0;border-bottom:1px dashed var(--line);font-size:14.5px;line-height:1.65}.prose .row:last-child{border-bottom:0}.prose .tag{flex:none;font-size:12px;padding:1px 8px;border-radius:10px;height:22px;line-height:20px;margin-top:1px}.prose .t-think{background:var(--yellow-soft);color:#7a5b10}.prose .t-do{background:var(--blue-soft);color:var(--blue)}.prose .t-see{background:var(--green-soft);color:var(--green)}.prose .t-done{background:var(--ink);color:#fff}.prose .t-ask{background:var(--accent-soft);color:var(--accent)}.prose .loop text{font-size:15px}
</style>

<script>
const steps = [
  ['think','想','要找：家附近、不辣、能坐 3 个人、周六 18:00 有空位的餐厅。先搜一下。'],
  ['do','做','打开地图，搜索“附近 餐厅 清淡”。'],
  ['see','看','找到 3 家：老街粤菜馆（4.7 分）、王记川菜（4.8 分）、清风小馆（4.5 分）。'],
  ['think','想','王记川菜分数最高，但是川菜，老爷子不吃辣，排除。先试老街粤菜馆。'],
  ['do','做','查老街粤菜馆周六 18:00 的位子。'],
  ['see','看','18:00 满了，19:00 还有。和你说的时间对不上，换下一家试试。'],
  ['ask','问','清风小馆 18:00 有 4 人桌，人均 90 元，需要先付 50 元定金。要订吗？'],
  ['done','完','（你回复“订吧”）已预订：周六 18:00，清风小馆，3 位。地址和定金凭证已发给你。']
];
const names = {think:'t-think',do:'t-do',see:'t-see',ask:'t-ask',done:'t-done'};
let n = 0;
const log = document.getElementById('log'), btn = document.getElementById('next');
function render(){
  log.innerHTML = n===0 ? '<div class="row" style="color:#857d75">点“下一步”，看它怎么办这件事</div>' :
    steps.slice(0,n).map((s,i)=>'<div class="row'+(i===n-1?' fade':'')+'"><span class="tag '+names[s[0]]+'">'+(i+1)+' '+s[1]+'</span><div>'+s[2]+'</div></div>').join('');
  btn.disabled = n>=steps.length;
}
btn.onclick = ()=>{ if(n<steps.length){n++;render();} };
document.getElementById('reset').onclick = ()=>{ n=0; render(); };
render();
</script>
