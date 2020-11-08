const postQuery = `{
  posts: allMdx(
    limit: 1000,
    filter: { fields: { type: { eq:"post" } } }
  )
    nodes {
      id
      excerpt(pruneLength: 155)
      shortDescription: excerpt(pruneLength: 280)
      fields {
        path
      }
      frontmatter {
        title
      }
    }
  }
}`

function transformer({ data }) {
  return data.posts.nodes
    .filter(node => !node.frontmatter.gistId || !node.frontmatter.gistFilename)
    .map(({ frontmatter, shortDescription, excerpt, fields }) => ({
      id: frontmatter.path,
      path: `/react-hook${fields.path}`,
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
