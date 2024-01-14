import { act, renderHook } from '@testing-library/react-hooks/dom'
import { useVisibilityState } from './useVisibilityState'

describe('useVisibilityState()', () => {
  test('should useVisibilityState be visible', () => {
    const { result } = renderHook(() => useVisibilityState())
    const visibilityState = result.current

    expect(visibilityState).toBe('visible')
  })
})
