// @ts-ignore - SDK 在构建时可用
import { ActionNode } from "@choiceform/automation-sdk";
// @ts-ignore - SDK 在构建时可用
import type {
  PluginExecutionContext,
  ExecutionResult,
  PluginManifest,
  PortConfig,
  NodeConfigSchema,
  ConfigField,
} from "@choiceform/automation-sdk";

// Discord随机用户名和头像
const BOT_NAMES = [
  "AutoBot",
  "FlowBot",
  "TaskBot",
  "WorkBot",
  "ChatBot",
  "HelpBot",
  "InfoBot",
  "NewsBot",
  "AlertBot",
  "NotifyBot",
  "UpdateBot",
  "SyncBot",
];

const BOT_AVATARS = [
  "https://cdn.discordapp.com/embed/avatars/0.png",
  "https://cdn.discordapp.com/embed/avatars/1.png",
  "https://cdn.discordapp.com/embed/avatars/2.png",
  "https://cdn.discordapp.com/embed/avatars/3.png",
  "https://cdn.discordapp.com/embed/avatars/4.png",
  "https://cdn.discordapp.com/embed/avatars/5.png",
];

interface DiscordInputs {
  webhookUrl?: string;
  content?: string;
  username?: string;
  avatarUrl?: string;
  embeds?: Array<{
    title?: string;
    description?: string;
    color?: number;
    url?: string;
  }>;
}

/**
 * Discord Plugin
 *
 * Send messages to Discord channels using webhooks with random bot usernames and avatars
 */
export class Discord extends ActionNode {
  async setup(): Promise<void> {
    console.log("[Discord Plugin] Setting up Discord plugin...");
  }

  async teardown(): Promise<void> {
    console.log("[Discord Plugin] Tearing down Discord plugin...");
  }

  getManifest(): PluginManifest {
    return {
      name: "@choiceform/discord",
      version: "1.1.3",
      description:
        "Send messages to Discord channels using webhooks with customizable bot usernames and avatars",
      author: "ChoiceForm Team",
      nodeType: "@choiceform/discord.action",
      automationNodeType: "action.discord",
      displayName: "Discord",
      category: "action",
      domain: "communication",
      subCategory: "messaging",
      icon: "icon.svg",
      tags: [
        "discord",
        "messaging",
        "webhook",
        "notification",
        "communication",
      ],
      isPopular: true,
      sdkVersion: "^1.0.0",
      automationConfigs: {
        registry: {
          type: "action.discord",
          name: "Discord",
          description: "Send messages to Discord channels",
          categoryId: "action",
          subCategoryId: "communication",
          icon: "icon.svg",
          tags: ["discord", "messaging", "webhook", "notification"],
          isPopular: true,
        },
        ports: {
          ports: [
            {
              id: "input",
              type: "input",
              label: "Input",
              allowMultiple: false,
            },
            {
              id: "success",
              type: "output",
              label: "Success",
              allowMultiple: true,
            },
            {
              id: "error",
              type: "output",
              label: "Error",
              allowMultiple: true,
            },
          ],
        },
        toolbar: {
          position: "top",
          buttons: ["run", "delete", "activate", "more"],
          showContent: true,
        },
        layout: {
          width: 200,
          minHeight: 120,
          showContent: true,
        },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  getPortConfig(): PortConfig {
    return {
      ports: [
        {
          id: "input",
          type: "input",
          label: "Input",
          allowMultiple: false,
        },
        {
          id: "success",
          type: "output",
          label: "Success",
          allowMultiple: true,
        },
        {
          id: "error",
          type: "output",
          label: "Error",
          allowMultiple: true,
        },
      ],
    };
  }

  getConfigSchema(): NodeConfigSchema {
    return {
      fields: [
        {
          key: "webhookUrl",
          type: "string",
          label: "Webhook URL",
          description: "Discord webhook URL for sending messages",
          required: true,
          sensitive: true,
          placeholder: "https://discord.com/api/webhooks/...",
          validation: {
            pattern: ".*discord\\.com/api/webhooks/.*",
            message: "Must be a valid Discord webhook URL",
          },
          ui: {
            width: "full",
            group: "connection",
            order: 1,
          },
        },
        {
          key: "content",
          type: "string",
          label: "Message Content",
          description: "The text content of the message",
          required: false,
          supportExpression: true,
          placeholder: "Enter your message...",
          validation: {
            max: 2000,
            message: "Message content cannot exceed 2000 characters",
          },
          ui: {
            multiline: true,
            width: "full",
            group: "message",
            order: 2,
          },
        },
        {
          key: "username",
          type: "string",
          label: "Bot Username",
          description:
            "Custom username for the bot (optional, random if not provided)",
          required: false,
          supportExpression: true,
          placeholder: "AutoBot",
          validation: {
            max: 80,
            message: "Username cannot exceed 80 characters",
          },
          ui: {
            width: "medium",
            group: "appearance",
            order: 3,
          },
        },
        {
          key: "avatarUrl",
          type: "string",
          label: "Bot Avatar URL",
          description:
            "Custom avatar URL for the bot (optional, random if not provided)",
          required: false,
          supportExpression: true,
          placeholder: "https://example.com/avatar.png",
          validation: {
            pattern: "https?://.*\\.(png|jpg|jpeg|gif|webp)",
            message: "Must be a valid image URL (png, jpg, jpeg, gif, webp)",
          },
          ui: {
            width: "full",
            group: "appearance",
            order: 4,
          },
        },
      ],
      groups: {
        connection: {
          label: "Connection Settings",
          description: "Discord webhook configuration",
        },
        message: {
          label: "Message Content",
          description: "What to send to Discord",
        },
        appearance: {
          label: "Bot Appearance",
          description: "Customize bot username and avatar",
          collapsed: true,
        },
      },
    };
  }

  private getRandomBotName(): string {
    return BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
  }

  private getRandomBotAvatar(): string {
    return BOT_AVATARS[Math.floor(Math.random() * BOT_AVATARS.length)];
  }

  private async sendDiscordMessage(
    webhookUrl: string,
    payload: Record<string, any>
  ): Promise<any> {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Discord API error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response;
  }

  async execute(
    inputs: Record<string, unknown>,
    context: PluginExecutionContext
  ): Promise<ExecutionResult> {
    try {
      const discordInputs = inputs as DiscordInputs;
      const { webhookUrl, content, username, avatarUrl, embeds } =
        discordInputs;

      // 验证必需参数
      if (!webhookUrl) {
        throw new Error("Webhook URL is required");
      }

      if (!content && (!embeds || embeds.length === 0)) {
        throw new Error("Either content or embeds must be provided");
      }

      // 验证 webhook URL 格式
      if (!webhookUrl.includes("discord.com/api/webhooks/")) {
        throw new Error("Invalid Discord webhook URL format");
      }

      context.log("info", "Sending message to Discord", {
        webhookUrl: webhookUrl.replace(/\/[^/]+$/, "/***"), // 隐藏token
        hasContent: !!content,
        hasEmbeds: !!(embeds && embeds.length > 0),
      });

      // 构造消息负载
      const payload: Record<string, any> = {};

      // 设置内容
      if (content) {
        payload.content = content;
      }

      // 设置用户名和头像（随机或指定）
      payload.username = username || this.getRandomBotName();
      payload.avatar_url = avatarUrl || this.getRandomBotAvatar();

      // 设置嵌入内容
      if (embeds && embeds.length > 0) {
        payload.embeds = embeds.map((embed) => ({
          ...embed,
          timestamp: new Date().toISOString(),
        }));
      }

      // 发送消息
      const response = await this.sendDiscordMessage(webhookUrl, payload);

      const result = {
        success: true,
        messageId: response.headers?.get
          ? response.headers.get("x-message-id")
          : null,
        timestamp: new Date().toISOString(),
        botName: payload.username,
        botAvatar: payload.avatar_url,
        sent: {
          content: payload.content,
          embeds: payload.embeds,
        },
      };

      context.log("info", "Discord message sent successfully", result);

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知错误";

      try {
        context.log("error", "Discord message failed", { error: errorMessage });
      } catch (logError) {
        // 忽略日志错误
      }

      return {
        success: false,
        error: errorMessage,
        data: {
          error: errorMessage,
          timestamp: new Date().toISOString(),
        },
      };
    }
  }
}

// 导出插件实例
export default new Discord();
