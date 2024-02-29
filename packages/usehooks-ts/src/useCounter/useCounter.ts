import { useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

/** The hook return type. */
type UseCounterReturn = {
  /** The current count value. */
  count: number
  /** Function to increment the counter by 1. */
  increment: () => void
  /** Function to decrement the counter by 1. */
  decrement: () => void
  /** Function to reset the counter to its initial value. */
  reset: () => void
  /** Function to set a specific value to the counter. */
  setCount: Dispatch<SetStateAction<number>>
}

/**
 * Custom hook that manages a counter with increment, decrement, reset, and setCount functionalities.
 * @param {number} [initialValue] - The initial value for the counter.
 * @returns {UseCounterReturn} An object containing the current count and functions to interact with the counter.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-counter)
 * @example
 * ```tsx
 * const { count, increment, decrement, reset, setCount } = useCounter(5);
 * ```
 */
export function useCounter(initialValue?: number): UseCounterReturn {
  const [count, setCount] = useState(initialValue ?? 0)

  const increment = () => {
    setCount(x => x + 1)
  }
  const decrement = () => {
    setCount(x => x - 1)
  }
  const reset = () => {
    setCount(initialValue ?? 0)
  }

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  }
}
