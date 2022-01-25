import { useEffect, useState } from 'react'

// See: https://usehooks-ts.com/react-hook/use-local-storage
import { useLocalStorage } from '../useLocalStorage'
// See: https://usehooks-ts.com/react-hook/use-media-query
import { useMediaQuery } from '../useMediaQuery'
// See: https://usehooks-ts.com/react-hook/use-media-query
import { useUpdateEffect } from '../useUpdateEffect'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

type TernaryDarkMode = 'system' | 'dark' | 'light'
interface UseTernaryDarkModeOutput {
  isDarkMode: boolean
  ternaryDarkMode: TernaryDarkMode
  dispatchTernaryDarkMode: (ternaryDarkMode?: TernaryDarkMode) => void
  toggleTernaryDarkMode: () => void
}

function useTernaryDarkMode(): UseTernaryDarkModeOutput {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
  const [ternaryDarkMode, setTernaryDarkMode] =
    useLocalStorage<TernaryDarkMode>('ternaryDarkMode', 'system')
  const [isDarkMode, setDarkMode] = useState<boolean>(isDarkOS)

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    if (ternaryDarkMode === 'system') {
      setDarkMode(isDarkOS)
    }
  }, [isDarkOS])

  useEffect(() => {
    switch (ternaryDarkMode) {
      case 'light':
        setDarkMode(false)
        break
      case 'system':
        setDarkMode(isDarkOS)
        break
      case 'dark':
        setDarkMode(true)
        break
    }
  }, [ternaryDarkMode, isDarkOS])

  function toggleTernaryDarkMode() {
    const toggleDict: Record<TernaryDarkMode, TernaryDarkMode> = {
      light: 'system',
      system: 'dark',
      dark: 'light',
    }
    setTernaryDarkMode((prevMode: TernaryDarkMode) => toggleDict[prevMode])
  }

  function dispatchTernaryDarkMode(newTernaryDarkMode?: TernaryDarkMode) {
    if (newTernaryDarkMode) {
      setTernaryDarkMode(newTernaryDarkMode)
    } else {
      toggleTernaryDarkMode()
    }
  }

  return {
    isDarkMode,
    ternaryDarkMode,
    dispatchTernaryDarkMode,
    toggleTernaryDarkMode,
  }
}

export default useTernaryDarkMode
