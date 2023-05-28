import { act, renderHook } from '@testing-library/react-hooks'

import useDarkMode from './useDarkMode'

const mockMatchMedia = (matches: boolean): void => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

describe('useDarkMode()', () => {
  afterEach(() => {
    mockMatchMedia(false)
  })

  test('should initiate correctly', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useDarkMode())
    expect(typeof result.current.isDarkMode).toBe('boolean')
    expect(typeof result.current.disable).toBe('function')
    expect(typeof result.current.toggle).toBe('function')
    expect(typeof result.current.enable).toBe('function')
  })

  test('should have a default value(1)', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useDarkMode(false))
    expect(result.current.isDarkMode).toBe(false)
  })

  test('should have a default value(2)', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useDarkMode(true))
    expect(result.current.isDarkMode).toBe(true)
  })

  test('should toggle dark mode (1)', () => {
    mockMatchMedia(true)

    const { result } = renderHook(() => useDarkMode(true))
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isDarkMode).toBe(false)
  })

  test('should toggle dark mode (2)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  test('should enable dark mode (1)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    act(() => {
      result.current.enable()
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  test('should enable dark mode (2)', () => {
    const { result } = renderHook(() => useDarkMode(true))
    act(() => {
      result.current.enable()
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  test('should disable dark mode (1)', () => {
    const { result } = renderHook(() => useDarkMode(true))
    act(() => {
      result.current.disable()
    })
    expect(result.current.isDarkMode).toBe(false)
  })

  test('should disable dark mode (2)', () => {
    const { result } = renderHook(() => useDarkMode(false))
    act(() => {
      result.current.disable()
    })
    expect(result.current.isDarkMode).toBe(false)
  })
})
