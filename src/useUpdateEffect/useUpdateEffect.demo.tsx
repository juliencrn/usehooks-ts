import React, { useEffect, useState } from 'react'

import { useUpdateEffect } from '..'

export default function Component() {
  const [data, setData] = useState<number>(0)
  useEffect(() => {
    console.log('Normal useEffect', { data })
  }, [data])

  useUpdateEffect(() => {
    console.log('Update useEffect only', { data })
  }, [data])

  return (
    <div>
      <p>Open your console</p>
      <button onClick={() => setData(Date.now())}>Update data</button>
    </div>
  )
}
