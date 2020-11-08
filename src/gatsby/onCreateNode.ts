import { CreateNodeArgs } from 'gatsby'

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
