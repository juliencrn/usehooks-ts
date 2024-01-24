import { act, renderHook } from '@testing-library/react-hooks'

import { useAutoSyncedState } from './useAutoSyncedState'

describe('useAutoSyncedState', () => {
  test('should initialize state with a value', () => {
    const value = 42
    const { result } = renderHook(() => useAutoSyncedState(value))

    expect(result.current[0]).toBe(value)
  })

  test('should update state when the value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useAutoSyncedState(value),
      {
        initialProps: { value: 42 },
      },
    )

    expect(result.current[0]).toBe(42)

    const newValue = 84
    rerender({ value: newValue })

    expect(result.current[0]).toBe(newValue)
  })

  test('should not update state when the value remains the same', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useAutoSyncedState(value),
      {
        initialProps: { value: 42 },
      },
    )

    expect(result.current[0]).toBe(42)

    rerender({ value: 42 })

    expect(result.current[0]).toBe(42)
  })

  test('should update state when the value changes to a different reference in memory', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useAutoSyncedState(value),
      {
        initialProps: { value: { foo: 'bar' } },
      },
    )

    const initialValue = result.current[0]
    expect(initialValue).toEqual({ foo: 'bar' })

    const newValue = { foo: 'baz' }
    rerender({ value: newValue })

    expect(result.current[0]).toEqual(newValue)
    expect(result.current[0]).not.toBe(initialValue) // Ensure it's a new reference in the memory
  })

  test('should not update state when value changes to the same reference in memory', () => {
    const obj = { foo: 'bar' }
    const { result, rerender } = renderHook(
      ({ value }) => useAutoSyncedState(value),
      {
        initialProps: { value: obj },
      },
    )

    expect(result.current[0]).toEqual(obj)

    rerender({ value: obj })

    expect(result.current[0]).toBe(obj)
  })

  test('should update state when using setState', () => {
    const { result } = renderHook(() => useAutoSyncedState(42))

    expect(result.current[0]).toBe(42)

    act(() => {
      result.current[1](84)
    })

    expect(result.current[0]).toBe(84)
  })
})
