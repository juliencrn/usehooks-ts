import { CommandCopy } from '@/components/command-copy'
import { DocsPageHeader } from '@/components/docs-page-header'
import { components } from '@/components/ui/components'
import { siteConfig } from '@/config/site'

export default async function IntroductionPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader
          id="introduction"
          className="scroll-m-20"
          heading={'Getting started'}
        />

        <components.h2>Install</components.h2>
        <components.p>
          In order to get started with using{' '}
          <components.a href={siteConfig.links.github}>
            useHooks(🔥).ts
          </components.a>
          , Install{' '}
          <components.code>
            <components.a href={siteConfig.links.npm}>usehooks-ts</components.a>
          </components.code>{' '}
          using your preferred package manager.
        </components.p>
        <CommandCopy
          className="my-2"
          command={{
            npm: 'npm install usehooks-ts',
            pnpm: 'pnpm add usehooks-ts',
            yarn: 'yarn add usehooks-ts',
            bun: 'bun add usehooks-ts',
          }}
        />
      </div>
    </main>
  )
}
