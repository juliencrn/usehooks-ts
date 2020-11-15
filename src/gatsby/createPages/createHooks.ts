import path from 'path'
import { CreatePagesArgs } from 'gatsby'

import { filterHook } from '../../shared/filterHooks'
import { HookNode } from '../../models'

interface Query {
  posts: { nodes: HookNode[] }
  hooks: { nodes: HookNode[] }
  demos: { nodes: HookNode[] }
}

const hookQuery = `
  nodes {
    id
    fields {
      name
      path
    }
  }
`

export default async function createHooks(args: CreatePagesArgs) {
  const { actions, graphql, reporter } = args

  const results = await graphql<Query>(
    `
      {
        posts: allMdx(filter: { fileAbsolutePath: { regex: "/src/hooks/" } }) {
          ${hookQuery}
        }
        hooks: allMdx(
          filter: { fileAbsolutePath: { regex: "/generated/hooks/" } }
        ) {
          ${hookQuery}
        }
        demos: allMdx(
          filter: { fileAbsolutePath: { regex: "/generated/hookDemos/" } }
        ) {
          ${hookQuery}
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
    const { posts, hooks, demos } = results.data

    const filteredPosts = filterHook(posts.nodes, hooks.nodes, demos.nodes)

    filteredPosts.forEach(({ post, hookId, demoId }) => {
      const { id, fields } = post
      const pageData = {
        component: path.resolve(`./src/templates/post.tsx`),
        context: { id, hookId, demoId },
      }

      // Two URLs during the _Redirects
      actions.createPage({ ...pageData, path: fields.path })
      actions.createPage({ ...pageData, path: `/react-hook${fields.path}` })
    })
  }
}
