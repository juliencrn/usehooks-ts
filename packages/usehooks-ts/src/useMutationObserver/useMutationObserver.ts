import { useCallback, useEffect, useState } from 'react'

import type { RefObject } from 'react'

type UseMutationObserverReturn = {
  mutationList: MutationRecord[]
  getMutationListByType: (type: MutationRecordType) => MutationRecord[]
}

/**
 * Custom hook that observes and tracks changes to a DOM element using the [`MutationObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
 * @param {RefObject<Element>} elementRef - A React ref object pointing to the target element to observe.
 * @param {MutationObserverInit} config - The configuration options for the observer.
 * @returns {UseMutationObserverReturn} An object containing the latest mutation records and a helper to filter records by type.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-mutation-observer)
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * const { mutationList } = useMutationObserver(ref, {
 *   attributes: true,
 *   childList: true,
 *   subtree: true,
 * })
 * ```
 */
export function useMutationObserver(
  elementRef: RefObject<Element>,
  config: MutationObserverInit,
): UseMutationObserverReturn {
  const [mutationList, setMutationList] = useState<MutationRecord[]>([])

  const getMutationListByType = useCallback(
    (type: MutationRecordType) => {
      return mutationList.filter(
        (mutation: MutationRecord) => mutation.type === type,
      )
    },
    [mutationList],
  )

  useEffect(() => {
    const node = elementRef?.current

    if (
      typeof window === 'undefined' ||
      !('MutationObserver' in window) ||
      !node
    ) {
      return
    }

    const observer = new MutationObserver(mutations => {
      setMutationList(mutations)
    })

    observer.observe(node, config)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, config])

  return { mutationList, getMutationListByType }
}
