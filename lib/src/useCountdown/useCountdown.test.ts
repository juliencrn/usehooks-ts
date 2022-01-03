import { act, renderHook } from '@testing-library/react-hooks/native'

import useCountdown from './useCountdown'

jest.useFakeTimers()

describe('useCountdown()', () => {
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
