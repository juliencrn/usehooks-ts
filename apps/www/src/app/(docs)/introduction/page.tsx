import { DocsPageHeader } from '@/components/docs-page-header'
import { H2, Mdx } from '@/components/remote-mdx'

export default async function IntroductionPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader
          id="introduction"
          className="scroll-m-20"
          heading={'Getting started'}
        />
        <H2>Install</H2>
        <Mdx source={Buffer.from('```bash\nnpm i usehooks-ts\n```')} />
      </div>
    </main>
  )
}
