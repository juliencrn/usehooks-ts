/* usage:
 *   const { isPaletteDarkMode, ternaryModeCode, togglePaletteDarkMode } = usePaletteDarkMode();
 */

import { useEffect, useState } from 'react'

// See: https://usehooks-ts.com/react-hook/use-local-storage
import { useLocalStorage } from '../useLocalStorage'
// See: https://usehooks-ts.com/react-hook/use-media-query
import { useMediaQuery } from '../useMediaQuery'

import { useUpdateEffect } from '..'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

// TODO: use enum
type TernaryDarkMode = 'system' | 'dark' | 'light'
interface UseTernaryDarkModeOutput {
  isPaletteDarkMode: boolean
  ternaryModeCode: TernaryDarkMode // change icon
  toggleTernaryDarkMode: () => void
}

function useTernaryDarkMode(): UseTernaryDarkModeOutput {
  /* ======== HELPERS ======== */
  function useDarkModeOS(): boolean {
    return useMediaQuery(COLOR_SCHEME_QUERY)
    // Prevents SSR issues, old test failed const mQuery = useMediaQuery(COLOR_SCHEME_QUERY);
    // if (typeof window !== 'undefined') {
    //   if (window.hasOwnProperty('matchMedia')) {
    //     return window.matchMedia(COLOR_SCHEME_QUERY).matches
    //   }
    // }
    // return !!defaultValue
  }
  /* ======== REACT ======== */
  const [isDarkOS, setDarkOS] = useState<boolean>(useDarkModeOS())
  const [ternaryMode, setTernaryMode] = useLocalStorage<TernaryDarkMode>(
    'ternaryDarkMode',
    'system',
  )
  const [isDarkMode, setDarkMode] = useState<boolean>(true)

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    setDarkOS(isDarkOS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkOS])
  // useEffect(() => {
  //   const handler = () => setDarkOS(getPrefersDarkMode())
  //   const matchMedia = window.matchMedia(COLOR_SCHEME_QUERY)
  //   matchMedia.addEventListener('change', handler)
  //   return () => {
  //     matchMedia.removeEventListener('change', handler)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    // for setIsPaletteDarkMode
    if (ternaryMode === 'dark') {
      setDarkMode(true)
    } else if (ternaryMode === 'system') {
      setDarkMode(isDarkOS)
    } else if (ternaryMode === 'light') {
      setDarkMode(false)
    } else {
      console.error('ERR reading palette mode')
    }
  }, [ternaryMode, isDarkOS])

  return {
    isPaletteDarkMode: isDarkMode,
    ternaryModeCode: ternaryMode,
    toggleTernaryDarkMode: () => {
      setTernaryMode((currMode: TernaryDarkMode) =>
        currMode === 'dark'
          ? 'light'
          : currMode === 'light'
          ? 'system'
          : 'dark',
      )
    },
  }
}

export default useTernaryDarkMode
