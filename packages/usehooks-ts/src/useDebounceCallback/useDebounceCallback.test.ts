import { act, renderHook } from '@testing-library/react'

import { useDebounceCallback } from './useDebounceCallback'

describe('useDebounceCallback()', () => {
  vitest.useFakeTimers()

  it('should debounce the callback', () => {
    const delay = 500
    const debouncedCallback = vitest.fn()
    const { result } = renderHook(() =>
      useDebounceCallback(debouncedCallback, delay),
    )

    act(() => {
      result.current('argument')
    })

    // The callback should not be invoked immediately
    expect(debouncedCallback).not.toHaveBeenCalled()

    // Fast forward time by 500 milliseconds
    vitest.advanceTimersByTime(delay)

    // The callback should be invoked after the debounce interval
    expect(debouncedCallback).toHaveBeenCalledTimes(1)
  })

  it('should handle options', () => {
    const delay = 500
    const debouncedCallback = vitest.fn()
    const { result } = renderHook(() =>
      useDebounceCallback(debouncedCallback, delay, { leading: true }),
    )

    act(() => {
      result.current('argument')
    })

    // The callback should be invoked immediately due to leading option
    expect(debouncedCallback).toHaveBeenCalledWith('argument')

    // Fast forward time by 500 milliseconds
    vitest.advanceTimersByTime(delay)

    // The callback should not be invoked again after the interval
    expect(debouncedCallback).toHaveBeenCalledTimes(1)
  })

  it('should debounce the callback function', () => {
    const callback = vitest.fn()
    const { result } = renderHook(() => useDebounceCallback(callback, 100))

    act(() => {
      result.current('test1')
      result.current('test2')
      result.current('test3')
    })

    expect(callback).not.toBeCalled()

    // Fast forward time
    vitest.advanceTimersByTime(200)

    expect(callback).toBeCalledTimes(1)
    expect(callback).toBeCalledWith('test3')
  })

  it('should cancel the debounced callback', () => {
    const delay = 500
    const debouncedCallback = vitest.fn()
    const { result } = renderHook(() =>
      useDebounceCallback(debouncedCallback, delay),
    )

    act(() => {
      result.current('argument')
      result.current.cancel()
    })

    // Fast forward time
    vitest.advanceTimersByTime(200)

    // The callback should not be invoked after cancellation
    expect(debouncedCallback).not.toHaveBeenCalled()
  })

  it('should flush the debounced callback', () => {
    const delay = 500
    const debouncedCallback = vitest.fn()
    const { result } = renderHook(() =>
      useDebounceCallback(debouncedCallback, delay),
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

  it('should flush pending invocations on unmount if configured to do so', () => {
    const delay = 500
    const debouncedCallback = vitest.fn()
    const { result, unmount } = renderHook(() =>
      useDebounceCallback(debouncedCallback, delay, {
        // This option is being tested.
        flushOnUnmount: true,
      }),
    )

    act(() => {
      result.current('argument')
    })

    // The callback should not be invoked immediately
    expect(debouncedCallback).not.toHaveBeenCalled()
    expect(result.current.isPending()).toBeTruthy()

    // Unmount component
    act(() => {
      unmount()
    })

    // The hook is configured to flush pending callbacks as soon as the component unmounts.
    expect(debouncedCallback).toHaveBeenCalled()
    expect(result.current.isPending()).toBeFalsy()
  })

  it('should cancel pending invocations on unmount if configured to to so', () => {
    const delay = 100
    const debouncedCallback = vitest.fn()
    const { result, unmount } = renderHook(() =>
      useDebounceCallback(debouncedCallback, delay, {
        // This option is being tested.
        flushOnUnmount: false,
      }),
    )

    act(() => {
      result.current('argument')
    })

    // The callback should not be invoked immediately
    expect(debouncedCallback).not.toHaveBeenCalled()
    expect(result.current.isPending()).toBeTruthy()

    // Unmount component
    act(() => {
      unmount()
    })

    expect(debouncedCallback).not.toHaveBeenCalled()

    // As the debounced functions should have been cancelled on unmount,
    // it should not be pending anymore.
    expect(result.current.isPending()).toBeFalsy()

    // The timer advance should not change anything as the invocation should have already been cancelled due to unmounting.
    vitest.advanceTimersByTime(200)

    expect(debouncedCallback).not.toHaveBeenCalled()
    expect(result.current.isPending()).toBeFalsy()
  })

  it('should update isPending on invocations', () => {
    const delay = 100
    const callback = vitest.fn()
    const { result } = renderHook(() => useDebounceCallback(callback, delay))

    act(() => {
      result.current('test1')
      result.current('test2')
    })

    expect(result.current.isPending()).toBeTruthy()

    // Fast-forward time
    vitest.advanceTimersByTime(200)

    expect(result.current.isPending()).toBeFalsy()
  })

  it('should update isPending on invocations even if callback errors out', () => {
    const delay = 100
    const errorMessage =
      'Mock implementation throws error for testing purposes.'
    const callback = vitest.fn().mockImplementation(() => {
      throw new Error(errorMessage)
    })
    const { result } = renderHook(() => useDebounceCallback(callback, delay))

    act(() => {
      result.current('test1')
      result.current('test2')
    })

    expect(result.current.isPending()).toBeTruthy()

    // Forwarding time will invoke the debounced mock function which throws an error.
    expect(() => vitest.advanceTimersByTime(200)).toThrowError(errorMessage)

    // Even though the mock implementation threw an error, isPending should still be updated to false.
    expect(result.current.isPending()).toBeFalsy()
  })
})
