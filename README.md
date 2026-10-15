# 蜘蛛侦探 · 个人 AI 教程网站

基于 [Astro](https://astro.build) 的纯静态网站。视觉概念是「深夜的侦探事务所」：深墨紫做桌面，奶白做档案纸，薄荷绿代表「感知」，证物朱红只做小面积点缀。全站配色与 IP 标准色同源（见 `public/ip/README-design-spec.md`）。

- 页面用深色底；教程正文放在奶白「档案纸」上，长文阅读仍然是浅底深字
- 角色立绘放在奶白光圈里，保证深色背景上的轮廓清晰（IP 规范 §9）
- 蜘蛛元素只用角色本身的「六颗副眼」，不额外画蜘蛛和蛛网

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

> 当前的 10 篇教程来自仓库 [vcproo/zaxiang](https://github.com/vcproo/zaxiang) 的「AI 白话课」，原文未改动；每篇里的互动小演示以原始 HTML + `<style>` + `<script>` 的形式保留在 Markdown 中（样式统一加了 `.prose` 前缀，避免影响全站）。

## 知识蛛网

`/zhishi/` 是可交互的知识点蛛网：中心是 AI，内环是白话课十个热词（可进教程），外环是延伸概念。数据在 `src/zhishi.ts`，后续加深只需改这一处。

## 侦探互动彩蛋

- 首页标题打字机效果；首页背景藏着线索词，鼠标像手电筒一样照到哪里、哪里亮起（仅鼠标设备）
- 页头右上角是角色的六颗副眼，随阅读进度依次亮起；页头下沿有一条薄荷绿进度线
- 卡片跟随指针出现柔光；内容滚动到视口时浮现
- 打开教程时「立案调查」印章落下；文末「关联线索」线索板用红线串起相关教程
- 隐藏彩蛋：在页面上敲键盘 `spider`，或连点页头的副眼 5 次
- 系统开启「减弱动态效果」时，以上动画自动关闭

## 修改个人信息

- 昵称、简介、社交链接：`src/site.ts`（把 `url: '#'` 换成你的主页地址）
- 首页文案：`src/pages/index.astro`；关于页：`src/pages/about.astro`
- 颜色、字体：`src/styles/global.css` 顶部的 CSS 变量
- 工具、小技巧、Skill 列表：`src/tools.ts`、`src/tips.ts`、`src/skills.ts`（首页「档案室」的数量会自动更新）

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
  pages/               首页、教程、知识网、动效、工具、Skill、小技巧、关于、404（导航栏不含首页，点左上角「蜘蛛侦探」回首页）
  layouts/Base.astro   公共页头页脚、阅读进度、彩蛋
  components/Card.astro 教程条目
  components/IpFigure.astro 角色立绘（奶白光圈）
  styles/global.css    设计变量、公共组件（sd-btn / sd-chip / sd-card）、教程正文样式
  site.ts              站点信息与社交链接
  zhishi.ts            知识网数据
  tools.ts / tips.ts / skills.ts  工具、小技巧、Skill 数据
  styles/style-motion.css  动效页的画风导览 / 动效词典样式（限定在 .sm-style / .sm-motion 内）
  data/style-fontwarm.html  画风样张用到的字，预先放进页面让子集字体加载
public/style-motion/
  styles.js / motion.js  画风导览（17 个样张）、动效词典（34 个动效）的脚本，直接在 /motion/ 页面里运行
  lib/three.min.js、fonts/  3D 样张用的 three.js 和演示字体
```
