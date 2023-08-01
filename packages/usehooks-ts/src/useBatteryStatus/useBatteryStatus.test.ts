import { act, renderHook } from '@testing-library/react-hooks/dom'
import { useBatteryStatus } from './useBatteryStatus'

describe('useBatteryStatus()', () => {
test('should useBatteryStatus be ok', () => {
const { result } = renderHook(() => useBatteryStatus())
const [value, method] = result.current

expect(value).toBe(2)
expect(typeof method).toBe('function')
})

test('should method returns 2', () => {
const { result } = renderHook(() => useBatteryStatus())
const [, method] = result.current

let value = 0

act(() => { value = method() })

expect(value).toBe(2)
})
})
