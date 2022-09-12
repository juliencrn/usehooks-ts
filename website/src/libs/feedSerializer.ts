import { SiteMetadata } from '~/hooks/useSiteMetadata'
import { Nodes, Post } from '~/models'

export const query = `{
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
        name
        type
        path
      }
      frontmatter {
        title
        date
      }
    }
  }
}`

export const serializer = ({
  siteMetadata,
  query,
}: {
  siteMetadata: SiteMetadata
  query: { posts: Nodes<Omit<Post, 'body'>> }
}) =>
  query.posts.nodes.map(({ frontmatter, excerpt, fields }) => {
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
