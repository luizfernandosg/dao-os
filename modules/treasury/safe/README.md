# Gnosis Safe Module

Multi-signature treasury management for DAOs using Gnosis Safe.

## Features

- Deploy new Safe contracts with customizable signers and thresholds
- Multi-chain support (Ethereum, Optimism, Gnosis, Polygon, Base, Arbitrum)
- Manage signers and threshold configuration
- Propose, sign, and execute transactions
- Real-time balance and transaction monitoring
- Integration with Safe API and Protocol Kit

## Installation

```bash
pnpm add @dao-os/module-safe
```

## Quick Start

### Deploy a Safe

```typescript
import { SafeConnector } from '@dao-os/module-safe';

const connector = new SafeConnector();

// Deploy a 2-of-3 multisig
const result = await connector.deploy({
  signers: [
    '0x1234567890123456789012345678901234567890',
    '0x2345678901234567890123456789012345678901',
    '0x3456789012345678901234567890123456789012',
  ],
  threshold: 2,
  chain: 'optimism',
});

console.log('Safe deployed:', result.address);
```

### Check Safe Status

```typescript
const status = await connector.getStatus('0xYourSafeAddress');
console.log('Owners:', status.data.owners);
console.log('Threshold:', status.data.threshold);
console.log('Balance:', status.data.balance);
```

### Execute Actions

```typescript
// Propose a transaction
await connector.execute({
  id: 'propose-transaction',
  name: 'Propose Transaction',
  description: 'Send 1 ETH to recipient',
  parameters: [
    { name: 'to', value: '0xRecipient...', type: 'address', required: true, description: '' },
    { name: 'value', value: '1000000000000000000', type: 'string', required: true, description: '' },
    { name: 'data', value: '0x', type: 'string', required: false, description: '' },
  ],
});

// Sign a transaction
await connector.execute({
  id: 'sign-transaction',
  name: 'Sign Transaction',
  description: 'Sign pending transaction',
  parameters: [
    { name: 'safeTxHash', value: '0x...', type: 'string', required: true, description: '' },
  ],
});
```

## Configuration

### Required Fields

- `signers` (string[]): Array of Ethereum addresses that can sign transactions
- `threshold` (number): Minimum number of signatures required (1 to signers.length)
- `chain` (string): Blockchain network ('ethereum', 'optimism', 'gnosis', 'polygon', 'base', 'arbitrum')

### Optional Fields

- `saltNonce` (string): Salt for deterministic deployment (default: "0")

### Configuration Validation

```typescript
import { SafeConfig } from '@dao-os/module-safe';

const validation = SafeConfig.validate({
  signers: ['0x...', '0x...'],
  threshold: 2,
  chain: 'optimism',
});

if (!validation.valid) {
  console.error('Errors:', validation.errors);
}
```

## Integration with Other Modules

### Hats Protocol

Use Hats Protocol to manage Safe signer roles dynamically:

```typescript
// 1. Deploy Hats with roles
// 2. Deploy Safe with role holders as signers
// 3. Update Safe signers when roles change
```

### Snapshot

Connect governance decisions to Safe executions:

```typescript
// 1. Create Snapshot proposal
// 2. After vote passes, create Safe transaction
// 3. Execute transaction with required signatures
```

## Use Cases

### Small Team Treasury

2-of-3 multisig for small teams:

```typescript
{
  signers: ['0xFounder1', '0xFounder2', '0xFounder3'],
  threshold: 2,
  chain: 'optimism' // Lower gas costs
}
```

### DAO Main Treasury

5-of-7 multisig for core team:

```typescript
{
  signers: ['0xCore1', '0xCore2', '0xCore3', '0xCore4', '0xCore5', '0xCore6', '0xCore7'],
  threshold: 5,
  chain: 'ethereum' // Main network for security
}
```

### Project Grants Pool

3-of-5 multisig for grants committee:

```typescript
{
  signers: ['0xGrants1', '0xGrants2', '0xGrants3', '0xGrants4', '0xGrants5'],
  threshold: 3,
  chain: 'polygon' // Low fees for frequent transactions
}
```

## React Components

### Configuration UI

```typescript
import { SafeConfigComponent } from '@dao-os/module-safe/components';

function ConfigureStep() {
  const [config, setConfig] = useState({});
  const [valid, setValid] = useState(false);

  return (
    <SafeConfigComponent
      config={config}
      onChange={setConfig}
      onValidate={setValid}
    />
  );
}
```

### Display Component

```typescript
import { SafeDisplay } from '@dao-os/module-safe/components';

function DashboardWidget({ instance }) {
  return <SafeDisplay instance={instance} compact />;
}
```

### React Flow Node

```typescript
import { SafeNode } from '@dao-os/module-safe/components';

const nodeTypes = {
  'gnosis-safe': SafeNode,
};

<ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} />
```

## API Reference

### SafeConnector

Main connector class for interacting with Gnosis Safe.

#### Methods

- `deploy(config)`: Deploy a new Safe
- `getStatus(address)`: Get Safe information
- `execute(action)`: Execute an action (add/remove owner, propose/sign/execute transaction)
- `validateConfig(config)`: Validate configuration
- `getAvailableActions()`: Get list of available actions

### SafeConfig

Configuration helper utilities.

#### Methods

- `validate(config)`: Validate Safe configuration
- `getChainId(chain)`: Get numeric chain ID
- `estimateDeploymentGas(config)`: Estimate gas for deployment
- `getRecommendedConfig(scenario)`: Get recommended config for scenario

## Supported Networks

- **Ethereum** (mainnet, chain ID: 1)
- **Optimism** (mainnet, chain ID: 10) - Recommended for lower gas
- **Gnosis** (mainnet, chain ID: 100)
- **Polygon** (mainnet, chain ID: 137)
- **Base** (mainnet, chain ID: 8453)
- **Arbitrum** (mainnet, chain ID: 42161)

## Standards Implemented

- **EIP-4824**: DAO Identity (contractsURI includes Safe address)
- **EIP-1271**: Smart Contract Signatures

## Examples

See [use-cases.md](./docs/use-cases.md) for detailed examples.

## Contributing

Contributions welcome! Please read our [contributing guidelines](../../../CONTRIBUTING.md).

## License

MIT
