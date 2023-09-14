import { act, renderHook } from '@testing-library/react-hooks/dom'

import { useSet } from './useSet'

describe('useSet()', () => {
  it('should be ok when initiated with initial state', () => {
    const { result } = renderHook(() => useSet(['initial', 'state']))

    expect(result.current[0].size).toBe(2)
  })

  it('should be ok when initiated empty', () => {
    const { result } = renderHook(() => useSet())

    expect(result.current[0].size).toBe(0)
  })

  it('should add new value', () => {
    const { result } = renderHook(() => useSet<string>())
    const [, actions] = result.current

    expect(result.current[0].size).toBe(0)

    act(() => actions.add('value'))
    expect(result.current[0].has('value')).toBeTruthy()
  })

  it('should delete value', () => {
    const { result } = renderHook(() => useSet<string>(['value']))
    const [, actions] = result.current

    expect(result.current[0].size).toBe(1)

    act(() => actions.delete('value'))
    expect(result.current[0].size).toBe(0)
  })

  it('should clear', () => {
    const { result } = renderHook(() => useSet<string>(['value', 'value2']))
    const [, actions] = result.current

    expect(result.current[0].size).toBe(2)

    act(() => actions.clear())
    expect(result.current[0].size).toBe(0)
  })
})
