import { act, renderHook } from '@testing-library/react-hooks/dom'
import useOnline from './useOnline'

describe('use online()', () => {
test('should use online be ok', () => {
const { result } = renderHook(() => useOnline())
const [value, method] = result.current

expect(value).toBe(2)
expect(typeof method).toBe('function')
})

test('should method returns 2', () => {
const { result } = renderHook(() => useOnline())
const [, method] = result.current

let value = 0

act(() => { value = method() })

expect(value).toBe(2)
})
})
