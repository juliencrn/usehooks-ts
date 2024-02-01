import { renderHook } from '@testing-library/react'

import { useIsFirstRender } from './useIsFirstRender'

describe('use is first render()', () => {
  it('should return true at the first render, next false', () => {
    const { result, rerender } = renderHook(() => useIsFirstRender())

    expect(result.current).toBe(true)

    rerender()

    expect(result.current).toBe(false)
  })
})
