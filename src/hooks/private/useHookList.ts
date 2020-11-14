import { graphql, useStaticQuery } from 'gatsby'

import { AnyMdx } from '../../models'

interface HookQuery {
  hooks: { nodes: AnyMdx[] }
}

function useHookList(): AnyMdx[] {
  const data = useStaticQuery<HookQuery>(graphql`
    {
      hooks: allMdx(
        filter: { fields: { type: { eq: "hook" } } }
        limit: 1000
        sort: { fields: frontmatter___title, order: ASC }
      ) {
        nodes {
          ...AnyMdx
        }
      }
    }
  `)

  return data.hooks.nodes
}

export default useHookList
