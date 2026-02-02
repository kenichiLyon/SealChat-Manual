---
title: API 参考
description: 主要接口与认证方式说明
---

# API 参考

本文档列出 SealChat 的主要 API 接口，供开发者和 Bot 集成使用。

---

## API 概述

### 基础信息

| 项目 | 值 |
|------|-----|
| 基础 URL | `http://localhost:3212/api` |
| 协议 | HTTP/HTTPS |
| 认证方式 | Cookie / Bearer Token |
| 数据格式 | JSON |

### 认证

**用户认证**：
- 通过登录接口获取 Cookie
- 后续请求自动携带 Cookie

**Bot 认证**：
```http
Authorization: Bearer sc_bot_xxxxxxxx
```

---

## 用户接口

### 注册

```http
POST /api/user/register
Content-Type: application/json

{
  "username": "string",
  "password": "string",
  "captcha": "string"
}
```

**响应**：
```json
{
  "code": 0,
  "data": {
    "id": "user-id",
    "username": "string"
  }
}
```

### 登录

```http
POST /api/user/login
Content-Type: application/json

{
  "username": "string",
  "password": "string",
  "captcha": "string"
}
```

**响应**：
```json
{
  "code": 0,
  "data": {
    "id": "user-id",
    "username": "string",
    "role": "user|admin"
  }
}
```

### 登出

```http
POST /api/user/logout
```

### 获取当前用户信息

```http
GET /api/user/info
```

**响应**：
```json
{
  "code": 0,
  "data": {
    "id": "user-id",
    "username": "string",
    "nickname": "string",
    "avatar": "string",
    "role": "user|admin"
  }
}
```

### 修改密码

```http
POST /api/user/password
Content-Type: application/json

{
  "oldPassword": "string",
  "newPassword": "string"
}
```

### 上传头像

```http
POST /api/user/avatar
Content-Type: multipart/form-data

file: <image file>
```

---

## 世界接口

### 获取世界列表

```http
GET /api/world
```

**响应**：
```json
{
  "code": 0,
  "data": [
    {
      "id": "world-id",
      "name": "世界名称",
      "description": "世界描述",
      "isPublic": false,
      "memberCount": 10,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 创建世界

```http
POST /api/world
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "isPublic": false
}
```

### 获取世界详情

```http
GET /api/world/{id}
```

### 更新世界

```http
PUT /api/world/{id}
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "isPublic": false
}
```

### 删除世界

```http
DELETE /api/world/{id}
```

---

## 频道接口

### 获取频道列表

```http
GET /api/world/{worldId}/channel
```

**响应**：
```json
{
  "code": 0,
  "data": [
    {
      "id": "channel-id",
      "name": "频道名称",
      "description": "频道描述",
      "parentId": null,
      "order": 0
    }
  ]
}
```

### 创建频道

```http
POST /api/world/{worldId}/channel
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "parentId": "parent-channel-id"
}
```

### 更新频道

```http
PUT /api/channel/{id}
Content-Type: application/json

{
  "name": "string",
  "description": "string"
}
```

### 删除频道

```http
DELETE /api/channel/{id}
```

---

## 消息接口

### 获取消息列表

```http
GET /api/channel/{channelId}/messages?before={messageId}&limit=50
```

**参数**：
| 参数 | 类型 | 说明 |
|------|------|------|
| `before` | string | 获取此消息之前的消息 |
| `after` | string | 获取此消息之后的消息 |
| `limit` | int | 返回数量限制（默认 50） |

**响应**：
```json
{
  "code": 0,
  "data": [
    {
      "id": "message-id",
      "content": "消息内容",
      "userId": "user-id",
      "channelId": "channel-id",
      "identityId": "identity-id",
      "isOOC": false,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 发送消息

```http
POST /api/channel/{channelId}/messages
Content-Type: application/json

{
  "content": "string",
  "identityId": "identity-id",
  "isOOC": false
}
```

### 编辑消息

```http
PUT /api/message/{id}
Content-Type: application/json

{
  "content": "string"
}
```

### 删除消息

```http
DELETE /api/message/{id}
```

### 搜索消息

```http
GET /api/message/search?q={query}&worldId={worldId}
```

**参数**：
| 参数 | 类型 | 说明 |
|------|------|------|
| `q` | string | 搜索关键词 |
| `worldId` | string | 限制在特定世界 |
| `channelId` | string | 限制在特定频道 |
| `from` | string | 指定发送者 |
| `after` | string | 指定开始日期 |
| `before` | string | 指定结束日期 |

---

## 附件接口

### 上传附件

```http
POST /api/attachment/upload
Content-Type: multipart/form-data

file: <file>
channelId: "channel-id"
```

**响应**：
```json
{
  "code": 0,
  "data": {
    "id": "attachment-id",
    "filename": "file.jpg",
    "size": 12345,
    "mimeType": "image/jpeg",
    "url": "/api/attachment/xxx"
  }
}
```

### 获取附件

```http
GET /api/attachment/{id}
```

### 获取缩略图

```http
GET /api/attachment/{id}/thumb
```

---

## 图库接口

### 获取图库列表

```http
GET /api/gallery?page=1&limit=20
```

### 上传到图库

```http
POST /api/gallery
Content-Type: multipart/form-data

file: <image file>
tags: "tag1,tag2"
description: "描述"
```

---

## WebSocket 接口

### 连接

```
ws://localhost:3212/api/chat
```

**认证**：
- Cookie 自动携带
- 或通过 URL 参数：`?token=sc_bot_xxx`

### 消息格式

**发送消息**：
```json
{
  "api": "message.send",
  "data": {
    "channelId": "channel-id",
    "content": "消息内容",
    "identityId": "identity-id"
  }
}
```

**接收消息**：
```json
{
  "api": "message.new",
  "data": {
    "id": "message-id",
    "content": "消息内容",
    "userId": "user-id",
    "channelId": "channel-id",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### WebSocket 事件

| 事件 | 说明 |
|------|------|
| `message.new` | 新消息 |
| `message.update` | 消息编辑 |
| `message.delete` | 消息删除 |
| `typing.start` | 开始打字 |
| `typing.stop` | 停止打字 |
| `presence.update` | 在线状态变化 |

---

## 管理接口

::: warning 权限要求
以下接口需要管理员权限。
:::

### 获取用户列表

```http
GET /api/admin/user?page=1&limit=20
```

### 禁用用户

```http
POST /api/admin/user/{id}/ban
```

### 获取 Bot 列表

```http
GET /api/admin/bot
```

### 创建 Bot

```http
POST /api/admin/bot
Content-Type: application/json

{
  "name": "Bot名称",
  "description": "Bot描述"
}
```

**响应**：
```json
{
  "code": 0,
  "data": {
    "id": "bot-id",
    "token": "sc_bot_xxxxxxxx"
  }
}
```

---

## 状态接口

### 健康检查

```http
GET /status/health
```

**响应**：
```json
{
  "status": "ok",
  "uptime": "24h30m",
  "version": "1.0.0"
}
```

### 获取指标

```http
GET /status
```

返回实时监控页面。

---

## 错误码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未认证 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

**错误响应格式**：
```json
{
  "code": 1001,
  "message": "错误描述"
}
```

---

## 速率限制

目前 SealChat 未内置速率限制，建议通过反向代理（如 Nginx）实现：

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api/ {
    limit_req zone=api burst=20 nodelay;
    proxy_pass http://127.0.0.1:3212;
}
```
