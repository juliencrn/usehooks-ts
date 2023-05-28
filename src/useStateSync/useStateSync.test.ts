import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks/dom'
import useStateSync from './useStateSync'

describe('use state sync()', () => {
  test('should use state sync be ok', () => {
    const { result } = renderHook(() => useStateSync(0))
    const [value, setValue] = result.current

    expect(value).toBe(0)
    expect(typeof setValue).toBe('function')
  })

  test('should simply return 1 if called without callback', () => {
    const { result } = renderHook(() => useStateSync(0))
    const [value, setValue] = result.current

    setValue(value + 1, newValue => expect(newValue).toBe(1))
  })
})
