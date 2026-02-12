import { useRouter } from 'next/navigation'
import { useHits } from 'react-instantsearch'

import { CommandItem } from '../ui/command'
import { useCommandMenuContext } from './modal.context'
import type { Hit } from './types'

export function RenderHits() {
  const { hits, results } = useHits<Hit>()

  if (!results?.index) {
    return null
  }

  return (
    <>
      {hits.map(hit => (
        <HitComponent
          key={hit.objectID}
          hit={hit}
          makeUrl={slug =>
            results.index === 'hooks'
              ? `/react-hook/${slug}`
              : `/migrate-to-v3#removed-hooks`
          }
        />
      ))}
    </>
  )
}

type HitProps = {
  hit: Hit
  makeUrl: (slug: string) => string
}

function HitComponent({ hit, makeUrl }: HitProps) {
  const { handleClose } = useCommandMenuContext()
  const router = useRouter()

  return (
    <CommandItem
      className="flex flex-col [&_mark]:bg-accent [&_mark]:text-accent-foreground"
      onSelect={() => {
        handleClose()

        const url = makeUrl(hit.objectID)
        router.push(url)
      }}
    >
      <div
        className="font-mono"
        dangerouslySetInnerHTML={{
          __html: (hit._highlightResult.name?.value || hit.name) + '()',
        }}
      />
      <div
        className="text-sm text-muted-foreground"
        dangerouslySetInnerHTML={{
          __html: (
            hit._highlightResult.summary?.value ??
            hit?.summary ??
            ''
          ).replace('Custom hook that ', ''),
        }}
      />
    </CommandItem>
  )
}
