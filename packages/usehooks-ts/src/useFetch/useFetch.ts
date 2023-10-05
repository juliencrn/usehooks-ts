import { useCallback, useEffect, useReducer, useRef } from 'react'

/**
 * Describes the state of the fetch operation.
 * @template T The type of data being fetched.
 */
interface State<T> {
  data?: T
  error?: Error
}

/**
 * Defines a cache for storing fetched data.
 * @template T The type of data being cached.
 */
type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'append'; payload: T } // <-- new action type
  | { type: 'error'; payload: Error }

/**
 * Options for custom fetch operations.
 */
interface CustomFetchOptions {
  customHeaders?: HeadersInit
}

/**
 * Arguments for POST request.
 * @template TData The type of data being sent in the POST request.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
interface PostArguments<TData = any> {
  postUrl?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  options?: CustomFetchOptions
  onSuccess?: () => void
  onFailure?: (error: Error) => void
  updateStateImmediately?: boolean
  shouldRefetch?: boolean
}

/**
 * Custom hook for fetch operations.
 * @template T The type of data being fetched.
 * @param {string} [url] The URL to fetch data from.
 * @param {RequestInit} [options] Additional fetch options.
 * @returns {State<T> & { post: (args: PostArguments) => Promise<void> }}
 */
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

  /**
   * Reducer function for managing fetch state.
   * @param {State<T>} state Current state.
   * @param {Action<T>} action Action to dispatch.
   * @returns {State<T>}
   */
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...state, error: undefined } // keep data, only reset error
      case 'fetched':
        return { ...state, data: action.payload, error: undefined } // update data, reset error
      case 'append':
        if (Array.isArray(state.data) && action.payload) {
          return { ...state, data: [...state.data, action.payload] as T }
        } else if (typeof state.data === 'object' && action.payload) {
          return { ...state, data: { ...state.data, ...action.payload } as T }
        }
        return state
      case 'error':
        return { ...state, error: action.payload } // keep data, update error
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  /**
   * Function for making POST requests.
   * @template TData The type of data being sent in the POST request.
   * @param {PostArguments<TData>} args Arguments for the POST request.
   */
  const post = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async <TData = any>({
      postUrl = url,
      data,
      options: postOptions,
      onSuccess,
      onFailure,
      updateStateImmediately = true,
      shouldRefetch = true,
    }: PostArguments<TData>) => {
      // Invalidate the cache for this URL in a non-mutative way
      cache.current = Object.fromEntries(
        Object.entries(cache.current).filter(([key]) => key !== postUrl),
      )

      // Do nothing if the postUrl is not given
      if (!postUrl) return

      cancelRequest.current = false

      dispatch({ type: 'loading' })

      try {
        const opts: RequestInit = {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            ...postOptions?.customHeaders, // Merge custom headers
          },
          body: JSON.stringify(data),
        }

        const response = await fetch(postUrl, opts)

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const responseData = (await response.json()) as T

        if (cancelRequest.current) return

        // Update the state immediately with POST response data
        if (updateStateImmediately) {
          dispatch({ type: 'append', payload: responseData }) // <-- merge new data
        }

        if (onSuccess) {
          onSuccess()
        }

        // Refetch the data from the original URL only if shouldRefetch is true
        if (url && shouldRefetch) {
          const response = await fetch(url, options)
          const updatedData = (await response.json()) as T
          cache.current[url] = updatedData
          dispatch({ type: 'fetched', payload: updatedData })
        }
      } catch (error) {
        if (cancelRequest.current) return

        dispatch({ type: 'error', payload: error as Error })

        if (onFailure) {
          onFailure(error as Error)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, options],
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
