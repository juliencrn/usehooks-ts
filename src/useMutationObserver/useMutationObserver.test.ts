import { renderHook } from '@testing-library/react-hooks/dom'

import useMutationObserver from './useMutationObserver'

const dom = document.createElement('div')

describe('use mutation observer()', () => {
  test('MutationList should be defined', () => {
    const { result } = renderHook(() =>
      useMutationObserver({ current: dom }, { attributes: true }),
    )
    const { mutationList } = result.current

    expect(mutationList).toBeDefined()
    expect(mutationList).toBeInstanceOf(Array)
    expect(typeof mutationList).toBe('object')
  })

  test('All Mutations should have type', () => {
    const { result } = renderHook(() =>
      useMutationObserver({ current: dom }, { attributes: true }),
    )
    const { mutationList } = result.current

    for (const mutation of mutationList) {
      expect(typeof mutation.type).toBe('string')
    }
  })

  test('getMutationListByType should be defined', () => {
    const { result } = renderHook(() =>
      useMutationObserver({ current: dom }, { attributes: true }),
    )
    const { getMutationListByType } = result.current
    expect(typeof getMutationListByType).toBe('function')
  })
})
