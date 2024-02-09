import { useLayoutEffect, useRef, useState } from 'react'

interface UseScrollLockOptions {
  autoLock: boolean
  lockTarget: HTMLElement | string
}

interface UseScrollLockResult {
  lock: () => void
  unlock: () => void
  isLocked: boolean
}

const IS_SERVER = typeof window === 'undefined'

/**
 * A custom hook for auto/manual locking and unlocking scroll.
 * @param {UseScrollLockOptions} [options] - Options to configure the hook, by default it will lock the scroll automatically.
 * @returns {UseScrollLockResult} - The result object containing the lock, unlock and isLocked state.
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
 *  const { lock, unlock, isLocked } = useScrollLock({ autoLock: false })
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
  const { autoLock = true, lockTarget } = options
  const [isLocked, setIsLocked] = useState(false)
  const target = useRef<HTMLElement | null>(null)
  const originalStyle = useRef<string>('')

  const lock = () => {
    if (target.current) {
      originalStyle.current = window.getComputedStyle(target.current).overflow
      target.current.style.overflow = 'hidden'
      setIsLocked(true)
    }
  }

  const unlock = () => {
    if (target.current) {
      target.current.style.overflow = originalStyle.current
      setIsLocked(false)
    }
  }

  useLayoutEffect(
    () => {
      if (IS_SERVER) return

      if (lockTarget) {
        if (typeof lockTarget === 'string') {
          target.current = document.querySelector(lockTarget)
          if (!target.current) {
            console.error(
              `[useScrollLock] Can't find the target element with selector: ${lockTarget}, fallback to document.body`,
            )
          }
        } else {
          target.current = lockTarget
        }
      }

      if (!target.current) {
        target.current = document.body
      }

      if (autoLock) lock()

      return () => {
        if (autoLock) unlock()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [target, autoLock, lockTarget],
  )

  return { lock, unlock, isLocked }
}
