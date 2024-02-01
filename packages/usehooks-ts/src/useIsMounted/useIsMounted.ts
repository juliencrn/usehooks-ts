import { useCallback, useEffect, useRef } from 'react'

/**
 * Custom hook for determining if the component is currently mounted.
 * @returns {() => boolean} A function that returns a boolean value indicating whether the component is mounted.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-is-mounted)
 * @example
 * const isComponentMounted = useIsMounted();
 * // Use isComponentMounted() to check if the component is currently mounted before performing certain actions.
 */
export function useIsMounted() {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}
