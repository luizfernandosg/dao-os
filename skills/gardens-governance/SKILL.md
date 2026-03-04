---
name: gardens-governance
version: 1.0.0
description: Coordinate Gardens-based DAO governance and proposals
author: dao-os
category: governance
metadata:
  openclaw:
    requires:
      env: []
      bins: []
      config: []
---

# Gardens Governance (dao-os)

## What This Is

Governance coordination skill for organizations using Gardens (formerly Colony). Reads proposal state, tracks governance activity, prepares proposals for human submission, and integrates with the organization's meeting and project workflows.

## When to Use

- "What proposals are active in our Gardens?"
- "What's the status of proposal #42?"
- "We agreed in the meeting to create a proposal for [X] — can you draft it?"
- "What's the quorum status on pending proposals?"
- "Who hasn't voted on the active proposal?"

## When NOT to Use

- To submit or vote on proposals directly → always present for human action
- For Snapshot-based governance → different protocol (no connector yet)
- For treasury operations → use safe-treasury skill

## Gardens Basics

Gardens is a governance system based on Colony:
- **Gardens**: A DAO instance with token holders and agreements
- **Proposals**: Funding requests or governance actions
- **Conviction Voting**: Votes accumulate conviction over time
- **Agreements**: Covenant (org values + rules)
- **Staking**: Token staking to back proposals

## Configuration

Declare Gardens DAO in `IDENTITY.md`:
```markdown
## Governance Infrastructure
- **Gardens DAO:** 0xGARDENS_CONTRACT (Gnosis Chain)
```

## Common Operations

### Read Active Proposals

Fetch and summarize current proposals:
```markdown
## Gardens Proposals — YYYY-MM-DD

### Active (Voting)
1. Proposal #42: Fund regional coordination Q2 ($2,000 XDAI)
   - Conviction: 67% (threshold: 80%)
   - End: 2026-03-15
   - Status: In progress

### Pending (Needs support)
2. Proposal #43: Hire knowledge curator
   - Conviction: 12%
   - Needs: ~45% more conviction to pass

### Recently Passed
- Proposal #41: Knowledge commons infrastructure ✅
```

### Proposal Drafting

When meeting notes contain a decision to create a proposal:
1. Extract key information: title, amount, rationale, milestones
2. Check against Gardens agreement (org covenant) for eligibility
3. Draft proposal text:
```markdown
## Draft Gardens Proposal

**Title:** Fund Knowledge Commons Infrastructure Q1 2026
**Amount:** 1,500 XDAI
**Beneficiary:** Safe 0x...
**Milestones:**
- M1 (30 days): Setup KOI-net node and federation hub
- M2 (60 days): First knowledge curation cycle complete

**Rationale:** 
[Link to meeting decision] — Council agreed on 2026-02-20 to prioritize
knowledge commons infrastructure for the regen-coordination network...

→ Ready to submit? Operator to submit via Gardens UI.
```

### Meeting Integration

After processing a meeting note, check for governance decisions:
- "we agreed to create a proposal for..." → trigger proposal draft
- "we decided to vote yes/no on..." → create HEARTBEAT alert for upcoming vote
- "we need quorum on..." → check current proposal status

## HEARTBEAT Integration

Add to `HEARTBEAT.md`:
- Active proposals with conviction < 24h from deadline
- Proposals needing member participation (low quorum)
- Passed proposals awaiting execution

## Notes

- Gardens proposals require token holders to submit (not contract call)
- Conviction voting accumulates over time — early support matters
- Check org agreement for funding limits and eligibility criteria
- Module status: planned in dao-os `modules/governance/` — currently documentation-only
- Staking: Token staking required to create some proposal types
