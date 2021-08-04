import { graphql } from 'gatsby'

export interface HookNode {
  id: string
  fields: {
    name: string
    path: string
  }
}

export const HookNodeQuery = graphql`
  fragment HookNode on Mdx {
    id
    fields {
      name
      path
    }
  }
`

export interface Post extends HookNode {
  id: string
  excerpt: string
  shortDescription: string
  fields: {
    path: string
    name: string
    type: 'hook'
  }
  frontmatter: {
    title: string
    date: string
  }
  body: string
}

export const PostQuery = graphql`
  fragment Post on Mdx {
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
    body
  }
`
