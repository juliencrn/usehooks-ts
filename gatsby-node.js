/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fetch = require('node-fetch')

const isDev = process.env.NODE_ENV !== 'production'

async function fetchGist(url) {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            excerpt(pruneLength: 155)
            shortDescription: excerpt(pruneLength: 280)
            frontmatter {
              path
              title
              gistId
              gistFilename
            }
            body
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  /**
   * Filter correct posts
   */
  const filteredPosts = result.data.allMdx.edges.filter(({ node }) => {
    // Ensure the presence of gist fields
    if (!node.frontmatter.gistId || !node.frontmatter.gistFilename) {
      return false
    }

    // Do not create /demo page in production
    if (node.frontmatter.path === '/demo') {
      return isDev
    }
    return true
  })

  /**
   * For each post,
   * Fetch gist code from github.com
   * And data gist data in post data
   */
  const posts = []
  for (const post of filteredPosts) {
    const { node } = post
    const { gistId, gistFilename } = node.frontmatter

    try {
      const gistUrl = `https://api.github.com/gists/${gistId}`
      const { html_url, updated_at, files } = await fetchGist(gistUrl)
      const gist = {
        url: html_url,
        updated: updated_at,
        code: files[gistFilename].content,
      }

      posts.push({ node: { ...node, gist } })
    } catch (error) {
      console.error('Error on github API fetch', error)
    }
  }

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
}
