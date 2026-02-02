---
title: SealDice 对接
description: 跑团机器人与角色卡数据联动
---

# SealDice 对接

在跑团场景下可对接 SealDice，实现角色卡数据联动。

## 功能特性

- **角色卡同步**：通过 WebSocket 协议请求角色卡列表与写回
- **数据联动**：角色卡修改可同步至 SealDice（需 SealDice 侧支持对应协议）
- **一致性维护**：适合多人角色管理与数据一致性维护

## 配置步骤

1. 在 SealChat 中创建一个 Bot 账号
2. 在 SealDice 中配置该 Bot 的 Token 和 API 地址
3. 启用 SealDice 的 SealChat 适配器
4. 在 SealChat 频道中拉入该 Bot

## 使用场景

- 自动处理骰子指令
- 管理跑团流程（先攻、血量等）
- 记录跑团日志
