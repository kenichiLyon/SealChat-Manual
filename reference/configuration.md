---
title: 配置参考
description: 全量配置项与示例说明
---

# 配置参考

本文档详细说明 SealChat 的所有配置选项。

---

## 配置文件

SealChat 使用 `config.yaml` 作为主配置文件，首次启动时自动生成。

**配置文件位置**：

- 二进制部署：`./config.yaml`
- Docker 部署：`/app/config/config.yaml`

---

## 基础配置

### 服务配置

```yaml
# 监听地址和端口
serveAt: ":3212"

# 外部访问域名（用于生成图片链接等）
domain: "http://localhost:3212"

# 数据库路径
dbUrl: "./data/chat.db"

# 是否启用内置骰子 Bot
builtInSealBotEnable: true
```

| 配置项 | 类型 | 默认值 | 说明 |
| -------- | ------ | -------- | ------ |
| `serveAt` | string | `:3212` | HTTP 服务监听地址 |
| `domain` | string | `""` | 外部访问域名 |
| `dbUrl` | string | `./data/chat.db` | 数据库文件路径 |
| `builtInSealBotEnable` | bool | `true` | 是否启用内置骰子 Bot |

### 域名配置示例

```yaml
# 本地开发
domain: "http://localhost:3212"

# 生产环境（无 HTTPS）
domain: "http://chat.example.com"

# 生产环境（HTTPS）
domain: "https://chat.example.com"
```

---

## 验证码配置

```yaml
captcha:
  # 注册时的验证码模式
  signup_mode: "local"

  # 登录时的验证码模式
  signin_mode: "off"

  # Cloudflare Turnstile 配置（如使用）
  turnstile:
    site_key: ""
    secret_key: ""
```

### 验证码模式

| 模式 | 说明 |
| ------ | ------ |
| `off` | 关闭验证码 |
| `local` | 使用本地验证码（图形验证码） |
| `turnstile` | 使用 Cloudflare Turnstile |

### Turnstile 配置

1. 在 [Cloudflare Dashboard](https://dash.cloudflare.com/) 创建 Turnstile
2. 获取 Site Key 和 Secret Key
3. 填入配置文件

```yaml
captcha:
  signup_mode: "turnstile"
  signin_mode: "turnstile"
  turnstile:
    site_key: "0x4AAAAAAxxxxxxx"
    secret_key: "0x4AAAAAAxxxxxxx"
```

---

## 图片处理

```yaml
# 是否自动压缩上传的图片
imageCompress: true

# 压缩质量（1-100）
imageCompressQuality: 85

# 单个图片大小限制（KB）
imageSizeLimit: 8192

# 用户图库配额（MB）
galleryQuotaMB: 100
```

| 配置项 | 类型 | 默认值 | 说明 |
| -------- | ------ | -------- | ------ |
| `imageCompress` | bool | `true` | 自动压缩上传图片 |
| `imageCompressQuality` | int | `85` | 压缩质量 1-100 |
| `imageSizeLimit` | int | `8192` | 单图片大小限制（KB） |
| `galleryQuotaMB` | int | `100` | 用户图库配额（MB） |

---

## 数据库优化

### SQLite 配置

```yaml
sqlite:
  # 使用 WAL 模式（推荐）
  wal: true

  # 锁等待超时（毫秒）
  busyTimeout: 10000

  # 页缓存大小（KB）
  cacheSizeKB: 512000

  # 同步级别
  synchronous: "NORMAL"

  # 写锁提前获取
  txLockImmediate: true

  # 读连接数（建议 = CPU 核数）
  readConnections: 4

  # 启动时运行优化
  optimizeOnInit: true
```

### 配置说明

| 配置项 | 默认值 | 说明 |
| -------- | -------- | ------ |
| `wal` | `true` | WAL 模式提高并发性能 |
| `busyTimeout` | `10000` | 锁等待超时（毫秒） |
| `cacheSizeKB` | `512000` | 缓存大小（512MB） |
| `synchronous` | `NORMAL` | 同步级别：OFF/NORMAL/FULL |
| `txLockImmediate` | `true` | 减少死锁 |
| `readConnections` | `4` | 读连接池大小 |
| `optimizeOnInit` | `true` | 启动时优化统计 |

### PostgreSQL 配置

```yaml
# 使用 PostgreSQL
dbUrl: "postgres://user:password@localhost:5432/sealchat?sslmode=disable"
```

---

## 音频配置

```yaml
audio:
  # 音频存储目录
  storageDir: "./static/audio"

  # 临时处理目录
  tempDir: "./data/audio-temp"

  # 最大上传大小（MB）
  maxUploadSizeMB: 80

  # 是否启用转码
  enableTranscode: true

  # 目标比特率（kbps）
  defaultBitrateKbps: 96
```

::: warning 依赖
音频转码需要安装 `ffmpeg` 和 `ffprobe`。
:::

### 安装 FFmpeg

**Ubuntu/Debian**：

```bash
apt install ffmpeg
```

**macOS**：

```bash
brew install ffmpeg
```

**Windows**：
下载 FFmpeg 并添加到 PATH。

---

## 消息导出

```yaml
export:
  # 导出文件存储目录
  storageDir: "./data/exports"

  # 下载带宽限制（KB/s，0 = 无限制）
  downloadBandwidthKBps: 0

  # HTML 导出默认每页消息数
  htmlPageSizeDefault: 100

  # 最大并发导出任务数
  htmlMaxConcurrency: 2
```

---

## 存储配置

### 本地存储

```yaml
storage:
  mode: "local"

  # 单个文件大小限制（MB）
  maxSizeMB: 64

  local:
    # 上传目录
    uploadDir: "./sealchat-data/upload"

    # CDN 地址（如通过 Nginx 暴露）
    baseUrl: ""
```

### S3 存储

```yaml
storage:
  mode: "s3"

  # 签名 URL 过期时间（秒）
  presignTTL: 900

  # 单个文件大小限制（MB）
  maxSizeMB: 64

  s3:
    enabled: true
    endpoint: "https://s3.amazonaws.com"
    bucket: "sealchat-files"
    region: "us-east-1"
    # 认证通过环境变量
```

### S3 环境变量

```bash
export SEALCHAT_S3_ACCESS_KEY="your_access_key"
export SEALCHAT_S3_SECRET_KEY="your_secret_key"
```

### 兼容的 S3 服务

| 服务 | Endpoint 示例 |
| ------ | --------------- |
| AWS S3 | `https://s3.amazonaws.com` |
| MinIO | `http://localhost:9000` |
| 腾讯云 COS | `https://cos.ap-guangzhou.myqcloud.com` |
| 阿里云 OSS | `https://oss-cn-hangzhou.aliyuncs.com` |

---

## 邮件通知

```yaml
emailNotification:
  # 是否启用邮件通知
  enabled: false

  # 检查未读消息间隔（秒）
  checkIntervalSec: 60

  # 每用户每小时最多发送邮件数
  maxPerHour: 5

  # 最小延迟（秒）
  minDelaySec: 300

  # 最大延迟（秒）
  maxDelaySec: 3600

  smtp:
    host: "smtp.example.com"
    port: 587
    useTLS: true
    username: ""
    password: ""
    from: "noreply@example.com"
```

### SMTP 配置示例

**Gmail**：

```yaml
smtp:
  host: "smtp.gmail.com"
  port: 587
  useTLS: true
  username: "your-email@gmail.com"
  password: "app-password"  # 需要使用应用专用密码
  from: "your-email@gmail.com"
```

**腾讯企业邮箱**：

```yaml
smtp:
  host: "smtp.exmail.qq.com"
  port: 465
  useTLS: true
  username: "your-email@company.com"
  password: "your-password"
  from: "your-email@company.com"
```

---

## 完整配置示例

```yaml
# SealChat 配置文件

# === 基础配置 ===
serveAt: ":3212"
domain: "https://chat.example.com"
dbUrl: "./data/chat.db"
builtInSealBotEnable: true

# === 验证码 ===
captcha:
  signup_mode: "local"
  signin_mode: "off"

# === 图片处理 ===
imageCompress: true
imageCompressQuality: 85
imageSizeLimit: 8192
galleryQuotaMB: 100

# === SQLite 优化 ===
sqlite:
  wal: true
  busyTimeout: 10000
  cacheSizeKB: 512000
  synchronous: "NORMAL"
  txLockImmediate: true
  readConnections: 4
  optimizeOnInit: true

# === 音频配置 ===
audio:
  storageDir: "./static/audio"
  tempDir: "./data/audio-temp"
  maxUploadSizeMB: 80
  enableTranscode: true
  defaultBitrateKbps: 96

# === 导出配置 ===
export:
  storageDir: "./data/exports"
  downloadBandwidthKBps: 0
  htmlPageSizeDefault: 100
  htmlMaxConcurrency: 2

# === 存储配置 ===
storage:
  mode: "local"
  maxSizeMB: 64
  presignTTL: 900
  local:
    uploadDir: "./sealchat-data/upload"
    baseUrl: ""
  s3:
    enabled: false
    endpoint: ""
    bucket: ""
    region: ""

# === 邮件通知 ===
emailNotification:
  enabled: false
  checkIntervalSec: 60
  maxPerHour: 5
  minDelaySec: 300
  maxDelaySec: 3600
  smtp:
    host: ""
    port: 587
    useTLS: true
    username: ""
    password: ""
    from: ""
```

---

## 环境变量

部分敏感配置可以通过环境变量设置：

| 环境变量 | 说明 |
| ---------- | ------ |
| `SEALCHAT_S3_ACCESS_KEY` | S3 Access Key |
| `SEALCHAT_S3_SECRET_KEY` | S3 Secret Key |
| `SEALCHAT_DB_URL` | 数据库连接字符串 |
| `SEALCHAT_PORT` | 监听端口 |

### Docker Compose 示例

```yaml
version: '3.8'

services:
  sealchat:
    image: ghcr.io/kagangtuya-star/sealchat:latest
    ports:
      - "3212:3212"
    volumes:
      - ./data:/app/data
      - ./config:/app/config
    environment:
      - TZ=Asia/Shanghai
      - SEALCHAT_S3_ACCESS_KEY=your_key
      - SEALCHAT_S3_SECRET_KEY=your_secret
    restart: unless-stopped
```

---

## 配置热重载

目前 SealChat 不支持配置热重载，修改配置后需要重启服务：

```bash
# Docker
docker restart sealchat

# Docker Compose
docker compose restart

# 二进制
# 终止进程后重新运行
```
