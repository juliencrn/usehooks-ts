import { useCallback, useState } from 'react'

import { useEventListener } from '../useEventListener'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

interface Size<W extends number = number, T extends number = number> {
  width: W
  height: T
}

type UseElementSizeOptions<InitializeWithValue extends boolean | undefined> = {
  initializeWithValue: InitializeWithValue
}

const IS_SERVER = typeof window === 'undefined'

// SSR version of useElementSize.
export function useElementSize<T extends HTMLElement = HTMLDivElement>(
  options: UseElementSizeOptions<false>,
): [(node: T | null) => void, Size<0, 0>]
// CSR version of useElementSize.
export function useElementSize<T extends HTMLElement = HTMLDivElement>(
  options?: Partial<UseElementSizeOptions<true>>,
): [(node: T | null) => void, Size]
/**
 * A hook for tracking the size of a DOM element.
 * @template T - The type of the DOM element. Defaults to `HTMLDivElement`.
 * @param {?UseElementSizeOptions} [options] - The options for customizing the behavior of the hook (optional).
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
export function useElementSize<T extends HTMLElement = HTMLDivElement>(
  options: Partial<UseElementSizeOptions<boolean>> = {},
): [(node: T | null) => void, Size] {
  let { initializeWithValue = true } = options
  if (IS_SERVER) {
    initializeWithValue = false
  }

  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  const [ref, setRef] = useState<T | null>(null)

  const readValue = useCallback(() => {
    return {
      width: ref?.offsetWidth ?? 0,
      height: ref?.offsetHeight ?? 0,
    }
  }, [ref?.offsetHeight, ref?.offsetWidth])

  const [size, setSize] = useState(() => {
    if (initializeWithValue) {
      return readValue()
    }
    return { width: 0, height: 0 }
  })

  // Prevent too many rendering using useCallback
  const handleSize = useCallback(() => {
    setSize(readValue())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth])

  // TODO: Prefer incoming useResizeObserver hook
  useEventListener('resize', handleSize)

  useIsomorphicLayoutEffect(() => {
    handleSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth])

  return [setRef, size]
}
