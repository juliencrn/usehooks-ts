import { renderHook } from '@testing-library/react-hooks/dom'
import useOS from './useOS'

describe('useOS()', () => {
  test('should useOS be ok', () => {
    const { result } = renderHook(() => useOS())

    expect(typeof result.current).toBe('string')
  })
})
