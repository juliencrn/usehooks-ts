import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useScreen } from './useScreen'

describe('useScreen', () => {
  it('returns a Screen EventTarget and rerenders when the window resizes', () => {
    const onChange = vi.fn()
    const onRender = vi.fn()
    // jsdom's Screen does not implement EventTarget.
    const nativeScreen = Object.assign(new EventTarget(), window.screen)
    vi.stubGlobal('screen', nativeScreen)
    try {
      const { result } = renderHook(() => {
        onRender()
        return useScreen()
      })
      const screen = result.current
      expect(screen).toBe(window.screen)
      if (!(screen instanceof EventTarget)) {
        throw new Error(
          'Expected useScreen to preserve the native event target',
        )
      }
      screen.addEventListener('change', onChange)
      const previousRenders = onRender.mock.calls.length
      act(() => {
        window.dispatchEvent(new Event('resize'))
      })
      expect(onRender.mock.calls.length).toBeGreaterThan(previousRenders)
      expect(result.current).toBe(screen)
      nativeScreen.dispatchEvent(new Event('change'))
      expect(onChange).toHaveBeenCalledTimes(1)
    } finally {
      vi.unstubAllGlobals()
    }
  })
})
