import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useLocalStorage } from '../useLocalStorage'
import { useMediaQuery } from '../useMediaQuery'
import { useUpdateEffect } from '../useUpdateEffect'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const LOCAL_STORAGE_KEY = 'usehooks-ts-ternary-dark-mode'

type TernaryDarkMode = 'system' | 'dark' | 'light'
interface UseTernaryDarkModeOutput {
  isDarkMode: boolean
  ternaryDarkMode: TernaryDarkMode
  setTernaryDarkMode: Dispatch<SetStateAction<TernaryDarkMode>>
  toggleTernaryDarkMode: () => void
}

/**
 * Custom hook for managing ternary (system, dark, light) dark mode with local storage support.
 * @param {string} [localStorageKey] - The key for storing dark mode preference in local storage.
 * @param {TernaryDarkMode} [defaultValue] - Default value if there's nothing set in local storage.
 * @returns {UseTernaryDarkModeOutput} An object containing the dark mode state and helper functions.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-ternary-dark-mode)
 * @example
 * const { isDarkMode, ternaryDarkMode, setTernaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode();
 * // Access and use the dark mode state and provided helper functions.
 */
export function useTernaryDarkMode(
  localStorageKey: string = LOCAL_STORAGE_KEY,
  defaultValue: TernaryDarkMode = 'system',
): UseTernaryDarkModeOutput {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
  const [ternaryDarkMode, setTernaryDarkMode] =
    useLocalStorage<TernaryDarkMode>(localStorageKey, defaultValue)
  
  const isDarkMode = ternaryDarkMode === 'dark' || (ternaryDarkMode === 'system' && isDarkOS)

  function toggleTernaryDarkMode() {
    const toggleDict: Record<TernaryDarkMode, TernaryDarkMode> = {
      light: 'system',
      system: 'dark',
      dark: 'light',
    }
    setTernaryDarkMode(prevMode => toggleDict[prevMode])
  }

  return {
    isDarkMode,
    ternaryDarkMode,
    setTernaryDarkMode,
    toggleTernaryDarkMode,
  }
}
