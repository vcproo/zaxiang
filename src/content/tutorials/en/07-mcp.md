---
title: "MCP: A Universal Plug for AI"
description: "The last lesson said that if an AI is going to get things done, someone has to hook tools up to it. Then the question: there are thousands of tools, and quite a few AIs. How do you connect them? MCP is the rule written for exactly that."
date: 2026-10-10
tags: ["AI in Plain Words", "AI Starts Doing the Work"]
level: Beginner
series: AI in Plain Words
order: 7
kicker: "MCP · Model Context Protocol"
featured: false
locale: en
---

## Remember That Drawer of Charging Cables?

<p>A few years ago, every home had a drawer stuffed with charging cables. This phone took a round plug, that one a flat plug, and the earphones were something else again. Change phones, and a pile of cables was suddenly useless.</p>

<p>Then, slowly, things settled on USB-C. One cable charges a phone, a tablet, earphones, a laptop.</p>

<p>Hooking tools up to AI used to look like that drawer of cables.</p>

<div class="figure">
<div class="tabs">
<button class="tab on" data-m="before">Before</button>
<button class="tab" data-m="after">With MCP</button>
</div>
<svg class="plug" id="svg" viewbox="0 0 440 230"></svg>
<div class="cap" id="cap"></div>
</div>

<p>Before, each AI that wanted to use a tool needed its own custom connector, written just for that pair. Three AIs and four tools meant twelve separate connections. Once the tools piled up, nobody could keep up.</p>

<p>The idea behind MCP is that everyone agrees on one interface. The tool side builds to that standard once. The AI side supports that standard once. After that, <strong>any of them can plug into any of the others</strong>.</p>

## What Those Three Letters Mean

<p>MCP is short for Model Context Protocol.</p>

<ul>
<li><b>Model</b> means the model, which is the AI.</li>
<li><b>Context</b> means context: the information the AI can see while it works (lesson 3 covered this).</li>
<li><b>Protocol</b> means a protocol: a rule everyone has agreed on.</li>
</ul>

<p>Put together, it is <strong>a shared set of rules for delivering information and tools to an AI.</strong></p>

<p>Anthropic, the company behind Claude, proposed it at the end of 2024. OpenAI, Google, Microsoft, and quite a few companies in China followed. By now it is basically the common practice in the field.</p>

## What Changes Once It Is Plugged In

<p>The AI below starts with no tools attached. Ask it something first, then plug a tool in, and watch the difference:</p>

<div class="figure">
<div class="demo-title">Try it: plug tools into the AI</div>
<div style="font-size:13px;color:var(--muted);margin-bottom:6px">Click to plug in / unplug</div>
<div class="toolbox" id="tb">
<button class="tool" data-t="cal">Calendar</button>
<button class="tool" data-t="file">Files on this computer</button>
<button class="tool" data-t="map">Map</button>
</div>
<div class="ask-row" id="qs">
<button data-q="cal">Am I free tomorrow afternoon?</button>
<button data-q="file">Help me find the quote from last month.</button>
<button data-q="map">How long is the drive from the office to the train station right now?</button>
</div>
<div id="ans"></div>
</div>

<p>It is still the same AI. The mind has not changed. What changed is <strong>what it can see, and what it can touch</strong>.</p>

## What This Has to Do with an Ordinary Person

<p>Honestly, MCP is mostly something programmers worry about. An ordinary person does not need to "plug things in" by hand. But it does change the tools you actually use:</p>

<ul>
<li>The AI assistant you use will be able to reach more and more things: a calendar, notes, a cloud drive, email, the company systems.</li>
<li>Someone who builds a tool only has to build it once, and every AI can use it, so useful tools show up faster.</li>
<li>If you switch to another AI, most of the tools you already connected can come along. You do not start from zero.</li>
</ul>

<p>In the settings of some AI apps you may see options called "MCP server," "connector," or "plugin." Those are the screens that manage these plugs.</p>

## The More Plugs, the More Care You Need

<p>Hooking a tool up to an AI is like handing it a key to your home. Connect email, and it can read your mail. Connect files, and it can move your files.</p>

<ul>
<li><b>Install only what you trust.</b> An MCP tool from nowhere is like an app from nowhere. It may steal data.</li>
<li><b>Give it read-only, if reading is enough.</b> If you only need it to look things up, do not also give it permission to change or delete.</li>
<li><b>Notice what it is about to do.</b> A proper app asks you to confirm before the AI calls a tool. Do not tap "Allow" without looking.</li>
</ul>

<div class="remember">
<div class="label">Remember this</div>
<p>MCP is the USB-C port of the AI world. A tool is built to this standard once, and every AI can plug it in and use it.</p>
</div>

<style>.prose .plug text{font-size:13px}.prose .toolbox{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}.prose .tool{font:inherit;font-size:14px;padding:6px 12px;border-radius:6px;border:1px dashed #b9ae9e;background:#faf7f0;cursor:pointer}.prose .tool.on{border-style:solid;border-color:var(--green);background:var(--green-soft);color:var(--green)}.prose .tool.on::before{content:"✓ "}.prose .ask-row{display:flex;flex-direction:column;gap:6px}.prose .ask-row button{text-align:left;font:inherit;font-size:14.5px;padding:8px 12px;border-radius:6px;border:1px solid var(--line);background:#fff;cursor:pointer}.prose .ask-row button:hover{border-color:#bbb}
</style>

<script>
const ais = ['AI A','AI B','AI C'], tools = ['Calendar','Email','Files','Map'];
function box(x,y,w,t,fill){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="34" rx="6" fill="'+fill+'"/><text x="'+(x+w/2)+'" y="'+(y+22)+'" text-anchor="middle" fill="#2a2724">'+t+'</text>';}
function draw(m){
  let s='';
  const ay = [30,98,166], ty=[14,66,118,170];
  if(m==='before'){
    const colors=['#c0562f','#2f6474','#4f7a3a'];
    ay.forEach((y,i)=>ty.forEach(t=>{ s+='<path d="M110 '+(y+17)+' C200 '+(y+17)+' 240 '+(t+17)+' 330 '+(t+17)+'" stroke="'+colors[i]+'" stroke-width="1.6" fill="none" opacity=".6"/>'; }));
    document.getElementById('cap').textContent='Every pair has to be wired on its own: 3 × 4 = 12 cables';
  } else {
    ay.forEach(y=>{ s+='<line x1="110" y1="'+(y+17)+'" x2="195" y2="115" stroke="#2a2724" stroke-width="1.8"/>'; });
    ty.forEach(t=>{ s+='<line x1="245" y1="115" x2="330" y2="'+(t+17)+'" stroke="#2a2724" stroke-width="1.8"/>'; });
    s+='<rect x="190" y="90" width="60" height="50" rx="8" fill="#2a2724"/><text x="220" y="120" text-anchor="middle" fill="#fff" font-weight="700">MCP</text>';
    document.getElementById('cap').textContent='Everyone connects to the same standard: 3 + 4 = 7 cables, and adding anyone later is easy';
  }
  ay.forEach((y,i)=>s+=box(20,y,90,ais[i],'#dce8eb'));
  ty.forEach((y,i)=>s+=box(330,y,90,tools[i],'#f6ecc9'));
  const svg=document.getElementById('svg'); svg.innerHTML=s; svg.classList.remove('fade'); void svg.offsetWidth; svg.classList.add('fade');
}
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));t.classList.add('on');draw(t.dataset.m);});
draw('before');

const on = {cal:false,file:false,map:false};
const qText = {cal:'Am I free tomorrow afternoon?',file:'Help me find the quote from last month.',map:'How long is the drive from the office to the train station right now?'};
const without = {
  cal:'Sorry, I cannot see your schedule. You can open the calendar and look, or tell me what you have tomorrow.',
  file:'I cannot reach the files on your computer. You could sort by the date they were changed, or try searching for the word "quote".',
  map:'I cannot check live traffic. The drive is usually about twenty or thirty minutes. For the exact time, use a navigation app.'
};
const withT = {
  cal:'<i style="color:#4f7a3a">[Using: Calendar]</i><br>Tomorrow there is a project meeting from 2 to 3 in the afternoon. Every other slot is free, so anything after 3 can be scheduled.',
  file:'<i style="color:#4f7a3a">[Using: Files]</i><br>Found it: "Quote_EastChina_Client_Sep.xlsx", last changed on September 18, in the folder "Documents/Clients".',
  map:'<i style="color:#4f7a3a">[Using: Map]</i><br>Leaving now takes about 26 minutes. Zhongshan Road is a bit jammed. Binjiang Road is roughly 5 minutes faster.'
};
let lastQ=null;
function answer(q){
  lastQ=q;
  document.getElementById('ans').innerHTML='<div class="bubble me fade" style="margin-top:14px">'+qText[q]+'</div><div class="bubble ai fade">'+(on[q]?withT[q]:without[q])+'</div>';
}
document.querySelectorAll('.tool').forEach(b=>b.onclick=()=>{ on[b.dataset.t]=!on[b.dataset.t]; b.classList.toggle('on'); if(lastQ) answer(lastQ); });
document.querySelectorAll('#qs button').forEach(b=>b.onclick=()=>answer(b.dataset.q));
</script>
