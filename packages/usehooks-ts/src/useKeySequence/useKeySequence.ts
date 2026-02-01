import { useEffect, useRef } from 'react'

type EventTarget = Window | HTMLElement | null

/**
 * Options for configuring the useKeySequence hook.
 */
interface UseKeySequenceOptions {
  /** Maximum time (ms) between key presses to still count as a sequence. @defaultValue 1000 */
  timeout?: number
  /** The target element to attach event listeners to. @defaultValue window */
  eventTarget?: EventTarget
}

/**
 * Detects when a specific sequence of keys is typed in order.
 * Useful for implementing cheat codes or keyboard shortcuts like "konami".
 *
 * @param sequence - The key sequence to detect (e.g., 'hello')
 * @param handler - Callback function to execute when the sequence is detected
 * @param options - Configuration options for the hook
 *
 * @example
 * ```tsx
 * useKeySequence('hello', () => console.log('Hello!'))
 * ```
 *
 * @example
 * ```tsx
 * useKeySequence('up up down down left right left right b a', () => {
 *   activateCheatCode()
 * }, { timeout: 2000 })
 * ```
 *
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-key-sequence)
 */
export function useKeySequence(
  sequence: string,
  handler: () => void,
  options: UseKeySequenceOptions = {},
): void {
  const { timeout = 1000, eventTarget = typeof window !== 'undefined' ? window : null } = options

  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    if (!eventTarget || !sequence) return

    let currentSequence = ''
    let timeoutId: ReturnType<typeof setTimeout>

    const handleKeyDown = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent
      const key = keyboardEvent.key.toLowerCase()
      const nextChar = sequence[currentSequence.length]?.toLowerCase()

      if (key === nextChar) {
        currentSequence += key
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          currentSequence = ''
        }, timeout)

        if (currentSequence === sequence.toLowerCase()) {
          handlerRef.current()
          currentSequence = ''
        }
      } else {
        currentSequence = ''
      }
    }

    eventTarget.addEventListener('keydown', handleKeyDown)

    return () => {
      eventTarget.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timeoutId)
    }
  }, [sequence, timeout, eventTarget])
}
