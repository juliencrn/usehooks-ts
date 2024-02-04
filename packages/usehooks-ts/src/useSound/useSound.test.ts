import { renderHook } from '@testing-library/react'

import { useSound } from './useSound'

describe('useSound()', () => {
  it('returns proper result', () => {
    const { result } = renderHook(() =>
      useSound('https://www.joshwcomeau.com/sounds/switch-on.mp3'),
    )

    const [playSwitchOn] = result.current
    expect(playSwitchOn).toBeInstanceOf(Function)
  })
})
