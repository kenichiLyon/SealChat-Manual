# SealChat 使用手册

> 自托管的轻量即时通讯与角色协作平台 - Community Edition

这是 [SealChat](https://github.com/kagangtuya-star/sealchat) 的社区版使用手册，基于 VitePress 构建的静态文档网站。

## 在线访问

文档部署后可在以下地址访问（请根据实际部署情况修改）：

- 生产环境：`https://docs.sealchat.example.com`

## 本地开发

### 环境要求

- Node.js 18+
- pnpm

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm docs:dev
```

然后访问 `http://localhost:5173`

### 构建静态文件

```bash
pnpm docs:build
```

构建输出在 `docs` 目录。

### 预览构建结果

```bash
pnpm docs:preview
```

## 文档结构

```
.
├── index.md                    # 首页
├── guide/                      # 用户指南
│   ├── quick-start.md          # 快速入门
│   ├── concepts.md             # 核心概念
│   └── features.md             # 功能指南
├── admin/                      # 管理员指南
│   └── admin-guide.md          # 管理员入门
├── reference/                  # 参考文档
│   ├── configuration.md        # 配置参考
│   ├── api.md                  # API 参考
│   └── faq.md                  # 常见问题
├── public/                     # 静态资源
│   ├── logo.svg                # Logo
│   └── hero-image.svg          # 首页图片
└── .vitepress/
    └── config.mts              # VitePress 配置
```

## 部署

### 静态托管

构建后的文件可以部署到任何静态托管服务：

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- 自建 Nginx

### GitHub Pages（`gh-pages` 分支）

1. 在仓库设置中启用 GitHub Pages
2. 设置 Source 为 “Deploy from a branch”
3. 选择 `gh-pages` 分支 + `/ (root)`

工作流由 `.github/workflows/docs.yml` 负责：

- 构建命令：`pnpm docs:build`
- 输出目录：`docs`
- 发布分支：`gh-pages`

### Markdown 格式检查

```bash
pnpm lint:md
pnpm lint:md:fix
```

## 贡献指南

欢迎贡献文档！请：

1. Fork 本仓库
2. 创建功能分支
3. 提交修改
4. 发起 Pull Request

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
