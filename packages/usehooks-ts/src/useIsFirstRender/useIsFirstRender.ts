import { useRef } from 'react'

/**
 * @deprecated - Don't use this hook, it's an anti-pattern.
 * Custom hook for determining if the component is rendering for the first time.
 * @returns {boolean} A boolean value indicating whether the component is rendering for the first time.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-is-first-render)
 * @example
 * const isFirstRender = useIsFirstRender();
 * // Use isFirstRender to conditionally execute code only on the initial render.
 */
export function useIsFirstRender(): boolean {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}
