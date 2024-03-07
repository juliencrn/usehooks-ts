import { useRouter } from 'next/navigation'

import { CommandItem } from '../ui/command'
import { useCommandMenuContext } from './modal.context'
import type { Hit } from './types'

type HitProps = {
  hit: Hit
}

export function Hit({ hit }: HitProps) {
  const { handleClose } = useCommandMenuContext()
  const router = useRouter()

  return (
    <CommandItem
      className="flex flex-col [&_mark]:bg-accent [&_mark]:text-accent-foreground"
      onSelect={() => {
        handleClose()
        router.push(`/react-hook/${hit.objectID}`)
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
          __html: (hit._highlightResult.summary?.value || hit.summary).replace(
            'Custom hook that ',
            '',
          ),
        }}
      />
    </CommandItem>
  )
}
