import React, { ChangeEvent, useState } from 'react'

import useInterval from './useInterval'

export default function Component() {
  // The counter
  const [count, setCount] = useState<number>(0)
  // Dynamic delay
  const [delay, setDelay] = useState<number>(1000)
  // ON/OFF
  const [isPlaying, setPlaying] = useState<boolean>(false)

  useInterval(
    () => {
      // Your custom logic here
      setCount(count + 1)
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? delay : null,
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value))
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setPlaying(!isPlaying)}>
        {isPlaying ? 'pause' : 'play'}
      </button>
      <p>
        <label>Delay: </label>
        <input type="number" onChange={handleChange} value={delay} />
      </p>
    </>
  )
}
