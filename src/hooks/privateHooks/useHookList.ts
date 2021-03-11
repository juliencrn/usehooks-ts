import { graphql, useStaticQuery } from 'gatsby'

import { Post, HookNode } from '~/models'

export interface GroupedHookList {
  posts: { nodes: Post[] }
  hooks: { nodes: HookNode[] }
  demos: { nodes: HookNode[] }
}

function useHookList(): GroupedHookList {
  const data = useStaticQuery<GroupedHookList>(graphql`
    {
      posts: allMdx(filter: { fileAbsolutePath: { regex: "/src/hooks/" } }) {
        nodes {
          ...Post
        }
      }
      hooks: allMdx(
        filter: { fileAbsolutePath: { regex: "/generated/hooks/" } }
      ) {
        nodes {
          ...HookNode
        }
      }
      demos: allMdx(
        filter: { fileAbsolutePath: { regex: "/generated/hookDemos/" } }
      ) {
        nodes {
          ...HookNode
        }
      }
    }
  `)

  return data
}

export default useHookList
