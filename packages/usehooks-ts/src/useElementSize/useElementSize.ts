import { useCallback, useState } from 'react'

import { useEventListener } from '../useEventListener'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

type Size = {
  width: number | undefined
  height: number | undefined
}

type UseElementSizeOptions = {
  initializeWithValue?: boolean
}

/** Supports both array and object destructing */
type UseElementSizeResult = [(node: Element | null) => void, Size] &
  (Size & { ref: (node: Element | null) => void })

/**
 * @deprecated - Use `useResizeObserver` instead.
 * A hook for tracking the size of a DOM element.
 * @template T - The type of the DOM element. Defaults to `HTMLDivElement`.
 * @param {?UseElementSizeOptions} [options] - The options for customizing the behavior of the hook (optional).
 * @param {?boolean} [options.initializeWithValue] - If `true` (default), the hook will initialize reading the element's size. In SSR, you should set it to `false`.
 * @returns The ref-setting function and the size of the element. Either as an tuple [ref, size] or as an object { ref, width, height }.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-element-size)
 * @example
 * const [ref, { width = 0, height = 0 }] = useElementSize();
 * // or
 * const { ref, width = 0, height = 0 } = useElementSize();
 *
 * return (
 *   <div ref={ref}>
 *     My size is {size.width}x{size.height}
 *   </div>
 * );
 */
export function useElementSize<T extends HTMLElement = HTMLDivElement>(
  options: UseElementSizeOptions = {},
): UseElementSizeResult {
  const { initializeWithValue = true } = options

  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  const [ref, setRef] = useState<T | null>(null)

  const readValue = useCallback<() => Size>(() => {
    return {
      width: ref?.offsetWidth ?? undefined,
      height: ref?.offsetHeight ?? undefined,
    }
  }, [ref?.offsetHeight, ref?.offsetWidth])

  const [size, setSize] = useState<Size>(() => {
    if (initializeWithValue) {
      return readValue()
    }
    return { width: undefined, height: undefined }
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

  const result = [setRef, size] as UseElementSizeResult

  // Support object destructuring
  result.ref = result[0]
  result.width = size.width
  result.height = size.height

  return result
}
