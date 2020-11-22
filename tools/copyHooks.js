/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const inputDir = path.resolve('./src/hooks')
const outputDir = path.resolve('./generated')

const success = chalk.green('success')
// const info = chalk.blue('info')
const warn = chalk.yellow('warn')
const error = chalk.yellow('error')

function getFileName(pathname) {
  return pathname.split('/').reverse()[0]
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

// Foreach hook, copy to content as markdown file
fs.readdir(inputDir, (err, files) => {
  if (err) {
    throw err
  }

  files.forEach(file => {
    const hookRegex = new RegExp('^use[A-Z][a-zA-Z]*$')

    if (hookRegex.test(file)) {
      // Copy the hook
      copyHook({
        sourceFile: path.resolve(`${inputDir}/${file}/${file}.ts`),
        destFile: path.resolve(`${outputDir}/hooks/${file}.hook.md`),
      })

      // Copy the hook's demo
      copyHook({
        sourceFile: path.resolve(`${inputDir}/${file}/${file}.demo.tsx`),
        destFile: path.resolve(`${outputDir}/hookDemos/${file}.demo.md`),
      })
    }
  })
})
