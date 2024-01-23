import { renderHook, act } from '@testing-library/react-hooks'
import useScroll from './useScroll'

describe('useScroll()', () => {
  test('should return initial scroll position', () => {
    const { result } = renderHook(() => useScroll())

    expect(result.current.scrollX).toBe(0);
    expect(result.current.scrollY).toBe(0);
  })

  test('should update scroll position on scroll', () => {
    const { result } = renderHook(() => useScroll())

    act(() => {
      // Simulate a scroll event
      window.dispatchEvent(new Event('scroll', { bubbles: true }))
    })

    // The scroll position should now be updated
    expect(result.current.scrollX).toBe(window.scrollX)
    expect(result.current.scrollY).toBe(window.scrollY)
  })

  test('should remove event listener on unmount', () => {
    const { result, unmount } = renderHook(() => useScroll())

    // Ensure the event listener is added
    expect(window.scrollX).toBe(result.current.scrollX)
    expect(window.scrollY).toBe(result.current.scrollY)
    expect(window.addEventListener).toHaveBeenCalledTimes(1)
    
    // Unmount the component
    unmount()

    // Simulate a scroll event after unmount
    act(() => {
      window.dispatchEvent(new Event('scroll', { bubbles: true }))
    })

    // The scroll position should not have changed since the event listener is removed
    expect(result.current.scrollX).toBe(0)
    expect(result.current.scrollY).toBe(0)
  })
})
