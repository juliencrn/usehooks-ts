import { renderHook } from '@testing-library/react-hooks/dom'

import { useLayoutLatestRef } from './useLayoutLatestRef'

describe('useLayoutLatestRef()', () => {
  test('should provide initial value on first render', () => {
    const { result } = renderHook(({ state }) => useLayoutLatestRef(state), {
      initialProps: { state: 0 },
    })

    expect(result.current.current).toBe(0)
  })

  test('should provide latest value on rerender', () => {
    const { result, rerender } = renderHook(
      ({ state }) => useLayoutLatestRef(state),
      { initialProps: { state: 0 } },
    )

    expect(result.current.current).toBe(0)

    rerender({ state: 1 })
    expect(result.current.current).toBe(1)

    rerender({ state: 10 })
    expect(result.current.current).toBe(10)

    rerender({ state: 100 })
    expect(result.current.current).toBe(100)
  })

  test('should provide stable ref across rerenders', () => {
    const { result, rerender } = renderHook(
      ({ state }) => useLayoutLatestRef(state),
      { initialProps: { state: 0 } },
    )

    const ref = result.current
    rerender({ state: 1 })
    expect(result.current).toBe(ref)
  })
})
