import { useRef, useState } from 'react'

import type { DebouncedState } from '../useDebounceCallback'
import { useDebounceCallback } from '../useDebounceCallback'

/**
 * Returns a debounced version of the provided value, along with a function to update it.
 * @template T - The type of the value.
 * @param {T | (() => T)} initialValue - The value to be debounced.
 * @param {number} delay - The delay in milliseconds before the value is updated (default is 500ms).
 * @param {object} [options] - Optional configurations for the debouncing behavior.
 * @param {?boolean} [options.leading] - Determines if the debounced function should be invoked on the leading edge of the timeout (default to false).
 * @param {?boolean} [options.trailing] - Determines if the debounced function should be invoked on the trailing edge of the timeout (default to false).
 * @param {?(left: T, right: T) => boolean} [options.equalityFn] - A function to determine if the value has changed. Defaults to a function that checks if the value is strictly equal to the previous value.
 * @param {?number} [options.maxWait] - The maximum time the debounced function is allowed to be delayed before it's invoked.
 * @returns {[T, DebouncedState<(value: T) => void>]} An array containing the debounced value and the function to update it.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-debounce-value)
 * @example
 * const [debouncedValue, updateDebouncedValue] = useDebounceValue(inputValue, 500, { leading: true });
 */
export function useDebounceValue<T>(
  initialValue: T | (() => T),
  delay: number,
  options?: {
    leading?: boolean
    maxWait?: number
    trailing?: boolean
    equalityFn?: (left: T, right: T) => boolean
  },
): [T, DebouncedState<(value: T) => void>] {
  const eq = options?.equalityFn ?? ((left: T, right: T) => left === right)
  const unwrappedInitialValue =
    initialValue instanceof Function ? initialValue() : initialValue
  const [debouncedValue, setDebouncedValue] = useState<T>(unwrappedInitialValue)
  const previousValueRef = useRef<T | undefined>(unwrappedInitialValue)

  const updateDebouncedValue = useDebounceCallback(
    setDebouncedValue,
    delay,
    options,
  )

  // Update the debounced value if the initial value changes
  if (!eq(previousValueRef.current as T, unwrappedInitialValue)) {
    updateDebouncedValue(unwrappedInitialValue)
    previousValueRef.current = unwrappedInitialValue
  }

  return [debouncedValue, updateDebouncedValue]
}
