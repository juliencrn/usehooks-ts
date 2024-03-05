import { useRef, useState } from 'react'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

type UseScrollLockOptions = {
  autoLock: boolean
  lockTarget: HTMLElement | string
  widthReflow: boolean
}

type UseScrollLockResult = {
  isLocked: boolean
  lock: () => void
  unlock: () => void
}

type OriginalStyle = {
  overflow: CSSStyleDeclaration['overflow']
  paddingRight: CSSStyleDeclaration['paddingRight']
}

const IS_SERVER = typeof window === 'undefined'

/**
 * A custom hook for auto/manual locking and unlocking scroll.
 * @param {UseScrollLockOptions} [options] - Options to configure the hook, by default it will lock the scroll automatically.
 * @param {boolean} [options.autoLock] - Whether to lock the scroll initially, by default it's true.
 * @param {HTMLElement | string} [options.lockTarget] - The target element to lock the scroll, by default it's the body element.
 * @param {boolean} [options.widthReflow] - Whether to prevent width reflow when locking the scroll, by default it's true.
 * @returns {UseScrollLockResult} - The result object containing the lock and unlock functions.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-scroll-lock)
 * @example
 * export default function Modal() {
 *    // Lock the scroll when the modal is mounted, and unlock it when it's unmounted
 *    useScrollLock()
 *    // ...
 * }
 *
 * @example
 * export default function App() {
 *  // Manually lock and unlock the scroll
 *  const { lock, unlock } = useScrollLock({ autoLock: false })
 *
 *  return (
 *   <div>
 *    <button onClick={lock}>Lock</button>
 *    <button onClick={unlock}>Unlock</button>
 *    <p>is Body Locked: {isLocked ? 'Yes' : 'No'}</p>
 *   </div>
 *  )
 * }
 */
export function useScrollLock(
  options: Partial<UseScrollLockOptions> = {},
): UseScrollLockResult {
  const { autoLock = true, lockTarget, widthReflow = true } = options
  const [isLocked, setIsLocked] = useState(false)
  const target = useRef<HTMLElement | null>(null)
  const originalStyle = useRef<OriginalStyle | null>(null)

  const lock = () => {
    if (target.current) {
      const { overflow, paddingRight } = target.current.style

      // Save the original styles
      originalStyle.current = { overflow, paddingRight }

      // Prevent width reflow
      if (widthReflow) {
        // Use window inner width if body is the target as global scrollbar isn't part of the document
        const offsetWidth =
          target.current === document.body
            ? window.innerWidth
            : target.current.offsetWidth
        // Get current computed padding right in pixels
        const currentPaddingRight =
          parseInt(window.getComputedStyle(target.current).paddingRight, 10) ||
          0

        const scrollbarWidth = offsetWidth - target.current.scrollWidth
        target.current.style.paddingRight = `${scrollbarWidth + currentPaddingRight}px`
      }

      // Lock the scroll
      target.current.style.overflow = 'hidden'

      setIsLocked(true)
    }
  }

  const unlock = () => {
    if (target.current && originalStyle.current) {
      target.current.style.overflow = originalStyle.current.overflow

      // Only reset padding right if we changed it
      if (widthReflow) {
        target.current.style.paddingRight = originalStyle.current.paddingRight
      }
    }

    setIsLocked(false)
  }

  useIsomorphicLayoutEffect(() => {
    if (IS_SERVER) return

    if (lockTarget) {
      target.current =
        typeof lockTarget === 'string'
          ? document.querySelector(lockTarget)
          : lockTarget
    }

    if (!target.current) {
      target.current = document.body
    }

    if (autoLock) {
      lock()
    }

    return () => {
      unlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLock, lockTarget, widthReflow])

  return { isLocked, lock, unlock }
}
