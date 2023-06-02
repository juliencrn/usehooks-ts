import { Dispatch, SetStateAction, useState } from 'react'

interface UseCounterOutput {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  setCount: Dispatch<SetStateAction<number>>
}

function useCounter(
    initialValue?: number,
    min?: number,
    max?: number,
    step: number = 1,
): UseCounterOutput {
  const [count, setCount] = useState(initialValue || 0)

  const increment = () =>
      setCount((x) => {
          if (max !== undefined && x >= max) {
              return x
          } else if (max !== undefined && x + step > max) {
              return max
          }

          return x + step
      })
  const decrement = () =>
      setCount((x) => {
          if (min !== undefined && x <= min) {
              return x
          } else if (min !== undefined && x - step < min) {
              return min
          }

          return x - step
      })
  const reset = () => setCount(initialValue || 0)

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  }
}

export default useCounter
