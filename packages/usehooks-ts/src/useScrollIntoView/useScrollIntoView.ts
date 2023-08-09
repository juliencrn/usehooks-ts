import { useEffect, useRef } from 'react'

import { useBoolean } from '..'

export function useScrollIntoView<T extends Element>(
  options?: ScrollIntoViewOptions,
): [React.RefObject<T>, () => void] {
  const ref = useRef<T>(null)
  const shouldScroll = useBoolean(false)

  useEffect(() => {
    if (ref.current && shouldScroll.value) {
      ref.current?.scrollIntoView({ behavior: 'smooth', ...options })
      shouldScroll.setFalse()
    }
  }, [shouldScroll, options])

  return [ref, shouldScroll.setTrue]
}
