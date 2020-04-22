/* eslint-disable @typescript-eslint/camelcase */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

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

  const posts = result.data.allMdx.edges.filter(({ node }) => {
    // Do not create /demo page in production
    if (node.frontmatter.path === '/demo') {
      return isDev
    }
    return true
  })

  for (let index = 0; index < posts.length; index++) {
    const { node } = posts[index]

    // Need gistId & gistFilename fields
    if (!!node.frontmatter.gistId && !!node.frontmatter.gistFilename) {
      const { gistId, gistFilename } = node.frontmatter

      // Fetch gist code from github.com
      try {
        const gistUrl = `https://api.github.com/gists/${gistId}`
        const { html_url, updated_at, files } = await fetchGist(gistUrl)
        const gist = {
          url: html_url,
          updated: updated_at,
          code: files[gistFilename].content,
        }

        // Get prev/next post
        const next = posts[index + 1] ? posts[index + 1].node : posts[0].node
        const prev = posts[index - 1]
          ? posts[index - 1].node
          : posts[posts.length - 1].node

        createPage({
          path: node.frontmatter.path,
          component: path.resolve(`src/templates/post.tsx`),
          context: { gist, post: node, next, prev },
        })
      } catch (error) {
        console.error('Error on github API fetch', error)
      }
    }
  }
}
