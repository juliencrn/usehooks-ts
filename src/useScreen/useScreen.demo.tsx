import { useScreen } from '..'

export default function Component() {
  const screen = useScreen()

  return (
    <div>
      The current window dimensions are:{' '}
      <code>
        {JSON.stringify({ width: screen?.width, height: screen?.height })}
      </code>
    </div>
  )
}
