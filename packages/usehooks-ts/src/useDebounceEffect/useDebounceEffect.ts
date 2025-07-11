import { useEffect, useRef } from 'react';

/**
 * Custom hooks to debounce an effect.
 * This hook will delay the execution of the effect until after the specified delay has passed since the last time the dependencies changed.
 * It is similar to `useEffect`, but it adds a debounce mechanism.
 * @param effect The effect to run after the debounce delay.
 * @param dependencies An array of dependencies that will trigger the effect when changed.
 * @param delay The debounce delay in milliseconds.
 * @returns void
 * @public
 * @see https://usehooks-ts.com/react-hook/use-debounce-effect
 * @example
 * ```tsx
 * useDebounceEffect(() => {
 *   console.log('Effect executed after debounce delay');
 * }, [dependency1, dependency2], 500);
 * ```
 */
export function useDebounceEffect(
  effect: (...args: Array<unknown>) => void,
  dependencies: Array<unknown>,
  delay: number
) {
  const ref = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      effect();
      clearTimeout(ref.current);
    }, delay);
    return () => {
      if (ref.current) {
        clearTimeout(ref.current);
      }
    }
  }, [effect, ...dependencies, delay]);
}
