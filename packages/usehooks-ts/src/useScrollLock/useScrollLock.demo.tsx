import { useScrollLock } from './useScrollLock'

// Example 1: Auto lock the scroll for modal
export default function Modal() {
  useScrollLock()
  return <div>Modal</div>
}

// Example 2: Manually lock and unlock the scroll for a specific target
export function App() {
  const { lock, unlock, isLocked } = useScrollLock({
    autoLock: false,
    lockTarget: '#scrollable',
  })

  return (
    <>
      <div id="scrollable" style={{ minHeight: '150vh' }}>
        {/* Scrollable Content */}
      </div>

      <div>
        <button onClick={lock}>Lock</button>
        <button onClick={unlock}>Unlock</button>
        <p>is Scrollable Locked: {isLocked ? 'Yes' : 'No'}</p>
      </div>
    </>
  )
}
