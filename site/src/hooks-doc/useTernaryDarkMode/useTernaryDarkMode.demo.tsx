import React from 'react'

import { useTernaryDarkMode } from 'usehooks-ts'

export default function Component() {
  const [two] = useTernaryDarkMode()

  return <div>Hello {two}</div>
}
