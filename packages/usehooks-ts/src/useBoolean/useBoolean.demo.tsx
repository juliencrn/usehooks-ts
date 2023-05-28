import { useBoolean } from '..'

export default function Component() {
  const { value, setValue, setTrue, setFalse, toggle } = useBoolean(false)

  // Just an example to use "setValue"
  const customToggle = () => setValue((x: boolean) => !x)

  return (
    <>
      <p>
        Value is <code>{value.toString()}</code>
      </p>
      <button onClick={setTrue}>set true</button>
      <button onClick={setFalse}>set false</button>
      <button onClick={toggle}>toggle</button>
      <button onClick={customToggle}>custom toggle</button>
    </>
  )
}
