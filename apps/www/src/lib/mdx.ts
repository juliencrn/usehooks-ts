import fs from 'fs'
import path from 'path'

import { Option, Post } from '@/types'

const GENERATED_PATH = path.resolve(process.cwd(), 'generated')

const allPosts = fs
  .readdirSync(`${GENERATED_PATH}/posts`)
  .filter(filename => /\.md?$/.test(filename))

const getHook = (name: string): Option<Buffer> => {
  const pathname = path.join(GENERATED_PATH, 'hooks', `${name}.md`)
  return readFile(pathname)
}

const getDemo = (name: string): Option<Buffer> => {
  const pathname = path.join(GENERATED_PATH, 'demos', `${name}.md`)
  return readFile(pathname)
}

const readFile = (pathname: string): Option<Buffer> => {
  try {
    return fs.readFileSync(pathname)
  } catch (error) {
    console.warn(`Document not found: ${pathname}`)
    return null
  }
}

export const getPosts = (): Post[] => {
  return allPosts
    .map(filename => {
      const name = filename.replace(/\.mdx?$/, '')
      const slug = name.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
      const href = `/react-hook/${slug}`
      const pathname = path.join(GENERATED_PATH, 'posts', filename)
      const docs = readFile(pathname)
      const hook = getHook(name)
      const demo = getDemo(name)
      return { name, slug, href, docs, hook, demo }
    })
    .filter(post => post.docs && post.hook && post.demo)
    .sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    }) as Post[]
}

export const getPost = (slug: string): Option<Post> => {
  const allPosts = getPosts()
  const post = allPosts.find(post => post.slug === slug)
  return post || null
}
