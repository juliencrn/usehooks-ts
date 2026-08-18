import { renderHook } from '@testing-library/react'

import { useResizeObserver } from './useResizeObserver'

describe('useResizeObserver()', () => {
  let observeMock: ReturnType<typeof vi.fn>
  let disconnectMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    observeMock = vi.fn()
    disconnectMock = vi.fn()

    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: observeMock,
      disconnect: disconnectMock,
      unobserve: vi.fn(),
    }))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initialize correctly with undefined width and height', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useResizeObserver({ ref }))

    expect(result.current.width).toBeUndefined()
    expect(result.current.height).toBeUndefined()
    expect(observeMock).toHaveBeenCalledWith(ref.current, { box: 'content-box' })
  })

  it('should disconnect observer on unmount', () => {
    const ref = { current: document.createElement('div') }
    const { unmount } = renderHook(() => useResizeObserver({ ref }))

    unmount()
    expect(disconnectMock).toHaveBeenCalledTimes(1)
  })

  it('should safely handle null ref on initial render without throwing', () => {
    const nullRef = { current: null }

    expect(() => {
      renderHook(() => useResizeObserver({ ref: nullRef }))
    }).not.toThrow()
  })
})