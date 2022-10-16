import { useOnline } from '..'

export default function Component() {
  const isOnline = useOnline()

  return (
    <div>
      <p>You are currently {isOnline ? 'online' : 'offline'}</p>
    </div>
  )
}
