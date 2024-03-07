import { useHits } from 'react-instantsearch'

import { Hit } from './hit'
import { SearchInput } from './input'
import { useCommandMenuContext } from './modal.context'
import type { Hit as HitType } from './types'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from '@/components/ui/command'

export function CommandMenu() {
  const { open, setOpen } = useCommandMenuContext()
  const { hits } = useHits<HitType>()

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <SearchInput />
      <CommandList>
        {hits.length ? (
          <CommandGroup heading="Hooks">
            {hits.map(hit => (
              <Hit key={hit.objectID} hit={hit} />
            ))}
          </CommandGroup>
        ) : (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
      </CommandList>
    </CommandDialog>
  )
}
