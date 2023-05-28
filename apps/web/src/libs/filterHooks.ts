import { HookNode } from '../models'

export interface ExtendedPost<T extends HookNode = HookNode> {
  post: T
  hookId: string
  demoId: string
}

// Attach a hook and a demo to a post and ignore alone items
export function filterHook<T extends HookNode = HookNode>(
  posts: T[],
  hooks: HookNode[],
  demos: HookNode[],
): ExtendedPost<T>[] {
  const matchesPosts: ExtendedPost<T>[] = []

  posts.forEach(post => {
    // Check if have the corresponding hook and demo
    const hook = hooks.find(({ fields }) => fields.name === post.fields.name)
    const demo = demos.find(({ fields }) => fields.name === post.fields.name)

    if (hook && demo) {
      const extendedPost = { post, hookId: hook.id, demoId: demo.id }
      matchesPosts.push(extendedPost)
    }
  })

  return matchesPosts
}

// Sort alphabetically
export function sortPosts<T extends HookNode = HookNode>(
  posts: ExtendedPost<T>[],
): ExtendedPost<T>[] {
  return posts.sort((a, b) => {
    if (a.post.fields.name < b.post.fields.name) return -1
    if (a.post.fields.name > b.post.fields.name) return 1
    return 0
  })
}
