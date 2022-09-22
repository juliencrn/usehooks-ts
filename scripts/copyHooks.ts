import fs from 'fs'
import path from 'path'

import { isHookFile, toQueryParams } from './utils'

const hooksDir = path.resolve('./src')
const outputDir = path.resolve('./website/generated')
const sandboxTemplatePath = path.resolve('./templates/codesandbox')

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
      dest: path.resolve(`${outputDir}/hooks/${file}.hook.md`),
      toMarkdown: true,
    })

    // Copy demo as a markdown file
    copyFile({
      source: path.resolve(`${hooksDir}/${file}/${file}.demo.tsx`),
      dest: path.resolve(`${outputDir}/demos/${file}.demo.md`),
      toMarkdown: true,
      useSandbox: true,
    })

    // Copy documentation file
    copyFile({
      source: path.resolve(`${hooksDir}/${file}/${file}.mdx`),
      dest: path.resolve(`${outputDir}/posts/${file}.post.mdx`),
    })
  }
})

////////////////////////////////////////////////////////////////////////
// 2. Utility functions
////////////////////////////////////////////////////////////////////////

function getFileName(pathname: string): string {
  return pathname.split('/').reverse()[0]
}

function createDirIfNeeded(dir: string): void {
  if (!fs.existsSync(path.resolve(dir))) fs.mkdirSync(dir)
}

interface CopyFileProps {
  source: string
  dest: string
  useSandbox?: boolean
  toMarkdown?: boolean
}

function copyFile({ source, dest, useSandbox, toMarkdown }: CopyFileProps) {
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
    // TODO: Theses hooks don't work on CodeSandbox, make it work.
    const excludedHooks = ['useFetch.demo.md', 'useCopyToClipboard.demo.md']
    let preCode = '```' + extension

    // If CodeSandbox enabled, add needed parameter
    if (useSandbox && !excludedHooks.includes(name)) {
      const templateOptions = toQueryParams({ entry: 'src/App.tsx' })
      preCode += ' codesandbox=file:' + sandboxTemplatePath + templateOptions
    }

    if (toMarkdown) {
      // rename import from "from '..'" to "from 'usehooks-ts'"
      const regex = new RegExp("from '..'$")

      const transform = (line: string) => {
        return regex.test(line)
          ? line.replace("from '..'", "from 'usehooks-ts'")
          : line
      }

      data = data.split('\n').map(transform).join('\n')

      // wrap code into markdown code tags
      data = preCode + '\r' + data + '```\r'
    }

    writeStream.write(data)
    writeStream.end()

    console.log(`${name} ${existingFile ? 'updated' : 'created'}`)
  })
}
