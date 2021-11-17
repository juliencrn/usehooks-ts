import React from 'react'

import { useClickAnyWhere } from 'usehooks-ts'

export default function Component() {
  const [count, setCount] = React.useState(0)
  useClickAnyWhere(() => setCount(count + 1))

  return <div>Count, {count}</div>
}
