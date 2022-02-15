import { act, renderHook } from '@testing-library/react-hooks'

import useWindowSize from './useWindowSize'

const setupHook = () => renderHook(() => useWindowSize())

const windowResize = (dimension: 'width' | 'height', value: number): void => {
  if (dimension === 'width') {
    window.innerWidth = value
  }

  if (dimension === 'height') {
    window.innerHeight = value
  }

  window.dispatchEvent(new Event('resize'))
}

describe('useElementSize()', () => {
  it('should initialize', () => {
    const { result } = setupHook()
    const { height, width } = result.current
    expect(typeof height).toBe('number')
    expect(typeof width).toBe('number')
  })

  it('should return the corresponding height', () => {
    const { result } = setupHook()

    act(() => {
      windowResize('height', 420)
    })
    expect(result.current.height).toBe(420)

    act(() => {
      windowResize('height', 2196)
    })

    expect(result.current.height).toBe(2196)
  })

  it('should return the corresponding width', () => {
    const { result } = setupHook()
    act(() => {
      windowResize('width', 420)
    })

    expect(result.current.width).toBe(420)

    act(() => {
      windowResize('width', 2196)
    })

    expect(result.current.width).toBe(2196)
  })
})
