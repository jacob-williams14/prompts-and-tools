# Prompts & Tools

A personal repository for AI-assisted tooling. The active project turns Jacob's project history into
career artifacts — built around an **experience bank** with cheap, on-demand **renders** (LinkedIn,
resume, job-description-tailored bullets), driven by **Claude Code skills**, with **no API usage**.

## Projects

### [Project Experience Artifacts](./project-experience-artifacts/)

Turns project data (git logs, CSV backlogs, blog posts) into career artifacts. A tagged claim **bank**
(`experience-bank/claims.yaml`) is the source of truth; documents are renders over it. The work runs
through four Claude Code skills — `project-summary`, `experience-bank`, `tailored-render`,
`voice-signature` — not CLI generators. See its [README](./project-experience-artifacts/README.md).

```text
datasources → project-summary → experience-bank (the bank) → tailored-render → documents
```

## For AI agents

Operating guidance for Claude Code, Warp, and other agents is consolidated in
**[`AGENTS.md`](./AGENTS.md)** (the source of truth). `CLAUDE.md` imports it; `WARP.md` points to it —
so every agent works from the same instructions.

## Tech

- **Runtime:** [Bun](https://bun.sh) (direct TypeScript execution, no build step)
- **Storage:** a YAML claim bank; deterministic parsers for git logs / CSVs / blog posts
- **Generation:** done inline by the coding agent via skills — no API keys or provider SDK

## Status

Active. The repo was migrated from API-backed generator scripts to the bank + skills model; see
[`specs/STATUS.md`](./project-experience-artifacts/specs/STATUS.md) for the roadmap and
[`CHANGELOG.md`](./CHANGELOG.md) for what changed.
