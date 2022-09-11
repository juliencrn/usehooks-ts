import { fireEvent } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'

import useHover from './useHover'

describe('useHover()', () => {
  const el = {
    current: document.createElement('div') as HTMLDivElement,
  }

  it('result must be initially false', () => {
    const { result } = renderHook(() => useHover(el))
    expect(result.current).toBe(false)
  })

  it('value must be true when firing hover action on element', () => {
    const { result } = renderHook(() => useHover(el))

    expect(result.current).toBe(false)

    act(() => void fireEvent.mouseEnter(el.current))
    expect(result.current).toBe(true)
  })

  it('value must turn back into false when firing mouseleave action on element', () => {
    const { result } = renderHook(() => useHover(el))

    expect(result.current).toBe(false)

    act(() => void fireEvent.mouseEnter(el.current))
    expect(result.current).toBe(true)

    act(() => void fireEvent.mouseLeave(el.current))
    expect(result.current).toBe(false)
  })
})
