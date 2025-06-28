# 插件版本管理指南

## 🎯 统一版本管理

为了避免版本号不一致导致的下载错误，我们采用了统一的版本管理机制。

## 📋 版本号存储位置

每个插件的版本号需要在以下文件中保持一致：

1. **源代码常量** (`src/index.ts`)
2. **包配置** (`package.json`)
3. **插件清单** (`plugin.manifest.json`)
4. **注册表配置** (`plugin.registry.json`)

## 🔧 版本更新流程

### 方法一：使用自动化脚本（推荐）

1. 修改 `update-versions.js` 中的版本号：

```javascript
const plugins = [
  {
    name: "discord",
    path: "tools/discord",
    version: "1.1.4", // 更新这里
  },
  {
    name: "github",
    path: "tools/github",
    version: "1.0.2", // 更新这里
  },
];
```

2. 运行同步脚本：

```bash
node update-versions.js
```

3. 更新源代码中的版本常量：

```typescript
// tools/discord/src/index.ts
const PLUGIN_VERSION = "1.1.4";

// tools/github/src/index.ts
const PLUGIN_VERSION = "1.0.2";
```

### 方法二：手动更新

1. 更新源代码常量
2. 更新 package.json
3. 更新 plugin.manifest.json
4. 更新 plugin.registry.json

## ✅ 验证版本一致性

运行以下命令验证版本号是否一致：

```bash
# 检查 Discord 插件
grep '"version"' tools/discord/package.json tools/discord/plugin.manifest.json tools/discord/plugin.registry.json

# 检查 GitHub 插件
grep '"version"' tools/github/package.json tools/github/plugin.manifest.json tools/github/plugin.registry.json
```

## 🚀 发布流程

1. 更新版本号（使用上述方法）
2. 构建和测试：

```bash
cd tools/discord && pnpm build && npx @choiceform/automation-sdk build
cd tools/github && pnpm build && npx @choiceform/automation-sdk build
```

3. 提交代码
4. GitHub Action 自动发布

## 📦 包文件命名规则

包文件名格式：`choiceform-{plugin-name}-{version}.choiceformpkg`

示例：

- `choiceform-discord-1.1.4.choiceformpkg`
- `choiceform-github-1.0.2.choiceformpkg`

## ⚠️ 注意事项

1. **版本号必须一致**：所有文件中的版本号必须完全相同
2. **语义化版本**：遵循 semver 规范 (major.minor.patch)
3. **测试验证**：发布前必须测试构建和打包
4. **文档更新**：重大版本更新时需要更新 CHANGELOG.md

## 🔍 常见问题

### Q: 为什么会出现 404 下载错误？

A: 通常是因为版本号不一致，导致实际生成的包文件名与下载链接不匹配。

### Q: 如何快速检查版本一致性？

A: 使用上面的 grep 命令或运行构建测试。

### Q: 可以只更新部分文件的版本号吗？

A: 不可以，必须保持所有文件的版本号一致。
