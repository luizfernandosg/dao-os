---
name: karma-reputation
version: 1.0.0
description: Track, report, and manage organizational reputation via Karma Gap
author: dao-os
category: governance
metadata:
  openclaw:
    requires:
      env: []
      bins: []
      config: []
---

# Karma Reputation (dao-os)

## What This Is

Reputation tracking skill using Karma Gap. Reads organizational reputation scores and activity, generates grant reports, assesses member contributions, and maintains the organization's Karma profile as an accountability tool for funding.

## When to Use

- When preparing a grant report ("what have we done this period?")
- When assessing which chapters/members are active vs. inactive
- "What does our Karma Gap profile show?"
- Before applying for funding (show track record)
- For quarterly/annual organizational retrospectives

## When NOT to Use

- For on-chain governance actions → use gardens-governance or hats-governance
- For financial tracking → use capital-flow

## Karma Gap Basics

Karma Gap is a reputation and accountability layer for grants and public goods:
- **Project**: An organization or initiative with a Karma Gap profile
- **Milestones**: Deliverables with completion status
- **Impact Reports**: Periodic updates on what was accomplished
- **Attestations**: On-chain verification of completions
- **Grantee Score**: Derived from completion rate and impact

## Configuration

Declare Karma Gap project in `TOOLS.md`:
```markdown
## Funding Platform Accounts
- Karma Gap: https://gap.karmahq.xyz/project/[project-slug]
```

## Common Operations

### Read Current Profile

Fetch and summarize Karma Gap status:
```markdown
## Karma Gap Status — YYYY-MM-DD

**Project:** [Org Name]
**Score:** 87/100
**Total Grants:** 5 ($25,000 total)
**Completion Rate:** 92% (11/12 milestones)

### Active Grant: Regen Coordination Season 2
- Budget: $8,000
- Milestones:
  - [x] M1: Knowledge commons setup (completed 2026-01-15)
  - [x] M2: Regional node onboarding (completed 2026-02-01)
  - [ ] M3: Impact assessment (due 2026-03-31)
  
### Next Report Due: 2026-03-31
```

### Generate Impact Report

Draft an impact report from recent activity:
1. Read recent meeting notes in `packages/operations/meetings/`
2. Read project status from `data/projects.yaml`
3. Match activities to open milestones
4. Draft report:
```markdown
## Impact Report — [Grant Name] — M3

**Reporting Period:** 2026-02-01 → 2026-03-31
**Milestone:** M3 — Impact Assessment

### Accomplished
- Processed 12 council meeting notes → action items tracked
- Identified 8 funding opportunities via funding-scout
- Distributed 4 knowledge curation reports to federation hub
- Onboarded 2 new regional nodes (NYC, Bloom)

### Metrics
- Meeting notes processed: 12
- Action item completion rate: 78%
- Knowledge curations published: 4
- New federation nodes: 2

### Evidence
- [Link to meeting notes]
- [Link to hub knowledge]
- [Link to federation members]

→ Ready to submit on Karma Gap? Operator to publish via Karma UI.
```

### Chapter Activity Assessment

For network-level reporting (local nodes, chapters):
1. Read `data/members.yaml` for active chapters/members
2. Check Karma Gap profiles for each chapter (if configured in `TOOLS.md`)
3. Generate activity matrix:
```markdown
## Chapter Activity — Q1 2026

| Chapter | Last Active | Karma Score | Status |
|---------|-------------|-------------|--------|
| ReFi BCN | 2026-02-20 | 92 | 🟢 Active |
| NYC | 2026-02-15 | 78 | 🟢 Active |
| Bloom | 2026-01-30 | 45 | 🟡 Low |
| Bahia | 2025-11-01 | 12 | 🔴 Inactive |
```

## HEARTBEAT Integration

Add to `HEARTBEAT.md`:
- Impact report due dates
- Milestones approaching deadline
- Grants with overdue reports (risk to reputation score)

## Notes

- Karma Gap profiles are public — part of grant accountability infrastructure
- Reports submitted on-chain (low-cost attestation)
- Grantee score affects funding eligibility on some platforms (Gitcoin, etc.)
- Use this skill before funding conversations to have track record ready
- Module status: planned in dao-os `modules/identity/` for full integration
