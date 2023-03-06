import { act, renderHook } from '@testing-library/react-hooks/dom'
import useOnBackButtonClicked from './useOnBackButtonClicked'

describe('useOnBackButtonClicked()', () => {
test('should useOnBackButtonClicked be ok', () => {
const { result } = renderHook(() => useOnBackButtonClicked())
const [value, method] = result.current

expect(value).toBe(2)
expect(typeof method).toBe('function')
})

test('should method returns 2', () => {
const { result } = renderHook(() => useOnBackButtonClicked())
const [, method] = result.current

let value = 0

act(() => { value = method() })

expect(value).toBe(2)
})
})
