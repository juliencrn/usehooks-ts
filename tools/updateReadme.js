/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const success = chalk.green('success')
const readmePath = path.resolve('./README.md')

function camelToKebabCase(str) {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
}

function createMarkdownLine(filename) {
  const pathname = camelToKebabCase(filename)
  const url = `https://usehooks-typescript.com/react-hook/${pathname}`
  return `- [${filename}](${url})\n`
}

function createMarkdownList(files) {
  const hookRegex = new RegExp('^use[A-Z][a-zA-Z]*$')
  return files.reduce(
    (markdown, file) =>
      hookRegex.test(file)
        ? `${markdown}${createMarkdownLine(file)}`
        : markdown,
    '',
  )
}

function insertInReadme(markdown) {
  const hookListRegExp = new RegExp('<div id="hook-list">(.*)</div>', 'gms')

  try {
    const data = fs
      .readFileSync(readmePath, 'utf-8')
      .replace(hookListRegExp, `<div id="hook-list">\n\n${markdown}\n</div>`)

    fs.writeFileSync('README.md', data, 'utf-8')
  } catch (err) {
    throw `Error reading file from disk: ${err}`
  }
}

fs.promises
  .readdir(path.resolve('./src/hooks'), 'utf-8')
  .then(createMarkdownList)
  .then(insertInReadme)
  .then(() => console.log(`${success} README.md updated!`))
  .catch(err => console.log(err))
