import { useEffect, useState } from 'react';

export type UseScriptStatus = 'loading' | 'ok' | 'error';

/**
 * Load a script and return its status. If the script is already loaded, it will return it's load status immediately.
 * Source https://usehooks-ts.com/react-hook/use-script
 * Modified to have an initial load status.
 */
export function useScript(src: string): UseScriptStatus {
  const [status, setStatus] = useState<UseScriptStatus>(() => {
    if (typeof window === 'undefined') {
      // SSR Handling - always return 'loading'
      return 'loading';
    }

    // Grab existing script status from attribute and set to state.
    const script = document.querySelector(`script[src="${src}"]`);
    const dataStatus = script?.getAttribute('data-status') as
      | UseScriptStatus
      | undefined;

    return dataStatus || 'loading';
  });

  useEffect(
    () => {
      // Fetch existing script element by src
      // It may have been added by another instance of this hook
      let script: HTMLScriptElement | null = document.querySelector(
        `script[src="${src}"]`,
      );

      if (!script) {
        // Create script
        script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.setAttribute('data-status', 'loading');
        // Add script to document body
        document.body.appendChild(script);

        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event: Event) => {
          script?.setAttribute(
            'data-status',
            event.type === 'load' ? 'ok' : 'error',
          );
        };

        script.addEventListener('load', setAttributeFromEvent);
        script.addEventListener('error', setAttributeFromEvent);
      } else {
        // Grab existing script status from attribute and set to state.
        const scriptStatus = script.getAttribute('data-status') as
          | UseScriptStatus
          | undefined;

        setStatus(scriptStatus || 'loading');
      }

      // Script event handler to update status in state
      // Note: Even if the script alok exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event: Event) => {
        setStatus(event.type === 'load' ? 'ok' : 'error');
      };

      // Add event listeners
      script.addEventListener('load', setStateFromEvent);
      script.addEventListener('error', setStateFromEvent);

      return () => {
        // Remove event listeners on cleanup
        if (script) {
          script.removeEventListener('load', setStateFromEvent);
          script.removeEventListener('error', setStateFromEvent);
        }
      };
    },
    [src], // Only re-run effect if script src changes
  );

  return status;
}
