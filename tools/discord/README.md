# Discord Plugin

Send messages to Discord channels using webhooks with customizable bot usernames and avatars.

## 🎯 功能特性

- **Webhook 消息发送**: 通过 Discord Webhook 向指定频道发送消息
- **随机 Bot 身份**: 自动生成随机的 Bot 用户名和头像，增加消息的多样性
- **富文本支持**: 支持普通文本消息和 Embed 嵌入式消息
- **安全验证**: 自动验证 Webhook URL 格式，确保安全性
- **错误处理**: 完整的错误处理机制，提供详细的错误信息
- **双输出端口**: 支持成功和错误两个输出端口，便于工作流控制
- **TypeScript 支持**: 完整的类型定义，确保类型安全

## Features

- **Webhook Messaging**: Send messages to Discord channels via webhooks
- **Random Bot Identity**: Automatically generates random bot usernames and avatars
- **Rich Content Support**: Support for both plain text and embed messages
- **URL Validation**: Automatic Discord webhook URL format validation
- **Error Handling**: Comprehensive error handling with detailed error messages
- **Dual Output Ports**: Success and error output ports for workflow control
- **TypeScript Support**: Full type definitions for type safety

## 📋 配置选项

| 参数         | 类型   | 必需 | 默认值   | 说明                        |
| ------------ | ------ | ---- | -------- | --------------------------- |
| `webhookUrl` | string | ✅   | -        | Discord Webhook URL         |
| `content`    | string | ✅\* | -        | 消息内容 (与 embeds 二选一) |
| `username`   | string | ❌   | 随机生成 | 自定义 Bot 用户名           |
| `avatarUrl`  | string | ❌   | 随机生成 | 自定义 Bot 头像 URL         |
| `embeds`     | array  | ❌   | -        | Embed 嵌入式消息数组        |

> \*注意: `content` 和 `embeds` 至少需要提供一个

### Embed 消息格式

```typescript
{
  title?: string        // 标题
  description?: string  // 描述
  color?: number       // 颜色 (十进制)
  url?: string         // 链接 URL
}
```

## 🚀 使用方法

### 基础文本消息

```json
{
  "webhookUrl": "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN",
  "content": "Hello from ChoiceForm Automation! 🚀"
}
```

### 自定义 Bot 身份

```json
{
  "webhookUrl": "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN",
  "content": "Custom bot message",
  "username": "MyCustomBot",
  "avatarUrl": "https://example.com/avatar.png"
}
```

### Embed 富文本消息

```json
{
  "webhookUrl": "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN",
  "embeds": [
    {
      "title": "系统通知",
      "description": "您的工作流已成功执行完成",
      "color": 65280,
      "url": "https://example.com/workflow/123"
    }
  ]
}
```

## Usage

### Basic Text Message

```json
{
  "webhookUrl": "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN",
  "content": "Hello from ChoiceForm Automation! 🚀"
}
```

### Custom Bot Identity

```json
{
  "webhookUrl": "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN",
  "content": "Custom bot message",
  "username": "MyCustomBot",
  "avatarUrl": "https://example.com/avatar.png"
}
```

### Rich Embed Messages

```json
{
  "webhookUrl": "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN",
  "embeds": [
    {
      "title": "System Notification",
      "description": "Your workflow has completed successfully",
      "color": 65280,
      "url": "https://example.com/workflow/123"
    }
  ]
}
```

## 🔧 获取 Discord Webhook

1. 在 Discord 服务器中，进入要发送消息的频道
2. 点击频道设置 ⚙️
3. 选择 "整合" → "Webhook"
4. 点击 "创建 Webhook"
5. 自定义 Webhook 名称和头像
6. 复制 Webhook URL

## 🔧 开发和测试

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 运行测试
pnpm test

# 构建插件
pnpm build

# 验证插件
pnpm validate
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**由 @choiceform/automation-sdk 生成** 🚀

- **类型**: action
- **域**: communication
- **分类**: messaging
- **复杂度**: beginner

---

_最后更新: 2024-06-26 - 插件注册表修复测试_
# Discord Plugin v1.0.2 Release
