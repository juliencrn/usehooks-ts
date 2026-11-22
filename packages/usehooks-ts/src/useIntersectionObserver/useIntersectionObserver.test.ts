import { act, renderHook } from '@testing-library/react'

import { useIntersectionObserver } from './useIntersectionObserver'

it('waits for the configured threshold before freezing', () => {
  let notify: IntersectionObserverCallback
  const observer: IntersectionObserver = {
    root: null,
    rootMargin: '0%',
    thresholds: [0.5],
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: () => [],
  }
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(function (callback: IntersectionObserverCallback) {
      notify = callback
      return observer
    }),
  )

  try {
    const target = document.createElement('div')
    const { result, unmount } = renderHook(() =>
      useIntersectionObserver({ threshold: 0.5, freezeOnceVisible: true }),
    )
    act(() => {
      result.current.ref(target)
    })

    const emit = (intersectionRatio: number) => {
      act(() => {
        notify(
          [
            {
              target,
              isIntersecting: true,
              intersectionRatio,
              boundingClientRect: target.getBoundingClientRect(),
              intersectionRect: target.getBoundingClientRect(),
              rootBounds: null,
              time: 0,
            },
          ],
          observer,
        )
      })
    }

    emit(0.1)
    expect(result.current.isIntersecting).toBe(false)
    expect(observer.disconnect).not.toHaveBeenCalled()

    emit(0.5)
    expect(result.current.isIntersecting).toBe(true)
    expect(observer.disconnect).toHaveBeenCalledOnce()
    unmount()
  } finally {
    vi.unstubAllGlobals()
  }
})
