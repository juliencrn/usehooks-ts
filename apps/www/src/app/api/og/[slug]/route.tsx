import { readFileSync } from 'fs'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { join } from 'path'

import { getPosts } from '@/lib/mdx'

// read the file as base64, because nextResponse want a absolute url which is not possible during build time
const templateImageBuffer = readFileSync(
  // this looks weird, but it's the only way I could get it to work in all environments
  join(new URL('', import.meta.url).pathname, '../og-template.png'),
  'base64',
)

export async function GET(_: NextRequest, ctx: { params: { slug: string } }) {
  const { slug } = ctx.params
  const camelCaseSlug = slug.replace(/-([a-z])/g, m => m[1].toUpperCase())
  const githubUrl = `https://usehooks-ts.com/react-hook/${slug}`

  const jetBrainsMonoFont = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-500-normal.woff',
  ).then(res => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          backgroundImage: `url("data:image/png;base64,${templateImageBuffer}")`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            textAlign: 'right',
            fontFamily: 'JetBrains Mono',
            letterSpacing: '-0.05em',
            fontStyle: 'normal',
            fontWeight: 500,
            color: 'white',
            whiteSpace: 'pre-wrap',
            padding: 40,
          }}
        >
          <div style={{ fontSize: 90 }}>{camelCaseSlug}</div>
          <div style={{ fontSize: 40 }}>{githubUrl}</div>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'JetBrains Mono',
          data: jetBrainsMonoFont,
          style: 'normal',
        },
      ],
    },
  )
}

// create only those images that we need
export const generateStaticParams = async () => {
  return getPosts().map(post => ({ slug: post.slug }))
}
export const dynamicParams = false
export const dynamic = 'error'
