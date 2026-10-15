export interface Tool {
  name: string;
  url: string;
  domain: string;
  category: string;
  description: string;
}
export const tools: Tool[] = [
  {
    name: 'Claude AI IP 风险检测',
    url: 'https://ip.net.coffee/claude/',
    domain: 'ip.net.coffee',
    category: '网络检测',
    description: '查看 Claude 出口 IP 的风险、网络属性与可用性，辅助排查连接问题。',
  },
];
