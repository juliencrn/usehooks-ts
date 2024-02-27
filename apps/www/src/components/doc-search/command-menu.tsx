import { Hits } from 'react-instantsearch'

import { Hit } from './hit'
import { SearchInput } from './input'
import { useCommandMenuContext } from './modal.context'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from '@/components/ui/command'

export function CommandMenu() {
  const { open, setOpen } = useCommandMenuContext()

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <SearchInput />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Hooks">
          <Hits hitComponent={Hit} />
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
