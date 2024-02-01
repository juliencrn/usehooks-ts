import { Dispatch, SetStateAction } from 'react'

import { useLocalStorage } from '../useLocalStorage'
import { useMediaQuery } from '../useMediaQuery'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const LOCAL_STORAGE_KEY = 'usehooks-ts-ternary-dark-mode'

export type TernaryDarkMode = 'system' | 'dark' | 'light'

type TernaryDarkModeOptions<InitializeWithValue extends boolean | undefined> = {
  defaultValue?: TernaryDarkMode
  localStorageKey?: string
  initializeWithValue: InitializeWithValue
}

type ReturnedMethods = {
  setTernaryDarkMode: Dispatch<SetStateAction<TernaryDarkMode>>
  toggleTernaryDarkMode: () => void
}

type ReturnedValues = {
  isDarkMode: boolean
  ternaryDarkMode: TernaryDarkMode
}

/**
 * Custom hook for managing ternary (system, dark, light) dark mode with local storage support.
 * @deprecated this useTernaryDarkMode's signature is deprecated, it now accepts an options object instead of multiple parameters.
 * @param {string} localStorageKey - The key for storing dark mode preference in local storage (default is `'usehooks-ts-ternary-dark-mode'`).
 * @returns {ReturnedMethods & ReturnedValues} An object containing the dark mode state and helper functions.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-ternary-dark-mode)
 * @example
 * const { isDarkMode, ternaryDarkMode, setTernaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode('my-key');
 * // Access and use the dark mode state and provided helper functions.
 */
export function useTernaryDarkMode(
  localStorageKey: string,
): ReturnedMethods & ReturnedValues

// SSR version of useTernaryDarkMode.
export function useTernaryDarkMode(
  options: TernaryDarkModeOptions<false>,
): ReturnedMethods & Partial<ReturnedValues>

// CSR version of useTernaryDarkMode.
export function useTernaryDarkMode(
  options?: Partial<TernaryDarkModeOptions<true>>,
): ReturnedMethods & ReturnedValues

/**
 * Custom hook for managing ternary (system, dark, light) dark mode with local storage support.
 * @param {?TernaryDarkModeOptions | string} [options] - Options or the local storage key for the hook.
 * @param {?string} [options.localStorageKey] - The key for storing dark mode preference in local storage (default is `'usehooks-ts-ternary-dark-mode'`).
 * @param {?TernaryDarkMode} [options.defaultValue] - The default value for the dark mode (default is `'system'`).
 * @param {?boolean} [options.initializeWithValue] - If `true` (default), the hook will initialize reading `localStorage`. In SSR, you should set it to `false`, returning `undefined` initially.
 * @returns {ReturnedMethods & Partial<ReturnedValues>} An object containing the dark mode state and helper functions.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-ternary-dark-mode)
 * @example
 * const { isDarkMode, ternaryDarkMode, setTernaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode({ defaultValue: 'dark' });
 * // Access and use the dark mode state and provided helper functions.
 */
export function useTernaryDarkMode(
  options?: string | Partial<TernaryDarkModeOptions<boolean>>,
): ReturnedMethods & Partial<ReturnedValues> {
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

  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
  const [mode, setMode] = useLocalStorage(localStorageKey, defaultValue, {
    initializeWithValue,
  })

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
