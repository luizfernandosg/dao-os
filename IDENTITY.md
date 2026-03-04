# IDENTITY.md — DAO OS Project Identity

---

- **Name:** DAO OS
- **Type:** Project / Development Workspace
- **Emoji:** 🏗️
- **Description:** Visual DAO design platform with modular onchain/offchain integration

---

## Repository Structure

- **Monorepo:** pnpm + Turborepo
- **Packages:** `packages/core`, `packages/connectors`
- **Modules:** `modules/treasury/safe/`, `modules/governance/`, `modules/funding/`, `modules/identity/`, `modules/coordination/`, `modules/dao2dao/`
- **Apps:** `apps/composer/` (React + Vite + ReactFlow)
- **Skills:** `skills/` (module-to-skill bridge — NEW)

---

## Standards

- **EIP-4824** — DAO Common Interfaces (organizational identity)
- **DAOIP-5** — Grant Pools
- **EIP-1271** — Smart Contract Signatures
- **AgentSkills** — Skills format for module-to-agent bridge

---

## Related Projects

- **organizational-os-template** — Upstream template (operational workspace)
- **organizational-os-framework** — Standards reference
- **openclaw-source** — Reference agent runtime for skills compatibility

---

## Development Stack

- TypeScript, React 18, Vite
- ReactFlow / xyflow
- Zustand, Zod, TailwindCSS
- wagmi, viem, ethers, Safe SDK
