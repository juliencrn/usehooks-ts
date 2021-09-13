import React from 'react'

import { useCopyToClipboard } from 'usehooks.ts'

export default function Component() {
  const [value, copy] = useCopyToClipboard()
  return (
    <>
      <h1>Click to copy:</h1>
      <div style={{ display: 'flex' }}>
        <button onClick={() => copy('A')}>A</button>
        <button onClick={() => copy('B')}>B</button>
        <button onClick={() => copy('C')}>C</button>
      </div>
      <p>Copied value: {value ?? 'Nothing is copied yet!'}</p>
    </>
  )
}
