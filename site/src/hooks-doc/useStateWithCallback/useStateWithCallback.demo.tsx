import React from 'react'

import { useStateWithCallback } from 'usehooks-ts'

export default function Component() {
  const [value, setValue, func] = useStateWithCallback(1)

  const handleClick = (mode: 'decr' | 'inc') => () => {
    const val = Math.random()
    setValue(prev => (mode === 'decr' ? prev - 1 : prev + 1))
    func.current = () => console.log(val + val)
  }

  return (
    <>
      <button onClick={handleClick('inc')}>inc</button>
      <button onClick={handleClick('decr')}>decr</button>
      <p>{value}</p>
    </>
  )
}
