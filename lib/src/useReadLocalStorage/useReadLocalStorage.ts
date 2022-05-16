import { useCallback, useEffect, useState } from 'react'

// See: https://usehooks-ts.com/react-hook/use-event-listener
import { useEventListener } from '../useEventListener'

type Value<T> = T | null

function useReadLocalStorage<T>(key: string): Value<T> {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): Value<T> => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return null
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : null
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return null
    }
  }, [key])

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<Value<T>>(readValue)

  // Listen if localStorage changes
  useEffect(() => {
    setStoredValue(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

export default useReadLocalStorage
