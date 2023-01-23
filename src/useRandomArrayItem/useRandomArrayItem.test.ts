import { act, renderHook, RenderResult } from "@testing-library/react-hooks/dom";

import useRandomArrayItem from './useRandomArrayItem'

describe('useRandomArrayItem()', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  beforeEach(() => {
    jest.useFakeTimers()
  })

  test('should be okay when initialized with array of any type', () => {
    act(() => {
      mockSetInterval()
      const stringArray = ['string0', 'string1', 'string2']
      const { result } = renderHook(() => useRandomArrayItem(stringArray, 1000))

      expect(stringArray.some(item => item === result.current)).toBe(true)
      expect(setInterval).toHaveBeenCalledTimes(0)
      mockClearInterval()
    })

    act(() => {
      mockSetInterval()
      const numberArray = [0, 1, 2]
      const { result } = renderHook(() => useRandomArrayItem(numberArray, 1000))

      expect(numberArray.some(item => item === result.current)).toBe(true)
      expect(setInterval).toHaveBeenCalledTimes(0)
      mockClearInterval()
    })
  })

  test('should randomize value after given interval', () => {
    let initialValue = -1
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    act(() => {
      mockSetInterval()
      const { result } = renderHook(() => useRandomArrayItem(items, 1))
      initialValue = result.current as number

      expect(items.some(item => item === result.current)).toBe(true)
      expect(setInterval).toHaveBeenCalledTimes(0)

      jest.advanceTimersByTime(20)
      Promise.resolve().then(() => {
        expect(result.current).not.toBe(initialValue)
        expect(setInterval).toHaveBeenCalledTimes(1)
      })

      expect(items.some(item => item === result.current)).toBe(true)
    })
  })
})

function mockSetInterval() {
  jest.useFakeTimers()
  jest.spyOn(global, 'setInterval')
}

function mockClearInterval() {
  jest.useFakeTimers()
  jest.spyOn(global, 'clearInterval')
}
