import React from 'react'

import { useSsr } from 'usehooks-ts'

export default function Component() {
  const { isBrowser } = useSsr()

  return <p>{isBrowser ? 'Browser' : 'Server'}!</p>
}
