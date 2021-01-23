```tsx
import React from 'react'

import useSiteMetadata from './useSiteMetadata'

export default function Component() {
  const { title } = useSiteMetadata()

  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}
```
