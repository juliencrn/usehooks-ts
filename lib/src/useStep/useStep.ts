import { useCallback, useMemo, useState } from 'react'

interface ReturnType {
  actualStep: number
  goToNextStep: () => void
  goToPrevStep: () => void
  reset: () => void
  canGoToNextStep: boolean
  canGoToPrevStep: boolean
  setStep: (step: number) => void
}

function useStep(maxStep: number): ReturnType {
  const [actualStep, setActualStep] = useState(1)

  const canGoToNextStep = useMemo(
    () => actualStep + 1 <= maxStep,
    [actualStep, maxStep],
  )

  const canGoToPrevStep = useMemo(() => actualStep - 1 >= 1, [actualStep])

  const setStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= maxStep) {
        setActualStep(step)
        return
      }

      throw 'Step not valid'
    },
    [maxStep],
  )

  const goToNextStep = useCallback(() => {
    if (canGoToNextStep) {
      setActualStep(step => step + 1)
    }
  }, [canGoToNextStep])

  const goToPrevStep = useCallback(() => {
    if (canGoToPrevStep) {
      setActualStep(step => step - 1)
    }
  }, [canGoToPrevStep])

  const reset = useCallback(() => {
    setActualStep(1)
  }, [])

  return {
    actualStep,
    goToNextStep,
    goToPrevStep,
    canGoToNextStep,
    canGoToPrevStep,
    setStep,
    reset,
  }
}

export default useStep
