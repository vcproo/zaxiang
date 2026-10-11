// 拼接站点内链接，自动带上 astro.config.mjs 里的 base（如 /zaxiang）
export const u = (p: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + p;
