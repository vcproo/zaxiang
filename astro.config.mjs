import { defineConfig } from 'astro/config';
// 部署到 GitHub Pages：https://vcproo.github.io/zaxiang
// 若改用自有域名（根路径），把 site 换成你的域名，并删除 base。
export default defineConfig({
  site: 'https://vcproo.github.io',
  base: '/zaxiang',
  trailingSlash: 'always',
  output: 'static',
});
