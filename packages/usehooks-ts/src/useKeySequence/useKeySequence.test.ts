import { act, renderHook } from '@testing-library/react'

import { useKeySequence } from './useKeySequence'

describe('useKeySequence()', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should call handler when sequence is typed', () => {
    const handler = vi.fn()

    renderHook(() => useKeySequence('abc', handler))

    // Simulate typing 'a', 'b', 'c'
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', bubbles: true }))
    })

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should not call handler for incomplete sequence', () => {
    const handler = vi.fn()

    renderHook(() => useKeySequence('abc', handler))

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true }))
    })

    expect(handler).not.toHaveBeenCalled()
  })

  it('should reset sequence on wrong key', () => {
    const handler = vi.fn()

    renderHook(() => useKeySequence('abc', handler))

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'x', bubbles: true })) // Wrong key
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', bubbles: true }))
    })

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should reset sequence after timeout', () => {
    const handler = vi.fn()

    renderHook(() => useKeySequence('abc', handler, { timeout: 500 }))

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
    })

    // Advance timer past timeout
    vi.advanceTimersByTime(600)

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', bubbles: true }))
    })

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should handle null event target', () => {
    const handler = vi.fn()

    renderHook(() =>
      useKeySequence('abc', handler, { eventTarget: null }),
    )

    expect(handler).not.toHaveBeenCalled()
  })
})
