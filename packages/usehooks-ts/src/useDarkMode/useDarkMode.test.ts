import { act, renderHook } from '@testing-library/react'

import { mockMatchMedia, mockStorage } from '../../tests/mocks'
import { useDarkMode } from './useDarkMode'

mockStorage('localStorage')

describe('useDarkMode()', () => {
  beforeEach(() => {
    window.localStorage.clear()
    mockMatchMedia(false)
  })

  it('should initiate correctly', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useDarkMode())
    expect(typeof result.current.isDarkMode).toBe('boolean')
    expect(typeof result.current.disable).toBe('function')
    expect(typeof result.current.toggle).toBe('function')
    expect(typeof result.current.enable).toBe('function')
    expect(typeof result.current.set).toBe('function')
  })

  it('should have a default value (1) (depreciated interface)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should have a default value (2) (depreciated interface)', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useDarkMode(true))
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should toggle dark mode (1) (depreciated interface)', () => {
    mockMatchMedia(true)

    const { result } = renderHook(() => useDarkMode(true))
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should toggle dark mode (2) (depreciated interface)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should enable dark mode (1) (depreciated interface)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    act(() => {
      result.current.enable()
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should enable dark mode (2) (depreciated interface)', () => {
    const { result } = renderHook(() => useDarkMode(true))
    act(() => {
      result.current.enable()
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should disable dark mode (1) (depreciated interface)', () => {
    const { result } = renderHook(() => useDarkMode(true))
    act(() => {
      result.current.disable()
    })
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should disable dark mode (2) (depreciated interface)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    act(() => {
      result.current.disable()
    })
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should set dark mode (1) (depreciated interface)', () => {
    const { result } = renderHook(() => useDarkMode(true))
    act(() => {
      result.current.set(false)
    })
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should set dark mode (2) (depreciated interface)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    act(() => {
      result.current.set(true)
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should set dark mode (3) (depreciated interface)', () => {
    const { result } = renderHook(() => useDarkMode(true))
    act(() => {
      result.current.set(true)
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should set dark mode (4) (depreciated interface)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    act(() => {
      result.current.set(false)
    })
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should accept a custom localStorage key', () => {
    const { result } = renderHook(() =>
      useDarkMode({ localStorageKey: 'custom-key' }),
    )

    expect(result.current.isDarkMode).toBe(false)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.isDarkMode).toBe(true)
    expect(window.localStorage.getItem('custom-key')).toBe(JSON.stringify(true))
  })

  it('should accept a custom default value', () => {
    const { result } = renderHook(() => useDarkMode({ defaultValue: true }))

    expect(result.current.isDarkMode).toBe(true)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.isDarkMode).toBe(false)
  })
})
