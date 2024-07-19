import { useEffect, useRef } from 'react'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

/**
 * Custom hook that creates an interval that invokes a callback function at a specified delay using the [`setInterval API`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval).
 * @param {() => void} callback - The function to be invoked at each interval.
 * @param {number | null} delay - The time, in milliseconds, between each invocation of the callback. Use `null` to clear the interval.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-interval)
 * @example
 * ```tsx
 * const handleInterval = () => {
 *   // Code to be executed at each interval
 * };
 * useInterval(handleInterval, 1000);
 * ```
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (delay === null) {
      return
    }

    const id = setInterval(() => {
      savedCallback.current()
    }, delay)

    return () => {
      clearInterval(id)
    }
  }, [delay])
}
