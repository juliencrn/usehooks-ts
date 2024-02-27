import { useRouter } from 'next/navigation'

import { CommandItem } from '../ui/command'
import { useCommandMenuContext } from './modal.context'

type Highlight = {
  value: string
  matchLevel: string
  matchedWords: string[]
}

type Fields<T> = {
  id: T
  title: T
  excerpt: T
  path: T
  titleWithoutUse: T
}

type HitProps = {
  hit: Fields<string> & {
    __position: number
    _highlightResult: Fields<Highlight>
  }
}

export function Hit({ hit }: HitProps) {
  const { handleClose } = useCommandMenuContext()
  const router = useRouter()

  return (
    <CommandItem
      onSelect={() => {
        handleClose()
        router.push(hit.path)
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: hit._highlightResult.title?.value || hit.title,
        }}
      />
    </CommandItem>
  )
}
