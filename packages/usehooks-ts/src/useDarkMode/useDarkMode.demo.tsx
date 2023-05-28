import { useDarkMode } from '..'

export default function Component() {
  const { isDarkMode, toggle, enable, disable } = useDarkMode()

  return (
    <div>
      <p>Current theme: {isDarkMode ? 'dark' : 'light'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={enable}>Enable</button>
      <button onClick={disable}>Disable</button>
    </div>
  )
}
