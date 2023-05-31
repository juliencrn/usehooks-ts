import { useCallback } from 'react'

import { useStatus, useTimeout } from '..'

export default function Component() {
  const { status, updateStatus } = useStatus({
    initialStatus: {
      state: 'loading',
      message: 'loading',
      percent: 0,
    },
  })
  const stopLoading = useCallback(() => {
    updateStatus({
      state: 'ready',
      message: 'loaded',
      percent: 0,
    })
  }, [updateStatus])

  useTimeout(stopLoading, 5000)

  return (
    <>
      <p>
        Status State: <code>{status.state}</code>
      </p>
      <p>
        Message: <code>{status.message}</code>
      </p>
      {['pending', 'loading'].includes(status.state || 'pending') ? (
        <img src="https://i.gifer.com/ZZ5H.gif" alt="loading" />
      ) : (
        <img
          src="https://media.tenor.com/CW3dv0a1Hf4AAAAC/mission-complete-spongebob.gif"
          alt="ready"
        />
      )}
    </>
  )
}
