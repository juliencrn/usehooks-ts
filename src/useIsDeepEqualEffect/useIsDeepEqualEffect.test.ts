import { useEffect, useState } from 'react'

import { renderHook } from '@testing-library/react-hooks/dom'

import useIsDeepEqualEffect from './useIsDeepEqualEffect'

describe('useIsDeepEqualEffect()', () => {
  test('the callback function should have been called on useEffect, not useIsDeepEqualEffect', () => {
    const { rerender, result } = renderHook(() => {
      const [a, setA] = useState(0)
      const [b, setB] = useState(0)
      const [data, setData] = useState({
        val: 1,
        children: {
          val: 2,
        },
      })
      useEffect(() => {
        console.log('useEffect', data)
        setA(a => a + 1)
      }, [data])

      useIsDeepEqualEffect(() => {
        console.log('useIsDeepEqualEffect', data)
        setB(b => b + 1)
      }, [data])
      return { a, b, setData }
    })

    expect(result.current.a).toBe(1)
    expect(result.current.b).toBe(1)
    rerender()
    expect(result.current.a).toBe(1)
    expect(result.current.b).toBe(1)
    result.current.setData({
      val: 1,
      children: {
        val: 2,
      },
    })
    rerender()
    expect(result.current.a).toBe(2)
    expect(result.current.b).toBe(1)
  })
})
