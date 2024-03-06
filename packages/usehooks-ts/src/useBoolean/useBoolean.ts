import { useCallback, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

interface UseBooleanOutput {
  value: boolean | (() => boolean)
  setValue: Dispatch<SetStateAction<boolean>>
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}

/**
 * Custom hook for handling boolean state with useful utility functions.
 * @param {boolean | (() => boolean)} [defaultValue] - The initial boolean state value or a function that returns the initial value.
 * @returns {UseBooleanOutput} An object containing the boolean state value and utility functions to manipulate the state.
 * @property {boolean} value - The current boolean state value.
 * @property {Function} setValue - Function to set the boolean state directly.
 * @property {Function} setTrue - Function to set the boolean state to `true`.
 * @property {Function} setFalse - Function to set the boolean state to `false`.
 * @property {Function} toggle - Function to toggle the boolean state.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-boolean)
 * @example
 * const { value, setTrue, setFalse, toggle } = useBoolean(true);
 *
 * console.log(value); // true
 * setFalse();
 * console.log(value); // false
 * toggle();
 * console.log(value); // true
 *
 * @example
 * const { value, setTrue, setFalse, toggle } = useBoolean(() => true);
 *
 * console.log(value); // true
 * setFalse();
 * console.log(value); // false
 * toggle();
 * console.log(value); // true
 */
export function useBoolean(
  defaultValue?: boolean | (() => boolean),
): UseBooleanOutput {
  const [value, setValue] = useState(() => {
    if (typeof defaultValue === 'function') {
      return Boolean(defaultValue())
    }
    return Boolean(defaultValue)
  })

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
