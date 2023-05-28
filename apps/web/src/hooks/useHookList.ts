import { graphql, useStaticQuery } from 'gatsby'

import { HookNode, Post } from '~/models'

export interface GroupedHookList {
  posts: { nodes: Omit<Post, 'body'>[] }
  hooks: { nodes: HookNode[] }
  demos: { nodes: HookNode[] }
}

function useHookList(): GroupedHookList {
  const data = useStaticQuery<GroupedHookList>(graphql`
    {
      posts: allMdx(filter: { fields: { type: { eq: "post" } } }) {
        nodes {
          ...PostPreview
        }
      }
      hooks: allMdx(filter: { fields: { type: { eq: "hook" } } }) {
        nodes {
          ...HookNode
        }
      }
      demos: allMdx(filter: { fields: { type: { eq: "demo" } } }) {
        nodes {
          ...HookNode
        }
      }
    }
  `)

  return data
}

export default useHookList
