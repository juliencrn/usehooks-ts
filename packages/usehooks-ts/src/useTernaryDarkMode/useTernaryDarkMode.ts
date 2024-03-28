import type { Dispatch, SetStateAction } from 'react'

import { useLocalStorage } from '../useLocalStorage'
import { useMediaQuery } from '../useMediaQuery'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const LOCAL_STORAGE_KEY = 'usehooks-ts-ternary-dark-mode'

/** Ternary dark mode options. */
export type TernaryDarkMode = 'system' | 'dark' | 'light'

/** Options for the `useTernaryDarkMode` hook. */
export type TernaryDarkModeOptions = {
  /**
   * The default value for the dark mode.
   * @default 'system'
   */
  defaultValue?: TernaryDarkMode
  /**
   * The key for storing dark mode preference in local storage.
   * @default 'usehooks-ts-ternary-dark-mode'
   */
  localStorageKey?: string
  /**
   * If `true` (default), the hook will initialize reading `localStorage`. In SSR, you should set it to `false`, returning default values initially.
   * @default true
   */
  initializeWithValue?: boolean
}

/** Represents the return type of the `useTernaryDarkMode` hook. */
export type TernaryDarkModeReturn = {
  /** The current state of the dark mode. */
  isDarkMode: boolean
  /** The current state of the dark mode. */
  ternaryDarkMode: TernaryDarkMode
  /** A function to set the dark mode state. */
  setTernaryDarkMode: Dispatch<SetStateAction<TernaryDarkMode>>
  /** A function to toggle the dark mode state. */
  toggleTernaryDarkMode: () => void
}

/**
 * Custom hook that manages ternary (system, dark, light) dark mode with local storage support.
 * @param {?TernaryDarkModeOptions | string} [options] - Options or the local storage key for the hook.
 * @returns {TernaryDarkModeReturn} An object containing the dark mode state and helper functions.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-ternary-dark-mode)
 * @example
 * ```tsx
 * const { isDarkMode, ternaryDarkMode, setTernaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode({ defaultValue: 'dark' });
 * // Access and use the dark mode state and provided helper functions.
 * ```
 */
export function useTernaryDarkMode({
  defaultValue = 'system',
  localStorageKey = LOCAL_STORAGE_KEY,
  initializeWithValue = true,
}: TernaryDarkModeOptions = {}): TernaryDarkModeReturn {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY, { initializeWithValue })
  const [mode, setMode] = useLocalStorage(localStorageKey, defaultValue, {
    initializeWithValue,
  })

  const isDarkMode = mode === 'dark' || (mode === 'system' && isDarkOS)

  const toggleTernaryDarkMode = () => {
    const modes: TernaryDarkMode[] = ['light', 'system', 'dark']
    setMode((prevMode): TernaryDarkMode => {
      const nextIndex = (modes.indexOf(prevMode) + 1) % modes.length
      return modes[nextIndex]
    })
  }

  return {
    isDarkMode,
    ternaryDarkMode: mode,
    setTernaryDarkMode: setMode,
    toggleTernaryDarkMode,
  }
}
