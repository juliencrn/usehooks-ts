import { useWindowSize } from '..'

export default function Component() {
  const { width, height } = useWindowSize()

  return (
    <div>
      The current window dimensions are:{' '}
      <code>{JSON.stringify({ width, height })}</code>
    </div>
  )
}
