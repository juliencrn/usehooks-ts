```ts
import { useState, useEffect } from 'react'

function useScreen() {
  const getScreen = () => {
    if (typeof window !== 'undefined') {
      return window.screen
    }
    return undefined
  }

  const [screen, setScreen] = useState<Screen | undefined>(getScreen())

  useEffect(() => {
    function handleResize() {
      setScreen(getScreen())
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // Empty array ensures that effect is only run on mount and unmount
  }, [])

  return screen
}

export default useScreen
```
