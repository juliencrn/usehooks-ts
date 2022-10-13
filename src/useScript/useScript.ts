import { useEffect, useState } from 'react'

export type UseScriptStatus = 'idle' | 'loading' | 'ready' | 'error'
export interface UseScriptOptions {
  shouldPreventLoad?: boolean
  removeOnUnmount?: boolean
}

// Cached script statuses
const cachedScriptStatuses: Record<string, UseScriptStatus | undefined> = {}

function getScriptNode(src: string) {
  const node: HTMLScriptElement | null = document.querySelector(
    `script[src="${src}"]`,
  )
  const status = node?.getAttribute('data-status') as
    | UseScriptStatus
    | undefined

  return {
    node,
    status,
  }
}

function useScript(
  src: string | null,
  options?: UseScriptOptions,
): UseScriptStatus {
  const [status, setStatus] = useState<UseScriptStatus>(() => {
    if (!src || options?.shouldPreventLoad) {
      return 'idle'
    }

    if (typeof window === 'undefined') {
      // SSR Handling - always return 'loading'
      return 'loading'
    }

    return cachedScriptStatuses[src] ?? 'loading'
  })

  useEffect(() => {
    if (!src || options?.shouldPreventLoad) {
      return
    }

    const cachedScriptStatus = cachedScriptStatuses[src]
    if (cachedScriptStatus === 'ready' || cachedScriptStatus === 'error') {
      // If the script is already cached, set its status immediately
      setStatus(cachedScriptStatus)
      return
    }

    // Fetch existing script element by src
    // It may have been added by another instance of this hook
    const script = getScriptNode(src)
    let scriptNode = script.node

    if (!scriptNode) {
      // Create script element and add it to document body
      scriptNode = document.createElement('script')
      scriptNode.src = src
      scriptNode.async = true
      scriptNode.setAttribute('data-status', 'loading')
      document.body.appendChild(scriptNode)

      // Store status in attribute on script
      // This can be read by other instances of this hook
      const setAttributeFromEvent = (event: Event) => {
        const scriptStatus: UseScriptStatus =
          event.type === 'load' ? 'ready' : 'error'

        scriptNode?.setAttribute('data-status', scriptStatus)
      }

      scriptNode.addEventListener('load', setAttributeFromEvent)
      scriptNode.addEventListener('error', setAttributeFromEvent)
    } else {
      // Grab existing script status from attribute and set to state.
      setStatus(script.status ?? cachedScriptStatus ?? 'loading')
    }

    // Script event handler to update status in state
    // Note: Even if the script already exists we still need to add
    // event handlers to update the state for *this* hook instance.
    const setStateFromEvent = (event: Event) => {
      const newStatus = event.type === 'load' ? 'ready' : 'error'
      setStatus(newStatus)
      cachedScriptStatuses[src] = newStatus
    }

    // Add event listeners
    scriptNode.addEventListener('load', setStateFromEvent)
    scriptNode.addEventListener('error', setStateFromEvent)

    // Remove event listeners on cleanup
    return () => {
      if (scriptNode) {
        scriptNode.removeEventListener('load', setStateFromEvent)
        scriptNode.removeEventListener('error', setStateFromEvent)
      }

      if (scriptNode && options?.removeOnUnmount) {
        scriptNode.remove()
      }
    }
  }, [src, options?.shouldPreventLoad, options?.removeOnUnmount])

  return status
}

export default useScript
