import { useToggle } from '..'

export default function Component() {
  const [value, toggle, setValue] = useToggle()

  // Just an example to use "setValue"
  const customToggle = () => setValue((x: boolean) => !x)

  return (
    <>
      <p>
        Value is <code>{value.toString()}</code>
      </p>
      <button onClick={() => setValue(true)}>set true</button>
      <button onClick={() => setValue(false)}>set false</button>
      <button onClick={toggle}>toggle</button>
      <button onClick={customToggle}>custom toggle</button>
    </>
  )
}
