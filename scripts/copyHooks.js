#!/usr/bin/env zx

import { path, fs } from 'zx'

import { isHookFile } from './utils.js'

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

function copyFile({ source, dest, toMarkdown }) {
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

    const extension = source.split('.').reverse()[0]
    const writeStream = fs.createWriteStream(dest)

    if (toMarkdown) {
      data = transformImports(data)

      // wrap code into markdown code tags
      data = '```' + extension + '\r' + data + '```\r'
    }

    writeStream.write(data)
    writeStream.end()
  })
}

/**
 * Transform this:
 *
 * import { useBoolean } from '../useBoolean'
 * import { useCounter } from '../useCounter'
 * import { useInterval } from '../useInterval'
 *
 * Or this:
 *
 * import { useBoolean } from './useBoolean'
 *
 * Into this:
 *
 * import { useBoolean, useCounter, useInterval } from 'usehooks-ts'
 */
function transformImports(data) {
  // const importRegex = /import { ([^}]+) } from ['"]\.\.\/use([^'"]+)['"]/g
  const importRegex = /import { ([^}]+) } from ['"]\.\.?(\/[^'"]+)['"]/g

  const imports = Array.from(data.matchAll(importRegex)).map(match => ({
    importName: match[1],
    startIndex: match.index,
    endIndex: match.index + match[0].length,
  }))

  // If there are imports to transform
  if (imports.length > 0) {
    // Concatenate import names and create the new import statement
    const importNames = imports.map(({ importName }) => importName).join(', ')
    const newImportStatement = `import { ${importNames} } from 'usehooks-ts'`

    // Replace existing import statements with the new one
    if (data.indexOf(imports[0].importName) !== -1) {
      const startIndex = imports[0].startIndex
      const endIndex = imports[imports.length - 1].endIndex

      data = `${data.slice(0, startIndex)}${newImportStatement}${data.slice(endIndex)}`
    }
  }

  return data
}
