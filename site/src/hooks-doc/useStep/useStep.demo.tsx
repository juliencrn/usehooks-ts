import React from 'react'

import { useStep } from 'usehooks-ts'

export default function Component() {
  const {
    actualStep,
    canGoToPrevStep,
    canGoToNextStep,
    goToNextStep,
    goToPrevStep,
    reset,
    setStep,
  } = useStep(5)

  return (
    <>
      <p>Actual step is {actualStep}</p>
      <p>Can go to previous step {canGoToPrevStep ? 'yes' : 'no'}</p>
      <p>Can go to next step {canGoToNextStep ? 'yes' : 'no'}</p>
      <button onClick={goToNextStep}>Go to next step</button>
      <button onClick={goToPrevStep}>Go to previous step</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => setStep(3)}>Set to step 3</button>
    </>
  )
}
