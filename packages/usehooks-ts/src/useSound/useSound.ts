import { useCallback, useMemo } from 'react'

type UseSoundResult = [() => void, () => void] & {
  play: () => void
  pause: () => void
  stop: () => void
}

type UseSoundOptions = {
  preload?: HTMLMediaElement['preload']
  volume?: number
  playbackRate?: number
}

/**
 * Custom hook for playing sound
 * @param {string} [src] - The source url for the sound
 * @param {UseSoundOptions} [options] - Options for the hook
 * @returns {UseSoundResult} An tuple with two functions, play and stop. Also supports object destructuring with play, pause and stop
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-sound)
 * @example
 * const [playBop] = useSound("/sounds/bop.mp3");
 *
 * <button onClick={playBop}>Play Bop</button>
 */
export function useSound(
  src: string,
  options: UseSoundOptions = {},
): UseSoundResult {
  const audio = useMemo(
    () => Object.assign(new Audio(src), options),
    [src, options],
  )

  const play = useCallback(() => {
    void audio.play()
  }, [audio])

  const pause = useCallback(() => {
    audio.pause()
  }, [audio])

  const stop = useCallback(() => {
    audio.pause()
    audio.currentTime = 0
  }, [audio])

  const result = [play, stop] as UseSoundResult
  result.play = play
  result.stop = stop
  result.pause = pause

  return result
}
