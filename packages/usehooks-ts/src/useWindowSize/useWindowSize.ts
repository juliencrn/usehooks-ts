import { useState } from 'react'

import { useEventListener } from '../useEventListener'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

interface WindowSize {
  width: number
  height: number
}

type UseWindowSizeOptions<InitializeWithValue extends boolean | undefined> = {
  initializeWithValue: InitializeWithValue
}

const IS_SERVER = typeof window === 'undefined'

// SSR version of useWindowSize.
export function useWindowSize(
  options: UseWindowSizeOptions<false>,
): WindowSize | undefined
// CSR version of useWindowSize.
export function useWindowSize(
  options?: Partial<UseWindowSizeOptions<true>>,
): WindowSize
/**
 * Custom hook that tracks the size of the window.
 * @param {?UseWindowSizeOptions} [options] - The options for customizing the behavior of the hook (optional).
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
): WindowSize | undefined {
  let { initializeWithValue = true } = options
  if (IS_SERVER) {
    initializeWithValue = false
  }

  const [windowSize, setWindowSize] = useState(() => {
    if (initializeWithValue) {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }
    return undefined
  })

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  // TODO: Prefer incoming useResizeObserver hook
  useEventListener('resize', handleSize)

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return windowSize
}
