import { act, renderHook } from '@testing-library/react-hooks/dom'

import useCopyToClipboard from './useCopyToClipboard'

describe('useClipboard()', () => {
  const originalClipboard = { ...global.navigator.clipboard }
  const mockData = 'Test value'

  beforeEach(() => {
    const mockClipboard = {
      writeText: jest.fn(),
    }
    // @ts-ignore mock clipboard
    global.navigator.clipboard = mockClipboard
  })

  afterEach(() => {
    jest.resetAllMocks()
    // @ts-ignore mock clipboard
    global.navigator.clipboard = originalClipboard
  })

  test('should use clipboard', () => {
    const { result } = renderHook(() => useCopyToClipboard())

    expect(result.current[0]).toBe(null)
    expect(typeof result.current[1]).toBe('function')
  })

  test('should copy to the clipboard and the state', async () => {
    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await result.current[1](mockData)
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData)
    expect(result.current[0]).toBe(mockData)
  })

  test('should return null if copy failed', async () => {
    const NotAllowedError = new DOMException(
      'Write permission denied',
      'NotAllowedError'
    );

    (
      global.navigator.clipboard.writeText as jest.MockedFunction<
        Clipboard['writeText']
      >
    ).mockRejectedValueOnce(NotAllowedError)

    const warnSpy = jest.spyOn(console, 'warn')
    const { result } = renderHook(useCopyToClipboard)
    let copyFnReturnValue
    await act(async () => {
      copyFnReturnValue = await result.current[1](mockData)
    })
    expect(result.current[0]).toBeNull()
    expect(copyFnReturnValue).toBe(false)
    expect(console.warn).toHaveBeenCalledWith('Copy failed', NotAllowedError)
    warnSpy.mockRestore();
  })
})
