import { useEffect, useRef } from 'react'

/**
 * Custom hook for counting the number of times a component has rendered
 * @param {string} [name] - The name of the component
 * @returns {number} - The number of times the component has rendered
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-render-count)
 * @example
 * const value = useRenderCount();
 *
 * console.log(value); // 1
 */
export function useRenderCount(name?: string): number {
  const componentName = useRef<string>(
    name ??
      new Error().stack
        ?.split('\n')[2]
        .trim()
        .match(/^at (.+) \(/)?.[1] ??
      '',
  )
  const renderCount = useRef<number>(0)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return

    console.log(
      `[${componentName.current}] Component has rendered: ${renderCount.current} times`,
    )
  })

  renderCount.current += 1
  return renderCount.current
}
