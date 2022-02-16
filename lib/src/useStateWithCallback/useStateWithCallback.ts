import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

export default function useStateWithCallback<T>(
  initValue: T,
  callback: () => void = () => null,
): [T, Dispatch<SetStateAction<T>>, MutableRefObject<() => void>] {
  const [value, setValue] = useState<T>(initValue)
  const func = useRef(callback)

  useEffect(() => {
    func.current()
  }, [value])

  return [value, setValue, func]
}
