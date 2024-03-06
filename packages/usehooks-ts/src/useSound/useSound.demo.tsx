import { useSound } from './useSound'

export default function Component() {
  const [playBop] = useSound('/sounds/bop.mp3', { preload: 'none' })

  const { play: playMusic, pause: pauseMusic } = useSound('/sounds/music.mp3')

  return (
    <>
      <div>
        <button onClick={playMusic}>Play Music</button>
        <button onClick={pauseMusic}>Pause Music</button>
      </div>
      <button onClick={playBop}>Bop</button>
    </>
  )
}
