import { useCallback, useRef, useState } from 'react'

import { DebouncedState, useDebounceCallback } from '../useDebounceCallback'

/**
 * Compare two values for equality.
 * @template T - The type of the values being compared.
 * @param {T} left - The left value to compare.
 * @param {T} right - The right value to compare.
 * @returns {boolean} `true` if the values are equal, otherwise `false`.
 * @example
 * const isEqual = valueEquality(42, 42); // true
 * const isNotEqual = valueEquality('hello', 'world'); // false
 */
function valueEquality<T>(left: T, right: T): boolean {
  return left === right
}

/**
 * Returns a debounced version of the provided value, along with a function to update it.
 * @template T - The type of the value.
 * @param {T} value - The value to be debounced.
 * @param {number} delay - The delay in milliseconds before the value is updated.
 * @param {object} [options] - Optional configurations for the debouncing behavior.
 * @param {boolean} [options.leading] - Determines if the debounced function should be invoked on the leading edge of the timeout.
 * @param {boolean} [options.trailing] - Determines if the debounced function should be invoked on the trailing edge of the timeout.
 * @param {number} [options.maxWait] - The maximum time the debounced function is allowed to be delayed before it's invoked.
 * @param {(left: T, right: T) => boolean} [options.equalityFn] - A custom equality function to compare the current and previous values.
 * @returns {[T, DebouncedState<(value: T) => void>]} An array containing the debounced value and the function to update it.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-debounce-value)
 * @example
 * const [debouncedValue, updateDebouncedValue] = useDebounceValue(inputValue, 500, { leading: true });
 */
export function useDebounceValue<T>(
  value: T,
  delay: number,
  options?: {
    leading?: boolean
    maxWait?: number
    trailing?: boolean
    equalityFn?: (left: T, right: T) => boolean
  },
): [T, DebouncedState<(value: T) => void>] {
  const eq = (options && options.equalityFn) || valueEquality

  const [debouncedValue, setDebouncedValue] = useState(value)

  const debounced = useDebounceCallback(
    useCallback((value: T) => setDebouncedValue(value), [setDebouncedValue]),
    delay,
    options,
  )
  const previousValue = useRef(value)

  if (!eq(previousValue.current, value)) {
    debounced(value)
    previousValue.current = value
  }

  return [debouncedValue, debounced]
}
