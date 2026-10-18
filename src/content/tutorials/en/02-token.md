---
title: "Tokens: AI Reads Text Piece by Piece"
description: "When you use an AI, you may have seen notices like \"this used 1,200 tokens\" or \"token limit exceeded.\" So what is a token, exactly?"
date: 2026-10-10
tags: ["AI in Plain Words", "Working with AI"]
level: Beginner
series: AI in Plain Words
order: 2
kicker: "TOKEN · Tokens"
featured: true
locale: en
---

## The short version

<p>A token is a <strong>small piece</strong> that AI cuts out when it reads text.</p>

<p>We read word by word. AI does not. It first cuts a sentence into pieces. A piece might be one character, one word, or half an English word. Each piece that comes out of that cut is called a token.</p>

<p>Think of a whole stalk of sugarcane. You cannot chew it as it is. You have to chop it into sections first. Tokens are those sections.</p>

<div class="figure">
<div class="demo-title">A sentence, as AI sees it</div>
<div class="tabs" id="tabs"></div>
<div class="chips" id="chips"></div>
<div class="count" id="cnt"></div>
<div class="cap">Each color block is one token. This is a sketch. Real splits differ from model to model</div>
</div>

<p>A few things stand out:</p>

<ul>
<li>Common words, such as "hello" or "today," and in Chinese words like "你好" or "今天," are often kept as one whole piece.</li>
<li>Uncommon characters and rare words may be cut more finely.</li>
<li>A short English word stays in one piece. A long one gets split. Unbelievable, for example, might become un, believ, and able.</li>
<li>Punctuation and spaces count too. They take up room.</li>
</ul>

## So how many tokens is one Chinese character?

<p>There is no fixed answer. It depends on which model you are using. For the mainstream models now, in China and abroad, a fair estimate is <strong>about one token per Chinese character</strong>. Some models are a bit thriftier, some a bit more costly. English comes out to a little more than one token per word.</p>

<p>Day to day you do not need to count that finely. A rough sense is enough. The box below can give you a rough estimate:</p>

<div class="figure">
<div class="demo-title">A rough estimate</div>
<textarea id="ta">The meeting is at 3 this afternoon in the third-floor conference room. Please be on time and bring last week's sales figures.</textarea>
<div class="est">
<div>Characters: <b id="e1">0</b></div>
<div>Approx. tokens: <b id="e2">0</b></div>
</div>
<div class="cap">A rough count: 1 per Chinese character, 1.3 per English word, 1 per punctuation mark. Only the scale matters</div>
</div>

## Why bother knowing this?

<p>Because in the world of AI, a lot of things are measured with tokens as the ruler.</p>

<p><b>First, the price is based on it.</b> If you use a pay-as-you-go AI service, the price list usually says how much per million tokens. The text you send costs money, and the text it sends back costs money too. The reply is often the more expensive part. Like a taxi: there is a starting fare when you get in, and every kilometer after that is charged as well.</p>

<p><b>Second, how long a chat can run is based on it too.</b> Every AI has a limit on how much it can hold at one time, and that limit is counted in tokens. That is the "context window," which the next piece is about.</p>

<p><b>Third, it explains some of the odd habits.</b> A while back there was a famous joke: ask an AI how many r letters are in the English word strawberry, and it often got the answer wrong. This is why. AI sees chunks like straw and berry, not individual letters. Asking it to count letters is a bit like asking you to count the cookies through the wrapper. Models today are much better at this, but the underlying idea is still there.</p>

## A few numbers, for scale

<p>Just to give you a feel:</p>

<table>
<tr><th>What it is</th><th>About how many tokens</th></tr>
<tr><td>A chat message</td><td>A few dozen</td></tr>
<tr><td>A long article (3,000 characters)</td><td>Around three thousand</td></tr>
<tr><td>A novel of 200,000 characters</td><td>Around two hundred thousand</td></tr>
</table>

<div class="aside">A free chat AI usually will not show you the token count directly, but it is counting all the same behind the scenes. When you see "today's quota is used up" or "this chat is too long, please start a new one," it usually means the tokens are about used up.</div>

<div class="remember">
<div class="label">Remember this line</div>
<p>A token is the unit AI uses to read text, roughly one per Chinese character. What you pay, and how much it can read, are both counted in tokens.</p>
</div>

<style>.prose .chips{display:flex;flex-wrap:wrap;gap:5px;margin:6px 0 4px;min-height:40px}.prose .chip{padding:4px 8px;border-radius:5px;font-size:17px;line-height:1.4;white-space:pre}.prose .c0{background:#f5dfd3}.prose .c1{background:#dce8eb}.prose .c2{background:#e3edda}.prose .c3{background:#f6ecc9}.prose .c4{background:#eadff0}.prose .count{font-size:14px;color:var(--muted)}.prose .count b{color:var(--accent);font-size:18px}.prose textarea{width:100%;font:inherit;font-size:16px;line-height:1.7;border:1px solid var(--line);border-radius:8px;padding:10px 12px;background:#fff;resize:vertical;min-height:84px}.prose .est{display:flex;gap:24px;flex-wrap:wrap;margin-top:10px;font-size:14.5px;color:var(--ink2)}.prose .est b{font-size:20px;color:var(--accent);font-weight:700}.prose table{width:100%;border-collapse:collapse;font-size:15px;margin:10px 0 24px}.prose td,.prose th{border-bottom:1px solid var(--line);padding:9px 6px;text-align:left}.prose th{font-weight:600;color:var(--muted);font-size:13.5px}
</style>

<script>
const samples = {
  'Chinese': ['今天','天气','真','不错','，','我们','去','公园','散步','吧','。'],
  'English': ['The',' weather',' is',' really',' nice',' today','.'],
  'Long words': ['un','believ','able',' ','straw','berry'],
  'Rare characters': ['饕','餮','这个','词','读作','tāo',' ','tiè']
};
const tabs = document.getElementById('tabs');
Object.keys(samples).forEach((k,i)=>{
  const b = document.createElement('button');
  b.className = 'tab' + (i===0?' on':''); b.textContent = k;
  b.onclick = ()=>{ document.querySelectorAll('#tabs .tab').forEach(x=>x.classList.remove('on')); b.classList.add('on'); show(k); };
  tabs.appendChild(b);
});
function show(k){
  const arr = samples[k];
  const box = document.getElementById('chips'); box.innerHTML='';
  arr.forEach((t,i)=>{
    const s = document.createElement('span');
    s.className = 'chip fade c'+(i%5); s.textContent = t;
    s.style.animationDelay = (i*60)+'ms'; s.style.animationFillMode='both';
    box.appendChild(s);
  });
  document.getElementById('cnt').innerHTML = 'Split into <b>'+arr.length+'</b> pieces, which means '+arr.length+' tokens';
}
show('Chinese');

const ta = document.getElementById('ta');
function est(){
  const s = ta.value;
  const han = (s.match(/[一-鿿]/g)||[]).length;
  const words = (s.match(/[A-Za-z]+/g)||[]).length;
  const nums = (s.match(/\d+/g)||[]).length;
  const punct = (s.match(/[^一-鿿A-Za-z\d\s]/g)||[]).length;
  document.getElementById('e1').textContent = s.replace(/\s/g,'').length;
  document.getElementById('e2').textContent = Math.round(han + words*1.3 + nums + punct);
}
ta.oninput = est; est();
</script>
