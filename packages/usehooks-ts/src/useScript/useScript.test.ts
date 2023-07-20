import { act, cleanup, renderHook } from '@testing-library/react-hooks'

import { useScript } from './useScript'

describe('useScript', () => {
  test('should handle script loading error', () => {
    const src = 'https://example.com/myscript.js'

    const { result } = renderHook(() => useScript(src))

    expect(result.current).toBe('loading')

    // Simulate script error
    document
      .querySelector(`script[src="${src}"]`)
      ?.dispatchEvent(new Event('error'))

    expect(result.current).toBe('error')
  })

  test('should remove script on unmount', () => {
    const src = '/'

    // First load the script
    const { result } = renderHook(() =>
      useScript(src, { removeOnUnmount: true }),
    )

    expect(result.current).toBe('loading')

    // Make sure the document is loaded
    document
      .querySelector(`script[src="${src}"]`)
      ?.dispatchEvent(new Event('load'))

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
    document
      .querySelector(`script[src="${src}"]`)
      ?.dispatchEvent(new Event('load'))

    expect(result2.current).toBe('ready')
  })
})
