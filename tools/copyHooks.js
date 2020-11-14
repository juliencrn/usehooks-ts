/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const hooksDir = path.resolve('./src/hooks')
const hookDemoDir = path.resolve('./src/hooks/demo')
const postsDir = path.resolve('./src/content/posts')

const success = chalk.green('success')
const info = chalk.blue('info')
const warn = chalk.yellow('warn')
const error = chalk.yellow('error')

function getFileName(pathname) {
  return pathname.split('/').reverse()[0]
}

function copyHook({ sourceFile, destDir, destFile }) {
  // Check source file
  if (!fs.existsSync(sourceFile)) {
    console.log(`${warn} ${getFileName(sourceFile)} doesn't exist`)
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
fs.readdir(hooksDir, (err, files) => {
  if (err) {
    throw err
  }

  files.forEach(file => {
    const [filename, extension] = file.split('.')

    const options = {
      sourceFile: path.resolve(`${hooksDir}/${filename}.ts`),
      destDir: path.resolve(`${postsDir}/${filename}`),
      destFile: path.resolve(`${postsDir}/${filename}/${filename}.hook.md`),
    }

    const isHook = `use${filename.slice(3)}` === filename && extension === 'ts'

    if (isHook) {
      copyHook(options)
    }
  })
})

// Foreach demo hook, copy to content as markdown file
fs.readdir(hookDemoDir, (err, files) => {
  if (err) {
    throw err
  }

  files.forEach(file => {
    const [filename, extension] = file.split('.')

    const options = {
      sourceFile: path.resolve(`${hookDemoDir}/${filename}.tsx`),
      destDir: path.resolve(`${postsDir}/${filename}`),
      destFile: path.resolve(`${postsDir}/${filename}/${filename}.demo.md`),
    }

    const isHook = `use${filename.slice(3)}` === filename && extension === 'tsx'

    if (isHook) {
      copyHook(options)
    }
  })
})
