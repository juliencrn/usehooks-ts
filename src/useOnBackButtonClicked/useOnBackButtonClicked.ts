import { useCallback, useEffect } from 'react'

interface useOnBackButtonClickedInterface {
  callback: () => void
  text?: string
}

const DEFAULT_TEXT = 'Estas seguro que deseas ir para atras?' // TODO: Poner en ingles

function useOnBackButtonClicked({
  callback,
  text = DEFAULT_TEXT,
}: useOnBackButtonClickedInterface) {
  const handleBackButtonPressed = useCallback(async () => {
    const retValue = window.confirm(text)
    if (retValue) {
      callback()
    }
  }, [callback, text])

  useEffect(() => {
    // TODO: Add listeners
  }, [handleBackButtonPressed])
}

export default useOnBackButtonClicked
