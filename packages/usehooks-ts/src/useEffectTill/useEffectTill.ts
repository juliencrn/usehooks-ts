import { DependencyList, useEffect, useRef } from 'react'

/**
 * This is the type of callback that is passed to useEffectTill.
 */
export type EffectTillDone = () => void
/**
 * This is the type of function that is returned from `EffectTillCallback`.
 */
export type EffectTillDestructor = () => void
/**
 * Type definition for the callback function used in useEffectTill.
 * @param done - The `done` parameter is a callback function that must be called when the effect is done.
 * @returns The destructor function to clean up the effect.
 */
export type EffectTillCallback = (
  done: EffectTillDone,
) => void | EffectTillDestructor

/**
 * The `useEffectTill` function is a custom hook that runs an effect only until it is done and cleans
 * up after it.
 * @param effect - The `effect` parameter is a callback function that will be
 * executed once when the component mounts. It can optionally return a cleanup function that will be
 * executed when the component unmounts.
 * @param deps - The `deps` parameter is an optional array of dependencies. It is
 * similar to the dependencies array used in the regular `useEffect` hook. If provided, the effect will
 * only be re-run if any of the dependencies in the array have changed since the last render.
 * @example
 * ```ts
 * useEffectTill((done) =>  {
 *  if (data) {
 *   // Do something.
 *      done();
 *   }
 * }, [data]);
 * ```
 */
export const useEffectTill = (
  effect: EffectTillCallback,
  deps?: DependencyList,
) => {
  /**
   * This is a ref that is used to track if the effect has already run.
   * @internal
   */
  const hasRun = useRef(false)
  /**
   * This is a callback that is called when the effect has been completed.
   * @internal
   */
  const handleComplete = () => {
    hasRun.current = true
  }

  useEffect(() => {
    // 1. Create a ref to track the effect's destructor
    let destructor: EffectTillDestructor = () => undefined

    // 2. If the effect hasn't run yet, run it
    if (!hasRun.current) {
      // 3. Run the effect, and store the destructor
      const result = effect(handleComplete)
      if (typeof result === 'function') {
        destructor = result
      }
    }
    // 4. Return the destructor function so it can be cleaned up.
    return destructor
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
