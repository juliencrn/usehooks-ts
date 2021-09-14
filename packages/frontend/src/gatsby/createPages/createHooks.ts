import { CreatePagesArgs } from 'gatsby'
import path from 'path'

import { HookNode } from '../../models'
import { filterHook } from '../../shared/filterHooks'

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
  const results = await args.graphql<Query>(
    `
      {
        posts: allMdx(filter: { fileAbsolutePath: { regex: "/src/hooks-doc/" } }) {
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
    args.reporter.panicOnBuild(
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

      args.actions.createPage({
        ...pageData,
        path: `/react-hook${fields.path}`,
      })

      args.actions.createRedirect({
        fromPath: fields.path,
        toPath: `/react-hook${fields.path}`,
        isPermanent: true,
      })
    })
  }
}
