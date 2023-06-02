import { RefObject, useEffect, useRef } from 'react'
import { useIsomorphicLayoutEffect } from '..'

export type Options = {
    condition?: boolean;
    raw?: boolean | AddEventListenerOptions;
};

// MediaQueryList Event based useEventListener interface
function useEventListener<K extends keyof MediaQueryListEventMap>(
    eventName: K,
    handler: (event: MediaQueryListEventMap[K]) => void,
    element: RefObject<MediaQueryList>,
    options?: Options
): void;

// Window Event based useEventListener interface
function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    element?: undefined,
    options?: Options
): void;

// Element Event based useEventListener interface
function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    element: RefObject<T>,
    options?: Options
): void;

// Document Event based useEventListener interface
function useEventListener<K extends keyof DocumentEventMap>(
    eventName: K,
    handler: (event: DocumentEventMap[K]) => void,
    element: RefObject<Document>,
    options?: Options
    ): void;

function useEventListener<
    KW extends keyof WindowEventMap,
    KD extends keyof DocumentEventMap,
    KH extends keyof HTMLElementEventMap,
    KM extends keyof MediaQueryListEventMap,
    T extends HTMLElement | MediaQueryList | Document | void = void
>(
    eventName: KW | KH | KM | KD,
    handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | MediaQueryListEventMap[KM] | DocumentEventMap[KD] | Event) => void,
    element?: RefObject<T>,
    options?: Options
) {
    // Create a ref that stores handler
    const savedHandler = useRef(handler);

    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        if (options?.condition === false) return;

        // Define the listening target
        const targetElement: T | Window = element?.current ?? window;

        if (!(targetElement && targetElement?.addEventListener)) return;

        // Create event listener that calls handler function stored in ref
        const listener: typeof handler = (e) => savedHandler.current(e);

        targetElement.addEventListener(eventName, listener, options?.raw);

        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, listener);
        };
    }, [eventName, element, options]);
}

export default useEventListener;
