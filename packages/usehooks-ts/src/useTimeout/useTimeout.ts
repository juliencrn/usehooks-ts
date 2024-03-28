import { useEffect, useRef } from 'react'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

/**
 * Custom hook that handles timeouts in React components using the [`setTimeout API`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout).
 * @param {() => void} callback - The function to be executed when the timeout elapses.
 * @param {number | null} delay - The duration (in milliseconds) for the timeout. Set to `null` to clear the timeout.
 * @returns {void} This hook does not return anything.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-timeout)
 * @example
 * ```tsx
 * // Usage of useTimeout hook
 * useTimeout(() => {
 *   // Code to be executed after the specified delay
 * }, 1000); // Set a timeout of 1000 milliseconds (1 second)
 * ```
 */
export function useTimeout(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setTimeout(() => {
      savedCallback.current()
    }, delay)

    return () => {
      clearTimeout(id)
    }
  }, [delay])
}
