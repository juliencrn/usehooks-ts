import type { RefObject } from 'react'

import { useEventListener } from '../useEventListener'

/**
 * Custom hook for handling clicks outside a specified element.
 * @template T - The type of the element's reference.
 * @param {RefObject<T>} ref - The React ref object representing the element to watch for outside clicks.
 * @param {(event: MouseEvent) => void} handler - The callback function to be executed when a click outside the element occurs.
 * @param {'mousedown' | 'mouseup'} [mouseEvent] - The mouse event type to listen for (optional, default is 'mousedown').
 * @returns {void}
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-on-click-outside)
 * @example
 * const containerRef = useRef(null);
 * useOnClickOutside(containerRef, () => {
 *   // Handle clicks outside the container.
 * });
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  useEventListener(mouseEvent, event => {
    const el = ref.current

    const target = event.target as Node

    // Do nothing if clicking ref's element or descendent elements or not connected element with document
    if (!el || el.contains(target) || !target.isConnected) {
      return
    }

    handler(event)
  })
}
