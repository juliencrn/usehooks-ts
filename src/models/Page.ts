import { graphql } from 'gatsby'

export interface Page {
  id: string
  slug: string
  fields: {
    type: 'page'
  }
  frontmatter: {
    path: string
    title: string
    excerpt: string
  }
  body: string
}

export const query = graphql`
  fragment Page on Mdx {
    id
    slug
    fields {
      type
    }
    frontmatter {
      path
      title
      excerpt
    }
    body
  }
`
