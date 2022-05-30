import { act, renderHook } from '@testing-library/react-hooks/dom'

import useTimeout from './useTimeout'

describe('useTimeout()', () => {
  test('should call the callback after 1 min', () => {
    jest.useFakeTimers()

    const delay = 60000
    const callback = jest.fn()

    renderHook(() => useTimeout(callback, delay))

    expect(callback).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(delay)
    })

    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('should not do anything if "delay" is null', () => {
    jest.useFakeTimers()

    const delay = null
    const callback = jest.fn()

    renderHook(() => useTimeout(callback, delay))

    expect(callback).not.toHaveBeenCalled()

    act(() => {
      jest.runAllTimers()
    })

    expect(callback).not.toHaveBeenCalled()
  })
})
