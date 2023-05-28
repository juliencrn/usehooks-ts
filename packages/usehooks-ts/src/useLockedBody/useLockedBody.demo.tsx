import { CSSProperties, useState } from 'react'

import { useLockedBody } from '..'

const fixedCenterStyle: CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

const fakeScrollableStyle: CSSProperties = {
  minHeight: '150vh',
  background: 'linear-gradient(palegreen, palegoldenrod, palevioletred)',
}

// Example 1: useLockedBody as useState()
export default function App() {
  const [locked, setLocked] = useLockedBody(false, 'root')

  const toggleLocked = () => {
    setLocked(!locked)
  }

  return (
    <div style={fakeScrollableStyle}>
      <button style={fixedCenterStyle} onClick={toggleLocked}>
        {locked ? 'unlock scroll' : 'lock scroll'}
      </button>
    </div>
  )
}

// Example 2: useLockedBody with our custom state
export function App2() {
  const [locked, setLocked] = useState(false)

  const toggleLocked = () => {
    setLocked(!locked)
  }

  useLockedBody(locked, 'root')

  return (
    <div style={fakeScrollableStyle}>
      <button style={fixedCenterStyle} onClick={toggleLocked}>
        {locked ? 'unlock scroll' : 'lock scroll'}
      </button>
    </div>
  )
}
