---
title: "Skill: The Instruction Manuals You Give an AI"
description: "MCP, in the last lesson, hooks tools up to an AI. A Skill, in this one, teaches the AI how a particular job should be done. One looks after the \"hands.\" The other looks after the \"know-how.\""
date: 2026-10-10
tags: ["AI in Plain Words", "AI Starts Doing the Work"]
level: Beginner
series: AI in Plain Words
order: 8
kicker: "SKILL · Skills"
featured: false
locale: en
---

## Do You Really Want to Explain It All Over Again?

<p>Say you ask an AI to write your weekly report every week. Your company has a pile of rules for that report: numbers first, then problems, then next week's plan. Numbers go in a table. No more than one page. Certain words are not allowed.</p>

<p>The first time, you type those rules out one by one. The second week you open a new chat, and it has forgotten all of them (lesson 3: an AI does not remember), so you type them again. The third week, again.</p>

<p>A Skill is those rules <strong>written down as a manual and saved</strong>. Later, whenever you mention a weekly report, the AI pulls that manual out on its own and follows it.</p>

## What a Skill Looks Like

<p>Don't let the name intimidate you. A Skill is really just a folder. The main thing inside it is a set of instructions. It looks roughly like this:</p>

<div class="figure">
<pre class="file"><span class="c">weekly-report/
└─ guide.md</span>
Name: Weekly Report
When to use: when the user wants a weekly report or a weekly summary
Steps:
1. First ask what the user did this week, and whether there are any numbers
2. Write it in three parts: "This week's numbers → Problems that came up → Next week's plan"
3. Put every number in a table
4. Keep the whole thing to one page
5. Do not use words like "empower," "leverage," or "closed loop"
<span class="c">(You can also attach: the company's weekly-report template, and one example that was written well)</span></pre>
<div class="cap">A sketch. A real Skill file is usually named SKILL.md. The format is a little more particular, but this is the idea</div>
</div>

<p>See? It is a work brief written for the AI to read. If you can write an instruction manual, you can write a Skill. Some Skills also attach a template, a good example, even a small program, for the AI to use while it works.</p>

## Install a Whole Pile. Will the AI Burst?

<p>This is the clever part of how a Skill is designed.</p>

<p>Remember that desk (lesson 3)? Spread ten manuals open on it, and the desk is full before you start. So a Skill does this instead: <strong>most of the time, only the cover of each manual sits on the desk</strong>. That means the name, and the line or two about when to use it. Only when one is actually needed does the AI open that one.</p>

<p>Like books on a shelf. You can see the spines, and you know what is there, but you do not open every book at once.</p>

<div class="figure">
<div class="demo-title">Try it: which manual will the AI open?</div>
<div class="shelf">
<div class="book b1" data-b="weekly"><div class="t">Weekly Report</div><div class="d">For weekly reports and summaries</div></div>
<div class="book b2" data-b="ppt"><div class="t">Company PPT</div><div class="d">For when you make a slide deck</div></div>
<div class="book b3" data-b="contract"><div class="t">Contract Review</div><div class="d">For reviewing a contract and its clauses</div></div>
<div class="book b4" data-b="excel"><div class="t">Sheet Cleanup</div><div class="d">For when you work in Excel</div></div>
</div>
<div class="req">
<button data-b="weekly">Help me write this week's report</button>
<button data-b="contract">Are there any traps in this rental contract?</button>
<button data-b="excel">Delete the duplicate customers in this sheet</button>
<button data-b="none">What is the weather in Beijing tomorrow?</button>
</div>
<div class="note" id="note">Only the spines are showing. Pick a request and see</div>
</div>

## Skill, Prompts, and MCP: What Is the Difference?

<p>These three are easy to tangle together. Think of it as hiring a new colleague:</p>

<ul>
<li><b>A prompt:</b> what you tell them to their face. It covers this one time.</li>
<li><b>A Skill:</b> a stack of manuals you leave on their desk. It covers every time after this. When they need one, they open it themselves.</li>
<li><b>MCP:</b> the system accounts and access cards you set up for them. Those let them into the systems, and let them touch things.</li>
</ul>

<p>Accounts without the process, and they will make a mess. The process without accounts, and they cannot do the job. So Skill and MCP are often used as a pair.</p>

## Can You Use This Now?

<p>Anthropic introduced this way of doing things in the second half of 2025, then published it as an open format. More and more AI tools support it. So far it shows up most in coding assistants and in office AI.</p>

<p>For an ordinary person, even if your AI has no feature called "Skill," the idea is ready to use:</p>

<ul>
<li>Take the jobs you often ask an AI to do, write them up as a fixed brief, and keep that brief in your notes.</li>
<li>Many AI products have a place called "custom instructions," "project instructions," or "agent settings." Paste the brief in there. The effect is similar.</li>
<li>When you write the brief, say clearly when it should be used, and attach an example you think is good.</li>
</ul>

<div class="aside">When you download a Skill someone else made, stay a little wary. The AI will do what the manual says. If someone has slipped in an instruction like "send the files to such-and-such an address," that is trouble. Use only sources you trust.</div>

<div class="remember">
<div class="label">Remember this</div>
<p>A Skill is an instruction manual written for an AI. It sits on the shelf until it is needed, and then only that one is opened. You do not explain the job from scratch every time.</p>
</div>

<style>.prose .shelf{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}.prose .book{width:118px;padding:10px 10px 12px;border-radius:4px 8px 8px 4px;border-left:6px solid;background:#fff;box-shadow:0 1px 0 var(--line);font-size:13.5px;line-height:1.5;transition:all .35s}.prose .book .t{font-weight:700;font-size:14.5px;margin-bottom:3px}.prose .book .d{color:var(--muted);font-size:12px}.prose .book.open{transform:translateY(-6px);box-shadow:0 6px 16px rgba(0,0,0,.08);background:var(--yellow-soft)}.prose .b1{border-color:#c0562f}.prose .b2{border-color:#2f6474}.prose .b3{border-color:#4f7a3a}.prose .b4{border-color:#a07a1f}.prose .req{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}.prose .req button{text-align:left;font:inherit;font-size:14.5px;padding:8px 12px;border-radius:6px;border:1px solid var(--line);background:#fff;cursor:pointer}.prose .req button:hover{border-color:#bbb}.prose .note{font-size:14px;color:var(--ink2);min-height:24px}.prose .file{font-family:var(--mono);font-size:13.5px;line-height:1.7;background:#2a2724;color:#efe8dc;border-radius:8px;padding:14px 16px;white-space:pre-wrap;margin:0}.prose .file .c{color:#d8b7a5}
</style>

<script>
const notes = {
  weekly:'The AI sees "for weekly reports" on the spine, opens Weekly Report, and follows the format and the rules inside.',
  contract:'It opens Contract Review. The manual says to look hard at the deposit, the penalty, and who is responsible for repairs.',
  excel:'It opens Sheet Cleanup. The manual says: back up before deleting, and use the phone number to tell whether it is the same customer.',
  none:'Nothing on this shelf applies. The AI answers in the ordinary way, opens nothing, and takes up no extra room.'
};
document.querySelectorAll('.req button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.book').forEach(x=>x.classList.toggle('open', x.dataset.b===b.dataset.b));
  const n=document.getElementById('note'); n.textContent=notes[b.dataset.b]; n.classList.remove('fade'); void n.offsetWidth; n.classList.add('fade');
});
</script>
