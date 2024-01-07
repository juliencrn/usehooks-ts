import { useEffect, useRef } from 'react'

type UseDetectChangesOutput<T> = {
  [K in keyof T]: [T[K], T[K]]
}

export function useDetectChanges<T extends Record<string, any>>(
  values: T,
): UseDetectChangesOutput<T> {
  const prevValues = useRef(values)

  useEffect(() => {
    prevValues.current = values
  })

  return (Object.entries(prevValues.current) as [keyof T, T[keyof T]][]).reduce(
    (acc, [key, value]) => {
      if (value !== values[key]) {
        acc[key] = [value, values[key]]
      }
      return acc
    },
    {} as UseDetectChangesOutput<T>,
  )
}
