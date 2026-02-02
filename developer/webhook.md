---
title: Webhook 集成
description: 与外部系统进行消息同步与自动化
---

# Webhook 集成

Webhook 集成用于让外部系统与频道双向同步消息。

## 创建集成（频道级）

1. 进入频道设置 → Webhook 集成
2. 设置集成名称与来源标识
3. 勾选能力范围（读取变更、创建/更新/删除消息、身份同步）
4. 保存后获取一次性 Token

## 管理集成

- 支持轮换 Token（旧 Token 失效）
- 支持撤销集成与停用
- 可查看最近使用时间与能力范围

## 调用方式

外部系统使用 `Authorization: Bearer <token>` 调用 `/api/v1/webhook/channels/:channelId` 相关接口。

**典型能力**：
- 拉取频道消息变更
- 创建、更新、删除消息
- 同步外部身份信息
