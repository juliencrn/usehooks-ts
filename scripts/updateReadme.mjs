#!/usr/bin/env zx

import { path, fs } from 'zx'

import { camelToKebabCase, isDemoFile, isHookFile } from './utils.mjs'

////////////////////////////////////////////////////////////////////////
// 1. Imperative script that updates the hook list in the README file.
////////////////////////////////////////////////////////////////////////

const srcDir = path.resolve('./packages/usehooks-ts/src')
const readmeFile = path.resolve('./README.md')

const markdown = fs
  .readdirSync(srcDir)
  .filter(isHookFile)
  .map(formatHook)
  .reduce((acc, line) => acc + line, '')

const hookListRegExp = new RegExp(
  '<!-- HOOKS:START -->(.*)<!-- HOOKS:END -->',
  'gms',
)

try {
  const data = fs
    .readFileSync(readmeFile, 'utf-8')
    .replace(
      hookListRegExp,
      `<!-- HOOKS:START -->\n\n${markdown}\n<!-- HOOKS:END -->`,
    )

  fs.writeFileSync(readmeFile, data, 'utf-8')
  console.log(`README.md updated!`)
} catch (err) {
  console.error(`Error updating README.md: ${err}`)
}

////////////////////////////////////////////////////////////////////////
// 2. Utility functions
////////////////////////////////////////////////////////////////////////

function createUrl(filename) {
  const pathname = camelToKebabCase(filename)
  return `https://usehooks-ts.com/react-hook/${pathname}`
}

function hasDemo(name) {
  return fs
    .readdirSync(path.resolve(srcDir, name))
    .filter(isDemoFile).length === 1
}

function formatHook(name) {
  // exclude hook from readme if it haven't demo
  if (!hasDemo(name)) {
    console.warn(`${name} haven't demo yet!`)
    return ''
  }

  return `- [\`${name}()\`](${createUrl(name)})\n`
}
