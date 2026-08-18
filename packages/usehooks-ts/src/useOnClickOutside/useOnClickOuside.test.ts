import { act, fireEvent, renderHook } from '@testing-library/react'

import { useOnClickOutside } from './useOnClickOutside'

describe('useOnClickOutside(', () => {
  it('should call the handler when a clicking outside the element (single ref)', () => {
    const containerRef = { current: document.createElement('div') }
    const handler = vitest.fn()

    renderHook(() => {
      useOnClickOutside(containerRef, handler)
    })

    expect(handler).toHaveBeenCalledTimes(0)

    // Simulate click outside the container
    act(() => {
      fireEvent.mouseDown(document)
    })

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should call the handler when a clicking outside the element (multiple refs)', () => {
    const containerRef1 = { current: document.createElement('div') }
    const containerRef2 = { current: document.createElement('div') }
    const handler = vitest.fn()

    renderHook(() => {
      useOnClickOutside([containerRef1, containerRef2], handler)
    })

    expect(handler).toHaveBeenCalledTimes(0)

    // Simulate click outside the containers
    act(() => {
      fireEvent.mouseDown(document)
    })

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should call the handler when a clicking outside the element (multiple refs with a null)', () => {
    const containerRef1 = { current: document.createElement('div') }
    const containerRef2 = { current: null }
    const handler = vitest.fn()

    renderHook(() => {
      useOnClickOutside([containerRef1, containerRef2], handler)
    })

    expect(handler).toHaveBeenCalledTimes(0)

    // Simulate click outside the containers
    act(() => {
      fireEvent.mouseDown(document)
    })

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should NOT call the handler when a clicking inside the element', () => {
    const containerRef = { current: document.createElement('div') }
    const handler = vitest.fn()

    renderHook(() => {
      useOnClickOutside([containerRef], handler)
    })

    // Simulate click inside the container
    act(() => {
      fireEvent.mouseDown(containerRef.current)
    })

    expect(handler).toHaveBeenCalledTimes(0)
  })

  it('should NOT call the handler when clicking a non-connected element', () => {
    const containerRef = { current: document.createElement('div') }
    const handler = vitest.fn()

    renderHook(() => {
      useOnClickOutside([containerRef], handler)
    })

    // Simulate click on a non-connected element
    act(() => {
      const element = document.createElement('div')
      document.body.appendChild(element)
      document.body.removeChild(element)
      fireEvent.mouseDown(element)
    })

    expect(handler).toHaveBeenCalledTimes(0)
  })

  it('should not re-register the listener when rerendered without options', () => {
    const addEventListenerSpy = vitest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = vitest.spyOn(window, 'removeEventListener')
    const containerRef = { current: document.createElement('div') }
    const handler = vitest.fn()

    const { rerender, unmount } = renderHook(() => {
      useOnClickOutside(containerRef, handler)
    })

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)

    rerender()

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)
    expect(removeEventListenerSpy).not.toHaveBeenCalled()

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1)

    addEventListenerSpy.mockRestore()
    removeEventListenerSpy.mockRestore()
  })
})
