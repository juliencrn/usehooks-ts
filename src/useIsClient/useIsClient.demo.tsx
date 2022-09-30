import { useIsClient } from '..'

export default function Component() {
  const isClient = useIsClient()

  return <div>{isClient ? 'Client' : 'server'}</div>
}
