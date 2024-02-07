import { useCallback, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

interface Helpers {
  goToNextStep: () => void
  goToPrevStep: () => void
  reset: () => void
  canGoToNextStep: boolean
  canGoToPrevStep: boolean
  setStep: Dispatch<SetStateAction<number>>
}

type SetStepCallbackType = (step: number | ((step: number) => number)) => void

/**
 * Custom hook for managing and navigating between steps in a multi-step process.
 * @param {number} maxStep - The maximum step in the process.
 * @returns {[number, Helpers]} An tuple containing the current step and helper functions for navigating steps.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-step)
 * @example
 * const [currentStep, { goToNextStep, goToPrevStep, reset, canGoToNextStep, canGoToPrevStep, setStep }] = useStep(3);
 * // Access and use the current step and provided helper functions.
 */
export function useStep(maxStep: number): [number, Helpers] {
  const [currentStep, setCurrentStep] = useState(1)

  const canGoToNextStep = currentStep + 1 <= maxStep
  const canGoToPrevStep = currentStep - 1 > 0

  const setStep = useCallback<SetStepCallbackType>(
    step => {
      // Allow value to be a function so we have the same API as useState
      const newStep = step instanceof Function ? step(currentStep) : step

      if (newStep >= 1 && newStep <= maxStep) {
        setCurrentStep(newStep)
        return
      }

      throw new Error('Step not valid')
    },
    [maxStep, currentStep],
  )

  const goToNextStep = useCallback(() => {
    if (canGoToNextStep) {
      setCurrentStep(step => step + 1)
    }
  }, [canGoToNextStep])

  const goToPrevStep = useCallback(() => {
    if (canGoToPrevStep) {
      setCurrentStep(step => step - 1)
    }
  }, [canGoToPrevStep])

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
