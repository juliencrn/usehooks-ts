import { useWindowSize } from './useWindowSize'

export default function Component() {
  const { width = 0, height = 0 } = useWindowSize()

  return (
    <div>
      The current window dimensions are:{' '}
      <code>{JSON.stringify({ width, height })}</code>
    </div>
  )
}
