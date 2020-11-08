import { graphql, useStaticQuery } from 'gatsby'

import { Post } from '../../models'

function usePostList(): Post[] {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/content/posts/[a-zA-Z]*/[a-zA-Z]*.md/" }
        }
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
