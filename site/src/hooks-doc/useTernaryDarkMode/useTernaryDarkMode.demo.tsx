import React from 'react'

import { useTernaryDarkMode } from 'usehooks-ts'

export default function Component() {
  const { isPaletteDarkMode, ternaryModeCode, toggleTernaryDarkMode } =
    useTernaryDarkMode()

  return (
    <div>
      <p>Current theme: {isPaletteDarkMode ? 'dark' : 'light'}</p>
      <button onClick={toggleTernaryDarkMode}>Toggle</button>
      <span>ternaryModeCode:{ternaryModeCode}</span>
      <span>isPaletteDarkMode:{isPaletteDarkMode}</span>
    </div>
  )
}
