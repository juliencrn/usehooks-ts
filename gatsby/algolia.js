/* eslint-disable @typescript-eslint/no-var-requires */
const queries = require('./queries')
const utils = require('./utils')

const flatten = arr => {
  const filteredPosts = utils.filterPosts(arr)
  const formattedPosts = filteredPosts.map(
    ({ node: { frontmatter, shortDescription, excerpt } }) => ({
      id: frontmatter.path,
      path: frontmatter.path,
      title: frontmatter.title,
      shortDescription,
      excerpt,
    }),
  )
  return formattedPosts
}

const algoliaQueries = [
  {
    query: queries.postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
  },
]

module.exports = algoliaQueries
