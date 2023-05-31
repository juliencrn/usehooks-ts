// import { withContentlayer } from "next-contentlayer"
import mdx from '@next/mdx'
import rehypeHighlight from 'rehype-highlight'
import remarkCodeImport from 'remark-code-import'

import './env.mjs'
import sitemap from './next-sitemap.config.mjs'

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  swcMinify: true,
  env: {
    sitemap,
  },
  // Allow fs
  // webpack(config) {
  //   config.resolve.fallback = { ...config.resolve.fallback, fs: false }
  //   return config
  // },
}

export default withMDX(nextConfig)
