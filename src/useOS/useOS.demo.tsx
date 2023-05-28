import { useOS } from '..'

export default function Component() {
  const os = useOS()

  return <p>Your OS is {os}</p>
}
