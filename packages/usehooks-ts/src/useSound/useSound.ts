import { useEffect, useRef } from 'react'

import type { RefObject } from 'react'

type UseSoundResult = [() => void, () => void] & {
  play: () => void
  pause: () => void
  stop: () => void
  ref: RefObject<HTMLAudioElement | null>
}

interface UseSoundOptions<InitializeWithValue extends boolean | undefined> {
  preload: HTMLMediaElement['preload']
  initializeWithValue: InitializeWithValue
}

const IS_SERVER = typeof window === 'undefined'

// SSR version
export function useSound(
  src: string,
  options: UseSoundOptions<false>,
): UseSoundResult | undefined

// CSR version
export function useSound(
  src: string,
  options?: Partial<UseSoundOptions<true>>,
): UseSoundResult

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
  options: Partial<UseSoundOptions<boolean>> = {},
): UseSoundResult {
  let { initializeWithValue = true } = options
  if (IS_SERVER) {
    initializeWithValue = false
  }

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (initializeWithValue) {
      audioRef.current = new Audio(src)
      if (options.preload) {
        audioRef.current.preload = options.preload
      }
    } else {
      audioRef.current = null
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [src, options.preload, initializeWithValue])

  const play = () => {
    if (!audioRef.current) return
    void audioRef.current.play()
  }

  const pause = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
  }

  const stop = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  const result = [play, stop] as UseSoundResult
  result.play = play
  result.stop = stop
  result.pause = pause
  result.ref = audioRef

  return result
}
