import { act, renderHook } from '@testing-library/react-hooks/dom'

import { mockMatchMedia, mockStorage } from '../../mocks'
import { useTernaryDarkMode } from './useTernaryDarkMode'

mockStorage('localStorage')

describe('useTernaryDarkMode()', () => {
  beforeEach(() => {
    window.localStorage.clear()
    mockMatchMedia(false)
  })

  test('should initialize with default value (light)', () => {
    const { result } = renderHook(() => useTernaryDarkMode())

    expect(result.current.isDarkMode).toBe(false)
    expect(result.current.ternaryDarkMode).toBe('system')
  })

  test('should initialize with default value (dark)', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useTernaryDarkMode())

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.ternaryDarkMode).toBe('system')
  })

  test('should setter work', () => {
    const { result } = renderHook(() => useTernaryDarkMode())

    expect(result.current.isDarkMode).toBe(false)
    expect(result.current.ternaryDarkMode).toBe('system')

    act(() => {
      result.current.setTernaryDarkMode('dark')
    })

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.ternaryDarkMode).toBe('dark')

    act(() => {
      result.current.setTernaryDarkMode('light')
    })

    expect(result.current.isDarkMode).toBe(false)
    expect(result.current.ternaryDarkMode).toBe('light')
  })

  test('should toggle dark mode', () => {
    const { result } = renderHook(() => useTernaryDarkMode())

    expect(result.current.isDarkMode).toBe(false)
    expect(result.current.ternaryDarkMode).toBe('system')

    act(() => {
      result.current.toggleTernaryDarkMode()
    })

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.ternaryDarkMode).toBe('dark')

    act(() => {
      result.current.toggleTernaryDarkMode()
    })

    expect(result.current.isDarkMode).toBe(false)
    expect(result.current.ternaryDarkMode).toBe('light')
  })

  test('should accept a custom localStorage key (depreciated interface)', () => {
    const { result } = renderHook(() => useTernaryDarkMode('custom-key'))

    expect(result.current.isDarkMode).toBe(false)
    expect(result.current.ternaryDarkMode).toBe('system')

    act(() => {
      result.current.toggleTernaryDarkMode()
    })

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.ternaryDarkMode).toBe('dark')
    expect(window.localStorage.getItem('custom-key')).toBe(
      JSON.stringify('dark'),
    )

    act(() => {
      result.current.toggleTernaryDarkMode()
    })

    expect(result.current.isDarkMode).toBe(false)
    expect(result.current.ternaryDarkMode).toBe('light')
    expect(window.localStorage.getItem('custom-key')).toBe(
      JSON.stringify('light'),
    )
  })

  test('should accept a custom localStorage key', () => {
    const { result } = renderHook(() =>
      useTernaryDarkMode({ localStorageKey: 'custom-key' }),
    )

    expect(result.current.isDarkMode).toBe(false)
    expect(result.current.ternaryDarkMode).toBe('system')

    act(() => {
      result.current.toggleTernaryDarkMode()
    })

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.ternaryDarkMode).toBe('dark')
    expect(window.localStorage.getItem('custom-key')).toBe(
      JSON.stringify('dark'),
    )

    act(() => {
      result.current.toggleTernaryDarkMode()
    })

    expect(result.current.isDarkMode).toBe(false)
    expect(result.current.ternaryDarkMode).toBe('light')
    expect(window.localStorage.getItem('custom-key')).toBe(
      JSON.stringify('light'),
    )
  })

  test('should accept a custom default value (dark)', () => {
    const { result } = renderHook(() =>
      useTernaryDarkMode({ defaultValue: 'dark' }),
    )

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.ternaryDarkMode).toBe('dark')
  })

  test('should accept a custom default value (light)', () => {
    const { result } = renderHook(() =>
      useTernaryDarkMode({ defaultValue: 'light' }),
    )

    expect(result.current.isDarkMode).toBe(false)
    expect(result.current.ternaryDarkMode).toBe('light')
  })
})
