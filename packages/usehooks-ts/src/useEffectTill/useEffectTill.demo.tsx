import { useEffect, useState } from 'react'

import { useEffectTill } from './useEffectTill'

export default function Component() {
  const [data, setData] = useState<number>(0)
  useEffect(() => {
    console.log('Normal useEffect', { data })
  }, [data])

  useEffectTill(
    done => {
      if (data === 0) {
        console.log('Triggered only once, when data is 0', { data })
        done()
      }
    },
    [data],
  )

  return (
    <div>
      <p>Open your console</p>
      <button onClick={() => setData(Date.now())}>Update data</button>
    </div>
  )
}
