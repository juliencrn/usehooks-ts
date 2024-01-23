import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { useEventCallback, useEventListener } from '..'

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent
  }
}

interface Options<T> {
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
}

type SetValue<T> = Dispatch<SetStateAction<T>>

const IS_SERVER = typeof window === 'undefined'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: Options<T> = {},
): [T, SetValue<T>] {
  // Pass initial value to support hydration server-client
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  const serializer = useCallback<(value: T) => string>(
    value => {
      if (options.serializer) {
        return options.serializer(value)
      }
      return JSON.stringify(value)
    },
    [options],
  )

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
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keeps working
    if (IS_SERVER) {
      return initialValue
    }

    try {
      const raw = window.localStorage.getItem(key)
      return raw ? deserializer(raw) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }, [initialValue, key, deserializer])

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = useEventCallback(value => {
    // Prevent build error "window is undefined" but keeps working
    if (IS_SERVER) {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      )
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(readValue()) : value

      // Save to local storage
      window.localStorage.setItem(key, serializer(newValue))

      // Save state
      setStoredValue(newValue)

      // We dispatch a custom event so every similar useLocalStorage hook is notified
      window.dispatchEvent(new StorageEvent('local-storage', { key }))
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }
  })

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

  return [storedValue, setValue]
}
