import { renderHook } from '@testing-library/react-hooks/dom'

import useOnBackButtonClicked from './useOnBackButtonClicked'

describe('useOnBackButtonClicked()', () => {
  test('should useOnBackButtonClicked be ok', () => {
    renderHook(() =>
      useOnBackButtonClicked(() => {
        console.log('Back Button pressed. Callback function triggered')
      }),
    )

    expect(window.history.state).toBe('fakeRoute')
  })
})
