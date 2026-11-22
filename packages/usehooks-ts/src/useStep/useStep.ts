import { useCallback, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

/** Represents the second element of the output of the `useStep` hook. */
type UseStepActions = {
  /** Go to the next step in the process. */
  goToNextStep: () => void
  /** Go to the previous step in the process. */
  goToPrevStep: () => void
  /** Reset the step to the initial step. */
  reset: () => void
  /** Check if the next step is available. */
  canGoToNextStep: boolean
  /** Check if the previous step is available. */
  canGoToPrevStep: boolean
  /** Set the current step to a specific value. */
  setStep: Dispatch<SetStateAction<number>>
}

type SetStepCallbackType = (step: number | ((step: number) => number)) => void

/**
 * Custom hook that manages and navigates between steps in a multi-step process.
 * @param {number} maxStep - The maximum step in the process.
 * @returns {[number, UseStepActions]} An tuple containing the current step and helper functions for navigating steps.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-step)
 * @example
 * ```tsx
 * const [currentStep, { goToNextStep, goToPrevStep, reset, canGoToNextStep, canGoToPrevStep, setStep }] = useStep(3);
 * // Access and use the current step and provided helper functions.
 * ```
 */
export function useStep(maxStep: number): [number, UseStepActions] {
  const [currentStep, setCurrentStep] = useState(1)

  const canGoToNextStep = currentStep + 1 <= maxStep
  const canGoToPrevStep = currentStep - 1 > 0

  const setStep = useCallback<SetStepCallbackType>(
    step => {
      // Allow value to be a function so we have the same API as useState
      if (step instanceof Function) {
        setCurrentStep(previous => {
          const newStep = step(previous)
          if (newStep >= 1 && newStep <= maxStep) {
            return newStep
          }
          throw new Error('Step not valid')
        })
        return
      }

      if (step >= 1 && step <= maxStep) {
        setCurrentStep(step)
        return
      }

      throw new Error('Step not valid')
    },
    [maxStep],
  )

  const goToNextStep = useCallback(() => {
    setCurrentStep(step => (step + 1 <= maxStep ? step + 1 : step))
  }, [maxStep])

  const goToPrevStep = useCallback(() => {
    setCurrentStep(step => (step > 1 ? step - 1 : step))
  }, [])

  const reset = useCallback(() => {
    setCurrentStep(1)
  }, [])

  return [
    currentStep,
    {
      goToNextStep,
      goToPrevStep,
      canGoToNextStep,
      canGoToPrevStep,
      setStep,
      reset,
    },
  ]
}
