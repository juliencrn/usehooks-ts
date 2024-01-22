import { act, renderHook } from '@testing-library/react-hooks/dom'
import { useUnmount } from './useUnmount'

describe('use unmount()', () => {
test('should use unmount be ok', () => {
const { result } = renderHook(() => useUnmount())
const [value, method] = result.current

expect(value).toBe(2)
expect(typeof method).toBe('function')
})

test('should method returns 2', () => {
const { result } = renderHook(() => useUnmount())
const [, method] = result.current

let value = 0

act(() => { value = method() })

expect(value).toBe(2)
})
})
