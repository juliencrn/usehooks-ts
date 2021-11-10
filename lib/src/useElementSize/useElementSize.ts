import { RefObject, useCallback, useLayoutEffect, useState } from 'react'

// See: https://usehooks-ts.com/react-hook/use-event-listener
import { useEventListener } from '../useEventListener'

interface Size {
  width: number
  height: number
}

function useElementSize<T extends HTMLElement = HTMLDivElement>(
  elementRef: RefObject<T> | null,
): Size {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  })
  const node = elementRef?.current

  // Prevent too many rendering using useCallback
  const handleSize = useCallback(() => {
    if (node) {
      setSize({
        width: node.offsetWidth || 0,
        height: node.offsetHeight || 0,
      })
    }
  }, [node])

  useEventListener('resize', handleSize)

  // Initial size on mount and when current element changes
  useLayoutEffect(() => {
    handleSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node])

  return size
}

export default useElementSize
