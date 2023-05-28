import { act, renderHook } from '@testing-library/react-hooks/dom'

import useStep from './useStep'

describe('useStep()', () => {
  test('should use step', () => {
    const { result } = renderHook(() => useStep(2))

    expect(result.current[0]).toBe(1)
    expect(typeof result.current[1].goToNextStep).toBe('function')
    expect(typeof result.current[1].goToPrevStep).toBe('function')
    expect(typeof result.current[1].setStep).toBe('function')
    expect(typeof result.current[1].reset).toBe('function')
    expect(typeof result.current[1].canGoToNextStep).toBe('boolean')
    expect(typeof result.current[1].canGoToPrevStep).toBe('boolean')
  })

  test('should increment step', () => {
    const { result } = renderHook(() => useStep(2))

    act(() => {
      result.current[1].goToNextStep()
    })

    expect(result.current[0]).toBe(2)
  })

  test('should decrement step', () => {
    const { result } = renderHook(() => useStep(2))

    act(() => {
      result.current[1].setStep(2)
    })

    act(() => {
      result.current[1].goToPrevStep()
    })

    expect(result.current[0]).toBe(1)
  })

  test('should reset step', () => {
    const { result } = renderHook(() => useStep(2))

    act(() => {
      result.current[1].reset()
    })

    expect(result.current[0]).toBe(1)
  })

  test('should set step', () => {
    const { result } = renderHook(() => useStep(3))

    const newStep = 2

    act(() => {
      result.current[1].setStep(newStep)
    })

    expect(result.current[0]).toBe(newStep)
  })

  test('should return if prev step is available', () => {
    const { result } = renderHook(() => useStep(2))

    act(() => {
      result.current[1].setStep(2)
    })

    expect(result.current[1].canGoToPrevStep).toBe(true)
  })

  test('should return if next step is available', () => {
    const { result } = renderHook(() => useStep(2))

    expect(result.current[1].canGoToNextStep).toBe(true)
  })
})
