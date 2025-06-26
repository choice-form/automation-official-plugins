import { ActionNode } from '@choiceform/automation-sdk';
import type { PluginExecutionContext, ExecutionResult, PluginManifest, PortConfig } from '@choiceform/automation-sdk';
/**
 * Discord Plugin
 *
 * Discord is a communication platform designed for communities. It offers features like text and voice channels, direct messaging, and server-based organization. In Dify, Discord tools allow users to create a random bot with random username and avatar to send messages.
 *
 * Domain: Messaging, chat, and communication platforms
 * Type: action
 */
export declare class Discord extends ActionNode {
    setup(): Promise<void>;
    teardown(): Promise<void>;
    getManifest(): PluginManifest;
    getPortConfig(): PortConfig;
    execute(inputs: Record<string, unknown>, context: PluginExecutionContext): Promise<ExecutionResult>;
}
declare const _default: Discord;
export default _default;
//# sourceMappingURL=index.d.ts.map