/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')

const isDev = process.env.NODE_ENV !== 'production'

const fetchGist = async gistId => {
  const url = `https://api.github.com/gists/${gistId}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}

/**
 * For each post,
 * Fetch gist code from github.com
 * And data gist data in post data
 */
const addGistsToPosts = async posts => {
  const array = []
  for (const post of posts) {
    const { node } = post
    const { gistId, gistFilename } = node.frontmatter

    try {
      const { html_url, updated_at, files } = await fetchGist(gistId)
      const gist = {
        url: html_url,
        updated: updated_at,
        code: files[gistFilename].content,
      }

      array.push({ node: { ...node, gist } })
    } catch (error) {
      console.error('Error on github API fetch', error)
    }
  }

  return array
}

const filterPosts = posts => {
  return posts.filter(({ node }) => {
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
}

module.exports = {
  filterPosts,
  addGistsToPosts,
  isDev,
}
