import { renderHook } from '@testing-library/react'

import { useRenderCount } from './useRenderCount'

describe('useRenderCount()', () => {
  it('should use the default name', () => {
    vi.spyOn(console, 'log')
    const { result } = renderHook(() => useRenderCount())
    const value = result.current

    expect(value).toBe(1)
    expect(console.log).toHaveBeenCalledWith(
      '[] Component has rendered: 1 times',
    )
  })

  it('should use the given name', () => {
    vi.spyOn(console, 'log')
    const { result } = renderHook(() => useRenderCount('CustomComponent'))
    const value = result.current

    expect(value).toBe(1)
    expect(console.log).toHaveBeenCalledWith(
      '[CustomComponent] Component has rendered: 1 times',
    )
  })

  it('should increment the render count', () => {
    vi.spyOn(console, 'log')
    const { result, rerender } = renderHook(() => useRenderCount())
    const value = result.current

    expect(value).toBe(1)
    expect(console.log).toHaveBeenCalledWith(
      '[] Component has rendered: 1 times',
    )

    rerender()
    expect(result.current).toBe(2)
    expect(console.log).toHaveBeenCalledWith(
      '[] Component has rendered: 2 times',
    )
  })

  it('should not log in production', () => {
    vi.spyOn(console, 'log')
    process.env.NODE_ENV = 'production'
    const { result } = renderHook(() => useRenderCount())
    const value = result.current

    expect(value).toBe(1)
    expect(console.log).not.toHaveBeenCalled()
  })
})
