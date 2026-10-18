import type { Lang } from './i18n';

/** 知识蛛网 — 侦办级知识网络数据。group 是布局用的稳定键，展示文案走 label。 */
export type NodeKind = 'hub' | 'lesson' | 'concept';
export type NodeGroup = '中心' | '基本功' | '生成与检索' | '自主办事' | '远景' | '延伸概念';

interface Bi { zh: string; en: string }

export interface WebNode {
  id: string;
  label: string;
  kind: NodeKind;
  group: NodeGroup;
  groupLabel: string;
  caseId: string;
  ring: number;
  angle: number;
  href?: string;
  blurb: string;
}

export interface WebEdge {
  from: string;
  to: string;
  label?: string;
}

const GROUPS_RAW: { id: NodeGroup; color: string; label: Bi; tip: Bi }[] = [
  { id: '中心', color: '#C7EFDC', label: { zh: '中心', en: 'Center' }, tip: { zh: '网络锚点', en: 'Anchor of the web' } },
  { id: '基本功', color: '#E8CFA0', label: { zh: '基本功', en: 'Foundations' }, tip: { zh: '与 AI 对话的底层机制', en: 'How a conversation with a model actually works' } },
  { id: '生成与检索', color: '#8ED1B4', label: { zh: '生成与检索', en: 'Generate & retrieve' }, tip: { zh: '产出与开卷作答', en: 'Making things, and answering with the book open' } },
  { id: '自主办事', color: '#A7B6F2', label: { zh: '自主办事', en: 'Acting alone' }, tip: { zh: '工具、协议与编排', en: 'Tools, protocols, and orchestration' } },
  { id: '远景', color: '#D95A49', label: { zh: '远景', en: 'Horizon' }, tip: { zh: '尚未落地的边界概念', en: 'A boundary that has not landed yet' } },
  { id: '延伸概念', color: '#8F8798', label: { zh: '延伸概念', en: 'Further out' }, tip: { zh: '尚无专页，仅作线索', en: 'No page of its own yet — a lead only' } },
];

const NODES_RAW: {
  id: string; label: Bi; kind: NodeKind; group: NodeGroup; caseId: string;
  ring: number; angle: number; href?: string; blurb: Bi;
}[] = [
  { id: 'ai', label: { zh: 'AI', en: 'AI' }, kind: 'hub', group: '中心', caseId: 'HUB-00', ring: 0, angle: 0,
    blurb: { zh: '整张知识网络的锚点。所有专案线索自此辐射。', en: 'The anchor of the whole web. Every case radiates from here.' } },

  { id: 'prompt', label: { zh: '提示词', en: 'Prompt' }, kind: 'lesson', group: '基本功', caseId: 'C-01', ring: 1, angle: -72,
    href: '/tutorials/01-prompt/', blurb: { zh: '输入侧控制：你怎么说，模型就怎么做。', en: 'Control on the way in: how you say it is how the model does it.' } },
  { id: 'token', label: { zh: 'Token', en: 'Token' }, kind: 'lesson', group: '基本功', caseId: 'C-02', ring: 1, angle: -36,
    href: '/tutorials/02-token/', blurb: { zh: '计费与容量的原子单位：模型按块读写文本。', en: 'The atom of price and capacity: the model reads and writes text in chunks.' } },
  { id: 'context', label: { zh: '上下文窗口', en: 'Context window' }, kind: 'lesson', group: '基本功', caseId: 'C-03', ring: 1, angle: 0,
    href: '/tutorials/03-context-window/', blurb: { zh: '单次推理可见的信息桌面；溢出即遗忘。', en: 'The desk of information one pass can see. What spills off is forgotten.' } },
  { id: 'aigc', label: { zh: 'AIGC', en: 'AIGC' }, kind: 'lesson', group: '生成与检索', caseId: 'C-04', ring: 1, angle: 36,
    href: '/tutorials/04-aigc/', blurb: { zh: '生成式产出：文、图、音、视频的统一说法。', en: 'Generative output: one name for text, image, audio, and video.' } },
  { id: 'rag', label: { zh: 'RAG', en: 'RAG' }, kind: 'lesson', group: '生成与检索', caseId: 'C-05', ring: 1, angle: 72,
    href: '/tutorials/05-rag/', blurb: { zh: '检索增强：先翻资料，再生成答案。', en: 'Retrieval first: look something up, then write the answer.' } },
  { id: 'agent', label: { zh: 'Agent', en: 'Agent' }, kind: 'lesson', group: '自主办事', caseId: 'C-06', ring: 1, angle: 108,
    href: '/tutorials/06-agent/', blurb: { zh: '闭环执行：规划 → 调工具 → 观察 → 再决策。', en: 'A closed loop: plan, call a tool, look, decide again.' } },
  { id: 'mcp', label: { zh: 'MCP', en: 'MCP' }, kind: 'lesson', group: '自主办事', caseId: 'C-07', ring: 1, angle: 144,
    href: '/tutorials/07-mcp/', blurb: { zh: '工具与数据源的标准插头协议。', en: 'A standard plug for tools and data sources.' } },
  { id: 'skill', label: { zh: 'Skill', en: 'Skill' }, kind: 'lesson', group: '自主办事', caseId: 'C-08', ring: 1, angle: 180,
    href: '/tutorials/08-skill/', blurb: { zh: '可复用的操作手册，装进 Agent 的工具箱。', en: 'A reusable procedure, dropped into an agent’s toolbox.' } },
  { id: 'harness', label: { zh: 'Harness', en: 'Harness' }, kind: 'lesson', group: '自主办事', caseId: 'C-09', ring: 1, angle: 216,
    href: '/tutorials/09-harness/', blurb: { zh: '套在模型外的约束与编排层。', en: 'The constraints and orchestration wrapped around the model.' } },
  { id: 'agi', label: { zh: 'AGI', en: 'AGI' }, kind: 'lesson', group: '远景', caseId: 'C-10', ring: 1, angle: 252,
    href: '/tutorials/10-agi/', blurb: { zh: '通用智能的远景坐标——尚未结案。', en: 'The horizon marked “general intelligence”. The case is still open.' } },

  { id: 'llm', label: { zh: '大模型', en: 'LLM' }, kind: 'concept', group: '延伸概念', caseId: 'X-01', ring: 2, angle: -18,
    blurb: { zh: '消费 Token、占据上下文的推理核心。', en: 'The reasoning core that spends tokens and occupies the context window.' } },
  { id: 'prompteng', label: { zh: '提示工程', en: 'Prompt engineering' }, kind: 'concept', group: '延伸概念', caseId: 'X-02', ring: 2, angle: -90,
    blurb: { zh: '把提示词当作可度量、可迭代的工程实践。', en: 'Treating prompts as something you can measure and iterate.' } },
  { id: 'kb', label: { zh: '知识库', en: 'Knowledge base' }, kind: 'concept', group: '延伸概念', caseId: 'X-03', ring: 2, angle: 54,
    blurb: { zh: 'RAG 所依赖的结构化外部记忆。', en: 'The structured outside memory that RAG depends on.' } },
  { id: 'toolcall', label: { zh: '工具调用', en: 'Tool call' }, kind: 'concept', group: '延伸概念', caseId: 'X-04', ring: 2, angle: 126,
    blurb: { zh: 'Agent 越过纯文本、触达外部系统的动作。', en: 'The move where an agent leaves pure text and touches another system.' } },
  { id: 'workflow', label: { zh: '工作流', en: 'Workflow' }, kind: 'concept', group: '延伸概念', caseId: 'X-05', ring: 2, angle: 198,
    blurb: { zh: '多步骤任务的编排骨架。', en: 'The skeleton that orders a task with more than one step.' } },
  { id: 'multimodal', label: { zh: '多模态', en: 'Multimodal' }, kind: 'concept', group: '延伸概念', caseId: 'X-06', ring: 2, angle: 18,
    blurb: { zh: '文本之外：图像、音频与视频进入同一网络。', en: 'Beyond text: image, audio, and video on the same web.' } },
];

const EDGE_LABELS: Record<string, Bi> = {
  'prompt>token': { zh: '编码', en: 'encoding' },
  'token>context': { zh: '容量', en: 'capacity' },
};

const EDGE_PAIRS: [string, string][] = [
  ['prompt', 'token'], ['token', 'context'], ['prompt', 'prompteng'], ['token', 'llm'], ['context', 'llm'],
  ['aigc', 'multimodal'], ['aigc', 'prompt'], ['rag', 'kb'], ['rag', 'context'], ['rag', 'llm'],
  ['agent', 'toolcall'], ['agent', 'prompt'], ['mcp', 'toolcall'], ['mcp', 'agent'],
  ['skill', 'agent'], ['skill', 'prompt'], ['harness', 'agent'], ['harness', 'workflow'], ['harness', 'mcp'],
  ['agi', 'agent'], ['agi', 'llm'],
];

export const GROUP_COLOR: Record<NodeGroup, string> = Object.fromEntries(
  GROUPS_RAW.map(g => [g.id, g.color]),
) as Record<NodeGroup, string>;

export function graphFor(lang: Lang) {
  const NODES: WebNode[] = NODES_RAW.map(n => ({
    id: n.id, kind: n.kind, group: n.group, caseId: n.caseId, ring: n.ring, angle: n.angle, href: n.href,
    label: n.label[lang], blurb: n.blurb[lang], groupLabel: GROUPS_RAW.find(g => g.id === n.group)!.label[lang],
  }));
  const lessons = NODES.filter(n => n.kind === 'lesson');
  const EDGES: WebEdge[] = [
    ...lessons.map(n => ({ from: 'ai', to: n.id })),
    ...EDGE_PAIRS.map(([from, to]) => {
      const label = EDGE_LABELS[`${from}>${to}`];
      return label ? { from, to, label: label[lang] } : { from, to };
    }),
  ];
  const GROUPS = GROUPS_RAW.map(g => ({ id: g.id, color: g.color, label: g.label[lang], tip: g.tip[lang] }));
  return { NODES, EDGES, GROUPS, GROUP_COLOR };
}
