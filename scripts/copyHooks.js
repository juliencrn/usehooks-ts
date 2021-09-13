/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const hooksDir = path.resolve('./packages/usehooks.ts/src')
const demosDir = path.resolve('./packages/frontend/src/hooks-doc')
const outputDir = path.resolve('./packages/frontend/generated')

const success = chalk.green('success')
const info = chalk.blue('info')
const warn = chalk.yellow('warn')
const error = chalk.red('error')

////////////////////////////////////////////////////////////////////////
// 1. Imperative script that copy hooks from code to markdown files
////////////////////////////////////////////////////////////////////////

createDirIfNeeded(outputDir)
createDirIfNeeded(`${outputDir}/hooks/`)
createDirIfNeeded(`${outputDir}/hookDemos/`)

// Copy hooks as markdown file
fs.readdir(hooksDir, (err, files) => {
  if (err) throw err
  files.forEach(file => {
    if (isHookFile(file))
      copyHook({
        sourceFile: path.resolve(`${hooksDir}/${file}/${file}.ts`),
        destFile: path.resolve(`${outputDir}/hooks/${file}.hook.md`),
      })
  })
})

// Copy hooks's demo as markdown file
fs.readdir(demosDir, (err, files) => {
  if (err) throw err
  files.forEach(file => {
    if (isHookFile(file)) {
      copyHook({
        sourceFile: path.resolve(`${demosDir}/${file}/${file}.demo.tsx`),
        destFile: path.resolve(`${outputDir}/hookDemos/${file}.demo.md`),
      })
    }
  })
})

////////////////////////////////////////////////////////////////////////
// 2. Utility functions
////////////////////////////////////////////////////////////////////////

function isHookFile(filename) {
  const hookRegex = new RegExp('^use[A-Z][a-zA-Z]*$')
  return hookRegex.test(filename)
}

function getFileName(pathname) {
  return pathname.split('/').reverse()[0]
}

function createDirIfNeeded(dir) {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(dir)
  }
}

function copyHook({ sourceFile, destFile }) {
  // Check source file
  if (!fs.existsSync(sourceFile)) {
    console.log(`${warn} ${getFileName(sourceFile)} doesn't exist`)
    return
  }

  // If destination file exists, remove it
  let existingFile = false

  if (fs.existsSync(destFile)) {
    fs.unlinkSync(destFile)
    existingFile = true
  }

  // Read source then create markdown hook file
  fs.readFile(sourceFile, 'utf8', (err, data) => {
    if (err) {
      console.log(`${error} Cannot read ${sourceFile}`)
      return
    }

    const extension = sourceFile.split('.').reverse()[0]

    const writeStream = fs.createWriteStream(destFile)
    writeStream.write('```' + `${extension}\r`)
    writeStream.write(data)
    writeStream.write('```\r')
    writeStream.end()

    console.log(
      `${success} ${getFileName(destFile)} ${
        existingFile ? 'updated' : 'created'
      }`,
    )
  })
}
