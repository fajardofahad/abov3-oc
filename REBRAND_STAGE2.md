Stage‑2 Rebrand: package/import renames and CI runbook

Goal
- Safely rename package scopes, package.json names, and import specifiers from the old brand to the new brand in small, reviewable batches.
- Regenerate lockfiles using the project's package manager in CI (no hand edits).
- Run builds/tests in CI after each batch.

High level process
1. Run a scripted batch that applies textual and package.json renames to the repository (commits to a feature branch).
2. CI installs deps (using Bun when present), regenerates lockfile, runs build & tests.
3. Open a PR for review. After approval, merge and repeat next batch.

Files provided
- `scripts/rebrand-stage2.js` — Node script that applies replacements per-batch. Supports dry-run and committing changes.
- `.github/workflows/rebrand-stage2.yml` — GitHub Actions workflow that runs the script, regenerates lockfiles with Bun, and runs build/tests.

Batch strategy (recommended)
- Batch 1: NPM/JS package scope renames
  - Replace `@abov3-ai/` → `@abov3-ai/` in package.json `name` fields and in import specifiers within JS/TS files.
  - Update `bin` keys where user-facing executables should be aliased (but preserve `opencode-legacy` package to preserve the `opencode` binary).
- Batch 2: Internal package renames and examples
  - Replace JS/TS imports that use `opencode/...` to `abov3/...` where appropriate (careful with Go import paths — handle in a later batch).
- Batch 3: Go module path & binary rename (risky)
  - Rename Go import paths `github.com/sst/opencode` → `github.com/fajardofahad/abov3-oc` OR update module uses to the new module. Do this only after JS packages are published or via a well-tested CI job.

Safety rules
- Never hand-edit lockfiles. CI will run the package manager to regenerate them.
- Make small, single-purpose commits per batch and open PRs.
- Do not change public API names used by other repos without a deprecation plan. Consider publishing `opencode-legacy` packages that forward to `abov3`.

How to run locally (dry-run recommended)

Node 18+ is required locally to run the script.

Dry run (shows files that would be changed):

```powershell
node ./scripts/rebrand-stage2.js --batch 1 --dry-run
```

Apply batch and commit to a branch (CI will regenerate lockfile):

```powershell
node ./scripts/rebrand-stage2.js --batch 1 --commit
```

What CI does (workflow summary)
- Checkout
- Setup Node & Bun
- Run the rebrand script for the requested batch
- Run `bun install` to regenerate `bun.lock`
- Run available `build` and `test` scripts (if present) and fail on errors

Notes and next steps
- Review `rebrand-batches` in `scripts/rebrand-stage2.js` and update mappings before running for real.
- After merging batches, consider a final sweep to update remaining doc strings and to publish renamed packages in the proper order.
