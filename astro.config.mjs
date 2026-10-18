import { defineConfig } from 'astro/config';
// 部署到 GitHub Pages：https://vcproo.github.io/zaxiang
// 若改用自有域名（根路径），把 site 换成你的域名，并删除 base。
export default defineConfig({
  site: 'https://vcproo.github.io',
  base: '/zaxiang',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  output: 'static',
  vite: {
    server: {
      watch: {
        // 成片预览是静态媒体，不参与热更新，避免一次盯住上千个文件把开发服务撑爆
        ignored: ['**/style-motion/refs/previews/**', '**/style-motion/refs/posters/**'],
      },
    },
  },
});
