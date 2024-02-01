import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { useEventCallback } from '../useEventCallback'
import { useEventListener } from '../useEventListener'

declare global {
  interface WindowEventMap {
    'session-storage': CustomEvent
  }
}

/**
 * Represents the options for customizing the behavior of serialization and deserialization.
 * @template T - The type of the state to be stored in session storage.
 * @interface Options
 * @property {(value: T) => string} [serializer] - A function to serialize the value before storing it.
 * @property {(value: string) => T} [deserializer] - A function to deserialize the stored value.
 */
interface UseSessionStorageOptions<
  T,
  InitializeWithValue extends boolean | undefined,
> {
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
  initializeWithValue: InitializeWithValue
}

// type SetValue<T> = Dispatch<SetStateAction<T>>

const IS_SERVER = typeof window === 'undefined'

// SSR version of useSessionStorage.
export function useSessionStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options: UseSessionStorageOptions<T, false>,
): [T | undefined, Dispatch<SetStateAction<T>>]

// CSR version of useSessionStorage.
export function useSessionStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options?: Partial<UseSessionStorageOptions<T, boolean>>,
): [T, Dispatch<SetStateAction<T>>]
/**
 * Custom hook for using session storage to persist state across page reloads.
 * @template T - The type of the state to be stored in session storage.
 * @param {string} key - The key under which the value will be stored in session storage.
 * @param {T | (() => T)} initialValue - The initial value of the state or a function that returns the initial value.
 * @param {?UseSessionStorageOptions<T>} [options] - Options for customizing the behavior of serialization and deserialization (optional).
 * @param {?boolean} [options.initializeWithValue] - If `true` (default), the hook will initialize reading the session storage. In SSR, you should set it to `false`, returning `undefined` initially.
 * @param {(value: T) => string} [options.serializer] - A function to serialize the value before storing it.
 * @returns {[T, Dispatch<SetStateAction<T>>]} A tuple containing the stored value and a function to set the value.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-session-storage)
 * @see [MDN Session Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
 * @example
 * const [count, setCount] = useSessionStorage('count', 0);
 * // Access the `count` value and the `setCount` function to update it.
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options: Partial<UseSessionStorageOptions<T, boolean>> = {},
): [T | undefined, Dispatch<SetStateAction<T>>] {
  let { initializeWithValue = true } = options
  if (IS_SERVER) {
    initializeWithValue = false
  }

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

      const defaultValue =
        initialValue instanceof Function ? initialValue() : initialValue

      let parsed: unknown
      try {
        parsed = JSON.parse(value)
      } catch (error) {
        console.error('Error parsing JSON:', error)
        return defaultValue // Return initialValue if parsing fails
      }

      return parsed as T
    },
    [options, initialValue],
  )

  // Get from session storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    const initialValueToUse =
      initialValue instanceof Function ? initialValue() : initialValue

    // Prevent build error "window is undefined" but keep keep working
    if (IS_SERVER) {
      return initialValueToUse
    }

    try {
      const raw = window.sessionStorage.getItem(key)
      return raw ? deserializer(raw) : initialValueToUse
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${key}”:`, error)
      return initialValueToUse
    }
  }, [initialValue, key, deserializer])

  const [storedValue, setStoredValue] = useState(() => {
    if (initializeWithValue) {
      return readValue()
    }
    return undefined
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to sessionStorage.
  const setValue: Dispatch<SetStateAction<T>> = useEventCallback(value => {
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
