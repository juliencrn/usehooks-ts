import { renderHook } from '@testing-library/react'

import { useInterval } from './useInterval'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('useInterval()', () => {
  afterEach(() => {
    vitest.clearAllMocks()
  })

  it('should fire the callback function (1)', async () => {
    const timeout = 500
    const callback = vitest.fn()
    renderHook(() => useInterval(callback, timeout))
    await sleep(timeout)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should fire the callback function (2)', async () => {
    const timeout = 500
    const earlyTimeout = 400
    const callback = vitest.fn()
    renderHook(() => useInterval(callback, timeout))
    await sleep(earlyTimeout)
    expect(callback).not.toHaveBeenCalled()
  })

  it('should call set interval on start', () => {
    const timeout = 1200
    mockSetInterval()
    const callback = vitest.fn()
    renderHook(() => useInterval(callback, timeout))
    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), timeout)
  })

  it('should call clearTimeout on unmount', () => {
    mockClearInterval()
    const callback = vitest.fn()
    const { unmount } = renderHook(() => useInterval(callback, 1200))
    unmount()
    expect(clearInterval).toHaveBeenCalledTimes(1)
  })
})

function mockSetInterval() {
  vitest.useFakeTimers()
  vitest.spyOn(global, 'setInterval')
}

function mockClearInterval() {
  vitest.useFakeTimers()
  vitest.spyOn(global, 'clearInterval')
}
