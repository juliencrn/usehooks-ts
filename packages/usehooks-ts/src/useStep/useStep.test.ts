import { act, renderHook } from '@testing-library/react'

import { useStep } from './useStep'

describe('useStep()', () => {
  it('should use step', () => {
    const { result } = renderHook(() => useStep(2))

    expect(result.current[0]).toBe(1)
    expect(typeof result.current[1].goToNextStep).toBe('function')
    expect(typeof result.current[1].goToPrevStep).toBe('function')
    expect(typeof result.current[1].setStep).toBe('function')
    expect(typeof result.current[1].reset).toBe('function')
    expect(typeof result.current[1].canGoToNextStep).toBe('boolean')
    expect(typeof result.current[1].canGoToPrevStep).toBe('boolean')
  })

  it('should increment step', () => {
    const { result } = renderHook(() => useStep(2))

    act(() => {
      result.current[1].goToNextStep()
    })

    expect(result.current[0]).toBe(2)
  })

  it('should decrement step', () => {
    const { result } = renderHook(() => useStep(2))

    act(() => {
      result.current[1].setStep(2)
    })

    act(() => {
      result.current[1].goToPrevStep()
    })

    expect(result.current[0]).toBe(1)
  })

  it('should reset step', () => {
    const { result } = renderHook(() => useStep(2))

    act(() => {
      result.current[1].reset()
    })

    expect(result.current[0]).toBe(1)
  })

  it('should set step', () => {
    const { result } = renderHook(() => useStep(3))

    const newStep = 2

    act(() => {
      result.current[1].setStep(newStep)
    })

    expect(result.current[0]).toBe(newStep)
  })

  it('should return if prev step is available', () => {
    const { result } = renderHook(() => useStep(2))

    act(() => {
      result.current[1].setStep(2)
    })

    expect(result.current[1].canGoToPrevStep).toBe(true)
  })

  it('should return if next step is available', () => {
    const { result } = renderHook(() => useStep(2))

    expect(result.current[1].canGoToNextStep).toBe(true)
  })
})
