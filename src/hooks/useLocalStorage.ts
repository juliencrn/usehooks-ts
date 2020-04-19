/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

/**
 * React Hook wrapper for LocalStorage
 * @usage has the same API of useState
 * @param key storage key like localStorage.getItem('key')
 * @param initialValue
 */

type PersistReturn = [any, (arg1?: any) => void]

export type usePersistFunc = (key: string) => PersistReturn

export default function useLocalStorage(key: string, initialValue: any) {
  // Prevent build error "window is undefined" but keep keep working
  const isServer = typeof window === 'undefined'

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    // Get from local storage then
    // parse stored json or return initialValue
    if (isServer) {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      if (!isServer) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
