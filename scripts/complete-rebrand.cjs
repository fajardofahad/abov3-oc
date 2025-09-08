#!/usr/bin/env node
/**
 * Complete rebranding script for ABOV3: Genesis CodeForger
 */

const fs = require('fs')
const path = require('path')

const replacements = [
  // Package names and scopes
  { from: /@opencode-ai\//g, to: '@abov3-ai/' },
  { from: /"abov3"/g, to: '"abov3"' },
  { from: /'abov3'/g, to: "'abov3'" },
  
  // Import statements
  { from: /from "opencode\//g, to: 'from "abov3/' },
  { from: /from 'opencode\//g, to: "from 'abov3/" },
  { from: /require\(['"]opencode\//g, to: "require('abov3/" },
  
  // Binary references
  { from: /opencode\.exe/g, to: 'abov3.exe' },
  { from: /abov3-windows/g, to: 'abov3-windows' },
  { from: /abov3-darwin/g, to: 'abov3-darwin' },
  { from: /abov3-linux/g, to: 'abov3-linux' },
  
  // Environment variables
  { from: /ABOV3_/g, to: 'ABOV3_' },
  
  // URLs and domains
  { from: /opencode\.ai/g, to: 'abov3.ai' },
  { from: /github\.com\/sst\/opencode/g, to: 'github.com/fajardofahad/abov3-genesis-codeforger' },
  
  // Product names
  { from: /ABOV3: Genesis CodeForger CLI/g, to: 'ABOV3: Genesis CodeForger CLI' },
  { from: /ABOV3: Genesis CodeForger/g, to: 'ABOV3: Genesis CodeForger' },
  { from: /ABOV3 CLI/g, to: 'ABOV3 CLI' },
  
  // File paths and configs
  { from: /\.opencode\//g, to: '.abov3/' },
  { from: /opencode\.json/g, to: 'abov3.json' },
  { from: /opencode\.yml/g, to: 'abov3.yml' },
  { from: /opencode\.yaml/g, to: 'abov3.yaml' },
  { from: /opencode\.config/g, to: 'abov3.config' },
  
  // Go package paths
  { from: /github\.com\/sst\/opencode/g, to: 'github.com/fajardofahad/abov3-genesis-codeforger' },
  { from: /abov3-go/g, to: 'abov3-go' },
  
  // Theme references
  { from: /themes\/opencode\.json/g, to: 'themes/abov3.json' },
]

const skipDirs = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  'coverage',
  'tmp',
  '.turbo'
]

const fileExtensions = [
  '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs',
  '.json', '.yml', '.yaml',
  '.md', '.mdx',
  '.go', '.mod',
  '.sh', '.cmd', '.ps1',
  '.txt', '.toml',
  '.html', '.css'
]

function shouldSkipDir(dirPath) {
  return skipDirs.some(skip => dirPath.includes(skip))
}

function shouldProcessFile(filePath) {
  return fileExtensions.some(ext => filePath.endsWith(ext))
}

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    let modified = false
    
    for (const rule of replacements) {
      const newContent = content.replace(rule.from, rule.to)
      if (newContent !== content) {
        content = newContent
        modified = true
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8')
      return true
    }
    
    return false
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message)
    return false
  }
}

function walkDirectory(dir, callback) {
  if (shouldSkipDir(dir)) return
  
  const items = fs.readdirSync(dir)
  
  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      walkDirectory(fullPath, callback)
    } else if (stat.isFile()) {
      callback(fullPath)
    }
  }
}

function main() {
  console.log('Starting complete rebranding to ABOV3: Genesis CodeForger...')
  
  const modifiedFiles = []
  const rootDir = process.cwd()
  
  walkDirectory(rootDir, (filePath) => {
    if (shouldProcessFile(filePath)) {
      if (processFile(filePath)) {
        modifiedFiles.push(filePath)
        console.log(`✓ Updated: ${path.relative(rootDir, filePath)}`)
      }
    }
  })
  
  console.log(`\nRebranding complete! Modified ${modifiedFiles.length} files.`)
  
  // Special file renames
  const renames = [
    { from: 'packages/opencode', to: 'packages/abov3-legacy' },
    { from: '.opencode', to: '.abov3' }
  ]
  
  for (const rename of renames) {
    const fromPath = path.join(rootDir, rename.from)
    const toPath = path.join(rootDir, rename.to)
    
    if (fs.existsSync(fromPath) && !fs.existsSync(toPath)) {
      fs.renameSync(fromPath, toPath)
      console.log(`✓ Renamed: ${rename.from} -> ${rename.to}`)
    }
  }
}

if (require.main === module) {
  main()
}