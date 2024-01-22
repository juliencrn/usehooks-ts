import { act, renderHook } from '@testing-library/react-hooks/dom'
import { useDebounceValue } from './useDebounceValue'

describe('use debounce value()', () => {
test('should use debounce value be ok', () => {
const { result } = renderHook(() => useDebounceValue())
const [value, method] = result.current

expect(value).toBe(2)
expect(typeof method).toBe('function')
})

test('should method returns 2', () => {
const { result } = renderHook(() => useDebounceValue())
const [, method] = result.current

let value = 0

act(() => { value = method() })

expect(value).toBe(2)
})
})
