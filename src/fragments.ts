import { graphql } from 'gatsby'

export const postFragment = graphql`
  fragment Post on Mdx {
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
`

export const pageFragment = graphql`
  fragment Page on Mdx {
    frontmatter {
      path
      title
      excerpt
    }
    body
  }
`
