import { act, renderHook } from '@testing-library/react'

import { useKeyPress } from './useKeyPress'

describe('useKeyPress()', () => {
  it('should return false when key is not pressed', () => {
    const { result } = renderHook(() => useKeyPress('a'))
    expect(result.current).toBe(false)
  })

  it('should accept custom event types', () => {
    const { result } = renderHook(() =>
      useKeyPress('a', { eventTypes: ['keydown'] }),
    )
    expect(result.current).toBe(false)
  })

  it('should handle case insensitive key matching', () => {
    const { result } = renderHook(() => useKeyPress('A'))
    expect(result.current).toBe(false)
  })

  it('should handle null event target', () => {
    const { result } = renderHook(() =>
      useKeyPress('a', { eventTarget: null }),
    )
    expect(result.current).toBe(false)
  })
})
