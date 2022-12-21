import { renderHook } from '@testing-library/react-hooks/dom'

import useLayoutEffectOnce from './useLayoutEffectOnce'

describe('use effect once()', () => {
  test('should be triggered only once', () => {
    const effect = jest.fn()
    const { rerender } = renderHook(() => useLayoutEffectOnce(effect))

    expect(effect).toHaveBeenCalledTimes(1)

    rerender()

    expect(effect).toHaveBeenCalledTimes(1)
  })
})
