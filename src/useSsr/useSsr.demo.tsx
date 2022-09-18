import React from 'react'

import { useSsr } from '..'

export default function Component() {
  const { isBrowser } = useSsr()

  return <p>{isBrowser ? 'Browser' : 'Server'}!</p>
}
