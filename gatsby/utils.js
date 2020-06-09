/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')

const isDev = process.env.NODE_ENV !== 'production'

const fetchGist = async gistId => {
  const url = `https://api.github.com/gists/${gistId}`
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.GATSBY_GITHUB_TOKEN}`,
    },
  })
  const data = await response.json()
  return data
}

/**
 * Fetch gist code from github.com
 * And data gist data in post data
 */
const getGist = async postNode => {
  try {
    const { gistId, gistFilename } = postNode.frontmatter
    const { html_url, updated_at, files } = await fetchGist(gistId)

    return {
      url: html_url,
      updated: updated_at,
      code: files[gistFilename].content,
    }
  } catch (error) {
    throw new Error('Error on github API fetch', error)
  }
}

function postIsProduction(node) {
  // Ensure the presence of gist fields
  if (!node.frontmatter.gistId || !node.frontmatter.gistFilename) {
    return false
  }

  // Do not create /demo page in production
  if (node.frontmatter.path === '/demo') {
    return isDev
  }
  return true
}

function filterPosts(posts) {
  return posts.filter(({ node }) => postIsProduction(node))
}

/**
 * Separate "posts" or "pages" from allMdx
 * And appliques filters
 */
function separateAllMdx(arrayOfNodes) {
  return arrayOfNodes.reduce(
    (prev, { node }) => {
      switch (node.frontmatter.templateKey) {
        // Is Post
        case 'post':
          if (postIsProduction(node)) {
            return { ...prev, posts: [...prev.posts, node] }
          }
          return prev

        // Is Page
        case 'page':
          return { ...prev, pages: [...prev.pages, node] }

        // Else no adds current post
        default:
          return prev
      }
    },
    { posts: [], pages: [] },
  )
}

module.exports = {
  isDev,
  getGist,
  separateAllMdx,
  filterPosts,
}
