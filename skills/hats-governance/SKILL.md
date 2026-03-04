---
name: hats-governance
version: 1.0.0
description: Manage organizational roles via Hats Protocol integration
author: dao-os
category: governance
metadata:
  openclaw:
    requires:
      env: []
      bins: []
      config: []
---

# Hats Governance (dao-os)

## What This Is

Role management skill using Hats Protocol. Reads and manages organizational roles defined in a Hats tree, verifies role assignments match `data/members.yaml`, and prepares hat minting/transfer transactions for human approval.

## When to Use

- "Who has the [role name] hat?"
- "What roles does [member name] hold?"
- "A new member joined — which hats should they receive?"
- "Someone left — revoke their hats"
- "Does our hat tree match current member roles?"

## When NOT to Use

- To execute hat transactions directly → always prepare + present for approval
- For treasury operations → use safe-treasury skill
- For Gardens governance (separate system) → use gardens-governance skill

## Hats Protocol Basics

Hats Protocol represents organizational roles as NFTs (ERC-1155) in a tree structure:
- **Top Hat**: Root of the tree (org-level)
- **Branch Hats**: Department or team hats
- **Role Hats**: Specific function hats (can have permissions)

Hats enable:
- Role-gated Safe access (Hats Signer Gate)
- Role-gated contract calls
- Revocable, admin-controlled permissions
- Transparent on-chain org chart

## Configuration

Declare Hats tree in `IDENTITY.md`:
```markdown
## Governance Infrastructure
- **Hats Protocol Tree ID:** 12345
```

Configure RPC in `TOOLS.md`:
```markdown
## RPC Endpoints
- Gnosis Chain: https://rpc.gnosis.gateway.fm
```

## Common Operations

### Read Hat Tree
Fetch and display the organization's hat tree structure:
- List all hats with names, wearers, and admin relationships
- Cross-reference with `data/members.yaml` to flag mismatches

### Role Verification
Check if `data/members.yaml` roles match on-chain hat assignments:
```markdown
## Role Verification Report — YYYY-MM-DD

### Matches ✅
- [Member]: coordinator hat (0xHAT...)

### Mismatches ⚠️
- [Member]: listed as "Steward" in members.yaml but doesn't wear Steward hat on-chain
  → Suggested action: Mint Steward hat for [member address]

### Unassigned Hats
- Developer hat: no current wearer
```

### Prepare Mint/Transfer
Prepare hat transaction for operator approval:
```markdown
## Proposed Hat Transaction

Action: Mint hat
Hat: Coordinator (id: 12345.2.1)
To: 0xMEMBER_ADDRESS
Admin: Top Hat (must be worn by transaction sender)

→ Ready to propose? Confirm to generate Safe transaction.
```

## HEARTBEAT Integration

Add to `HEARTBEAT.md`:
- When new member in `data/members.yaml` has no on-chain hat
- When hat wearer is no longer in `data/members.yaml` (departed member)
- When hat admin key is held by a departed member

## Notes

- Hat IDs follow format: `treeId.hatId` (e.g., `12345.1`)
- Hats are non-transferable by wearers (admin-only transfer)
- Hat minting requires admin hat worn by transaction sender
- Hats Signer Gate connects hat roles to Safe signing
- Module status: planned in dao-os `modules/governance/` — see TEMPLATE for implementation pattern
