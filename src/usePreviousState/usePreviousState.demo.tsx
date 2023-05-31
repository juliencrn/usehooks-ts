import { useState } from 'react'
import { usePreviousState } from '..'

export default function Component() {
  const [state, setState] = useState([1, 2])

  const prevState = usePreviousState(state)

  return (
    <div className="App">
      <p>current-state: {state.toString()}</p>
      <p>previous-state: {prevState.toString()}</p>
      <button
        onClick={() => {
          setState(p => [...p, p.length + 1])
        }}
      >
        Add
      </button>
    </div>
  )
}
