import { useEffect, useMemo, useRef } from 'react'

function useIsMounted() {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useMemo(() => isMounted.current, [])
}

export default useIsMounted
