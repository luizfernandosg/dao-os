# DAO OS Cursor Resources

**Last Updated**: 2026-02-01  
**Purpose**: Complete mapping of Cursor AI resources (skills, agents, rules) for the DAO OS project

---

## Quick Reference

### Project-Specific Resources

**Skills** (2):
- `connector-dev` - Develop connectors for blockchain protocol integration
- `dao-composer` - ReactFlow composer development patterns

**Agents** (1):
- `module-architect` - Design and architect new DAO modules

**Rules**: None (follows root-level rules)

**Master Plans**:
- `PROJECT_SUMMARY.md` - Implementation status and metrics
- `NEXT_STEPS.md` - Development roadmap and priorities

### Inherited Resources

**From Root-Level** (`.cursor/`):
- `refi-content-generation` - Generate ReFi ecosystem content
- `quick-push` - Quick git workflow operations
- `knowledge-curator` - Deep research and synthesis
- `meeting-processor` - Process meeting transcripts
- `docs-consolidator` - Consolidate documentation
- `project-reviewer` - Analyze project status

**From User-Level** (`~/.cursor/skills/`):
- `monorepo-operations` - Manage pnpm workspaces and Turborepo
- `git-workflows` - Git operations and PR creation
- `idea-planning` - Apply IDEA Framework
- `knowledge-synthesis` - Curate and synthesize content
- `meeting-notes` - Process meeting transcripts
- `quartz-publishing` - Build Quartz sites (if needed)

---

## Workflows

### Developing a New Connector

**Uses**: `connector-dev` skill

**Process**:
1. Read `packages/connectors/src/BaseConnector.ts` to understand base patterns
2. Check `packages/connectors/src/SafeConnector.ts` for example implementation
3. Extend `BaseConnector` class with required methods:
   - `initialize()` - Setup and validation
   - `executeAction()` - Action execution
   - `validateConfig()` - Configuration validation
4. Use `ConnectorError` for error handling
5. Follow structured response pattern: `{ success: false, error: 'message' }`
6. Add connector to `packages/connectors/src/index.ts` exports

**Commands**:
```bash
# Build connectors package
pnpm --filter @dao-os/connectors build

# Lint connectors
pnpm --filter @dao-os/connectors lint
```

**Files**:
- `packages/connectors/src/BaseConnector.ts` - Base class
- `packages/connectors/src/types.ts` - Connector types
- `packages/connectors/src/errors.ts` - Error classes

### Designing a New Module

**Uses**: `module-architect` agent

**Process**:
1. Review `modules/MODULE_SPEC.md` for module specification guide
2. Check `modules/TEMPLATE/` for module template structure
3. Review existing module: `modules/treasury/safe/` as reference
4. Define module interface and API in `src/index.ts`
5. Implement module logic in `src/module.ts`
6. Create configuration schema in `src/config.schema.ts`
7. Document in `README.md` following module spec

**Commands**:
```bash
# Build module
pnpm --filter @dao-os/module-[name] build

# Test module (once tests are configured)
pnpm --filter @dao-os/module-[name] test
```

**Files**:
- `modules/MODULE_SPEC.md` - Module specification guide
- `modules/TEMPLATE/` - Module template files
- `modules/treasury/safe/` - Example implementation

### Developing Composer UI

**Uses**: `dao-composer` skill

**Process**:
1. Review `apps/composer/src/` React Flow patterns
2. Check Zustand stores in `apps/composer/src/store/`
3. Follow React Flow patterns from `DAOComposer.tsx`
4. Use React hooks (`useState`, `useCallback`) for state management
5. Keep component props typed via interfaces
6. Follow import order: external → workspace packages → local

**Commands**:
```bash
# Dev mode
pnpm --filter @dao-os/composer dev

# Build
pnpm --filter @dao-os/composer build

# Lint
pnpm --filter @dao-os/composer lint
```

**Files**:
- `apps/composer/src/` - React application source
- `apps/composer/src/store/` - Zustand stores
- `packages/core/src/types/` - Core types used by composer

### Monorepo Operations

**Uses**: `monorepo-operations` skill (user-level)

**Process**:
1. Use pnpm filters for package-specific commands
2. Run root-level commands for all packages
3. Check `turbo.json` for pipeline configuration
4. Use Turborepo caching for builds

**Commands**:
```bash
# Install all dependencies
pnpm install

# Dev mode (all packages)
pnpm dev

# Build all packages
pnpm build

# Single package
pnpm --filter @dao-os/[package] [command]
```

**Files**:
- `package.json` - Root package configuration
- `turbo.json` - Turborepo pipeline configuration
- `pnpm-workspace.yaml` - Workspace configuration

---

## Context Gathering

### What to Read First

1. **`AGENTS.md`** - Comprehensive agent guide with all conventions
2. **`README.md`** - Project overview and architecture
3. **`PROJECT_SUMMARY.md`** - Current implementation status
4. **`NEXT_STEPS.md`** - Development priorities and roadmap

### Architecture Understanding

**Core Architecture**:
- `packages/core/src/` - Core types, schemas, utilities (Zod validation)
- `packages/connectors/src/` - Base connector classes and error handling
- `modules/` - DAO infrastructure modules (treasury/safe example)
- `apps/composer/` - Visual design interface (React + Vite)

**Module System**:
- `modules/MODULE_SPEC.md` - Module specification guide
- `modules/TEMPLATE/` - Template for new modules
- `modules/treasury/safe/` - Complete Gnosis Safe module example

**Standards**:
- EIP-4824 (DAO registry)
- DAOIP-5 (DAO proposal standard)
- EIP-1271 (signature validation)

### Planning Context

**Current Status** (`PROJECT_SUMMARY.md`):
- Phase 1-2: ✅ Complete (Foundation, Core Module & Composer)
- Phase 3: 🚧 In Progress (Module Expansion)
- Phase 4-5: 📋 Planned (Operational Layer, Integration & Polish)

**Next Priorities** (`NEXT_STEPS.md`):
- Priority 1: Core modules (Hats Protocol, OpenGrants OS)
- Priority 2: Applications (Dashboard, Member Portal)
- Priority 3: Integration & Deployment (Org OS integration, deployment workflows)
- Priority 4: Advanced features (Proposal Inverter, Conditional Tokens)
- Priority 5: Quality & Production (testing, security audit)

**Root Plan**: `.cursor/plans/dao_os_development_8f314fc0.plan.md`

### Code Navigation

**Entry Points**:
- `apps/composer/src/` - React application entry
- `packages/core/src/index.ts` - Core package exports
- `packages/connectors/src/index.ts` - Connector exports
- `modules/treasury/safe/src/index.ts` - Safe module API

**Key Directories**:
- `packages/core/src/types/` - Core type definitions
- `packages/connectors/src/` - Connector implementations
- `modules/treasury/safe/src/` - Safe module implementation
- `apps/composer/src/store/` - Zustand state management

**Module Structure**:
```
modules/[category]/[module-name]/
├── src/
│   ├── index.ts          # Public API
│   ├── module.ts         # Module implementation
│   ├── types.ts          # Module types
│   └── config.schema.ts  # Configuration schema
├── package.json
└── README.md
```

### Search Patterns

**When looking for connector patterns**: 
- Check `packages/connectors/src/BaseConnector.ts` (base class)
- See `packages/connectors/src/SafeConnector.ts` (example)
- Read `AGENTS.md` connector-dev skill section

**When working on modules**:
- Read `modules/MODULE_SPEC.md` (specification)
- Check `modules/TEMPLATE/` (template structure)
- Review `modules/treasury/safe/` (complete example)

**When designing UI**:
- See `apps/composer/src/` (React Flow patterns)
- Check `apps/composer/src/store/` (Zustand stores)
- Review `packages/core/src/types/` (type definitions)

**When understanding architecture**:
- Read `README.md` (overview)
- Check `PROJECT_SUMMARY.md` (status)
- Review `NEXT_STEPS.md` (roadmap)

### Integration Points

**Depends on**:
- EIP-4824, DAOIP-5, EIP-1271 standards
- React Flow (@xyflow/react) for visual composer
- Zod for schema validation
- pnpm workspaces + Turborepo for monorepo

**Used by**:
- Organizational OS (workspace generation, EIP-4824 identity, federation)
- OpenGrants OS (grant discovery, fund flow visualization, DAOIP-5 standard)
- Ecosystem Canvas (fund flow visualization components)

**Shares patterns with**:
- **organizational-os**: pnpm workspaces, Turborepo, EIP-4824, federation
- **opengrants-os**: pnpm workspace, React Flow visualization
- **ecosystem-canvas**: React Flow components, design system

---

## Skill Details

### connector-dev

**Location**: `.cursor/skills/connector-dev/SKILL.md`

**Purpose**: Develop connectors for blockchain protocol integration

**Key Patterns**:
- Extend `BaseConnector` class
- Use `ConnectorError` for error handling
- Structured responses: `{ success: false, error: 'message' }`
- Configuration validation with `ValidationResult`

**When to Use**: Creating new connectors, implementing actions, working with connector patterns

### dao-composer

**Location**: `.cursor/skills/dao-composer/SKILL.md`

**Purpose**: ReactFlow composer development patterns

**Key Patterns**:
- React Flow (@xyflow/react) integration
- Zustand state management
- Functional components with hooks
- Typed component props

**When to Use**: Building visual composer UI, working with React Flow, managing composer state

---

## Agent Details

### module-architect

**Location**: `.cursor/agents/module-architect.md`

**Purpose**: Design and architect new DAO modules

**Key Responsibilities**:
- Design new DAO modules
- Define module interfaces and APIs
- Plan module interactions and dependencies
- Create module specifications
- Ensure architectural consistency

**When to Use**: Planning new modules, designing module interfaces, architecting module interactions

**Process**:
1. Requirements analysis
2. Interface design
3. Implementation planning
4. Specification creation
5. Integration planning

---

## Related Documentation

- [[AGENTS.md]] - Comprehensive agent guide
- `PROJECT_SUMMARY.md` - Implementation status
- `NEXT_STEPS.md` - Development roadmap
- `modules/MODULE_SPEC.md` - Module specification guide
- Root `AGENTS.md` - Zettelkasten conventions
- [[CONTEXT-GATHERING-GUIDE.md]] - Per-project context instructions (root)

---

**Note**: This document maps Cursor resources specific to DAO OS. For root-level and user-level resources, see [[CURSOR-CONSTELLATION.md]] (root).
