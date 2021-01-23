```ts
import { useEffect, useLayoutEffect, useState } from 'react'

type ReturnType = [boolean, (locked: boolean) => void]

function useLockedBody(initialLocked = false, scrollBarWidth = 15): ReturnType {
  const [locked, setLocked] = useState(initialLocked)

  // Do the side effect before render
  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (locked) {
      const originalOverflowY = document.body.style.overflowY
      const originalPaddingRight = document.body.style.overflow

      // Lock body scroll
      document.body.style.overflowY = 'hidden'

      // Avoid width reflow
      document.body.style.paddingRight = `${scrollBarWidth}px`

      return () => {
        // reset
        document.body.style.overflowY = originalOverflowY
        document.body.style.paddingRight = originalPaddingRight
      }
    }
  }, [locked, initialLocked])

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked)
    }
  }, [initialLocked])

  return [locked, setLocked]
}

export default useLockedBody
```
