import { graphql, useStaticQuery } from 'gatsby'

import { Hook } from '../../models/Hook'

interface HookQuery {
  hooks: { nodes: Hook[] }
}

function useHookList(): Hook[] {
  const data = useStaticQuery<HookQuery>(graphql`
    {
      hooks: allMdx(
        filter: { fields: { type: { eq: "hook" } } }
        limit: 1000
        sort: { fields: frontmatter___title, order: ASC }
      ) {
        nodes {
          ...Hook
        }
      }
    }
  `)

  return data.hooks.nodes
}

export default useHookList
