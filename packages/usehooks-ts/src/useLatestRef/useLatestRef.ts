import { useEffect, useRef } from 'react'

export function useLatestRef<T>(value: T): { readonly current: T } {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  })
  return ref
}
