# DAO OS Agent Guide

This file guides agentic coding tools working in this repository.
Scope: code + documentation under `03 Libraries/dao-os/`.

## Session Startup (OpenClaw / Agent Runtimes)

Read in order:
1. `SOUL.md` — project values and scope
2. `IDENTITY.md` — technical identity
3. `MEMORY.md` — development context and key decisions
4. `skills/` — available module-to-agent bridge skills

## Module-to-Skill Bridge

Each DAO OS module now has a corresponding skill in `skills/`:

| Skill | Module | Description |
|-------|--------|-------------|
| `safe-treasury` | `modules/treasury/safe/` | Safe multisig management |
| `hats-governance` | `modules/governance/` (planned) | Hats Protocol role management |
| `gardens-governance` | `modules/governance/` (planned) | Gardens DAO governance |
| `karma-reputation` | `modules/identity/` (planned) | Karma Gap reputation tracking |
| `eip4824-identity` | `modules/identity/` (planned) | EIP-4824 on-chain registration |

Skills teach agents how to use connectors without requiring code execution.
They follow AgentSkills / OpenClaw format (YAML frontmatter + instructions).

## Workspace Files (v2 additions)

- `SOUL.md` — DAO OS project identity and scope
- `IDENTITY.md` — Technical project identity
- `MEMORY.md` — Development memory and key decisions
- `skills/` — Module-to-agent bridge skills
- `memory/` — Development session logs

## Quick Facts
- Monorepo managed by pnpm workspaces and Turborepo.
- Packages live in `packages/*`, modules in `modules/*/*`, apps in `apps/*`.
- Primary stack: TypeScript, React (Vite) for apps, TS libraries for packages.

## Install
- `pnpm install`

## Common Commands (repo root)
- Dev (all): `pnpm dev`
- Build (all): `pnpm build`
- Lint (all): `pnpm lint`
- Test (all): `pnpm test`
- Format: `pnpm format`
- Clean: `pnpm clean`

## Per-Package Commands
Use pnpm filters to target a single package/app/module:
- `pnpm --filter @dao-os/composer dev`
- `pnpm --filter @dao-os/composer build`
- `pnpm --filter @dao-os/composer lint`
- `pnpm --filter @dao-os/core build`
- `pnpm --filter @dao-os/connectors lint`
- `pnpm --filter @dao-os/module-safe build`

## Single Test Guidance
No test runner or test files are configured in this repo yet.
If a test runner is added, prefer:
- `pnpm --filter <package> test -- <pattern>`
- `pnpm --filter <package> test -- <file>`
Document the runner-specific flag once it exists (e.g., Vitest/Jest).

## Turborepo Notes
- Turbo pipelines in `turbo.json` define build/lint/dev/test/clean.
- `dev` tasks are persistent and uncached; `test` depends on `build`.

## TypeScript & Formatting
- `strict: true` with `noUnusedLocals` and `noUnusedParameters`.
- JSX uses the React 17+ automatic runtime (`jsx: react-jsx`).
- Use `import type` for types.
- Keep formatting consistent with existing code:
  - 2-space indent
  - single quotes
  - semicolons
  - trailing commas

## Imports & Module Boundaries
- Group imports in this order:
  1) External libs (`react`, `reactflow`, etc.)
  2) Workspace packages (`@dao-os/core`, `@dao-os/connectors`)
  3) Local relative imports (`./Component`, `../store/...`)
- Prefer named exports over default exports for shared modules.

## Naming Conventions
- Types/interfaces: `PascalCase` (e.g., `DAOConfig`).
- Components: `PascalCase` (e.g., `DAOComposer`).
- Functions/variables: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` (if used).
- Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities.

## React/Frontend Patterns
- Functional components with hooks (`useState`, `useCallback`).
- Keep component props typed via interfaces.
- Use `ReactFlow` patterns as shown in `DAOComposer.tsx`.

## State Management
- Zustand stores live under `apps/*/src/store`.
- Store shape is defined via an interface; actions are functions on the store.

## Error Handling & Logging
- Connectors should throw or wrap errors using `ConnectorError`.
- Prefer structured error responses in action methods:
  - `{ success: false, error: 'message' }`
- Use `BaseConnector.log` for consistent logging; include context.
- When validating configs, return `ValidationResult` with `errors`/`warnings`.

## Types & Schemas
- Core types live in `packages/core/src/types`.
- Schema exports are re-exported via `packages/core/src/index.ts`.
- Avoid duplicating types across modules; import from `@dao-os/core`.

## Repo Structure (useful paths)
- App: `apps/composer/src` (Vite + React).
- Module example: `modules/treasury/safe/src`.
- Shared libs: `packages/core/src`, `packages/connectors/src`.

## Documentation Rules (Cursor)
These rules apply to documentation/notes across the repo, not app code.
For full Zettelkasten conventions, see the root `AGENTS.md`.

### High-Level Requirements
- Use date-based naming (YYMMDD) for time-bound docs.
- Use descriptive names with spaces for docs.
- Meeting notes must include frontmatter and follow naming rules.
- Use `[[WikiLinks]]` for internal references, markdown links for external.

### Meeting Files (summary)
- Name: `YYMMDD [Meeting Type/Title].md`.
- Required frontmatter:
  ```yaml
  ---
  categories: [Meetings]
  projects:
    - "[[250701 ReFi DAO]]"
    - "[[250701 Regen Coordination]]"
  ---
  ```
- Projects property uses wiki-links and an array format.
- Link meetings from project and temporal notes.
- Meetings can live in temporal folders or root.

### Comms & Documentation Workflow
- Curate from sources; do not invent.
- Include citations for external sources.
- Follow What/Why/How/Now/Next pattern for comms artifacts.
- Preserve originals; write drafts as new files when consolidating.
- Voice: authoritative, plain, people-first; avoid hype and speculation.

### Documentation Consolidation
- Track source files when producing final artifacts.
- Consolidate multiple sources into a single usable artifact.
- Avoid leaving key info only in plans; finalize artifacts.
- Planning docs should include sources, target artifacts, and a consolidation checklist.

## Security & Secrets
- Never commit private keys, seeds, or credentials.
- Use environment variables for secrets.

## When Editing
- Read target files before editing.
- Keep changes scoped to the request.
- Avoid reformatting unrelated code.

## Notes on Missing Tooling
- ESLint exists in package scripts, but no config file was found.
- Tests are not configured; document once added.

## Cursor AI Resources

This project has comprehensive Cursor AI resources for effective development assistance.

### Project-Specific Resources

**Skills** (`.cursor/skills/`):
- `connector-dev` - Develop connectors for blockchain protocol integration
- `dao-composer` - ReactFlow composer development patterns

**Agents** (`.cursor/agents/`):
- `module-architect` - Design and architect new DAO modules

**Master Plans**:
- `PROJECT_SUMMARY.md` - Implementation status and metrics
- `NEXT_STEPS.md` - Development roadmap and priorities

### Inherited Resources

**From Root-Level** (`.cursor/` in Zettelkasten root):
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

### Context Gathering

**Essential Reading**:
1. This `AGENTS.md` file
2. `README.md` - Project overview
3. `PROJECT_SUMMARY.md` - Current status
4. `NEXT_STEPS.md` - Roadmap

**Architecture Understanding**:
- `packages/core/src/` - Core types and schemas
- `packages/connectors/src/` - Connector infrastructure
- `modules/treasury/safe/` - Example module implementation
- `apps/composer/src/` - React application

**Planning Context**:
- `PROJECT_SUMMARY.md` - Phase status (1-2 complete, 3 in progress)
- `NEXT_STEPS.md` - Priority roadmap
- Root plan: `.cursor/plans/dao_os_development_8f314fc0.plan.md`

**For Complete Resource Mapping**: See `CURSOR-RESOURCES.md` in this directory.

**For Cross-Project Context**: See root `CONTEXT-GATHERING-GUIDE.md` for dao-os section.

## Integration Points

**Upstream**: [organizational-os-template](../organizational-os-template/) — extends with DAO-specific modules

**Peers** (see `federation.yaml`):
- [opengrants-os](../opengrants-os/) — grants platform integration
- [ecosystem-canvas](../ecosystem-canvas/) — shared visualization library

**Agent runtime**: [openclaw-source](../openclaw-source/) — primary runtime for DAO workspaces

**Standards**: [organizational-os-framework](../organizational-os-framework/) — EIP-4824, workspace file system

**Cross-repo map**: [ECOSYSTEM-MAP.md](../ECOSYSTEM-MAP.md)

## References
- Root scripts: `package.json`
- Turbo config: `turbo.json`
- TS config: `tsconfig.json`
- Cursor resources: `CURSOR-RESOURCES.md`
- Root context guide: `CONTEXT-GATHERING-GUIDE.md` (in Zettelkasten root)
- Federation: `federation.yaml` (root)