import { useLayoutEffect, useRef } from 'react'

export function useLayoutLatestRef<T>(value: T): { readonly current: T } {
  const ref = useRef(value)
  useLayoutEffect(() => {
    ref.current = value
  })
  return ref
}
