import { useCallback, useEffect, useState } from 'react'

import { useEventListener, useSsr } from '..'

function useOnline() {
  const { isServer } = useSsr()
  const [isOnline, setisOnline] = useState(isServer)

  const handleOnline = useCallback(() => {
    setisOnline(true)
  }, [])

  const handleOffline = useCallback(() => {
    setisOnline(false)
  }, [])

  useEventListener('online', handleOnline)
  useEventListener('offline', handleOffline)

  useEffect(() => {
    setisOnline(navigator.onLine)
  }, [])

  return isOnline
}

export default useOnline
