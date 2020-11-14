import React from 'react'
import useLocalStorage from '../useLocalStorage'

// Usage
export default function Component() {
  const [isDarkTheme, setDarkTheme] = useLocalStorage('darkTheme', true)

  const toggleTheme = () => {
    setDarkTheme(!isDarkTheme)
  }

  return (
    <button onClick={toggleTheme}>
      {`The current theme is ${isDarkTheme ? `dark` : `light`}`}
    </button>
  )
}
