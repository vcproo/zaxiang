/** 知识蛛网：节点与连线（后续可继续加深） */
export type NodeKind = 'hub' | 'lesson' | 'concept';
export type NodeGroup = '中心' | '基本功' | '生成与检索' | '自主办事' | '远景' | '延伸概念';

export interface WebNode {
  id: string;
  label: string;
  kind: NodeKind;
  group: NodeGroup;
  /** 极坐标：环 0=中心，1=内环，2=外环；angle 0–360 */
  ring: number;
  angle: number;
  href?: string; // 有教程则跳转
  blurb: string;
}

export interface WebEdge {
  from: string;
  to: string;
}

export const GROUPS: { id: NodeGroup; color: string; tip: string }[] = [
  { id: '中心', color: '#F2C230', tip: '整张网的锚点' },
  { id: '基本功', color: '#A8740A', tip: '跟 AI 打交道的基础' },
  { id: '生成与检索', color: '#4F7A3A', tip: '能做出什么、怎样答得更准' },
  { id: '自主办事', color: '#2F6474', tip: '从出主意到去办事' },
  { id: '远景', color: '#B8322A', tip: '还在到来路上的概念' },
  { id: '延伸概念', color: '#7C766A', tip: '暂时只有简介，点击看线索' },
];

export const NODES: WebNode[] = [
  { id: 'ai', label: 'AI', kind: 'hub', group: '中心', ring: 0, angle: 0,
    blurb: '整张网的中心。零散的知识点从这里织出去。' },

  // —— 白话课 10 篇（内环）——
  { id: 'prompt', label: '提示词', kind: 'lesson', group: '基本功', ring: 1, angle: -72,
    href: '/tutorials/01-prompt/', blurb: '你怎么说，AI 就怎么做。' },
  { id: 'token', label: 'Token', kind: 'lesson', group: '基本功', ring: 1, angle: -36,
    href: '/tutorials/02-token/', blurb: 'AI 是一块一块读字的。' },
  { id: 'context', label: '上下文窗口', kind: 'lesson', group: '基本功', ring: 1, angle: 0,
    href: '/tutorials/03-context-window/', blurb: 'AI 的那张桌子有多大。' },
  { id: 'aigc', label: 'AIGC', kind: 'lesson', group: '生成与检索', ring: 1, angle: 36,
    href: '/tutorials/04-aigc/', blurb: '用 AI 做出来的东西。' },
  { id: 'rag', label: 'RAG', kind: 'lesson', group: '生成与检索', ring: 1, angle: 72,
    href: '/tutorials/05-rag/', blurb: '让 AI 开卷考试。' },
  { id: 'agent', label: 'Agent', kind: 'lesson', group: '自主办事', ring: 1, angle: 108,
    href: '/tutorials/06-agent/', blurb: '从「出主意」到「去办事」。' },
  { id: 'mcp', label: 'MCP', kind: 'lesson', group: '自主办事', ring: 1, angle: 144,
    href: '/tutorials/07-mcp/', blurb: '给 AI 的万能插头。' },
  { id: 'skill', label: 'Skill', kind: 'lesson', group: '自主办事', ring: 1, angle: 180,
    href: '/tutorials/08-skill/', blurb: '给 AI 的一本本操作手册。' },
  { id: 'harness', label: 'Harness', kind: 'lesson', group: '自主办事', ring: 1, angle: 216,
    href: '/tutorials/09-harness/', blurb: '套在 AI 身上的那副马具。' },
  { id: 'agi', label: 'AGI', kind: 'lesson', group: '远景', ring: 1, angle: 252,
    href: '/tutorials/10-agi/', blurb: '那个还没到来的「全能选手」。' },

  // —— 延伸概念（外环，暂无独立教程）——
  { id: 'llm', label: '大模型', kind: 'concept', group: '延伸概念', ring: 2, angle: -18,
    blurb: '吃 Token、占上下文窗口的那颗大脑。' },
  { id: 'prompteng', label: '提示工程', kind: 'concept', group: '延伸概念', ring: 2, angle: -90,
    blurb: '把提示词当成一门可以打磨的手艺。' },
  { id: 'kb', label: '知识库', kind: 'concept', group: '延伸概念', ring: 2, angle: 54,
    blurb: 'RAG 打开的那本「开卷资料」。' },
  { id: 'toolcall', label: '工具调用', kind: 'concept', group: '延伸概念', ring: 2, angle: 126,
    blurb: 'Agent 伸手去按按钮的那一下。' },
  { id: 'workflow', label: '工作流', kind: 'concept', group: '延伸概念', ring: 2, angle: 198,
    blurb: 'Harness 把多步活串成一条流水线。' },
  { id: 'multimodal', label: '多模态', kind: 'concept', group: '延伸概念', ring: 2, angle: 18,
    blurb: '不止文字：图、声、视频也进网。' },
];

/** 丝线：中心连每门课；课与课/概念之间是「真实关联」 */
export const EDGES: WebEdge[] = [
  // hub → lessons
  ...NODES.filter(n => n.kind === 'lesson').map(n => ({ from: 'ai', to: n.id })),
  // 基本功链条
  { from: 'prompt', to: 'token' },
  { from: 'token', to: 'context' },
  { from: 'prompt', to: 'prompteng' },
  { from: 'token', to: 'llm' },
  { from: 'context', to: 'llm' },
  // 生成与检索
  { from: 'aigc', to: 'multimodal' },
  { from: 'aigc', to: 'prompt' },
  { from: 'rag', to: 'kb' },
  { from: 'rag', to: 'context' },
  { from: 'rag', to: 'llm' },
  // 自主办事
  { from: 'agent', to: 'toolcall' },
  { from: 'agent', to: 'prompt' },
  { from: 'mcp', to: 'toolcall' },
  { from: 'mcp', to: 'agent' },
  { from: 'skill', to: 'agent' },
  { from: 'skill', to: 'prompt' },
  { from: 'harness', to: 'agent' },
  { from: 'harness', to: 'workflow' },
  { from: 'harness', to: 'mcp' },
  // 远景
  { from: 'agi', to: 'agent' },
  { from: 'agi', to: 'llm' },
];
