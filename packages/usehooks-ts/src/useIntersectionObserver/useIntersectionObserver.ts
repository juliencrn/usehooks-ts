import { useEffect, useRef, useState } from 'react'

import type { RefObject } from 'react'

type State = {
  isIntersecting: boolean
  entry?: IntersectionObserverEntry
}

type ObserverCallback = (
  isIntersecting: boolean,
  entry: IntersectionObserverEntry,
) => void

/**
 * Represents the options for configuring the Intersection Observer.
 * @interface IntersectionObserverOptions
 * @property {number | number[]} [threshold=0] - A threshold indicating the percentage of the target's visibility needed to trigger the callback.
 * @property {Element | Document | null} [root=null] - The element that is used as the viewport for checking visibility of the target.
 * @property {string} [rootMargin='0%'] - A margin around the root.
 * @property {boolean} [freezeOnceVisible=false] - If true, freezes the intersection state once the element becomes visible.
 * @property {ObserverCallback} [onChange] - A callback function to be invoked when the intersection state changes.
 * @property {boolean} [initialIsIntersecting=false] - The initial state of the intersection.
 */
interface IntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
  onChange?: ObserverCallback
  initialIsIntersecting?: boolean
}

/** Supports both array and object destructing */
type IntersectionResult = [
  (node?: Element | null) => void,
  boolean,
  IntersectionObserverEntry | undefined,
] & {
  ref: (node?: Element | null) => void
  isIntersecting: boolean
  entry?: IntersectionObserverEntry
}

/**
 * Custom hook for tracking the intersection of a DOM element with its containing element or the viewport.
 * @param {IntersectionObserverOptions} options - The options for the Intersection Observer.
 * @returns {IntersectionResult} The ref callback, a boolean indicating if the element is intersecting, and the intersection observer entry.
 *  * @see [Documentation](https://usehooks-ts.com/react-hook/use-intersection-observer)
 * @see [MDN Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
 * @example
 * // Example 1
 * const [ref, isIntersecting, entry] = useIntersectionObserver({ threshold: 0.5 });
 *
 * // Example 2
 * const { ref, isIntersecting, entry } = useIntersectionObserver({ threshold: 0.5 });
 */
export function useIntersectionObserver(
  options: IntersectionObserverOptions,
): IntersectionResult
/**
 * @deprecated Use the new signature with an unique option object instead.
 * Custom hook for tracking the intersection of a DOM element with its containing element or the viewport.
 * @param {RefObject<Element>} elementRef - The ref object for the DOM element to observe.
 * @param {IntersectionObserverOptions} [options] - The options for the Intersection Observer (optional).
 * @returns {IntersectionObserverEntry | undefined} The intersection observer entry representing the state of the intersection.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-intersection-observer)
 * @see [MDN Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
 * @example
 * const targetRef = useRef<HTMLDivElement>(null);
 * const options = { threshold: 0.5 };
 * const entry = useIntersectionObserver(targetRef, options);
 * // Access the intersection details from the entry variable.
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  legacyOptions: IntersectionObserverOptions,
): IntersectionObserverEntry | undefined
/**
 * Custom hook for tracking the intersection of a DOM element with its containing element or the viewport.
 * @param {IntersectionObserverOptions | RefObject<Element>} optionsOrLegacyRef - The options for the Intersection Observer.
 * @param {?IntersectionObserverOptions} [legacyOptions] - The options for the Intersection Observer (optional, legacy).
 * @returns {NewIntersectionResult | IntersectionObserverEntry | undefined} The ref callback, a boolean indicating if the element is intersecting, and the intersection observer entry.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-intersection-observer)
 * @see [MDN Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
 * @example
 * // Example 1
 * const [ref, isIntersecting, entry] = useIntersectionObserver({ threshold: 0.5 });
 *
 * // Example 2
 * const { ref, isIntersecting, entry } = useIntersectionObserver({ threshold: 0.5 });
 */
export function useIntersectionObserver(
  optionsOrLegacyRef: IntersectionObserverOptions | RefObject<Element>,
  legacyOptions?: IntersectionObserverOptions,
): IntersectionResult | IntersectionObserverEntry | undefined {
  // TODO: Remove this mess when the old signature is removed.
  const isLegacySignature = 'current' in optionsOrLegacyRef
  const options = isLegacySignature ? legacyOptions : optionsOrLegacyRef
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
    initialIsIntersecting = false,
  } = options ?? {}

  const [newRef, setNewRef] = useState<Element | null>(null)
  const ref = isLegacySignature ? optionsOrLegacyRef.current : newRef

  const [state, setState] = useState<State>(() => ({
    isIntersecting: initialIsIntersecting,
    entry: undefined,
  }))

  const callbackRef = useRef<ObserverCallback>()

  callbackRef.current = options?.onChange

  const frozen = state.entry?.isIntersecting && freezeOnceVisible

  useEffect(() => {
    // Ensure we have a ref to observe
    if (!ref) return

    // Ensure the browser supports the Intersection Observer API
    if (!('IntersectionObserver' in window)) return

    // Skip if frozen
    if (frozen) return

    let unobserve: (() => void) | undefined

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        const thresholds = Array.isArray(observer.thresholds)
          ? observer.thresholds
          : [observer.thresholds]

        entries.forEach(entry => {
          const isIntersecting =
            entry.isIntersecting &&
            thresholds.some(threshold => entry.intersectionRatio >= threshold)

          setState({ isIntersecting, entry })

          if (callbackRef.current) {
            callbackRef.current(isIntersecting, entry)
          }

          if (isIntersecting && freezeOnceVisible && unobserve) {
            unobserve()
            unobserve = undefined
          }
        })
      },
      { threshold, root, rootMargin },
    )

    observer.observe(ref)

    return () => {
      observer.disconnect()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ref,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(threshold),
    root,
    rootMargin,
    frozen,
    freezeOnceVisible,
  ])

  // ensures that if the observed element changes, the intersection observer is reinitialized
  const prevRef = useRef<Element | null>(null)

  useEffect(() => {
    if (
      !ref &&
      state.entry?.target &&
      !freezeOnceVisible &&
      !frozen &&
      prevRef.current !== state.entry.target
    ) {
      prevRef.current = state.entry.target
      setState({ isIntersecting: initialIsIntersecting, entry: undefined })
    }
  }, [ref, state.entry, freezeOnceVisible, frozen, initialIsIntersecting])

  if (isLegacySignature) {
    return state.entry
  }

  const result = [
    setNewRef,
    !!state.isIntersecting,
    state.entry,
  ] as IntersectionResult

  // Support object destructuring, by adding the specific values.
  result.ref = result[0]
  result.isIntersecting = result[1]
  result.entry = result[2]

  return result
}
