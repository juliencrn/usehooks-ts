import { useState } from 'react'

import { useRenderCount } from './useRenderCount'

export default function Component() {
  const [count, setCount] = useState(0)
  const renderCount = useRenderCount('Component')

  return (
    <div>
      <p>{`Render count: ${renderCount}`}</p>
      <p>{`Count: ${count}`}</p>
      <button
        onClick={() => {
          setCount(prev => prev + 1)
        }}
      >
        Increment
      </button>
    </div>
  )
}
