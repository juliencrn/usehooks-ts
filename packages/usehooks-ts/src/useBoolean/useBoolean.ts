import { useCallback, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

/** The useBoolean return type. */
type UseBooleanReturn = {
  /** The current boolean state value. */
  value: boolean
  /** Function to set the boolean state directly. */
  setValue: Dispatch<SetStateAction<boolean>>
  /** Function to set the boolean state to `true`. */
  setTrue: () => void
  /** Function to set the boolean state to `false`. */
  setFalse: () => void
  /** Function to toggle the boolean state. */
  toggle: () => void
}

/**
 * Custom hook that handles boolean state with useful utility functions.
 * @param {boolean} [defaultValue] - The initial value for the boolean state (default is `false`).
 * @returns {UseBooleanReturn} An object containing the boolean state value and utility functions to manipulate the state.
 * @throws Will throw an error if `defaultValue` is an invalid boolean value.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-boolean)
 * @example
 * ```tsx
 * const { value, setTrue, setFalse, toggle } = useBoolean(true);
 * ```
 */
export function useBoolean(defaultValue = false): UseBooleanReturn {
  if (typeof defaultValue !== 'boolean') {
    throw new Error('defaultValue must be `true` or `false`')
  }
  const [value, setValue] = useState(defaultValue)

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  const toggle = useCallback(() => {
    setValue(x => !x)
  }, [])

  return { value, setValue, setTrue, setFalse, toggle }
}
