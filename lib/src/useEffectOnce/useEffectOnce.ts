import { EffectCallback, useEffect, useRef } from 'react'

function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const destroyFunc = useRef<void | any>()
  const calledOnce = useRef(false)
  const renderAfterCalled = useRef(false)

  if (calledOnce.current) {
    renderAfterCalled.current = true
  }

  useEffect(() => {
    if (calledOnce.current) {
      return
    }

    calledOnce.current = true
    destroyFunc.current = effect()

    return () => {
      if (!renderAfterCalled.current) {
        return
      }

      if (destroyFunc.current) {
        destroyFunc.current()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useEffectOnce
