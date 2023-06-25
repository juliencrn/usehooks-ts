import { act, renderHook } from '@testing-library/react-hooks/dom'

import { useSessionStorage } from './useSessionStorage'

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

describe('useSessionStorage()', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Existing string state is in the returned state when parseAsJson is false', () => {
    window.sessionStorage.setItem('key', 'value')
    const { result } = renderHook(() =>
      useSessionStorage('key', 'value', { parseAsJson: false }),
    )

    expect(result.current[0]).toBe('value')
  })

  test('Custom parser returns expected value', () => {
    window.sessionStorage.setItem('key', 'value')

    const { result } = renderHook(() =>
      useSessionStorage('key', 'value', { parser: doubleLetters }),
    )

    expect(result.current[0]).toBe('vvaalluuee')
  })

  test('Custom serializer stores expected value', () => {
    const { result } = renderHook(() =>
      useSessionStorage('key', 'value', {
        parseAsJson: false,
        serializer: doubleLetters,
      }),
    )

    act(() => {
      const setState = result.current[1]
      setState('value')
    })

    expect(result.current[0]).toBe('vvaalluuee')
  })

  test('Custom parser returns expected value after being serialized', () => {
    const { result } = renderHook(() =>
      useSessionStorage('key', 'value', {
        parseAsJson: false,
        serializer: doubleLetters,
        parser: doubleLetters,
      }),
    )

    expect(result.current[0]).toBe('value')
  })

  test('Existing object state is in the returned state', () => {
    const obj = { value: 'foo' }
    window.sessionStorage.setItem('key', JSON.stringify(obj))
    const { result } = renderHook(() => useSessionStorage('key', obj))

    expect(result.current[0]).toStrictEqual(obj)
  })

  test('Initial state is a callback function', () => {
    const { result } = renderHook(() => useSessionStorage('key', () => 'value'))

    expect(result.current[0]).toBe('value')
  })

  test('Initial state is an array', () => {
    const { result } = renderHook(() => useSessionStorage('digits', [1, 2]))

    expect(result.current[0]).toEqual([1, 2])
  })

  test('Update the state', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'value'))

    act(() => {
      const setState = result.current[1]
      setState('edited')
    })

    expect(result.current[0]).toBe('edited')
  })

  test('Update the state writes sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'value'))

    act(() => {
      const setState = result.current[1]
      setState('edited')
    })

    expect(window.sessionStorage.getItem('key')).toBe(JSON.stringify('edited'))
  })

  test('Update the state with a callback function', () => {
    const { result } = renderHook(() => useSessionStorage('count', 2))

    act(() => {
      const setState = result.current[1]
      setState(prev => prev + 1)
    })

    expect(result.current[0]).toBe(3)
    expect(window.sessionStorage.getItem('count')).toEqual('3')
  })

  test('[Event] Update one hook updates the others', () => {
    const initialValues: [string, unknown] = ['key', 'initial']
    const { result: A } = renderHook(() => useSessionStorage(...initialValues))
    const { result: B } = renderHook(() => useSessionStorage(...initialValues))

    act(() => {
      const setState = A.current[1]
      setState('edited')
    })

    expect(B.current[0]).toBe('edited')
  })

  test('setValue is referentially stable', () => {
    const { result } = renderHook(() => useSessionStorage('count', 1))

    // Store a reference to the original setValue
    const originalCallback = result.current[1]

    // Now invoke a state update, if setValue is not referentially stable then this will cause the originalCallback
    // reference to not be equal to the new setValue function
    act(() => {
      const setState = result.current[1]
      setState(prev => prev + 1)
    })

    expect(result.current[1] === originalCallback).toBe(true)
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
