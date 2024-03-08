import { CarbonAds } from '../carbon-ads'
import type { TableOfContents } from './table-of-content'
import { TableOfContent } from './table-of-content'

type Props = {
  toc: TableOfContents
}

export function RightSidebar({ toc }: Props) {
  return (
    <aside className="hidden text-sm xl:block">
      <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10 flex flex-col gap-10">
        <TableOfContent toc={toc} />

        <CarbonAds />
      </div>
    </aside>
  )
}
