import Link from 'next/link'

import { ChevronLeft, ChevronRight } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { getHookList } from '@/lib/api'
import { cn, mapHookToNavLink } from '@/lib/utils'

type DocsPagerProps = {
  slug: string
}

export function DocsPager({ slug }: DocsPagerProps) {
  const pager = getPagerForDoc(slug)

  if (!pager) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev && (
        <Link
          href={pager.prev.href}
          className={cn(buttonVariants({ variant: 'ghost' }))}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: 'ghost' }), 'ml-auto')}
        >
          {pager.next.title}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

export function getPagerForDoc(slug: string) {
  const hooks = getHookList()
  const activeIndex = hooks.findIndex(h => h.slug === slug)
  const links = hooks.map(mapHookToNavLink)
  const prev = activeIndex !== 0 ? links[activeIndex - 1] : null
  const next = activeIndex !== hooks.length - 1 ? links[activeIndex + 1] : null

  return { prev, next }
}
