import { graphql, useStaticQuery } from 'gatsby'

import { Post } from '../interfaces'

function usePostList(): Post[] {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
        limit: 1000
        sort: { fields: frontmatter___title, order: ASC }
      ) {
        nodes {
          ...Post
        }
      }
    }
  `)

  return data.allMdx.nodes
}

export default usePostList
