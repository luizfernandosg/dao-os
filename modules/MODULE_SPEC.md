# Module Specification Guide

## Overview

All DAO OS modules must follow a standardized specification format to ensure compatibility, discoverability, and ease of integration.

## Module Structure

Each module should be organized as follows:

```
modules/
└── {category}/
    └── {module-name}/
        ├── module.yaml           # Module specification
        ├── package.json          # Package configuration
        ├── src/
        │   ├── connector.ts      # Module connector implementation
        │   ├── config.ts         # Configuration schema
        │   └── index.ts          # Main export
        ├── components/           # React components (if applicable)
        │   ├── Config.tsx        # Configuration UI
        │   ├── Display.tsx       # Display component
        │   └── Node.tsx          # React Flow node component
        ├── docs/
        │   ├── README.md         # Module documentation
        │   ├── setup-guide.md    # Setup instructions
        │   └── use-cases.md      # Use case examples
        └── tests/
            └── connector.test.ts # Tests
```

## Module Specification (module.yaml)

The `module.yaml` file is the central specification for each module:

```yaml
id: unique-module-id
name: Module Display Name
version: 1.0.0
category: treasury|governance|funding|identity|coordination|dao2dao
description: Brief description of the module

provider: Provider Name (e.g., "Gnosis Safe", "Hats Protocol")

# Visual representation
icon: ./assets/icon.svg  # or URL
color: "#00ff00"

# Integration details
connectorType: onchain|api|manual

networks:
  - id: 1
    name: Ethereum
    network: mainnet
  - id: 10
    name: Optimism
    network: optimism

# API endpoints (if applicable)
apis:
  - url: https://api.example.com
    method: GET
    auth:
      type: bearer
      config:
        envVar: API_KEY

# Smart contracts (if applicable)
contracts:
  - address: "0x..."
    chainId: 1
    abiPath: ./abis/Contract.json

# Configuration schema (JSON Schema format)
configSchema:
  type: object
  required:
    - signers
    - threshold
  properties:
    signers:
      type: array
      items:
        type: string
      minItems: 1
      description: Addresses of Safe signers
    threshold:
      type: integer
      minimum: 1
      description: Number of signatures required
    chain:
      type: string
      enum: [ethereum, optimism, gnosis]
      description: Deployment chain

# Default configuration
defaultConfig:
  threshold: 2
  chain: optimism

# Dependencies (other modules)
dependencies: []

# Prerequisites
prerequisites:
  - type: account
    description: Must have an Ethereum account
    required: true
  - type: permission
    description: Deployment permission on target chain
    required: true

# Standards implemented
standards:
  - EIP-4824
  - EIP-1271

# Integration patterns
integrations:
  - targetModule: hats-protocol
    type: recommended
    description: Use Hats for signer management
```

## Connector Implementation

Every module must implement the `ModuleConnector` interface:

```typescript
import { BaseConnector } from '@dao-os/connectors';
import type { ModuleConfig, DeploymentResult, ModuleStatusResult, ModuleAction, ActionResult } from '@dao-os/core';

export class YourModuleConnector extends BaseConnector {
  constructor() {
    super('your-module-id', 'Provider Name');
  }

  async deploy(config: ModuleConfig): Promise<DeploymentResult> {
    // Implementation
  }

  async getStatus(identifier: string): Promise<ModuleStatusResult> {
    // Implementation
  }

  async execute(action: ModuleAction): Promise<ActionResult> {
    // Implementation
  }

  getAvailableActions(): ModuleAction[] {
    // Return available actions
    return [];
  }
}
```

## React Components

### Configuration Component

```typescript
interface ConfigProps {
  config: ModuleConfig;
  onChange: (config: ModuleConfig) => void;
  onValidate: (valid: boolean) => void;
}

export function YourModuleConfig({ config, onChange, onValidate }: ConfigProps) {
  // Render configuration UI
}
```

### Display Component

```typescript
interface DisplayProps {
  instance: ModuleInstance;
  compact?: boolean;
}

export function YourModuleDisplay({ instance, compact }: DisplayProps) {
  // Render module information
}
```

### React Flow Node Component

```typescript
import { Handle, Position, type NodeProps } from 'reactflow';

export function YourModuleNode({ data }: NodeProps) {
  return (
    <div className="module-node">
      <Handle type="target" position={Position.Top} />
      {/* Node content */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
```

## Documentation Requirements

Each module must include:

1. **README.md**: Overview, features, quick start
2. **setup-guide.md**: Detailed setup instructions
3. **use-cases.md**: Real-world use case examples

## Testing

Modules should include tests covering:

- Configuration validation
- Deployment simulation
- Status retrieval
- Action execution
- Error handling

## Example Modules

See existing modules for reference:

- `modules/treasury/safe/` - Gnosis Safe integration
- `modules/governance/hats/` - Hats Protocol integration

## Validation

Use the provided CLI tool to validate your module specification:

```bash
pnpm validate:module modules/category/your-module
```

## Submission

1. Create module following this specification
2. Add tests with >80% coverage
3. Write comprehensive documentation
4. Submit PR for review
