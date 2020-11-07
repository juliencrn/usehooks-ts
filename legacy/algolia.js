const postQuery = `{
  posts: allMdx(
    sort: { order: DESC, fields: [frontmatter___date] },
    limit: 1000,
    filter: {frontmatter: {templateKey: {eq: "post"}}}
    ) {
    edges {
      node {
        id
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
}`

function postIsProduction(node) {
  const isDev = process.env.NODE_ENV !== 'production'

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

function transformer({ data }) {
  return data.posts.edges
    .filter(({ node }) => postIsProduction(node))
    .map(({ node: { frontmatter, shortDescription, excerpt } }) => ({
      id: frontmatter.path,
      path: frontmatter.path,
      title: frontmatter.title,
      shortDescription,
      excerpt,
    }))
}

const algoliaQueries = [
  {
    query: postQuery,
    transformer,
    indexName: `Posts`,
  },
]

module.exports = algoliaQueries
