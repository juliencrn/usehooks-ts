import { useEffect, useReducer } from 'react'

interface useFetchState<T> {
  data?: T
  error?: Error
  loading: boolean
}

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }

type FetchConfig = {
  url?: string
  parser: 'json' | 'text'
}

const fetchReducer = <T>(
  state: useFetchState<T>,
  action: Action<T>,
): useFetchState<T> => {
  switch (action.type) {
    case 'loading':
      return { ...state, data: undefined, loading: true }
    case 'fetched':
      return { ...state, data: action.payload, loading: false }
    case 'error':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

function useFetch<T = unknown>(
  fetchConfig?: string | FetchConfig,
  options: RequestInit = {
    method: 'get',
    credentials: 'same-origin',
  },
) {
  const initialState: useFetchState<T> = {
    error: undefined,
    data: undefined,
    loading: true,
  }

  const [{ data, loading, error }, dispatch] = useReducer(
    fetchReducer,
    initialState,
  )

  if (typeof fetchConfig === 'string' || typeof fetchConfig === 'undefined') {
    fetchConfig = {
      url: fetchConfig,
      parser: 'json',
    }
  }

  const { url, parser } = fetchConfig

  useEffect(() => {
    if (!url) return

    let inEffect = true

    const fetchData = async () => {
      dispatch({ type: 'loading' })

      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        if (!inEffect) return

        const data = (await response[parser]()) as T
        if (!inEffect) return

        dispatch({ type: 'fetched', payload: data })
      } catch (error) {
        if (!inEffect) return

        dispatch({ type: 'error', payload: error as Error })
      }
    }
    fetchData()

    return () => {
      inEffect = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, parser])

  return [data, loading, error] as const
}

export default useFetch
