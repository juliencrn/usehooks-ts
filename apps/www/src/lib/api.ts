'use server'

import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'

import { components } from '@/components/ui/components'
import type { BaseHook } from '@/types'
import fs from 'fs/promises'

const SOURCE_PATH = path.resolve(process.cwd(), '..', '..', 'generated', 'docs')

/**
 * Fetches and compiles the Markdown content for a specific hook.
 * @param slug The slug of the hook to fetch.
 * @returns Compiled MDX content for the hook.
 */
export const getHook = async (slug: string) => {
  try {
    const filename = path.resolve(SOURCE_PATH, 'hooks', `${slug}.md`)
    const source = await fs.readFile(filename, { encoding: 'utf-8' })
    return await compileMDX<BaseHook>({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          // @ts-ignore any
          rehypePlugins: [[rehypePrism]],
          remarkPlugins: [remarkGfm],
        },
      },
      components,
    })
  } catch (error) {
    console.error(`Error fetching hook with slug '${slug}': `, error)
    throw error
  }
}

/**
 * Retrieves a list of all hooks from the JSON file.
 * @returns An array of BaseHook objects representing all hooks.
 */
export const getHookList = async () => {
  try {
    const filename = path.resolve(SOURCE_PATH, 'hooks.json')
    const file = await fs.readFile(filename, { encoding: 'utf-8' })
    return JSON.parse(file) as BaseHook[]
  } catch (error) {
    console.error(`Error retrieving hook list: `, error)
    throw error
  }
}
