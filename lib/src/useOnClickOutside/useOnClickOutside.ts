import { RefObject } from 'react'

import { useEventListener } from '../useEventListener'

type Handler = (event: MouseEvent) => void

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
): void {
  useEventListener('click', event => {
    const el = ref?.current

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) {
      return
    }

    // Explicit type for "click" event.
    handler(event as unknown as MouseEvent)
  })
}

export default useOnClickOutside
