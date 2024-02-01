import { useEffect } from 'react'

import type { DependencyList, EffectCallback } from 'react'

import { useIsFirstRender } from '../useIsFirstRender'

/**
 * Custom hook that runs an effect only on updates (not on the initial render).
 * @param {EffectCallback} effect - The function to run as the effect.
 * @param {DependencyList} [deps] - An optional array of dependencies for the effect.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-update-effect)
 * @example
 * // Usage of useUpdateEffect hook
 * useUpdateEffect(() => {
 *   // Effect code to run on updates
 *   console.log('Component updated!');
 * }, [dependency1, dependency2]);
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender()

  useEffect(() => {
    if (!isFirst) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
