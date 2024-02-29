import { useEffect, useState } from 'react'

/**
 * Custom hook for determining if the code is running on the client side (in the browser).
 * @returns {boolean} A boolean value indicating whether the code is running on the client side.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-is-client)
 * @example
 * ```tsx
 * const isClient = useIsClient();
 * // Use isClient to conditionally render or execute code specific to the client side.
 * ```
 */
export function useIsClient() {
  const [isClient, setClient] = useState(false)

  useEffect(() => {
    setClient(true)
  }, [])

  return isClient
}
