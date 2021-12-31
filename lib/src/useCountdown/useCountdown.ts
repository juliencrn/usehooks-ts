// See: https://usehooks-ts.com/react-hook/use-boolean
import { useBoolean } from '../useBoolean'
// See: https://usehooks-ts.com/react-hook/use-counter
import { useCounter } from '../useCounter'
// See: https://usehooks-ts.com/react-hook/use-counter
import { useInterval } from '../useInterval'

interface UseCountdownType {
  seconds: number
  interval: number
  isIncrement?: boolean
}
interface CountdownHelpers {
  start: () => void
  stop: () => void
  reset: () => void
}

function useCountdown({
  seconds,
  interval,
  isIncrement,
}: UseCountdownType): [number, CountdownHelpers] {
  const {
    count,
    increment,
    decrement,
    reset: resetCounter,
  } = useCounter(seconds)
  const { value, setTrue, setFalse } = useBoolean(false)

  const start = setTrue
  const stop = setFalse
  const reset = () => {
    setFalse()
    resetCounter()
  }

  useInterval(isIncrement ? increment : decrement, value ? interval : null)
  return [count, { start, stop, reset }]
}

export default useCountdown
