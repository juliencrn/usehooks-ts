import { useCallback } from 'react'

import { useSessionStorage } from '../index'

export type States = 'pending' | 'ready' | 'loading'

export type Status = {
  state?: States
  message?: string
  percent?: number
}

export const defaultStatus: Status = {
  state: 'pending',
  message: '',
  percent: 0.0,
}

interface UseStatusInput {
  /**
   * initial {@link Status} to be set
   * @defaultValue {@link defaultStatus}
   */
  initialStatus?: Status
}

interface UseStatusOutput {
  status: Status
  updateStatus: (newStatus: Status) => void
}

export default function useStatus(
  defaultValue: UseStatusInput = {
    initialStatus: defaultStatus,
  },
): UseStatusOutput {
  const [status, setStatus] = useSessionStorage(
    'session-status',
    defaultValue.initialStatus ?? defaultStatus,
  )

  const updateStatus = useCallback(
    (newStatus: Status) => {
      setStatus(status => {
        return {
          ...status,
          ...newStatus,
        }
      })
    },
    [setStatus],
  )

  return { status, updateStatus }
}
