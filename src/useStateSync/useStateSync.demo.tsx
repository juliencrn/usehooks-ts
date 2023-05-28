import { useState } from 'react'
import useStateSync from './useStateSync'

export default function Component() {
  const [counter, setCounter] = useStateSync<number>(0)
  const [multipliedCounter, setMultipliedCounter] = useState(0)

  function handleIncrese() {
    setCounter(counter + 1, newValue => {
      setMultipliedCounter(newValue * 2)
    })
  }

  function handleDecrease() {
    setCounter(counter - 1, newValue => {
      setMultipliedCounter(newValue * 2)
    })
  }

  return (
    <div>
      <button onClick={handleIncrese}>Increase count by 1</button>
      <button onClick={handleDecrease}>Decrease count by 1</button>
    </div>
  )
}
