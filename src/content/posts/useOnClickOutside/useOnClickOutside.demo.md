```tsx
import React, { useRef } from 'react'
import useOnClickOutside from '../useOnClickOutside'

export default function Component() {
  const ref = useRef(null)

  const handleClickOutside = () => {
    // Your custom logic here
    console.log('clicked outside')
  }

  const handleClickInside = () => {
    // Your custom logic here
    console.log('clicked inside')
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <div
      ref={ref}
      onClick={handleClickInside}
      style={{ width: 200, height: 200, background: 'cyan' }}
    />
  )
}
```
