import { act, renderHook } from '@testing-library/react'

import { mockMatchMedia, mockStorage } from '../../tests/mocks'
import { useTernaryDarkMode } from './useTernaryDarkMode'

mockStorage('localStorage')

describe('useTernaryDarkMode()', () => {
  beforeEach(() => {
    window.localStorage.clear()
    mockMatchMedia(false)
  })

  it('should initialize with default value (light)', () => {
    const { result } = renderHook(() => useTernaryDarkMode())

    expect(result.current.isDarkMode).toBe(false)
    expect(result.current.ternaryDarkMode).toBe('system')
  })

  it('should initialize with default value (dark)', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useTernaryDarkMode())

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.ternaryDarkMode).toBe('system')
  })

  it('should setter work', () => {
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

  it('should toggle dark mode', () => {
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

  it('should accept a custom localStorage key (depreciated interface)', () => {
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

  it('should accept a custom localStorage key', () => {
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

  it('should accept a custom default value (dark)', () => {
    const { result } = renderHook(() =>
      useTernaryDarkMode({ defaultValue: 'dark' }),
    )

    expect(result.current.isDarkMode).toBe(true)
    expect(result.current.ternaryDarkMode).toBe('dark')
  })

  it('should accept a custom default value (light)', () => {
    const { result } = renderHook(() =>
      useTernaryDarkMode({ defaultValue: 'light' }),
    )

    expect(result.current.isDarkMode).toBe(false)
    expect(result.current.ternaryDarkMode).toBe('light')
  })
})
