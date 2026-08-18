import { useEffect, useRef, useState } from 'react'

import { useIsMounted } from '../useIsMounted'

type Size = {
  width: number | undefined
  height: number | undefined
}

type UseResizeObserverOptions<T extends HTMLElement = HTMLElement> = {
  ref: React.RefObject<T | null>
  onResize?: (size: Size) => void
  box?: 'border-box' | 'content-box' | 'device-pixel-content-box'
}

const initialSize: Size = {
  width: undefined,
  height: undefined,
}

export function useResizeObserver<T extends HTMLElement = HTMLElement>(
  options: UseResizeObserverOptions<T>,
): Size {
  const { ref, box = 'content-box' } = options
  const [{ width, height }, setSize] = useState<Size>(initialSize)
  const isMounted = useIsMounted()
  const previousSize = useRef<Size>({ ...initialSize })
  const onResize = useRef<((size: Size) => void) | undefined>(undefined)
  onResize.current = options.onResize

  useEffect(() => {
    const target = ref.current
    if (!target) return

    if (typeof window === 'undefined' || !('ResizeObserver' in window)) return

    const observer = new ResizeObserver(([entry]) => {
      const boxSize =
        box === 'border-box'
          ? entry.borderBoxSize
          : box === 'device-pixel-content-box'
            ? entry.devicePixelContentBoxSize
            : entry.contentBoxSize

      const newWidth = extractSize(entry, box, 'inlineSize')
      const newHeight = extractSize(entry, box, 'blockSize')

      const hasSizeChanged =
        previousSize.current.width !== newWidth ||
        previousSize.current.height !== newHeight

      if (hasSizeChanged) {
        const newSize: Size = { width: newWidth, height: newHeight }
        previousSize.current.width = newWidth
        previousSize.current.height = newHeight

        if (onResize.current) {
          onResize.current(newSize)
        }

        if (isMounted()) {
          setSize(newSize)
        }
      }
    })

    observer.observe(target, { box })

    return () => {
      observer.disconnect()
    }
  }, [box, ref, isMounted])

  return { width, height }
}

type BoxSizesKey =
  | 'borderBoxSize'
  | 'contentBoxSize'
  | 'devicePixelContentBoxSize'

function extractSize(
  entry: ResizeObserverEntry,
  box: 'border-box' | 'content-box' | 'device-pixel-content-box',
  sizeType: 'inlineSize' | 'blockSize',
): number | undefined {
  if (!entry[box]) {
    if (box === 'content-box') {
      return entry.contentRect[sizeType === 'inlineSize' ? 'width' : 'height']
    }
    return undefined
  }

  return Array.isArray(entry[box])
    ? entry[box][0][sizeType]
    : // @ts-ignore Support old browsers
      (entry[box][sizeType] as number)
}