/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const { allMdx } = require('./gatsby/queries')
const { getGist, separateAllMdx } = require('./gatsby/utils')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const results = await graphql(allMdx)

  if (results.errors) {
    reporter.panicOnBuild(`Error while running GraphQL posts query.`)
    return
  }

  // Range allMdx into "post" or "page"
  const { posts, pages } = separateAllMdx(results.data.allMdx.edges)

  await Promise.all([
    /**
     * Create posts
     */
    ...posts.map(async (post, i) => {
      const gist = await getGist(post)
      const next = posts[i + 1] ? posts[i + 1] : posts[0]
      const prev = posts[i - 1] ? posts[i - 1] : posts[posts.length - 1]

      createPage({
        path: `${post.frontmatter.path}/`,
        component: path.resolve(`./src/templates/post.tsx`),
        context: {
          gist,
          postId: post.id,
          nextId: next.id,
          prevId: prev.id,
        },
      })
    }),

    /**
     * Create pages
     */
    ...pages.map(({ id, frontmatter }) => {
      createPage({
        path: `${frontmatter.path}/`,
        component: path.resolve(`./src/templates/page.tsx`),
        context: { pageId: id },
      })
    }),
  ])
}
