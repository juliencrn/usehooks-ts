import { Dispatch, SetStateAction, useCallback, useState } from 'react'

interface UseCounterOutput {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  setCount: Dispatch<SetStateAction<number>>
}

function useCounter(initialValue?: number): UseCounterOutput {
  const [count, setCount] = useState(initialValue || 0)

  const increment = useCallback(() => setCount(x => x + 1), [])
  const decrement = useCallback(() => setCount(x => x - 1), [])
  const reset = useCallback(() => setCount(initialValue || 0), [initialValue])

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  }
}

export default useCounter
