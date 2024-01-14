import { RefObject, useEffect, useRef } from 'react'

export function useFocus(): RefObject<HTMLInputElement> {
  // This is a reference to the element that should be on focus.
  const elementRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focusing on the element.
    elementRef.current?.focus()
  }, [])

  // Returning the reference so it can be used in the element that should be on focus.
  return elementRef
}
