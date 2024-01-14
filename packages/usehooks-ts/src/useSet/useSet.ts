import { useCallback, useState } from 'react'

interface Actions<T> {
  add: (v: T) => void
  delete: (v: T) => void
  clear: () => void
}

type Return<T> = [Set<T>, Actions<T>]
export type InitialState<T> = Array<T>

export function useSet<T = string>(initialState?: InitialState<T>): Return<T> {
  const [set, setSet] = useState<Set<T>>(new Set(initialState ?? []))

  const actions: Actions<T> = {
    add: useCallback((v: T) => {
      setSet(prev => {
        const copy = new Set([...Array.from(prev)])
        copy.add(v)

        return copy
      })
    }, []),

    delete: useCallback((v: T) => {
      setSet(prev => {
        const copy = new Set([...Array.from(prev)])
        copy.delete(v)

        return copy
      })
    }, []),

    clear: useCallback(() => {
      setSet(prev => {
        const copy = new Set([...Array.from(prev)])
        copy.clear()
        return copy
      })
    }, []),
  }

  return [set, actions]
}
