import { useScreen } from './useScreen'

export default function Component() {
  const screen = useScreen()

  return (
    <div>
      The current window dimensions are:{' '}
      <code>{JSON.stringify(screen, null, 2)}</code>
    </div>
  )
}
