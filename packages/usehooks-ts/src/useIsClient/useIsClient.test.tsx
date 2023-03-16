import { renderHook } from '@testing-library/react'

import useIsClient from './useIsClient'

// TODO: currently don't know how to simulate hydration of hooks.
describe('useIsClient()', () => {
  it.skip('should be false when rendering on the server', async () => {
    const { result } = renderHook(() => useIsClient(), { hydrate: false })
    expect(result.current).toBe(false)
  })

  it('should be true when after hydration', async () => {
    const { result } = renderHook(() => useIsClient(), { hydrate: true })
    expect(result.current).toBe(true)
  })
})
