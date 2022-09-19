import React from 'react'

import { useMediaQuery } from 'usehooks-ts'

export default function Component() {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <div>
      {`The view port is ${matches ? 'at least' : 'less than'} 768 pixels wide`}
    </div>
  )
}
