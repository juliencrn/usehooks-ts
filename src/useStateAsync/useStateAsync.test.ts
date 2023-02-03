import { act, renderHook } from '@testing-library/react-hooks/dom'

import useStateAsync from './useStateAsync'

describe('use state async()', () => {
  test('initialValue can be plain value', () => {
    const { result } = renderHook(() => useStateAsync(4))
    const [value] = result.current
    expect(value).toBe(4)
  })

  test('initialValue can be function', () => {
    const { result } = renderHook(() => useStateAsync(() => 4))
    const [value] = result.current
    expect(value).toBe(4)
  })

  test('setValue should mutate the value', async () => {
    const { result } = renderHook(() => useStateAsync(4))
    const [, setValue] = result.current

    expect(result.current[0]).toBe(4)

    act(() => {
      setValue(5)
    })

    expect(result.current[0]).toBe(5)
  })

  test('setValue should mutate the value with function', async () => {
    const { result } = renderHook(() => useStateAsync(4))
    const [, setValue] = result.current

    expect(result.current[0]).toBe(4)

    act(() => {
      setValue(prev => prev + 1)
    })

    expect(result.current[0]).toBe(5)
  })

  test('setValue should return promise that resolves on next render', async () => {
    const { result } = renderHook(() => useStateAsync(4))
    const [, setValue] = result.current

    expect(result.current[0]).toBe(4)

    act(async () => {
      const promise = setValue(5)
      expect(promise).toBeInstanceOf(Promise)

      expect(result.current[0]).toBe(4)

      await promise

      expect(result.current[0]).toBe(5)
    })
  })
})
