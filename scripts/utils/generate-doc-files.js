import { fs, path } from 'zx'
import {
  camelToKebabCase,
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
    .map(data => data.trim())

  const [code] = getCodeData(hook)
    .map(removeJSDocComments)
    .map(removeEslintDisableComments)
    .map(transformImports)
    .map(data => data.trim())

  // Template
  const data = `---
name: ${hook.name}
slug: ${hook.slug}
path: /react-hook/${hook.slug}
summary: ${hook.summary}
---

## Documentation

### API

${hookDoc}

${typeAliases.length > 0 ? '### Type aliases\n\n' + typeAliases.join('\n') + '\n' : ''}

## Usage

\`\`\`tsx
${demo}
\`\`\`

## Hook

\`\`\`ts
${code}
\`\`\`
`

  // Write the file
  const file = path.resolve(`./generated/docs/hooks/${hook.slug}.md`)
  const writeStream = fs.createWriteStream(file)
  writeStream.write(data)
  writeStream.end()
}
