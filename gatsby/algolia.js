/* eslint-disable @typescript-eslint/no-var-requires */
const queries = require('./queries')
const utils = require('./utils')

const flatten = arr => {
  const filteredPosts = utils.filterPosts(arr)
  const formattedPosts = filteredPosts.map(
    ({ node: { frontmatter, shortDescription } }) => ({
      ...frontmatter,
      id: frontmatter.path,
      shortDescription,
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
