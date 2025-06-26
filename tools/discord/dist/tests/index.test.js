"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importStar(require("../src/index"));
describe('Discord', () => {
    let plugin;
    beforeEach(() => {
        plugin = new index_1.Discord();
    });
    it('should create plugin instance', () => {
        expect(plugin).toBeDefined();
        expect(plugin).toBeInstanceOf(index_1.Discord);
    });
    it('should use exported instance', () => {
        expect(index_1.default).toBeDefined();
        expect(index_1.default).toBeInstanceOf(index_1.Discord);
    });
    it('should execute successfully', async () => {
        const inputs = { test: 'data' };
        const context = {
            nodeId: 'test-node',
            workflowId: 'test-workflow',
            log: jest.fn()
        };
        const result = await plugin.execute(inputs, context);
        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(result.data.processed).toBe(true);
    });
    it('should handle errors gracefully', async () => {
        // 测试错误处理 - 模拟一个会抛出错误的情况
        const inputs = { test: 'data' };
        const context = {
            nodeId: 'test-node',
            workflowId: 'test-workflow',
            log: jest.fn(() => {
                throw new Error('Mock error for testing');
            })
        };
        const result = await plugin.execute(inputs, context);
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
    });
});
//# sourceMappingURL=index.test.js.map