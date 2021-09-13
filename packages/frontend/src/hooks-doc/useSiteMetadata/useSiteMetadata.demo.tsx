import React from 'react'

import { useSiteMetadata } from 'usehooks.ts'

export default function Component() {
  const { title } = useSiteMetadata()

  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}
