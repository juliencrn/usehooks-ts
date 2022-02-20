import { useState } from 'react'

// See: https://usehooks-ts.com/react-hook/use-event-listener
import { useEventListener } from '../useEventListener'
// See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

interface WindowSize {
  width: number
  height: number
}

function useWindowSize(): WindowSize {
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

export default useWindowSize
