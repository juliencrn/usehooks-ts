import { useState } from 'react'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

/**
 * Custom hook for tracking the state of a media query.
 * @param {string} query - The media query to track.
 * @param {?boolean} [defaultValue] - The default value to return if the hook is being run on the server (default is `false`).
 * @returns {boolean} The current state of the media query (true if the query matches, false otherwise).
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-media-query)
 * @see [MDN Match Media](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
 * @example
 * const isSmallScreen = useMediaQuery('(max-width: 600px)');
 * // Use `isSmallScreen` to conditionally apply styles or logic based on the screen size.
 */
export function useMediaQuery(
  query: string,
  defaultValue: boolean = false,
): boolean {
  const [matches, setMatches] = useState<boolean>(defaultValue)

  const getMatches = (query: string): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return defaultValue
  }

  /** Handles the change event of the media query. */
  function handleChange() {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)

    // Triggered at the first client-side load and if query changes
    handleChange()

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange)
    } else {
      matchMedia.addEventListener('change', handleChange)
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange)
      } else {
        matchMedia.removeEventListener('change', handleChange)
      }
    }
  }, [query])

  return matches
}
