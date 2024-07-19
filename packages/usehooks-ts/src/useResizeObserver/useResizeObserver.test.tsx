/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ResizeObserver } from '@juggle/resize-observer'
import { renderHook } from '@testing-library/react'

import { useResizeObserver } from './useResizeObserver'

describe('useResizeObserver()', () => {
  beforeEach(() => {
    // Mock the ResizeObserver
    window.ResizeObserver = ResizeObserver
  })

  afterEach(() => {
    vitest.restoreAllMocks()
  })

  it('should return initial undefined sizes', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() =>
      useResizeObserver({
        ref,
      }),
    )

    expect(result.current.width).toBeUndefined()
    expect(result.current.height).toBeUndefined()
  })

  it.skip('should return the observed element sizes', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() =>
      useResizeObserver({
        ref,
      }),
    )

    // TODO: Mock the observed element's size

    expect(result.current.width).toBe(100)
    expect(result.current.height).toBe(100)
  })

  it.skip('should update size when element is resized', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() =>
      useResizeObserver({
        ref,
      }),
    )

    // TODO: Mock the observed element's size

    expect(result.current.width).toBe(300)
    expect(result.current.height).toBe(200)
  })

  it.skip('should use onResize callback to update the size', () => {
    const ref = { current: document.createElement('div') }
    const onResize = vitest.fn()
    renderHook(() =>
      useResizeObserver({
        ref,
        onResize,
      }),
    )

    // TODO: Mock the observed element's size

    expect(onResize).toHaveBeenCalledWith({ width: 200, height: 200 })
  })
})
