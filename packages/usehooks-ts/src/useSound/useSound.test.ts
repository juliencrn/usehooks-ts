import { renderHook } from '@testing-library/react'

import { useSound } from './useSound'

const mockAudioConstructor = vitest.fn()
const mockAudioPlay = vitest.fn()
const mockAudioPause = vitest.fn()

class MockAudio {
  constructor(src: string) {
    mockAudioConstructor(src)
  }
  play() {
    mockAudioPlay()
  }
  pause() {
    mockAudioPause()
  }
}

// @ts-expect-error, not full implementation
globalThis.Audio = MockAudio

/**
 * Potential test cases and features
 * - See how it handles invalid URLs
 * - check preloading behaviors
 * - confirm that playing audio doesn't stop if volume changed midway (not implemented i think)
 * - see how it handles multiple hooks
 * - control the amount of Audio elements created
 */

describe('useSound()', () => {
  it('loads sounds properly and returns proper functions', () => {
    const src = 'https://www.joshwcomeau.com/sounds/switch-on.mp3'
    const { result } = renderHook(() => useSound(src))

    // Make sure only 1 Audio instance is created
    expect(mockAudioConstructor).toBeCalledTimes(1)
    expect(mockAudioConstructor).toBeCalledWith(src)

    // Make sure the audio plays properly
    const [play, stop] = result.current
    play()
    expect(mockAudioPlay).toBeCalledTimes(1)

    stop()
    expect(mockAudioPause).toBeCalledTimes(1)
  })
})
