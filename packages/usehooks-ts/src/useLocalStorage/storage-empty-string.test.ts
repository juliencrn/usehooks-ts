import { act, renderHook } from '@testing-library/react'

import { useReadLocalStorage } from '../useReadLocalStorage'
import { useSessionStorage } from '../useSessionStorage'
import { useLocalStorage } from './useLocalStorage'

describe.each([
  ['localStorage', useLocalStorage],
  ['sessionStorage', useSessionStorage],
] as const)('%s with a custom string serializer', (storageName, useStorage) => {
  it('preserves empty strings when reading, updating, and remounting', () => {
    const storage = window[storageName]
    const key = 'empty-string-regression'
    const options = {
      serializer: (value: string) => value,
      deserializer: (value: string) => value,
    }
    storage.setItem(key, '')

    const first = renderHook(() => useStorage(key, 'fallback', options))
    expect(first.result.current[0]).toBe('')

    act(() => {
      first.result.current[1](previous => `${previous}!`)
    })
    expect(first.result.current[0]).toBe('!')
    expect(storage.getItem(key)).toBe('!')

    act(() => {
      first.result.current[1]('')
    })
    expect(first.result.current[0]).toBe('')
    first.unmount()

    const second = renderHook(() => useStorage(key, 'fallback', options))
    expect(second.result.current[0]).toBe('')
    act(() => {
      second.result.current[2]()
    })
    expect(second.result.current[0]).toBe('fallback')
    expect(storage.getItem(key)).toBeNull()
  })
})

it('preserves empty strings in the read-only storage hook', () => {
  const key = 'read-empty-string-regression'
  window.localStorage.setItem(key, '')

  const { result } = renderHook(() =>
    useReadLocalStorage(key, { deserializer: (value: string) => value }),
  )
  expect(result.current).toBe('')
  window.localStorage.removeItem(key)
})
