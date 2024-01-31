import { useLocalStorage } from '../useLocalStorage'
import { useMediaQuery } from '../useMediaQuery'
import { useUpdateEffect } from '../useUpdateEffect'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const LOCAL_STORAGE_KEY = 'usehooks-ts-dark-mode'

type DarkModeOptions<InitializeWithValue extends boolean | undefined> = {
  defaultValue?: boolean
  localStorageKey?: string
  initializeWithValue: InitializeWithValue
}

interface DarkModeOutput<T extends boolean | undefined> {
  isDarkMode: T
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
): DarkModeOutput<boolean>

// SSR version of useDarkMode.
export function useDarkMode(
  options: DarkModeOptions<false>,
): DarkModeOutput<boolean | undefined>

// CSR version of useDarkMode.
export function useDarkMode(
  options?: Partial<DarkModeOptions<true>>,
): DarkModeOutput<boolean>

/**
 * Custom hook that returns the current state of the dark mode.
 * @param  {?boolean | ?DarkModeOptions} [options] - the initial value of the dark mode, default `false`.
 * @param  {?boolean} [options.defaultValue] - the initial value of the dark mode, default `false`.
 * @param  {?string} [options.localStorageKey] - the key to use in the local storage, default `'usehooks-ts-dark-mode'`.
 * @param  {?boolean} [options.initializeWithValue] - if `true` (default), the hook will initialize reading `localStorage`. In SSR, you should set it to `false`, returning `undefined` or the `defaultValue` initially.
 * @param  {?string} [localStorageKeyProps] the key to use in the local storage, default `'usehooks-ts-dark-mode'`.
 * @returns {DarkModeOutput} An object containing the dark mode's state and its controllers.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-dark-mode)
 * @example
 * const { isDarkMode, toggle, enable, disable, set } = useDarkMode({ defaultValue: true });
 */
export function useDarkMode(
  options?: boolean | Partial<DarkModeOptions<boolean>>,
  localStorageKeyProps: string = LOCAL_STORAGE_KEY,
): DarkModeOutput<boolean | undefined> {
  // TODO: Refactor this code after the deprecated signature has been removed.
  const defaultValue =
    typeof options === 'boolean' ? options : options?.defaultValue ?? false
  const localStorageKey =
    typeof options === 'boolean'
      ? localStorageKeyProps ?? LOCAL_STORAGE_KEY
      : options?.localStorageKey ?? LOCAL_STORAGE_KEY
  const initializeWithValue =
    typeof options === 'boolean'
      ? undefined
      : options?.initializeWithValue ?? undefined

  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    localStorageKey,
    defaultValue ?? isDarkOS ?? false,
    { initializeWithValue },
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
