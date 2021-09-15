/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const success = chalk.green('success')
const info = chalk.blue('info')
const warn = chalk.yellow('warn')
const error = chalk.red('error')

const readmePath = path.resolve('./README.md')
const hooksPath = path.resolve('./packages/usehooks.ts/src')
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

function isHookFile(filename) {
  const hookRegex = new RegExp('^use[A-Z][a-zA-Z]*$')
  return hookRegex.test(filename)
}

function camelToKebabCase(str) {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
}

function createUrl(filename) {
  const pathname = camelToKebabCase(filename)
  return `https://usehooks-typescript.com/react-hook/${pathname}`
}

function formatHook(name, demos) {
  const hasDemo = demos.includes(name)
  if (!hasDemo) console.log(`${warn} ${name} haven't demo yet!`)

  return {
    name,
    markdownLine: hasDemo ? `- [${name}](${createUrl(name)})\n` : `- ${name}\n`,
  }
}

function createMarkdownList(hooks) {
  return hooks.reduce((acc, hook) => acc + hook.markdownLine, '')
}

function insertInReadme(markdown) {
  const hookListRegExp = new RegExp('<div id="hook-list">(.*)</div>', 'gms')

  try {
    const data = fs
      .readFileSync(readmePath, 'utf-8')
      .replace(hookListRegExp, `<div id="hook-list">\n\n${markdown}\n</div>`)

    fs.writeFileSync(readmePath, data, 'utf-8')
    console.log(`${success} README.md updated!`)
  } catch (err) {
    console.log(`${error} Error updating README.md: ${err}`)
  }
}
