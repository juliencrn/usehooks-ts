import { useEffect, useState } from 'react'

export const useAutoSyncedState = <T>(autoUpdatingValue: T) => {
  const [state, setState] = useState(autoUpdatingValue)

  useEffect(() => {
    if (state !== autoUpdatingValue) setState(autoUpdatingValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoUpdatingValue])

  return [state, setState] as const
}
