import type { Lang } from './i18n';

// 拼接站点内链接，自动带上 base（如 /zaxiang）和语言前缀（英文为 /en）
export const u = (p: string, lang: Lang = 'zh') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const prefix = lang === 'en' ? '/en' : '';
  const path = p.startsWith('/') ? p : `/${p}`;
  return base + prefix + path;
};
