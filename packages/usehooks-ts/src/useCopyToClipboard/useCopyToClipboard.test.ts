import { act, renderHook } from '@testing-library/react'

import { useCopyToClipboard } from './useCopyToClipboard'

describe('useCopyToClipboard()', () => {
  const originalClipboard = { ...global.navigator.clipboard }
  const mockData = 'Test value'

  beforeEach(() => {
    const mockClipboard = {
      writeText: vitest.fn(),
    }
    // @ts-ignore mock clipboard
    global.navigator.clipboard = mockClipboard
  })

  afterEach(() => {
    vitest.resetAllMocks()
    // @ts-ignore mock clipboard
    global.navigator.clipboard = originalClipboard
  })

  it('should use clipboard', () => {
    const { result } = renderHook(() => useCopyToClipboard())

    expect(result.current[0]).toBe(null)
    expect(typeof result.current[1]).toBe('function')
  })

  it('should copy to the clipboard and the state', async () => {
    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await result.current[1](mockData)
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData)
    expect(result.current[0]).toBe(mockData)
  })

  describe('callback functionality', () => {
    it('should call onSuccess callback when copy succeeds', async () => {
      const { result } = renderHook(() => useCopyToClipboard())
      const onSuccess = vitest.fn()
      const onError = vitest.fn()

      await act(async () => {
        await result.current[1](mockData, { onSuccess, onError })
      })

      expect(onSuccess).toHaveBeenCalledTimes(1)
      expect(onSuccess).toHaveBeenCalledWith({ text: mockData })
      expect(onError).not.toHaveBeenCalled()
    })

    it('should call onError callback when clipboard is not supported', async () => {
      // @ts-ignore mock clipboard
      global.navigator.clipboard = undefined

      const { result } = renderHook(() => useCopyToClipboard())
      const onSuccess = vitest.fn()
      const onError = vitest.fn()

      await act(async () => {
        await result.current[1](mockData, { onSuccess, onError })
      })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith({
        error: expect.any(Error),
        text: mockData,
      })
      expect(onError.mock.calls[0][0].error.message).toBe(
        'Clipboard not supported',
      )
      expect(onSuccess).not.toHaveBeenCalled()
    })

    it('should call onError callback when writeText fails', async () => {
      const mockError = new Error('Write failed')
      const mockClipboard = {
        writeText: vitest.fn().mockRejectedValue(mockError),
      }
      // @ts-ignore mock clipboard
      global.navigator.clipboard = mockClipboard

      const { result } = renderHook(() => useCopyToClipboard())
      const onSuccess = vitest.fn()
      const onError = vitest.fn()

      await act(async () => {
        await result.current[1](mockData, { onSuccess, onError })
      })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith({
        error: mockError,
        text: mockData,
      })
      expect(onSuccess).not.toHaveBeenCalled()
    })

    it('should work without callbacks (backward compatibility)', async () => {
      const { result } = renderHook(() => useCopyToClipboard())

      let returnValue: boolean | undefined

      await act(async () => {
        returnValue = await result.current[1](mockData)
      })

      expect(returnValue).toBe(true)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData)
      expect(result.current[0]).toBe(mockData)
    })

    it('should work with only onSuccess callback', async () => {
      const { result } = renderHook(() => useCopyToClipboard())
      const onSuccess = vitest.fn()

      await act(async () => {
        await result.current[1](mockData, { onSuccess })
      })

      expect(onSuccess).toHaveBeenCalledTimes(1)
      expect(onSuccess).toHaveBeenCalledWith({ text: mockData })
    })

    it('should work with only onError callback', async () => {
      // @ts-ignore mock clipboard
      global.navigator.clipboard = undefined

      const { result } = renderHook(() => useCopyToClipboard())
      const onError = vitest.fn()

      await act(async () => {
        await result.current[1](mockData, { onError })
      })

      expect(onError).toHaveBeenCalledTimes(1)
    })

    it('should return promise that resolves alongside callbacks', async () => {
      const { result } = renderHook(() => useCopyToClipboard())
      const onSuccess = vitest.fn()

      let promiseResult: boolean | undefined

      await act(async () => {
        promiseResult = await result.current[1](mockData, { onSuccess })
      })

      expect(promiseResult).toBe(true)
      expect(onSuccess).toHaveBeenCalledTimes(1)
    })

    it('should convert non-Error objects to Error in onError callback', async () => {
      const mockClipboard = {
        writeText: vitest.fn().mockRejectedValue('string error'),
      }
      // @ts-ignore mock clipboard
      global.navigator.clipboard = mockClipboard

      const { result } = renderHook(() => useCopyToClipboard())
      const onError = vitest.fn()

      await act(async () => {
        await result.current[1](mockData, { onError })
      })

      expect(onError).toHaveBeenCalledWith({
        error: expect.any(Error),
        text: mockData,
      })
      expect(onError.mock.calls[0][0].error.message).toBe('string error')
    })
  })
})
