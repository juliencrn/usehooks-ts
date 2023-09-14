import { Fragment } from 'react'

import type { InitialState } from './useSet'
import { useSet } from './useSet'

const dict = {
  initial: 'initial',
  set: 'set',
  state: 'state',
  add: 'add',
} as const

const initialState: InitialState<string> = [
  dict.initial,
  dict.set,
  dict.set,
  dict.state,
]

export default function Component() {
  const [set, actions] = useSet(initialState)

  const add = () => {
    actions.add(dict.add)
  }

  const del = () => {
    actions.delete(dict.state)
  }

  const clear = () => {
    actions.clear()
  }

  return (
    <div>
      <button onClick={add}>Add</button>
      <button onClick={del}>Delete</button>
      <button onClick={clear}>Clear</button>

      <pre>
        Set (
        {Array.from(set.values()).map((v, index) => (
          <Fragment key={`${v}-${index}`}>{`\n  ${v}`}</Fragment>
        ))}
        <br />)
      </pre>
    </div>
  )
}
