import { renderHook as renderHookCsr } from '@testing-library/react-hooks/dom'
import { renderHook as renderHookSsr } from '@testing-library/react-hooks/server'

import useIsClient from './useIsClient'

describe('useIsClient()', () => {
  it('should be false when rendering on the server', (): void => {
    const { result } = renderHookSsr(() => useIsClient())
    expect(result.current).toBe(false)
  })

  it('should be true when after hydration', (): void => {
    const { result, hydrate } = renderHookSsr(() => useIsClient())
    hydrate()
    expect(result.current).toBe(true)
  })

  it('should be true when rendering on the client', (): void => {
    const { result } = renderHookCsr(() => useIsClient())
    expect(result.current).toBe(true)
  })
})
