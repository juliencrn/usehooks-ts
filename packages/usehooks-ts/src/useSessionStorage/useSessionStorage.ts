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
    'session-storage': CustomEvent
  }
}

interface Options<T> {
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
}

type SetValue<T> = Dispatch<SetStateAction<T>>

const IS_SERVER = typeof window === 'undefined'

export function useSessionStorage<T>(
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

  // Get from session storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keep keep working
    if (IS_SERVER) {
      return initialValue
    }

    try {
      const raw = window.sessionStorage.getItem(key)
      return raw ? deserializer(raw) : initialValue
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${key}”:`, error)
      return initialValue
    }
  }, [initialValue, key, deserializer])

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to sessionStorage.
  const setValue: SetValue<T> = useEventCallback(value => {
    // Prevent build error "window is undefined" but keeps working
    if (IS_SERVER) {
      console.warn(
        `Tried setting sessionStorage key “${key}” even though environment is not a client`,
      )
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(readValue()) : value

      // Save to session storage
      window.sessionStorage.setItem(key, serializer(newValue))

      // Save state
      setStoredValue(newValue)

      // We dispatch a custom event so every similar useSessionStorage hook is notified
      window.dispatchEvent(new StorageEvent('session-storage', { key }))
    } catch (error) {
      console.warn(`Error setting sessionStorage key “${key}”:`, error)
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

  // this is a custom event, triggered in writeValueToSessionStorage
  // See: useSessionStorage()
  useEventListener('session-storage', handleStorageChange)

  return [storedValue, setValue]
}
