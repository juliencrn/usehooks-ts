import type { Dispatch, SetStateAction } from 'react'

import { useLocalStorage } from '../useLocalStorage'
import { useMediaQuery } from '../useMediaQuery'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const LOCAL_STORAGE_KEY = 'usehooks-ts-ternary-dark-mode'

export type TernaryDarkMode = 'system' | 'dark' | 'light'

type TernaryDarkModeOptions = {
  defaultValue?: TernaryDarkMode
  localStorageKey?: string
  initializeWithValue?: boolean
}

type TernaryDarkModeResult = {
  isDarkMode: boolean
  ternaryDarkMode: TernaryDarkMode
  setTernaryDarkMode: Dispatch<SetStateAction<TernaryDarkMode>>
  toggleTernaryDarkMode: () => void
}

export function useTernaryDarkMode(
  options?: TernaryDarkModeOptions,
): TernaryDarkModeResult
/**
 * Custom hook for managing ternary (system, dark, light) dark mode with local storage support.
 * @deprecated this useTernaryDarkMode's signature is deprecated, it now accepts an options object instead of multiple parameters.
 * @param {string} localStorageKey - The key for storing dark mode preference in local storage (default is `'usehooks-ts-ternary-dark-mode'`).
 * @returns {TernaryDarkModeResult} An object containing the dark mode state and helper functions.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-ternary-dark-mode)
 * @example
 * const { isDarkMode, ternaryDarkMode, setTernaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode('my-key');
 * // Access and use the dark mode state and provided helper functions.
 */
export function useTernaryDarkMode(
  localStorageKey: string,
): TernaryDarkModeResult
/**
 * Custom hook for managing ternary (system, dark, light) dark mode with local storage support.
 * @param {?TernaryDarkModeOptions | string} [options] - Options or the local storage key for the hook.
 * @param {?string} [options.localStorageKey] - The key for storing dark mode preference in local storage (default is `'usehooks-ts-ternary-dark-mode'`).
 * @param {?TernaryDarkMode} [options.defaultValue] - The default value for the dark mode (default is `'system'`).
 * @param {?boolean} [options.initializeWithValue] - If `true` (default), the hook will initialize reading `localStorage`. In SSR, you should set it to `false`, returning default values initially.
 * @returns {TernaryDarkModeResult} An object containing the dark mode state and helper functions.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-ternary-dark-mode)
 * @example
 * const { isDarkMode, ternaryDarkMode, setTernaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode({ defaultValue: 'dark' });
 * // Access and use the dark mode state and provided helper functions.
 */
export function useTernaryDarkMode(
  options?: string | TernaryDarkModeOptions,
): TernaryDarkModeResult {
  // TODO: Refactor this code after the deprecated signature has been removed.
  const defaultValue =
    typeof options === 'string' ? 'system' : options?.defaultValue ?? 'system'
  const localStorageKey =
    typeof options === 'string'
      ? options
      : options?.localStorageKey ?? LOCAL_STORAGE_KEY
  const initializeWithValue =
    typeof options === 'string'
      ? undefined
      : options?.initializeWithValue ?? undefined

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
