// Mock for @choiceform/automation-sdk
export interface PluginExecutionContext {
  nodeId: string;
  workflowId: string;
  log: (level: string, message: string, data?: any) => void;
}

export interface ExecutionResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface PluginManifest {
  name: string;
  version: string;
  description: string;
  author: string;
  nodeType: string;
  automationNodeType: string;
  displayName: string;
  category: string;
  domain: string;
  subCategory: string;
  icon: string;
  tags: string[];
  isPopular: boolean;
  sdkVersion: string;
  automationConfigs?: any;
  metadata?: any;
}

export interface PortConfig {
  ports: Array<{
    id: string;
    type: string;
    label: string;
    allowMultiple: boolean;
  }>;
}

export abstract class ActionNode {
  logger?: { info: (message: string) => void };
  
  abstract setup(): Promise<void>;
  abstract teardown(): Promise<void>;
  abstract getManifest(): PluginManifest;
  abstract getPortConfig(): PortConfig;
  abstract execute(inputs: Record<string, unknown>, context: PluginExecutionContext): Promise<ExecutionResult>;
}