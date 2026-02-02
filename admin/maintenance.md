---
title: 监控与维护
description: 系统状态监控、日志查看与常见故障处理
---

# 监控与维护

## 系统状态

### 系统状态页面

访问 `/status` 查看：

| 指标 | 说明 |
|------|------|
| 在线用户数 | 当前连接的用户数量 |
| WebSocket 连接数 | 当前活跃的 WebSocket 连接 |
| 消息速率 | 每分钟消息发送量 |
| 数据库大小 | SQLite 数据库文件大小 |

### 服务状态看板

管理后台的状态看板提供实时监控：

- 并发连接、在线用户、消息吞吐
- 世界/频道/私聊数量
- 附件数量与占用空间
- 支持近 1 小时 / 24 小时 / 7 天历史曲线

### 健康检查

```bash
curl http://localhost:3212/status/health
```

返回：
```json
{
  "status": "ok",
  "uptime": "24h30m",
  "version": "1.0.0"
}
```

### 日志查看

**Docker 部署**：
```bash
docker logs sealchat
docker logs -f sealchat  # 实时查看
```

**二进制部署**：
日志输出到标准输出，可以重定向到文件：
```bash
./sealchat_server > sealchat.log 2>&1
```

## 数据库维护

**备份 SQLite 数据库**：
```bash
# 停止服务后复制
cp ./data/chat.db ./backup/chat_$(date +%Y%m%d).db

# 或使用 SQLite 命令（无需停止服务）
sqlite3 ./data/chat.db ".backup './backup/chat_backup.db'"
```

**优化数据库**：
```bash
sqlite3 ./data/chat.db "VACUUM;"
sqlite3 ./data/chat.db "ANALYZE;"
```

---

## 常见管理任务

### 重置用户密码

1. 进入管理后台 → 用户管理
2. 找到用户
3. 点击"重置密码"
4. 输入新密码
5. 通知用户新密码

### 处理违规内容

1. 在消息上右键 → 删除
2. 或进入管理后台批量处理
3. 记录处理原因

### 处理存储空间不足

1. 检查大文件：
   ```bash
   du -sh ./sealchat-data/*
   du -sh ./static/*
   ```
2. 清理过期的导出文件
3. 考虑迁移到 S3

### 紧急情况处理

**服务无响应**：
```bash
# Docker
docker restart sealchat

# 二进制
# 终止进程后重启
```

**数据库锁定**：
```bash
# 检查锁定
sqlite3 ./data/chat.db ".databases"

# 如有必要，重启服务释放锁
```
