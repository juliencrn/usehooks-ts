import { renderHook } from '@testing-library/react-hooks/native'

import useIsMounted from './useIsMounted'

describe('useIsMounted()', () => {
  test('isMounted() should return true when component is mounted', () => {
    const {
      result: { current: isMounted },
    } = renderHook(() => useIsMounted())

    expect(isMounted()).toBe(true)
  })

  test('isMounted() should return false when component is unmounted', () => {
    const {
      result: { current: isMounted },
      unmount,
    } = renderHook(() => useIsMounted())

    unmount()

    expect(isMounted()).toBe(false)
  })
})
