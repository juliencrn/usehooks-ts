import type { Ref } from 'react'

// typeguard helper to check if Ref has .current
export const refHasCurrent = <T extends HTMLElement>(
  r: Ref<T>,
): r is { current: T } => {
  return (
    r !== null && typeof r === 'object' && 'current' in r && r.current !== null
  )
}

// helper to check if Ref contains a target element
export const refContains = ({
  ref,
  target,
}: {
  ref: Ref<HTMLElement>
  target: Node
}) => refHasCurrent(ref) && ref.current.contains(target)
