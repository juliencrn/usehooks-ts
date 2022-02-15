import { act, renderHook } from '@testing-library/react-hooks'

import { useElementSize } from '.'

const setupHook = () => renderHook(() => useElementSize())

const originalOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetHeight',
) as PropertyDescriptor

const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetWidth',
) as PropertyDescriptor

const resizeElement = (
  node: HTMLElement,
  dimension: 'width' | 'height',
  value: number,
): void => {
  if (dimension === 'height') {
    return void Object.defineProperty(node, 'offsetHeight', {
      configurable: true,
      value,
    })
  }

  if (dimension === 'width') {
    void Object.defineProperty(node, 'offsetWidth', {
      configurable: true,
      value,
    })
  }
}

const dom = document.createElement('div')

describe('useElementSize()', () => {
  afterAll(() => {
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetHeight',
      originalOffsetHeight,
    )
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetWidth',
      originalOffsetWidth,
    )
  })

  it('should initialize', () => {
    const { result } = setupHook()
    const [setRef, size] = result.current

    expect(typeof size.height).toBe('number')
    expect(typeof size.width).toBe('number')
    expect(setRef).toBeInstanceOf(Function)
  })

  it('should match the corresponding height', () => {
    const height_1 = 360
    const height_2 = 600
    const height_3 = 1024
    const { result, rerender } = setupHook()
    const [setRef] = result.current

    /* 1 */
    act(() => {
      setRef(dom)
      resizeElement(dom, 'height', height_1)
    })
    expect(result.current[1].height).toEqual(height_1)

    /* 2 */
    act(() => {
      resizeElement(dom, 'height', height_2)
    })
    rerender()
    expect(result.current[1].height).toEqual(height_2)

    /* 3 */
    act(() => {
      resizeElement(dom, 'height', height_3)
    })
    rerender()
    expect(result.current[1].height).toEqual(height_3)
  })

  it('should match the corresponding width', () => {
    const width_1 = 360
    const width_2 = 600
    const width_3 = 1024

    const { result, rerender } = setupHook()
    const [setRef] = result.current

    /* 1 */
    act(() => {
      setRef(dom)
      resizeElement(dom, 'width', width_1)
    })
    expect(result.current[1].width).toEqual(width_1)

    /* 2 */
    act(() => {
      resizeElement(dom, 'width', width_2)
    })
    rerender()
    expect(result.current[1].width).toEqual(width_2)

    /* 3 */
    act(() => {
      resizeElement(dom, 'width', width_3)
    })
    rerender()
    expect(result.current[1].width).toEqual(width_3)
  })
})
