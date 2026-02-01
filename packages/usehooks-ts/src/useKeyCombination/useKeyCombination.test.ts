import { act, renderHook } from '@testing-library/react'

import { useKeyCombination } from './useKeyCombination'

describe('useKeyCombination()', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('should call handler when all keys in combo are pressed', () => {
    const handler = vi.fn()

    renderHook(() => useKeyCombination(['a', 'b'], handler))

    // Simulate pressing 'a' then 'b'
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
    })
    expect(handler).not.toHaveBeenCalled()

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true }))
    })
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should not call handler for partial combination', () => {
    const handler = vi.fn()

    renderHook(() => useKeyCombination(['a', 'b', 'c'], handler))

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true }))
    })

    expect(handler).not.toHaveBeenCalled()
  })

  it('should reset when wrong key is pressed', () => {
    const handler = vi.fn()

    renderHook(() => useKeyCombination(['a', 'b'], handler))

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'x', bubbles: true })) // Wrong key
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true }))
    })

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should handle null event target', () => {
    const handler = vi.fn()

    renderHook(() =>
      useKeyCombination(['a', 'b'], handler, { eventTarget: null }),
    )

    expect(handler).not.toHaveBeenCalled()
  })

  it('should work with case insensitive keys', () => {
    const handler = vi.fn()

    renderHook(() => useKeyCombination(['A', 'B'], handler))

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'B', bubbles: true }))
    })

    expect(handler).toHaveBeenCalledTimes(1)
  })
})
