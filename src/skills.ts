export interface SkillUsage {
  title: string;
  text: string;
  code?: string;
}

export interface SkillEntry {
  id: string;
  name: string;
  category: string;
  tagline: string;
  repo: string;
  install: string;
  intro: string;
  usage: SkillUsage[];
  thumb: string;
  demo: { title: string; path: string; caption: string };
}

export const skills: SkillEntry[] = [
  {
    id: 'anatomy',
    name: 'Anatomy',
    category: '可视化讲解',
    tagline: '让 AI「造一台实物」讲清原理：四色调等距立体插图，带实时读数和交互控制台。',
    repo: 'https://github.com/wheresryan22/anatomy/tree/main',
    install: 'npx skills add wheresryan22/anatomy -g',
    intro: 'Anatomy 是一个开源 Agent Skill（MIT 协议，10.6k star）。它不画图表，而是画机器、仪器和工具：讲缓存键，就造一把只有销钉全对上才会开的弹子锁；讲限流，就造一台看得见流速的机器。产出可以是独立 HTML、单独 SVG 或 React 组件，自带明暗两套主题。',
    usage: [
      {
        title: '安装',
        text: '一条命令装进全局，CLI 会问你配给哪个 Agent（Claude Code、Codex、OpenCode、Antigravity）；也可以 git clone 到 ~/.claude/skills/anatomy。',
        code: 'npx skills add wheresryan22/anatomy -g',
      },
      {
        title: '调用',
        text: '在 Claude Code 里用斜杠命令，Codex 里用 $anatomy。不显式调用也可以——当你请求等距插图或交互式讲解时，它会自动加载。',
        code: '/anatomy 解释令牌桶限流怎么工作，interactive',
      },
      {
        title: '怎么提需求',
        text: '说清楚要解释的概念和真实数字（而不是描述图长什么样），或直接点名一台机器（咖啡机、本生灯）；再说明输出目标：HTML、SVG 还是 React，明主题还是暗主题。',
      },
      {
        title: '需要什么环境',
        text: 'Node.js 20.10+（只用内置模块，不用 npm install）；自检需要 Chrome/Chromium；输出 React 组件才需要 React 18+。',
      },
    ],
    thumb: '/skills/anatomy/thumb.png',
    demo: {
      title: '曲柄滑块机构',
      path: '/skills/anatomy/demo.html',
      caption: '「旋转，变成往复。」一根连杆把圆周运动传给直线滑块。拖动曲柄角度、调转速，右侧控制台实时显示滑块位移和一个旋转周期内的位移曲线。',
    },
  },
];
