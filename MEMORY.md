# MEMORY.md — DAO OS Development Memory

_Development context and key decisions for the dao-os project._

---

## Quick Index

- **Identity:** `IDENTITY.md`
- **Soul:** `SOUL.md`
- **Session notes:** `memory/`
- **Architecture:** `AGENTS.md` / `packages/core/src/types/`
- **Module template:** `modules/TEMPLATE/`
- **Skills:** `skills/` (module-to-agent bridge)

---

## Key Decisions

- [2026-02-20] Adopted OpenClaw/AgentSkills-compatible skills system alongside existing modules
- [2026-02-20] Each module now has a corresponding `skills/*/SKILL.md` bridge
- Composer generates OpenClaw-compatible workspaces from DAO blueprints
- Safe module is the reference implementation for all module patterns

---

## Architecture Notes

### Module Pattern
Each module: `connector.ts` (BaseConnector) + `types.ts` + `module.yaml` + React components + `skills/SKILL.md`

### Skills Bridge
`skills/<module-name>/SKILL.md` teaches agents how to use each connector/module without code — pure documentation and instructions.

### Workspace Generation
Composer app → DAO blueprint → generates organizational-os-template instance with selected modules pre-configured.

---

## Active Development

- Phase 1-2 complete: core package, connectors, Safe module, composer app
- Phase 3 in progress: Hats Protocol, OpenGrants connector, dashboard
- Phase 4 planned: Org OS integration, member portal, DAO2DAO
