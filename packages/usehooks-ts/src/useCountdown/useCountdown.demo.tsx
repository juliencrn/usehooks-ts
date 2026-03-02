import { useState } from 'react'

import type { ChangeEvent } from 'react'

import { useCountdown } from './useCountdown'

export default function Component() {
  const [intervalValue, setIntervalValue] = useState<number>(1000)
  const [message, setMessage] = useState('Running...')

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 10,
      countStop: 0,
      intervalMs: intervalValue,
      autoStart: true,
      onFinish: () => setMessage('Finished!'),
    })

  const handleChangeIntervalValue = (event: ChangeEvent<HTMLInputElement>) => {
    setIntervalValue(Number(event.target.value))
  }

  const handleReset = () => {
    setMessage('Running...')
    resetCountdown()
  }

  return (
    <div>
      <p>Count: {count}</p>
      <p>{message}</p>

      <input
        type="number"
        value={intervalValue}
        onChange={handleChangeIntervalValue}
      />
      <button onClick={startCountdown}>start</button>
      <button onClick={stopCountdown}>stop</button>
      <button onClick={handleReset}>reset</button>
    </div>
  )
}
