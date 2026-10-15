# 蜘蛛侦探 · 个人 AI 教程网站

「蜘蛛侦探」的 AI 教程档案馆：把 AI 拆开来看，一根线索一根线索地讲清楚。基于 [Astro](https://astro.build) 的纯静态网站，构建产物可以放到任何静态托管。

## 设计

视觉概念是「深夜的侦探事务所」：深墨紫做桌面，奶白做档案纸，薄荷绿代表「感知」，证物朱红只做小面积点缀。全站配色与角色 IP 标准色同源。

- 页面用深色底；教程正文放在奶白「档案纸」上，长文阅读仍然是浅底深字
- 角色立绘站在奶白光圈里，保证深色背景上的轮廓清晰
- 蜘蛛元素只用角色本身的「六颗副眼」，不额外画蜘蛛和蛛网
- 改角色素材、配色、表情或动画前，先读 `public/ip/README-design-spec.md`（约束摘要见 `AGENTS.md`）

## 页面

导航栏不放「首页」，点左上角「蜘蛛侦探」回首页。

| 路由 | 内容 | 数据 / 源文件 |
|---|---|---|
| `/` | 首页：主视觉、热词跑马灯、「从这里开始」精选教程、「档案室」各栏目入口、标签 | `src/pages/index.astro` |
| `/tutorials/` | 教程列表，可按标签筛选、搜索（按 `/` 聚焦搜索框） | `src/content/tutorials/*.md` |
| `/tutorials/<id>/` | 教程详情：目录、奶白正文、上一篇 / 下一篇、关联线索板 | 同上 |
| `/motion/` | 动效档案：画风导览（17 种）+ 动效词典（34 个），页签切换 | `public/style-motion/` |
| `/tools/` | 工具导航 | `src/tools.ts` |
| `/skill/`、`/skill/<id>/` | Skill 档案：地址、用法、可交互演示 | `src/skills.ts`、`public/skills/` |
| `/tips/` | 小技巧：可展开抽屉，带对比图的可切换「对比效果」 | `src/tips.ts`、`public/tips/` |
| `/about/` | 关于 | `src/pages/about.astro` |
| `/zhishi/` | 知识网络（不在导航里，从首页「档案室」进入） | `src/zhishi.ts` |

首页「档案室」里各栏目的数量从上面的数据文件自动统计。

## 本地运行

需要 Node.js 18.20.8+、20.3+ 或 22+。

```bash
npm install
npm run dev       # 开发模式：http://localhost:4321/zaxiang/
npm run build     # 构建静态文件到 dist/
npm run preview   # 预览构建结果
```

## 添加内容

### 教程

在 `src/content/tutorials/` 下新建一个 `.md` 文件，文件名就是网址（`my-post.md` → `/tutorials/my-post/`）：

```markdown
---
title: 教程标题
description: 一句话简介
date: 2026-10-11
tags: [提示词, 入门]
level: 入门        # 可选：入门 / 进阶 / 高级
featured: true     # 可选：是否出现在首页「从这里开始」
draft: false       # 可选：true 时不发布
---

正文用 Markdown 书写，`##` 二级标题会自动生成左侧目录。
```

可选字段：`series`（专题名）、`order`（专题内序号，决定编号和上一篇 / 下一篇）、`kicker`（标题上方的小标签）。

> 现有 10 篇教程来自仓库 [vcproo/zaxiang](https://github.com/vcproo/zaxiang) 的「AI 白话课」，原文未改动；每篇里的互动小演示以原始 HTML + `<style>` + `<script>` 的形式保留在 Markdown 中（样式统一加了 `.prose` 前缀）。正文样式和演示用到的变量在 `src/styles/global.css` 的 `.prose` 部分。

### 小技巧

在 `src/tips.ts` 的 `tips` 数组里加一项：`title`、`summary`、`points`（几段说明），可选 `prompt`（可直接复制的提示词）和 `compare`（前后对比图，图片放 `public/tips/<名字>/`）。

### Skill

在 `src/skills.ts` 的 `skills` 数组里加一项：`id`（网址）、`name`、`category`、`tagline`、`repo`、`install`、`intro`、`usage`（用法步骤）、`thumb`（列表缩略图）、`demo`（演示 HTML 的路径与说明）。缩略图和演示文件放 `public/skills/<id>/`。

### 工具

在 `src/tools.ts` 的 `tools` 数组里加一项：`name`、`url`、`domain`、`category`、`description`。

### 个人信息

- 昵称、简介、社交链接：`src/site.ts`（把 `url: '#'` 换成你的主页地址）
- 首页文案：`src/pages/index.astro`；关于页：`src/pages/about.astro`
- 颜色、字体、间距：`src/styles/global.css` 顶部的 CSS 变量

## 动效档案

`/motion/` 的内容直接渲染在页面里，没有 iframe：

- 脚本：`public/style-motion/styles.js`（画风导览：舞台引擎 + 17 个场景）、`motion.js`（动效词典）
- 样式：`src/styles/style-motion.css`，分别限定在 `.sm-style` / `.sm-motion` 容器内，末尾是适配本站配色的覆盖
- 依赖：`public/style-motion/lib/three.min.js`（3D 样张）、`public/style-motion/fonts/`（按字裁剪的演示字体）
- `src/data/style-fontwarm.html`：样张会用到的字，预先放进页面，让裁剪字体提前下载
- 网址锚点：`#style` 画风导览，`#dict` 动效词典，`#s08` 直接打开第 08 种画风的详情

## 互动细节

- 首页标题打字机效果；首页背景藏着线索词，鼠标像手电筒一样照到哪里、哪里亮起（仅鼠标设备）
- 页头右上角是角色的六颗副眼，随阅读进度依次亮起；页头下沿有一条薄荷绿进度线
- 卡片跟随指针出现柔光；内容滚动到视口时浮现
- 打开教程时「立案调查」印章落下；文末「关联线索」用红线串起相关教程
- 隐藏彩蛋：在页面上敲键盘 `spider`，或连点页头的副眼 5 次
- 系统开启「减弱动态效果」时，以上动画自动关闭

## 部署

`npm run build` 生成的 `dist/` 是纯静态文件，可部署到任意静态托管：

- **Vercel / Netlify / Cloudflare Pages**：导入仓库，构建命令 `npm run build`，输出目录 `dist`。
- **GitHub Pages**：部署工作流模板在 `docs/deploy-pages.yml`，**目前还没有启用**。把它复制到 `.github/workflows/deploy.yml` 并提交，再在仓库 Settings → Pages → Source 选 **GitHub Actions**，之后每次推送到 main 自动部署到 https://vcproo.github.io/zaxiang/ 。
- **自有服务器**：把 `dist/` 上传到 Nginx 等网站目录。

`astro.config.mjs` 设置了 `site` 与 `base: "/zaxiang"`；站内链接统一用 `src/url.ts` 的 `u()` 生成，会自动带上 base。改用自有域名（部署在根路径）时，把 `site` 换成你的域名并删除 `base`；用 GitHub Pages 的话，还要在 `public/` 下加一个写着域名的 `CNAME` 文件。

## 目录结构

```
src/
  pages/                  各页面（见上方「页面」表）
  layouts/Base.astro      公共页头页脚、导航、阅读进度、彩蛋
  components/
    Card.astro            教程列表条目
    IpFigure.astro        角色立绘（奶白光圈）
  content/tutorials/      教程 Markdown（放这里即可发布）
  content.config.ts       教程字段定义
  styles/
    global.css            设计变量、公共组件（sd-btn / sd-chip / sd-card）、滚动条、教程正文样式
    style-motion.css      动效档案样式
  data/style-fontwarm.html  动效档案的字体预热文字
  site.ts                 站点信息与社交链接
  tips.ts / tools.ts / skills.ts  小技巧、工具、Skill 数据
  zhishi.ts               知识网络数据（首页线索词、证物签、跑马灯也用它）
  lib.ts / url.ts         读取教程、生成带 base 的链接
public/
  ip/                     角色素材与 IP 设计规范
  skills/ tips/           Skill 演示、小技巧对比图
  style-motion/           动效档案的脚本、three.js、字体
docs/deploy-pages.yml     GitHub Pages 部署工作流模板
```
