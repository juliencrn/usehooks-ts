import { graphql, useStaticQuery } from 'gatsby'

import { Post } from '../interfaces'

function usePostList(): Post[] {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { frontmatter: { templateKey: { eq: "post" } } }
        limit: 1000
        sort: { fields: frontmatter___title, order: ASC }
      ) {
        edges {
          node {
            ...Post
          }
        }
      }
    }
  `)

  return data.allMdx.edges.map(({ node }: { node: Post }) => node)
}

export default usePostList
