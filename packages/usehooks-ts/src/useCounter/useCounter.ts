import { useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

interface UseCounterOutput {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  setCount: Dispatch<SetStateAction<number>>
}

/**
 * Custom hook that manages a counter with increment, decrement, reset, and setCount functionalities.
 * @param {number} [initialValue] - The initial value for the counter.
 * @returns {object} An object containing the current count and functions to interact with the counter.
 * @property {number} count - The current count value.
 * @property {Function} increment - Increments the counter by 1.
 * @property {Function} decrement - Decrements the counter by 1.
 * @property {Function} reset - Resets the counter to its initial value.
 * @property {Function} setCount - Function to set a specific value to the counter.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-counter)
 * @example
 * // Usage of useCounter hook
 * const { count, increment, decrement, reset, setCount } = useCounter(5);
 * console.log(`Current count: ${count}`);
 * increment(); // Increases count by 1
 * decrement(); // Decreases count by 1
 * reset(); // Resets count to its initial value
 * setCount(10); // Sets count to 10
 */
export function useCounter(initialValue?: number): UseCounterOutput {
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
