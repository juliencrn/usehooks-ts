module.exports.feed = {
  query: `{
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
  }`,
  serializer: (posts, siteMetadata) => {
    return posts.nodes.map(({ frontmatter, excerpt }) => {
      const { title, path, date } = frontmatter
      return {
        title: `${title}`,
        description: excerpt || '',
        author: siteMetadata.author.name,
        date,
        url: `${siteMetadata.siteUrl}${path}`,
        guid: `${siteMetadata.siteUrl}${path}`,
      }
    })
  },
}
