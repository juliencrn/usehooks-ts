import { useEffect, useState } from 'react'

type EventTarget = Window | HTMLElement | null

/**
 * Options for configuring the useKeyPress hook.
 */
interface UseKeyPressOptions {
  /** Event types to listen to. @defaultValue ['keydown', 'keyup'] */
  eventTypes?: Array<'keydown' | 'keyup' | 'keypress'>
  /** The target element to attach event listeners to. @defaultValue window */
  eventTarget?: EventTarget
  /** Whether to prevent the default event behavior. @defaultValue false */
  preventDefault?: boolean
}

/**
 * Tracks whether a specific key is currently pressed.
 *
 * @param targetKey - The key to track (e.g., 'Escape', 'a', 'ArrowUp')
 * @param options - Configuration options for the hook
 * @returns Whether the target key is currently pressed
 *
 * @example
 * ```tsx
 * const isPressed = useKeyPress('Escape')
 * ```
 *
 * @example
 * ```tsx
 * const isPressed = useKeyPress('a', { preventDefault: true })
 * ```
 *
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-key-press)
 */
export function useKeyPress(
  targetKey: string,
  options: UseKeyPressOptions = {},
): boolean {
  const {
    eventTypes = ['keydown', 'keyup'],
    eventTarget = typeof window !== 'undefined' ? window : null,
    preventDefault = false,
  } = options

  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (!eventTarget) return

    const handleEvent = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent
      const key = keyboardEvent.key.toLowerCase()
      const targetStr = targetKey?.toLowerCase?.() ?? targetKey

      if (key === targetStr || key === targetKey) {
        if (preventDefault) {
          keyboardEvent.preventDefault()
        }

        if (keyboardEvent.type === 'keydown' && !keyboardEvent.repeat) {
          setPressed(true)
        } else if (keyboardEvent.type === 'keyup') {
          setPressed(false)
        }
      }
    }

    for (const eventType of eventTypes) {
      eventTarget.addEventListener(eventType, handleEvent)
    }

    return () => {
      for (const eventType of eventTypes) {
        eventTarget.removeEventListener(eventType, handleEvent)
      }
    }
  }, [targetKey, preventDefault, eventTarget, eventTypes])

  return pressed
}
