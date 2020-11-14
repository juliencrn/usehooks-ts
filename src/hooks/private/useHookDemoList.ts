import { graphql, useStaticQuery } from 'gatsby'

import { AnyMdx } from '../../models'

interface HookDemoQuery {
  demos: { nodes: AnyMdx[] }
}

function useHookDemoList(): AnyMdx[] {
  const data = useStaticQuery<HookDemoQuery>(graphql`
    {
      demos: allMdx(
        filter: { fields: { type: { eq: "demo" } } }
        limit: 1000
        sort: { fields: frontmatter___title, order: ASC }
      ) {
        nodes {
          ...AnyMdx
        }
      }
    }
  `)

  return data.demos.nodes
}

export default useHookDemoList
