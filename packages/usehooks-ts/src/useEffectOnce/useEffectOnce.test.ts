import { renderHook } from '@testing-library/react'

import { useEffectOnce } from './useEffectOnce'

describe('use effect once()', () => {
  it('should be triggered only once', () => {
    const effect = jest.fn()
    const { rerender } = renderHook(() => useEffectOnce(effect))

    expect(effect).toHaveBeenCalledTimes(1)

    rerender()

    expect(effect).toHaveBeenCalledTimes(1)
  })
})
