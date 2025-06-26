"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discord = void 0;
const automation_sdk_1 = require("@choiceform/automation-sdk");
/**
 * Discord Plugin
 *
 * Discord is a communication platform designed for communities. It offers features like text and voice channels, direct messaging, and server-based organization. In Dify, Discord tools allow users to create a random bot with random username and avatar to send messages.
 *
 * Domain: Messaging, chat, and communication platforms
 * Type: action
 */
class Discord extends automation_sdk_1.ActionNode {
    async setup() {
        this.logger?.info('Setting up Discord...');
        // 初始化逻辑
    }
    async teardown() {
        this.logger?.info('Tearing down Discord...');
        // 清理逻辑
    }
    getManifest() {
        return {
            name: '@choiceform/discord',
            version: '1.0.0',
            description: 'Discord is a communication platform designed for communities. It offers features like text and voice channels, direct messaging, and server-based organization. In Dify, Discord tools allow users to create a random bot with random username and avatar to send messages.',
            author: 'wester',
            nodeType: '@choiceform/discord.action',
            automationNodeType: 'action.discord',
            displayName: 'Discord',
            category: 'action',
            domain: 'communication',
            subCategory: 'communication',
            icon: 'icon.svg',
            tags: ['discord', 'action', 'communication', 'automation'],
            isPopular: false,
            sdkVersion: '^1.0.0',
            automationConfigs: {
                registry: {
                    type: 'action.discord',
                    name: 'Discord',
                    description: 'Discord is a communication platform designed for communities. It offers features like text and voice channels, direct messaging, and server-based organization. In Dify, Discord tools allow users to create a random bot with random username and avatar to send messages.',
                    categoryId: 'action',
                    subCategoryId: 'communication',
                    icon: 'icon.svg',
                    tags: ['discord', 'action', 'communication', 'automation'],
                    isPopular: false
                },
                ports: {
                    ports: [
                        {
                            id: 'input',
                            type: 'input',
                            label: 'Input',
                            allowMultiple: false
                        },
                        {
                            id: 'output',
                            type: 'output',
                            label: 'Response',
                            allowMultiple: true
                        }
                    ]
                },
                toolbar: {
                    position: 'top',
                    buttons: ['run', 'delete', 'activate', 'more'],
                    showContent: true
                },
                layout: {
                    width: 180,
                    minHeight: 100,
                    showContent: true
                }
            },
            metadata: {
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        };
    }
    getPortConfig() {
        return {
            ports: [
                {
                    id: 'input',
                    type: 'input',
                    label: 'Input',
                    allowMultiple: false
                },
                {
                    id: 'output',
                    type: 'output',
                    label: 'Response',
                    allowMultiple: true
                }
            ]
        };
    }
    async execute(inputs, context) {
        try {
            context.log('info', 'Discord executed', inputs);
            // 你的业务逻辑
            const result = {
                timestamp: new Date().toISOString(),
                processed: true,
                data: inputs,
                nodeId: context.nodeId,
                workflowId: context.workflowId,
                domain: 'communication',
                category: 'action'
            };
            return {
                success: true,
                data: result
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : '未知错误';
            // 确保 log 调用也在 try-catch 中，避免二次错误
            try {
                context.log('error', 'Plugin execution failed', { error: errorMessage });
            }
            catch (logError) {
                // 如果 log 本身出错，忽略它
            }
            return {
                success: false,
                error: errorMessage
            };
        }
    }
}
exports.Discord = Discord;
// 导出插件实例
exports.default = new Discord();
//# sourceMappingURL=index.js.map