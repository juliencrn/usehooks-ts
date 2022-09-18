import React from 'react'

import { useSessionStorage } from '..'

export default function Component() {
  const [value, setValue] = useSessionStorage('test-key', 0)

  return (
    <div>
      <p>Count: {value}</p>
      <button onClick={() => setValue((x: number) => x + 1)}>Increment</button>
      <button onClick={() => setValue((x: number) => x - 1)}>Decrement</button>
    </div>
  )
}
