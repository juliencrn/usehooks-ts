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
export function transformImports(data) {
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

/**
 * Remove JSDoc comments from a string
 * @param {string} data - The string to remove JSDoc comments from
 * @returns {string} - The string without JSDoc comments
 */
export function removeJSDocComments(data) {
  const inlineJsdocRegex = /\/\*\*\s*([\s\S]*?)\*\/\n?/g
  const multiLineJsdocRegex = /\/\*\*\s*\n([^\*]|(\*(?!\/)))*\*\/\n?/g
  return data.replace(inlineJsdocRegex, '').replace(multiLineJsdocRegex, '')
}

/**
 * Remove the first line from a string
 * @param {string} data - The string to remove the first line from
 * @returns {string} - The string without the first line
 */
export function removeFirstLine(data) {
  return data.split('\n').slice(1).join('\n')
}

/**
 * Remove "Defined in" section from a string
 * @param {string} data - The string to remove the "Defined in" sections from
 * @returns {string} - The string without the "Defined in" sections
 */
export function removeDefinedInSections(data) {
  let lines = data.split('\n')
  const occurrences = lines.filter(line => line === '#### Defined in').length

  for (let index = 0; index < occurrences; index++) {
    const index = lines.findIndex(line => line === '#### Defined in')
    const before = lines.slice(0, index)
    const after = lines.slice(index + 3)
    lines = [...before, ...after]
  }

  return lines.join('\n')
}

/**
 * Remove ESLint disable comments from a string
 * @param {string} data - The string to remove ESLint disable comments from
 * @returns {string} - The string without ESLint disable comments
 */
export function removeEslintDisableComments(data) {
  return data
    .split('\n')
    .filter(line => !line.startsWith('// eslint-disable-next-line'))
    .join('\n')
}

export function camelToKebabCase(str) {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
}

export function replaceRelativePaths(data) {
  return data.replace(/\[([^\[]+)\]\((.*?)\)/g, (match, title, link) => {
    const sanitizedLink = link.trim()

    if (sanitizedLink.startsWith('http')) {
      return match
    }

    const filename = sanitizedLink.replace('../types/', '').replace('.md', '')
    const hookName = filename.split('_')[0]
    const typeName = filename.split('.').at(-1)
    const newLink = `/react-hook/${camelToKebabCase(hookName)}#${typeName}`

    return `[${title}](${newLink})`
  })
}
