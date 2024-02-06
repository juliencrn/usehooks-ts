import { useRef, useState } from 'react'

import { useDebounceCallback } from '../useDebounceCallback'
import { useResizeObserver } from './useResizeObserver'

type Size = {
  width?: number
  height?: number
}

export default function Component() {
  const ref = useRef<HTMLDivElement>(null)
  const { width = 0, height = 0 } = useResizeObserver({
    ref,
    box: 'border-box',
  })

  return (
    <div ref={ref} style={{ border: '1px solid palevioletred', width: '100%' }}>
      {width} x {height}
    </div>
  )
}

export function WithDebounce() {
  const ref = useRef<HTMLDivElement>(null)
  const [{ width, height }, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  })

  const onResize = useDebounceCallback(setSize, 200)

  useResizeObserver({
    ref,
    onResize,
  })

  return (
    <div
      ref={ref}
      style={{
        border: '1px solid palevioletred',
        width: '100%',
        resize: 'both',
        overflow: 'auto',
        maxWidth: '100%',
      }}
    >
      debounced: {width} x {height}
    </div>
  )
}
