import { useCallback, useLayoutEffect, useState } from 'react'

type ValueWrapper<T> = {
  value: T
  resolve?: (value: T) => void
}

type SetterFunction<T> = (value: T) => T
type Setter<T> = T | SetterFunction<T>

type InitialValueFunction<T> = () => T
type InitialValue<T> = T | InitialValueFunction<T>

const useStateAsync = <T>(
  initialValue: InitialValue<T>,
): [T, (setter: Setter<T>) => Promise<T>] => {
  const [valueWrapper, setValueWrapper] = useState<ValueWrapper<T>>(() => {
    const value =
      typeof initialValue === 'function'
        ? (initialValue as InitialValueFunction<T>)()
        : initialValue

    return { value }
  })

  const setValue = useCallback(
    (setter: Setter<T>) =>
      new Promise<T>(resolve =>
        setValueWrapper(valueWrapper => {
          valueWrapper.resolve?.(valueWrapper.value)

          const value =
            typeof setter === 'function'
              ? (setter as SetterFunction<T>)(valueWrapper.value)
              : setter

          return { value, resolve }
        }),
      ),
    [setValueWrapper],
  )

  useLayoutEffect(() => {
    valueWrapper.resolve?.(valueWrapper.value)
  }, [valueWrapper])

  return [valueWrapper.value, setValue]
}

export default useStateAsync
