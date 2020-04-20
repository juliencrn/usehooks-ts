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
            frontmatter {
              path
              gistId
              gistFilename
            }
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

  for (const post of posts) {
    const { frontmatter } = post.node
    const hasGist = !!frontmatter.gistId && !!frontmatter.gistFilename
    let code = null

    if (hasGist) {
      const gistUrl = `https://api.github.com/gists/${frontmatter.gistId}`
      const data = await fetchGist(gistUrl)
      code = data.files[frontmatter.gistFilename].content
    }

    createPage({
      path: frontmatter.path,
      component: path.resolve(`src/templates/post.tsx`),
      context: { code }, // additional data can be passed via context
    })
  }
}
