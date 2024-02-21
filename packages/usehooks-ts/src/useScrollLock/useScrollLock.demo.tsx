import { useScrollLock } from './useScrollLock'

// Example 1: Auto lock the scroll of the body element when the modal mounts
export default function Modal() {
  useScrollLock()
  return <div>Modal</div>
}

// Example 2: Manually lock and unlock the scroll for a specific target
export function App() {
  const { lock, unlock } = useScrollLock({
    autoLock: false,
    lockTarget: '#scrollable',
  })

  return (
    <>
      <div id="scrollable" style={{ maxHeight: '50vh', overflowY: 'scroll' }}>
        {['red', 'blue', 'green'].map(color => (
          <div key={color} style={{ backgroundColor: color, height: '30vh' }} />
        ))}
      </div>

      <div style={{ gap: 16, display: 'flex' }}>
        <button onClick={lock}>Lock</button>
        <button onClick={unlock}>Unlock</button>
      </div>
    </>
  )
}
