import { useStep } from '..'

export default function Component() {
  const [currentStep, helpers] = useStep(5)

  const {
    canGoToPrevStep,
    canGoToNextStep,
    goToNextStep,
    goToPrevStep,
    reset,
    setStep,
  } = helpers

  return (
    <>
      <p>Current step is {currentStep}</p>
      <p>Can go to previous step {canGoToPrevStep ? 'yes' : 'no'}</p>
      <p>Can go to next step {canGoToNextStep ? 'yes' : 'no'}</p>
      <button onClick={goToNextStep}>Go to next step</button>
      <button onClick={goToPrevStep}>Go to previous step</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => setStep(3)}>Set to step 3</button>
    </>
  )
}
