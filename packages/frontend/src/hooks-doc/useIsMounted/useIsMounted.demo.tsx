import React, { useEffect, useState } from 'react'

import { useIsMounted } from 'usehooks-ts'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function Child() {
  const [data, setData] = useState('loading')
  const isMounted = useIsMounted()

  // simulate an api call and update state
  useEffect(() => {
    void delay(3000).then(() => {
      if (isMounted()) setData('OK')
    })
  }, [isMounted])

  return <p>{data}</p>
}

export default function Component() {
  const [isVisible, setVisible] = useState<boolean>(false)

  const toggleVisibility = () => setVisible(state => !state)

  return (
    <>
      <button onClick={toggleVisibility}>{isVisible ? 'Hide' : 'Show'}</button>

      {isVisible && <Child />}
    </>
  )
}
