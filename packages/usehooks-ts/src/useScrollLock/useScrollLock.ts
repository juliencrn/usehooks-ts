import { useRef } from 'react'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

/** Hook options. */
type UseScrollLockOptions = {
  /**
   * Whether to lock the scroll initially.
   * @default true
   */
  autoLock?: boolean
  /**
   * The target element to lock the scroll (default is the body element).
   * @default document.body
   */
  lockTarget?: HTMLElement | string
  /**
   * Whether to prevent width reflow when locking the scroll.
   * @default true
   */
  widthReflow?: boolean
}

/** Hook return type. */
type UseScrollLockReturn = {
  /** Lock the scroll. */
  lock: () => void
  /** Unlock the scroll. */
  unlock: () => void
}

type OriginalStyle = {
  overflow: CSSStyleDeclaration['overflow']
  paddingRight: CSSStyleDeclaration['paddingRight']
}

const IS_SERVER = typeof window === 'undefined'

/**
 * A custom hook that locks and unlocks scroll.
 * @param {UseScrollLockOptions} [options] - Options to configure the hook, by default it will lock the scroll automatically.
 * @returns {UseScrollLockReturn} - An object containing the lock and unlock functions.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-scroll-lock)
 * @example
 * ```tsx
 * // Lock the scroll when the modal is mounted, and unlock it when it's unmounted
 * useScrollLock()
 * ```
 * @example
 * ```tsx
 * // Manually lock and unlock the scroll
 * const { lock, unlock } = useScrollLock({ autoLock: false })
 *
 * return (
 *  <div>
 *   <button onClick={lock}>Lock</button>
 *   <button onClick={unlock}>Unlock</button>
 *  </div>
 * )
 * ```
 */
export function useScrollLock(
  options: UseScrollLockOptions = {},
): UseScrollLockReturn {
  const { autoLock = true, lockTarget, widthReflow = true } = options
  const target = useRef<HTMLElement | null>(null)
  const originalStyle = useRef<OriginalStyle | null>(null)

  const lock = () => {
    if (target.current) {
      const { overflow, paddingRight } = window.getComputedStyle(target.current)

      // Save the original styles
      originalStyle.current = { overflow, paddingRight }

      // Lock the scroll
      target.current.style.overflow = 'hidden'

      // prevent width reflow
      if (widthReflow) {
        const scrollbarWidth =
          target.current.offsetWidth - target.current.scrollWidth
        target.current.style.paddingRight = `${scrollbarWidth}px`
      }
    }
  }

  const unlock = () => {
    if (target.current && originalStyle.current) {
      target.current.style.overflow = originalStyle.current.overflow
      target.current.style.paddingRight = originalStyle.current.paddingRight
    }
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

  return { lock, unlock }
}
