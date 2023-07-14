import { useState } from 'react'

import { useLayoutLatestRef } from '..'

export default function Component() {
  const [message, setMessage] = useState('')
  const latestMessageRef = useLayoutLatestRef(message)

  const ALERT_TIMEOUT = 3000
  const showAlert = () => {
    setTimeout(() => {
      alert('Your message: ' + latestMessageRef.current)
    }, ALERT_TIMEOUT)
  }

  return (
    <div>
      Enter message:&nbsp;
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={showAlert}>
        Show alert after {ALERT_TIMEOUT / 1000} seconds
      </button>
    </div>
  )
}
