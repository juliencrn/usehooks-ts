import { act, renderHook } from '@testing-library/react-hooks/dom'

import useCountdown from './useCountdown'

jest.useFakeTimers()

describe('useCountdown()', () => {
  describe('depreciated useCountdown()', () => {
    test('should initialize', () => {
      const { result } = renderHook(() =>
        useCountdown({ seconds: 60, interval: 500, isIncrement: false }),
      )

      expect(result.current[0]).toBe(60)
      expect(typeof result.current[1].start).toBe('function')
      expect(typeof result.current[1].stop).toBe('function')
      expect(typeof result.current[1].reset).toBe('function')
    })

    test('should increment count', () => {
      const { result } = renderHook(() =>
        useCountdown({ seconds: 60, interval: 500, isIncrement: true }),
      )

      act(result.current[1].start)
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(result.current[0]).toBe(62)
    })

    test('should decrement count', () => {
      const { result } = renderHook(() =>
        useCountdown({ seconds: 60, interval: 500 }),
      )

      act(result.current[1].start)
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(result.current[0]).toBe(58)
    })

    test('should stop countdown', () => {
      const { result } = renderHook(() =>
        useCountdown({ seconds: 60, interval: 500 }),
      )

      expect(result.current[0]).toBe(60)
      act(result.current[1].start)
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      act(result.current[1].stop)
      expect(result.current[0]).toBe(58)

      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(result.current[0]).toBe(58)
    })

    test('should reset count', () => {
      const { result } = renderHook(() =>
        useCountdown({ seconds: 60, interval: 500 }),
      )

      act(result.current[1].start)
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      act(result.current[1].stop)
      expect(result.current[0]).toBeLessThan(60)

      act(result.current[1].reset)
      expect(result.current[0]).toBe(60)
    })
  })

  test('should return callable functions', () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 60, intervalMs: 500, isIncrement: false }),
    )

    expect(result.current[0]).toBe(60)
    expect(typeof result.current[1].startCountdown).toBe('function')
    expect(typeof result.current[1].stopCountdown).toBe('function')
    expect(typeof result.current[1].resetCountdown).toBe('function')
  })

  test('should accept countStart', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 30 }))

    expect(result.current[0]).toBe(30)
    expect(typeof result.current[1].startCountdown).toBe('function')
    expect(typeof result.current[1].stopCountdown).toBe('function')
    expect(typeof result.current[1].resetCountdown).toBe('function')
  })

  test('should accept intervalMs', () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 60, intervalMs: 500 }),
    )

    expect(result.current[0]).toBe(60)
    expect(typeof result.current[1].startCountdown).toBe('function')
    expect(typeof result.current[1].stopCountdown).toBe('function')
    expect(typeof result.current[1].resetCountdown).toBe('function')

    act(result.current[1].startCountdown)
    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(result.current[0]).toBe(59)
  })

  test('should stop at countStop (default: 0)', () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 60, intervalMs: 1000 }),
    )

    expect(result.current[0]).toBe(60)
    expect(typeof result.current[1].startCountdown).toBe('function')
    expect(typeof result.current[1].stopCountdown).toBe('function')
    expect(typeof result.current[1].resetCountdown).toBe('function')

    act(result.current[1].startCountdown)
    act(() => {
      jest.advanceTimersByTime(60 * 1000)
    })

    expect(result.current[0]).toBe(0)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current[0]).toBe(0)
  })

  test('should stop at custom countStop', () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 60, intervalMs: 1000, countStop: 30 }),
    )

    expect(result.current[0]).toBe(60)
    expect(typeof result.current[1].startCountdown).toBe('function')
    expect(typeof result.current[1].stopCountdown).toBe('function')
    expect(typeof result.current[1].resetCountdown).toBe('function')

    act(result.current[1].startCountdown)
    act(() => {
      jest.advanceTimersByTime(30 * 1000)
    })

    expect(result.current[0]).toBe(30)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current[0]).toBe(30)
  })

  test('should stop countdown', () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 60, intervalMs: 1000 }),
    )

    expect(result.current[0]).toBe(60)
    act(result.current[1].startCountdown)
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(result.current[0]).toBe(58)
    act(result.current[1].stopCountdown)
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(result.current[0]).toBe(58)
  })

  test('should stop reversed countdown', () => {
    const { result } = renderHook(() =>
      useCountdown({
        countStart: 10,
        intervalMs: 1000,
        countStop: 20,
        isIncrement: true,
      }),
    )

    expect(result.current[0]).toBe(10)
    act(result.current[1].startCountdown)
    act(() => {
      jest.advanceTimersByTime(2 * 1000)
    })

    expect(result.current[0]).toBe(12)

    act(() => {
      jest.advanceTimersByTime(8 * 1000)
    })
    expect(result.current[0]).toBe(20)

    act(() => {
      jest.advanceTimersByTime(3 * 1000)
    })

    expect(result.current[0]).toBe(20)
  })

  test('should reset count', () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 60, intervalMs: 1000 }),
    )

    act(result.current[1].startCountdown)
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    act(result.current[1].stopCountdown)
    expect(result.current[0]).toBeLessThan(60)

    act(result.current[1].resetCountdown)
    expect(result.current[0]).toBe(60)
  })
})
