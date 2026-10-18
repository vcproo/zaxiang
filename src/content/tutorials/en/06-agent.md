---
title: "Agent: From \"Giving Advice\" to \"Getting It Done\""
description: "The hottest word in AI these past two years may well be \"agent,\" often called an intelligent agent. In plain terms it means one thing: AI no longer only talks. It has started to act."
date: 2026-10-10
tags: ["AI in Plain Words", "AI Starts Doing the Work"]
level: Beginner
series: AI in Plain Words
order: 6
kicker: "AGENT · Intelligent Agent"
featured: false
locale: en
---

## The Advisor and the Errand-Runner

<p>You ask an ordinary chat AI: "Saturday night I want to take my parents out to eat. Book a restaurant for me."</p>

<p>It will answer warmly. Somewhere close to home, something mild, a private room if they have one, and do call to confirm before you book. All of that is right. But <strong>in the end you still have to book it yourself</strong>. It is an advisor. It only offers ideas.</p>

<p>An agent is different. Hand it the same sentence, and it goes to look up restaurants nearby, read the reviews, see whether a table is free, and then actually reserve one for you. This one can run the errand.</p>

## How It Gets the Job Done

<p>The way an agent works is close to the way a person handles an errand. It is a loop, and the loop keeps turning:</p>

<div class="figure">
<svg class="loop" viewbox="0 0 420 230">
<defs><marker id="ar" markerheight="8" markerwidth="8" orient="auto" refx="6" refy="4"><path d="M0,0 L8,4 L0,8 z" fill="#857d75"></path></marker></defs>
<path d="M150 62 Q210 20 270 62" fill="none" marker-end="url(#ar)" stroke="#857d75" stroke-width="2"></path>
<path d="M300 120 Q300 175 240 190" fill="none" marker-end="url(#ar)" stroke="#857d75" stroke-width="2"></path>
<path d="M180 190 Q120 175 120 120" fill="none" marker-end="url(#ar)" stroke="#857d75" stroke-width="2"></path>
<rect fill="#f6ecc9" height="56" rx="10" width="120" x="60" y="62"></rect>
<text fill="#2a2724" font-weight="700" text-anchor="middle" x="120" y="88">Think</text>
<text fill="#6b635b" font-size="12.5" text-anchor="middle" x="120" y="108">What to do next</text>
<rect fill="#dce8eb" height="56" rx="10" width="120" x="240" y="62"></rect>
<text fill="#2a2724" font-weight="700" text-anchor="middle" x="300" y="88">Act</text>
<text fill="#6b635b" font-size="12.5" text-anchor="middle" x="300" y="108">Use a tool</text>
<rect fill="#e3edda" height="56" rx="10" width="120" x="150" y="170"></rect>
<text fill="#2a2724" font-weight="700" text-anchor="middle" x="210" y="196">Check</text>
<text fill="#6b635b" font-size="12.5" text-anchor="middle" x="210" y="216">Did it work?</text>
</svg>
<div class="cap">It keeps turning until the job is done, or until it hits something it needs to ask you</div>
</div>

<p>The key is the "check the result" step. Things do not always work the first time. If a booking fails, try another place. If a search comes up empty, try another keyword. An ordinary chat AI stops once it has said its piece. An agent <strong>adjusts the next step on its own</strong>, based on what came back.</p>

<p>Here is how it books this dinner, one step at a time:</p>

<div class="figure">
<div class="demo-title">Try it: watch an agent book a table</div>
<div class="bubble me">Saturday at 6 in the evening, dinner with my parents, 3 people, somewhere close to home. My dad does not eat spicy food.</div>
<div class="log" id="log"></div>
<div class="btns">
<button class="btn primary" id="next">Next</button>
<button class="btn" id="reset">Start over</button>
</div>
</div>

<p>Notice step 7. Before any money is paid, it stops and asks you. A trustworthy agent should do this. <strong>Spending money, sending a message, deleting something — things you cannot take back — it should ask a person first.</strong></p>

## How Can It "Use Its Hands"?

<p>An AI by itself can only work with text. It has no hands. It can act because someone has attached tools to it: tools that search the web, open an app, read and write files, send email.</p>

<p>The AI does the thinking. It decides which tool to use, and how. The tool does the actual work. Picture a sharp manager with a team of people who do the concrete jobs.</p>

<p>How do you attach those tools to an AI? That is what the next lesson, on MCP, is about.</p>

## Where You Can Already Find an Agent

<ul>
<li><b>On a phone:</b> some phone assistants can already order takeout, call a car, and reply to messages. You say one sentence, and it taps its way through the apps.</li>
<li><b>Writing programs:</b> the coding agents programmers use can read code, change it, and run the tests on their own, then fix whatever breaks. This is where agents are most mature right now.</li>
<li><b>Looking things up:</b> "deep research" features search dozens of web pages, read them, and turn them into a report for you.</li>
<li><b>Office work:</b> sorting a spreadsheet, drafting a weekly report, filing a pile of documents.</li>
</ul>

## Not That Magical Yet

<p>Honestly, agents are still at the stage of "usable, but you have to watch them":</p>

<ul>
<li>Once there are many steps, one misunderstanding in the middle sends everything after it down the wrong road.</li>
<li>It may do the wrong thing with complete confidence, such as booking the wrong date.</li>
<li>The more permission you give it, the more a mistake costs.</li>
</ul>

<p>So the right way to use one, for now, is: <strong>let it do the work, but you keep watch</strong>. Let the small things go. Look over the big ones.</p>

<div class="remember">
<div class="label">Remember this</div>
<p>A chat AI is an advisor that offers ideas. An agent is an assistant that can run errands. It thinks, it acts, and it adjusts after it sees the result. The decisions that matter still need your nod.</p>
</div>

<style>.prose .log{background:#fff;border:1px solid var(--line);border-radius:8px;padding:6px 14px;min-height:120px}.prose .row{display:flex;gap:10px;padding:8px 0;border-bottom:1px dashed var(--line);font-size:14.5px;line-height:1.65}.prose .row:last-child{border-bottom:0}.prose .tag{flex:none;font-size:12px;padding:1px 8px;border-radius:10px;height:22px;line-height:20px;margin-top:1px}.prose .t-think{background:var(--yellow-soft);color:#7a5b10}.prose .t-do{background:var(--blue-soft);color:var(--blue)}.prose .t-see{background:var(--green-soft);color:var(--green)}.prose .t-done{background:var(--ink);color:#fff}.prose .t-ask{background:var(--accent-soft);color:var(--accent)}.prose .loop text{font-size:15px}
</style>

<script>
const steps = [
  ['think','Think','Need: near home, not spicy, seats 3, a free table Saturday at 18:00. Search first.'],
  ['do','Do','Open the map and search for "nearby restaurant mild".'],
  ['see','See','Found 3: Old Street Cantonese (4.7), Wang\'s Sichuan (4.8), Qingfeng Bistro (4.5).'],
  ['think','Think','Wang\'s Sichuan scores highest, but it is Sichuan food, and your dad does not eat spicy food. Rule it out. Try Old Street Cantonese first.'],
  ['do','Do','Check Old Street Cantonese for a table on Saturday at 18:00.'],
  ['see','See','18:00 is full. 19:00 still has room. That does not match the time you gave. Try the next place.'],
  ['ask','Ask','Qingfeng Bistro has a table for 4 at 18:00, 90 yuan a person, and wants a 50 yuan deposit first. Book it?'],
  ['done','Done','(You reply "Book it.") Booked: Saturday 18:00, Qingfeng Bistro, party of 3. The address and the deposit receipt have been sent to you.']
];
const names = {think:'t-think',do:'t-do',see:'t-see',ask:'t-ask',done:'t-done'};
let n = 0;
const log = document.getElementById('log'), btn = document.getElementById('next');
function render(){
  log.innerHTML = n===0 ? '<div class="row" style="color:#857d75">Click "Next", and see how it handles this</div>' :
    steps.slice(0,n).map((s,i)=>'<div class="row'+(i===n-1?' fade':'')+'"><span class="tag '+names[s[0]]+'">'+(i+1)+' '+s[1]+'</span><div>'+s[2]+'</div></div>').join('');
  btn.disabled = n>=steps.length;
}
btn.onclick = ()=>{ if(n<steps.length){n++;render();} };
document.getElementById('reset').onclick = ()=>{ n=0; render(); };
render();
</script>
