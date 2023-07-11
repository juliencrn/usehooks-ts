import { renderHook } from '@testing-library/react-hooks'

import { useDetectChanges } from './useDetectChanges'

describe('useDetectChanges', () => {
  test('should return an empty object when initialProps is an empty object', () => {
    const { result } = renderHook(() => useDetectChanges({}))

    expect(result.current).toEqual({})
  })

  test('should detect changes in values between renders', () => {
    const foo = () => {
      console.log('Nothing')
    }
    const prop5 = {
      nestedProp: 'nestedValue',
    }
    const prop6 = [1, 2, 3]

    const initialProps = {
      prop1: 'value1',
      prop2: 123,
      prop3: true,
      prop4: foo,
      prop5,
      prop6,
    }

    const { result, rerender } = renderHook(props => useDetectChanges(props), {
      initialProps,
    })

    // First render
    expect(result.current).toEqual({})

    // Rerender without changes
    rerender(initialProps)
    expect(result.current).toEqual({})

    // Rerender with updated values
    rerender({
      prop1: 'value2',
      prop2: 456,
      prop3: false,
      prop4: foo,
      prop5,
      prop6,
    })

    expect(result.current).toEqual({
      prop1: ['value1', 'value2'],
      prop2: [123, 456],
      prop3: [true, false],
    })

    // update the reference types
    const newFoo = () => {
      console.log('Nothing')
    }
    const newProp5 = {
      nestedProp: 'nestedValue',
    }
    const newProp6 = [1, 2, 3]

    rerender({
      prop1: 'value2',
      prop2: 456,
      prop3: true,
      prop4: newFoo,
      prop5: newProp5,
      prop6: newProp6,
    })

    expect(result.current).toEqual({
      prop3: [false, true],
      prop4: [foo, newFoo],
      prop5: [prop5, newProp5],
      prop6: [prop6, newProp6],
    })
  })
})
