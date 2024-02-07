#!/usr/bin/env zx

import { path, fs, $ } from 'zx'

import { isHookFile, isTestFile } from './utils.mjs'

const GITHUB_REPO = `juliencrn/usehooks-ts`
const GITHUB_ISSUE_PATH = `${GITHUB_REPO}/issues/423`
const hookDir = path.resolve('./packages/usehooks-ts/src')
const excludeHooks = [
  'useSsr', // @deprecated
  'useImageOnLoad', // @deprecated
  'useElementSize', // @deprecated
  'useFetch', // @deprecated
  'useIsomorphicLayoutEffect', // Combination of useLayoutEffect and useEffect without custom logic
]

function generateHookListBody() {
  const initialState = {
    body: '',
    total: 0,
    hasTestCount: 0,
  }

  return fs
    .readdirSync(hookDir)
    .filter(isHookFile)
    .filter(filename => !excludeHooks.includes(filename))
    .reduce((acc, filename) => {
      const subFiles = fs.readdirSync(path.resolve(hookDir, filename))
      const hasTest = !!subFiles.find(isTestFile)
      const url = `https://github.com/${GITHUB_REPO}/tree/master/packages/usehooks-ts/src/${filename}`
      const newLine = `- [${hasTest ? 'x' : ' '}] [\`${filename}\`](${url})\n`
      return {
        body: `${acc.body}${newLine}`,
        total: acc.total + 1,
        testedCount: hasTest ? acc.testedCount + 1 : acc.testedCount,
      }
    }, initialState)
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

async function main() {
  try {
    const { body, total, testedCount } = generateHookListBody()
    const url = `https://github.com/${GITHUB_ISSUE_PATH}`
    const state = total === testedCount ? 'closed' : 'open'

    await $`gh api \
    --method PATCH \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    /repos/${GITHUB_ISSUE_PATH} \
    -f body=${issueTemplate(body)} \
    -f state=${state}
    `

    console.log(`\n\n✅ Issue successfully updated! -> ${url}`)
  } catch (error) {
    console.error('\n❌ Something failed', error)
  }
}

await main()
