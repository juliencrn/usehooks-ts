import { RefObject } from 'react'

import { useEventListener } from '..'

type Handler = (event: MouseEvent) => void

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  useEventListener(mouseEvent, event => {
    const el = ref?.current

    const target = event.target as Node

    // Do nothing if clicking ref's element or descendent elements or not connected element with document
    if (!el || el.contains(target) || !target.isConnected) {
      return
    }

    handler(event)
  })
}
