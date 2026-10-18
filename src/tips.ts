import type { Lang } from './i18n';

export interface TipCompare {
  title: string;
  before: { src: string; label: string; w: number; h: number };
  after: { src: string; label: string; w: number; h: number };
}
export interface Tip {
  title: string;
  summary: string;
  points: string[];
  prompt?: string;
  compare?: TipCompare;
}

const raw = [
  {
    title: { zh: 'ASD-STE100：让 AI 把话说死', en: 'ASD-STE100: make the AI say it once, and mean it' },
    summary: {
      zh: '一条输出约束，不是新模型：短句、一句只做一件事、同一个东西永远用同一个词',
      en: 'An output constraint, not a new model: short sentences, one action per sentence, one name for one thing',
    },
    points: {
      zh: [
        '这是一条输出约束，不是新模型。你在提示词里写上 ASD-STE100，模型会按航空维修手册的写法来答：短句、一个句子只做一件事、同一个东西永远用同一个词。',
        '它解决的是含糊。普通回答为了顺，会换词、加套话、把两个动作写进一句。读者不能回头问的时候，这种顺就是错误来源。',
        '适合操作步骤、运行手册、接口用法、发布说明、安全提示。不适合聊天、劝说、创作，也不适合需要保留分寸的判断。',
      ],
      en: [
        'This is an output constraint, not a new model. Put ASD-STE100 in the prompt and the model answers in the style of an aviation maintenance manual: short sentences, one action per sentence, and the same word for the same thing every time.',
        'It is aimed at ambiguity. A fluent answer swaps words, adds padding, and packs two actions into one sentence. When the reader cannot ask a follow-up, that fluency is where mistakes come from.',
        'Use it for procedures, runbooks, API usage, release notes, and safety notes. Skip it for chat, persuasion, fiction, and any judgment that needs room to hedge.',
      ],
    },
    compare: {
      title: { zh: 'Claude 讲解「榫卯」：使用规范前后', en: 'Claude explains a mortise-and-tenon joint, before and after the spec' },
      before: { src: '/tips/asd-ste/before.png', label: { zh: '① 使用前 · 普通写法', en: '① Before · ordinary prose' }, w: 1080, h: 822 },
      after: { src: '/tips/asd-ste/after.png', label: { zh: '② 参照 ASD-STE100 之后', en: '② After ASD-STE100' }, w: 1080, h: 845 },
    },
  },
  {
    title: { zh: '视觉对齐：让 AI 回头把页面理整齐', en: 'Visual alignment: send the AI back to straighten the page' },
    summary: {
      zh: 'AI 做的页面看着别扭、又说不出哪里不对时，跟它说一句「视觉对齐」，可能会有不一样的效果',
      en: 'When an AI-built page feels off and you cannot say why, ask for “visual alignment”',
    },
    points: {
      zh: [
        '这是一句检查指令，不是让它重做。AI 生成的页面常有这类小毛病：元素差几个像素没对齐、间距忽大忽小、图标和文字不在一条线上。单看每一块都没错，放在一起就显得乱。说一句「视觉对齐」，它会回头把这些地方逐个找出来修。',
        '它管的是「看起来齐不齐」，不只是数值上齐不齐。圆形图标按数值居中了，看着却偏下；粗体大标题和正文左边缘对齐了，看着却往里缩。视觉对齐会照人眼的感受做微调。',
        '适合页面结构已经对了、只是细节显得粗糙的时候。如果是布局、配色、整体风格不对，先把方向说清楚，再说视觉对齐。效果跟模型和页面有关，不一定每次都明显。',
      ],
      en: [
        'This is a check, not a request to start over. AI-built pages often miss by a few pixels: edges that do not line up, spacing that swells and shrinks, icons that sit off the text. Each piece looks fine alone. Together they look messy. Say “visual alignment” and it goes back through those spots one by one.',
        'It is about what looks aligned, not only what measures aligned. A round icon can be mathematically centered and still look low. A heavy title can share a left edge with the body and still look indented. Visual alignment nudges for the eye.',
        'Use it when the structure is already right and only the finish is rough. If the layout, color, or overall style is wrong, say that first. The effect depends on the model and the page. It is not dramatic every time.',
      ],
    },
    prompt: {
      zh: '这个页面结构没问题，但看着不够整齐。请做一次视觉对齐：检查各区块的左右边缘、文字基线、图标和文字的垂直居中、卡片之间的间距是否一致。先列出发现的问题，再逐一修改。',
      en: 'The structure of this page is fine, but it does not look straight. Do one visual-alignment pass: check left and right edges of each block, text baselines, vertical centering of icons against text, and whether the gaps between cards are consistent. List what you find, then fix each item.',
    },
  },
];

export function tipsFor(lang: Lang): Tip[] {
  return raw.map(t => ({
    title: t.title[lang],
    summary: t.summary[lang],
    points: t.points[lang],
    prompt: t.prompt?.[lang],
    compare: t.compare && {
      title: t.compare.title[lang],
      before: { ...t.compare.before, label: t.compare.before.label[lang] },
      after: { ...t.compare.after, label: t.compare.after.label[lang] },
    },
  }));
}
