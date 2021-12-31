import React, { ChangeEvent, useState } from 'react'

import { useCountdown } from 'usehooks-ts'

export default function Component() {
  const [intervalValue, setIntervalValue] = useState<number>(500)
  const [count, { start, stop, reset }] = useCountdown({
    seconds: 60,
    interval: 500,
    isIncrement: false,
  })

  const handleChangeIntervalValue = (event: ChangeEvent<HTMLInputElement>) => {
    setIntervalValue(Number(event.target.value))
  }
  return (
    <div>
      <p>Count: {count}</p>

      <input
        type="number"
        value={intervalValue}
        onChange={handleChangeIntervalValue}
      />
      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}
