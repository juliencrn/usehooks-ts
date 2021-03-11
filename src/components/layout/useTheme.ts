import { useLocalStorage } from '~/hooks'

type Theme = 'light' | 'dark'

// TODO: Finish it then move it in ~/hooks folder
function useTheme(): [Theme, () => void] {
  // TODO: Read User OS preferences for the default value
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark')

  const toggleTheme = () => {
    // TODO: Improve useLocalStorage using useState like API
    // E.g. setTheme(Theme => Theme)
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return [theme, toggleTheme]
}

export default useTheme
