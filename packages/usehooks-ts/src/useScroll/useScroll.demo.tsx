import { useScroll } from '..'

export default function Component() {
const {scrollX, scrollY} = useScroll()

return (
  <div
   style={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
   }}
  >
    <div
    style={{
      position: scrollY ? 'fixed' : 'relative',
      backgroundColor: scrollY ? 'blue' : 'white',
      display: scrollX ? 'none' : 'block',
      left: 0,
      top: 0,
    }}
    >{scrollY ? "i'm Fixed" : "I'm not fixed"}</div>
    <p>ScrollY: {scrollY}</p>
    <p>ScrollX: {scrollX}</p>
  </div>
)
}
