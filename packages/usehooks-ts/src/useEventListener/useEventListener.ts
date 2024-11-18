import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect"
import type { RefObject } from "react"
import { useEffect, useRef } from "react"

// use of CustomEventsMap at app global declaration
/** Element as string to Matching EventMap */
type ElementToEventMap = {
   Window: [Window, WindowEventMap]
   HTMLElement: [HTMLElement, HTMLElementEventMap]
   Document: [Document, DocumentEventMap]
   MediaQueryList: [MediaQueryList, MediaQueryListEventMap]
   RTCDataChannel: [RTCDataChannel, RTCDataChannelEventMap]
   RTCPeerConnection: [RTCPeerConnection, RTCPeerConnectionEventMap]
   SpeechSynthesis: [SpeechSynthesis, SpeechSynthesisEventMap]
   SpeechSynthesisUtterance: [SpeechSynthesisUtterance, SpeechSynthesisUtteranceEventMap]
}

/** Return `T` if `M` undefined */
type Fallback<M, T> = M extends undefined ? T : M

/** Return `EventMap` type of matching element ref (from config argument)
 *  Intersected with `CustomEventsMap` (from global declaration) */
type EventMapOf<E> = {
   [K in keyof ElementToEventMap]: E extends ElementToEventMap[K][0] ? ElementToEventMap[K][1] & CustomEventsMap : never
}[keyof ElementToEventMap]

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
      /** Litening Target (defaults to window) */
      ref?: RefObject<E>
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
      const targetElement: E | Window = config.ref?.current ?? window
      if (!targetElement) return

      // Create event listener that calls handler function stored in ref
      const eventListener: EventListener = (event) => savedHandler.current(event as Parameters<typeof handler>[0])

      targetElement.addEventListener(eventName, eventListener, config.options)

      // Remove event listener on cleanup
      return () => {
         targetElement.removeEventListener(eventName, eventListener)
      }
   }, [eventName, config])
}

export { useEventListener }
