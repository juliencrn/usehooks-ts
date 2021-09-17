import React, { useRef } from 'react'

import { useEventListener } from 'usehooks-ts'

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
