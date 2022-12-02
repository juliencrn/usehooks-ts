import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

const isDeepEqual = (deps1: DependencyList, deps2: DependencyList) => {
  if (!isObject(deps1) || !isObject(deps2)) {
    return deps1 === deps2
  }
  const depsKeys1 = Object.keys(deps1)
  const depsKeys2 = Object.keys(deps2)

  if (depsKeys1.length !== depsKeys2.length) return false

  for (const key in deps1) {
    const value1 = deps1[key]
    const value2 = deps2[key]

    const isObjects = isObject(value1) && isObject(value2)

    if (
      (isObjects && !isDeepEqual(value1, value2)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false
    }
  }
  return true
}

const isObject = (object: unknown) => {
  return object != null && typeof object === 'object'
}

function useIsDeepEqualEffect(effect: EffectCallback, deps: DependencyList) {
  const depsRef = useRef<DependencyList>([])
  if (!depsRef.current || !isDeepEqual(depsRef.current, deps)) {
    depsRef.current = deps
  }
  useEffect(() => {
    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depsRef.current)
}

export default useIsDeepEqualEffect
