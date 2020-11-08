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
      const [filename] = absolutePath.split('/').reverse()
      createNodeField({
        node,
        name: `hookName`,
        value: filename.split('.')[0],
      })

      createNodeField({
        node,
        name: `type`,
        value: filename.match('.hook.md') ? 'hook' : 'post',
      })

      createNodeField({
        node,
        name: 'path',
        value: `/${camelToKebabCase(filename.split('.')[0])}`,
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
