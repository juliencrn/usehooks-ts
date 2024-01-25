import { useCallback, useEffect, useState } from 'react'

import { useEventListener } from '..'

type Value<T> = T | null

const IS_SERVER = typeof window === 'undefined'

interface Options<T> {
  deserializer?: (value: string) => T
}

export function useReadLocalStorage<T>(
  key: string,
  options: Options<T> = {},
): Value<T> {
  // Pass null as initial value to support hydration server-client
  const [storedValue, setStoredValue] = useState<Value<T>>(null)

  const deserializer = useCallback<(value: string) => T>(
    value => {
      if (options.deserializer) {
        return options.deserializer(value)
      }
      // Support 'undefined' as a value
      if (value === 'undefined') {
        return undefined as unknown as T
      }
      return JSON.parse(value)
    },
    [options],
  )

  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): Value<T> => {
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
