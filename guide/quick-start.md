---
title: 快速入门
description: 10 分钟完成部署与基础使用
---

# 快速入门指南

本指南帮助你在 10 分钟内完成 SealChat 的部署和基础使用。

---

## 系统要求

### 服务端要求

| 项目 | 最低要求 | 推荐配置 |
|------|----------|----------|
| CPU | 1 核 | 2 核以上 |
| 内存 | 512 MB | 2 GB 以上 |
| 磁盘 | 1 GB | 10 GB 以上（视附件存储需求） |
| 操作系统 | Windows 10 / Linux / macOS | Linux（生产环境） |

### 客户端要求

- 现代浏览器：Chrome 80+、Firefox 75+、Safari 13+、Edge 80+
- 启用 JavaScript 和 WebSocket

---

## 部署方式

### Docker Compose 部署（推荐）

使用 Docker 部署是最简单快捷的方式，无需安装依赖。

**前置条件**：
- 安装 [Docker](https://docs.docker.com/get-docker/) 和 Docker Compose
- 确保 3212 端口可用

**快速开始**：

```bash
# 拉取最新镜像
docker pull ghcr.io/kagangtuya-star/sealchat:latest

# 创建配置文件（推荐，便于持久化）
cp config.docker.yaml.example config.yaml

# 启动服务
docker compose up -d

# 查看日志
docker compose logs -f sealchat
```

访问 `http://localhost:3212/`，第一个注册的账号会成为管理员。

**数据持久化目录**：

| 容器路径 | 宿主机路径 | 说明 |
| --- | --- | --- |
| `/app/data` | `./data` | 数据库、临时文件、导出任务 |
| `/app/sealchat-data` | `./sealchat-data` | 上传的附件和音频文件 |
| `/app/static` | `./static` | 静态资源 |
| `/app/config.yaml` | `./config.yaml` | 配置文件 |

**更新镜像**：

```bash
docker compose pull && docker compose up -d
```

### Docker run 一键启动

如果不使用 Docker Compose，可以直接使用以下命令启动：

```bash
docker run -d --name sealchat --restart unless-stopped \
  -u 0:0 \
  -p 3212:3212 \
  -v $(pwd)/sealchat/data:/app/data \
  -v $(pwd)/sealchat/sealchat-data:/app/sealchat-data \
  -v $(pwd)/sealchat/static:/app/static \
  -v $(pwd)/sealchat/config.yaml:/app/config.yaml \
  -e TZ=Asia/Shanghai \
  ghcr.io/kagangtuya-star/sealchat:latest
```

### PostgreSQL（生产环境推荐）

```bash
# 1. 创建 .env 文件设置数据库密码
echo "POSTGRES_PASSWORD=your_secure_password" > .env

# 2. 修改 config.yaml 中的数据库连接
# dbUrl: postgresql://sealchat:your_secure_password@postgres:5432/sealchat

# 3. 使用生产配置启动
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 二进制部署

**1. 下载可执行文件**

从 [Release 页面](https://github.com/sealdice/sealchat/releases/tag/dev-release) 下载对应系统的发行包。

主程序文件名通常为 `sealchat-server`（也可为 `sealchat_server`）：  
- Windows: `sealchat-server.exe`  
- Linux/macOS: `sealchat-server`

发行包内包含 `bin/<平台目录>/cwebp` 与 `bin/<平台目录>/gif2webp`（以及 `LICENSE`），请保持与主程序同目录。

**2. 运行程序**

- Windows：双击 `sealchat-server.exe`
- Linux/macOS：执行 `chmod +x sealchat-server` 后运行 `./sealchat-server`

首次运行会生成 `config.yaml` 并初始化数据库，启动后访问 `http://localhost:3212/`。

### 源码编译（开发者）

适合开发者或需要自定义的场景。

1. 克隆仓库：`git clone https://github.com/kagangtuya-star/sealchat.git`
2. 编译前端：`cd ui && npm install && npm run build`
3. 编译后端：`go build -o sealchat_server ./`
4. 运行：`./sealchat_server`

---

## 首次访问

### 步骤 1：打开注册页面

1. 在浏览器中访问 `http://localhost:3212`（或你的服务器地址）
2. 点击页面上的 **"注册"** 按钮

### 步骤 2：填写注册信息

| 字段 | 说明 |
|------|------|
| 用户名 | 登录账号，建议使用英文字母和数字 |
| 密码 | 至少 6 位，建议包含字母和数字 |
| 确认密码 | 再次输入密码确认 |
| 验证码 | 如启用验证码，按提示完成验证 |

### 步骤 3：成为管理员

首个注册的账号将自动获得系统管理员权限。

1. 点击头像进入管理后台
2. 参考 [管理员指南](/admin/) 配置系统
3. 可以在 [用户管理](/admin/user-bot) 中管理其他用户

### 步骤 4：登录系统

注册成功后，使用用户名和密码登录。

---

## 创建第一个世界

"世界"是 SealChat 中最大的组织单位，类似于其他平台的"服务器"或"工作区"。

### 步骤 1：进入创建页面

登录后，在首页点击 **"创建世界"** 按钮。

### 步骤 2：填写世界信息

| 字段 | 说明 | 示例 |
|------|------|------|
| 世界名称 | 为你的世界起一个名字 | "跑团小队" |
| 世界描述 | 简单描述世界的用途 | "我们的 TRPG 跑团空间" |
| 公开状态 | 选择公开或私有 | 私有（需要邀请链接） |

### 步骤 3：确认创建

点击 **"创建"** 按钮，系统会自动：

1. 创建世界
2. 创建默认的"大厅"频道
3. 将你设为世界管理员

### 步骤 4：进入世界

创建成功后，点击世界卡片进入。你会看到左侧的频道列表和右侧的聊天区域。

---

## 邀请成员

### 方式一：生成邀请链接

1. 进入世界后，点击世界名称旁的 **设置图标**
2. 选择 **"邀请管理"** 或 **"生成邀请链接"**
3. 复制生成的链接
4. 将链接发送给想邀请的用户

### 方式二：直接添加用户

如果用户已注册：

1. 进入世界设置
2. 选择 **"成员管理"**
3. 搜索并添加用户

### 邀请链接格式

```
http://你的域名:3212/invite/XXXXXXXX
```

用户点击链接后：
1. 如未登录，会提示先登录或注册
2. 登录后自动加入世界

---

## 发送第一条消息

### 步骤 1：选择频道

在左侧频道列表中，点击想要发言的频道（如"大厅"）。

### 步骤 2：输入消息

在页面底部的输入框中：

1. 输入你想发送的内容
2. 支持富文本格式（粗体、斜体、链接等）
3. 可以插入附件、图片、音频

### 步骤 3：发送消息

- 按 `Enter` 键发送
- 或点击发送按钮

### 快捷操作

| 操作 | 快捷键 |
|------|--------|
| 发送消息 | `Enter` |
| 换行 | `Shift + Enter` |
| 粗体 | `Ctrl + B` |
| 斜体 | `Ctrl + I` |
| 撤销 | `Ctrl + Z` |

---

## 下一步

恭喜你完成了 SealChat 的基础设置！接下来可以：

- **了解核心概念**：阅读 [核心概念](./concepts) 了解世界、频道、身份卡等
- **探索更多功能**：阅读 [功能指南](./features) 学习骰子、导出等高级功能
- **配置系统**：阅读 [配置参考](/reference/configuration) 优化你的部署

---

## 常见问题

### Q: 无法访问 localhost:3212？

1. 确认服务已启动：`docker ps` 或查看程序是否运行
2. 检查端口是否被占用：`netstat -an | grep 3212`
3. 检查防火墙设置

### Q: 注册时提示验证码错误？

1. 刷新页面重新获取验证码
2. 检查 `config.yaml` 中的验证码配置

### Q: 如何修改默认端口？

编辑 `config.yaml`：

```yaml
serveAt: :8080  # 修改为你想要的端口
```

重启服务生效。

### Q: 数据存储在哪里？

- **数据库**：`./data/chat.db`（SQLite）
- **附件**：`./sealchat-data/upload/`
- **配置**：`./config.yaml`
