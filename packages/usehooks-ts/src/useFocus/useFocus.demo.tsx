import { useFocus } from '..'

export default function Component() {
  const ref = useFocus()

  return <input ref={ref} type="text" />
}
