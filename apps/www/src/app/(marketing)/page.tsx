import type { LucideIcon } from 'lucide-react'
import { Blocks, ChevronRight, Gift, Star } from 'lucide-react'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import {
  Code,
  GitHub,
  Globe,
  Leaf,
  Puzzle,
  Unplug,
  Zap,
} from '@/components/ui/icons'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

type Feature = {
  icon: LucideIcon
  title: string
  content: string
}

const features: Feature[] = [
  {
    icon: Zap,
    title: 'Lightweight',
    content:
      'usehooks-ts is a tiny library without any dependencies, ensuring a lean and efficient solution.',
  },
  {
    icon: Unplug,
    title: 'Type-Safe',
    content:
      'Catch compile-time errors with ease and unlock strong typing benefits.',
  },
  {
    icon: Leaf,
    title: 'Tree-Shakable',
    content:
      'Eliminating unused code and delivering leaner bundles for lightning-fast load times.',
  },
  {
    icon: Puzzle,
    title: 'Easy to Use',
    content:
      'Get started in no time! Explore comprehensive documentation and rich examples.',
  },
  {
    icon: Code,
    title: 'Developer-Friendly',
    content:
      "Simplify development with an intuitive and powerful API. Don't repeat yourself.",
  },
  {
    icon: Globe,
    title: 'Open-Source',
    content:
      'Join the vibrant community! Collaborate, contribute, and unlock endless possibilities together.',
  },
]

async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      'https://api.github.com/repos/juliencrn/usehooks-ts',
      {
        headers: {
          Accept: 'application/vnd.github+json',
        },
        next: {
          revalidate: 60,
        },
      },
    )

    if (!response?.ok) {
      return null
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await response.json()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/dot-notation
    return parseInt(json['stargazers_count']).toLocaleString()
  } catch (error) {
    return null
  }
}

export default async function IndexPage() {
  const stars = await getGitHubStars()

  return (
    <>
      <section className="space-y-6 pb-12 pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {siteConfig.description}
          </p>
          <div className="my-2">
            <Link
              href="/introduction"
              className={cn(buttonVariants({ size: 'lg' }))}
            >
              Explore the docs{` `}
              <ChevronRight className="ml-3 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="container space-y-6 bg-slate-50 dark:bg-transparent py-16 lg:py-32"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          {/* <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern app, with features
            like auth, subscriptions, API routes, and static pages would work in
            Next.js 13 app dir.
          </p> */}
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {features.map(({ title, content, icon: Icon }, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex min-h-[180px] flex-col justify-start rounded-md p-6">
                <Icon className="h-8 w-8 mb-3" />
                <div className="space-y-2">
                  <h3 className="font-bold">{title}</h3>
                  <p className="text-sm">{content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="container  py-16 lg:py-32">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-8 lg:mb-12">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Pricing
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Just kidding! usehooks-ts is free and open-source.
            <br />
            You can still make your contribution!
          </p>
        </div>

        <div className="mx-auto flex max-w-[40rem] divide-x divide-solid">
          <div className="flex-1 p-4 md:px-8 flex flex-col justify-end gap-3">
            <Link
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'justify-start',
              )}
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <Star fill="white" className="h-6 w-6 mr-2" />
              Give us a star
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'justify-start',
              )}
              href={`${siteConfig.links.github}/blob/master/.github/CONTRIBUTING.md`}
              target="_blank"
              rel="noreferrer"
            >
              <Blocks fill="white" className="h-6 w-6 mr-2" />
              Contribute
            </Link>
          </div>

          <div className="flex-1 p-4 md:px-8 flex flex-col justify-end gap-3">
            <Link
              href={`https://github.com/sponsors/juliencrn`}
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'justify-start',
              )}
              target="_blank"
              rel="noreferrer"
            >
              <Gift className="h-6 w-6 mr-2" />
              Become a sponsor
            </Link>
          </div>
        </div>
      </section>

      <section id="get-started" className="container py-16 lg:py-32">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Ready to get started?
          </h2>
          <div className="my-4">
            <Link
              href="/introduction"
              className={cn(buttonVariants({ size: 'lg' }))}
            >
              Explore the docs{` `}
              <ChevronRight className="ml-3 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section id="open-source" className="container py-16 lg:py-32">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            usehooks-ts is open source and powered by open source software.{' '}
            <br /> The code is available on{' '}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{' '}
          </p>
          {stars && (
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
                <GitHub className="h-6 w-6" />
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
                <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
                  {stars} stars on GitHub
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>
    </>
  )
}
