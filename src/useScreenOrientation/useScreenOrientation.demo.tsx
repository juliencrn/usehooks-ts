import { useScreenOrientation } from '..'

export default function Component() {
  const orientation = useScreenOrientation()
  return <div>Device orientation is {orientation}</div>
}
