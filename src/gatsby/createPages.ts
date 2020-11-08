import { GatsbyNode } from 'gatsby'
import path from 'path'

interface Hook {
  id: string
  fields: { hookName: string }
}
interface Page {
  id: string
  fileAbsolutePath: string
  frontmatter: {
    path?: string
  }
}

interface Post {
  id: string
  fields: {
    hookName: string
    path: string
  }
}

interface Query {
  pages: { nodes: Page[] }
  posts: { nodes: Post[] }
  hooks: { nodes: Hook[] }
}

export const createPages: GatsbyNode['createPages'] = async args => {
  const { actions, graphql, reporter } = args

  const results = await graphql<Query>(
    `
      {
        pages: allMdx(filter: { fields: { type: { eq: "page" } } }) {
          nodes {
            id
            fileAbsolutePath
            frontmatter {
              path
            }
          }
        }

        hooks: allMdx(filter: { fields: { type: { eq: "hook" } } }) {
          nodes {
            id
            fields {
              hookName
            }
          }
        }

        posts: allMdx(filter: { fields: { type: { eq: "post" } } }) {
          nodes {
            id
            fields {
              hookName
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
    const {
      pages: { nodes: pages },
      posts: { nodes: posts },
      hooks: { nodes: hooks },
    } = results.data

    if (pages.length > 0) {
      pages.forEach(page => {
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

    let postCreatedCount = 0
    if (posts.length > 0) {
      posts.forEach(({ id, fields }) => {
        // Check if have the corresponding hook
        const hook = hooks.find(
          ({ fields: { hookName } }) => hookName === fields.hookName,
        )

        if (hook) {
          const pageData = {
            component: path.resolve(`./src/templates/post.tsx`),
            context: {
              id,
              hookId: hook.id,
            },
          }

          // Two URLs during the _Redirects
          actions.createPage({ ...pageData, path: fields.path })
          actions.createPage({ ...pageData, path: `/react-hook${fields.path}` })

          postCreatedCount++
        }
      })
    }

    if (postCreatedCount < posts.length) {
      const percent = Math.round((postCreatedCount / posts.length) * 100)
      reporter.warn(
        `${postCreatedCount} / ${posts.length} (${percent}%) posts created`,
      )
    }
  }
}
