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
      useMutationObserver({ ref: { current: dom }, attributes: true }),
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
      useMutationObserver({ ref: { current: null }, attributes: true }),
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
      useMutationObserver({
        ref: { current: dom },
        attributes: true,
        childList: true,
      }),
    )

    expect(observe).toHaveBeenCalledWith(
      dom,
      expect.objectContaining({
        attributes: true,
        childList: true,
      }),
    )

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
      useMutationObserver({
        ref: { current: dom },
        attributes: true,
        childList: true,
      }),
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
    const disconnects: ReturnType<typeof vitest.fn>[] = []

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
      ({ childList }: { childList?: boolean }) =>
        useMutationObserver({
          ref: { current: dom },
          attributes: true,
          childList,
        }),
      { initialProps: { childList: undefined as boolean | undefined } },
    )

    expect(observe).toHaveBeenCalledTimes(1)

    rerender({ childList: true })

    expect(disconnects[0]).toHaveBeenCalledTimes(1)
    expect(observe).toHaveBeenCalledTimes(2)

    unmount()

    expect(disconnects[1]).toHaveBeenCalledTimes(1)
  })

  it('should not re-observe when config object identity changes but values are the same', () => {
    const dom = document.createElement('div')
    const ref = { current: dom }
    const observe = vitest.fn()

    class MockMutationObserver {
      observe = observe
      disconnect = vitest.fn()
    }

    window.MutationObserver =
      MockMutationObserver as unknown as typeof MutationObserver

    const { rerender } = renderHook(
      ({ attributes }: { attributes: boolean }) =>
        useMutationObserver({
          ref,
          attributes,
        }),
      { initialProps: { attributes: true } },
    )

    expect(observe).toHaveBeenCalledTimes(1)

    rerender({ attributes: true })

    expect(observe).toHaveBeenCalledTimes(1)
  })

  it('should call onMutation callback instead of setting state', () => {
    const dom = document.createElement('div')
    const onMutation = vitest.fn()
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
      useMutationObserver({
        ref: { current: dom },
        attributes: true,
        onMutation,
      }),
    )

    const mutation = { type: 'attributes' } as MutationRecord

    act(() => {
      callback?.([mutation], {} as unknown as MutationObserver)
    })

    expect(onMutation).toHaveBeenCalledWith([mutation])

    expect(result.current.mutationList).toEqual([])
  })
})
