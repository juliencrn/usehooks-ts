import { renderHook } from '@testing-library/react-hooks/dom'

import { useReadSessionStorage } from './useReadSessionStorage'

class SessionStorageMock {
  store: Record<string, unknown> = {}

  clear() {
    this.store = {}
  }

  getItem(key: string) {
    return this.store[key] || null
  }

  setItem(key: string, value: unknown) {
    this.store[key] = value + ''
  }

  removeItem(key: string) {
    delete this.store[key]
  }
}

Object.defineProperty(window, 'sessionStorage', {
  value: new SessionStorageMock(),
})

describe('useReadSessionStorage()', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('returns null if no item in session storage', () => {
    const { result } = renderHook(() => useReadSessionStorage('key'))

    expect(result.current).toBe(null)
  })

  test('returns object if no options passed', () => {
    const obj = { value: 'test' }
    window.sessionStorage.setItem('key', JSON.stringify(obj))

    const { result } = renderHook(() => useReadSessionStorage('key'))

    expect(result.current).toStrictEqual(obj)
  })

  test('returns string if parseAsJson is false', () => {
    window.sessionStorage.setItem('key', 'value')

    const { result } = renderHook(() =>
      useReadSessionStorage('key', { parseAsJson: false }),
    )

    expect(result.current).toBe('value')
  })

  test('returns expected value with custom parser', () => {
    window.sessionStorage.setItem('key', 'value')

    const { result } = renderHook(() =>
      useReadSessionStorage('key', { parser: doubleLetters }),
    )

    expect(result.current).toBe('vvaalluuee')
  })
})

function doubleLetters(value: string | null) {
  if (value === null) {
    return ''
  }
  let result = ''
  for (let i = 0; i < value.length; i++) {
    result += value[i] + value[i]
  }
  return result
}
