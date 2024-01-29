import { renderHook } from '@testing-library/react'

import { useDocumentTitle } from './useDocumentTitle'

describe('useDocumentTitle()', () => {
  it('title should be in the document', () => {
    renderHook(() => useDocumentTitle('foo'))
    expect(window.document.title).toEqual('foo')
  })
})
