import { Fragment } from 'react'

import { useMap } from './useMap'

export default function Component() {
  const [map, actions] = useMap<string, string>([['key', '🆕']])

  const set = () => {
    actions.set(String(Date.now()), '📦')
  }
  const setAll = () => {
    actions.setAll([
      ['hello', '👋'],
      ['data', '📦'],
    ])
  }
  const reset = () => {
    actions.reset()
  }
  const remove = () => {
    actions.remove('hello')
  }

  return (
    <div>
      <button onClick={set}>Add</button>
      <button onClick={reset}>Reset</button>
      <button onClick={setAll}>Set new data</button>
      <button onClick={remove} disabled={!map.get('hello')}>
        {'Remove "hello"'}
      </button>

      <pre>
        Map (
        {Array.from(map.entries()).map(([key, value]) => (
          <Fragment key={key}>{`\n  ${key}: ${value}`}</Fragment>
        ))}
        <br />)
      </pre>
    </div>
  )
}
