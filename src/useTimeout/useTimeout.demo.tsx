import { useState } from 'react'

import { useTimeout } from '..'

export default function Component() {
  const [visible, setVisible] = useState(true)

  const hide = () => setVisible(false)

  useTimeout(hide, 5000)

  return (
    <div>
      <p>
        {visible
          ? "I'm visible for 5000ms"
          : 'You can no longer see this content'}
      </p>
    </div>
  )
}
