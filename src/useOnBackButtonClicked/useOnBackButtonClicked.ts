import { useCallback, useEffect } from 'react'

const DEFAULT_TEXT = 'Are you sure you want to go back?'

function useOnBackButtonClicked(
  callback: () => void,
  message: string = DEFAULT_TEXT,
) {
  const handleBackButtonPressed = useCallback(() => {
    const retValue = window.confirm(message)
    if (retValue) {
      callback()
    } else {
      // When back button is clicked, a new fakeRoute must be added
      window.history.pushState(
        'fakeRoute',
        document.title,
        window.location.href,
      )
    }
  }, [callback, message])

  useEffect(() => {
    window.history.pushState('fakeRoute', document.title, window.location.href)
    window.addEventListener('popstate', handleBackButtonPressed)

    return () => {
      window.removeEventListener('popstate', handleBackButtonPressed)

      // If the user leaves the page without pressing the back button, fakeRoute must be deleted
      if (window.history.state === 'fakeRoute') {
        window.history.back()
      }
    }
  }, [])
}

export default useOnBackButtonClicked
