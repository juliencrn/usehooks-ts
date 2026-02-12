import { useRef, useState } from 'react'

import { useMutationObserver } from '..'

export default function Component() {
  const ref = useRef<HTMLParagraphElement>(null)
  const [hue, setHue] = useState(0)
  const { mutationList } = useMutationObserver({
    ref,
    attributes: true,
    childList: true,
    subtree: true,
  })

  const rotate = () => {
    setHue(prevHue => prevHue + 90)
  }

  return (
    <div className="App">
      <h1>
        How to use <code>useMutationObserver()</code>
      </h1>
      <div
        ref={ref}
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
      {mutationList.length > 0 && (
        <p>Last mutation type: {mutationList[0].type}</p>
      )}
    </div>
  )
}

export function WithCallback() {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useMutationObserver({
    ref,
    attributes: true,
    onMutation: mutations => {
      setCount(prev => prev + mutations.length)
    },
  })

  return (
    <div>
      <div ref={ref}>Observed element</div>
      <p>Total mutations observed: {count}</p>
    </div>
  )
}
