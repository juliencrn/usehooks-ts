/* usage:
 *   const { isDarkMode, ternaryDarkMode, toggleTernaryDarkMode } = usePaletteDarkMode();
 */

import { useEffect, useState } from 'react'

// See: https://usehooks-ts.com/react-hook/use-local-storage
import { useLocalStorage } from '../useLocalStorage'
// See: https://usehooks-ts.com/react-hook/use-media-query
import { useMediaQuery } from '../useMediaQuery'

import { useUpdateEffect } from '..'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

enum TernaryDarkMode {
  System = 'system',
  Dark = 'dark',
  Light = 'light',
}
interface UseTernaryDarkModeOutput {
  isDarkMode: boolean
  ternaryDarkMode: TernaryDarkMode
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
  const [ternaryDarkMode, setTernaryDarkMode] =
    useLocalStorage<TernaryDarkMode>('ternaryDarkMode', TernaryDarkMode.System)
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
    if (ternaryDarkMode === 'dark') {
      setDarkMode(true)
    } else if (ternaryDarkMode === 'system') {
      setDarkMode(isDarkOS)
    } else if (ternaryDarkMode === 'light') {
      setDarkMode(false)
    } else {
      console.error('ERR reading palette mode')
    }
  }, [ternaryDarkMode, isDarkOS])

  return {
    isDarkMode,
    ternaryDarkMode,
    toggleTernaryDarkMode: () => {
      setTernaryDarkMode((currMode: TernaryDarkMode) =>
        currMode === TernaryDarkMode.Dark
          ? TernaryDarkMode.Light
          : currMode === TernaryDarkMode.Light
          ? TernaryDarkMode.System
          : TernaryDarkMode.Dark,
      )
    },
  }
}

export default useTernaryDarkMode
