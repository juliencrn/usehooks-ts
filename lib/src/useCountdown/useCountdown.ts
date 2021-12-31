// See: https://usehooks-ts.com/react-hook/use-boolean
import { useBoolean } from '../useBoolean'
// See: https://usehooks-ts.com/react-hook/use-counter
import { useCounter } from '../useCounter'
// See: https://usehooks-ts.com/react-hook/use-interval
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

/**
 *
 * @param seconds the countdown's number, generally time seconds
 * @param interval the countdown's interval, milliseconds
 * @param isIncrement determine the countdown is increment, otherwise is decrement
 * @returns
 */
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
  /**
   * Note: used to control the useInterval
   * running: If true, the interval is running
   * start: Should set running true to trigger interval
   * stop: Should set running false to remove interval
   */
  const { value: running, setTrue: start, setFalse: stop } = useBoolean(false)

  /**
   * Will set running false and reset the seconds to initial value
   */
  const reset = () => {
    stop()
    resetCounter()
  }

  useInterval(isIncrement ? increment : decrement, running ? interval : null)
  return [count, { start, stop, reset }]
}

export default useCountdown
