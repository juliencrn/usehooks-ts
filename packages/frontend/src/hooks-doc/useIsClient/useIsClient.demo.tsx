import React from 'react'

import { useIsClient } from 'usehooks-ts'

export default function Component() {
  const isClient = useIsClient()

  return <div>{isClient ? 'Client' : 'server'}</div>
}
