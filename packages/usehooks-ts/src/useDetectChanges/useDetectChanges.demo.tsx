/* eslint-disable react/display-name */
import React from 'react'

import { useDetectChanges } from '..'

interface MyComponentProps {
  prop1: string
  prop2: string
}

const SlowComponent = React.memo((props: MyComponentProps) => {
  const changedProps = useDetectChanges(props)

  // prevRender: props = {prop1: value1, prop2: value2}
  // currentRender: props = {prop1: newValue1, prop2: value2}
  // only the prop1 has changed
  console.log('Who causes the re-render of my pure component?', changedProps) // {prop1: [value1, newValue1]}

  // ...

  return <div>{/* ... */}</div>
})

export default SlowComponent
