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

        <components.h2>Introduction</components.h2>
        <components.h3 className="text-muted-foreground my-0 font-normal">
          React hook library, ready to use, written in Typescript.
        </components.h3>
        <components.p>
          <span className="font-bold">useHooks(🔥).ts </span>
          is a React hooks library, written in Typescript. It provides a set of
          hooks that enables you to build your React applications faster. The
          hooks are built upon the principles of{' '}
          <span className="font-semibold">DRY</span> (Don&apos;t Repeat
          Yourself). There are hooks for most common use cases you might need.
        </components.p>
        <components.p>
          The library is designed to be as minimal as possible. It is fully
          treeshakable, meaning that you only import the hooks you need, and the
          rest will be removed from your bundle making the cost of using this
          library negligible. Most hooks are extensively tested and are being
          used in Production environments.
        </components.p>
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
