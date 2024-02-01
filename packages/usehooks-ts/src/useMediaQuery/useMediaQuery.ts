import { useState } from 'react'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

type UseMediaQueryOptions<InitializeWithValue extends boolean | undefined> = {
  defaultValue?: boolean
  initializeWithValue: InitializeWithValue
}

const IS_SERVER = typeof window === 'undefined'

/**
 * Custom hook for tracking the state of a media query.
 * @deprecated - this useMediaQuery's signature is deprecated, it now accepts an query parameter and an options object.
 * @param {string} query - The media query to track.
 * @param {?boolean} [defaultValue] - The default value to return if the hook is being run on the server (default is `false`).
 * @returns {boolean} The current state of the media query (true if the query matches, false otherwise).
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-media-query)
 * @see [MDN Match Media](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
 * @example
 * const isSmallScreen = useMediaQuery('(max-width: 600px)');
 * // Use `isSmallScreen` to conditionally apply styles or logic based on the screen size.
 */
export function useMediaQuery(query: string, defaultValue: boolean): boolean // defaultValue should be false by default
// SSR version of useMediaQuery.
export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions<false>,
): boolean | undefined
// CSR version of useMediaQuery.
export function useMediaQuery(
  query: string,
  options?: Partial<UseMediaQueryOptions<true>>,
): boolean
/**
 * Custom hook for tracking the state of a media query.
 * @param {string} query - The media query to track.
 * @param {boolean | ?UseMediaQueryOptions} [options] - The default value to return if the hook is being run on the server (default is `false`).
 * @param {?boolean} [options.defaultValue] - The default value to return if the hook is being run on the server (default is `false`).
 * @param {?boolean} [options.initializeWithValue] - If `true` (default), the hook will initialize reading the media query. In SSR, you should set it to `false`, returning `undefined`  or `options.defaultValue` initially.
 * @returns {boolean | undefined} The current state of the media query (true if the query matches, false otherwise).
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-media-query)
 * @see [MDN Match Media](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
 * @example
 * const isSmallScreen = useMediaQuery('(max-width: 600px)');
 * // Use `isSmallScreen` to conditionally apply styles or logic based on the screen size.
 */
export function useMediaQuery(
  query: string,
  options?: boolean | Partial<UseMediaQueryOptions<boolean>>,
): boolean | undefined {
  // TODO: Refactor this code after the deprecated signature has been removed.
  const defaultValue =
    typeof options === 'boolean' ? options : options?.defaultValue ?? false
  let initializeWithValue =
    typeof options === 'boolean'
      ? undefined
      : options?.initializeWithValue ?? undefined

  if (IS_SERVER) {
    initializeWithValue = false
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

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
