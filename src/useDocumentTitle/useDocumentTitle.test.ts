import { act, renderHook } from '@testing-library/react-hooks/dom'

import useDocumentTitle from './useDocumentTitle'

describe('useDocumentTitle()', () => {
  test('should use boolean', () => {
    renderHook(() => useDocumentTitle('foo'))
    expect(window.document.title).toEqual('foo')
  })
})
