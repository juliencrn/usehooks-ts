import { RefObject, useEffect, useState } from 'react'

/**
 * Represents the options for configuring the Intersection Observer.
 * @interface Args
 * @property {number} [threshold=0] - A threshold indicating the percentage of the target's visibility needed to trigger the callback.
 * @property {Element | null} [root=null] - The element that is used as the viewport for checking visibility of the target.
 * @property {string} [rootMargin='0%'] - A margin around the root.
 * @property {boolean} [freezeOnceVisible=false] - If true, freezes the intersection state once the element becomes visible.
 */
interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

/**
 * Custom hook for tracking the intersection of a DOM element with its containing element or the viewport.
 * @param {RefObject<Element>} elementRef - The ref object for the DOM element to observe.
 * @param {Args} options - The options for the Intersection Observer (optional).
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
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Args,
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const frozen = entry?.isIntersecting && freezeOnceVisible

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef.current // DOM Ref
    if (!node) return

    const hasIOSupport = !!window.IntersectionObserver
    if (!hasIOSupport || frozen) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => {
      observer.disconnect()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current, JSON.stringify(threshold), root, rootMargin, frozen])

  return entry
}
