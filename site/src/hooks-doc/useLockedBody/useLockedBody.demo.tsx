import React, { CSSProperties, useState } from 'react'

import { useLockedBody } from 'usehooks-ts'

const fixedCenterStyle: CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

// Example 1: useLockedBody as useState()
export function Component1() {
  const [locked, setLocked] = useLockedBody()

  const toggleLocked = () => {
    setLocked(!locked)
  }

  return (
    <>
      <div style={{ minHeight: '200vh' }} />
      <button style={fixedCenterStyle} onClick={toggleLocked}>
        {locked ? 'unlock scroll' : 'lock scroll'}
      </button>
    </>
  )
}

// Example 2: useLockedBody with our custom state
export function Component2() {
  const [locked, setLocked] = useState(false)

  const toggleLocked = () => {
    setLocked(!locked)
  }

  useLockedBody(locked)

  return (
    <>
      <div style={{ minHeight: '200vh' }} />
      <button style={fixedCenterStyle} onClick={toggleLocked}>
        {locked ? 'unlock scroll' : 'lock scroll'}
      </button>
    </>
  )
}
