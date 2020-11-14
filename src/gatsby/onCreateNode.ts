import { CreateNodeArgs } from 'gatsby'

const camelToKebabCase = (str: string): string =>
  str
    .split('')
    .map(letter =>
      letter.match('[A-Z]') ? `-${letter.toLowerCase()}` : letter,
    )
    .join('')

export async function onCreateNode({ node, actions }: CreateNodeArgs) {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const absolutePath = node.fileAbsolutePath as string
    const postsRegex = new RegExp(/\/content\/posts\/[a-zA-Z]/)
    const pagesRegex = new RegExp(/\/content\/pages\/[a-zA-Z]/)

    if (absolutePath.match(postsRegex)) {
      const file = absolutePath.split('/').reverse()[0].split('.')
      const filename = file[0]
      const type = file.length === 3 ? file[1] : 'post'

      createNodeField({
        node,
        name: `hookName`,
        value: filename,
      })

      createNodeField({
        node,
        name: `type`,
        value: type,
      })

      createNodeField({
        node,
        name: 'path',
        value: `/${camelToKebabCase(filename)}`,
      })
    }

    if (absolutePath.match(pagesRegex)) {
      createNodeField({
        node,
        name: `type`,
        value: 'page',
      })
    }
  }
}
