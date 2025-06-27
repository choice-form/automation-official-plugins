export class ActionNode {
  async setup(): Promise<void> {}
  async teardown(): Promise<void> {}
  getManifest(): any {
    return {};
  }
  getPortConfig(): any {
    return { ports: [] };
  }
  getConfigSchema(): any {
    return { fields: [], groups: {} };
  }
  async execute(inputs: any, context: any): Promise<any> {
    return { success: true, data: {} };
  }
}

export interface PluginExecutionContext {
  log(level: string, message: string, data?: any): void;
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
  automationConfigs: any;
  metadata: any;
}

export interface PortConfig {
  ports: any[];
}

export interface NodeConfigSchema {
  fields: any[];
  groups: any;
}

export interface ConfigField {
  key: string;
  type: string;
  label: string;
  description: string;
  required: boolean;
  sensitive?: boolean;
  supportExpression?: boolean;
  placeholder?: string;
  defaultValue?: any;
  validation?: any;
  options?: any[];
  ui?: any;
}
