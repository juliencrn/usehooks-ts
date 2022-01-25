import { useEffect, useState } from 'react'

// See: https://usehooks-ts.com/react-hook/use-local-storage
import { useLocalStorage } from '../useLocalStorage'
// See: https://usehooks-ts.com/react-hook/use-media-query
import { useMediaQuery } from '../useMediaQuery'
// See: https://usehooks-ts.com/react-hook/use-media-query
import { useUpdateEffect } from '../useUpdateEffect'

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
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
  const [ternaryDarkMode, setTernaryDarkMode] =
    useLocalStorage<TernaryDarkMode>('ternaryDarkMode', TernaryDarkMode.System)
  const [isDarkMode, setDarkMode] = useState<boolean>(isDarkOS)

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    if (ternaryDarkMode === TernaryDarkMode.System) {
      setDarkMode(isDarkOS)
    }
  }, [isDarkOS])

  useEffect(() => {
    switch (ternaryDarkMode) {
      case TernaryDarkMode.Light:
        setDarkMode(false)
        break
      case TernaryDarkMode.System:
        setDarkMode(isDarkOS)
        break
      case TernaryDarkMode.Dark:
        setDarkMode(true)
        break
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
