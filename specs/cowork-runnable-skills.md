# Spec: make the skills cowork-runnable

**Status:** deferred (parked 2026-06-24) · **Target branch:** TBD · **Last updated:** 2026-06-24

> **Parked.** The async loop already in place (cowork writes the worklog → CLI enriches → cowork reads
> the bank) covers the common workflow, and the port carries permanent duplication/sync cost for gain
> that's still speculative. Revisit only if real friction emerges from driving day-to-day in cowork —
> not before. Kept for design history.

## Why

The workflow goal is to **drive from cowork**, with this repo as the tool cowork utilizes. Today the
four skills live only in `experience-engine/.claude/skills/`, so they load only in the Claude Code
(CLI) runtime, in this repo — cowork (a different runtime, sandboxed to brainspace) can't invoke them.
But the recurring work is agent-driven (read/write brainspace markdown + YAML), which cowork *can* do
now that it mounts the brainspace root and reads the bank. So the gap is access to the **instructions**,
not capability.

## What's portable vs. CLI-bound

- **Portable (agent-driven, no code):** enrich-from-worklog, tailored-render, claim extraction/curation,
  voice analysis. These are brainspace reads/writes — cowork can run them given the skill instructions.
- **CLI-bound (`bun` scripts, repo + bun required, outside cowork's mount):**
  - `buildIndex` — rebuilds the convenience `index.md` (a regenerable view).
  - `extractGitData` / `processBacklog` — structure messy logs (the `project-summary` skill marks these
    **optional**; raw logs can be read directly).
  - `getPosts` / `htmlToMarkdown` — one-time blog-corpus download.

So only a few infrequent / optional / one-time helpers stay CLI-only.

## Plan

1. **Port the four `SKILL.md` to cowork's custom-skill space** (cowork supports custom skills). Repo
   stays **canonical**; cowork copies are generated from it — single-source with a sync step, not a
   hand-maintained fork.
2. **Keep the `bun` scripts as a CLI-side helper layer.** cowork hands these off (structure a new
   project's raw git log; rebuild the index) to the CLI. Document the handoff in the skills.
3. **Revise the division of labor** in `knowledge-base.md`: enrichment/renders are no longer
   *CLI-only* — cowork can drive them against brainspace; the CLI owns the deterministic parsing +
   index build. (This relaxes the Phase 0 rule, which assumed cowork couldn't reach the bank.)
4. **Sync discipline:** a check (or note) so the cowork copies don't drift from the repo canonical.

## Open questions

- Exact mechanism/format for cowork custom skills (port target + any frontmatter differences).
- Whether `buildIndex` should become runtime-agnostic (so cowork can refresh the index without the
  CLI) or stay a CLI handoff.
- How to enforce the repo→cowork sync (manual refresh vs. a generated-from-canonical check).

## Depends on

`kb-contract-rewire` (Phases 1–4) landed and tested first.
