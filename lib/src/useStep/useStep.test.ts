import { act, renderHook } from '@testing-library/react-hooks/native'

import useStep from './useStep'

describe('useStep()', () => {
  test('should use step', () => {
    const { result } = renderHook(() => useStep(2))

    expect(result.current.actualStep).toBe(1)
    expect(typeof result.current.goToNextStep).toBe('function')
    expect(typeof result.current.goToPrevStep).toBe('function')
    expect(typeof result.current.setStep).toBe('function')
    expect(typeof result.current.reset).toBe('function')
    expect(typeof result.current.canGoToNextStep).toBe('boolean')
    expect(typeof result.current.canGoToPrevStep).toBe('boolean')
  })

  test('should increment step', () => {
    const { result } = renderHook(() => useStep(2))

    act(() => {
      result.current.goToNextStep()
    })

    expect(result.current.actualStep).toBe(2)
  })

  test('should decrement step', () => {
    const { result } = renderHook(() => useStep(2))

    act(() => {
      result.current.setStep(2)
    })

    act(() => {
      result.current.goToPrevStep()
    })

    expect(result.current.actualStep).toBe(1)
  })

  test('should reset step', () => {
    const { result } = renderHook(() => useStep(2))

    act(() => {
      result.current.reset()
    })

    expect(result.current.actualStep).toBe(1)
  })

  test('should set step', () => {
    const { result } = renderHook(() => useStep(3))

    const newStep = 2

    act(() => {
      result.current.setStep(newStep)
    })

    expect(result.current.actualStep).toBe(newStep)
  })

  test('should return if prev step is available', () => {
    const { result } = renderHook(() => useStep(2))

    act(() => {
      result.current.setStep(2)
    })

    expect(result.current.canGoToPrevStep).toBe(true)
  })

  test('should return if next step is available', () => {
    const { result } = renderHook(() => useStep(2))

    expect(result.current.canGoToNextStep).toBe(true)
  })
})
