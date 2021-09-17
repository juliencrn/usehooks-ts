import fs from 'fs'
import path from 'path'

import { camelToKebabCase, error, isHookFile, success, warn } from './utils'

const readmePath = path.resolve('./README.md')
const hooksPath = path.resolve('./packages/usehooks-ts/src')
const demosPath = path.resolve('./packages/frontend/src/hooks-doc')

////////////////////////////////////////////////////////////////////////
// 1. Imperative script that updates the hook list in the README file.
////////////////////////////////////////////////////////////////////////

const hooks = fs.readdirSync(path.resolve(hooksPath))
const demos = fs.readdirSync(path.resolve(demosPath))

const hookList = hooks.filter(isHookFile).map(name => formatHook(name, demos))

const markdown = createMarkdownList(hookList)

insertInReadme(markdown)

////////////////////////////////////////////////////////////////////////
// 2. Utility functions
////////////////////////////////////////////////////////////////////////

function createUrl(filename: string): string {
  const pathname = camelToKebabCase(filename)
  return `https://usehooks-typescript.com/react-hook/${pathname}`
}

interface MarkdownLine {
  name: string
  markdownLine: string
}

function formatHook(name: string, demos: string[]): MarkdownLine {
  const hasDemo = demos.includes(name)
  if (!hasDemo) console.log(`${warn} ${name} haven't demo yet!`)

  return {
    name,
    markdownLine: hasDemo
      ? `- [\`${name}()\`](${createUrl(name)})\n`
      : `- ${name}\n`,
  }
}

function createMarkdownList(hooks: MarkdownLine[]): string {
  return hooks.reduce((acc, hook) => acc + hook.markdownLine, '')
}

function insertInReadme(markdown: string): void {
  const hookListRegExp = new RegExp(
    '<!-- HOOKS:START -->(.*)<!-- HOOKS:END -->',
    'gms',
  )

  try {
    const data = fs
      .readFileSync(readmePath, 'utf-8')
      .replace(
        hookListRegExp,
        `<!-- HOOKS:START -->\n${markdown}\n<!-- HOOKS:END -->`,
      )

    fs.writeFileSync(readmePath, data, 'utf-8')
    console.log(`${success} README.md updated!`)
  } catch (err) {
    console.log(`${error} Error updating README.md: ${err}`)
  }
}
