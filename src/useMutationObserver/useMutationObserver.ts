import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

function useMutationObserver(
  elementRef: RefObject<Element>,
  config: MutationObserverInit,
) {
  const observerRef = useRef<MutationObserver | null>(null)
  const [mutationList, setMutationList] = useState<MutationRecord[]>([])

  const getMutationListByType = useCallback(
    (type: MutationRecordType) => {
      return mutationList.filter(mutation => mutation.type === type)
    },
    [mutationList],
  )

  useEffect(() => {
    const node = elementRef?.current
    if (!window.MutationObserver || !node) return

    const observer = new MutationObserver(mutationList => {
      setMutationList(mutationList)
    })

    observer.observe(node, config)
    observerRef.current = observer
  }, [elementRef, config])

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return { mutationList, getMutationListByType }
}

export default useMutationObserver
