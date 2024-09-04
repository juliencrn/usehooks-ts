import { useCallback, useRef, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

/**
 * A state value.
 */
type State<T> = T

/**
 * A function that can be used to update the state. Same as setState in React.useState.
 * @returns {void}
 */
type SetState<T> = Dispatch<SetStateAction<T>>

/**
 * Function to reset the state to its initial value.
 */
type RestStateFn = () => void

/** Hook return type. */
type UseResettableReturnType<T> = readonly [State<T>, SetState<T>, RestStateFn]

/**
 * Custom hook that provides a state value, a function to update the state, and a function to reset the state to its initial value.
 * @template T - The type of the state.
 * @param {T | (() => T)} initialValue - The initial value of the state or a function that returns the initial value.
 * @returns {[State, SetState, RestStateFn]} - Returns the current state, a function to update the state, and a function to reset the state to its initial value.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-resettable-state)
 * @example
 * ```tsx
 * const [value, setValue, resetValue] = useResettableState(2);
 * ```
 */
export function useResettableState<T>(
  initialValue: T | (() => T),
): UseResettableReturnType<T> {
  const [state, setState] = useState<T>(initialValue)
  const initialRef = useRef<T | (() => T)>(initialValue)

  const resetState = useCallback(() => {
    setState(
      typeof initialRef.current === 'function'
        ? (initialRef.current as () => T)()
        : initialRef.current,
    )
  }, [])

  return [state, setState, resetState]
}
