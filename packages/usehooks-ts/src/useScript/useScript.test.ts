import { act, cleanup, renderHook } from '@testing-library/react'

import { useScript } from './useScript'

describe('useScript', () => {
  it('should handle script loading error', () => {
    const src = 'https://example.com/test-error.js'

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
    const src = 'https://example.com/test-remove-on-unmount.js'

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
    const src = 'https://example.com/test-id.js'
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

  it('should have a `crossOrigin` attribute when given', () => {
    const src = 'https://example.com/test-crossorigin.js'
    const crossOrigin = 'use-credentials'

    const { result } = renderHook(() => useScript(src, { crossOrigin }))

    act(() => {
      document
        .querySelector(`script[src="${src}"]`)
        ?.dispatchEvent(new Event('load'))
    })

    expect(result.current).toBe('ready')

    const script = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    )
    expect(script).not.toBeNull()
    expect(script?.crossOrigin).toBe(crossOrigin)
  })

  it.each([
    {
      scenario:
        "defaults crossOrigin to 'anonymous' when integrity is set and crossOrigin is not supplied",
      integrity: 'integrity-hash-1',
      crossOrigin: undefined,
      expectedCrossOrigin: 'anonymous',
    },
    {
      scenario:
        "uses supplied crossOrigin 'anonymous' when both integrity and crossOrigin are set",
      integrity: 'integrity-hash-2',
      crossOrigin: 'anonymous',
      expectedCrossOrigin: 'anonymous',
    },
    {
      scenario:
        "uses supplied crossOrigin 'use-credentials' when both integrity and crossOrigin are set",
      integrity: 'integrity-hash-3',
      crossOrigin: 'use-credentials',
      expectedCrossOrigin: 'use-credentials',
    },
  ])('$scenario', ({ integrity, crossOrigin, expectedCrossOrigin }) => {
    const src = `https://example.com/file-${integrity}.js`

    const { result } = renderHook(() =>
      useScript(src, { integrity, crossOrigin }),
    )

    act(() => {
      document
        .querySelector(`script[src="${src}"]`)
        ?.dispatchEvent(new Event('load'))
    })

    expect(result.current).toBe('ready')

    const script = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    )
    expect(script).not.toBeNull()
    expect(script?.integrity).toBe(integrity)
    expect(script?.crossOrigin).toBe(expectedCrossOrigin)
  })
})
