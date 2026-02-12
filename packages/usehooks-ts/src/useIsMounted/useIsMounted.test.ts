import { renderHook } from '@testing-library/react'

import { useIsMounted } from './useIsMounted'

describe('useIsMounted()', () => {
  it('should return true when component is mounted', () => {
    const {
      result: { current: isMounted },
    } = renderHook(() => useIsMounted())

    expect(isMounted()).toBe(true)
  })

  it('should return false when component is unmounted', () => {
    const {
      result: { current: isMounted },
      unmount,
    } = renderHook(() => useIsMounted())

    unmount()

    expect(isMounted()).toBe(false)
  })
})
