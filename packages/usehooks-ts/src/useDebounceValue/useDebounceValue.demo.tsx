import { useState } from 'react'

import { useDebounceValue } from '..'

export default function Component() {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounceValue(value, 500)

  return (
    <div>
      <p>Real-time value: {value}</p>
      <p>Debounced value: {debouncedValue}</p>

      <input
        type="text"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </div>
  )
}
