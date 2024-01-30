import { act, renderHook } from '@testing-library/react'

import { useTimeout } from './useTimeout'

describe('useTimeout()', () => {
  it('should call the callback after 1 min', () => {
    vitest.useFakeTimers()

    const delay = 60000
    const callback = vitest.fn()

    renderHook(() => {
      useTimeout(callback, delay)
    })

    expect(callback).not.toHaveBeenCalled()

    act(() => {
      vitest.advanceTimersByTime(delay)
    })

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should not do anything if "delay" is null', () => {
    vitest.useFakeTimers()

    const delay = null
    const callback = vitest.fn()

    renderHook(() => {
      useTimeout(callback, delay)
    })

    expect(callback).not.toHaveBeenCalled()

    act(() => {
      vitest.runAllTimers()
    })

    expect(callback).not.toHaveBeenCalled()
  })
})
