---
title: "Prompts: How You Say It Is How the AI Does It"
description: "The word \"prompt\" can sound a little mysterious, as if you had to learn a spell. Really, it is just the sentence you type into the chat box."
date: 2026-10-10
tags: ["AI in Plain Words", "Working with AI"]
level: Beginner
series: AI in Plain Words
order: 1
kicker: "PROMPT · Prompts"
featured: true
locale: en
---

## You've been writing prompts all along

<p>Asking an AI "what should I wear if it gets colder tomorrow" is a prompt. So is "help me smooth this paragraph out." The English word is prompt, and it comes from the theater: an actor forgets a line, someone at the side whispers a cue, and the actor can go on.</p>

<p>AI works the same way. You give it an opening, and it continues from there. So the opening you give directly decides what comes back.</p>

## Same AI. Why does it feel easy for other people, and only average for you?

<p>Most of the time it is not the AI. It <strong>does not know you</strong>.</p>

<p>Imagine you hire someone to redo a room and only say "make it look nice." They do not know how many people live there, whether you like wood tones or white, or what the budget is. In the end they can only go with what "most people think looks nice." When it is done, you cannot point to a big mistake, but it still does not feel like what you wanted.</p>

<p>When an AI answer is "correct but useless," this is almost always why. Here is an example:</p>

<div class="figure">
<div class="demo-title">Try it: one job, two ways of saying it</div>
<div class="tabs">
<button class="tab on" data-v="a">Said offhand</button>
<button class="tab" data-v="b">Spelled out</button>
</div>
<div id="cmp"></div>
<div class="cap">The AI replies are only a sketch, but the difference is real</div>
</div>

<p>The second version uses no special trick. It just adds a few details: who it is for, where it will be posted, how long, what tone, and what you can mention. With more to work from, what the AI writes starts to sound like your own family.</p>

## Spelling it out mostly comes down to a few things

<p>No formula to memorize. Think about what you would tell a colleague who just started, if you handed them this job. It mostly comes down to the items below. Check a few, and watch the prompt get clearer bit by bit:</p>

<div class="figure builder">
<div class="demo-title">Try it: fill out a one-line request</div>
<label><input data-k="who" type="checkbox"/>Say the background: who this is for, and why it needs doing</label>
<label><input data-k="use" type="checkbox"/>Say the use: where it will go once it is written</label>
<label><input data-k="shape" type="checkbox"/>Say the requirements: how long, what tone, what format</label>
<label><input data-k="no" type="checkbox"/>Say what to avoid: things that should not be in it</label>
<label><input data-k="eg" type="checkbox"/>Give an example: follow this feel</label>
<div class="out" id="built"></div>
<div class="meter"><span>How clearly you spelled it out</span><div class="track"><div class="fill" id="fill"></div></div></div>
</div>

<p>You do not need all five every time. Asking about the weather, or looking up a word, one sentence is enough. The more something is clear in your own head and unknown to anyone else, the more it is worth saying a few extra lines.</p>

## A few handy habits

<ul>
<li><b>If you do not know how to put it, let the AI ask you first.</b> For example: "I want a plan for a family trip. Ask me a few questions first, and only draft the plan once that is clear." It will ask about how many people, the budget, and how many days, so you do not have to think of everything yourself.</li>
<li><b>If you are not happy with it, keep talking. Do not start over right away.</b> "The second paragraph is too wordy." "Make the tone more casual." "Try a different opening." It is like revising a draft. You go round by round.</li>
<li><b>An example works better than an explanation.</b> If you say "make it funny," its idea of funny may not be yours. Paste a bit you like and say "match this flavor," and it lines up right away.</li>
<li><b>Ask for a few versions and pick.</b> "Give me three titles in different styles" beats making it squeeze out just one.</li>
</ul>

## Those "universal prompt templates" online. Should you pay for them?

<p>I would not spend the money. A few years ago, AI did not understand as well, and fixed phrasings really did help coax it along. Models now are much sharper. Saying what you mean clearly beats fitting any template.</p>

<p>Strip those templates down, and the part that actually helps is just the items above: background, use, requirements, and an example.</p>

<div class="aside">One small warning: do not put ID numbers, bank card numbers, passwords, and anything like that into a prompt. What you type is sent to the AI company servers. No need to take that risk.</div>

<div class="remember">
<div class="label">Remember this line</div>
<p>Treat AI as a smart new colleague who just arrived beside you. The more clearly you brief it, the better the work comes out.</p>
</div>

<style>.prose .compare-label{font-size:13px;color:var(--muted);margin:14px 0 4px}.prose .builder label{display:flex;gap:10px;align-items:flex-start;font-size:15.5px;line-height:1.6;padding:7px 0;border-bottom:1px dashed var(--line);cursor:pointer}.prose .builder label:last-of-type{border-bottom:0}.prose .builder input{margin-top:5px;accent-color:var(--accent)}.prose .out{margin-top:16px;background:#f3efe7;border-radius:8px;padding:14px 16px;font-size:15.5px;line-height:1.8;min-height:52px}.prose .meter{display:flex;align-items:center;gap:10px;margin-top:12px;font-size:13.5px;color:var(--muted)}.prose .meter .track{flex:1;height:8px;background:#ece6db;border-radius:4px;overflow:hidden}.prose .meter .fill{height:100%;width:10%;background:var(--accent);transition:width .3s}
</style>

<script>
const cmpData = {
  a: {
    me: 'Write a birthday message',
    ai: 'Happy birthday! Wishing you good health and the best of everything in the year ahead. May every day be full of sunshine and laughter, happiness, and wishes come true!'
  },
  b: {
    me: 'My mom turns 60 tomorrow. She is a retired elementary school teacher who taught Chinese, she loves dancing in the square, and she has kept a clivia on the balcony for more than ten years. Write a message for the family group chat, under 100 words, warm but not mushy. You can mention the clivia.',
    ai: 'Mom, happy 60th birthday! A whole life of teaching, and now it is finally your turn to take things slow. Keep dancing in the square, keep tending the clivia, and if it blooms again this year, send me the first photo. The family is all here. Your only job is to enjoy yourself.'
  }
};
function showCmp(k){
  const d = cmpData[k];
  document.getElementById('cmp').innerHTML =
    '<div class="bubble me fade"><span class="who">You said</span>'+d.me+'</div>'+
    '<div class="bubble ai fade"><span class="who">AI replied</span>'+d.ai+'</div>';
}
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
  t.classList.add('on'); showCmp(t.dataset.v);
});
showCmp('a');

const parts = {
  base: 'Help me write a note asking for time off.',
  who:  ' I work the checkout at a supermarket. Next Wednesday the school has a parent-teacher meeting, and I need half a day off.',
  use:  ' Send it to the store manager on WeChat.',
  shape:' Three or four sentences is enough. Polite, but not too formal. People at the store talk pretty casually.',
  no:   ' Do not use stiff official lines like "kindly request your approval."',
  eg:   ' Roughly this feel: "Wang, let me tell you something…"'
};
const order = ['who','use','shape','no','eg'];
function build(){
  const on = order.filter(k=>document.querySelector('[data-k="'+k+'"]').checked);
  const text = parts.base + on.map(k=>parts[k]).join('');
  document.getElementById('built').innerHTML = '<span class="who" style="font-size:12px;color:#857d75;display:block">Your prompt</span>' + text;
  document.getElementById('fill').style.width = (10 + on.length*18) + '%';
}
document.querySelectorAll('.builder input').forEach(i=>i.onchange=build);
build();
</script>
