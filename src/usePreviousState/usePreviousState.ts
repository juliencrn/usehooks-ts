import { useEffect, useRef } from 'react'

function usePreviousState<T>(state: T) {
  const ref = useRef(state)

  useEffect(() => {
    ref.current = state
  }, [state])

  return ref.current
}

export default usePreviousState
