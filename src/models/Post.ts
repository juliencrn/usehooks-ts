import { graphql } from 'gatsby'

export interface Post {
  id: string
  slug: string
  excerpt: string
  shortDescription: string
  fields: {
    hookName: string
    type: 'post'
    path: string
  }
  frontmatter: {
    title: string
  }
  body: string
}

export const query = graphql`
  fragment Post on Mdx {
    id
    slug
    excerpt(pruneLength: 155)
    shortDescription: excerpt(pruneLength: 280)
    fields {
      hookName
      type
      path
    }
    frontmatter {
      title
    }
    body
  }
`
