import type { TernaryDarkMode } from './useTernaryDarkMode'
import { useTernaryDarkMode } from './useTernaryDarkMode'

export default function Component() {
  const {
    isDarkMode,
    ternaryDarkMode,
    setTernaryDarkMode,
    toggleTernaryDarkMode,
  } = useTernaryDarkMode()

  return (
    <div>
      <p>Current theme: {isDarkMode ? 'dark' : 'light'}</p>
      <p>ternaryMode: {ternaryDarkMode}</p>
      <p>
        Toggle between three modes
        <button onClick={toggleTernaryDarkMode}>
          Toggle from {ternaryDarkMode}
        </button>
      </p>
      <p>
        Select a mode
        <br />
        <select
          name="select-ternaryDarkMode"
          onChange={ev => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setTernaryDarkMode(ev.target.value as TernaryDarkMode)
          }}
          value={ternaryDarkMode}
        >
          <option value="light">light</option>
          <option value="system">system</option>
          <option value="dark">dark</option>
        </select>
      </p>
    </div>
  )
}
