import { renderHook } from '@testing-library/react'

import { useElementSize } from './index'

describe('useElementSize()', () => {
  it('should return initial values', () => {
    const { result } = renderHook(() => useElementSize({ frequency: 200 }))

    expect(result.current.height).toBe(0)
    expect(result.current.width).toBe(0)
    expect(result.current.ref).toBeDefined()
    expect(result.current.ref.current).toBeNull()
  })

  it('should return ref object', () => {
    const { result } = renderHook(() => useElementSize({ frequency: 100 }))

    expect(result.current.ref).toHaveProperty('current')
  })

  it('should accept custom frequency', () => {
    const { result: result1 } = renderHook(() => useElementSize({ frequency: 100 }))
    const { result: result2 } = renderHook(() => useElementSize({ frequency: 500 }))

    // Both should return the same shape
    expect(result1.current).toHaveProperty('height')
    expect(result1.current).toHaveProperty('width')
    expect(result1.current).toHaveProperty('ref')
    expect(result2.current).toHaveProperty('height')
    expect(result2.current).toHaveProperty('width')
    expect(result2.current).toHaveProperty('ref')
  })

  it('should use default frequency of 200ms when not specified', () => {
    const { result } = renderHook(() => useElementSize({}))

    expect(result.current.height).toBe(0)
    expect(result.current.width).toBe(0)
    expect(result.current.ref).toBeDefined()
  })

  it('should have stable ref across renders', () => {
    const { result, rerender } = renderHook(() => useElementSize({ frequency: 200 }))

    const firstRef = result.current.ref

    rerender()

    const secondRef = result.current.ref

    // Ref should be the same object across renders
    expect(firstRef).toBe(secondRef)
  })
})
