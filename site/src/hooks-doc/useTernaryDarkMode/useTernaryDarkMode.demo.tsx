import React from 'react'

import { useTernaryDarkMode } from 'usehooks-ts'

export default function Component() {
  const { isDarkMode, ternaryDarkMode, toggleTernaryDarkMode } =
    useTernaryDarkMode()

  return (
    <div>
      <p>Current theme: {isDarkMode ? 'dark' : 'light'}</p>
      <p>ternaryMode: {ternaryDarkMode}</p>
      <button onClick={toggleTernaryDarkMode}>
        Toggle from {ternaryDarkMode}
      </button>
      <p>
        enum strict equal test:{' '}
        {ternaryDarkMode === 'system' ? 'using System' : 'not using System'}
      </p>
    </div>
  )
}
