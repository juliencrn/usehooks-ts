import { Index } from 'react-instantsearch'

import { RenderHits } from './hits'
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
        <Index indexName="hooks">
          <CommandGroup heading="Hooks">
            <RenderHits />
          </CommandGroup>
        </Index>
        <Index indexName="removed-hooks">
          <CommandGroup heading="Removed hooks">
            <RenderHits />
          </CommandGroup>
        </Index>
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </CommandDialog>
  )
}
