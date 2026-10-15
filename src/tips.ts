// 小技巧：列表 + 可展开抽屉。带 compare 的技巧，抽屉里可在「技巧 / 对比效果」之间切换。
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
export const tips: Tip[] = [
  {
    title: 'ASD-STE100：让 AI 把话说死',
    summary: '一条输出约束，不是新模型：短句、一句只做一件事、同一个东西永远用同一个词',
    points: [
      '这是一条输出约束，不是新模型。你在提示词里写上 ASD-STE100，模型会按航空维修手册的写法来答：短句、一个句子只做一件事、同一个东西永远用同一个词。',
      '它解决的是含糊。普通回答为了顺，会换词、加套话、把两个动作写进一句。读者不能回头问的时候，这种顺就是错误来源。',
      '适合操作步骤、运行手册、接口用法、发布说明、安全提示。不适合聊天、劝说、创作，也不适合需要保留分寸的判断。',
    ],
    compare: {
      title: 'Claude 讲解「榫卯」：使用规范前后',
      before: { src: '/tips/asd-ste/before.png', label: '① 使用前 · 普通写法', w: 1080, h: 822 },
      after: { src: '/tips/asd-ste/after.png', label: '② 参照 ASD-STE100 之后', w: 1080, h: 845 },
    },
  },
  {
    title: '视觉对齐：让 AI 回头把页面理整齐',
    summary: 'AI 做的页面看着别扭、又说不出哪里不对时，跟它说一句「视觉对齐」，可能会有不一样的效果',
    points: [
      '这是一句检查指令，不是让它重做。AI 生成的页面常有这类小毛病：元素差几个像素没对齐、间距忽大忽小、图标和文字不在一条线上。单看每一块都没错，放在一起就显得乱。说一句「视觉对齐」，它会回头把这些地方逐个找出来修。',
      '它管的是「看起来齐不齐」，不只是数值上齐不齐。圆形图标按数值居中了，看着却偏下；粗体大标题和正文左边缘对齐了，看着却往里缩。视觉对齐会照人眼的感受做微调。',
      '适合页面结构已经对了、只是细节显得粗糙的时候。如果是布局、配色、整体风格不对，先把方向说清楚，再说视觉对齐。效果跟模型和页面有关，不一定每次都明显。',
    ],
    prompt: '这个页面结构没问题，但看着不够整齐。请做一次视觉对齐：检查各区块的左右边缘、文字基线、图标和文字的垂直居中、卡片之间的间距是否一致。先列出发现的问题，再逐一修改。',
  },
];
