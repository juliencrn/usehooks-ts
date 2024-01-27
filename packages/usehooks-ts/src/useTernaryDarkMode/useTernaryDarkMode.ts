import { Dispatch, SetStateAction } from 'react'

import { useLocalStorage } from '../useLocalStorage'
import { useMediaQuery } from '../useMediaQuery'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const LOCAL_STORAGE_KEY = 'usehooks-ts-ternary-dark-mode'

type TernaryDarkMode = 'system' | 'dark' | 'light'

type TernaryDarkModeOptions = {
  defaultValue?: TernaryDarkMode
  localStorageKey?: string
}

interface TernaryDarkModeOutput {
  isDarkMode: boolean
  ternaryDarkMode: TernaryDarkMode
  setTernaryDarkMode: Dispatch<SetStateAction<TernaryDarkMode>>
  toggleTernaryDarkMode: () => void
}

/**
 * Custom hook for managing ternary (system, dark, light) dark mode with local storage support.
 * @deprecated this useTernaryDarkMode's signature is deprecated, it now accepts an options object instead of multiple parameters.
 * @param {string} localStorageKey - The key for storing dark mode preference in local storage (default is `'usehooks-ts-ternary-dark-mode'`).
 * @returns {TernaryDarkModeOutput} An object containing the dark mode state and helper functions.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-ternary-dark-mode)
 * @example
 * const { isDarkMode, ternaryDarkMode, setTernaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode('my-key');
 * // Access and use the dark mode state and provided helper functions.
 */
export function useTernaryDarkMode(
  localStorageKey: string,
): TernaryDarkModeOutput

/**
 * Custom hook for managing ternary (system, dark, light) dark mode with local storage support.
 * @param {?TernaryDarkModeOptions} [options] - Options for the hook.
 * @param {?string} [options.localStorageKey] - The key for storing dark mode preference in local storage (default is `'usehooks-ts-ternary-dark-mode'`).
 * @param {?TernaryDarkMode} [options.defaultValue] - Default value if there's nothing set in local storage (default is `'system'`).
 * @returns {TernaryDarkModeOutput} An object containing the dark mode state and helper functions.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-ternary-dark-mode)
 * @example
 * const { isDarkMode, ternaryDarkMode, setTernaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode({ defaultValue: 'dark', localStorageKey: 'my-key' });
 * // Access and use the dark mode state and provided helper functions.
 */
export function useTernaryDarkMode(
  options?: TernaryDarkModeOptions,
): TernaryDarkModeOutput

/**
 * Custom hook for managing ternary (system, dark, light) dark mode with local storage support.
 * @param {TernaryDarkModeOptions | string} [options] - Options or the local storage key for the hook.
 * @returns {TernaryDarkModeOutput} An object containing the dark mode state and helper functions.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-ternary-dark-mode)
 * @example
 * const { isDarkMode, ternaryDarkMode, setTernaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode({ defaultValue: 'dark' });
 * // Access and use the dark mode state and provided helper functions.
 */
export function useTernaryDarkMode(
  options?: string | TernaryDarkModeOptions,
): TernaryDarkModeOutput {
  // TODO: Refactor this code after the deprecated signature has been removed.
  const defaultValue =
    typeof options === 'string' ? 'system' : options?.defaultValue ?? 'system'
  const localStorageKey =
    typeof options === 'string'
      ? options
      : options?.localStorageKey ?? LOCAL_STORAGE_KEY

  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
  const [mode, setMode] = useLocalStorage(localStorageKey, defaultValue)

  const isDarkMode = mode === 'dark' || (mode === 'system' && isDarkOS)

  const toggleTernaryDarkMode = () => {
    const modes: TernaryDarkMode[] = ['light', 'system', 'dark']
    setMode(prevMode => {
      return modes[(modes.indexOf(prevMode) + 1) % modes.length]
    })
  }

  return {
    isDarkMode,
    ternaryDarkMode: mode,
    setTernaryDarkMode: setMode,
    toggleTernaryDarkMode,
  }
}
