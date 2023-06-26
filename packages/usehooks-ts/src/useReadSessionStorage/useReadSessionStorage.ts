import { useCallback, useEffect, useState } from 'react'

import { useEventListener } from '..'

type Options<T> = {
  parseAsJson: boolean
  parser: (value: string | null) => T
}

type Value<T> = T | null

export function useReadSessionStorage<T>(
  key: string,
  {
    parseAsJson = true,
    parser = parseAsJson ? parseJSON : castValue,
  }: Partial<Options<T>> = {},
): Value<T> {
  // Get from session storage then
  // parse stored json or return initialValue

  const readValue = useCallback((): Value<T> => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return null
    }

    try {
      const item = window.sessionStorage.getItem(key)

      if (item) return parser(item) as T
      return null
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${key}”:`, error)
      return null
    }
  }, [key, parser])

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<Value<T>>(readValue)

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

  return storedValue
}

function parseJSON<T>(value: string | null): T {
  return JSON.parse(value ?? '')
}

// This is used when parseAsJSON === false
function castValue<T>(value: string | null): T {
  return value as T
}
