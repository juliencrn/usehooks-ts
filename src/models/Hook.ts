import { graphql } from 'gatsby'

export interface Hook {
  id: string
  fields: {
    hookName: string
    type: 'hook'
  }
  body: string
}

export const query = graphql`
  fragment Hook on Mdx {
    id
    fields {
      hookName
      type
    }
    body
  }
`
