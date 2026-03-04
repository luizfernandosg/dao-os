---
name: safe-treasury
version: 1.0.0
description: Manage Gnosis Safe multisig treasury operations via dao-os Safe connector
author: dao-os
category: capital
metadata:
  openclaw:
    requires:
      env: []
      bins: ["node"]
      config: []
---

# Safe Treasury (dao-os)

## What This Is

Extended treasury management skill using the dao-os Safe connector (`modules/treasury/safe/`). Provides deeper Safe SDK integration than the base `capital-flow` skill — including multi-chain support, transaction simulation, and integration with the DAO composer blueprint.

**This skill extends `capital-flow`.** Use `capital-flow` for basic treasury operations. Use this skill when you need:
- Safe SDK-specific features (EIP-1271 signatures, delegate calls)
- Multi-chain Safe management
- Transaction simulation before proposal
- Integration with dao-os module configuration

## When to Use

- When managing a Safe configured via the DAO Composer
- When you need multi-chain treasury operations
- When preparing complex transaction batches
- When checking Safe configuration against `module.yaml` spec

## Connector Reference

Module location: `modules/treasury/safe/`
- `src/connector.ts` — SafeConnector class
- `src/types.ts` — Safe-specific types
- `src/config.ts` — Configuration utilities
- `module.yaml` — Module specification

## Safe Configuration in IDENTITY.md

```markdown
## Treasury
- **Primary Safe:** 0x... (eip155:100 — Gnosis Chain, 2-of-3)
- **Secondary Safe:** 0x... (eip155:1 — Ethereum mainnet, 3-of-5)
```

Configure Safe API endpoint in `TOOLS.md`:
```markdown
## Safe Config
- Gnosis Chain API: https://safe-transaction-gnosis.gateway.gnosis.io
- Ethereum API: https://safe-transaction-mainnet.gnosis.io
```

## Supported Actions

Per `module.yaml` and `SafeConnector`:

| Action | Description | Approval Required |
|--------|-------------|-------------------|
| `getBalance` | Read multi-token balance | No |
| `getPendingTransactions` | List pending txns | No |
| `addOwner` | Add new owner | Yes — propose only |
| `removeOwner` | Remove owner | Yes — propose only |
| `changeThreshold` | Update signing threshold | Yes — propose only |
| `proposeTransaction` | Create new transaction | Yes — propose only |
| `signTransaction` | Sign pending transaction | Yes — human action |
| `executeTransaction` | Execute ready transaction | Yes — human action |

## Supported Chains

From `SafeConnector.supportedChains`:
- Ethereum mainnet (eip155:1)
- Optimism (eip155:10)
- Gnosis Chain (eip155:100)
- Polygon (eip155:137)
- Base (eip155:8453)
- Arbitrum One (eip155:42161)

## Workflow: Propose Contributor Payout

1. Read current Safe balance via `getBalance`
2. Read payout list from `data/pending-payouts.yaml`
3. Prepare transaction batch (multiSend)
4. **Present transaction summary to operator**
5. On confirmation: call `proposeTransaction` (creates in Safe UI for signing)
6. Operators sign via Safe UI / hardware wallet
7. After execution: record in `data/finances.yaml`

## HEARTBEAT Integration

Add to `HEARTBEAT.md` when:
- Pending transactions need signatures (`getPendingTransactions` count > 0)
- Safe threshold < minimum configured in `module.yaml`
- Owner set differs from `data/members.yaml` active members

## Notes

- SafeConnector requires Safe API endpoint in `TOOLS.md`
- Never execute transactions directly — always propose for multi-sig
- Transaction simulation is available before proposing — use it
- See `modules/TEMPLATE/` for implementing new module patterns
