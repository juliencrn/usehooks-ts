import { useRef } from 'react'

import { useEventListener } from './useEventListener'

export default function Component() {
  // Define button ref
  const buttonRef = useRef<HTMLButtonElement>(null)
  const documentRef = useRef<Document>(document)
  const speechSynthesis = new SpeechSynthesis()
  const speechSynthesisRef = useRef(speechSynthesis)

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
  useEventListener('visibilitychange', onVisibilityChange, {element: documentRef })

  // example with element based event
  useEventListener('click', onClick, { element: buttonRef })

  // example with EventTarget element based event
  useEventListener('voiceschanged', ev => console.log('speech!', ev), { element: speechSynthesisRef })

  // Example without ref
  useEventListener('voiceschanged', ev => console.log('speech!', ev), { element: speechSynthesis })

  return (
    <div style={{ minHeight: '200vh' }}>
      <button ref={buttonRef}>Click me</button>
    </div>
  )
}
