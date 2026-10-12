/** 知识蛛网 — 侦办级知识网络数据 */
export type NodeKind = 'hub' | 'lesson' | 'concept';
export type NodeGroup = '中心' | '基本功' | '生成与检索' | '自主办事' | '远景' | '延伸概念';

export interface WebNode {
  id: string;
  label: string;
  kind: NodeKind;
  group: NodeGroup;
  caseId: string;
  /** 初始极坐标（仿真起点，非最终布局） */
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

export const GROUPS: { id: NodeGroup; color: string; tip: string }[] = [
  { id: '中心', color: '#E8B84A', tip: '网络锚点' },
  { id: '基本功', color: '#C9A227', tip: '与 AI 对话的底层机制' },
  { id: '生成与检索', color: '#6B9E78', tip: '产出与开卷作答' },
  { id: '自主办事', color: '#5B8FA8', tip: '工具、协议与编排' },
  { id: '远景', color: '#B85A4A', tip: '尚未落地的边界概念' },
  { id: '延伸概念', color: '#8A8478', tip: '尚无专页，仅作线索' },
];

export const NODES: WebNode[] = [
  { id: 'ai', label: 'AI', kind: 'hub', group: '中心', caseId: 'HUB-00', ring: 0, angle: 0,
    blurb: '整张知识网络的锚点。所有专案线索自此辐射。' },

  { id: 'prompt', label: '提示词', kind: 'lesson', group: '基本功', caseId: 'C-01', ring: 1, angle: -72,
    href: '/tutorials/01-prompt/', blurb: '输入侧控制：你怎么说，模型就怎么做。' },
  { id: 'token', label: 'Token', kind: 'lesson', group: '基本功', caseId: 'C-02', ring: 1, angle: -36,
    href: '/tutorials/02-token/', blurb: '计费与容量的原子单位：模型按块读写文本。' },
  { id: 'context', label: '上下文窗口', kind: 'lesson', group: '基本功', caseId: 'C-03', ring: 1, angle: 0,
    href: '/tutorials/03-context-window/', blurb: '单次推理可见的信息桌面；溢出即遗忘。' },
  { id: 'aigc', label: 'AIGC', kind: 'lesson', group: '生成与检索', caseId: 'C-04', ring: 1, angle: 36,
    href: '/tutorials/04-aigc/', blurb: '生成式产出：文、图、音、视频的统一说法。' },
  { id: 'rag', label: 'RAG', kind: 'lesson', group: '生成与检索', caseId: 'C-05', ring: 1, angle: 72,
    href: '/tutorials/05-rag/', blurb: '检索增强：先翻资料，再生成答案。' },
  { id: 'agent', label: 'Agent', kind: 'lesson', group: '自主办事', caseId: 'C-06', ring: 1, angle: 108,
    href: '/tutorials/06-agent/', blurb: '闭环执行：规划 → 调工具 → 观察 → 再决策。' },
  { id: 'mcp', label: 'MCP', kind: 'lesson', group: '自主办事', caseId: 'C-07', ring: 1, angle: 144,
    href: '/tutorials/07-mcp/', blurb: '工具与数据源的标准插头协议。' },
  { id: 'skill', label: 'Skill', kind: 'lesson', group: '自主办事', caseId: 'C-08', ring: 1, angle: 180,
    href: '/tutorials/08-skill/', blurb: '可复用的操作手册，装进 Agent 的工具箱。' },
  { id: 'harness', label: 'Harness', kind: 'lesson', group: '自主办事', caseId: 'C-09', ring: 1, angle: 216,
    href: '/tutorials/09-harness/', blurb: '套在模型外的约束与编排层。' },
  { id: 'agi', label: 'AGI', kind: 'lesson', group: '远景', caseId: 'C-10', ring: 1, angle: 252,
    href: '/tutorials/10-agi/', blurb: '通用智能的远景坐标——尚未结案。' },

  { id: 'llm', label: '大模型', kind: 'concept', group: '延伸概念', caseId: 'X-01', ring: 2, angle: -18,
    blurb: '消费 Token、占据上下文的推理核心。' },
  { id: 'prompteng', label: '提示工程', kind: 'concept', group: '延伸概念', caseId: 'X-02', ring: 2, angle: -90,
    blurb: '把提示词当作可度量、可迭代的工程实践。' },
  { id: 'kb', label: '知识库', kind: 'concept', group: '延伸概念', caseId: 'X-03', ring: 2, angle: 54,
    blurb: 'RAG 所依赖的结构化外部记忆。' },
  { id: 'toolcall', label: '工具调用', kind: 'concept', group: '延伸概念', caseId: 'X-04', ring: 2, angle: 126,
    blurb: 'Agent 越过纯文本、触达外部系统的动作。' },
  { id: 'workflow', label: '工作流', kind: 'concept', group: '延伸概念', caseId: 'X-05', ring: 2, angle: 198,
    blurb: '多步骤任务的编排骨架。' },
  { id: 'multimodal', label: '多模态', kind: 'concept', group: '延伸概念', caseId: 'X-06', ring: 2, angle: 18,
    blurb: '文本之外：图像、音频与视频进入同一网络。' },
];

export const EDGES: WebEdge[] = [
  ...NODES.filter(n => n.kind === 'lesson').map(n => ({ from: 'ai', to: n.id })),
  { from: 'prompt', to: 'token', label: '编码' },
  { from: 'token', to: 'context', label: '容量' },
  { from: 'prompt', to: 'prompteng' },
  { from: 'token', to: 'llm' },
  { from: 'context', to: 'llm' },
  { from: 'aigc', to: 'multimodal' },
  { from: 'aigc', to: 'prompt' },
  { from: 'rag', to: 'kb' },
  { from: 'rag', to: 'context' },
  { from: 'rag', to: 'llm' },
  { from: 'agent', to: 'toolcall' },
  { from: 'agent', to: 'prompt' },
  { from: 'mcp', to: 'toolcall' },
  { from: 'mcp', to: 'agent' },
  { from: 'skill', to: 'agent' },
  { from: 'skill', to: 'prompt' },
  { from: 'harness', to: 'agent' },
  { from: 'harness', to: 'workflow' },
  { from: 'harness', to: 'mcp' },
  { from: 'agi', to: 'agent' },
  { from: 'agi', to: 'llm' },
];

export const GROUP_COLOR: Record<NodeGroup, string> = Object.fromEntries(
  GROUPS.map(g => [g.id, g.color]),
) as Record<NodeGroup, string>;
