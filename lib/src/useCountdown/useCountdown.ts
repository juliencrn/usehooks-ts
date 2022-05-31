// TODO: example and test
import { useCallback } from 'react'

// See: https://usehooks-ts.com/react-hook/use-boolean
import { useBoolean } from '../useBoolean'
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

/**
 *
 * @param  {UseCountdownType} countdownOption
 * @param  {number} countdownOption.seconds the countdown's number, generally time seconds
 * @param  {number} countdownOption.interval the countdown's interval, milliseconds
 * @param  {?boolean} countdownOption.isIncrement false by default, determine the countdown is increment, otherwise is decrement
 * @returns [counter, CountdownControllers]
 *
 * @deprecated new useCountdown interface is already available (see https://usehooks-ts.com/react-hook/use-countdown), the old version will retire on usehooks-ts@3
 */
function useCountdown(
  countdownOption: UseCountdownType,
): [number, CountdownHelpers]

/**
 * New interface with default value
 *
 * @param  {CountdownOption} countdownOption
 * @param  {number} countdownOption.countStart - the countdown's starting number, initial value of the returned number.
 * @param  {?number} countdownOption.countStop -  `0` by default, the countdown's stopping number. Pass `-Infinity` to decrease forever.
 * @param  {?number} countdownOption.intervalMs - `1000` by default, the countdown's interval, in milliseconds.
 * @param  {?boolean} countdownOption.isIncrement - `false` by default, true if the countdown is increment.
 * @returns [counter, CountdownControllers]
 */
function useCountdown(
  countdownOption: CountdownOption,
): [number, CountdownControllers]

function useCountdown(
  countdownOption: UseCountdownType | CountdownOption,
): [number, CountdownHelpers | CountdownControllers] {
  /**
   * Use to determine the the API call is a deprecated version.
   */
  let isDeprecated = false

  let countStart,
    intervalMs,
    isIncrement: boolean | undefined,
    countStop: number | undefined

  if ('seconds' in countdownOption) {
    console.warn(
      '[useCountdown:DEPRECATED] new interface is already available (see https://usehooks-ts.com/react-hook/use-countdown), the old version will retire on usehooks-ts@3.',
    )

    isDeprecated = true
    countStart = countdownOption.seconds
    intervalMs = countdownOption.interval
    isIncrement = countdownOption.isIncrement
  } else {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;({ countStart, intervalMs, isIncrement, countStop } = countdownOption)
  }

  // default values
  intervalMs = intervalMs ?? 1000
  isIncrement = isIncrement ?? false
  countStop = countStop ?? 0

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
  const {
    value: isCountdownRunning,
    setTrue: startCountdown,
    setFalse: stopCountdown,
  } = useBoolean(false)

  /**
   * Will set running false and reset the seconds to initial value
   */
  const resetCountdown = () => {
    stopCountdown()
    resetCounter()
  }

  const countdownCallback = useCallback(() => {
    if (count === countStop) {
      stopCountdown()
      return
    }

    if (isIncrement) {
      increment()
    } else {
      decrement()
    }
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown])

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null)

  return isDeprecated
    ? [
        count,
        {
          start: startCountdown,
          stop: stopCountdown,
          reset: resetCountdown,
        } as CountdownHelpers,
      ]
    : [
        count,
        {
          startCountdown,
          stopCountdown,
          resetCountdown,
        } as CountdownControllers,
      ]
}

export default useCountdown
