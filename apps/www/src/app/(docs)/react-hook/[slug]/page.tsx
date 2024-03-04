import type { Metadata } from 'next'

import { CarbonAds } from '@/components/carbon-ads'
import { DocsPageHeader } from '@/components/docs-page-header'
import { DocsPager } from '@/components/paper'
import { DashboardTableOfContents } from '@/components/table-of-content'
import { siteConfig } from '@/config/site'
import { getHook, getHookList } from '@/lib/api'

export const generateStaticParams = async () => {
  const hooks = await getHookList()
  return hooks.map(hook => ({ slug: hook.slug }))
}

export const generateMetadata = async (props: {
  params: { slug: string }
}): Promise<Metadata> => {
  const hooks = await getHookList()
  const hook = hooks.find(hook => hook.slug === props.params.slug)
  if (!hook) {
    return {}
  }

  const title = hook.name
  const description = hook.summary
  const url = siteConfig.url + hook.path
  const imageUrl = `https://via.placeholder.com/1200x630.png/007ACC/fff/?text=${title}`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function HookPage({
  params,
}: {
  params: { slug: string }
}) {
  const [{ frontmatter, content }, hookList] = await Promise.all([
    getHook(params.slug),
    getHookList(),
  ])

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px] xl:grid-rows-[auto_1fr_auto]">
      <div className="mx-auto w-full min-w-0 grid">
        <DocsPageHeader
          id="introduction"
          className="scroll-m-20"
          heading={frontmatter.name}
        />

        {content}

        <hr className="my-4 md:my-6" />
        <DocsPager slug={frontmatter.slug} hooks={hookList} />
      </div>
      <aside className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents
            toc={{
              items: [
                { title: 'Documentation', url: '#documentation' },
                { title: 'Usage', url: '#usage' },
                { title: 'Hook', url: '#hook' },
              ],
            }}
          />

          <div className="my-10">
            <CarbonAds />
          </div>
        </div>
      </aside>
    </main>
  )
}
