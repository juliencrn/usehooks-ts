'use server'

import fs from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import rehypeHighlight from 'rehype-highlight'
import remarkCodeImport from 'remark-code-import'
import remarkGfm from 'remark-gfm'

import { components } from '@/components/ui/components'
import type { BaseHook } from '@/types'

const SOURCE_PATH = path.resolve(process.cwd(), '..', '..', 'generated', 'docs')

export const getHook = async (slug: string) => {
  const filename = path.resolve(SOURCE_PATH, 'hooks', `${slug}.md`)
  const source = fs.readFileSync(filename, { encoding: 'utf-8' })
  return await compileMDX<BaseHook>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        // @ts-ignore TODO: fix types for rehype plugins
        rehypePlugins: [rehypeHighlight],
        remarkPlugins: [remarkCodeImport, remarkGfm],
      },
    },
    components,
  })
}

export const getHookList = () => {
  const filename = path.resolve(SOURCE_PATH, 'hooks.json')
  const file = fs.readFileSync(filename, { encoding: 'utf-8' })
  return JSON.parse(file) as BaseHook[]
}
