const postQuery = `{
  posts: allMdx(
    sort: { order: DESC, fields: [frontmatter___date] },
    limit: 1000,
    filter: { fileAbsolutePath: { regex: "/content/posts/" } }
  ) {
    nodes {
      id
      excerpt(pruneLength: 155)
      shortDescription: excerpt(pruneLength: 280)
      frontmatter {
        path
        title
        gistId
        gistFilename
      }
    }
  }
}`

function transformer({ data }) {
  return data.posts.nodes
    .filter(node => !node.frontmatter.gistId || !node.frontmatter.gistFilename)
    .map(({ frontmatter, shortDescription, excerpt }) => ({
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
