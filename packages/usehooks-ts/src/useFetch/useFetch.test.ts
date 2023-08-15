import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks/dom'

import { useFetch } from './useFetch'

const mockFetch = jest.fn()
global.fetch = mockFetch

const TEST_URL = 'https://example.com'

describe('useFetch()', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('does nothing when the url is not defined', () => {
    const { result } = renderHook(() => useFetch(undefined))

    expect(result.current.data).not.toBeDefined()
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('calls through to fetch() with URL and options', async () => {
    const mockOptions = {}
    let receivedURL: string | undefined
    let receivedOptions: object | undefined
    mockFetch.mockImplementation(async (url, options) => {
      receivedURL = url
      receivedOptions = options
    })

    const { result } = renderHook(() => useFetch(TEST_URL, mockOptions))
    await waitFor(async () => {
      expect(receivedURL).toBeDefined()
    })

    expect(result.current.data).not.toBeDefined()
    expect(receivedURL).toStrictEqual(TEST_URL)
    expect(receivedOptions).toStrictEqual(mockOptions)
  })

  it('returns a JSON version of the fetched data', async () => {
    let resolvedJSON = false
    const mockData = {}
    mockFetch.mockImplementation(async () => {
      return {
        ok: true,
        json: () =>
          new Promise(resolve => {
            resolve(mockData)
            resolvedJSON = true
          }),
      }
    })

    const { result } = renderHook(() => useFetch(TEST_URL))
    await waitFor(async () => {
      expect(resolvedJSON).toBeTruthy()
    })

    expect(result.current.data).toStrictEqual(mockData)
  })

  it('errors on non-ok responses', async () => {
    const mockStatusText = 'The status is bad'
    let receivedURL: string | undefined
    mockFetch.mockImplementation(async url => {
      receivedURL = url
      return {
        ok: false,
        statusText: mockStatusText,
      }
    })

    const { result } = renderHook(() => useFetch(TEST_URL))
    await waitFor(async () => {
      expect(receivedURL).toBeDefined()
    })

    expect(result.current.error?.message).toEqual(mockStatusText)
  })

  it('returns cached results without calling fetch()', async () => {
    let resolvedJSON = false
    const mockData = {}
    mockFetch.mockImplementation(async () => {
      return {
        ok: true,
        json: () =>
          new Promise(resolve => {
            resolve(mockData)
            resolvedJSON = true
          }),
      }
    })

    const { result, rerender } = renderHook(() => useFetch(TEST_URL))
    await waitFor(async () => {
      expect(resolvedJSON).toBeTruthy()
    })
    act(() => {
      rerender(TEST_URL)
    })

    // We expect fetch() to have been called exactly once.
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(result.current.data).toStrictEqual(mockData)
  })

  it('cancels the request when the hook is unmounted', async () => {
    let resolvedJSON = false
    mockFetch.mockImplementation(async () => {
      return {
        ok: false,
        json: () =>
          new Promise(resolve => {
            resolve({})
            resolvedJSON = true
          }),
      }
    })

    const { result, unmount } = renderHook(() => useFetch(TEST_URL))
    unmount()
    await waitFor(async () => {
      expect(resolvedJSON).toBeDefined()
    })

    expect(result.current.data).toBeUndefined()
  })
})
