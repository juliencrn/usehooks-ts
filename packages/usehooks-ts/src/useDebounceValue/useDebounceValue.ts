import { useRef, useState } from 'react'

import type { DebouncedState } from '../useDebounceCallback'
import { useDebounceCallback } from '../useDebounceCallback'

/**
 * Hook options.
 * @template T - The type of the value.
 */
type UseDebounceValueOptions<T> = {
  /**
   * Determines whether the function should be invoked on the leading edge of the timeout.
   * @default false
   */
  leading?: boolean
  /**
   * Determines whether the function should be invoked on the trailing edge of the timeout.
   * @default false
   */
  trailing?: boolean
  /**
   * The maximum time the specified function is allowed to be delayed before it is invoked.
   */
  maxWait?: number
  /** A function to determine if the value has changed. Defaults to a function that checks if the value is strictly equal to the previous value. */
  equalityFn?: (left: T, right: T) => boolean
}

/**
 * Returns a debounced version of the provided value, along with a function to update it.
 * @template T - The type of the value.
 * @param {T | (() => T)} initialValue - The value to be debounced.
 * @param {number} delay - The delay in milliseconds before the value is updated (default is 500ms).
 * @param {object} [options] - Optional configurations for the debouncing behavior.
 * @returns {[T, DebouncedState<(value: T) => void>]} An array containing the debounced value and the function to update it.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-debounce-value)
 * @example
 * ```tsx
 * const [debouncedValue, updateDebouncedValue] = useDebounceValue(inputValue, 500, { leading: true });
 * ```
 */
export function useDebounceValue<T>(
  initialValue: T | (() => T),
  delay: number,
  options?: UseDebounceValueOptions<T>,
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
