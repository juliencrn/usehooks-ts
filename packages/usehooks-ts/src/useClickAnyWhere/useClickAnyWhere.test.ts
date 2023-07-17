import { fireEvent } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'

import { useClickAnyWhere } from './useClickAnyWhere'

describe('useClickAnyWhere()', () => {
  test('should call handler (0)', () => {
    const mockHandler: (event: MouseEvent) => void = jest.fn()
    renderHook(() => useClickAnyWhere(mockHandler))

    act(() => {
      fireEvent.doubleClick(window)
    })

    expect(mockHandler).toHaveBeenCalledTimes(0)
  })

  test('should call handler (1) with MouseEvent', () => {
    const mockHandler: (event: MouseEvent) => void = jest.fn()

    renderHook(() => useClickAnyWhere(mockHandler))

    act(() => {
      fireEvent.click(window)
    })

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledWith(expect.any(MouseEvent))
  })

  test('should call handler (2)', () => {
    const mockHandler: (event: MouseEvent) => void = jest.fn()
    renderHook(() => useClickAnyWhere(mockHandler))

    act(() => {
      fireEvent.click(window)
      fireEvent.click(window)
    })

    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})
