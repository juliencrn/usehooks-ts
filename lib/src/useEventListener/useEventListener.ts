import { RefObject, useEffect, useRef } from 'react'

// See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

type EventListenerOptions = {
  // Throttle the event listener handler by X milliseconds
  throttle?: number
  // Use the Window.visualViewport as the (fallback) target element instead of the Window object
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/visualViewport
  useVisualViewport?: boolean
}

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
): void
function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: RefObject<T> | null,
  options?: EventListenerOptions,
): void

function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  T extends HTMLElement | void = void,
>(
  eventName: KW | KH,
  handler: (
    event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event,
  ) => void,
  element?: RefObject<T> | null,
  options?: EventListenerOptions,
) {
  // Create a ref that stores handler
  const savedHandler = useRef(handler)

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    // Define the listening target
    let targetElement: T | Window | VisualViewport = element?.current || window
    if (!(targetElement && targetElement.addEventListener)) {
      return
    }

    if (targetElement instanceof Window && options?.useVisualViewport) {
      targetElement = targetElement.visualViewport
    }

    // Create event listener that calls handler function stored in ref
    let eventListener: typeof handler = event => savedHandler.current(event)

    // Optional event listener handler throttling
    if (options?.throttle && !isNaN(options.throttle)) {
      eventListener = throttle(eventListener, options.throttle)
    }

    targetElement.addEventListener(eventName, eventListener)

    // Remove event listener on cleanup
    return () => {
      if (targetElement !== undefined) {
        targetElement.removeEventListener(eventName, eventListener)
      }
    }
  }, [eventName, element, options])
}

/* eslint-disable */
type ThrottledFunction<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>

function throttle<T extends (...args: any) => any>(
  func: T,
  limit: number,
): ThrottledFunction<T> {
  let inThrottle: boolean
  let lastResult: ReturnType<T>

  return function (this: any): ReturnType<T> {
    const args = arguments as any
    const context = this

    if (!inThrottle) {
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
      lastResult = func.apply(context, args)
    }

    return lastResult
  }
}
/* eslint-enable */

export default useEventListener
