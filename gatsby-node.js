/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const queries = require('./gatsby/queries')
const utils = require('./gatsby/utils')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const postsResult = await graphql(queries.postQuery)

  if (postsResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL posts query.`)
    return
  }

  /**
   * Filter correct posts
   */
  const filteredPosts = utils.filterPosts(postsResult.data.posts.edges)

  /**
   * Fetch gist code from github.com
   * And data gist data in post data
   */
  const posts = await utils.addGistsToPosts(filteredPosts)

  /**
   * Create posts
   */
  posts.forEach(({ node }, i) => {
    // Get prev/next post
    const next = posts[i + 1] ? posts[i + 1].node : posts[0].node
    const prev = posts[i - 1] ? posts[i - 1].node : posts[posts.length - 1].node

    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`./src/templates/post.tsx`),
      context: { post: node, next, prev },
    })
  })

  /**
   * Create posts list
   */
  const postsPerPage = 5
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve(`./src/templates/postList.tsx`),
      context: {
        numPages,
        currentPage: i + 1,
        posts: posts.slice(i * postsPerPage, i * postsPerPage + postsPerPage),
      },
    })
  })

  /**
   * Create pages
   */
  const pagesResult = await graphql(queries.pageQuery)

  if (pagesResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL pages query.`)
    return
  }

  pagesResult.data.pages.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`./src/templates/page.tsx`),
      context: { page: node },
    })
  })
}
