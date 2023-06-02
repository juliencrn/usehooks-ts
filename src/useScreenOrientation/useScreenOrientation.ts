import { useEffect, useState } from 'react'

function useScreenOrientation(): string {
  const [orientation, setOrientation] = useState<OrientationType>(
    () => window.screen.orientation.type,
  )

  useEffect(() => {
    const orientationChangeHandler = () => {
      setOrientation(window.screen.orientation.type)
    }

    window.addEventListener('orientationchange', orientationChangeHandler)

    return () =>
      window.removeEventListener('orientationchange', orientationChangeHandler)
  }, [])

  return orientation
}

export default useScreenOrientation
