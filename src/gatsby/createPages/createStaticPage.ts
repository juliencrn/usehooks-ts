import { CreatePagesArgs } from 'gatsby'
import path from 'path'

interface Page {
  id: string
  fileAbsolutePath: string
  frontmatter: {
    path?: string
  }
}

interface Query {
  pages: { nodes: Page[] }
}

export default async function createStaticPages(args: CreatePagesArgs) {
  const { actions, graphql, reporter } = args

  const results = await graphql<Query>(
    `
      {
        pages: allMdx(
          filter: { fileAbsolutePath: { regex: "/content/pages/" } }
        ) {
          nodes {
            id
            fileAbsolutePath
            frontmatter {
              path
            }
          }
        }
      }
    `,
  )

  if (results.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL posts query.`,
      results.errors,
    )
    return
  }

  if (results.data) {
    const { pages } = results.data

    if (pages.nodes.length > 0) {
      pages.nodes.forEach(page => {
        if (!page.frontmatter?.path) {
          reporter.warn(`"path" is missing in "${page.fileAbsolutePath}"`)
          return
        }

        actions.createPage({
          path: page.frontmatter.path,
          component: path.resolve(`./src/templates/page.tsx`),
          context: { id: page.id },
        })
      })
    }
  }
}
