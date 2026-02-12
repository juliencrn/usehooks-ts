import { act, fireEvent, renderHook } from '@testing-library/react'

import { useClickAnyWhere } from './useClickAnyWhere'

describe('useClickAnyWhere()', () => {
  it('should call handler (0)', () => {
    const mockHandler: (event: MouseEvent) => void = vitest.fn()
    renderHook(() => {
      useClickAnyWhere(mockHandler)
    })

    act(() => {
      fireEvent.doubleClick(window)
    })

    expect(mockHandler).toHaveBeenCalledTimes(0)
  })

  it('should call handler (1) with MouseEvent', () => {
    const mockHandler: (event: MouseEvent) => void = vitest.fn()

    renderHook(() => {
      useClickAnyWhere(mockHandler)
    })

    act(() => {
      fireEvent.click(window)
    })

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledWith(expect.any(MouseEvent))
  })

  it('should call handler (2)', () => {
    const mockHandler: (event: MouseEvent) => void = vitest.fn()
    renderHook(() => {
      useClickAnyWhere(mockHandler)
    })

    act(() => {
      fireEvent.click(window)
      fireEvent.click(window)
    })

    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})
