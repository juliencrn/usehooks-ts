import { useLocalStorage } from '../useLocalStorage'
import { useMediaQuery } from '../useMediaQuery'
import { useUpdateEffect } from '../useUpdateEffect'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const LOCAL_STORAGE_KEY = 'usehooks-ts-dark-mode'

interface UseDarkModeOutput {
  isDarkMode: boolean
  toggle: () => void
  enable: () => void
  disable: () => void
  set: (value: boolean) => void
}

/**
 * Custom hook that returns the current state of the dark mode.
 * @param  {?boolean} [defaultValue] the initial value of the dark mode, default `false`.
 * @param  {?string} [localStorageKey] the key to use in the local storage, default `'usehooks-ts-dark-mode'`.
 * @returns {UseDarkModeOutput} An object containing the dark mode's state and its controllers.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-dark-mode)
 * @example
 * const { isDarkMode, toggle, enable, disable, set } = useDarkMode();
 */
export function useDarkMode(
  defaultValue?: boolean,
  localStorageKey: string = LOCAL_STORAGE_KEY,
): UseDarkModeOutput {
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
