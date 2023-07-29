import { act, renderHook } from '@testing-library/react-hooks/dom'

import { useCloseAlert } from './useCloseAlert'

describe('use close alert()', () => {
  test('should use close alert be ok', () => {
    renderHook(() => useCloseAlert())

    expect(typeof window.onbeforeunload).toBe('function')
  })

  test('should use close alert allow closing window', () => {
    const { result } = renderHook(() => useCloseAlert())

    act(() => {
      result.current(true)
    })

    // if onbeforeunload wasn't attached the above test would fail
    expect(
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      window.onbeforeunload && window.onbeforeunload({} as any),
    ).toBeUndefined()
  })

  test('should use close alert warn before closing window', () => {
    const { result } = renderHook(() => useCloseAlert())

    act(() => {
      result.current(false)
    })

    // if onbeforeunload wasn't attached the above test would fail
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    expect(window.onbeforeunload && window.onbeforeunload({} as any)).toBe(
      'Changes you made may not be saved.',
    )
  })
})
