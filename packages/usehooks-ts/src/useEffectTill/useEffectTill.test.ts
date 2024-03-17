// useEffectTill.test.js

import { renderHook } from '@testing-library/react-hooks/dom'

import { useEffectTill } from './useEffectTill'

describe('useEffectTill', () => {
  it('should run effect on mount', () => {
    const effect = jest.fn()
    renderHook(() => useEffectTill(effect, []))
    expect(effect).toHaveBeenCalledTimes(1)
  })

  it('should not re-run effect on updates', () => {
    const effect = jest.fn()
    const { rerender } = renderHook(() => useEffectTill(effect, []))
    rerender()
    expect(effect).toHaveBeenCalledTimes(1)
  })

  it('should handle empty deps array', () => {
    const effect = jest.fn()
    renderHook(() => useEffectTill(effect))
    expect(effect).toHaveBeenCalledTimes(1)
  })

  it('should handle returned cleanup function', () => {
    const cleanup = jest.fn()
    const effect = jest.fn(() => cleanup)
    const { rerender } = renderHook(() => useEffectTill(effect))
    rerender()
    expect(cleanup).toHaveBeenCalled() // Assert cleanup called
  })

  it('should not run the effect after being done', () => {
    const cleanup = jest.fn()
    const effect = jest.fn(done => {
      done()
      return () => cleanup()
    })
    const { rerender } = renderHook(() => useEffectTill(effect))
    rerender()
    expect(effect).toHaveBeenCalledTimes(1)
    rerender()
    expect(effect).toHaveBeenCalledTimes(1)
  })
})
