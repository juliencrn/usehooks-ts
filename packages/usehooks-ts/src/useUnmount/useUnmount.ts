import { useEffect, useRef } from 'react'

/**
 * Hook that runs a cleanup function when the component is unmounted.
 * @param {() => void} func - The cleanup function to be executed on unmount.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-unmount)
 * @example
 * // Usage in a functional component
 * useUnmount(() => {
 *   // Cleanup logic here
 * });
 */
export function useUnmount(func: () => void) {
  const funcRef = useRef(func)

  funcRef.current = func

  useEffect(
    () => () => {
      funcRef.current()
    },
    [],
  )
}
