import { useWindowSize } from './useWindowSize'

export default function Component() {
  const size = useWindowSize()

  return (
    <div>
      The current window dimensions are: <code>{JSON.stringify(size)}</code>
    </div>
  )
}
