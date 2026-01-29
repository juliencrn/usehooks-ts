import { useRef, useState } from 'react'
import { useResizeObserver } from '../useResizeObserver'
import { useDebounceCallback } from '../useDebounceCallback'

export const useElementSize = ({ frequency = 200 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ height, width }, setSize] = useState<{
    height?: number
    width?: number
  }>({ height: 0, width: 0 })

  const onResize = useDebounceCallback(setSize, frequency)

  useResizeObserver({
    onResize,
    ref,
  })

  return { height, ref, width }
}
