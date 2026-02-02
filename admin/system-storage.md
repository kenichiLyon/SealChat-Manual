---
title: 系统配置与存储
description: 全局配置、存储模式与 S3 迁移
---

# 系统配置与存储

## 系统配置

管理员可在管理后台调整全局配置，常见项包括：

- 注册开关与验证码策略
- 邮箱验证与通知配置
- 登录页背景与主题样式
- 自动备份与保留策略
- 版本更新检查

### 登录页背景

可配置登录页背景图与展示方式，并调整透明度、模糊与亮度，适配不同主题风格。

### 自动备份

开启自动备份后系统会定期保存数据库快照，并保留指定数量的备份文件。

### 邮件通知与验证

邮件通知与邮箱验证共用 SMTP 配置。启用后可为频道设置邮件提醒，并用于注册验证与密码找回。

---

## 存储管理

### 存储模式

SealChat 支持三种存储模式：

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| **local** | 本地文件存储 | 单机部署、小规模 |
| **s3** | S3 兼容存储 | 大规模、需要 CDN |
| **auto** | 自动选择 | 混合场景 |

### 本地存储

默认存储位置：
```
./sealchat-data/upload/    # 附件
./static/audio/            # 音频
./data/exports/            # 导出文件
```

### S3 存储配置

在 `config.yaml` 中配置：

```yaml
storage:
  mode: s3
  s3:
    enabled: true
    endpoint: "https://s3.amazonaws.com"
    bucket: "sealchat-files"
    region: "us-east-1"
```

环境变量：
```bash
SEALCHAT_S3_ACCESS_KEY=your_access_key
SEALCHAT_S3_SECRET_KEY=your_secret_key
```

### S3 迁移

从本地存储迁移到 S3：

1. 配置好 S3 连接
2. 进入管理后台 → 存储迁移
3. 选择迁移范围
4. 开始迁移
5. 等待完成
