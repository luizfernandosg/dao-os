---
name: eip4824-identity
version: 1.0.0
description: Manage on-chain EIP-4824 organizational identity registration
author: dao-os
category: infrastructure
metadata:
  openclaw:
    requires:
      env: []
      bins: ["node"]
      config: []
---

# EIP-4824 Identity (dao-os)

## What This Is

Manages on-chain EIP-4824 (DAO Common Interfaces) organizational identity — both the off-chain schema files in `.well-known/` and the optional on-chain registration that makes the identity discoverable via DAOstar indexers.

**Off-chain** (handled by schema-generator skill): `.well-known/dao.json`, `members.json`, etc.

**On-chain** (this skill): The registration contract that points to `daoURI` on-chain, making the org discoverable by DAOstar, Tally, Snapshot, and other EIP-4824-aware tools.

## When to Use

- "Is our EIP-4824 registration up to date?"
- "Our daoURI changed — update the on-chain registration"
- "Register our org on-chain via EIP-4824"
- "Check if our schemas are accessible and valid"
- After updating `IDENTITY.md` with a new daoURI

## When NOT to Use

- To update schema files → use schema-generator skill
- For general treasury → use safe-treasury skill

## EIP-4824 Standard Overview

EIP-4824 defines a standard URI (`daoURI`) that points to a JSON-LD document describing an organization:

```
On-chain: Registration contract stores daoURI
    ↓
Off-chain: daoURI → dao.json (organizational identity)
    ↓ references
    ├── membersURI → members.json
    ├── proposalsURI → proposals.json
    ├── governanceURI → governance.md
    └── contractsURI → contracts.json (+ meetings, projects, finances)
```

## Configuration

Declare registration in `IDENTITY.md`:
```markdown
## On-Chain Identity
- **daoURI:** https://org.github.io/.well-known/dao.json
- **Registration Contract:** 0xREG... (Ethereum mainnet)
```

## Common Operations

### Check Registration Status

```markdown
## EIP-4824 Status — YYYY-MM-DD

**daoURI (IDENTITY.md):** https://refi-bcn.github.io/.well-known/dao.json
**On-chain registration:** Not registered / Registered at 0xREG...

**Schema Accessibility:**
- dao.json: ✅ Accessible (200 OK)
- members.json: ✅ Accessible
- meetings.json: ✅ Accessible (15 entries)
- projects.json: ✅ Accessible (4 projects)
- finances.json: ⚠️ Not yet generated

**DAOstar Discovery:** ✅ Indexed / ❌ Not indexed
```

### Validate Schema Consistency

Check that on-chain registration matches local files:
- `dao.json` daoURI field matches `IDENTITY.md` daoURI
- `members.json` has all active members from `data/members.yaml`
- `projects.json` has all active projects from `data/projects.yaml`

### Prepare Registration Transaction

For first-time registration or daoURI update:
1. Confirm `daoURI` from `IDENTITY.md`
2. Confirm target chain from `IDENTITY.md` chain field
3. Prepare registration contract call:
```markdown
## EIP-4824 Registration Transaction

**Action:** Register / Update daoURI
**Chain:** Gnosis Chain (eip155:100)
**Contract:** EIP-4824 Factory (0xDAOSTAR...)
**Call:** registerDAO(daoURI)
**daoURI:** "https://refi-bcn.github.io/.well-known/dao.json"

→ Ready to submit? Operator to sign and broadcast.
```

## HEARTBEAT Integration

Add to `HEARTBEAT.md`:
- When daoURI in `IDENTITY.md` changes (update on-chain registration)
- When schemas are more than 30 days since last generation
- When on-chain registration address differs from `IDENTITY.md`

## Module Reference

Module location in dao-os: `modules/identity/` (planned)
- Will provide full EIP-4824 registration connector
- Schema validation integration
- DAOstar indexer connectivity check

## Notes

- Off-chain schemas are free to update; on-chain registration requires a transaction
- Registration enables discovery via DAOstar, Tally, Snapshot, and governance tools
- Some platforms read `daoURI` without on-chain registration (pure off-chain is valid)
- Registering on-chain is optional per EIP-4824 — off-chain is sufficient for most tools
- See framework docs: `docs/02-standards/eip-4824-integration.md`
