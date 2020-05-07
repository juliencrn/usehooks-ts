import { useEffect, RefObject, MutableRefObject } from 'react'

type Event = MouseEvent | TouchEvent

function useOnClickOutside<T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
) {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains((event?.target as Node) || null)) {
        return
      }

      handler(event)
    }

    document.addEventListener(`mousedown`, listener)
    document.addEventListener(`touchstart`, listener)

    return () => {
      document.removeEventListener(`mousedown`, listener)
      document.removeEventListener(`touchstart`, listener)
    }

    // Reload only if ref or handler changes
  }, [ref as MutableRefObject<T>, handler])
}

export default useOnClickOutside
