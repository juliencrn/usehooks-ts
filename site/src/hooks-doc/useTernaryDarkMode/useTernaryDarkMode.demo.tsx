import React from 'react'

import { useTernaryDarkMode } from 'usehooks-ts'

export default function Component() {
  const { isPaletteDarkMode, ternaryModeCode, togglePaletteDarkMode } =
    usePaletteDarkMode()

  return (
    <div>
      <p>Current theme: {isDarkMode ? 'dark' : 'light'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={enable}>Enable</button>
      <button onClick={disable}>Disable</button>
    </div>
  )
}
