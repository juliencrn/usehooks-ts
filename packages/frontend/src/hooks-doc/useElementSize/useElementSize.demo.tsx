import React, { useRef } from 'react'

import { useElementSize } from 'usehooks-ts'

export default function Component() {
  const squareRef = useRef(null)

  const { width, height } = useElementSize(squareRef)

  return (
    <>
      <p>{`the square width is ${width}px and height ${height}px`}</p>

      <div
        ref={squareRef}
        style={{
          width: '50%',
          paddingTop: '50%',
          backgroundColor: 'aquamarine',
          margin: 'auto',
        }}
      />
    </>
  )
}
