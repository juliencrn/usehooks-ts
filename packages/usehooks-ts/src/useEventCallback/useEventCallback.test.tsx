import { fireEvent, render, renderHook, screen } from '@testing-library/react'

import { useEventCallback } from './useEventCallback'

describe('useEventCallback()', () => {
  it('should not call the callback during render', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useEventCallback(fn))

    render(<button onClick={result.current}>Click me</button>)

    expect(fn).not.toHaveBeenCalled()
  })

  it('should call the callback when the event is triggered', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useEventCallback(fn))

    render(<button onClick={result.current}>Click me</button>)

    fireEvent.click(screen.getByText('Click me'))

    expect(fn).toHaveBeenCalled()
  })
})
