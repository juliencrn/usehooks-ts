import { graphql } from 'gatsby'

/**
 * Fragments are globals
 * Just name and export it
 * So, make sure the names are uniques
 *
 * @link https://medium.com/flatiron-labs/using-graphql-fragments-across-multiple-templates-in-gatsbyjs-7731a2d28bbd
 */

export const postFragment = graphql`
  fragment postFragment on Mdx {
    excerpt(pruneLength: 155)
    frontmatter {
      templateKey
      date(formatString: "MMMM DD, YYYY")
      path
      title
      gistId
      gistFilename
      keywords
    }
    body
  }
`
