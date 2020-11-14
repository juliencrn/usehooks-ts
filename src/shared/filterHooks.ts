import { Post, AnyMdx } from '../models'

export interface ExtendedPost {
  post: Post
  hookId: string
  demoId: string
}

export function filterHook(
  posts: Post[],
  hooks: AnyMdx[],
  demos: AnyMdx[],
): ExtendedPost[] {
  const matchesPosts: ExtendedPost[] = []
  posts.forEach(post => {
    const { fields } = post

    // Check if have the corresponding hook
    const hook = hooks.find(
      ({ fields: { hookName } }) => hookName === fields.hookName,
    )

    // Check if have the corresponding hook demo
    const demo = demos.find(
      ({ fields: { hookName } }) => hookName === fields.hookName,
    )

    if (hook && demo) {
      matchesPosts.push({ post, hookId: hook.id, demoId: demo.id })
    }
  })

  return matchesPosts
}
