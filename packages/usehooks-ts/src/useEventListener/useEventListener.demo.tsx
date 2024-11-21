import { useRef } from 'react'

import { useEventListener } from './useEventListener'

export default function Component() {
  // Define button ref
  const buttonRef = useRef<HTMLButtonElement>(null)
  const documentRef = useRef(document)
  const speechSynthesis = new SpeechSynthesis()
  const speechSynthesisRef = useRef(speechSynthesis)

  // example with window based event
  useEventListener('scroll', ev => console.log('scrolled!', ev))

  // example with document based event
  useEventListener('visibilitychange', ev => console.log('visibility!', ev), {element: documentRef })

  // example with element based event
  useEventListener('click', ev => console.log('clicked!', ev.pageX), { element: buttonRef })

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
