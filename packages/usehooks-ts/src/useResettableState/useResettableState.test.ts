import { act, renderHook } from '@testing-library/react'

import { useResettableState } from './useResettableState'

describe('useResettableState', () => {
  it('should initialize state with the given initial value', () => {
    const { result } = renderHook(() => useResettableState(0))
    const [state] = result.current
    expect(state).toBe(0)
  })

  it('should update the state when setState is called', () => {
    const { result } = renderHook(() => useResettableState(0))
    const [, setState] = result.current

    act(() => {
      setState(1)
    })

    const [state] = result.current
    expect(state).toBe(1)
  })

  it('should reset the state to the initial value when resetState is called', () => {
    const { result } = renderHook(() => useResettableState(0))
    const [, setState, resetState] = result.current

    act(() => {
      setState(1)
    })

    act(() => {
      resetState()
    })

    const [state] = result.current
    expect(state).toBe(0)
  })
})
