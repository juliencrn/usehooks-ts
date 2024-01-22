import { act, renderHook } from '@testing-library/react-hooks/dom'
import { useDebounceCallback } from './useDebounceCallback'

describe('use debounce callback()', () => {
test('should use debounce callback be ok', () => {
const { result } = renderHook(() => useDebounceCallback())
const [value, method] = result.current

expect(value).toBe(2)
expect(typeof method).toBe('function')
})

test('should method returns 2', () => {
const { result } = renderHook(() => useDebounceCallback())
const [, method] = result.current

let value = 0

act(() => { value = method() })

expect(value).toBe(2)
})
})
