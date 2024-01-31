import { useState } from 'react'

import { useEventListener } from '../useEventListener'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

type UseScreenOptions<InitializeWithValue extends boolean | undefined> = {
  initializeWithValue: InitializeWithValue
}

const IS_SERVER = typeof window === 'undefined'

// SSR version of useScreen.
export function useScreen(options: UseScreenOptions<false>): Screen | undefined
// CSR version of useScreen.
export function useScreen(options?: Partial<UseScreenOptions<true>>): Screen
/**
 * Custom hook for tracking the screen dimensions and properties.
 * @param {?UseScreenOptions} [options] - The options for customizing the behavior of the hook (optional).
 * @param {?boolean} [options.initializeWithValue] - If `true` (default), the hook will initialize reading the screen dimensions. In SSR, you should set it to `false`, returning `undefined` initially.
 * @returns {Screen | undefined} The current `Screen` object representing the screen dimensions and properties, or `undefined` if not available.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-screen)
 * @example
 * const currentScreen = useScreen();
 * // Access properties of the current screen, such as width and height.
 */
export function useScreen(
  options: Partial<UseScreenOptions<boolean>> = {},
): Screen | undefined {
  let { initializeWithValue = true } = options
  if (IS_SERVER) {
    initializeWithValue = false
  }

  const [screen, setScreen] = useState<Screen | undefined>(() => {
    if (initializeWithValue) {
      return window.screen
    }
    return undefined
  })

  /** Handles the resize event of the window. */
  function handleSize() {
    setScreen(window.screen)
  }

  // TODO: Prefer incoming useResizeObserver hook
  useEventListener('resize', handleSize)

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize()
  }, [])

  return screen
}
