import discordInstance, { Discord } from '../src/index'

describe('Discord', () => {
  let plugin: Discord;

  beforeEach(() => {
    plugin = new Discord()
  })

  it('should create plugin instance', () => {
    expect(plugin).toBeDefined()
    expect(plugin).toBeInstanceOf(Discord)
  })

  it('should use exported instance', () => {
    expect(discordInstance).toBeDefined()
    expect(discordInstance).toBeInstanceOf(Discord)
  })

  it('should execute successfully', async () => {
    const inputs = { test: 'data' }
    const context = {
      nodeId: 'test-node',
      workflowId: 'test-workflow',
      log: jest.fn()
    }

    const result = await plugin.execute(inputs, context)
    
    expect(result.success).toBe(true)
    expect(result.data).toBeDefined()
    expect((result.data as any).processed).toBe(true)
  })

  it('should handle errors gracefully', async () => {
    // 测试错误处理 - 模拟一个会抛出错误的情况
    const inputs = { test: 'data' }
    const context = {
      nodeId: 'test-node',
      workflowId: 'test-workflow', 
      log: jest.fn(() => {
        throw new Error('Mock error for testing')
      })
    }

    const result = await plugin.execute(inputs, context)
    
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })
})