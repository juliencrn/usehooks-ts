```tsimport { useEffect, useRef } from 'react'

function useIsMounted() {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return () => isMounted.current
}

export default useIsMounted
```