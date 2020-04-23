const postQuery = `{
  posts: allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
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
}`

module.exports = { postQuery }
