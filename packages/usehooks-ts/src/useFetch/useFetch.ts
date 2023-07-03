import { useEffect, useReducer, useRef } from 'react'

interface State<T> {
  data?: T
  error?: Error
  isLoading: boolean
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }

export function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit,
): State<T | string | Blob> {
  const cache = useRef<Cache<T | string | Blob>>({})

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false)

  const initialState: State<T | string | Blob> = {
    error: undefined,
    data: undefined,
    isLoading: false,
  }

  // Keep state logic separated
  const fetchReducer = (
    state: State<T | string | Blob>,
    action: Action<T | string | Blob>,
  ): State<T | string | Blob> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState, isLoading: true }
      case 'fetched':
        return { ...initialState, data: action.payload, isLoading: false }
      case 'error':
        return { ...initialState, error: action.payload, isLoading: false }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return

    cancelRequest.current = false

    const fetchData = async () => {
      dispatch({ type: 'loading' })

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({ type: 'fetched', payload: cache.current[url] })
        return
      }

      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const contentType = response.headers.get('content-type')
        let data: T | string | Blob
        if (contentType?.includes('application/json')) {
          data = (await response.json()) as T
        } else if (contentType?.startsWith('image/')) {
          data = await response.blob()
        } else {
          data = await response.text()
        }
        cache.current[url] = data
        if (cancelRequest.current) return

        dispatch({ type: 'fetched', payload: data })
      } catch (error) {
        if (cancelRequest.current) return

        dispatch({ type: 'error', payload: error as Error })
      }
    }

    void fetchData()

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return state
}
