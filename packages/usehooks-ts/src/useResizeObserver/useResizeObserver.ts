import { useEffect, useRef, useState } from 'react'

import type { RefObject } from 'react'

import { useIsMounted } from '../useIsMounted'

type Size = {
  width: number | undefined
  height: number | undefined
}

type BoxSizesKey = keyof Pick<
  ResizeObserverEntry,
  'borderBoxSize' | 'contentBoxSize' | 'devicePixelContentBoxSize'
>

type ResizeHandler = (size: Size) => void

type BoxOptions = 'border-box' | 'content-box' | 'device-pixel-content-box'

type UseResizeObserverOptions<T extends HTMLElement = HTMLElement> = {
  ref: RefObject<T>
  onResize?: ResizeHandler
  box?: BoxOptions
}

type UseResizeObserverResult = Size

const initialSize: Size = {
  width: undefined,
  height: undefined,
}

/**
 * Custom hook for observing the size of an element using the ResizeObserver API.
 *
 * @template T - The type of the element to observe.
 * @param {UseResizeObserverOptions<T>} options - The options for the ResizeObserver. (default is `{}`).
 * @param {RefObject<T>} options.ref - The ref of the element to observe.
 * @param {ResizeHandler} [options.onResize] - When using `onResize`, the hook doesn't re-render on element size changes; it delegates handling to the provided callback . (default is `undefined`).
 * @param {string} [options.box] - The box model to use for the ResizeObserver. (default is `'content-box'`).
 * @returns {UseResizeObserverResult} - The size of the observed element.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-resize-observer)
 * @see [MDN ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
 * @example
 * const myRef = useRef(null);
 * const { width = 0, height = 0 } = useResizeObserver({
 *   ref: myRef,
 *   box: 'content-box',
 * });
 *
 * <div ref={myRef}>Hello, world!</div>
 */
export function useResizeObserver<T extends HTMLElement = HTMLElement>(
  options: UseResizeObserverOptions<T>,
): UseResizeObserverResult {
  const { ref, box = 'content-box' } = options
  const [{ width, height }, setSize] = useState<Size>(initialSize)
  const isMounted = useIsMounted()
  const previousSize = useRef<Size>({ ...initialSize })
  const onResize = useRef<ResizeHandler | undefined>(undefined)
  onResize.current = options?.onResize

  useEffect(() => {
    if (!ref?.current) return

    if (typeof window === 'undefined' || !('ResizeObserver' in window)) return

    const observer = new ResizeObserver(([entry]) => {
      const boxProp =
        box === 'border-box'
          ? 'borderBoxSize'
          : box === 'device-pixel-content-box'
            ? 'devicePixelContentBoxSize'
            : 'contentBoxSize'

      const newWidth = extractSize(entry, boxProp, 'inlineSize')
      const newHeight = extractSize(entry, boxProp, 'blockSize')

      const hasChanged =
        previousSize.current.width !== newWidth ||
        previousSize.current.height !== newHeight

      if (hasChanged) {
        const newSize: Size = { width: newWidth, height: newHeight }
        previousSize.current.width = newWidth
        previousSize.current.height = newHeight

        if (onResize?.current) {
          onResize.current(newSize)
        } else {
          if (isMounted()) {
            setSize(newSize)
          }
        }
      }
    })

    observer.observe(ref.current, { box })

    return () => {
      observer.disconnect()
    }
  }, [box, ref, isMounted])

  return { width, height }
}

function extractSize(
  entry: ResizeObserverEntry,
  box: BoxSizesKey,
  sizeType: keyof ResizeObserverSize,
): number | undefined {
  if (!entry[box]) {
    if (box === 'contentBoxSize') {
      return entry.contentRect[sizeType === 'inlineSize' ? 'width' : 'height']
    }
    return undefined
  }

  return Array.isArray(entry[box])
    ? entry[box][0][sizeType]
    : // @ts-ignore Support Firefox's non-standard behavior
      (entry[box][sizeType] as number)
}
