import { useCallback, useEffect, useReducer, useRef } from 'react'

interface State<T> {
  data?: T
  error?: Error
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
): State<T> & { post: (postUrl: string, postData: any) => Promise<void> } {
  const cache = useRef<Cache<T>>({})

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false)

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  }

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState }
      case 'fetched':
        return { ...initialState, data: action.payload }
      case 'error':
        return { ...initialState, error: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  const post = useCallback(async (postUrl: string, postData: any) => {
    try {
      const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = await response.json()
      return data
    } catch (error) {
      dispatch({ type: 'error', payload: error as Error })
      throw error
    }
  }, [])

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return

    cancelRequest.current = false

    const fetchData = async () => {
      dispatch({ type: 'loading' })

      if (cache.current[url]) {
        dispatch({ type: 'fetched', payload: cache.current[url] })
        return
      }

      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = (await response.json()) as T
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

  return { ...state, post }
}
