import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'

// Recommended usage: move CustomEventMap to global declaration
/** Extends EventMap declarations for all DOM Elements (intersection)*/
interface CustomEventMap {
  'your-custom-event': CustomEvent<{ isCustom: boolean }>
}

/** Element as string to Matching EventMap */
type ElementToEventMap = {
  Window: [Window, WindowEventMap]
  HTMLElement: [HTMLElement, HTMLElementEventMap]
  Document: [Document, DocumentEventMap]
  MediaQueryList: [MediaQueryList, MediaQueryListEventMap]
  RTCDataChannel: [RTCDataChannel, RTCDataChannelEventMap]
  RTCPeerConnection: [RTCPeerConnection, RTCPeerConnectionEventMap]
  SpeechSynthesis: [SpeechSynthesis, SpeechSynthesisEventMap]
  SpeechSynthesisUtterance: [
    SpeechSynthesisUtterance,
    SpeechSynthesisUtteranceEventMap,
  ]
}

/** Return `T` if `M` undefined or never */
type Fallback<M, T> = [M] extends [undefined | never] ? T : M

/** Return `EventMap` type of matching element ref (from config argument)
 *  Intersected with `CustomEventMap` (from global declaration)
 *  Fallback to HTMLElement (if generic never or undefined) */
type EventMapOf<E> = Fallback<
  {
    [K in keyof ElementToEventMap]: E extends ElementToEventMap[K][0]
      ? ElementToEventMap[K][1] & CustomEventMap
      : never
  }[keyof ElementToEventMap],
  HTMLElement
>

/**
 * Custom hook that attaches event listeners to DOM elements, the window, or media query lists.
 * @template M - The type of custom Event Map (optional generic), overrides any other element to events mapping.
 * @template E - The type of the DOM element (default is `Window`).
 * @template K - The type of event name, Key of an EventMap (match for DOM element).
 * @param {K} eventName - The name of the event to listen for.
 * @param {(event: Fallback<M, EventMapOf<E>>[K]) => void} handler - The event handler function.
 * @param {RefObject<T>} config.element - A reference that specifies the DOM element to attach the event listener to.
 * @param {boolean | AddEventListenerOptions} config.options - Event listener Options.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-event-listener)
 * @example
 * ```tsx
 * // Example 1: Attach a window event listener
 * useEventListener('resize', handleResize);
 * ```
 * @example
 * ```tsx
 * // Example 2: Attach a document event listener with options
 * const element = useRef(document);
 * useEventListener('click', handleClick, { element, options: { capture: true } });
 * ```
 * @example
 * ```tsx
 * // Example 3: Attach an element event listener
 * const element = useRef<HTMLButtonElement>(null);
 * useEventListener('click', handleButtonClick, { element });
 * ```
 */
function useEventListener<
  /** Custom Event Map (optional generic)*/
  M extends Record<string, unknown> | undefined = undefined,
  /** Element Type of Optional refObject (defaults to Window) */
  E extends ElementToEventMap[keyof ElementToEventMap][0] = Window,
  /** eventName Key of type custom EventMap if present */
  K extends keyof Fallback<M, EventMapOf<E>> = keyof Fallback<M, EventMapOf<E>>,
>(
  eventName: K & string,
  handler: (event: Fallback<M, EventMapOf<E>>[K]) => void,
  config: {
    /** Litening Target (defaults to window) (supports, ref or plain Element) */
    element?: RefObject<E> | E
    /** eventListener Options */
    options?: boolean | AddEventListenerOptions
  } = {},
) {
  // Create a ref that stores handler
  const savedHandler = useRef(handler)
  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    // Define the listening target
    const targetElement: E | Window = config.element
      ? 'current' in config.element
        ? config.element.current ?? window
        : config.element
      : window

    if (!targetElement) return

    // Create event listener that calls handler function stored in ref
    const listener: EventListener = event =>
      savedHandler.current(event as Parameters<typeof handler>[0])

    targetElement.addEventListener(eventName, listener, config.options)

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, listener, config.options)
    }
  }, [eventName, config])
}

export { useEventListener }
