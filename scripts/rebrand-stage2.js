#!/usr/bin/env node
/**
 * scripts/rebrand-stage2.js
 * Small helper to apply safe textual replacements for staged rebrand batches.
 * - Designed to run in CI with --batch <n>
 * - Supports --dry-run (no writes) and --commit (makes a git commit)
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const batches = {
  1: [
    // package scope renames and package name tokens (presentation + imports)
    { from: '@abov3-ai/', to: '@abov3-ai/' },
    { from: '"name": "opencode-legacy-legacy', to: '"name": "opencode-legacy-legacy-legacy' },
  ],
  2: [
    // examples and imports in JS/TS
    { from: "from \"opencode/", to: "from \"abov3/" },
    { from: "require('abov3/", to: "require('abov3/" },
  ],
}

function walk(dir, cb) {
  for (const name of fs.readdirSync(dir)) {
    const fp = path.join(dir, name)
    const st = fs.statSync(fp)
    if (st.isDirectory()) walk(fp, cb)
    else cb(fp)
  }
}

function applyBatch(batchId, { dryRun }) {
  const rules = batches[batchId]
  if (!rules) throw new Error('Unknown batch: ' + batchId)

  const changedFiles = []
  walk(process.cwd(), (fp) => {
    if (fp.includes('node_modules') || fp.includes('.git') || fp.includes('bun.lock')) return
    if (!fp.match(/\.(js|ts|json|md|mdx|mjs|tsx|jsx)$/)) return
    let src = fs.readFileSync(fp, 'utf8')
    let out = src
    for (const r of rules) {
      out = out.split(r.from).join(r.to)
    }
    if (out !== src) {
      changedFiles.push(fp)
      if (!dryRun) fs.writeFileSync(fp, out, 'utf8')
    }
  })
  return changedFiles
}

function main() {
  const args = process.argv.slice(2)
  const batch = args.indexOf('--batch') !== -1 ? args[args.indexOf('--batch')+1] : null
  const dryRun = args.includes('--dry-run')
  const commit = args.includes('--commit')

  if (!batch) {
    console.error('Usage: rebrand-stage2.js --batch <n> [--dry-run] [--commit]')
    process.exit(2)
  }

  console.log(`Running rebrand batch ${batch} (dryRun=${dryRun})`)
  const changed = applyBatch(batch, { dryRun })
  console.log(`Files changed: ${changed.length}`)
  for (const f of changed) console.log('  -', f)

  if (commit && !dryRun && changed.length) {
    execSync('git add ' + changed.map((p) => '"' + p + '"').join(' '))
    execSync(`git commit -m "rebrand: batch ${batch} apply"`)
    console.log('Committed changes')
  }
}

main()
