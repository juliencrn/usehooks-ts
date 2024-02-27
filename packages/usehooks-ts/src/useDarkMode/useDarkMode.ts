import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import { useLocalStorage } from '../useLocalStorage'
import { useMediaQuery } from '../useMediaQuery'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const LOCAL_STORAGE_KEY = 'usehooks-ts-dark-mode'

type DarkModeOptions = {
  defaultValue?: boolean
  localStorageKey?: string
  initializeWithValue?: boolean
}

type DarkModeOutput = {
  isDarkMode: boolean
  toggle: () => void
  enable: () => void
  disable: () => void
  set: (value: boolean) => void
}

export function useDarkMode(options?: DarkModeOptions): DarkModeOutput

/**
 * Custom hook that returns the current state of the dark mode.
 * @param  {?boolean | ?DarkModeOptions} [options] - the initial value of the dark mode, default `false`.
 * @param  {?boolean} [options.defaultValue] - the initial value of the dark mode, default `false`.
 * @param  {?string} [options.localStorageKey] - the key to use in the local storage, default `'usehooks-ts-dark-mode'`.
 * @param  {?boolean} [options.initializeWithValue] - if `true` (default), the hook will initialize reading `localStorage`. In SSR, you should set it to `false`, returning the `defaultValue` or `false` initially.
 * @param  {?string} [localStorageKeyProps] the key to use in the local storage, default `'usehooks-ts-dark-mode'`.
 * @returns {DarkModeOutput} An object containing the dark mode's state and its controllers.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-dark-mode)
 * @example
 * const { isDarkMode, toggle, enable, disable, set } = useDarkMode({ defaultValue: true });
 */
export function useDarkMode(options: DarkModeOptions = {}): DarkModeOutput {
  const {
    defaultValue,
    localStorageKey = LOCAL_STORAGE_KEY,
    initializeWithValue = true,
  } = options

  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY, {
    initializeWithValue,
    defaultValue,
  })
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    localStorageKey,
    defaultValue ?? isDarkOS ?? false,
    { initializeWithValue },
  )

  // Update darkMode if os prefers changes
  useIsomorphicLayoutEffect(() => {
    if (isDarkOS !== isDarkMode) {
      setDarkMode(isDarkOS)
    }
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
