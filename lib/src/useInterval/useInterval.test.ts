import { renderHook } from '@testing-library/react-hooks/dom'

import useInterval from './useInterval'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('useInterval()', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should fire the callback function (1)', async () => {
    const timeout = 500
    const callback = jest.fn()
    renderHook(() => useInterval(callback, timeout))
    await sleep(timeout)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('should fire the callback function (2)', async () => {
    const timeout = 500
    const earlyTimeout = 400
    const callback = jest.fn()
    renderHook(() => useInterval(callback, timeout))
    await sleep(earlyTimeout)
    expect(callback).not.toHaveBeenCalled()
  })

  test('should call set interval on start', () => {
    const timeout = 1200
    mockSetInterval()
    const callback = jest.fn()
    renderHook(() => useInterval(callback, timeout))
    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), timeout)
  })

  test('should call clearTimeout on unmount', () => {
    mockClearInterval()
    const callback = jest.fn()
    const { unmount } = renderHook(() => useInterval(callback, 1200))
    unmount()
    expect(clearInterval).toHaveBeenCalledTimes(1)
  })
})

function mockSetInterval() {
  jest.useFakeTimers()
  jest.spyOn(global, 'setInterval')
}

function mockClearInterval() {
  jest.useFakeTimers()
  jest.spyOn(global, 'clearInterval')
}
