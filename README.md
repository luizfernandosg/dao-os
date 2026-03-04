# DAO OS - DAO Operating System

A member-friendly platform for designing and operating DAOs using composable infrastructure primitives.

## Overview

DAO OS extends Organizational OS with visual design capabilities and integrates with OpenGrants OS for funding management, creating a comprehensive DAO operating system.

**Core Value Proposition:**

- **For DAO Members**: Participate in governance and operations without technical expertise
- **For DAO Operators**: Visual design tools to compose and configure DAO infrastructure
- **For Infrastructure Providers**: Standardized integration patterns for DAO tooling
- **For the Ecosystem**: Interoperable, standards-based DAO architecture

## Architecture

### Three-Layer System

1. **Design Layer**: Visual composer (React Flow) with module library
2. **Operational Layer**: Organizational OS integration for workspace management
3. **Integration Layer**: Connectors to Safe, Hats Protocol, OpenGrants OS, and more

## Project Structure

```
dao-os/
├── packages/          # Shared libraries
│   ├── core/         # Core types and utilities
│   ├── ui/           # Shared UI components
│   └── connectors/   # Module connector interfaces
├── modules/          # DAO infrastructure modules
│   ├── treasury/     # Safe, Zodiac, Octant
│   ├── governance/   # Hats, Snapshot, Gardens
│   ├── funding/      # OpenGrants, Allo, Drips
│   ├── identity/     # EIP-4824, EAS
│   ├── coordination/ # Org OS integration
│   └── dao2dao/      # Proposal Inverter, Conditional Tokens
└── apps/             # Applications
    ├── composer/     # Visual DAO design interface
    ├── dashboard/    # Operational dashboards
    └── portal/       # Member portal
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## Technology Stack

- **Frontend**: React 18+, TypeScript, Vite
- **Visual Design**: React Flow / xyflow
- **Styling**: TailwindCSS with dual-theme system (Functional + DAOcore)
- **Web3**: Wagmi, Viem
- **Visualization**: D3.js, Framer Motion, Canvas API
- **Integrations**: Safe API, Hats Protocol SDK, OpenGrants OS API

## Standards

- EIP-4824 (DAO Identity)
- DAOIP-5 (Grant Pools)
- EIP-1271 (Smart Contract Signatures)
- ERC-1155 (Conditional Tokens)

## License

MIT
