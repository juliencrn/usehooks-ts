import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import type { Mock } from 'vitest'

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

  it('should be typed accordingly', () => {
    const fn1: Mock<[React.MouseEvent<HTMLButtonElement>], void> = vi.fn()
    const fn1Result = renderHook(() => useEventCallback(fn1))

    expectTypeOf(fn1Result.result.current).toEqualTypeOf<
      (event: React.MouseEvent<HTMLButtonElement>) => void
    >()

    const fn2 = undefined as
      | Mock<[React.MouseEvent<HTMLButtonElement>], void>
      | undefined
    const fn2Result = renderHook(() => useEventCallback(fn2))

    expectTypeOf(fn2Result.result.current).toEqualTypeOf<
      ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined
    >()
  })

  it('should allow to pass optional callback without errors', () => {
    const optionalFn = undefined as
      | ((event: React.MouseEvent<HTMLButtonElement>) => void)
      | undefined

    const { result } = renderHook(() => useEventCallback(optionalFn))

    render(<button onClick={result.current}>Click me</button>)

    fireEvent.click(screen.getByText('Click me'))
  })
})
