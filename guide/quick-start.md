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

### 方式一：Docker 部署（推荐）

Docker 是最简单的部署方式，适合大多数用户。

**1. 安装 Docker**

如果尚未安装 Docker，请访问 [Docker 官网](https://www.docker.com/) 下载安装。

**2. 拉取并运行**

```bash
# 拉取最新镜像
docker pull ghcr.io/kagangtuya-star/sealchat:latest

# 创建并运行容器
docker run -d \
  --name sealchat \
  -p 3212:3212 \
  -v sealchat-data:/app/data \
  -v sealchat-config:/app/config \
  ghcr.io/kagangtuya-star/sealchat:latest
```

**3. 验证运行**

```bash
# 检查容器状态
docker ps | grep sealchat

# 查看日志
docker logs sealchat
```

**4. 访问服务**

打开浏览器，访问 `http://localhost:3212`

### 方式二：Docker Compose 部署

适合需要自定义配置的用户。

**1. 创建配置文件**

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  sealchat:
    image: ghcr.io/kagangtuya-star/sealchat:latest
    container_name: sealchat
    ports:
      - "3212:3212"
    volumes:
      - ./data:/app/data
      - ./config:/app/config
      - ./static:/app/static
    environment:
      - TZ=Asia/Shanghai
    restart: unless-stopped
```

**2. 启动服务**

```bash
docker compose up -d
```

### 方式三：二进制部署

适合不使用 Docker 的环境。

**1. 下载可执行文件**

从 [Release 页面](https://github.com/kagangtuya-star/sealchat/releases) 下载对应系统的文件：

- Windows: `sealchat_windows_amd64.exe`
- Linux: `sealchat_linux_amd64`
- macOS: `sealchat_darwin_amd64`

**2. 赋予执行权限（Linux/macOS）**

```bash
chmod +x sealchat_linux_amd64
```

**3. 运行程序**

```bash
# Linux/macOS
./sealchat_linux_amd64

# Windows
sealchat_windows_amd64.exe
```

**4. 首次启动**

程序会自动：
- 在当前目录创建 `data/` 文件夹存放数据库
- 生成 `config.yaml` 配置文件
- 启动 HTTP 服务监听 3212 端口

### 方式四：源码编译

适合开发者或需要自定义的场景。

**1. 环境准备**

- Go 1.24+
- Node.js 18+
- npm 或 pnpm

**2. 克隆仓库**

```bash
git clone https://github.com/kagangtuya-star/sealchat.git
cd sealchat
```

**3. 编译前端**

```bash
cd ui
npm install
npm run build
cd ..
```

**4. 编译后端**

```bash
go build -o sealchat_server ./
```

**5. 运行**

```bash
./sealchat_server
```

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
