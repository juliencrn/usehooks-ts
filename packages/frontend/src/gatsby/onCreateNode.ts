import { GatsbyNode } from 'gatsby'

export const onCreateNode: GatsbyNode['onCreateNode'] = args => {
  const { node, actions } = args

  if (node.internal.type === 'Mdx') {
    const absolutePath = node.fileAbsolutePath as string
    const isHookRegex = new RegExp('^use[A-Z][a-zA-Z]*$')
    const file = absolutePath.split('/').reverse()[0].split('.')
    const filename = file[0]
    const type = file.length === 3 ? file[1] : 'post'

    if (isHookRegex.test(filename)) {
      actions.createNodeField({
        node,
        name: `name`,
        value: filename,
      })

      actions.createNodeField({
        node,
        name: `type`,
        value: type,
      })

      actions.createNodeField({
        node,
        name: 'path',
        value: `/${camelToKebabCase(filename)}`,
      })
    }
  }
}

const camelToKebabCase = (str: string): string =>
  str
    .split('')
    .map(letter => (/[A-Z]/.test(letter) ? `-${letter.toLowerCase()}` : letter))
    .join('')
