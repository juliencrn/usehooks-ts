import { path, fs, $ } from 'zx'

import { getHooks } from './utils/get-hooks.js'

const SOURCE_DIR = path.resolve('./packages/usehooks-ts/src')
const GITHUB_REPO = `juliencrn/usehooks-ts`
const GITHUB_ISSUE_PATH = `${GITHUB_REPO}/issues/423`
const EXCLUDED_HOOK = ['useIsomorphicLayoutEffect']

// Read hook list from the `generated/typedoc/all.json` file
const hooks = getHooks()
  // Filter excluded hooks
  .filter(hook => !EXCLUDED_HOOK.includes(hook.name))
  // For each hook, check if there is a test file
  .map(hook => {
    const files = fs.readdirSync(path.resolve(SOURCE_DIR, hook.name))
    return { ...hook, hasTest: files.some(isTestFile) }
  })
  // Generate the markdown lines
  .map(hook => {
    const url = `https://github.com/${GITHUB_REPO}/tree/master/packages/usehooks-ts/src/${hook.name}`
    return {
      ...hook,
      markdown: `- [${hook.hasTest ? 'x' : ' '}] [\`${hook.name}\`](${url})`,
    }
  })

// Compute the state of the issue
const url = `https://github.com/${GITHUB_ISSUE_PATH}`
const testedCount = hooks.filter(({ hasTest }) => hasTest).length
const state = hooks.length === testedCount ? 'closed' : 'open'
const body = hooks.map(({ markdown }) => markdown).join('\n')

// Update the github testing issue
await $`gh api \
--method PATCH \
-H "Accept: application/vnd.github+json" \
-H "X-GitHub-Api-Version: 2022-11-28" \
/repos/${GITHUB_ISSUE_PATH} \
-f body=${issueTemplate(body)} \
-f state=${state}
`

console.log(`\n\n✅ Issue successfully updated! -> ${url}`)

// Utils

function isTestFile(filename) {
  return /^use[A-Z][a-zA-Z]*.test.tsx?$/.test(filename)
}

function issueTemplate(body) {
  return `## Overview

This GitHub issue serves as a central hub for the unit-testing journey of our React hook library. Our goal is to ensure robust and reliable testing for each individual hook in the library.

## Objectives

1. **Comprehensive Testing**: Write unit tests for each hook to ensure thorough coverage of functionality.
2. **Consistent Test Structure**: Maintain a consistent structure/format for unit tests across all hooks.
3. **Documentation**: Document the purpose and usage of each test to enhance overall project understanding.

## Getting Started

1. Fork the repository to your account.
2. Create a new branch for your tests: git checkout -b feature/hook-name-tests.
3. Write tests for the specific hook in \`packages/usehooks-ts/src/useExample/useExample.test.ts\`.
4. Ensure all tests pass before submitting a pull request.

## Hooks to Test

${body}

Let's ensure our hooks are well-tested and reliable!`
}
