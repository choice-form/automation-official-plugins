# @choiceForm/automation-official-plugins

🔌 **官方维护的高质量插件集合** - 为 @choiceForm/automation 平台提供核心扩展功能

[![Official](https://img.shields.io/badge/plugins-official-blue)](https://github.com/choiceform/automation-official-plugins)
[![Quality](https://img.shields.io/badge/quality-enterprise-green)](https://github.com/choiceform/automation-official-plugins)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🎯 仓库目标

本仓库包含由 ChoiceForm 核心团队官方维护的插件，代表平台的最高质量标准。所有插件经过严格的代码审查、安全验证和性能优化。

## 📁 目录结构

```
automation-official-plugins/
├── extensions/              # 扩展插件
├── models/                  # 模型插件
├── tools/                   # 工具插件
└── .github/workflows/       # 自动化工作流
```

## 🔧 插件分类

### Extensions（扩展插件）

轻量级 HTTP 端点功能，提供自定义 API 和 Webhook 处理能力。

### Models（模型插件）

AI 模型提供商集成，支持主流 LLM 和自定义模型。

### Tools（工具插件）

第三方服务工具，为工作流提供丰富的功能节点。

## 🚀 快速开始

### 开发官方插件

```bash
# 1. 克隆仓库
git clone https://github.com/choiceform/automation-official-plugins.git
cd automation-official-plugins

# 2. 选择插件类型并创建
cd tools  # 或 extensions, models
npx @choiceform/automation-sdk create --name my-plugin

# 3. 开发和测试
cd my-plugin
npm install
npm run dev
npm test

# 4. 提交 PR
git add .
git commit -m "feat: add my-plugin official integration"
git push origin feature/my-plugin
```

## 📋 质量标准

### 🎯 官方插件要求

- **代码质量**: TypeScript 严格模式，ESLint 0 错误
- **测试覆盖**: 单元测试覆盖率 > 90%
- **文档完整**: 完整的 README、API 文档、使用示例
- **安全标准**: 安全审计通过，无已知漏洞
- **长期维护**: 核心团队承诺长期支持

### 🔍 审核流程

1. **自动化检查**: 结构验证、编译检查、安全扫描
2. **人工审核**: 功能设计、代码架构、性能评估
3. **团队评估**: 维护计划、生态兼容性评估

## 🔄 自动化流程

### 插件发布流程

```
PR 提交 → 自动化测试 → 人工审核 → 合并 → 自动发布 → 更新注册表
```

- **自动构建**: PR 合并后自动构建插件包
- **GitHub Release**: 自动创建发布版本
- **注册表更新**: 自动更新插件注册表
- **Pages 部署**: 自动部署插件市场页面

## 🤝 贡献指南

### 提交流程

1. Fork 本仓库
2. 创建插件分支: `feature/plugin-name`
3. 开发并测试插件
4. 使用官方 PR 模板提交
5. 等待审核和合并

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

---

**ChoiceForm Official Plugins** - 企业级质量，开源生态！🎉
