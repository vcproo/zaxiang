---
title: "The Context Window: How Big Is the AI's Desk?"
description: "Chat with an AI long enough and you may hit this: a requirement you set at the start gets ignored later on. It is not doing it on purpose. The \"desk\" ran out of room."
date: 2026-10-10
tags: ["AI in Plain Words", "Working with AI"]
level: Beginner
series: AI in Plain Words
order: 3
kicker: "CONTEXT WINDOW · Context Window"
featured: true
locale: en
---

## AI does not actually remember

<p>Here is something a lot of people do not realize: AI itself <strong>has no memory</strong>.</p>

<p>When you get to the tenth sentence, it can follow the first nine. Not because it "remembered." Every time, the software packs up the whole chat so far, together with the new sentence you just typed, and <strong>sends the whole bundle again</strong>. Each time, it reads from the top, then answers.</p>

<p>Everything sent over together like that is called the context. The most AI can read at one time is called the context window.</p>

## Think of it as a desk

<p>When AI is working, every piece of material has to be spread on the desk, or it cannot see it. The desk is only so big. Fill it up, put something new on it, and the earliest sheets get pushed onto the floor. Once they are on the floor, it cannot see them.</p>

<p>You can try it below. The desk already holds the requirement you gave at the start, the one with the red outline. Keep clicking "One more line" and see what happens:</p>

<div class="figure">
<div class="demo-title">Try it: what happens when the desk fills up</div>
<div class="desk" id="desk"><span class="desk-label">The AI's desk (only 6 items fit here)</span></div>
<div class="cap-bar"><div id="bar"></div></div>
<div class="floor" id="floor"><div class="tip">↓ Fell on the floor (the AI can no longer see these)</div></div>
<div class="status" id="status"></div>
<div class="btns">
<button class="btn primary" id="add">One more line</button>
<button class="btn" id="reset">Start over</button>
</div>
</div>

<p>The real thing is a bit more complicated than this demo. Some software squeezes the old content into a short summary and puts that back on the desk. Some simply say the chat is too long. The idea is the same: <strong>the desk always fills up eventually</strong>.</p>

## How big is the desk?

<p>Window size is measured in the tokens from the previous piece. It has grown very fast these past few years:</p>

<div class="figure">
<div class="sizes">
<div>Late 2022</div><div class="bar" style="width:3%"><span style="left:calc(100% + 8px);white-space:nowrap">About 4,000, a few pages</span></div>
<div>2023</div><div class="bar" style="width:13%"><span style="left:calc(100% + 8px);white-space:nowrap">Tens of thousands to over 100,000, a thin book</span></div>
<div>Common now</div><div class="bar" style="width:40%"><span>200,000 to over a million, several thick books</span></div>
</div>
<div class="cap">A sketch. Models differ a lot. Go by the official description</div>
</div>

<p>For a mainstream AI now, reading a whole novel in one sitting is no longer a problem.</p>

## A bigger desk. Does that solve everything?

<p>Not quite. There are two small problems:</p>

<p><b>One: it read the page, but did not really look.</b> If a hundred pages are piled on your desk, a line buried in the middle can slip past you. AI has a similar habit. When the content is very long, details in the middle are easy to miss.</p>

<p><b>Two: longer means slower, and more expensive.</b> Every turn, it has to read the whole desk from the start. The more that is on the desk, the longer you wait, and the more tokens get used.</p>

## Living with this desk, day to day

<ul>
<li><b>Start a new chat when you change the topic.</b> When one job is done, open a new window. Do not let a pile of unrelated old content sit on the desk.</li>
<li><b>Repeat an important requirement now and then.</b> If the chat has gone on a long time and it starts to drift, say the key requirement again. That is like putting that sheet of paper back on the desk.</li>
<li><b>Before a long chat ends, ask it to summarize.</b> "List the points we just settled." Then take that summary into a new chat and continue from there.</li>
<li><b>Do not dump a pile of useless material in at once.</b> Give it only the part that matters for this job. It actually sees more clearly that way.</li>
</ul>

<div class="aside">You may have heard that some AI products have a "memory" feature and can recall what you said last week. That is the software keeping a separate note about you, then quietly placing it on the desk when you chat. In essence it is still putting something on the desk. The desk itself has not turned into a memory.</div>

<div class="remember">
<div class="label">Remember this line</div>
<p>The context window is how much AI can spread out and look at in one go. However big the desk is, it still fills up. Once it does, the earliest things drop out of sight.</p>
</div>

<style>.prose .desk{border:2px solid var(--ink);border-radius:8px;padding:10px;min-height:250px;background:#fbf8f1;position:relative}.prose .desk-label{position:absolute;top:-12px;left:14px;background:var(--paper);padding:0 8px;font-size:13px;color:var(--ink2)}.prose .msg{padding:6px 10px;border-radius:6px;margin:6px 0;font-size:14.5px;line-height:1.6;transition:all .4s}.prose .msg.u{background:var(--blue-soft)}.prose .msg.a{background:#efe8dc}.prose .msg.key{outline:2px solid var(--accent)}.prose .floor{margin-top:12px;border-top:2px dashed #c9bfb0;padding-top:8px;min-height:40px}.prose .floor .tip{font-size:12.5px;color:var(--muted)}.prose .floor .msg{opacity:.45;text-decoration:line-through;transform:scale(.97)}.prose .status{font-size:14px;color:var(--ink2);margin-top:10px}.prose .cap-bar{height:8px;background:#ece6db;border-radius:4px;overflow:hidden;margin-top:8px}.prose .cap-bar div{height:100%;background:var(--blue);transition:width .4s}.prose .sizes{display:grid;grid-template-columns:120px 1fr;gap:10px 14px;align-items:center;font-size:14.5px}.prose .sizes .bar{height:18px;background:var(--accent-soft);border-radius:3px;position:relative}.prose .sizes .bar span{position:absolute;left:8px;top:-1px;font-size:12.5px;color:var(--ink2)}
</style>

<script>
const LIMIT = 6;
const script = [
  ['u','I want you to help me write a weekly report. Note: do not use words like "empower" or "leverage" anywhere.',true],
  ['a','All right, no problem. What did you get done this week?'],
  ['u','On Monday I met with the client and we settled the new packaging plan.'],
  ['a','Got it. Anything else?'],
  ['u','On Wednesday the samples went out, and on Friday the feedback came back.'],
  ['a','What did the feedback say?'],
  ['u','The client thought the color was too dark and wants it a bit brighter.'],
  ['a','Understood. And the plan for next week?'],
  ['u','Next week, adjust the color and send another sample. All right, please write it.'],
  ['a','This week we leveraged the new packaging plan to empower client communication…']
];
let i = 0;
const desk = document.getElementById('desk'), floor = document.getElementById('floor');
function render(){
  const shown = script.slice(0,i);
  const onDesk = shown.slice(Math.max(0, shown.length-LIMIT));
  const fell = shown.slice(0, Math.max(0, shown.length-LIMIT));
  desk.innerHTML = '<span class="desk-label">The AI\'s desk (only '+LIMIT+' items fit here)</span>' +
    onDesk.map(m=>'<div class="msg fade '+m[0]+(m[2]?' key':'')+'">'+(m[0]==='u'?'You: ':'AI: ')+m[1]+'</div>').join('');
  floor.innerHTML = '<div class="tip">↓ Fell on the floor (the AI can no longer see these)</div>' +
    fell.map(m=>'<div class="msg '+m[0]+(m[2]?' key':'')+'">'+(m[0]==='u'?'You: ':'AI: ')+m[1]+'</div>').join('');
  document.getElementById('bar').style.width = (onDesk.length/LIMIT*100)+'%';
  let s = 'On the desk: '+onDesk.length+' / '+LIMIT+' items';
  if (fell.length && i < script.length) s += '. The requirement from the very start has already fallen off…';
  if (i === script.length) s = 'See that? The "do not use empower or leverage" requirement fell off the desk. The AI cannot see it, so those words are back in use.';
  document.getElementById('status').textContent = s;
  document.getElementById('add').disabled = i >= script.length;
}
document.getElementById('add').onclick = ()=>{ if(i<script.length){ i++; render(); } };
document.getElementById('reset').onclick = ()=>{ i=1; render(); };
i = 1; render();
</script>
