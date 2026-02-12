import { useEffect, useRef, useState } from 'react'

import { useMutationObserver } from '..'

export default function Component() {
  const colorRef = useRef<HTMLParagraphElement>(null)
  const [hue, setHue] = useState(0)
  const { mutationList, getMutationListByType } = useMutationObserver(
    colorRef,
    {
      attributes: true,
      childList: true,
      subtree: true,
    },
  )

  useEffect(() => {
    mutationList.forEach(mutation => {
      console.log(mutation.target)
    })
  }, [mutationList])

  useEffect(() => {
    const mutationList = getMutationListByType('attributes')
    mutationList.forEach(mutation => {
      console.log(mutation.target)
    })
  }, [getMutationListByType])

  const rotate = () => {
    setHue(prevHue => prevHue + 90)
  }

  return (
    <div className="App">
      <h1>
        How to use <code>useMutationObserver()</code>
      </h1>
      <div
        ref={colorRef}
        style={{
          transition: 'background-color ease-out 200ms',
          backgroundColor: `hsl(${String(hue % 360)}, 50%, 50%)`,
        }}
      >
        <p className="counter-display">Hue = {hue % 360}&deg;</p>
      </div>
      <div className="actions">
        <button onClick={rotate}>Rotate colour</button>
      </div>
    </div>
  )
}
