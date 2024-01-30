import { useDebounceValue } from './useDebounceValue'

export default function Component({ defaultValue = 'John' }) {
  const [debouncedValue, setValue] = useDebounceValue(defaultValue, 500)

  return (
    <div>
      <p>Debounced value: {debouncedValue}</p>

      <input
        type="text"
        defaultValue={defaultValue}
        onChange={event => setValue(event.target.value)}
      />
    </div>
  )
}
