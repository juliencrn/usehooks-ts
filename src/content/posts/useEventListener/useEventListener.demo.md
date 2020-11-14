```tsx
import React, { useRef } from 'react'

// See: https://usehooks-typescript.com/use-event-listener
import useEventListener from '../useEventListener'

export default function Component() {
  // Define button ref
  const buttonRef = useRef<HTMLButtonElement>(null)

  const onScroll = (event: Event) => {
    console.log('window scrolled!', event)
  }

  const onClick = (event: Event) => {
    console.log('button clicked!', event)
  }

  // example with window based event
  useEventListener('scroll', onScroll)

  // example with element based event
  useEventListener('click', onClick, buttonRef)

  return (
    <div style={{ minHeight: '200vh' }}>
      <button ref={buttonRef}>Click me</button>
    </div>
  )
}
```
