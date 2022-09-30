import { useLocalStorage } from '..'

// Usage
export default function Component() {
  const [isDarkTheme, setDarkTheme] = useLocalStorage('darkTheme', true)

  const toggleTheme = () => {
    setDarkTheme((prevValue: boolean) => !prevValue)
  }

  return (
    <button onClick={toggleTheme}>
      {`The current theme is ${isDarkTheme ? `dark` : `light`}`}
    </button>
  )
}
