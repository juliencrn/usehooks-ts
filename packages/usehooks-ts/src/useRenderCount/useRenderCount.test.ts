import { renderHook } from '@testing-library/react'

import { useRenderCount } from './useRenderCount'

describe('useRenderCount()', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log')
  })
  afterAll(() => {
    vi.resetAllMocks()
  })

  it('should use the default name', () => {
    const { result } = renderHook(() => useRenderCount())
    const value = result.current

    expect(value).toBe(1)
    expect(console.log).toHaveBeenCalledWith(
      '[] Component has rendered: 1 times',
    )
  })

  it('should use the given name', () => {
    const { result } = renderHook(() => useRenderCount('CustomComponent'))
    const value = result.current

    expect(value).toBe(1)
    expect(console.log).toHaveBeenCalledWith(
      '[CustomComponent] Component has rendered: 1 times',
    )
  })

  it('should increment the render count', () => {
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
    vi.stubEnv('NODE_ENV', 'production')
    const { result } = renderHook(() => useRenderCount())
    const value = result.current

    expect(value).toBe(1)
    expect(console.log).not.toHaveBeenCalled()

    vi.unstubAllEnvs()
  })
})
