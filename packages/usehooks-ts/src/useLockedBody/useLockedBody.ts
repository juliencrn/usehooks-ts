import { useEffect, useState } from 'react'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

/**
 * Custom hook for locking and unlocking the body scroll to prevent scrolling.
 * @param {?boolean} [initialLocked] - The initial state of body scroll lock (default to `false`).
 * @param {?string} [rootId] - The ID of the root element to calculate scrollbar width (default to `___gatsby` to not introduce breaking change).
 * @returns {[boolean, (locked: boolean) => void]} A tuple containing the current state of body scroll lock and a function to set the state.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-locked-body)
 * @example
 * const [isLocked, setLocked] = useLockedBody(true);
 * // Use isLocked to conditionally apply styles or prevent scrolling.
 * // Use setLocked to dynamically control the body scroll lock state.
 */
export function useLockedBody(
  initialLocked = false,
  rootId = '___gatsby',
): [boolean, (locked: boolean) => void] {
  const [locked, setLocked] = useState(initialLocked)

  // Do the side effect before render
  useIsomorphicLayoutEffect(() => {
    if (!locked) {
      return
    }

    // Save initial body style
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    // Lock body scroll
    document.body.style.overflow = 'hidden'

    // Get the scrollBar width
    const root = document.getElementById(rootId) // or root
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0

    // Avoid width reflow
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalOverflow

      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight
      }
    }
  }, [locked])

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked])

  return [locked, setLocked]
}
