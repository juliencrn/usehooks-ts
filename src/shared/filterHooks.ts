import { HookNode } from '../models'
export interface ExtendedPost<T extends HookNode = HookNode> {
  post: T
  hookId: string
  demoId: string
}

export function filterHook<T extends HookNode = HookNode>(
  posts: T[],
  hooks: HookNode[],
  demos: HookNode[],
): ExtendedPost<T>[] {
  const matchesPosts: ExtendedPost<T>[] = []
  posts.forEach(post => {
    const { fields } = post

    // Check if have the corresponding hook
    const hook = hooks.find(({ fields: { name } }) => name === fields.name)

    // Check if have the corresponding hook demo
    const demo = demos.find(({ fields: { name } }) => name === fields.name)

    if (hook && demo) {
      matchesPosts.push({ post, hookId: hook.id, demoId: demo.id })
    }
  })

  return matchesPosts
}
