import { useEffect, useState } from 'react';

export type UseScriptStatus = 'loading' | 'ok' | 'error';

// Cached script statuses
const cachedScriptStatuses: Record<string, UseScriptStatus | undefined> = {};

function getScriptNode(src: string) {
  const node: HTMLScriptElement | null = document.querySelector(
    `script[src="${src}"]`,
  );
  const status = node?.getAttribute('data-status') as
    | UseScriptStatus
    | undefined;

  return {
    node,
    status,
  };
}

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

    return cachedScriptStatuses[src] ?? 'loading';
  });

  useEffect(
    () => {
      const cachedScriptStatus = cachedScriptStatuses[src];
      if (cachedScriptStatus === 'ok' || cachedScriptStatus === 'error') {
        // If the script is already cached, set its status immediately
        setStatus(cachedScriptStatus);
        return;
      }

      // Fetch existing script element by src
      // It may have been added by another instance of this hook
      const script = getScriptNode(src);
      let scriptNode = script.node;

      if (!scriptNode) {
        // Create script
        scriptNode = document.createElement('script');
        scriptNode.src = src;
        scriptNode.async = true;
        scriptNode.setAttribute('data-status', 'loading');

        // Add script to document body
        document.body.appendChild(scriptNode);
        // Set cached status as 'loading'
        cachedScriptStatuses[src] = 'loading';

        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event: Event) => {
          const scriptStatus: UseScriptStatus =
            event.type === 'load' ? 'ok' : 'error';

          scriptNode?.setAttribute('data-status', scriptStatus);
        };

        scriptNode.addEventListener('load', setAttributeFromEvent);
        scriptNode.addEventListener('error', setAttributeFromEvent);
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus(script.status ?? cachedScriptStatuses[src] ?? 'loading');
      }

      // Script event handler to update status in state
      // Note: Even if the script alok exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event: Event) => {
        const newStatus = event.type === 'load' ? 'ok' : 'error';
        setStatus(newStatus);
        cachedScriptStatuses[src] = newStatus;
      };

      // Add event listeners
      scriptNode.addEventListener('load', setStateFromEvent);
      scriptNode.addEventListener('error', setStateFromEvent);

      return () => {
        // Remove event listeners on cleanup
        if (scriptNode) {
          scriptNode.removeEventListener('load', setStateFromEvent);
          scriptNode.removeEventListener('error', setStateFromEvent);
        }
      };
    },
    [src], // Only re-run effect if script src changes
  );

  return status;
}
