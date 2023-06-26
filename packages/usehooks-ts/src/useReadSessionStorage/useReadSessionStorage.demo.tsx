import { useReadSessionStorage } from '..'

export default function Component() {
  // Assuming a value was set in session storage with this key
  const sessionId = useReadSessionStorage('sessionId')

  return <p>SessionId: {sessionId ?? 'not set'}</p>
}
