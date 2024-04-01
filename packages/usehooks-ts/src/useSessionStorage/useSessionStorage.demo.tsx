import { useSessionStorage } from './useSessionStorage'

export default function Component() {
  const [value, setValue, removeValue] = useSessionStorage('test-key', 0)

  return (
    <div>
      <p>Count: {value}</p>
      <button
        onClick={() => {
          setValue((x: number) => x + 1)
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          setValue((x: number) => x - 1)
        }}
      >
        Decrement
      </button>
      <button
        onClick={() => {
          removeValue()
        }}
      >
        Reset
      </button>
    </div>
  )
}
