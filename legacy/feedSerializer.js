module.exports.feed = {
  query: `{
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
  }`,
  serializer: (posts, siteMetadata) => {
    return posts.edges.map(({ node }) => {
      const { title, path, date } = node.frontmatter
      return {
        title: `${title}`,
        description: node.excerpt || '',
        author: siteMetadata.author.name,
        date,
        url: `${siteMetadata.siteUrl}${path}`,
        guid: `${siteMetadata.siteUrl}${path}`,
      }
    })
  },
}
