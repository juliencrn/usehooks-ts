import { useCallback, useState } from 'react'

/**
 * Represents the type for either a Map or an array of key-value pairs.
 * @template K - The type of keys in the map.
 * @template V - The type of values in the map.
 */
export type MapOrEntries<K, V> = Map<K, V> | [K, V][]

/**
 * Represents the actions available to interact with the map state.
 * @template K - The type of keys in the map.
 * @template V - The type of values in the map.
 */
export type Actions<K, V> = {
  set: (key: K, value: V) => void
  setAll: (entries: MapOrEntries<K, V>) => void
  remove: (key: K) => void
  reset: Map<K, V>['clear']
}

/**
 * Represents the output of the `useMap` hook.
 * We hide some setters from the returned map to disable autocompletion
 * @template K - The type of keys in the map.
 * @template V - The type of values in the map.
 */
type Return<K, V> = [Omit<Map<K, V>, 'set' | 'clear' | 'delete'>, Actions<K, V>]

/**
 * Custom hook for managing a key-value map state with setter actions.
 * @template K - The type of keys in the map.
 * @template V - The type of values in the map.
 * @param {MapOrEntries<K, V>} [initialState] - The initial state of the map as a Map or an array of key-value pairs (optional).
 * @returns {Return<K, V>} A tuple containing the map state and actions to interact with the map.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-map)
 * @example
 * const [map, mapActions] = useMap();
 * // Access the `map` state and use `mapActions` to set, remove, or reset entries.
 */
export function useMap<K, V>(
  initialState: MapOrEntries<K, V> = new Map(),
): Return<K, V> {
  const [map, setMap] = useState(new Map(initialState))

  const actions: Actions<K, V> = {
    set: useCallback((key, value) => {
      setMap(prev => {
        const copy = new Map(prev)
        copy.set(key, value)
        return copy
      })
    }, []),

    setAll: useCallback(entries => {
      setMap(() => new Map(entries))
    }, []),

    remove: useCallback(key => {
      setMap(prev => {
        const copy = new Map(prev)
        copy.delete(key)
        return copy
      })
    }, []),

    reset: useCallback(() => {
      setMap(() => new Map())
    }, []),
  }

  return [map, actions]
}
