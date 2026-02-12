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

  it('should not observe when the ref node is null', () => {
    const observe = vitest.fn()

    class MockMutationObserver {
      observe = observe
      disconnect = vitest.fn()
    }

    window.MutationObserver =
      MockMutationObserver as unknown as typeof MutationObserver

    const { result } = renderHook(() =>
      useMutationObserver({ current: null }, { attributes: true }),
    )

    expect(observe).not.toHaveBeenCalled()
    expect(result.current.mutationList).toEqual([])
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

  it('should disconnect previous observer and re-observe on config change', () => {
    const dom = document.createElement('div')
    const observe = vitest.fn()
    const disconnects: Array<ReturnType<typeof vitest.fn>> = []

    class MockMutationObserver {
      disconnect = vitest.fn()
      observe = observe

      constructor(_cb: MutationCallback) {
        disconnects.push(this.disconnect)
      }
    }

    window.MutationObserver =
      MockMutationObserver as unknown as typeof MutationObserver

    const { rerender, unmount } = renderHook(
      ({ config }: { config: MutationObserverInit }) =>
        useMutationObserver({ current: dom }, config),
      { initialProps: { config: { attributes: true } as MutationObserverInit } },
    )

    expect(observe).toHaveBeenNthCalledWith(1, dom, { attributes: true })

    rerender({ config: { attributes: true, childList: true } })

    expect(disconnects[0]).toHaveBeenCalledTimes(1)
    expect(observe).toHaveBeenNthCalledWith(2, dom, {
      attributes: true,
      childList: true,
    })

    unmount()

    expect(disconnects[1]).toHaveBeenCalledTimes(1)
  })
})
