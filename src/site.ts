import type { Lang } from './i18n';

const socials = [
  { zh: '小红书', en: 'Xiaohongshu', url: '#' },
  { zh: 'B 站', en: 'Bilibili', url: '#' },
  { zh: '抖音', en: 'Douyin', url: '#' },
  { zh: '微信公众号', en: 'WeChat', url: '#' },
  { zh: 'X', en: 'X', url: '#' },
];

export function siteFor(lang: Lang) {
  return {
    name: lang === 'zh' ? '蜘蛛侦探' : 'Spider Detective',
    en: 'Spider Detective',
    tagline: lang === 'zh'
      ? '把 AI 拆开来看，一根线索一根线索地讲清楚。'
      : 'Take AI apart, and follow one clue at a time.',
    socials: socials.map(s => ({ name: s[lang], url: s.url })),
  };
}
