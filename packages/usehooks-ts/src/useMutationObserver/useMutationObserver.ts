import { useCallback, useEffect, useRef, useState } from 'react'

import type { RefObject } from 'react'

/** The options for the MutationObserver hook. */
type UseMutationObserverOptions<T extends Element = Element> =
  MutationObserverInit & {
    /** The ref of the element to observe. */
    ref: RefObject<T>
    /**
     * When using `onMutation`, the hook doesn't re-render on DOM changes; it delegates handling to the provided callback.
     * @default undefined
     */
    onMutation?: (mutations: MutationRecord[]) => void
  }

/** The return type of the useMutationObserver hook. */
type UseMutationObserverReturn = {
  /** The latest mutation records. */
  mutationList: MutationRecord[]
  /** Filter mutations by their type. */
  getMutationListByType: (type: MutationRecordType) => MutationRecord[]
}

/**
 * Custom hook that observes and tracks changes to a DOM element using the [`MutationObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
 * @template T - The type of the element to observe.
 * @param {UseMutationObserverOptions<T>} options - The options for the MutationObserver.
 * @returns {UseMutationObserverReturn} An object containing the latest mutation records and a helper to filter records by type.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-mutation-observer)
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * const { mutationList } = useMutationObserver({
 *   ref,
 *   attributes: true,
 *   childList: true,
 *   subtree: true,
 * })
 * ```
 */
export function useMutationObserver<T extends Element = Element>(
  options: UseMutationObserverOptions<T>,
): UseMutationObserverReturn {
  const {
    ref,
    attributes,
    attributeFilter,
    attributeOldValue,
    characterData,
    characterDataOldValue,
    childList,
    subtree,
  } = options
  const [mutationList, setMutationList] = useState<MutationRecord[]>([])
  const onMutation = useRef<
    ((mutations: MutationRecord[]) => void) | undefined
  >(undefined)
  onMutation.current = options.onMutation

  const getMutationListByType = useCallback(
    (type: MutationRecordType) => {
      return mutationList.filter(mutation => mutation.type === type)
    },
    [mutationList],
  )

  useEffect(() => {
    if (!ref.current) return

    if (!('MutationObserver' in window)) return

    const observer = new MutationObserver(mutations => {
      if (onMutation.current) {
        onMutation.current(mutations)
      } else {
        setMutationList(mutations)
      }
    })

    observer.observe(ref.current, {
      attributes,
      attributeFilter,
      attributeOldValue,
      characterData,
      characterDataOldValue,
      childList,
      subtree,
    })

    return () => {
      observer.disconnect()
    }
  }, [
    ref,
    attributes,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(attributeFilter),
    attributeOldValue,
    characterData,
    characterDataOldValue,
    childList,
    subtree,
  ])

  return { mutationList, getMutationListByType }
}
