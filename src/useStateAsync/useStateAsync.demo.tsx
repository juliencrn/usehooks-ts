import { useCallback, useRef } from 'react'

import { useStateAsync } from '..'

export default function Component() {
  const [name, setName] = useStateAsync('autumn')
  const [message, setMessage] = useStateAsync(`Press the button, ${name}.`)
  const messageContainerRef = useRef<HTMLParagraphElement>(null)

  const changeName = useCallback(async () => {
    const changedName = await setName(name => name.toUpperCase())
    await setMessage(`Hello, ${changedName}.`)
    console.log(messageContainerRef.current?.innerText)
  }, [setMessage, setName])

  return (
    <>
      <p ref={messageContainerRef}>{message}</p>
      <button onClick={changeName}>Change name</button>
    </>
  )
}
