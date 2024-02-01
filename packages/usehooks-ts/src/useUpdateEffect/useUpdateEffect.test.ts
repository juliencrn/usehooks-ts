import { renderHook } from '@testing-library/react'

import { useUpdateEffect } from './useUpdateEffect'

describe('use update effect()', () => {
  it('the callback function should have been called on update', () => {
    const effect = vitest.fn()
    const { rerender } = renderHook(() => {
      useUpdateEffect(effect)
    })

    expect(effect).not.toHaveBeenCalled()

    rerender()

    expect(effect).toHaveBeenCalledTimes(1)
  })
})
