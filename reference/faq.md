---
title: 常见问题
description: 部署与使用中的高频问题解答
---

# 常见问题

本文档收集了 SealChat 使用过程中的常见问题和解决方案。

---

## 部署问题

### Q: 无法访问 localhost:3212？

**可能原因及解决方案**：

1. **服务未启动**

   ```bash
   # Docker 检查
   docker ps | grep sealchat

   # 如果没有运行，启动容器
   docker start sealchat
   ```

2. **端口被占用**

   ```bash
   # 检查端口占用
   netstat -an | grep 3212

   # 或使用其他端口
   docker run -p 8080:3212 ...
   ```

3. **防火墙限制**

   ```bash
   # Linux 开放端口
   sudo ufw allow 3212

   # Windows 检查防火墙设置
   ```

4. **Docker 网络问题**

   ```bash
   # 检查容器日志
   docker logs sealchat
   ```

---

### Q: Docker 容器启动失败？

**检查步骤**：

1. 查看详细日志：

   ```bash
   docker logs sealchat
   ```

2. 检查挂载目录权限：

   ```bash
   ls -la ./data
   chmod 755 ./data
   ```

3. 检查磁盘空间：

   ```bash
   df -h
   ```

4. 尝试重新拉取镜像：

   ```bash
   docker pull ghcr.io/kagangtuya-star/sealchat:latest
   docker rm sealchat
   docker run ...
   ```

---

### Q: 如何修改默认端口？

#### 方式一：配置文件

编辑 `config.yaml`：

```yaml
serveAt: ":8080"
```

#### 方式二：Docker 端口映射

```bash
docker run -p 8080:3212 ...
```

---

### Q: 如何配置 HTTPS？

SealChat 本身不直接支持 HTTPS，推荐使用反向代理：

**Nginx 配置示例**：

```nginx
server {
    listen 443 ssl;
    server_name chat.example.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:3212;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Caddy 配置示例**：

```caddy
chat.example.com {
    reverse_proxy localhost:3212
}
```

::: warning 重要
配置 HTTPS 后，需要更新 `config.yaml` 中的 `domain` 为 HTTPS 地址：

```yaml
domain: "https://chat.example.com"
```

:::

---

## 账号问题

### Q: 忘记管理员密码？

**解决方案**：

1. **直接修改数据库**（需要 SQLite 工具）：

   ```bash
   # 停止服务
   docker stop sealchat

   # 查看用户
   sqlite3 ./data/chat.db "SELECT id, username FROM users;"

   # 重置密码（需要生成 bcrypt 哈希）
   # 建议使用在线工具生成 bcrypt 哈希
   sqlite3 ./data/chat.db "UPDATE users SET password='hash' WHERE username='admin';"

   # 重启服务
   docker start sealchat
   ```

2. **创建新管理员**：
   - 如果可以访问数据库，可以直接将某用户设为管理员：

   ```sql
   UPDATE users SET role='admin' WHERE username='另一个用户';
   ```

---

### Q: 如何注销账号？

目前 SealChat 不支持用户自助注销。如需注销：

1. 联系系统管理员
2. 管理员在后台删除账号

---

### Q: 注册时验证码总是错误？

**可能原因**：

1. **验证码过期**：刷新页面获取新验证码
2. **大小写问题**：验证码不区分大小写
3. **浏览器缓存**：清除浏览器缓存后重试
4. **验证码配置问题**：检查 `config.yaml` 中的验证码配置

---

## 功能问题

### Q: 消息发送失败？

**检查步骤**：

1. **网络连接**：检查浏览器开发者工具的 Network 标签
2. **WebSocket 连接**：查看是否有 WebSocket 错误
3. **权限问题**：确认你有该频道的发言权限
4. **文件大小**：如包含附件，检查是否超过限制

---

### Q: 图片无法显示？

**可能原因**：

1. **域名配置错误**：

   ```yaml
   # 确保 domain 配置正确
   domain: "http://localhost:3212"
   ```

2. **存储路径问题**：检查附件目录权限

3. **S3 配置问题**：如使用 S3，检查凭证和桶配置

4. **图片格式问题**：确认图片格式受支持

---

### Q: 骰子命令不生效？

**检查步骤**：

1. **命令格式**：确保使用正确格式 `.r d20`
2. **内置 Bot**：检查是否启用了内置骰子 Bot：

   ```yaml
   builtInSealBotEnable: true
   ```

3. **频道权限**：某些频道可能禁用了骰子功能

---

### Q: 消息搜索找不到结果？

**可能原因**：

1. **全文搜索需要重建索引**：

   ```sql
   -- SQLite 重建 FTS 索引
   INSERT INTO message_search_fts(message_search_fts) VALUES('rebuild');
   ```

2. **搜索语法问题**：
   - 基础搜索：直接输入关键词
   - 高级搜索：`from:用户名 关键词`

3. **时间范围**：确认消息在搜索的时间范围内

---

### Q: 导出功能卡住不动？

**解决方案**：

1. **检查导出队列**：大量消息导出需要时间
2. **检查磁盘空间**：确保有足够空间存储导出文件
3. **重启导出服务**：重启 SealChat 后重试
4. **减少导出范围**：尝试导出更小的时间范围

---

## 性能问题

### Q: 页面加载很慢？

**优化建议**：

1. **启用压缩**：通过反向代理启用 gzip
2. **增加缓存**：

   ```yaml
   sqlite:
     cacheSizeKB: 1024000  # 增加到 1GB
   ```

3. **检查网络**：确认服务器带宽充足
4. **清理数据**：清理不需要的历史数据

---

### Q: 消息发送延迟高？

**可能原因**：

1. **WebSocket 连接不稳定**：检查网络质量
2. **服务器负载高**：查看 `/status` 页面的指标
3. **数据库性能**：优化 SQLite 配置

---

### Q: 数据库文件越来越大？

**解决方案**：

1. **运行 VACUUM**：

   ```bash
   sqlite3 ./data/chat.db "VACUUM;"
   ```

2. **清理过期数据**：
   - 清理已删除消息
   - 清理过期的导出文件
   - 清理不再需要的附件

3. **定期维护**：设置定时任务定期优化

---

## 数据问题

### Q: 如何备份数据？

**SQLite 备份**：

```bash
# 方式一：直接复制（需停止服务）
cp ./data/chat.db ./backup/chat_$(date +%Y%m%d).db

# 方式二：SQLite 命令（无需停止服务）
sqlite3 ./data/chat.db ".backup './backup/chat_backup.db'"
```

**完整备份**：

```bash
# 备份所有数据
tar -czvf sealchat_backup_$(date +%Y%m%d).tar.gz \
    ./data \
    ./sealchat-data \
    ./static \
    ./config.yaml
```

---

### Q: 如何恢复备份？

```bash
# 停止服务
docker stop sealchat

# 恢复数据库
cp ./backup/chat_backup.db ./data/chat.db

# 恢复其他数据
tar -xzvf sealchat_backup.tar.gz

# 启动服务
docker start sealchat
```

---

### Q: 如何迁移到新服务器？

**迁移步骤**：

1. **备份旧服务器数据**：

   ```bash
   tar -czvf sealchat_migration.tar.gz \
       ./data ./sealchat-data ./static ./config.yaml
   ```

2. **传输到新服务器**：

   ```bash
   scp sealchat_migration.tar.gz user@newserver:/path/
   ```

3. **在新服务器解压**：

   ```bash
   tar -xzvf sealchat_migration.tar.gz
   ```

4. **更新配置**：
   - 修改 `domain` 为新地址
   - 检查其他路径配置

5. **启动服务**：

   ```bash
   docker run -d --name sealchat ...
   ```

---

## 其他问题

### Q: 如何查看系统版本？

1. 访问 `/status/health` 接口
2. 或查看启动日志中的版本信息

---

### Q: 如何报告 Bug？

1. 访问 [GitHub Issues](https://github.com/kagangtuya-star/sealchat/issues)
2. 检查是否已有相同问题
3. 创建新 Issue，包含：
   - SealChat 版本
   - 操作系统
   - 问题描述
   - 复现步骤
   - 相关日志

---

### Q: 如何贡献代码？

1. Fork 项目仓库
2. 创建功能分支
3. 提交代码
4. 发起 Pull Request

详见项目 README 中的贡献指南。

---

### Q: 有官方交流群吗？

请访问 [GitHub 仓库](https://github.com/kagangtuya-star/sealchat) 查看最新的社区信息。

---

## 快速诊断命令

```bash
# 检查服务状态
docker ps | grep sealchat

# 查看最近日志
docker logs --tail 100 sealchat

# 检查端口监听
netstat -tlnp | grep 3212

# 检查磁盘空间
df -h

# 检查数据库大小
du -sh ./data/chat.db

# 测试 API 可用性
curl http://localhost:3212/status/health
```
