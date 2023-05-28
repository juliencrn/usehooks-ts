import { useEffect, useState } from 'react'
import useUpdateEffect from '../useUpdateEffect/useUpdateEffect'

type Cb = (...args: any[]) => any
type SetValueFn<T> = (newStateValue: T, cb?: Cb) => void

function useStateSync<T>(initialValue: T): [T, SetValueFn<T>] {
  const [stateValue, setStateValue] = useState<T>(initialValue)
  let callback: Cb | undefined

  const setValue = (newStateValue: T, cb?: Cb) => {
    if (cb) {
      callback = cb
    }
    setStateValue(() => {
      return newStateValue
    })
  }

  useUpdateEffect(() => {
    if (callback) {
      callback(stateValue)
    }
  }, [stateValue])

  return [stateValue, setValue]
}

export default useStateSync
