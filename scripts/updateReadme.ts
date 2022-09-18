import fs from 'fs'
import path from 'path'

import { camelToKebabCase, isDemoFile, isHookFile } from './utils'

////////////////////////////////////////////////////////////////////////
// 1. Imperative script that updates the hook list in the README file.
////////////////////////////////////////////////////////////////////////

const hooks = fs
  .readdirSync(path.resolve(path.resolve('./src')))
  .filter(isHookFile)
  .map(formatHook)

const markdown = createMarkdownList(hooks)

insertIn(markdown, path.resolve('./README.md'))

////////////////////////////////////////////////////////////////////////
// 2. Utility functions
////////////////////////////////////////////////////////////////////////

function createUrl(filename: string): string {
  const pathname = camelToKebabCase(filename)
  return `https://usehooks-ts.com/react-hook/${pathname}`
}

interface MarkdownLine {
  name: string
  markdownLine: string
}

function formatHook(name: string): MarkdownLine | null {
  // exclude hook from readme if it haven't demo
  const hasDemo =
    fs
      .readdirSync(path.resolve(path.resolve(`./src/${name}`)))
      .filter(isDemoFile).length === 1

  if (!hasDemo) {
    console.warn(`${name} haven't demo yet!`)
    return null
  }

  return {
    name,
    markdownLine: `- [\`${name}()\`](${createUrl(name)})\n`,
  }
}

function createMarkdownList(hooks: (MarkdownLine | null)[]): string {
  return hooks.reduce((acc, hook) => {
    if (hook) {
      return acc + hook.markdownLine
    }
    return acc
  }, '')
}

function insertIn(markdown: string, file: fs.PathOrFileDescriptor): void {
  const hookListRegExp = new RegExp(
    '<!-- HOOKS:START -->(.*)<!-- HOOKS:END -->',
    'gms',
  )

  try {
    const data = fs
      .readFileSync(file, 'utf-8')
      .replace(
        hookListRegExp,
        `<!-- HOOKS:START -->\n\n${markdown}\n<!-- HOOKS:END -->`,
      )

    fs.writeFileSync(file, data, 'utf-8')
    console.log(`${file} updated!`)
  } catch (err) {
    console.error(`Error updating ${file}: ${err}`)
  }
}
