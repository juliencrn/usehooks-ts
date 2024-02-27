import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DocsPageHeader } from '@/components/docs-page-header'
import { DocsPager } from '@/components/paper'
import { Mdx } from '@/components/remote-mdx'
import type { TocItem } from '@/components/table-of-content'
import { DashboardTableOfContents } from '@/components/table-of-content'
import { H2 } from '@/components/ui/components'
import { siteConfig } from '@/config/site'
import { getPost, getPosts } from '@/lib/mdx'

export const generateStaticParams = async () => {
  return getPosts().map(post => ({ slug: post.slug }))
}

export const generateMetadata = (props: {
  params: { slug: string }
}): Metadata => {
  const post = getPost(props.params.slug)
  if (!post) {
    return {}
  }

  const title = post.name
  const description = `Discover how to use ${post.name} from usehooks-ts`
  const url = siteConfig.url + post.href
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

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = getPost(params.slug)

  if (!post) {
    notFound()
  }

  const tocItems: TocItem[] = [{ title: 'Introduction', url: '#introduction' }]
  if (post?.demo) {
    tocItems.push({ title: 'Example', url: '#example' })
  }
  if (post?.hook) {
    tocItems.push({ title: 'Hook', url: '#hook' })
  }

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px] xl:grid-rows-[auto_1fr_auto]">
      <div className="mx-auto w-full min-w-0 grid">
        <DocsPageHeader
          id="introduction"
          className="scroll-m-20"
          heading={post.name}
        />
        <Mdx source={post.docs} />

        {post?.demo && (
          <>
            <H2 id="example">Example</H2>
            <Mdx source={post.demo} />
          </>
        )}
        {post?.hook && (
          <>
            <H2 id="hook">Hook</H2>
            <Mdx source={post.hook} />
          </>
        )}

        <hr className="my-4 md:my-6" />
        <DocsPager slug={post.slug} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={{ items: tocItems }} />
        </div>
      </div>
    </main>
  )
}

export default PostLayout
