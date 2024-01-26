import { useCallback, useState } from 'react'

import { useEventListener } from '../useEventListener'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

interface Size {
  width: number
  height: number
}

/**
 * A hook for tracking the size of a DOM element.
 * @template T - The type of the DOM element. Defaults to `HTMLDivElement`.
 * @returns {[ (node: T | null) => void, Size ]} A tuple containing a ref-setting function and the size of the element.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-element-size)
 * @example
 * const [ref, size] = useElementSize();
 *
 * return (
 *   <div ref={ref}>
 *     My size is {size.width}x{size.height}
 *   </div>
 * );
 */
export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  Size,
] {
  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  const [ref, setRef] = useState<T | null>(null)
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  })

  // Prevent too many rendering using useCallback
  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth])

  useEventListener('resize', handleSize)

  useIsomorphicLayoutEffect(() => {
    handleSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth])

  return [setRef, size]
}
