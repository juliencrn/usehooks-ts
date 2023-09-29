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

interface CustomFetchOptions {
  customHeaders?: HeadersInit
}

interface PostArguments {
  postUrl?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  options?: CustomFetchOptions
}

export function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit,
): State<T> & {
  post: (args: PostArguments) => Promise<void>
} {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const post = useCallback(
    async ({ postUrl = url, data, options }: PostArguments) => {
      // Do nothing if the postUrl is not given
      if (!postUrl) return

      cancelRequest.current = false

      dispatch({ type: 'loading' })

      try {
        const opts: RequestInit = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...options?.customHeaders, // Merge custom headers
          },
          body: JSON.stringify(data),
        }

        const response = await fetch(postUrl, opts)

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const responseData = (await response.json()) as T

        // Update the cache
        if (Array.isArray(cache.current[postUrl])) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (cache.current[postUrl] as any[]).push(responseData)
        } else {
          cache.current[postUrl] = [responseData] as unknown as T
        }

        if (cancelRequest.current) return

        dispatch({ type: 'fetched', payload: cache.current[postUrl] })
      } catch (error) {
        if (cancelRequest.current) return

        dispatch({ type: 'error', payload: error as Error })
      }
    },
    [url],
  )

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
