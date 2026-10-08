import { act, renderHook } from '@testing-library/react'

import { useScrollLock } from './useScrollLock'

describe('useScrollLock()', () => {
  beforeEach(() => {
    document.body.style.removeProperty('overflow')
  })

  it('should initially lock and unlock body', () => {
    const { unmount } = renderHook(() => useScrollLock())

    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('should initially lock and unlock the target element', () => {
    const target = document.createElement('div')

    document.body.appendChild(target)

    const { unmount } = renderHook(() => useScrollLock({ lockTarget: target }))

    expect(target.style.overflow).toBe('hidden')
    unmount()
    expect(target.style.overflow).toBe('')
  })

  it('should initially lock and unlock the target element by selector', () => {
    const target = document.createElement('div')

    target.id = 'target'
    document.body.appendChild(target)

    const { unmount } = renderHook(() =>
      useScrollLock({ lockTarget: '#target' }),
    )

    expect(target.style.overflow).toBe('hidden')
    unmount()
    expect(target.style.overflow).toBe('')
  })

  it('should not initially lock and unlock', () => {
    const { unmount } = renderHook(() => useScrollLock({ autoLock: false }))

    expect(document.body.style.overflow).toBe('')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('should lock and unlock manually', () => {
    const { result } = renderHook(() => useScrollLock({ autoLock: false }))

    expect(document.body.style.overflow).toBe('')
    act(() => {
      result.current.lock()
    })
    expect(document.body.style.overflow).toBe('hidden')
    act(() => {
      result.current.unlock()
    })
    expect(document.body.style.overflow).toBe('')
  })

  it("should keep the original style of the target element when it's unlocked", () => {
    const target = document.createElement('div')

    target.style.overflow = 'auto'
    document.body.appendChild(target)

    const { result } = renderHook(() => useScrollLock({ lockTarget: target }))

    expect(target.style.overflow).toBe('hidden')
    act(() => {
      result.current.unlock()
    })
    expect(target.style.overflow).toBe('auto')
  })

  it('should unlock on unmount even with initial is locked', () => {
    const { unmount, result } = renderHook(() =>
      useScrollLock({ autoLock: false }),
    )

    expect(document.body.style.overflow).toBe('')
    act(() => {
      result.current.lock()
    })
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('should fallback to document.body if the target element is not found', () => {
    const { unmount } = renderHook(() =>
      useScrollLock({ lockTarget: '#non-existing' }),
    )

    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('should add padding-right to prevent width reflow', () => {
    const { unmount } = renderHook(() => useScrollLock())

    const scrollbarWidth = window.innerWidth - document.body.scrollWidth

    expect(document.body.style.paddingRight).toBe(`${scrollbarWidth}px`)
    unmount()
    expect(document.body.style.paddingRight).toBe('')
  })

  it('should preserve original styles when locked repeatedly before a rerender', () => {
    const target = document.createElement('div')

    target.style.overflow = 'auto'
    target.style.paddingRight = '12px'
    Object.defineProperty(target, 'offsetWidth', { value: 100 })
    Object.defineProperty(target, 'scrollWidth', { value: 80 })
    document.body.appendChild(target)

    const { result } = renderHook(() =>
      useScrollLock({ autoLock: false, lockTarget: target }),
    )

    act(() => {
      result.current.lock()
      result.current.lock()
    })

    expect(target.style.paddingRight).toBe('32px')
    act(() => {
      result.current.unlock()
    })
    expect(target.style.overflow).toBe('auto')
    expect(target.style.paddingRight).toBe('12px')
    expect(result.current.isLocked).toBe(false)
  })

  it('should restore styles on unmount after locking an already locked target', () => {
    const target = document.createElement('div')

    target.style.overflow = 'scroll'
    document.body.appendChild(target)

    const { result, unmount } = renderHook(() =>
      useScrollLock({ lockTarget: target, widthReflow: false }),
    )

    act(() => {
      result.current.lock()
    })
    unmount()

    expect(target.style.overflow).toBe('scroll')
  })

  it('should capture current styles again after unlocking and relocking', () => {
    const target = document.createElement('div')

    target.style.overflow = 'auto'
    document.body.appendChild(target)

    const { result } = renderHook(() =>
      useScrollLock({ lockTarget: target, widthReflow: false }),
    )

    act(() => {
      result.current.unlock()
    })
    target.style.overflow = 'scroll'
    act(() => {
      result.current.lock()
    })
    act(() => {
      result.current.unlock()
    })

    expect(target.style.overflow).toBe('scroll')
  })
})
