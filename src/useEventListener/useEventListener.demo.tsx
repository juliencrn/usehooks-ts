import { useRef } from 'react'

import { useEventListener } from '..'

export default function Component() {
  // Define button ref
  const buttonRef = useRef<HTMLButtonElement>(null)
  const documentRef = useRef<Document>(document)

  const onScroll = (event: Event) => {
    console.log('window scrolled!', event)
  }

  const onClick = (event: Event) => {
    console.log('button clicked!', event)
  }

  const onVisibilityChange = (event: Event) => {
    console.log('doc visibility changed!', {
      isVisible: !document.hidden,
      event,
    })
  }

  // example with window based event
  useEventListener('scroll', onScroll)

  // example with document based event
  useEventListener('visibilitychange', onVisibilityChange, documentRef)

  // example with element based event
  useEventListener('click', onClick, buttonRef)

  return (
    <div style={{ minHeight: '200vh' }}>
      <button ref={buttonRef}>Click me</button>
    </div>
  )
}
