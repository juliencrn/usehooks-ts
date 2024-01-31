import { useLocalStorage } from '../useLocalStorage'
import { useMediaQuery } from '../useMediaQuery'
import { useUpdateEffect } from '../useUpdateEffect'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const LOCAL_STORAGE_KEY = 'usehooks-ts-dark-mode'

type DarkModeOptions = {
  defaultValue?: boolean
  localStorageKey?: string
}

interface DarkModeOutput {
  isDarkMode: boolean
  toggle: () => void
  enable: () => void
  disable: () => void
  set: (value: boolean) => void
}

/**
 * Custom hook that returns the current state of the dark mode.
 * @deprecated this useDarkMode's signature is deprecated, it now accepts an options object instead of multiple parameters.
 * @param  {boolean} defaultValue the initial value of the dark mode, default `false`.
 * @param  {string} [localStorageKey] the key to use in the local storage, default `'usehooks-ts-dark-mode'`.
 * @returns {DarkModeOutput} An object containing the dark mode's state and its controllers.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-dark-mode)
 * @example
 * const { isDarkMode, toggle, enable, disable, set } = useDarkMode(false, 'my-key');
 */
export function useDarkMode(
  defaultValue: boolean,
  localStorageKey?: string,
): DarkModeOutput

/**
 * Custom hook that returns the current state of the dark mode.
 * @param  {?DarkModeOptions} [options] - Options for the hook.
 * @param {?string} [options.localStorageKey] - The key for storing dark mode preference in local storage (default is `'usehooks-ts-ternary-dark-mode'`).
 * @param {?boolean} [options.defaultValue] - Default value if there's nothing set in local storage (default is `false`).
 * @returns {DarkModeOutput} An object containing the dark mode's state and its controllers.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-dark-mode)
 * @example
 * const { isDarkMode, toggle, enable, disable, set } = useDarkMode({
 *   defaultValue: false,
 *   localStorageKey: 'my-key',
 * });
 */
export function useDarkMode(options?: DarkModeOptions): DarkModeOutput

/**
 * Custom hook that returns the current state of the dark mode.
 * @param  {?boolean | ?DarkModeOptions} [options] the initial value of the dark mode, default `false`.
 * @param  {?string} [localStorageKeyProps] the key to use in the local storage, default `'usehooks-ts-dark-mode'`.
 * @returns {DarkModeOutput} An object containing the dark mode's state and its controllers.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-dark-mode)
 * @example
 * const { isDarkMode, toggle, enable, disable, set } = useDarkMode({ defaultValue: true });
 */
export function useDarkMode(
  options?: boolean | DarkModeOptions,
  localStorageKeyProps: string = LOCAL_STORAGE_KEY,
): DarkModeOutput {
  // TODO: Refactor this code after the deprecated signature has been removed.
  const defaultValue =
    typeof options === 'boolean' ? options : options?.defaultValue ?? false
  const localStorageKey =
    typeof options === 'boolean'
      ? localStorageKeyProps ?? LOCAL_STORAGE_KEY
      : options?.localStorageKey ?? LOCAL_STORAGE_KEY

  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    localStorageKey,
    defaultValue ?? isDarkOS ?? false,
  )

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    setDarkMode(isDarkOS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkOS])

  return {
    isDarkMode,
    toggle: () => {
      setDarkMode(prev => !prev)
    },
    enable: () => {
      setDarkMode(true)
    },
    disable: () => {
      setDarkMode(false)
    },
    set: value => {
      setDarkMode(value)
    },
  }
}
