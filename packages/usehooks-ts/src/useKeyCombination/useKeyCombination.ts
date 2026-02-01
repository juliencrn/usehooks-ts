import { useEffect, useRef, useCallback } from 'react'

type EventTarget = Window | HTMLElement | null

/**
 * Options for configuring the useKeyCombination hook.
 */
interface UseKeyCombinationOptions {
  /** The target element to attach event listeners to. @defaultValue window */
  eventTarget?: EventTarget
  /** Whether to prevent the default event behavior. @defaultValue true */
  preventDefault?: boolean
}

/**
 * Detects when a specific combination of keys is pressed simultaneously.
 *
 * @param combo - Array of keys that must be pressed together (e.g., ['Control', 's'])
 * @param handler - Callback function to execute when the combination is detected
 * @param options - Configuration options for the hook
 *
 * @example
 * ```tsx
 * useKeyCombination(['Control', 's'], () => saveDocument())
 * ```
 *
 * @example
 * ```tsx
 * useKeyCombination(['Meta', 'k'], () => openCommandPalette(), {
 *   preventDefault: true
 * })
 * ```
 *
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-key-combination)
 */
export function useKeyCombination(
  combo: string[],
  handler: () => void,
  options: UseKeyCombinationOptions = {},
): void {
  const {
    eventTarget = typeof window !== 'undefined' ? window : null,
    preventDefault = true,
  } = options

  // Use ref to track pressed keys without causing re-renders
  const pressedKeysRef = useRef<Set<string>>(new Set())
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    if (!eventTarget) return

    const pressedKeys = pressedKeysRef.current

    const checkAndTrigger = () => {
      const requiredKeys = combo.map(k => k.toLowerCase())
      const allPressed = requiredKeys.every(key => pressedKeys.has(key))
      if (allPressed) {
        handlerRef.current()
      }
    }

    const handleKeyDown = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent
      const key = keyboardEvent.key.toLowerCase()

      if (preventDefault) {
        keyboardEvent.preventDefault()
      }

      pressedKeys.add(key)
      checkAndTrigger()
    }

    const handleKeyUp = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent
      const key = keyboardEvent.key.toLowerCase()
      pressedKeys.delete(key)
    }

    eventTarget.addEventListener('keydown', handleKeyDown)
    eventTarget.addEventListener('keyup', handleKeyUp)

    return () => {
      eventTarget.removeEventListener('keydown', handleKeyDown)
      eventTarget.removeEventListener('keyup', handleKeyUp)
    }
  }, [combo, eventTarget, preventDefault])
}
