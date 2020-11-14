import { graphql } from 'gatsby'

export interface AnyMdx {
  id: string
  fileAbsolutePath: string
  fields: {
    hookName: string
    type: 'hook'
  }
  body: string
}

export const AnyMdxQuery = graphql`
  fragment AnyMdx on Mdx {
    id
    fields {
      hookName
      type
    }
    body
  }
`

export interface Post extends AnyMdx {
  slug: string
  excerpt: string
  shortDescription: string
  fields: AnyMdx['fields'] & {
    path: string
  }
  frontmatter: {
    path: string
    title: string
  }
}

export const PostQuery = graphql`
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
