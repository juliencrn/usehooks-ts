import { useCallback, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

/**
 * Custom hook that manages a boolean toggle state in React components.
 * @param {boolean} [defaultValue] - The initial value for the toggle state.
 * @returns {[boolean, () => void, Dispatch<SetStateAction<boolean>>]} A tuple containing the current state,
 * a function to toggle the state, and a function to set the state explicitly.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-toggle)
 * @example
 * ```tsx
 * const [isToggled, toggle, setToggle] = useToggle(); // Initial value is false
 * // OR
 * const [isToggled, toggle, setToggle] = useToggle(true); // Initial value is true
 * // Use isToggled in your component, toggle to switch the state, setToggle to set the state explicitly.
 * ```
 */
export function useToggle(
  defaultValue?: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState(!!defaultValue)

  const toggle = useCallback(() => {
    setValue(x => !x)
  }, [])

  return [value, toggle, setValue]
}
