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

type Options<T> = {
  parseAsJson: boolean
  parser: (value: string | null) => T
  serializer: (value: T) => string
}

type SetValue<T> = Dispatch<SetStateAction<T>>

export function useSessionStorage<T>(
  key: string,
  defaultValue: T,
  {
    parseAsJson = true,
    parser = parseAsJson ? parseJSON : castValue,
    serializer = serializeJSON,
  }: Partial<Options<T>> = {},
): [T, SetValue<T>] {
  // Get from session storage then
  // parse stored json or return initialValue

  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return defaultValue
    }

    try {
      const item = window.sessionStorage.getItem(key)

      if (item) return parser(item) as T

      return defaultValue
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${key}”:`, error)
      return defaultValue
    }
  }, [defaultValue, key, parser])

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue)

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to sessionStorage.
  const setValue: SetValue<T> = useEventCallback(value => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window == 'undefined') {
      console.warn(
        `Tried setting sessionStorage key “${key}” even though environment is not a client`,
      )
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value

      // Save to session storage
      window.sessionStorage.setItem(key, serializer(newValue))

      // Save state
      setStoredValue(serializer(newValue) as T)

      // We dispatch a custom event so every useSessionStorage hook are notified
      window.dispatchEvent(new Event('session-storage'))
    } catch (error) {
      console.warn(`Error setting sessionStorage key “${key}”:`, error)
    }
  })

  useEffect(() => {
    setStoredValue(readValue())
  }, [readValue])

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

  // this is a custom event, triggered in writeValueTosessionStorage
  // See: useSessionStorage()
  useEventListener('session-storage', handleStorageChange)

  return [storedValue, setValue]
}

function parseJSON<T>(value: string | null): T {
  return JSON.parse(value ?? '')
}

function serializeJSON<T>(value: T) {
  return JSON.stringify(value)
}

// This is used when parseAsJSON === false
function castValue<T>(value: string | null): T {
  return value as T
}
