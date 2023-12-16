import { useDebugValue } from 'react'
import { useSyncExternalStore } from 'use-sync-external-store/shim'

const subscribe = (onStoreChange: () => void) => {
  document.addEventListener('visibilitychange', onStoreChange)
  return () => document.removeEventListener('visibilitychange', onStoreChange)
}

const getSnapshot = () => document.visibilityState

const getServerSnapshot = () => 'hidden' as DocumentVisibilityState

export const useVisibilityState = () => {
  const visibilityState = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  useDebugValue(visibilityState)

  return visibilityState
}
