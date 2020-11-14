import { GatsbyNode } from 'gatsby'
import path from 'path'

import { filterHook } from '../shared/filterHooks'
import { Post, AnyMdx } from '../models'

interface Page extends AnyMdx {
  frontmatter: {
    path?: string
  }
}

interface Query {
  pages: { nodes: Page[] }
  posts: { nodes: Post[] }
  hooks: { nodes: AnyMdx[] }
  demos: { nodes: AnyMdx[] }
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

        posts: allMdx(filter: { fields: { type: { eq: "post" } } }) {
          nodes {
            id
            fields {
              hookName
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

        demos: allMdx(filter: { fields: { type: { eq: "demo" } } }) {
          nodes {
            id
            fields {
              hookName
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
      demos: { nodes: demos },
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

    const matchesPosts = filterHook(posts, hooks, demos)

    matchesPosts.forEach(({ post, hookId, demoId }) => {
      const { id, fields } = post
      const pageData = {
        component: path.resolve(`./src/templates/post.tsx`),
        context: { id, hookId, demoId },
      }

      // Two URLs during the _Redirects
      actions.createPage({ ...pageData, path: fields.path })
      actions.createPage({ ...pageData, path: `/react-hook${fields.path}` })
    })

    if (matchesPosts.length < posts.length) {
      const percent = Math.round((matchesPosts.length / posts.length) * 100)
      reporter.warn(
        `${matchesPosts.length} / ${posts.length} (${percent}%) posts created`,
      )
    }
  }
}
