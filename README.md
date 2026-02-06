# SealChat 使用手册

> 自托管的轻量即时通讯与角色协作平台 - Community Edition

这是 [SealChat](https://github.com/kagangtuya-star/sealchat) 的社区版使用手册，
基于 VitePress 构建的静态文档网站。

## 在线访问

文档部署后可在以下地址访问（请根据实际部署情况修改）：

- 预览：`https://kenichilyon.github.io/SealChat-Manual/`

## 本地开发

### 环境要求

- Node.js 18+
- pnpm

### 安装依赖

```bash
pnpm install
```

### 测试环境（启动测试服务器预览）

```bash
pnpm docs:dev
```

然后访问 `http://localhost:5173`

### 生产环境（构建静态文件）

```
pnpm docs:build
```

## 部署

你可以通过 fork 本仓库并按以下方式自动部署到 GitHub Pages。

### GitHub Pages（`gh-pages` 分支或 GitHub Actions）

1. 在仓库 `setting` 页面中，左栏找到 `Pages`，启用 GitHub Pages
2. 在 `Pages` 页面中，选择以下任一方式：
   - **Source: GitHub Actions**
   - **Source: Deploy from a branch** → `gh-pages` 分支 + `/ (root)`
3. 在 `Actions` 页面中，等待工作流完成，即可访问部署结果

工作流由 `.github/workflows/docs.yml` 负责：

- 构建命令：`pnpm docs:build`
- 输出目录：`.vitepress/dist`
- 发布分支：`gh-pages`

### Markdown 格式检查

```bash
pnpm lint:md
pnpm lint:md:fix
```

## 贡献指南

欢迎为 SealChat-Maunal 进行贡献！请：

1. Fork 本仓库
2. 创建新分支修改而避免使用 `main` 分支修改以影响 commit 以及造成可能的代码冲突
3. 在您的新分支上提交修改
4. 向本仓库发起 Pull Request

### 文档规范

- 使用简体中文
- 遵循 Markdown 格式规范
- 代码块需指定语言
- 图片放在 `public/` 目录

## 许可证

MIT License

## 相关链接

- [SealChat 主仓库](https://github.com/kagangtuya-star/sealchat)
- [问题反馈](https://github.com/kagangtuya-star/sealchat/issues)
