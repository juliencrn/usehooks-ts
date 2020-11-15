module.exports.feed = {
  query: `{
    posts: allMdx(
      sort: { order: DESC, fields: [frontmatter___date] },
      limit: 1000,
      filter: { fields: { type: { eq: "post" } } }
    ) {
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
  }`,
  serializer: (posts, siteMetadata) => {
    return posts.nodes.map(({ frontmatter, excerpt, fields }) => {
      const { title, date } = frontmatter
      const url = `${siteMetadata.siteUrl}/react-hook${fields.path}`
      return {
        title: `${title}`,
        description: excerpt || '',
        author: siteMetadata.author,
        date,
        url,
        guid: url,
      }
    })
  },
}
