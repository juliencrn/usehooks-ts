import { useState } from 'react'

import { useDebounceCallback } from './useDebounceCallback'

export default function Component() {
  const [value, setValue] = useState('')

  const debounced = useDebounceCallback(setValue, 500)

  return (
    <div>
      <p>Debounced value: {value}</p>

      <input
        type="text"
        defaultValue={value}
        onChange={event => debounced(event.target.value)}
      />
    </div>
  )
}
