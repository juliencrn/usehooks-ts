import { act, renderHook } from '@testing-library/react-hooks'

import useScreenOrientation from './useScreenOrientation'

const setupHook = () => renderHook(() => useScreenOrientation())

interface MockScreen {
  orientation: {
    type: OrientationType
  }
}

const changeOrientation = (orientationType: OrientationType) => {
  const mockScreen: MockScreen = {
    orientation: {
      type: orientationType,
    },
  }
  Object.defineProperty(window, 'screen', { value: mockScreen })
  const orientationChangeEvent = new Event('orientationchange')
  window.dispatchEvent(orientationChangeEvent)
}

const PORTRAIT_PRIMARY = 'portrait-primary'
const LANDSCAPE_PRIMARY = 'landscape-primary'
const PORTRAIT_SECONDARY = 'portrait-secondary'
const LANDSCAPE_SECONDARY = 'landscape-secondary'

beforeEach(() => {
  const mockScreen: MockScreen = {
    orientation: {
      type: PORTRAIT_PRIMARY,
    },
  }
  Object.defineProperty(window, 'screen', { value: mockScreen, writable: true })
})

describe('useScreenOrientation()', () => {
  it('should return current orientation', () => {
    const { result } = setupHook()
    const orientation = result.current
    expect(orientation).toEqual(PORTRAIT_PRIMARY)
  })

  it('should return landscape orientation value', () => {
    const { result } = setupHook()
    expect(result.current).toBe(PORTRAIT_PRIMARY)
    act(() => changeOrientation(LANDSCAPE_PRIMARY))
    expect(result.current).toBe(LANDSCAPE_PRIMARY)
  })

  it('should return the primary secondary orientation value', () => {
    const { result } = setupHook()
    expect(result.current).toBe(PORTRAIT_PRIMARY)
    act(() => changeOrientation(PORTRAIT_SECONDARY))
    expect(result.current).toBe(PORTRAIT_SECONDARY)
  })

  it('should return the landscape secondary orientation value', () => {
    const { result } = setupHook()
    expect(result.current).toBe(PORTRAIT_PRIMARY)
    act(() => changeOrientation(LANDSCAPE_SECONDARY))
    expect(result.current).toBe(LANDSCAPE_SECONDARY)
  })
})
