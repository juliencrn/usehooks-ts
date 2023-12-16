import { useVisibilityState } from '..'

export default function Component() {
  const visibilityState = useVisibilityState()

  return <div>visibilityState is {visibilityState}</div>
}
