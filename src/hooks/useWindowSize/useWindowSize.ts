// See: https://usehooks-typescript.com/react-hook/use-event-listener

import { useState } from 'react'
import { useEventListener } from '~/hooks'

interface WindowSize {
  width: number
  height: number
}

const isClient = typeof window !== 'undefined'

function useWindowSize(): WindowSize {
  const getWindowSize = () => ({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  })

  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize())

  useEventListener('resize', () => {
    setWindowSize(getWindowSize())
  })

  return windowSize
}

export default useWindowSize
