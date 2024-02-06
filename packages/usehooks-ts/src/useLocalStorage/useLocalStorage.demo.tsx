import { useLocalStorage } from './useLocalStorage'

// Usage
export default function Component() {
  const [value, setValue] = useLocalStorage('test-key', 0)

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
    </div>
  )
}
