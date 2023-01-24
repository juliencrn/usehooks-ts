import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks/dom'

import useRandomArrayItem from './useRandomArrayItem'

describe('useRandomArrayItem()', () => {
  afterEach(() => {
    jest.useRealTimers()
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

  test('should randomize value after given interval', async () => {
    let initialValue = -1
    const items = Array.from(Array(1000).keys())
    await act(async () => {
      mockSetInterval()
      const { result } = renderHook(() => useRandomArrayItem(items, 2))
      initialValue = result.current as number

      expect(items.some(item => item === result.current)).toBe(true)
      expect(setInterval).toHaveBeenCalledTimes(0)

      let err: unknown = null
      waitFor(() => jest.advanceTimersByTime(100))
        .then(() => {
          jest.advanceTimersByTime(100)
        })
        .catch(e => {
          err = e
        })
        .finally(() => {
          expect(err).toBeNull()
          expect(setInterval).toHaveBeenCalledTimes(1)
          expect(result.current).not.toBe(initialValue)
          expect(items.some(item => item === result.current)).toBe(true)
        })
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
