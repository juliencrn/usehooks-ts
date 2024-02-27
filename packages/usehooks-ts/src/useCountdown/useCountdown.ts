import { useCallback } from 'react'

import { useBoolean } from '../useBoolean'
import { useCounter } from '../useCounter'
import { useInterval } from '../useInterval'

type CountdownOptions = {
  countStart: number
  intervalMs?: number
  isIncrement?: boolean
  countStop?: number
}

type CountdownControllers = {
  startCountdown: () => void
  stopCountdown: () => void
  resetCountdown: () => void
}

/**
 * A hook to manage countdown - New interface with default value.
 * @overload
 * @param  {CountdownOptions} countdownOptions the countdown's options.
 * @param  {number} countdownOptions.countStart the countdown's starting number, initial value of the returned number.
 * @param  {?number} [countdownOptions.countStop] `0` by default, the countdown's stopping number. Pass `-Infinity` to decrease forever.
 * @param  {?number} [countdownOptions.intervalMs] `1000` by default, the countdown's interval, in milliseconds.
 * @param  {?boolean} [countdownOptions.isIncrement] `false` by default, true if the countdown is increment.
 * @returns {[number, CountdownControllers]} An array containing the countdown's count and its controllers.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-countdown)
 * @example
 * const [counter, { start, stop, reset }] = useCountdown({
 *   countStart: 10,
 *   intervalMs: 1000,
 *   isIncrement: false,
 * });
 */
export function useCountdown({
  countStart,
  countStop = 0,
  intervalMs = 1000,
  isIncrement = false,
}: CountdownOptions): [number, CountdownControllers] {
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

  return [count, { startCountdown, stopCountdown, resetCountdown }]
}
