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

  it('should have a default value(1)', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useDarkMode(false))
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should have a default value(2)', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useDarkMode(true))
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should toggle dark mode (1)', () => {
    mockMatchMedia(true)

    const { result } = renderHook(() => useDarkMode(true))
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should toggle dark mode (2)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should enable dark mode (1)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    act(() => {
      result.current.enable()
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should enable dark mode (2)', () => {
    const { result } = renderHook(() => useDarkMode(true))
    act(() => {
      result.current.enable()
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should disable dark mode (1)', () => {
    const { result } = renderHook(() => useDarkMode(true))
    act(() => {
      result.current.disable()
    })
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should disable dark mode (2)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    act(() => {
      result.current.disable()
    })
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should set dark mode (1)', () => {
    const { result } = renderHook(() => useDarkMode(true))
    act(() => {
      result.current.set(false)
    })
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should set dark mode (2)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    act(() => {
      result.current.set(true)
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should set dark mode (3)', () => {
    const { result } = renderHook(() => useDarkMode(true))
    act(() => {
      result.current.set(true)
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should set dark mode (4)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    act(() => {
      result.current.set(false)
    })
    expect(result.current.isDarkMode).toBe(false)
  })
})
