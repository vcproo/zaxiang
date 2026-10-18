import type { Lang } from './i18n';

export interface Tool {
  name: string;
  url: string;
  domain: string;
  category: string;
  description: string;
}

const raw = [
  {
    name: { zh: 'Claude AI IP 风险检测', en: 'Claude AI IP risk check' },
    url: 'https://ip.net.coffee/claude/',
    domain: 'ip.net.coffee',
    category: { zh: '网络检测', en: 'Network' },
    description: {
      zh: '查看 Claude 出口 IP 的风险、网络属性与可用性，辅助排查连接问题。',
      en: 'Check the risk, network traits, and reachability of the IP Claude is exiting from, when a connection misbehaves.',
    },
  },
];

export function toolsFor(lang: Lang): Tool[] {
  return raw.map(t => ({
    name: t.name[lang],
    url: t.url,
    domain: t.domain,
    category: t.category[lang],
    description: t.description[lang],
  }));
}
