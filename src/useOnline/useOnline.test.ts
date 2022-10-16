import { renderHook } from '@testing-library/react-hooks/dom'

import useOnline from './useOnline'

describe('use online()', () => {
  test('should use online be ok', () => {
    const { result } = renderHook(() => useOnline())
    const isOnline = result.current

    expect(typeof isOnline).toBe('boolean')
  })
})
