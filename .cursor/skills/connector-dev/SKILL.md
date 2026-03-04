---
name: connector-dev
description: Develop connectors for DAO OS that integrate with blockchain protocols. Use when creating new connectors, implementing actions, or working with connector patterns.
---

# Connector Development

Create and enhance connectors for DAO OS blockchain protocol integration.

## Overview

Connectors are TypeScript classes that provide standardized interfaces to blockchain protocols and services. They handle initialization, action execution, validation, and error handling.

## Location

```
packages/connectors/src/
├── BaseConnector.ts       # Base class
├── SafeConnector.ts       # Gnosis Safe integration
├── types.ts               # Connector types
└── errors.ts              # Error classes
```

## Base Connector Pattern

### Extending BaseConnector

```typescript
import { BaseConnector, ConnectorConfig } from './BaseConnector';
import { ConnectorError } from './errors';

export class MyConnector extends BaseConnector {
  constructor(config: MyConnectorConfig) {
    super(config);
  }

  async initialize(): Promise<void> {
    this.log('Initializing MyConnector');
    // Setup connections, validate config, etc.
  }

  async executeAction(
    action: string, 
    params: Record<string, any>
  ): Promise<any> {
    switch (action) {
      case 'myAction':
        return await this.myAction(params);
      default:
        throw new ConnectorError(`Unknown action: ${action}`);
    }
  }

  validate(config: MyConnectorConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validation logic
    if (!config.requiredField) {
      errors.push('requiredField is required');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  private async myAction(params: any): Promise<any> {
    // Implementation
  }
}
```

## Required Methods

### initialize()

Setup the connector:

```typescript
async initialize(): Promise<void> {
  this.log('Initializing connector');
  
  // Connect to blockchain
  // Validate credentials
  // Setup event listeners
  
  this.log('Initialization complete');
}
```

### executeAction()

Execute connector actions:

```typescript
async executeAction(
  action: string,
  params: Record<string, any>
): Promise<any> {
  this.log(`Executing action: ${action}`, { params });

  switch (action) {
    case 'transfer':
      return await this.transfer(params);
    case 'approve':
      return await this.approve(params);
    default:
      throw new ConnectorError(`Unknown action: ${action}`);
  }
}
```

### validate()

Validate configuration:

```typescript
validate(config: MyConnectorConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!config.address) {
    errors.push('Address is required');
  }

  // Format validation
  if (config.address && !isValidAddress(config.address)) {
    errors.push('Invalid address format');
  }

  // Optional warnings
  if (!config.gasLimit) {
    warnings.push('No gas limit specified, using default');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
```

## Error Handling

### ConnectorError

Use for connector-specific errors:

```typescript
import { ConnectorError } from './errors';

throw new ConnectorError('Operation failed', { 
  cause: originalError,
  action: 'transfer',
  params 
});
```

### Structured Responses

Return structured success/error:

```typescript
async myAction(params: any): Promise<ActionResult> {
  try {
    const result = await performOperation(params);
    return {
      success: true,
      data: result
    };
  } catch (error) {
    this.log('Action failed', { error });
    return {
      success: false,
      error: error.message
    };
  }
}
```

## Logging

### Using BaseConnector.log

```typescript
// Info logging
this.log('Operation started', { params });

// With context
this.log('Transaction sent', { 
  txHash: hash,
  action: 'transfer'
});

// Errors
this.log('Operation failed', { 
  error: error.message 
});
```

## Configuration Types

### Define Config Interface

```typescript
export interface MyConnectorConfig extends ConnectorConfig {
  address: string;
  network: string;
  apiKey?: string;
  options?: {
    gasLimit?: number;
    timeout?: number;
  };
}
```

## Integration with Core

### Module Integration

Connectors are used by modules:

```typescript
// In module
import { MyConnector } from '@dao-os/connectors';

const connector = new MyConnector(config);
await connector.initialize();

const result = await connector.executeAction('transfer', {
  to: recipient,
  amount: value
});
```

## Example: Safe Connector

Reference implementation:

```typescript
export class SafeConnector extends BaseConnector {
  private safeService: any;

  async initialize(): Promise<void> {
    this.log('Initializing Safe connector');
    this.safeService = initSafeService(this.config);
  }

  async executeAction(action: string, params: any): Promise<any> {
    switch (action) {
      case 'proposeTransaction':
        return await this.proposeTransaction(params);
      case 'executeTransaction':
        return await this.executeTransaction(params);
      case 'getBalance':
        return await this.getBalance(params);
      default:
        throw new ConnectorError(`Unknown action: ${action}`);
    }
  }

  validate(config: SafeConnectorConfig): ValidationResult {
    const errors: string[] = [];
    
    if (!config.safeAddress) {
      errors.push('Safe address is required');
    }
    
    if (!config.network) {
      errors.push('Network is required');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings: []
    };
  }

  private async proposeTransaction(params: any) {
    // Implementation
  }
}
```

## Testing Connectors

Once tests are configured:

```typescript
import { MyConnector } from './MyConnector';

describe('MyConnector', () => {
  it('should initialize correctly', async () => {
    const connector = new MyConnector(validConfig);
    await connector.initialize();
    // Assertions
  });

  it('should validate config', () => {
    const result = connector.validate(invalidConfig);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should execute actions', async () => {
    const result = await connector.executeAction('myAction', params);
    expect(result.success).toBe(true);
  });
});
```

## Development Workflow

### Build

```bash
pnpm --filter @dao-os/connectors build
```

### Lint

```bash
pnpm --filter @dao-os/connectors lint
```

### Type Check

```bash
pnpm --filter @dao-os/connectors typecheck
```

## Best Practices

1. **Validation**: Always validate config in constructor and validate()
2. **Error Handling**: Use ConnectorError with context
3. **Logging**: Log all major operations with context
4. **Types**: Use TypeScript strictly, avoid `any` where possible
5. **Async/Await**: Use async/await consistently
6. **Immutability**: Don't mutate config or state directly
7. **Documentation**: Document all public methods and configs

## Common Patterns

### Retry Logic

```typescript
async executeWithRetry(
  fn: () => Promise<any>,
  maxRetries = 3
): Promise<any> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      this.log(`Retry ${i + 1}/${maxRetries}`);
      await delay(1000 * (i + 1));
    }
  }
}
```

### Event Handling

```typescript
private setupEventListeners(): void {
  this.service.on('transaction', (tx) => {
    this.log('Transaction detected', { tx });
    this.emit('transaction', tx);
  });
}
```

### Gas Estimation

```typescript
async estimateGas(params: any): Promise<bigint> {
  try {
    const estimate = await this.provider.estimateGas(params);
    return estimate * 110n / 100n; // 10% buffer
  } catch (error) {
    this.log('Gas estimation failed, using default');
    return DEFAULT_GAS_LIMIT;
  }
}
```

## Troubleshooting

### Network Errors

- Check RPC endpoint connectivity
- Verify API keys and credentials
- Check rate limits

### Validation Failures

- Review required fields in config
- Check address formats
- Verify network compatibility

### Type Errors

- Ensure types imported from `@dao-os/core`
- Check for `any` usage
- Run `pnpm typecheck`
