// TODO: check deprecate warning.

import { act, renderHook } from '@testing-library/react-hooks/native'

import useCountdown, { DEPRECATED_WARN } from './useCountdown'

jest.useFakeTimers()

describe('deprecated useCountdown()', () => {
  // deprecating.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJsonVersion = require('../../package.json').version
  if (packageJsonVersion.startsWith('3.')) {
    console.error(
      'Skipping useCountdown test for version 3.x, please remove this test.',
    )
    return
  }
  test('should show deprecate warning', () => {
    console.warn = jest.fn()
    renderHook(() => {
      useCountdown({ seconds: 60, interval: 500, isIncrement: false })
      // expect(console.warn.mock.calls[0][0]).toBe(DEPRECATED_WARN)
      // HELP! I cant type this `.mock`
    })
    expect(console.warn).not.toHaveBeenCalledWith('some random string')
    expect(console.warn).toHaveBeenCalledWith(DEPRECATED_WARN)
  })

  test('should use countdown', () => {
    const { result } = renderHook(() =>
      useCountdown({ seconds: 60, interval: 500, isIncrement: false }),
    )

    expect(result.current[0]).toBe(60)
    expect(typeof result.current[1].start).toBe('function')
    expect(typeof result.current[1].stop).toBe('function')
    expect(typeof result.current[1].reset).toBe('function')
  })

  describe('start', () => {
    test('should increment count', () => {
      const { result } = renderHook(() =>
        useCountdown({ seconds: 60, interval: 500, isIncrement: true }),
      )

      act(result.current[1].start)
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(result.current[0]).toBeGreaterThan(60)
    })

    test('should decrement count', () => {
      const { result } = renderHook(() =>
        useCountdown({ seconds: 60, interval: 500 }),
      )

      act(result.current[1].start)
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(result.current[0]).toBeLessThan(60)
    })
  })

  describe('stop', () => {
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
    })
  })

  describe('reset', () => {
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
})

describe('useCountdown()', () => {
  describe('call useCountdown', () => {
    test('should return callable functions', () => {
      const { result } = renderHook(() =>
        useCountdown({ countStart: 60, intervalMs: 500, isIncrement: false }),
      )

      expect(result.current[0]).toBe(60)
      expect(typeof result.current[1].startCountdown).toBe('function')
      expect(typeof result.current[1].stopCountdown).toBe('function')
      expect(typeof result.current[1].resetCountdown).toBe('function')
    })
    test('should accept only countStart', () => {
      const { result } = renderHook(() => useCountdown({ countStart: 60 }))

      expect(result.current[0]).toBe(60)
      expect(typeof result.current[1].startCountdown).toBe('function')
      expect(typeof result.current[1].stopCountdown).toBe('function')
      expect(typeof result.current[1].resetCountdown).toBe('function')
    })
    test('should accept only countStart, intervalMs', () => {
      const { result } = renderHook(() =>
        useCountdown({ countStart: 60, intervalMs: 500 }),
      )

      expect(result.current[0]).toBe(60)
      expect(typeof result.current[1].startCountdown).toBe('function')
      expect(typeof result.current[1].stopCountdown).toBe('function')
      expect(typeof result.current[1].resetCountdown).toBe('function')
    })
    test('should accept only countStart, intervalMs, countStop', () => {
      const { result } = renderHook(() =>
        useCountdown({ countStart: 60, intervalMs: 500, countStop: 0 }),
      )

      expect(result.current[0]).toBe(60)
      expect(typeof result.current[1].startCountdown).toBe('function')
      expect(typeof result.current[1].stopCountdown).toBe('function')
      expect(typeof result.current[1].resetCountdown).toBe('function')
    })
  })

  describe('startCountdown', () => {
    test('should increment count', () => {
      const { result } = renderHook(() =>
        useCountdown({
          countStart: 60,
          intervalMs: 1000,
          isIncrement: true,
          countStop: 0,
        }),
      )

      act(result.current[1].startCountdown)
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(result.current[0]).toBe(61)
    })

    test('should decrement count', () => {
      const { result } = renderHook(() => useCountdown({ countStart: 60 }))
      // interval = 1sec by default.
      act(result.current[1].startCountdown)
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(result.current[0]).toBeLessThan(60)
    })

    test('should stop at countStop', () => {
      const { result } = renderHook(() =>
        useCountdown({ countStart: 60, intervalMs: 1000, countStop: 0 }),
      )
      act(result.current[1].startCountdown)
      const PASSED_TIME_SEC = 60
      act(() => {
        jest.advanceTimersByTime(PASSED_TIME_SEC * 1000)
      })
      expect(result.current[0]).toBe(60 - PASSED_TIME_SEC)
      act(() => {
        jest.advanceTimersByTime(60_000)
      })
      expect(result.current[0]).toBe(0)
    })
  })

  describe('stopCountdown', () => {
    test('should stop countdown', () => {
      const { result } = renderHook(() =>
        useCountdown({ countStart: 60, intervalMs: 1000 }),
      )

      expect(result.current[0]).toBe(60)
      act(result.current[1].startCountdown)
      act(() => {
        jest.advanceTimersByTime(2000)
      })
      act(result.current[1].stopCountdown)
      act(() => {
        jest.advanceTimersByTime(3000)
      })
      expect(result.current[0]).toBe(58)
    })
  })

  describe('resetCountdown', () => {
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
})
