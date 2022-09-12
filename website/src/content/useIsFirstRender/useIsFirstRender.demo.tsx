import React, { useEffect, useState } from 'react'

import { useIsFirstRender } from 'usehooks-ts'

export default function Component() {
  const isFirst = useIsFirstRender()
  const [data, setData] = useState<number>(0)

  useEffect(() => {
    console.log('Normal useEffect', { data })
  }, [data])

  return (
    <div>
      <p>Open your console</p>
      <p>Is first render: {isFirst ? 'yes' : 'no'}</p>
      <button onClick={() => setData(Date.now())}>Update data</button>
    </div>
  )
}
