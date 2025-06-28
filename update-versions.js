#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// 插件配置
const plugins = [
  {
    name: "discord",
    path: "tools/discord",
    version: "1.1.4",
  },
  {
    name: "github",
    path: "tools/github",
    version: "1.0.2",
  },
];

function updateJsonFile(filePath, version) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  文件不存在: ${filePath}`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(content);

    // 更新版本号
    if (json.version !== undefined) {
      json.version = version;
    }
    if (json.metadata && json.metadata.version !== undefined) {
      json.metadata.version = version;
    }

    // 写回文件
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");
    console.log(`✅ 更新 ${filePath}: ${version}`);
  } catch (error) {
    console.error(`❌ 更新失败 ${filePath}:`, error.message);
  }
}

// 更新所有插件的版本号
plugins.forEach((plugin) => {
  console.log(`\n🔄 更新 ${plugin.name} 插件版本到 ${plugin.version}`);

  const basePath = plugin.path;

  // 更新 package.json
  updateJsonFile(path.join(basePath, "package.json"), plugin.version);

  // 更新 plugin.manifest.json
  updateJsonFile(path.join(basePath, "plugin.manifest.json"), plugin.version);

  // 更新 plugin.registry.json
  updateJsonFile(path.join(basePath, "plugin.registry.json"), plugin.version);
});

console.log("\n🎉 版本号同步完成！");
