import { act, renderHook } from '@testing-library/react-hooks/dom'

import useStatus, { defaultStatus, Status } from './useStatus'

describe('useStatus()', () => {
  test('should use default status if no status provided', () => {
    const { result } = renderHook(() => useStatus())

    expect(result.current.status).toStrictEqual(defaultStatus)
    expect(typeof result.current.status).toStrictEqual(typeof defaultStatus)
    expect(typeof result.current.updateStatus).toStrictEqual('function')
  })
  test('should use provided status when provided', () => {
    const initialStatus: Status = {
      state: 'ready',
      message: 'complete!',
      percent: 1.0,
    }

    const { result } = renderHook(() => useStatus({ initialStatus }))

    expect(result.current.status).toStrictEqual(initialStatus)
    expect(typeof result.current.status).toStrictEqual(typeof initialStatus)
    expect(typeof result.current.updateStatus).toStrictEqual('function')
  })
  test('should be able to update status state', () => {
    const { result } = renderHook(() => useStatus())

    expect(result.current.status.state).toStrictEqual(defaultStatus.state)

    act(() => {
      result.current.updateStatus({ state: 'ready' })
    })

    expect(result.current.status.state).not.toStrictEqual(defaultStatus.state)
    expect(result.current.status.state).toStrictEqual('ready')
  })
  test('should be able to update status message', () => {
    const { result } = renderHook(() => useStatus())

    expect(result.current.status.message).toStrictEqual(defaultStatus.message)

    act(() => {
      result.current.updateStatus({ message: 'finished' })
    })

    expect(result.current.status.message).not.toStrictEqual(
      defaultStatus.message,
    )
    expect(result.current.status.message).toStrictEqual('finished')
  })
  test('should be able to update status percent', () => {
    const { result } = renderHook(() => useStatus())

    expect(result.current.status.percent).toStrictEqual(defaultStatus.percent)

    act(() => {
      result.current.updateStatus({ percent: 1.0 })
    })

    expect(result.current.status.percent).not.toStrictEqual(
      defaultStatus.percent,
    )
    expect(result.current.status.percent).toStrictEqual(1.0)
  })
  test('should persist status after refresh', () => {
    const { result } = renderHook(() => useStatus())

    const newStatus: Status = {
      state: 'ready',
      message: 'completed',
      percent: 1.0,
    }

    expect(result.current.status).toStrictEqual(defaultStatus)

    act(() => {
      result.current.updateStatus(newStatus)
    })

    expect(result.current.status).not.toStrictEqual(defaultStatus)
    expect(result.current.status).toStrictEqual(newStatus)

    act(() => {
      window.location.reload()
    })

    expect(result.current.status).not.toStrictEqual(defaultStatus)
    expect(result.current.status).toStrictEqual(newStatus)
  })
})
