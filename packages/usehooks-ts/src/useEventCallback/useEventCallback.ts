import { useCallback, useRef } from 'react'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

/**
 * A hook for creating a memoized event callback.
 * @template Args - An array of argument types for the event callback.
 * @template R - The return type of the event callback.
 * @param {(...args: Args) => R} fn - The callback function.
 * @returns {(...args: Args) => R} A memoized event callback function.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-event-callback)
 * @example
 * const handleClick = useEventCallback((event) => {
 *   // Handle the event here
 * });
 */
export function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R,
): (...args: Args) => R {
  const ref = useRef<typeof fn>(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })

  useIsomorphicLayoutEffect(() => {
    ref.current = fn
  }, [fn])

  return useCallback((...args: Args) => ref.current(...args), [ref])
}
