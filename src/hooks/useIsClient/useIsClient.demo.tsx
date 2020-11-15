import React from 'react'

import useIsClient from './useIsClient'

export default function Component() {
  const isClient = useIsClient()

  return <div>{isClient ? 'Client' : 'server'}</div>
}
