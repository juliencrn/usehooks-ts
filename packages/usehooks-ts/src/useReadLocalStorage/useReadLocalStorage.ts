import { useCallback, useEffect, useState } from 'react'

import { useEventListener } from '../useEventListener'

const IS_SERVER = typeof window === 'undefined'

/**
 * Represents the type for the options available when reading from local storage.
 * @template T - The type of the stored value.
 */
interface Options<T> {
  deserializer?: (value: string) => T
}

/**
 * Custom hook for reading a value from local storage, closely related to useLocalStorage().
 * @template T - The type of the stored value.
 * @param {string} key - The key associated with the value in local storage.
 * @param {Options<T>} [options] - Additional options for reading the value (optional).
 * @param {(value: string) => T} [options.deserializer] - Custom deserializer function to convert the stored string value to the desired type (optional).
 * @returns {T | null} The stored value, or null if the key is not present or an error occurs.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-read-local-storage)
 * @example
 * const storedData = useReadLocalStorage('myKey');
 * // Access the stored data from local storage.
 */
export function useReadLocalStorage<T>(
  key: string,
  options: Options<T> = {},
): T | null {
  // Pass null as initial value to support hydration server-client
  const [storedValue, setStoredValue] = useState<T | null>(null)

  const deserializer = useCallback<(value: string) => T | null>(
    value => {
      if (options.deserializer) {
        return options.deserializer(value)
      }
      // Support 'undefined' as a value
      if (value === 'undefined') {
        return undefined as unknown as T
      }

      let parsed: unknown
      try {
        parsed = JSON.parse(value)
      } catch (error) {
        console.error('Error parsing JSON:', error)
        return null
      }

      return parsed as T
    },
    [options],
  )

  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T | null => {
    // Prevent build error "window is undefined" but keep keep working
    if (IS_SERVER) {
      return null
    }

    try {
      const raw = window.localStorage.getItem(key)
      return raw ? deserializer(raw) : null
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return null
    }
  }, [key, deserializer])

  // Listen if localStorage changes
  useEffect(() => {
    setStoredValue(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return
      }
      setStoredValue(readValue())
    },
    [key, readValue],
  )

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange)

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener('local-storage', handleStorageChange)

  return storedValue
}
