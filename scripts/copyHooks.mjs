#!/usr/bin/env zx

import { path, fs } from 'zx'

import { isHookFile } from './utils.mjs'

const hooksDir = path.resolve('./packages/usehooks-ts/src')
const outputDir = path.resolve('./apps/www/generated')

////////////////////////////////////////////////////////////////////////
// 1. Imperative script that copy hooks from code to markdown files
////////////////////////////////////////////////////////////////////////

createDirIfNeeded(outputDir)
createDirIfNeeded(`${outputDir}/hooks/`)
createDirIfNeeded(`${outputDir}/demos/`)
createDirIfNeeded(`${outputDir}/posts/`)

// Copy hooks as a markdown file
fs.readdir(hooksDir, (err, files) => {
  if (err) throw err

  for (const file of files) {
    if (!isHookFile(file)) continue

    // Copy hook as a markdown file
    copyFile({
      source: path.resolve(`${hooksDir}/${file}/${file}.ts`),
      dest: path.resolve(`${outputDir}/hooks/${file}.md`),
      toMarkdown: true,
    })

    // Copy demo as a markdown file
    copyFile({
      source: path.resolve(`${hooksDir}/${file}/${file}.demo.tsx`),
      dest: path.resolve(`${outputDir}/demos/${file}.md`),
      toMarkdown: true,
      useSandbox: true,
    })

    // Copy documentation file
    copyFile({
      source: path.resolve(`${hooksDir}/${file}/${file}.md`),
      dest: path.resolve(`${outputDir}/posts/${file}.md`),
    })
  }
})

////////////////////////////////////////////////////////////////////////
// 2. Utility functions
////////////////////////////////////////////////////////////////////////

function getFileName(pathname) {
  return pathname.split('/').reverse()[0]
}

function createDirIfNeeded(dir) {
  if (!fs.existsSync(path.resolve(dir))) fs.mkdirSync(dir)
}

function copyFile({ source, dest, useSandbox, toMarkdown }) {
  // Check source file
  if (!fs.existsSync(source)) {
    console.warn(`${getFileName(source)} doesn't exist`)
    return
  }

  // If destination file exists, remove it
  let existingFile = false
  if (fs.existsSync(dest)) {
    fs.unlinkSync(dest)
    existingFile = true
  }

  // Read source then create markdown hook file
  fs.readFile(source, 'utf8', (err, data) => {
    if (err) {
      console.error(`Cannot read ${source}`)
      return
    }

    const name = getFileName(dest)
    const extension = source.split('.').reverse()[0]
    const writeStream = fs.createWriteStream(dest)
    let preCode = '```' + extension

    if (toMarkdown) {
      data = data
        .split('\n')
        .map(line => line
          .replace("from '..'", "from 'usehooks-ts'")
          .replace(`from './${name}'`, "from 'usehooks-ts'")
        )
        .join('\n')

      // wrap code into markdown code tags
      data = preCode + '\r' + data + '```\r'
    }

    writeStream.write(data)
    writeStream.end()

    console.log(`${name} ${existingFile ? 'updated' : 'created'}`)
  })
}
