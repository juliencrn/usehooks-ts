```tsx
import React, { useRef } from 'react'
import useHover from '../useHover'

export default function Component() {
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)

  return (
    <div ref={hoverRef}>
      {`The current div is ${isHover ? `hovered` : `unhovered`}`}
    </div>
  )
}
```
