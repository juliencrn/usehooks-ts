import { useLayoutEffect, useState } from 'react'

// See: https://usehooks-ts.com/react-hook/use-event-listener
import { useEventListener } from '../useEventListener'

function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    const mediaQueryList = window.matchMedia(query)
    return mediaQueryList.matches
  }

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  function handleSize() {
    setMatches(getMatches(query))
  }

  useEventListener('resize', handleSize)

  // Set size at the first client-side load
  useLayoutEffect(() => {
    handleSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return matches
}

export default useMediaQuery
