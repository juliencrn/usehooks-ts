import React from 'react'

import { useSessionStorage } from 'usehooks-ts'

export default function Component() {
  const [value, setValue] = useSessionStorage('test-key', 0)

  return (
    <div>
      <p>Count: {value}</p>
      <button onClick={() => setValue(x => x + 1)}>Increment</button>
      <button onClick={() => setValue(x => x - 1)}>Decrement</button>
    </div>
  )
}
