import { path, fs } from 'zx'

const typedocDir = path.resolve('./generated/typedoc')
const hooksSrcDir = path.resolve('./packages/usehooks-ts/src')

export function getHookDocData(hook) {
  const filename = `${hook.name}_${hook.name}.${hook.name}.md`
  const pathname = path.join(typedocDir, 'functions', filename)
  return getFile(pathname, 'documentation')
}

export function getTypeAliasesData(hook) {
  return (
    hook.types.map(t => {
      const filename = `${hook.name}_${hook.name}.${t.name}.md`
      const pathname = path.join(typedocDir, 'types', filename)
      const [file] = getFile(pathname, 'type aliases')
      return file
    }) || []
  )
}

export function getCodeData(hook) {
  const pathname = path.join(hooksSrcDir, `${hook.name}`, `${hook.name}.ts`)
  return getFile(pathname, 'code')
}

export function getDemoData(hook) {
  const filename = `${hook.name}.demo.tsx`
  const pathname = path.join(hooksSrcDir, `${hook.name}`, filename)
  return getFile(pathname, 'demo')
}

// Utils

function getFile(filename, type) {
  const file = fs.readFileSync(filename, 'utf-8')

  if (!file && ['code', 'demo', 'docs'].includes(type)) {
    const name = filename.split('/').slice(-1)[0]
    throw new Error(`No ${type} found for ${name}`)
  }

  return [file]
}
