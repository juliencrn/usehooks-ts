import { fs, path } from 'zx'
import {
  removeDefinedInSections,
  removeEslintDisableComments,
  removeFirstLine,
  removeJSDocComments,
  transformImports,
  replaceRelativePaths,
} from './data-transform.js'
import {
  getCodeData,
  getDemoData,
  getHookDocData,
  getTypeAliasesData,
} from './get-markdown-data.js'

export function generateDocFiles(hook) {
  const [hookDoc] = getHookDocData(hook)
    .map(removeFirstLine)
    .map(removeDefinedInSections)
    .map(replaceRelativePaths)
  // .map(data => data.trim())

  const typeAliases = getTypeAliasesData(hook)
    .map(removeFirstLine)
    .map(removeDefinedInSections)
    .map(replaceRelativePaths)

  const [demo] = getDemoData(hook)
    .map(removeJSDocComments)
    .map(removeEslintDisableComments)
    .map(transformImports)

  const [code] = getCodeData(hook)
    .map(removeJSDocComments)
    .map(removeEslintDisableComments)
    .map(transformImports)
    .map(data => data.trim())

  const hookHighlightIndexes = demo
    .split('\n')
    .map((line, index) => {
      if (line.startsWith('import')) return null
      if (!line.includes(hook.name)) return null
      return index + 1
    })
    .filter(Boolean)

  // Template
  const data = `---
name: ${hook.name}
slug: ${hook.slug}
path: /react-hook/${hook.slug}
summary: ${hook.summary}
---

${hook.summary}

## Usage

\`\`\`tsx showLineNumbers {${hookHighlightIndexes.join(',')}}
${demo.trim()}
\`\`\`

## API

${hookDoc}

${typeAliases.length > 0 ? '### Type aliases\n\n' + typeAliases.join('\n') + '\n' : ''}

## Hook

\`\`\`ts showLineNumbers
${code}
\`\`\`
`

  // Write the file
  const file = path.resolve(`./generated/docs/hooks/${hook.slug}.md`)
  const writeStream = fs.createWriteStream(file)
  writeStream.write(data)
  writeStream.end()
}
