import { useState } from 'react'

import { useEventListener } from '../useEventListener'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

interface WindowSize {
  width: number
  height: number
}

/**
 * Custom hook that tracks the size of the window.
 * @returns {object} An object containing the width and height of the window.
 * @property {number} width - The width of the window.
 * @property {number} height - The height of the window.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-window-size)
 * @example
 * // Usage of useWindowSize hook
 * const { width, height } = useWindowSize();
 * console.log(`Window size: ${width} x ${height}`);
 */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEventListener('resize', handleSize)

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return windowSize
}
