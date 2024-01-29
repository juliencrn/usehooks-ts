import { renderHook } from '@testing-library/react'

import { useReadLocalStorage } from './useReadLocalStorage'

describe('useReadLocalStorage()', () => {
  it('should use read local storage', () => {
    const { result } = renderHook(() => useReadLocalStorage('test'))

    expect(result.current).toBe(null)
  })
})
