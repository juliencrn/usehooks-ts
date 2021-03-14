```tsimport { useEffect, useRef } from 'react'

function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void | null>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  })

  // Set up the timeout.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback?.current !== 'undefined') {
        savedCallback?.current()
      }
    }

    if (delay !== null) {
      const id = setTimeout(tick, delay)
      return () => clearTimeout(id)
    }
  }, [delay])
}

export default useTimeout
```