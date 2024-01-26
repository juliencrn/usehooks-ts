import { act, renderHook } from '@testing-library/react-hooks/dom'

import { useDebounceCallback } from './useDebounceCallback'

describe('use debounce callback()', () => {
  jest.useFakeTimers()

  it('should debounce the callback', () => {
    const debouncedCallback = jest.fn()
    const { result } = renderHook(() =>
      useDebounceCallback(debouncedCallback, 500),
    )

    act(() => {
      result.current('argument')
    })

    // The callback should not be invoked immediately
    expect(debouncedCallback).not.toHaveBeenCalled()

    // Fast forward time by 500 milliseconds
    jest.advanceTimersByTime(500)

    // The callback should be invoked after the debounce interval
    expect(debouncedCallback).toHaveBeenCalledTimes(1)
  })

  it('should handle options', () => {
    const debouncedCallback = jest.fn()
    const { result } = renderHook(() =>
      useDebounceCallback(debouncedCallback, 500, { leading: true }),
    )

    act(() => {
      result.current('argument')
    })

    // The callback should be invoked immediately due to leading option
    expect(debouncedCallback).toHaveBeenCalledWith('argument')

    // Fast forward time by 500 milliseconds
    jest.advanceTimersByTime(500)

    // The callback should not be invoked again after the interval
    expect(debouncedCallback).toHaveBeenCalledTimes(1)
  })

  it('should cancel the debounced callback', () => {
    const debouncedCallback = jest.fn()
    const { result } = renderHook(() =>
      useDebounceCallback(debouncedCallback, 500),
    )

    act(() => {
      result.current('argument')
    })

    // The callback should not be invoked immediately
    expect(debouncedCallback).not.toHaveBeenCalled()

    // Cancel the debounced callback
    act(() => {
      result.current.cancel()
    })

    // Fast forward time by 500 milliseconds
    jest.advanceTimersByTime(500)

    // The callback should not be invoked after cancellation
    expect(debouncedCallback).not.toHaveBeenCalled()
  })

  it('should flush the debounced callback', () => {
    const debouncedCallback = jest.fn()
    const { result } = renderHook(() =>
      useDebounceCallback(debouncedCallback, 500),
    )

    act(() => {
      result.current('argument')
    })

    // The callback should not be invoked immediately
    expect(debouncedCallback).not.toHaveBeenCalled()

    // Flush the debounced callback
    act(() => {
      result.current.flush()
    })

    // The callback should be invoked immediately after flushing
    expect(debouncedCallback).toHaveBeenCalled()
  })
})
