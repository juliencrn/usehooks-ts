import { act, renderHook } from '@testing-library/react'

import { useMutationObserver } from './useMutationObserver'

describe('useMutationObserver()', () => {
  const OriginalMutationObserver = window.MutationObserver

  afterEach(() => {
    window.MutationObserver = OriginalMutationObserver
    vitest.restoreAllMocks()
  })

  it('should return an initial empty mutation list', () => {
    const dom = document.createElement('div')

    const { result } = renderHook(() =>
      useMutationObserver({ current: dom }, { attributes: true }),
    )

    expect(result.current.mutationList).toEqual([])
    expect(result.current.getMutationListByType).toBeTypeOf('function')
  })

  it('should observe the element and disconnect on unmount', () => {
    const dom = document.createElement('div')
    const observe = vitest.fn()
    const disconnect = vitest.fn()

    class MockMutationObserver {
      observe = observe
      disconnect = disconnect
    }

    window.MutationObserver =
      MockMutationObserver as unknown as typeof MutationObserver

    const { unmount } = renderHook(() =>
      useMutationObserver(
        { current: dom },
        { attributes: true, childList: true },
      ),
    )

    expect(observe).toHaveBeenCalledWith(dom, {
      attributes: true,
      childList: true,
    })

    unmount()

    expect(disconnect).toHaveBeenCalledTimes(1)
  })

  it('should store and filter mutations by type', () => {
    const dom = document.createElement('div')
    let callback: MutationCallback | undefined

    class MockMutationObserver {
      constructor(cb: MutationCallback) {
        callback = cb
      }

      observe = vitest.fn()
      disconnect = vitest.fn()
    }

    window.MutationObserver =
      MockMutationObserver as unknown as typeof MutationObserver

    const { result } = renderHook(() =>
      useMutationObserver(
        { current: dom },
        { attributes: true, childList: true },
      ),
    )

    const attributeMutation = { type: 'attributes' } as MutationRecord
    const childListMutation = { type: 'childList' } as MutationRecord

    act(() => {
      callback?.(
        [attributeMutation, childListMutation],
        {} as unknown as MutationObserver,
      )
    })

    expect(result.current.mutationList).toHaveLength(2)
    expect(result.current.getMutationListByType('attributes')).toEqual([
      attributeMutation,
    ])
    expect(result.current.getMutationListByType('childList')).toEqual([
      childListMutation,
    ])
  })
})
