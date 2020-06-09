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

const pageQuery = `{
  pages: allMdx(
    filter: {frontmatter: {templateKey: {eq: "page"}}},
    limit: 1000
    ) {
    edges {
      node {
        id
        frontmatter {
          path
          title
          excerpt
        }
        body
      }
    }
  }
}`

const allMdx = `{
  allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
    edges {
      node {
        id
        frontmatter {
          path
          gistId
          gistFilename
          templateKey
        }
      }
    }
  }
}`

module.exports = { postQuery, pageQuery, allMdx }
