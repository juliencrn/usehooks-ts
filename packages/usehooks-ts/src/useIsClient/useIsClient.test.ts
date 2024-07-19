import { renderHook } from '@testing-library/react'

import { useIsClient } from './useIsClient'

describe('useIsClient()', () => {
  // TODO: currently don't know how to simulate hydration of hooks. @see https://github.com/testing-library/react-testing-library/issues/1120
  it.skip('should be false when rendering on the server', () => {
    const { result } = renderHook(() => useIsClient(), { hydrate: false })
    expect(result.current).toBe(false)
  })

  it('should be true when after hydration', () => {
    const { result } = renderHook(() => useIsClient(), { hydrate: true })
    expect(result.current).toBe(true)
  })
})
