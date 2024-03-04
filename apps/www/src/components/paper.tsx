import Link from 'next/link'

import { ChevronLeft, ChevronRight } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { cn, mapHookToNavLink } from '@/lib/utils'
import type { BaseHook } from '@/types'

type DocsPagerProps = {
  slug: string
  hooks: BaseHook[]
}

export function DocsPager({ slug, hooks }: DocsPagerProps) {
  const { prev, next } = getPaperElements({ slug, hooks })

  if (!prev && !next) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {prev && (
        <Link
          href={prev.href}
          className={cn(buttonVariants({ variant: 'ghost' }))}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {prev.title}
        </Link>
      )}
      {next && (
        <Link
          href={next.href}
          className={cn(buttonVariants({ variant: 'ghost' }), 'ml-auto')}
        >
          {next.title}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

function getPaperElements({ slug, hooks }: DocsPagerProps) {
  const activeIndex = hooks.findIndex(h => h.slug === slug)
  const links = hooks.map(mapHookToNavLink)
  const prev = activeIndex !== 0 ? links[activeIndex - 1] : null
  const next = activeIndex !== hooks.length - 1 ? links[activeIndex + 1] : null

  return { prev, next }
}
