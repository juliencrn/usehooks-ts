import { useState } from 'react'

import { useDebounceCallback } from '../useDebounceCallback'
import { useEventListener } from '../useEventListener'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

interface WindowSize<T extends number | undefined = number | undefined> {
  width: T
  height: T
}

type UseWindowSizeOptions<InitializeWithValue extends boolean | undefined> = {
  initializeWithValue: InitializeWithValue
  debounceDelay?: number
}

const IS_SERVER = typeof window === 'undefined'

// SSR version of useWindowSize.
export function useWindowSize(options: UseWindowSizeOptions<false>): WindowSize
// CSR version of useWindowSize.
export function useWindowSize(
  options?: Partial<UseWindowSizeOptions<true>>,
): WindowSize<number>
/**
 * Custom hook that tracks the size of the window.
 * @param {?UseWindowSizeOptions} [options] - The options for customizing the behavior of the hook (optional).
 * @param {?boolean} [options.initializeWithValue] - If `true` (default), the hook will initialize reading the window size. In SSR, you should set it to `false`, returning `undefined` initially.
 * @param {?number} [options.debounceDelay] - The delay in milliseconds before the state is updated (disabled by default for retro-compatibility).
 * @returns {object} An object containing the width and height of the window.
 * @property {number} width - The width of the window.
 * @property {number} height - The height of the window.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-window-size)
 * @example
 * // Usage of useWindowSize hook
 * const { width, height } = useWindowSize();
 * console.log(`Window size: ${width} x ${height}`);
 */
export function useWindowSize(
  options: Partial<UseWindowSizeOptions<boolean>> = {},
): WindowSize | WindowSize<number> {
  let { initializeWithValue = true } = options
  if (IS_SERVER) {
    initializeWithValue = false
  }

  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    if (initializeWithValue) {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }
    return {
      width: undefined,
      height: undefined,
    }
  })

  const debouncedSetWindowSize = useDebounceCallback(
    setWindowSize,
    options?.debounceDelay,
  )

  function handleSize() {
    const setSize = options?.debounceDelay
      ? debouncedSetWindowSize
      : setWindowSize

    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEventListener('resize', handleSize)

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize()
  }, [])

  return windowSize
}
