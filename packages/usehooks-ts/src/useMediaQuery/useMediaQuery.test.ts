import { renderHook } from '@testing-library/react'

import { mockMatchMedia } from '../../tests/mocks'
import { useMediaQuery } from './useMediaQuery'

describe('useMediaQuery()', () => {
  // TODO: currently don't know how to simulate hydration of hooks. @see https://github.com/testing-library/react-testing-library/issues/1120
  it.skip('should return true during SSR when defaultValue is true', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() =>
      useMediaQuery('(max-width: 600px)', {
        defaultValue: true,
        initializeWithValue: false,
      }),
    )
    expect(result.current).toBeTruthy()
  })

  it('should return true when matchMedia matches', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'))
    expect(result.current).toBeTruthy()
  })

  it('should return false when matchMedia does not match', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'))
    expect(result.current).toBeFalsy()
  })
})
