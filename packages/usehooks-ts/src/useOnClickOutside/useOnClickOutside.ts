import type { RefObject } from 'react'

import { useEventListener } from '../useEventListener'

type EventType = 'mousedown' | 'mouseup' | 'touchstart' | 'touchend'

/**
 * Custom hook for handling clicks outside a specified element.
 * @template T - The type of the element's reference.
 * @param {RefObject<T>} ref - The React ref object representing the element to watch for outside clicks.
 * @param {(event: MouseEvent | TouchEvent) => void} handler - The callback function to be executed when a click outside the element occurs.
 * @param {EventType} [eventType] - The mouse event type to listen for (optional, default is 'mousedown').
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
  handler: (event: MouseEvent | TouchEvent) => void,
  eventType: EventType = 'mousedown',
): void {
  useEventListener(eventType, event => {
    const target = event.target as Node

    // Do nothing if clicking ref's element or descendent elements or not connected element with document
    if (!el || el.contains(target) || !target.isConnected) {
      return
    }

    handler(event)
  })
}
