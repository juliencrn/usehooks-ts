import { path, fs } from 'zx'
import { camelToKebabCase } from './data-transform.js'

export function getHooks() {
  const jsonFilePath = path.resolve('./generated/typedoc/all.json')
  const jsonFile = fs.readFileSync(jsonFilePath, 'utf-8')
  if (!jsonFile) {
    throw new Error(
      `Could not read ${jsonFilePath} file. Please run the typedoc command first.`,
    )
  }
  return JSON.parse(jsonFile).children.map(child => {
    const name = child.name.split('/')[0]
    const slug = camelToKebabCase(name)
    const funcGroup = child.groups?.find(g => g.title === 'Functions')
    const typesGroup = child.groups?.filter(g => g.title === 'Type Aliases')
    const hookFunc = child.children?.find(c => c.id === funcGroup.children[0])
    const types = typesGroup?.length ? typesGroup[0].children || [] : []

    return {
      id: child.id,
      name,
      slug,
      path: `/react-hook/${slug}`,
      summary: hookFunc.signatures[0].comment?.summary[0].text,
      flags: hookFunc.flags,
      links: {
        doc: `https://usehooks-ts.com/react-hook/${slug}`,
        github: hookFunc.sources[0].url,
      },
      types: types.map(id => {
        const item = child.children.find(c => c.id === id)
        return {
          id: item.id,
          name: item.name,
          summary: item.comment?.summary[0].text,
        }
      }),
    }
  })
}
