import React from 'react'

import { useMap } from 'usehooks-ts'

export default function Component() {
  const [map /*, methods */] = useMap<string, string>([['key', 'value']])

  return (
    <div>
      <code>{JSON.stringify(map.values)}</code>
    </div>
  )
}
