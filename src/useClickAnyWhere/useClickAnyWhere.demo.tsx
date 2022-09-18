import React, { useState } from 'react'

import { useClickAnyWhere } from '..'

export default function Component() {
  const [count, setCount] = useState(0)

  useClickAnyWhere(() => {
    setCount(prev => prev + 1)
  })

  return <p>Click count: {count}</p>
}
