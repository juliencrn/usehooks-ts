import React from 'react'

import { useTernaryDarkMode } from 'usehooks-ts'

export default function Component() {
  const {
    isDarkMode,
    ternaryDarkMode,
    dispatchTernaryDarkMode,
    toggleTernaryDarkMode,
  } = useTernaryDarkMode()
  type TernaryDarkMode = typeof ternaryDarkMode

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
          onChange={ev =>
            dispatchTernaryDarkMode(ev.target.value as TernaryDarkMode)
          }
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
