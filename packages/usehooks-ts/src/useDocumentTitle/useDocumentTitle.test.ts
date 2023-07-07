import { renderHook } from '@testing-library/react-hooks/dom'

import { useDocumentTitle } from './useDocumentTitle'

describe('useDocumentTitle()', () => {
  test('title should be in the document', () => {
    renderHook(() => useDocumentTitle('foo'))
    expect(window.document.title).toEqual('foo')
  })

  describe('with prevailOnUnmount = false', () => {
    test('title should be reset to default on unmount', () => {
      window.document.title = 'bar'
      const { unmount } = renderHook(() => useDocumentTitle('foo', false))
      unmount()
      expect(window.document.title).toEqual('bar')
    })
  })
})
