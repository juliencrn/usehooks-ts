/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const hooksDir = path.resolve('./src/hooks')
const postsDir = path.resolve('./src/content/posts')

const success = chalk.green('success')
const info = chalk.blue('info')
const warn = chalk.yellow('warn')
const error = chalk.yellow('error')

function copyHook(filename) {
  const sourceFile = path.resolve(`${hooksDir}/${filename}.ts`)
  const destDir = path.resolve(`${postsDir}/${filename}`)
  const destFile = path.resolve(`${destDir}/${filename}.hook.md`)

  // Check source file
  if (!fs.existsSync(sourceFile)) {
    console.log(`${warn} ${filename} doesn't exist`)
    return
  }

  // Check destination directory, or create it
  if (!fs.existsSync(destDir)) {
    console.log(
      `${info} Destination directory doesn't exists, I will create one`,
    )
    fs.mkdirSync(destDir)
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

    const writeStream = fs.createWriteStream(destFile)
    writeStream.write('```typescript\r')
    writeStream.write(data)
    writeStream.write('```\r')
    writeStream.end()

    console.log(
      `${success} ${filename}.hook.md ${existingFile ? 'updated' : 'created'}`,
    )
  })
}

// Foreach hook, copy to content as markdown file
fs.readdir(hooksDir, (err, files) => {
  if (err) {
    throw err
  }

  files.forEach(file => {
    const [filename, extension] = file.split('.')

    const isHook = `use${filename.slice(3)}` === filename && extension === 'ts'

    if (isHook) {
      copyHook(filename)
    }
  })
})
