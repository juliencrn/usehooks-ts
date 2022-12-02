import { useEffect, useState } from 'react'

import { useIsDeepEqualEffect } from '..'

export default function Component() {
  const [data, setData] = useState({
    val: 1,
    children: {
      val: 2,
    },
  })
  useEffect(() => {
    console.log('useEffect', data)
  }, [data])

  useIsDeepEqualEffect(() => {
    console.log('useIsDeepEqualEffect', data)
  }, [data])

  return (
    <div>
      <p>Open your console</p>
      <button
        onClick={() =>
          setData({
            val: 1,
            children: {
              val: 2,
            },
          })
        }
      >
        Update data
      </button>
    </div>
  )
}
