---
title: "RAG and Knowledge Bases: Let AI Take an Open-Book Exam"
description: "Ask an AI \"how do I request annual leave at our company,\" and it cannot answer, or it simply makes something up. That is normal. It never worked at your company. RAG is what deals with this."
date: 2026-10-10
tags: ["AI in Plain Words", "What AI Can Make, and How to Answer More Accurately"]
level: Beginner
series: AI in Plain Words
order: 5
kicker: "RAG · Knowledge Base"
featured: false
locale: en
---

## What AI knows has a boundary

<p>Everything AI learned came from the material it saw during training. The moment training ends, its knowledge stops on that day.</p>

<p>So there are two kinds of things it naturally does not know:</p>

<ul>
<li><b>Things that are too new.</b> News that happened after training, policies that just came out.</li>
<li><b>Things that were never public.</b> Your company rules, product manuals, client records, the notice from your child's school.</li>
</ul>

<p>What makes it worse: when it does not know, it often will not honestly say "I do not know." It makes up a plausible-sounding answer from a feeling. People in the field call this a "hallucination."</p>

## Closed book and open book

<p>An ordinary AI answering a question is like a <strong>closed-book exam</strong>. It relies entirely on what it remembers. Where the memory is fuzzy, it is easy to write nonsense.</p>

<p>What RAG does is let AI take an <strong>open-book exam</strong>: before answering, it flips through the material you gave it, finds the relevant pages, and answers while looking at them.</p>

<p>The three letters in RAG stand for Retrieval-Augmented Generation. Word for word, that is "retrieval-augmented generation," which is a mouthful. Split apart, it is three steps: <b>find it first</b> (retrieval), <b>hand what you found to the AI</b> (augmented), <b>the AI answers from that</b> (generation).</p>

<div class="figure">
<div class="demo-title">Try it: ask a question from inside the company</div>
<div class="bubble me">I have just finished my first year. How many days of annual leave can I take?</div>
<div class="mode" style="margin-top:12px">
<div class="col">
<h4>Closed book (ordinary AI)</h4>
<div id="closed" style="font-size:14.5px;line-height:1.7;color:var(--ink2)">Click the button below to start</div>
</div>
<div class="col">
<h4>Open book (RAG)</h4>
<div class="steps">
<div class="step" id="s1"><span class="n">1</span><div>Look through the company knowledge base for anything related
            <div class="docs">
<span class="doc">Expense claims.pdf</span><span class="doc" id="hit">Employee handbook-leave.docx</span><span class="doc">Attendance policy.pdf</span><span class="doc">Team outing.txt</span>
</div></div></div>
<div class="step" id="s2"><span class="n">2</span><div>Found this passage: <i>"Employees with at least 1 year and under 10 years get 5 days of annual leave; the company adds another 2 days of benefit leave."</i></div></div>
<div class="step" id="s3"><span class="n">3</span><div>Answer from the material: <b>7 days in all, 5 days of statutory annual leave plus 2 company benefit days.</b> Source: the leave section of the Employee Handbook.</div></div>
</div>
</div>
</div>
<div class="btns"><button class="btn primary" id="go">Start</button></div>
</div>

<p>The answer on the left is not entirely wrong. The statutory amount really is 5 days. But it does not know your company also gives benefit leave, and it does not tell you where the statement comes from. The right side flipped through the material, so the answer is specific, and you can go back and check the original.</p>

## So what is a "knowledge base"?

<p>A knowledge base is the pile of open-book material you prepare for the AI.</p>

<p>A lot of AI products have this feature. It might be called a knowledge base, a document library, or project files. The idea is about the same. You upload the documents. Later, when you ask a question, the AI looks in that pile first.</p>

<p>The way it searches is fairly clever. It is not a simple keyword search. You ask "how many days off can I take," and the document says "annual leave entitlement." The words do not match, but it can still line them up, because what it compares is <strong>whether the meanings are alike</strong>.</p>

## Where you can use it

<ul>
<li><b>At a company:</b> a new employee with a question asks the knowledge-base bot, instead of interrupting colleagues all the time.</li>
<li><b>Customer support:</b> put in the product manual and the common questions, and the AI support replies have something to stand on.</li>
<li><b>For yourself:</b> upload a stack of reading notes, contracts, and manuals. Later, when you need to find something, just ask.</li>
</ul>

## Do not expect it to be perfectly right

<p>An open-book exam can go badly too:</p>

<ul>
<li><b>If the material itself is wrong, the AI is wrong along with it.</b> The handbook has not been updated in three years, so it answers from the rules of three years ago.</li>
<li><b>It turns to the wrong page.</b> The material it found does not fit, and the answer goes crooked with it.</li>
<li><b>If it is not in the material at all, the AI may still make something up.</b> A good system makes it say honestly, "I did not find this in the material." Not every system does that well.</li>
</ul>

<p>So when you read an answer, build one habit: <strong>look at the source it gives you</strong>. For anything important, open the original and check.</p>

<div class="aside">Before you upload files into a knowledge base, think about whether outsiders should be able to see them. Uploading to an AI product on the internet means handing them to someone else's servers. Confidential company material generally belongs on a system the company runs itself.</div>

<div class="remember">
<div class="label">Remember this line</div>
<p>A knowledge base is reference material prepared for an AI. RAG means it flips through that material before it answers. Closed book becomes open book, and there is less making things up.</p>
</div>

<style>.prose .mode{display:grid;grid-template-columns:1fr 1fr;gap:14px}@media (max-width:560px){.prose .mode{grid-template-columns:1fr}}.prose .col{border:1px solid var(--line);border-radius:8px;padding:12px 14px;background:#fff}.prose .col h4{margin:0 0 8px;font-size:14.5px}.prose .steps{display:flex;flex-direction:column;gap:8px}.prose .step{display:flex;gap:10px;align-items:flex-start;font-size:14.5px;line-height:1.65;opacity:.25;transition:opacity .4s}.prose .step.on{opacity:1}.prose .step .n{flex:none;width:22px;height:22px;border-radius:50%;background:var(--ink);color:#fff;font-size:12px;text-align:center;line-height:22px;margin-top:2px}.prose .docs{display:flex;gap:6px;flex-wrap:wrap;margin:4px 0}.prose .doc{font-size:12.5px;padding:4px 8px;border:1px solid var(--line);border-radius:4px;background:#faf7f0;transition:all .3s}.prose .doc.hit{background:var(--yellow-soft);border-color:#d9b84a;font-weight:600}
</style>

<script>
const go = document.getElementById('go');
go.onclick = ()=>{
  go.disabled = true;
  ['s1','s2','s3'].forEach(id=>document.getElementById(id).classList.remove('on'));
  document.getElementById('hit').classList.remove('hit');
  const c = document.getElementById('closed');
  c.textContent = 'Thinking…';
  setTimeout(()=>{ c.innerHTML = 'In general, under national rules, an employee with at least 1 year and less than 10 years of service gets 5 days of annual leave.<br><span style="color:#b04a2a;font-size:13px">(No mention of the company benefit leave, and no source document.)</span>'; }, 900);
  setTimeout(()=>document.getElementById('s1').classList.add('on'), 400);
  setTimeout(()=>document.getElementById('hit').classList.add('hit'), 1100);
  setTimeout(()=>document.getElementById('s2').classList.add('on'), 1700);
  setTimeout(()=>{ document.getElementById('s3').classList.add('on'); go.disabled=false; go.textContent='Watch again'; }, 2500);
};
</script>
