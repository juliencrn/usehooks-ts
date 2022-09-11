import { renderHook } from '@testing-library/react-hooks/dom'

import useUpdateEffect from './useUpdateEffect'

describe('use update effect()', () => {
  test('the callback function should have been called on update', () => {
    const effect = jest.fn()
    const { rerender } = renderHook(() => useUpdateEffect(effect))

    expect(effect).not.toHaveBeenCalled()

    rerender()

    expect(effect).toHaveBeenCalledTimes(1)
  })
})
