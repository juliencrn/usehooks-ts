// TODO: suppress warnings with mocked console.warn()
// TODO: check deprecate warning.

import { act, renderHook } from '@testing-library/react-hooks/native'

import useCountdown from './useCountdown'

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

      expect(result.current[0]).toBeGreaterThan(60)
    })

    test('should decrement count', () => {
      const { result } = renderHook(() =>
        useCountdown({ countStart: 60, intervalMs: 1000 }),
      )

      act(result.current[1].startCountdown)
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(result.current[0]).toBeLessThan(60)
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
