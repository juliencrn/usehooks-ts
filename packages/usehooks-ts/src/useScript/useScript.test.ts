import { act, cleanup, renderHook } from '@testing-library/react'

import { useScript } from './useScript'

describe('useScript', () => {
  it('should reset the status when the source changes', () => {
    const { result, rerender } = renderHook(
      ({ src }: { src: string | null }) =>
        useScript(src, { removeOnUnmount: true }),
      { initialProps: { src: '/first-script.js' as string | null } },
    )

    act(() => {
      document
        .querySelector('script[src="/first-script.js"]')
        ?.dispatchEvent(new Event('load'))
    })
    expect(result.current).toBe('ready')

    rerender({ src: '/second-script.js' })
    expect(result.current).toBe('loading')

    act(() => {
      document
        .querySelector('script[src="/second-script.js"]')
        ?.dispatchEvent(new Event('error'))
    })
    expect(result.current).toBe('error')

    rerender({ src: null })
    expect(result.current).toBe('idle')

    rerender({ src: '/third-script.js' })
    expect(result.current).toBe('loading')
  })

  it('should update the status when loading is enabled or prevented', () => {
    const src = '/deferred-script.js'
    const { result, rerender } = renderHook(
      ({ shouldPreventLoad }) =>
        useScript(src, { shouldPreventLoad, removeOnUnmount: true }),
      { initialProps: { shouldPreventLoad: true } },
    )

    expect(result.current).toBe('idle')
    expect(document.querySelector(`script[src="${src}"]`)).toBeNull()

    rerender({ shouldPreventLoad: false })
    expect(result.current).toBe('loading')

    act(() => {
      document
        .querySelector(`script[src="${src}"]`)
        ?.dispatchEvent(new Event('load'))
    })
    expect(result.current).toBe('ready')

    rerender({ shouldPreventLoad: true })
    expect(result.current).toBe('idle')
  })

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
