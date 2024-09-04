import { useResettableState } from './useResettableState'

export default function Component() {
  const [value, setValue, resetValue] = useResettableState(0)

  return (
    <div>
      <p>Value: {value}</p>
      <button
        onClick={() => {
          setValue(prev => prev + 1)
        }}
      >
        Increment
      </button>
      <button onClick={resetValue}>Reset</button>
    </div>
  )
}
