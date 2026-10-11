# 蜘蛛侦探 · 个人 AI 教程网站

基于 [Astro](https://astro.build) 的纯静态网站，视觉风格参考 [oil-oil/oil-ui](https://github.com/oil-oil/oil-ui) 的设计方法：「侦探档案」方向——纸张底色、墨色文字、唯一的黄色图钉强调色。

## 本地运行

需要 Node.js 18.20+（推荐 20+）。

```bash
npm install
npm run dev       # 开发模式：http://localhost:4321/zaxiang/
npm run build     # 构建静态文件到 dist/
npm run preview   # 预览构建结果
```

## 添加教程

在 `src/content/tutorials/` 下新建一个 `.md` 文件即可，文件名就是网址（如 `my-post.md` → `/tutorials/my-post/`）。开头写上：

```markdown
---
title: 教程标题
description: 一句话简介
date: 2026-10-11
tags: [提示词, 入门]
level: 入门        # 可选：入门 / 进阶 / 高级
featured: true     # 可选：是否在首页「精选教程」展示
draft: false       # 可选：true 时不发布
---

正文用 Markdown 书写，`##` 二级标题会自动生成右侧目录。
```

可选字段：`series`（专题名）、`order`（专题内序号，决定上一篇/下一篇）、`kicker`（标题上方的小标签）。

> 当前的 10 篇教程来自仓库 [vcproo/zaxiang](https://github.com/vcproo/zaxiang) 的「AI 白话课」，原文未改动；每篇里的互动小演示以原始 HTML + `<style>` + `<script>` 的形式保留在 Markdown 中（样式统一加了 `.prose` 前缀，避免影响全站）。专题目录页见 `src/pages/baihuake.astro`。

## 侦探互动彩蛋

- 首页标题打字机效果；教程条目上悬停出现放大镜（仅鼠标设备）
- 右上角小蜘蛛随滚动吐丝下降；教程页顶部蛛丝阅读进度条
- 打开教程时「立案调查」印章落下；文末「关联线索」软木板用红线串起相关教程
- 隐藏彩蛋：在页面上敲键盘 `spider`，或连点小蜘蛛 5 次
- 系统开启「减弱动态效果」时，以上动画自动关闭

## 修改个人信息

- 昵称、简介、社交链接：`src/site.ts`（把 `url: '#'` 换成你的主页地址）
- 首页文案：`src/pages/index.astro`；关于页：`src/pages/about.astro`
- 颜色、字体：`src/styles/global.css` 顶部的 CSS 变量

## 部署

`npm run build` 生成的 `dist/` 是纯静态文件，可部署到任意静态托管：

- **Vercel / Netlify / Cloudflare Pages**：导入仓库，构建命令 `npm run build`，输出目录 `dist`。
- **GitHub Pages**：部署工作流模板在 `docs/deploy-pages.yml`（withastro/action），先把它复制到 `.github/workflows/deploy.yml` 并提交；然后在仓库 Settings → Pages → Source 选 **GitHub Actions**，之后每次推送到 main 自动部署到 https://vcproo.github.io/zaxiang/ 。`astro.config.mjs` 已设置 `site` 与 `base: "/zaxiang"`；站内链接统一用 `src/url.ts` 的 `u()` 生成，会自动带上 base。
- **自有服务器**：把 `dist/` 上传到 Nginx 等网站目录。

若改用自有域名（部署在根路径），把 `astro.config.mjs` 中的 `site` 换成你的域名并删除 `base`。

## 目录结构

```
src/
  content/tutorials/   教程 Markdown（放这里即可发布）
  content.config.ts    教程字段定义
  pages/               首页、教程列表、教程详情、白话课专题、关于、404
  layouts/Base.astro   公共页头页脚
  components/Card.astro 教程条目
  styles/global.css    设计变量与公共样式
  site.ts              站点信息与社交链接
```
