import React, { useState } from 'react'

import { useElementSize } from '..'

export default function Component() {
  const [isVisible, setVisible] = useState(true)
  const [squareRef, { width, height }] = useElementSize()

  const toggleVisibility = () => setVisible(x => !x)

  return (
    <>
      <p>{`The square width is ${width}px and height ${height}px`}</p>
      <p>Try, resize your window and-or click on the button.</p>

      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'} square
      </button>

      {isVisible && (
        <div
          ref={squareRef}
          style={{
            width: '50%',
            paddingTop: '50%',
            backgroundColor: 'aquamarine',
            margin: 'auto',
          }}
        />
      )}
    </>
  )
}
