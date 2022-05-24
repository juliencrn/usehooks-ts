// See: https://usehooks-ts.com/react-hook/use-boolean
import { useBoolean } from '../useBoolean'
import { useCallback } from 'react'
// See: https://usehooks-ts.com/react-hook/use-counter
import { useCounter } from '../useCounter'
// See: https://usehooks-ts.com/react-hook/use-interval
import { useInterval } from '../useInterval'

// Old interface IN & OUT
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

// New interface IN & OUT
interface CountdownOption {
  countStart: number
  intervalMs?: number
  isIncrement?: boolean
  countStop?: number
}
interface CountdownControllers {
  startCountdown: () => void
  stopCountdown: () => void
  resetCountdown: () => void
}

const DEPRECATED_WARN = '[useCountdown:DEPRECATED] new interface is already available (see @tutorial), the old version will retire on usehooks-ts@3.'

/**
 *
 * @param seconds the countdown's number, generally time seconds
 * @param interval the countdown's interval, milliseconds
 * @param isIncrement determine the countdown is increment, otherwise is decrement
 * @returns
 *
 * @deprecated new useCountdown interface is already available (see @tutorial), the old version will retire on usehooks-ts@3
 * @tutorial https://usehooks-ts.com/react-hook/use-countdown
 */
function useCountdown(countdownOption: UseCountdownType): [number, CountdownHelpers];
/**
 * New interface with default value
 */
function useCountdown(countdownOption: CountdownOption): [number, CountdownControllers];
function useCountdown(countdownOption: UseCountdownType | CountdownOption): [number, CountdownHelpers | CountdownControllers] {
  /**
   * Use to determine the the API call is a deprecated version.
   */
  // const { value: isDeprecated, setTrue: setDeprecated } = useBoolean(false)
  let isDeprecated = false
  // handle overload
  let countStart, intervalMs, isIncrement: boolean | undefined, countStop: number | undefined
  if ('seconds' in countdownOption) {
    console.warn(DEPRECATED_WARN)
    // setDeprecated();
    isDeprecated = true
    countStart = countdownOption.seconds
    intervalMs = countdownOption.interval
    isIncrement = countdownOption.isIncrement
  } else {
    ({ countStart, intervalMs, isIncrement, countStop } = countdownOption);
  }

  // default values
  intervalMs = intervalMs ?? 1000
  isIncrement = isIncrement ?? false
  countStop = countStop ?? 0
  isIncrement = isIncrement ?? false

  const {
    count,
    increment,
    decrement,
    reset: resetCounter,
  } = useCounter(countStart)

  /**
   * Note: used to control the useInterval
   * running: If true, the interval is running
   * start: Should set running true to trigger interval
   * stop: Should set running false to remove interval
   */
  const { value: running, setTrue: startCountdown, setFalse: stopCountdown } = useBoolean(false)

  /**
   * Will set running false and reset the seconds to initial value
   */
  const resetCountdown = () => {
    stopCountdown()
    resetCounter()
  }

  const countdownCallback = useCallback(
    () => {
      isIncrement ? increment() : decrement()
      if (count <= (countStop ?? 0)) { stopCountdown() }
    },
    [],
  )


  useInterval(countdownCallback, running ? intervalMs : null)
  return isDeprecated ?
    [count, { start: startCountdown, stop: stopCountdown, reset: resetCountdown } as CountdownHelpers] :
    [count, { startCountdown, stopCountdown, resetCountdown } as CountdownControllers]
}

export default useCountdown
