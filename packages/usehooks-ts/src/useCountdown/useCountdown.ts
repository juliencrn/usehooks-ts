import { useCallback } from 'react'

import { useBoolean } from '../useBoolean'
import { useCounter } from '../useCounter'
import { useInterval } from '../useInterval'

/** The countdown's options. */
type CountdownOptions = {
  /** The countdown's starting number, initial value of the returned number. */
  countStart: number

  /**
   * The countdown's interval, in milliseconds.
   * @default 1000
   */
  intervalMs?: number
  /**
   * True if the countdown is increment.
   * @default false
   */
  isIncrement?: boolean

  /**
   * The countdown's stopping number. Pass `-Infinity` to decrease forever.
   * @default 0
   */
  countStop?: number
  onStop?: () => void
}

/** The countdown's controllers. */
type CountdownControllers = {
  /** Start the countdown. */
  startCountdown: () => void
  /** Stop the countdown. */
  stopCountdown: () => void
  /** Reset the countdown. */
  resetCountdown: () => void
}

/**
 * A hook to manage countdown - New interface with default value.
 * @overload
 * @param  {CountdownOptions} countdownOptions the countdown's options.
 * @param  {number} countdownOptions.countStart the countdown's starting number, initial value of the returned number.
 * @param  {?number} [countdownOptions.countStop] `0` by default, the countdown's stopping number. Pass `-Infinity` to decrease forever.
 * @param {?Function} [countdownOptions.onStop] A callback function that will be called when the countdown stops (reaches `countStop`).
 * @param  {?number} [countdownOptions.intervalMs] `1000` by default, the countdown's interval, in milliseconds.
 * @param  {?boolean} [countdownOptions.isIncrement] `false` by default, true if the countdown is increment.
 * @returns {[number, CountdownControllers]} An array containing the countdown's count and its controllers.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-countdown)
 * @example
 * ```tsx
 * const [counter, { start, stop, reset }] = useCountdown({
 *   countStart: 10,
 *   intervalMs: 1000,
 *   isIncrement: false,
 * });
 * ```
 */
export function useCountdown(
  countdownOptions: CountdownOptions,
): [number, CountdownControllers]
/**
 * A hook to manage countdown - Legacy interface
 * @overload
 * @param  {LegacyCountdownOptions} countdownOptions the countdown's options.
 * @param  {number} countdownOptions.seconds the countdown's number, generally time seconds.
 * @param  {number} countdownOptions.interval the countdown's interval, milliseconds.
 * @param  {?boolean} [countdownOptions.isIncrement] `false` by default, determine the countdown is increment, otherwise is decrement.
 * @returns {[number, LegacyCountdownControllers]} An array containing the countdown's count and its controllers.
 * @deprecated new useCountdown interface is already available (see [Documentation](https://usehooks-ts.com/react-hook/use-countdown)), the old version will retire on usehooks-ts@3.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-countdown)
 * @example
 * const [counter, { start, stop, reset }] = useCountdown({
 *   seconds: 10,
 *   interval: 1000,
 *   isIncrement: false,
 * });
 */
export function useCountdown(
  countdownOptions: LegacyCountdownOptions,
): [number, LegacyCountdownControllers]
/**
 * A hook to manage countdown
 * @param  {CountdownOptions | LegacyCountdownOptions} countdownOptions the countdown's options.
 * @returns {[number, CountdownControllers | LegacyCountdownControllers]} An array containing the countdown's count and its controllers.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-countdown)
 */
export function useCountdown(
  countdownOptions: LegacyCountdownOptions | CountdownOptions,
): [number, LegacyCountdownControllers | CountdownControllers] {
  /**
   * Use to determine the the API call is a deprecated version.
   */
  let isDeprecated = false

  let countStart,
    intervalMs,
    isIncrement: boolean | undefined,
    countStop: number | undefined,
    onStop: (() => void) | undefined

  if ('seconds' in countdownOptions) {
    console.warn(
      '[useCountdown:DEPRECATED] new interface is already available (see https://usehooks-ts.com/react-hook/use-countdown), the old version will retire on usehooks-ts@3.',
    )

    isDeprecated = true
    countStart = countdownOptions.seconds
    intervalMs = countdownOptions.interval
    isIncrement = countdownOptions.isIncrement
  } else {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi, no-extra-semi
    ;({ countStart, intervalMs, isIncrement, countStop, onStop } =
      countdownOptions)
  }

  // default values
  intervalMs = intervalMs ?? 1000
  isIncrement = isIncrement ?? false
  countStop = countStop ?? 0
  onStop = onStop ?? undefined

  const {
    count,
    increment,
    decrement,
    reset: resetCounter,
  } = useCounter(countStart)

  /*
   * Note: used to control the useInterval
   * running: If true, the interval is running
   * start: Should set running true to trigger interval
   * stop: Should set running false to remove interval.
   */
  const {
    value: isCountdownRunning,
    setTrue: startCountdown,
    setFalse: stopCounter,
  } = useBoolean(false)

  /**
   * Will set running false and stop the countdown
   */
  const stopCountdown = () => {
    stopCounter()
    if (onStop) onStop()
  }

  /**
   * Will set running false and reset the seconds to initial value
   */
  const resetCountdown = () => {
    stopCountdown()
    resetCounter()
  }, [stopCountdown, resetCounter])

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
