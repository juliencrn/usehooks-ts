import { act, cleanup, renderHook } from '@testing-library/react'

import { useScript } from './useScript'

describe('useScript', () => {
  it.each(['load', 'error'])(
    'removes an already cached script after %s',
    event => {
      const src = `https://example.com/cached-${event}.js`
      const first = renderHook(() => useScript(src))
      const script = document.querySelector(`script[src="${src}"]`)

      act(() => {
        script?.dispatchEvent(new Event(event))
      })
      first.unmount()
      expect(script?.isConnected).toBe(true)

      const second = renderHook(() => useScript(src, { removeOnUnmount: true }))
      expect(second.result.current).toBe(event === 'load' ? 'ready' : 'error')
      second.unmount()
      expect(document.querySelector(`script[src="${src}"]`)).toBeNull()

      const third = renderHook(() => useScript(src, { removeOnUnmount: true }))
      expect(third.result.current).toBe('loading')
      expect(document.querySelector(`script[src="${src}"]`)).not.toBeNull()
      third.unmount()
    },
  )

  it('should handle script loading error', () => {
    const src = 'https://example.com/myscript.js'

    const { result } = renderHook(() => useScript(src))

    expect(result.current).toBe('loading')

    act(() => {
      // Simulate script error
      document
        .querySelector(`script[src="${src}"]`)
        ?.dispatchEvent(new Event('error'))
    })

    expect(result.current).toBe('error')
  })

  it('should remove script on unmount', () => {
    const src = '/'

    // First load the script
    const { result } = renderHook(() =>
      useScript(src, { removeOnUnmount: true }),
    )

    expect(result.current).toBe('loading')

    // Make sure the document is loaded
    act(() => {
      document
        .querySelector(`script[src="${src}"]`)
        ?.dispatchEvent(new Event('load'))
    })

    expect(result.current).toBe('ready')

    // Remove the hook by unmounting and cleaning up the hook
    cleanup()

    // Check if the script is removed from the DOM
    expect(document.querySelector(`script[src="${src}"]`)).toBeNull()

    // Try loading the script again
    const { result: result2 } = renderHook(() =>
      useScript(src, { removeOnUnmount: true }),
    )

    expect(result2.current).toBe('loading')

    // Make sure the document is loaded
    act(() => {
      document
        .querySelector(`script[src="${src}"]`)
        ?.dispatchEvent(new Event('load'))
    })

    expect(result2.current).toBe('ready')
  })

  it('should have a `id` attribute when given', () => {
    const src = '/'
    const id = 'my-script'

    const { result } = renderHook(() => useScript(src, { id }))

    // Make sure the document is loaded
    act(() => {
      document
        .querySelector(`script[src="${src}"]`)
        ?.dispatchEvent(new Event('load'))
    })

    expect(result.current).toBe('ready')

    expect(document.querySelector(`script[id="${id}"]`)).not.toBeNull()
    expect(document.querySelector(`script[src="${src}"]`)?.id).toBe(id)
  })
})
