import { RefObject, useEffect, useRef } from 'react'

function useEventListener<T extends HTMLElement = HTMLDivElement> (
  eventName: keyof WindowEventMap | string, // string to allow custom event
  handler: (event: Event) => void,
  element?: RefObject<T>
): void {
  // Create a ref that stores handler
  const savedHandler = useRef<(event: Event) => void>()

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = window
    if ((targetElement?.addEventListener) == null) {
      return
    }

    // Update saved handler if necessary
    if (savedHandler.current !== handler) {
      savedHandler.current = handler
    }

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: Event): void => {
      // eslint-disable-next-line no-extra-boolean-cast
      if (((savedHandler?.current) != null)) {
        savedHandler.current(event)
      }
    }

    targetElement.addEventListener(eventName, eventListener)

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element, handler])
}

export default useEventListener
