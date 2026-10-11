---
title: "提示词：你怎么说，AI 就怎么做"
description: "\"提示词\"这三个字听着有点玄乎，好像得学一套咒语才行。其实它就是你在对话框里打的那句话。"
date: 2026-10-10
tags: ["AI 白话课", "跟 AI 打交道的基本功"]
level: 入门
series: AI 白话课
order: 1
kicker: "PROMPT · 提示词"
featured: true
---

## 你早就在写提示词了

<p>问 AI"明天降温穿什么"，这是提示词。让它"帮我把这段话改通顺"，也是提示词。英文叫 prompt，原本是戏台上"提词"的意思：演员忘词了，旁边有人小声提一句，他就能接着往下演。</p>

<p>AI 也一样。你给它起个头，它顺着往下接。所以你起的这个头怎么样，直接决定它接出来的东西怎么样。</p>

## 同一个 AI，为什么别人用着顺手，你用着一般？

<p>多半不是 AI 的问题，是它<strong>不了解你</strong>。</p>

<p>想象你请了个装修师傅，只说一句"给我弄好看点"。师傅不知道你家几口人，不知道你喜欢木头色还是白色，也不知道预算多少，最后只能按"大多数人觉得好看"的样子来。弄完你一看，挑不出大毛病，但总觉得不是你想要的。</p>

<p>AI 回答得"正确但没用"，基本都是这个原因。来看个例子：</p>

<div class="figure">
<div class="demo-title">动手试试：同一件事，两种说法</div>
<div class="tabs">
<button class="tab on" data-v="a">随口一说</button>
<button class="tab" data-v="b">说清楚了</button>
</div>
<div id="cmp"></div>
<div class="cap">AI 的回答是示意，但差别是真实存在的</div>
</div>

<p>第二种说法也没用什么技巧，就是多交代了几句：给谁的、发在哪、多长、什么口气、有什么可以提的。AI 手里材料多了，写出来的东西自然就像"你家的事"了。</p>

## 交代清楚，主要就这几件事

<p>不用背公式。你可以想想，如果这件事交给一个刚来的同事办，你会跟他说些什么。大体上逃不出下面几样，可以勾一勾，看看提示词是怎么一点点变"清楚"的：</p>

<div class="figure builder">
<div class="demo-title">动手试试：把一句话补完整</div>
<label><input data-k="who" type="checkbox"/>说说背景：这事是给谁的、为什么要做</label>
<label><input data-k="use" type="checkbox"/>说说用途：写完拿去哪儿用</label>
<label><input data-k="shape" type="checkbox"/>说说要求：多长、什么口气、什么格式</label>
<label><input data-k="no" type="checkbox"/>说说忌讳：哪些东西别写</label>
<label><input data-k="eg" type="checkbox"/>给个例子：照着这个感觉来</label>
<div class="out" id="built"></div>
<div class="meter"><span>交代清楚的程度</span><div class="track"><div class="fill" id="fill"></div></div></div>
</div>

<p>也不是每次都要五样全上。问个天气、查个单词，一句话就够了。事情越是"你自己心里有数、别人不知道"，就越值得多说几句。</p>

## 几个顺手的小办法

<ul>
<li><b>不知道怎么说，就让它先问你。</b>比如"我想做个家庭旅行计划，你先问我几个问题，问清楚了再出方案"。它会反过来问你人数、预算、天数，省得你自己想。</li>
<li><b>不满意就接着说，别急着重来。</b>"第二段太啰嗦了""口气再随便一点""换个开头"。这跟改稿一样，一轮一轮磨。</li>
<li><b>给例子比讲道理好使。</b>你说"要幽默"，它理解的幽默可能跟你不是一回事。贴一段你觉得好的，说"照这个味儿来"，一下就对上了。</li>
<li><b>要几个版本挑一挑。</b>"给我三个不同风格的标题"，比让它憋一个强。</li>
</ul>

## 网上那些"万能提示词模板"，要不要买？

<p>不太建议花钱。早几年 AI 理解力差，确实需要一些固定写法去"哄"它。现在的模型聪明多了，你把话说明白，比套什么模板都管用。</p>

<p>那些模板里真正有用的部分，说穿了也就是上面那几条：背景、用途、要求、例子。</p>

<div class="aside">一个小提醒：提示词里别放身份证号、银行卡号、密码这类东西。你打进去的内容会发到 AI 公司的服务器上，没必要冒这个险。</div>

<div class="remember">
<div class="label">记住这一句</div>
<p>把 AI 当成一个聪明、但刚到你身边的新同事。你交代得越清楚，它活儿干得越好。</p>
</div>

<style>.prose .compare-label{font-size:13px;color:var(--muted);margin:14px 0 4px}.prose .builder label{display:flex;gap:10px;align-items:flex-start;font-size:15.5px;line-height:1.6;padding:7px 0;border-bottom:1px dashed var(--line);cursor:pointer}.prose .builder label:last-of-type{border-bottom:0}.prose .builder input{margin-top:5px;accent-color:var(--accent)}.prose .out{margin-top:16px;background:#f3efe7;border-radius:8px;padding:14px 16px;font-size:15.5px;line-height:1.8;min-height:52px}.prose .meter{display:flex;align-items:center;gap:10px;margin-top:12px;font-size:13.5px;color:var(--muted)}.prose .meter .track{flex:1;height:8px;background:#ece6db;border-radius:4px;overflow:hidden}.prose .meter .fill{height:100%;width:10%;background:var(--accent);transition:width .3s}
</style>

<script>
const cmpData = {
  a: {
    me: '写一段生日祝福',
    ai: '祝您生日快乐！愿您在新的一岁里身体健康、万事如意，每一天都充满阳光和欢笑，幸福安康，心想事成！'
  },
  b: {
    me: '我妈明天 60 岁生日，她是退休的小学语文老师，平时爱跳广场舞，阳台上养了一盆君子兰养了十几年。帮我写一段发在家庭群里的祝福，100 字以内，口气亲切点，别太肉麻，可以提一下那盆君子兰。',
    ai: '妈，六十岁生日快乐！教了一辈子书，总算轮到您慢慢过日子了。广场舞接着跳，君子兰接着养，今年它要是再开花，记得第一个拍给我看。家里人都在，您就负责开开心心的。'
  }
};
function showCmp(k){
  const d = cmpData[k];
  document.getElementById('cmp').innerHTML =
    '<div class="bubble me fade"><span class="who">你说</span>'+d.me+'</div>'+
    '<div class="bubble ai fade"><span class="who">AI 回</span>'+d.ai+'</div>';
}
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
  t.classList.add('on'); showCmp(t.dataset.v);
});
showCmp('a');

const parts = {
  base: '帮我写一份请假条。',
  who:  '我在一家超市做收银，下周三孩子学校开家长会，需要请半天假。',
  use:  '要发到店长的微信上。',
  shape:'三四句话就行，客气一点，但别太正式，我们店里平时说话挺随便的。',
  no:   '不要写"敬请批准"这种公文腔。',
  eg:   '大概这个感觉：“王姐，跟你说个事儿……”'
};
const order = ['who','use','shape','no','eg'];
function build(){
  const on = order.filter(k=>document.querySelector('[data-k="'+k+'"]').checked);
  const text = parts.base + on.map(k=>parts[k]).join('');
  document.getElementById('built').innerHTML = '<span class="who" style="font-size:12px;color:#857d75;display:block">你的提示词</span>' + text;
  document.getElementById('fill').style.width = (10 + on.length*18) + '%';
}
document.querySelectorAll('.builder input').forEach(i=>i.onchange=build);
build();
</script>
