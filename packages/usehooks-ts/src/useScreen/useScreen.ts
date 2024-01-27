import { useState } from 'react'

import { useEventListener } from '../useEventListener'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

/**
 * Custom hook for tracking the screen dimensions and properties.
 * @returns {Screen | undefined} The current `Screen` object representing the screen dimensions and properties, or `undefined` if not available.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-screen)
 * @example
 * const currentScreen = useScreen();
 * // Access properties of the current screen, such as width and height.
 */
export function useScreen(): Screen | undefined {
  const getScreen = () => {
    if (typeof window !== 'undefined') {
      return window.screen
    }
    return undefined
  }

  const [screen, setScreen] = useState<Screen | undefined>(undefined)

  /** Handles the resize event of the window. */
  function handleSize() {
    setScreen(getScreen())
  }

  // TODO: Prefer incoming useResizeObserver hook
  useEventListener('resize', handleSize)

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize()
  }, [])

  return screen
}
