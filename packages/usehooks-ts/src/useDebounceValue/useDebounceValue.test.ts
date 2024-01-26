import { act, renderHook } from '@testing-library/react-hooks/dom'

import { useDebounceValue } from './useDebounceValue'

describe('useDebounceValue()', () => {
  it('should debounce the value', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useDebounceValue('initial', 200),
    )

    expect(result.current[0]).toBe('initial')

    act(() => {
      result.current[1]('updated')
    })

    // The debounced value should not be updated immediately
    expect(result.current[0]).toBe('initial')

    // Wait for the debounce interval to elapse
    await waitForNextUpdate()

    // The debounced value should be updated after the interval
    expect(result.current[0]).toBe('updated')
  })

  it('should handle options', async () => {
    const { result } = renderHook(() =>
      useDebounceValue('initial', 200, { leading: true }),
    )

    expect(result.current[0]).toBe('initial')

    act(() => {
      result.current[1]('updated')
    })

    // The debounced value should be updated immediately due to leading option
    expect(result.current[0]).toBe('updated')

    // Wait for the debounce interval to elapse
    jest.advanceTimersByTime(500)

    // The debounced value should not be updated again after the interval
    expect(result.current[0]).toBe('updated')
  })
})
