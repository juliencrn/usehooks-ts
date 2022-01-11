import { act, renderHook } from '@testing-library/react-hooks/native'

import useTernaryDarkMode from './useTernaryDarkMode'

describe('use ternary dark mode()', () => {
  test('should use ternary dark mode be ok', () => {
    const { result } = renderHook(() => useTernaryDarkMode())
    const [value, method] = result.current

    expect(value).toBe(2)
    expect(typeof method).toBe('function')
  })

  test('should method returns 2', () => {
    const { result } = renderHook(() => useTernaryDarkMode())
    const [, method] = result.current

    let value = 0

    act(() => {
      value = method()
    })

    expect(value).toBe(2)
  })
})
